'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface CryptoPrice {
  symbol: string
  price: number
  change: number
}

export default function Ticker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([
    { symbol: 'BTC', price: 67234, change: 2.3 },
    { symbol: 'ETH', price: 3456, change: 1.8 },
    { symbol: 'SOL', price: 142, change: -0.5 },
    { symbol: 'BNB', price: 589, change: 3.1 },
    { symbol: 'MATIC', price: 0.89, change: 5.2 },
    { symbol: 'USDC', price: 1.00, change: 0 },
  ])

  // In production, fetch real prices from CoinGecko API
  // useEffect(() => {
  //   const fetchPrices = async () => {
  //     // API call here
  //   }
  //   fetchPrices()
  //   const interval = setInterval(fetchPrices, 60000) // Update every minute
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <div className="bg-onyx border-y border-purple/30 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap py-3">
        <div className="inline-flex gap-8 font-orbitron text-sm">
          {prices.map((crypto) => (
            <div key={crypto.symbol} className="inline-flex items-center gap-2">
              <span className="text-cyan font-bold">{crypto.symbol}</span>
              <span className="text-white">${crypto.price.toLocaleString()}</span>
              <span className={`flex items-center gap-1 ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {crypto.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(crypto.change)}%
              </span>
              <span className="text-silver/40">|</span>
            </div>
          ))}
          {/* Duplicate for infinite scroll effect */}
          {prices.map((crypto) => (
            <div key={`${crypto.symbol}-dup`} className="inline-flex items-center gap-2">
              <span className="text-cyan font-bold">{crypto.symbol}</span>
              <span className="text-white">${crypto.price.toLocaleString()}</span>
              <span className={`flex items-center gap-1 ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {crypto.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(crypto.change)}%
              </span>
              <span className="text-silver/40">|</span>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
