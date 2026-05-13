import { GoogleGenerativeAI } from "@google/generative-ai";
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/prompts/chatbot-system';

// Allow responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(JSON.stringify({ error: 'GOOGLE_GENERATIVE_AI_API_KEY is not set' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      systemInstruction: CHATBOT_SYSTEM_PROMPT 
    });

    // Format messages for Gemini
    const googleMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    // Start streaming
    const result = await model.generateContentStream({
      contents: googleMessages,
    });

    // Create a readable stream for the response
    const stream = new ReadableStream({
      async start(controller) {
          for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) {
                  // Format as Vercel AI SDK text stream (0: "text")
                  controller.enqueue(new TextEncoder().encode(`0:${JSON.stringify(text)}\n`));
              }
          }
          controller.close();
      }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        }
    });

  } catch (error: any) {
    console.error('Chat error:', error);
    return new Response(JSON.stringify({ 
      error: error?.message || 'Failed to process chat message',
      details: error
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
