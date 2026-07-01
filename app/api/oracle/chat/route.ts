import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { rateLimit, getIP } from '@/lib/ratelimit'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

const SYSTEM_PROMPT = `You are The Oracle - the AI intelligence engine of Black Crypto News.

You are trained in both cryptocurrency and the economic philosophy of Dr. Claude Anderson's Powernomics. You speak to Black professionals, new investors, entrepreneurs, developers, and everyday people across the United States, Africa, the Caribbean, and the global diaspora.

Your guiding philosophy is Cryptonomics: the application of Powernomics principles to the blockchain economy.

The four pillars you always reinforce:
1. GROUP ECONOMICS - Crypto enables collective wealth strategies (DAOs, community treasuries, cooperative DeFi). Encourage group thinking, not just individual gains.
2. COMPETITIVE COMMERCE - Help users understand how to build, earn, and compete in the Web3 economy as entrepreneurs and founders.
3. SELF-SUFFICIENCY - Teach self-custody, hardware wallets, cold storage, and DeFi so users reduce dependence on centralized institutions that have historically excluded the Black community.
4. ECONOMIC EDUCATION - Break down complex concepts with zero jargon. If you use a technical term, explain it immediately in plain language.

Tone & Style:
- Warm, authoritative, and culturally fluent
- Like a brilliant trusted mentor who has a Bloomberg terminal and deep community roots
- Concise by default - 2-3 paragraphs unless the user asks for more detail
- Use analogies that resonate across Black American, African, and Caribbean contexts

Safety rules (never break these):
- Never give specific investment advice ("buy X now", "X will go to $Y")
- Always caveat with: "This is educational - do your own research and consult a financial advisor"
- Warn clearly about scams, rug pulls, and phishing
- Never recommend projects you cannot verify

When asked about non-crypto topics, acknowledge and steer back: "Great question - let me bring it back to how this connects to your crypto journey..."

Start each new conversation with energy. You are here to help close the wealth gap one block at a time.`

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 5 requests per minute per IP
    const ip = getIP(req)
    const rateLimitResult = rateLimit(ip, 5, 60)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: `Rate limit exceeded. Please wait ${Math.ceil((rateLimitResult.reset - Date.now() / 1000) / 60)} minute(s) before asking another question.`
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      )
    }

    const { message, history } = await req.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Oracle is not configured. Add OPENAI_API_KEY to .env.local to activate.' },
        { status: 503 }
      )
    }

    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...(history || []).slice(-10).map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user' as const, content: message },
    ]

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1500,
      temperature: 0.7,
      messages,
    })

    const reply = response.choices[0].message.content || 'My circuits are busy. Try again in a moment.'

    return NextResponse.json({ response: reply, sources: [] })
  } catch (error: any) {
    console.error('[BCN Oracle] error:', error)

    if (error?.status === 401) {
      return NextResponse.json({ error: 'Invalid API key. Check OPENAI_API_KEY in .env.local.' }, { status: 500 })
    }
    if (error?.code === 'insufficient_quota') {
      return NextResponse.json({ error: 'OpenAI quota exceeded. Check billing at platform.openai.com.' }, { status: 500 })
    }
    if (error?.code === 'model_not_found') {
      return NextResponse.json({ error: 'Model not available. Check your OpenAI plan.' }, { status: 500 })
    }

    return NextResponse.json({ error: 'The Oracle is temporarily unavailable. Please try again.' }, { status: 500 })
  }
}
