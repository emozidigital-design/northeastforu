import { CHATBOT_SYSTEM_PROMPT } from '@/lib/prompts/chatbot-system';
import { buildSiteContext } from '@/lib/prompts/buildSiteContext';

export const maxDuration = 30;

// In-memory rate limit store. Resets on cold start (acceptable for abuse prevention).
// Key: IP address. Value: { minute: { count, resetAt }, hour: { count, resetAt } }
const rateLimitStore = new Map<string, {
  minute: { count: number; resetAt: number };
  hour:   { count: number; resetAt: number };
}>();

const LIMIT_PER_MINUTE = 10;
const LIMIT_PER_HOUR   = 50;

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip) ?? {
    minute: { count: 0, resetAt: now + 60_000 },
    hour:   { count: 0, resetAt: now + 3_600_000 },
  };

  if (now > entry.minute.resetAt) entry.minute = { count: 0, resetAt: now + 60_000 };
  if (now > entry.hour.resetAt)   entry.hour   = { count: 0, resetAt: now + 3_600_000 };

  if (entry.minute.count >= LIMIT_PER_MINUTE) {
    return { allowed: false, retryAfter: Math.ceil((entry.minute.resetAt - now) / 1000) };
  }
  if (entry.hour.count >= LIMIT_PER_HOUR) {
    return { allowed: false, retryAfter: Math.ceil((entry.hour.resetAt - now) / 1000) };
  }

  entry.minute.count++;
  entry.hour.count++;
  rateLimitStore.set(ip, entry);
  return { allowed: true, retryAfter: 0 };
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const { allowed, retryAfter } = checkRateLimit(ip);

    if (!allowed) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please slow down.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(retryAfter),
            'X-RateLimit-Limit-Minute': String(LIMIT_PER_MINUTE),
            'X-RateLimit-Limit-Hour': String(LIMIT_PER_HOUR),
          },
        }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return new Response(JSON.stringify({ error: 'OPENROUTER_API_KEY is not set' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { messages } = await req.json();

    // Build live site context (states, cities, itineraries, blogs) and append to system prompt.
    // Cached for 5 min (revalidate: 300 inside buildSiteContext fetches).
    const siteContext = await buildSiteContext();
    const systemPrompt = `${CHATBOT_SYSTEM_PROMPT}\n\n${siteContext}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://northeastforu.com',
        'X-Title': 'NorthEastForU Travel Assistant',
      },
      body: JSON.stringify({
        model: 'openai/gpt-5.4-nano',
        stream: true,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m: any) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return new Response(JSON.stringify({ error: err }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Forward the SSE stream, converting OpenAI delta format to the
    // Vercel AI SDK text stream format the chat widget expects (0:"text"\n).
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const data = trimmed.slice(5).trim();
            if (data === '[DONE]') break;

            try {
              const json = JSON.parse(data);
              const text = json.choices?.[0]?.delta?.content;
              if (text) {
                controller.enqueue(new TextEncoder().encode(`0:${JSON.stringify(text)}\n`));
              }
            } catch {
              // malformed SSE line — skip
            }
          }
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error: any) {
    console.error('Chat error:', error);
    return new Response(JSON.stringify({
      error: error?.message || 'Failed to process chat message',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
