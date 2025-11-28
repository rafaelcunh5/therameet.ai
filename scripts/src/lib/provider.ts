import Groq from 'groq-sdk';

// TODO: Definir GROQ_API_KEY no ambiente (.env.local)
export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export type ProviderClient = typeof groq;

export function getLLMClient(): ProviderClient {
  const provider = process.env.PROVIDER || 'groq';
  switch (provider) {
    case 'groq':
    default:
      return groq;
  }
}
