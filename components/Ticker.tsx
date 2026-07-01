'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Wifi, WifiOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CryptoPrice {
  symbol: string
  price: number
  change: number
  name: string
}

export default function Ticker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('/api/crypto/prices')
        const data = await response.json()

        if (data.success) {
          const formattedPrices = data.data.map((coin: any) => ({
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            change: coin.price_change_percentage_24h || 0,
            name: coin.name
          }))
          setPrices(formattedPrices)
          setIsLive(true)
          setError(false)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error fetching prices:', err)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-onyx via-purple/5 to-onyx border-y border-purple/30 overflow-hidden">
        <div className="py-3 flex items-center justify-center">
          <div className="flex items-center gap-2 text-purple/50 font-orbitron text-sm">
            <div className="w-2 h-2 bg-purple/50 rounded-full animate-pulse" />
            Loading live prices...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-onyx via-purple/5 to-onyx border-y border-purple/30 overflow-hidden relative">
      {/* Live indicator */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        >
          {isLive && !error ? (
            <Wifi className="w-4 h-4 text-cyan" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
        </motion.div>
        <span className={`text-xs font-orbitron ${isLive && !error ? 'text-cyan' : 'text-red-500'}`}>
          {isLive && !error ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      <div className="animate-marquee whitespace-nowrap py-3">
        <div className="inline-flex gap-8 font-orbitron text-sm">
          <AnimatePresence>
            {prices.map((crypto, index) => (
              <motion.div
                key={crypto.symbol}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="inline-flex items-center gap-2 px-2"
              >
                <span className="text-cyan font-bold tracking-wider">{crypto.symbol}</span>
                <motion.span
                  key={crypto.price}
                  initial={{ scale: 1.2, color: '#00F0FF' }}
                  animate={{ scale: 1, color: '#FFFFFF' }}
                  transition={{ duration: 0.5 }}
                  className="text-white font-semibold"
                >
                  ${crypto.price >= 1 ? crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : crypto.price.toFixed(4)}
                </motion.span>
                <motion.span
                  className={`flex items-center gap-1 font-semibold ${crypto.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {crypto.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(crypto.change).toFixed(2)}%
                </motion.span>
                <span className="text-purple/40">•</span>
              </motion.div>
            ))}
            {/* Duplicate for infinite scroll effect */}
            {prices.map((crypto) => (
              <div key={`${crypto.symbol}-dup`} className="inline-flex items-center gap-2 px-2">
                <span className="text-cyan font-bold tracking-wider">{crypto.symbol}</span>
                <span className="text-white font-semibold">
                  ${crypto.price >= 1 ? crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : crypto.price.toFixed(4)}
                </span>
                <span className={`flex items-center gap-1 font-semibold ${crypto.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {crypto.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(crypto.change).toFixed(2)}%
                </span>
                <span className="text-purple/40">•</span>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* marquee animation is defined in globals.css */}
    </div>
  )
}
