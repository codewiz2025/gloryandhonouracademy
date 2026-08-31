import type { ChatMessage } from "../../routes/api/chat";

export function openAIStream(messages: ChatMessage[], model = process.env['AI_MODEL'] || 'gpt-4o-mini') {
  const OPENAI_API_KEY = process.env['OPENAI_API_KEY'];
  const API_BASE = process.env['AI_API_BASE_URL'] || 'https://api.openai.com';

  if (!OPENAI_API_KEY) throw new Error('Missing OPENAI_API_KEY');

  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const body = JSON.stringify({
          model,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          stream: true,
        });

        const res = await fetch(`${API_BASE}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body,
        });

        if (!res.ok || !res.body) {
          const detail = await res.text();
          throw new Error(`OpenAI request failed: ${res.status} ${detail}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split('\n');
          buffer = parts.pop() ?? '';
          for (const part of parts) {
            const line = part.trim();
            if (!line) continue;
            // OpenAI stream uses lines like: data: {json}
            const prefix = line.startsWith('data:') ? 'data:' : null;
            const payload = prefix ? line.slice(5).trim() : line;
            if (!payload) continue;
            if (payload === '[DONE]') {
              controller.close();
              return;
            }
            try {
              const event = JSON.parse(payload);
              // event.choices[0].delta may contain {content}
              const delta = event.choices?.[0]?.delta?.content;
              if (delta) {
                controller.enqueue(encoder.encode(String(delta)));
              }
            } catch (e) {
              // ignore parse errors
            }
          }
        }
      } catch (error) {
        console.error('OpenAI stream error', error);
        try { controller.error(error); } catch {}
      } finally {
        try { controller.close(); } catch {}
      }
    }
  });
}
