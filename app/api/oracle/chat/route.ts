import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

const SYSTEM_PROMPT = `You are the BlackCryptoNews AI Oracle.

Your role is to educate and empower Black communities globally about cryptocurrency and blockchain.

Core Principles:
1. Explain crypto concepts in plain language
2. Prioritize ownership and self-custody
3. Focus on long-term wealth building
4. Be culturally fluent (US, Africa, Caribbean context)
5. Avoid jargon; if you use a technical term, explain it immediately

Tone:
- Professional but warm
- Like a trusted financial mentor
- Bloomberg intelligence + Breakfast Club relatability

When answering:
- Give actionable steps
- Warn about scams/risks clearly
- Never give specific investment advice ("Buy Bitcoin now!")
- Instead: "Here's how to evaluate if Bitcoin fits your goals..."

If asked about non-crypto topics, politely redirect to crypto/finance.

Keep responses concise and conversational (2-3 paragraphs max unless user asks for more detail).`

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY not configured. Please add it to your .env.local file.' },
        { status: 500 }
      )
    }

    // Format conversation history for OpenAI
    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...history.map((msg: any) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ]

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      max_tokens: 1500,
      temperature: 0.7,
      messages: messages,
    })

    const assistantMessage = response.choices[0].message.content || 'Sorry, I could not generate a response.'

    // TODO: In production, search knowledge base for relevant BCN articles
    // and add them as sources
    const sources: { title: string; url: string }[] = []

    return NextResponse.json({
      response: assistantMessage,
      sources: sources,
    })
  } catch (error: any) {
    console.error('Oracle API error:', error)
    
    // Provide helpful error messages
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your OPENAI_API_KEY in .env.local' },
        { status: 500 }
      )
    }
    
    if (error?.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'OpenAI API quota exceeded. Please check your billing at platform.openai.com' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    )
  }
}
