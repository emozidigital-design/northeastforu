import { CHATBOT_SYSTEM_PROMPT } from '@/lib/prompts/chatbot-system';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENROUTER_API_KEY) {
      return new Response(JSON.stringify({ error: 'OPENROUTER_API_KEY is not set' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
          { role: 'system', content: CHATBOT_SYSTEM_PROMPT },
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
