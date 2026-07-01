import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getIP } from '@/lib/ratelimit'

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 3 signups per hour per IP
    const ip = getIP(req)
    const rateLimitResult = rateLimit(ip, 3, 3600)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many signup attempts. Please try again later.' },
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

    const { email, firstName } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const apiKey  = process.env.CONVERTKIT_API_KEY
    const formId  = process.env.CONVERTKIT_FORM_ID

    if (!apiKey || !formId) {
      console.error('[Newsletter] Missing CONVERTKIT_API_KEY or CONVERTKIT_FORM_ID')
      return NextResponse.json({ error: 'Newsletter service not configured' }, { status: 503 })
    }

    // ConvertKit v3 API — subscribe to form
    const ckRes = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          api_key:    apiKey,
          email,
          first_name: firstName || '',
          tags:       [],
          fields:     { source: 'cryptonomics_web' },
        }),
      }
    )

    const ckData = await ckRes.json()

    if (!ckRes.ok) {
      console.error('[Newsletter] ConvertKit error:', ckData)
      return NextResponse.json(
        { error: ckData.message || 'Subscription failed. Please try again.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, subscriber: ckData.subscription?.subscriber?.id })
  } catch (err) {
    console.error('[Newsletter] Unexpected error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
