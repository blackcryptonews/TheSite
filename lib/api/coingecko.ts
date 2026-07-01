export interface CryptoPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  image?: string
}

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3'

export async function getCryptoPrices(ids: string[] = [
  'bitcoin',
  'ethereum',
  'solana',
  'cardano',
  'polkadot',
  'avalanche-2',
  'polygon-ecosystem-token',
  'chainlink'
]): Promise<CryptoPrice[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&ids=${ids.join(',')}&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`,
      {
        next: { revalidate: 60 } // Cache for 60 seconds
      }
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching crypto prices:', error)
    // Return mock data as fallback
    return getMockPrices()
  }
}

export async function getCryptoDetails(id: string) {
  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`,
      {
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching crypto details:', error)
    return null
  }
}

export async function getTrendingCoins() {
  try {
    const response = await fetch(`${COINGECKO_API_URL}/search/trending`, {
      next: { revalidate: 600 } // Cache for 10 minutes
    })

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data = await response.json()
    return data.coins
  } catch (error) {
    console.error('Error fetching trending coins:', error)
    return []
  }
}

// Fallback mock data
function getMockPrices(): CryptoPrice[] {
  return [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      current_price: 43250.00,
      price_change_percentage_24h: 2.5,
      market_cap: 845000000000,
      total_volume: 25000000000
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      current_price: 2280.00,
      price_change_percentage_24h: 3.2,
      market_cap: 274000000000,
      total_volume: 15000000000
    },
    {
      id: 'solana',
      symbol: 'sol',
      name: 'Solana',
      current_price: 98.50,
      price_change_percentage_24h: -1.8,
      market_cap: 42000000000,
      total_volume: 2500000000
    },
    {
      id: 'cardano',
      symbol: 'ada',
      name: 'Cardano',
      current_price: 0.52,
      price_change_percentage_24h: 1.2,
      market_cap: 18000000000,
      total_volume: 400000000
    },
    {
      id: 'polkadot',
      symbol: 'dot',
      name: 'Polkadot',
      current_price: 7.30,
      price_change_percentage_24h: 4.5,
      market_cap: 9500000000,
      total_volume: 280000000
    },
    {
      id: 'avalanche-2',
      symbol: 'avax',
      name: 'Avalanche',
      current_price: 36.80,
      price_change_percentage_24h: -2.1,
      market_cap: 13500000000,
      total_volume: 650000000
    },
    {
      id: 'polygon-ecosystem-token',
      symbol: 'matic',
      name: 'Polygon',
      current_price: 0.85,
      price_change_percentage_24h: 5.7,
      market_cap: 7800000000,
      total_volume: 420000000
    },
    {
      id: 'chainlink',
      symbol: 'link',
      name: 'Chainlink',
      current_price: 14.60,
      price_change_percentage_24h: 2.8,
      market_cap: 8200000000,
      total_volume: 380000000
    }
  ]
}
