import OpenAI from 'openai';
import { Lead } from './types';

export async function generateOutreach(prompt: string, lead: Lead) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      subject: `${lead.company}: a quick video idea`,
      message: `Hi ${lead.contactName || 'there'},\n\nI came across ${lead.company} and had a short AI-video idea around your products. I can create a small sample using publicly available product context so you can see what the concept could look like.\n\nWould you like me to send it over?\n\nBest,\nUgonna Jay\nAI Video Creative Specialist`
    };
  }
  const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
  const system = `You write concise, human B2B outreach for an AI video creative specialist. Never invent facts. Use only supplied lead evidence. Do not claim a sample is the prospect's existing video; describe it as a sample/concept made to demonstrate what could be created from their product context. Avoid hype, spammy language, fake familiarity, and unsupported claims. Return JSON with subject and message.`;
  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    response_format:{type:'json_object'},
    temperature:0.7,
    messages:[
      {role:'system',content:system},
      {role:'user',content:JSON.stringify({campaignPrompt:prompt,lead})}
    ]
  });
  return JSON.parse(response.choices[0]?.message?.content || '{}');
}
