// lib/secret.ts

export function getOpenAIKey(): string {
  const key = process.env.OPENAI_API_KEY?.trim();

  if (!key) {
    throw new Error(
      'OPENAI_API_KEY is missing. Create a .env.local file in the project root with:\n\nOPENAI_API_KEY="YOUR_KEY_HERE"\n'
    );
  }

  return key;
}