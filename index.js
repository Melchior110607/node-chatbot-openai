import 'dotenv/config';
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
const baseURL = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';

if (!apiKey) {
  console.error('Missing OPENAI_API_KEY');
  process.exit(1);
}

const client = new OpenAI({ apiKey, baseURL });

const userInput = process.argv.slice(2).join(' ') || 'Bonjour, je veux un résumé sur la sécurité IA.';

async function main() {
  const resp = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Tu es un assistant de support LLM spécialisé en guardrails et sécurité.' },
      { role: 'user', content: userInput }
    ],
    temperature: 0.2
  });
  console.log(resp.choices[0].message.content);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
