import { NextResponse } from 'next/server'
import { getCryptoPrices } from '@/lib/api/coingecko'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const idsParam = searchParams.get('ids')

    const ids = idsParam ? idsParam.split(',') : undefined
    const prices = await getCryptoPrices(ids)

    return NextResponse.json({
      success: true,
      data: prices,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Crypto prices API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch crypto prices',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export const revalidate = 60 // Revalidate every 60 seconds
