import { groq } from '@/lib/provider';

export type LLMMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export interface LLMProvider {
  chat(messages: LLMMessage[], model?: string): Promise<string>;
}

export class GroqProvider implements LLMProvider {
  async chat(
    messages: LLMMessage[],
    model: string = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
  ): Promise<string> {
    const response = await groq.chat.completions.create({
      model,
      messages,
    });
    const choice = response.choices[0];
    if (!choice?.message?.content) return '';
    return choice.message.content;
  }
}

export class MockProvider implements LLMProvider {
  async chat(messages: LLMMessage[]): Promise<string> {
    const last = messages[messages.length - 1];
    return `MOCK_REPLY: ${(last?.content || '').slice(0, 50)}`;
  }
}

export function getLLMProvider(): LLMProvider {
  const provider = process.env.PROVIDER || 'groq';
  switch (provider) {
    case 'groq':
    default:
      return new GroqProvider();
  }
}

export async function runLLM(
  agent: { prompt_base?: string | null; persona?: string | null },
  messages: LLMMessage[],
  model?: string
): Promise<string> {
  const provider = getLLMProvider();
  const baseMessages: LLMMessage[] = [];

  if (agent.prompt_base) {
    baseMessages.push({ role: 'system', content: agent.prompt_base });
  }

  if (agent.persona) {
    baseMessages.push({ role: 'system', content: agent.persona });
  }

  return provider.chat([...baseMessages, ...messages], model);
}
