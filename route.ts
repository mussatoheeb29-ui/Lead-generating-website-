import { NextResponse } from 'next/server';
import { generateOutreach } from '@/lib/ai';
import { Lead } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { prompt, lead } = await req.json();
    if (!lead) return NextResponse.json({ error: 'Lead is required' }, { status: 400 });
    const draft = await generateOutreach(prompt || '', lead as Lead);
    return NextResponse.json({ subject: draft.subject, message: draft.message });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Personalization failed' }, { status: 500 });
  }
}
