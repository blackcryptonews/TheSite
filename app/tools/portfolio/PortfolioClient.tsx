'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, TrendingUp, TrendingDown, RefreshCw, PieChart, Shield, DollarSign } from 'lucide-react'
import toast from 'react-hot-toast'

interface CoinPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  image: string
}

interface Holding {
  id: string
  coinId: string
  symbol: string
  name: string
  amount: number
  buyPrice: number
  image: string
}

const POPULAR_COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'polygon', symbol: 'MATIC', name: 'Polygon' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
]

const STORAGE_KEY = 'bcn_portfolio_v1'

function loadHoldings(): Holding[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveHoldings(h: Holding[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(h)) } catch {}
}

export default function PortfolioClient() {
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [prices, setPrices] = useState<Record<string, CoinPrice>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Add form state
  const [selectedCoin, setSelectedCoin] = useState(POPULAR_COINS[0].id)
  const [amount, setAmount] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setHoldings(loadHoldings())
  }, [])

  const fetchPrices = useCallback(async (coinIds: string[]) => {
    if (coinIds.length === 0) return
    setIsLoading(true)
    try {
      const ids = coinIds.join(',')
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false`,
        { next: { revalidate: 60 } }
      )
      if (!res.ok) throw new Error('Price fetch failed')
      const data: CoinPrice[] = await res.json()
      const map: Record<string, CoinPrice> = {}
      data.forEach(c => { map[c.id] = c })
      setPrices(map)
      setLastUpdated(new Date())
    } catch {
      toast.error('Could not update prices. Check your connection.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch prices when holdings change
  useEffect(() => {
    const ids = [...new Set(holdings.map(h => h.coinId))]
    if (ids.length > 0) fetchPrices(ids)
  }, [holdings, fetchPrices])

  const addHolding = () => {
    const coin = POPULAR_COINS.find(c => c.id === selectedCoin)
    if (!coin) return
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Enter a valid amount'); return
    }
    const newHolding: Holding = {
      id: Date.now().toString(),
      coinId: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      amount: Number(amount),
      buyPrice: buyPrice ? Number(buyPrice) : (prices[coin.id]?.current_price || 0),
      image: prices[coin.id]?.image || '',
    }
    const updated = [...holdings, newHolding]
    setHoldings(updated)
    saveHoldings(updated)
    setAmount('')
    setBuyPrice('')
    setShowAdd(false)
    toast.success(`Added ${coin.name} to portfolio`)
  }

  const removeHolding = (id: string) => {
    const updated = holdings.filter(h => h.id !== id)
    setHoldings(updated)
    saveHoldings(updated)
  }

  // Portfolio calculations
  const totalValue = holdings.reduce((sum, h) => {
    const price = prices[h.coinId]?.current_price || 0
    return sum + (h.amount * price)
  }, 0)

  const totalCost = holdings.reduce((sum, h) => sum + (h.amount * h.buyPrice), 0)
  const totalPnl = totalValue - totalCost
  const totalPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const fmtPct = (n: number) => (n >= 0 ? '+' : '') + n.toFixed(2) + '%'

  return (
    <main className="min-h-screen bg-onyx">

      {/* Header */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-onyx to-purple/10" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <PieChart className="w-5 h-5 text-cyan" />
                <span className="font-orbitron text-xs tracking-widest text-cyan/70 uppercase">Portfolio Tracker</span>
              </div>
              <h1 className="font-grotesk text-3xl md:text-5xl font-bold text-white">My Crypto Portfolio</h1>
              <p className="text-silver/50 text-sm mt-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Private · Stored locally · No account needed
              </p>
            </div>
            <div className="flex items-center gap-2">
              {lastUpdated && (
                <span className="text-silver/30 text-xs">
                  Updated {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={() => fetchPrices(holdings.map(h => h.coinId))}
                disabled={isLoading || holdings.length === 0}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan/10 border border-cyan/20 text-cyan text-xs font-grotesk hover:bg-cyan/20 transition-all disabled:opacity-40"
              >
                <RefreshCw className={"w-3.5 h-3.5 " + (isLoading ? 'animate-spin' : '')} />
                Refresh
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-20">

        {/* Summary Cards */}
        {holdings.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Total Value', value: fmt(totalValue), icon: DollarSign, color: 'text-cyan', bg: 'border-cyan/20' },
              { label: 'Total Cost',  value: fmt(totalCost),  icon: DollarSign, color: 'text-silver/60', bg: 'border-white/10' },
              {
                label: 'Total P&L',
                value: fmt(totalPnl),
                icon: totalPnl >= 0 ? TrendingUp : TrendingDown,
                color: totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400',
                bg: totalPnl >= 0 ? 'border-emerald-500/20' : 'border-red-500/20',
              },
              {
                label: 'Return',
                value: fmtPct(totalPnlPct),
                icon: totalPnlPct >= 0 ? TrendingUp : TrendingDown,
                color: totalPnlPct >= 0 ? 'text-emerald-400' : 'text-red-400',
                bg: totalPnlPct >= 0 ? 'border-emerald-500/20' : 'border-red-500/20',
              },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={"p-4 rounded-2xl bg-gradient-to-br from-white/3 to-transparent border " + card.bg}
              >
                <card.icon className={"w-4 h-4 mb-2 " + card.color} />
                <div className={"text-xl font-bold font-grotesk " + card.color}>{card.value}</div>
                <div className="text-silver/40 text-xs">{card.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Holdings Table */}
        {holdings.length > 0 && (
          <div className="mb-6 rounded-2xl border border-white/10 overflow-hidden">
            <div className="bg-white/3 px-5 py-3 grid grid-cols-5 text-[10px] font-orbitron text-silver/30 uppercase tracking-widest">
              <span className="col-span-2">Asset</span>
              <span className="text-right">Price</span>
              <span className="text-right">Value</span>
              <span className="text-right">P&L</span>
            </div>
            <AnimatePresence>
              {holdings.map((h, i) => {
                const price   = prices[h.coinId]?.current_price || 0
                const chg24h  = prices[h.coinId]?.price_change_percentage_24h || 0
                const value   = h.amount * price
                const cost    = h.amount * h.buyPrice
                const pnl     = value - cost
                const pnlPct  = cost > 0 ? (pnl / cost) * 100 : 0
                const isUp    = pnl >= 0
                return (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: i * 0.04 }}
                    className="px-5 py-4 grid grid-cols-5 items-center border-t border-white/5 hover:bg-white/2 group transition-colors"
                  >
                    <div className="col-span-2 flex items-center gap-3">
                      {prices[h.coinId]?.image && (
                        <img src={prices[h.coinId].image} alt={h.name} className="w-7 h-7 rounded-full" />
                      )}
                      <div>
                        <div className="font-grotesk font-bold text-white text-sm">{h.symbol}</div>
                        <div className="text-silver/40 text-xs">{h.amount} {h.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm font-grotesk">{price >= 1 ? fmt(price) : '$' + price.toFixed(4)}</div>
                      <div className={"text-[11px] " + (chg24h >= 0 ? 'text-emerald-400' : 'text-red-400')}>
                        {fmtPct(chg24h)} 24h
                      </div>
                    </div>
                    <div className="text-right text-white text-sm font-grotesk">{fmt(value)}</div>
                    <div className="text-right flex items-center justify-end gap-2">
                      <div>
                        <div className={"text-sm font-grotesk font-semibold " + (isUp ? 'text-emerald-400' : 'text-red-400')}>
                          {fmt(pnl)}
                        </div>
                        <div className={"text-[11px] " + (isUp ? 'text-emerald-400/70' : 'text-red-400/70')}>
                          {fmtPct(pnlPct)}
                        </div>
                      </div>
                      <button
                        onClick={() => removeHolding(h.id)}
                        className="p-1 rounded text-silver/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {holdings.length === 0 && (
          <div className="text-center py-20">
            <PieChart className="w-12 h-12 text-purple/30 mx-auto mb-4" />
            <h3 className="font-grotesk text-xl font-bold text-white/60 mb-2">Your portfolio is empty</h3>
            <p className="text-silver/30 text-sm mb-6">Add your first holding to start tracking</p>
          </div>
        )}

        {/* Add Holding */}
        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-4 p-5 rounded-2xl bg-gradient-to-br from-purple/10 to-onyx border border-purple/30"
            >
              <h3 className="font-grotesk font-bold text-white mb-4">Add Holding</h3>
              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="block text-silver/50 text-xs mb-1.5 font-grotesk">Coin</label>
                  <select
                    value={selectedCoin}
                    onChange={e => setSelectedCoin(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-onyx/60 border border-purple/30 text-white text-sm focus:outline-none focus:border-cyan/50 transition-all"
                  >
                    {POPULAR_COINS.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.symbol})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-silver/50 text-xs mb-1.5 font-grotesk">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="any"
                    className="w-full px-3 py-2.5 rounded-xl bg-onyx/60 border border-purple/30 text-white text-sm placeholder-silver/20 focus:outline-none focus:border-cyan/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-silver/50 text-xs mb-1.5 font-grotesk">Buy Price (USD, optional)</label>
                  <input
                    type="number"
                    value={buyPrice}
                    onChange={e => setBuyPrice(e.target.value)}
                    placeholder={prices[selectedCoin] ? '$' + prices[selectedCoin].current_price.toLocaleString() : 'Current price'}
                    min="0"
                    step="any"
                    className="w-full px-3 py-2.5 rounded-xl bg-onyx/60 border border-purple/30 text-white text-sm placeholder-silver/20 focus:outline-none focus:border-cyan/50 transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addHolding}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple to-cyan text-white text-sm font-grotesk font-bold hover:shadow-lg hover:shadow-purple/30 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add to Portfolio
                </button>
                <button
                  onClick={() => setShowAdd(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-silver/60 text-sm hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-dashed border-purple/30 text-silver/50 hover:text-white hover:border-purple/60 transition-all font-grotesk text-sm w-full justify-center"
          >
            <Plus className="w-4 h-4" /> Add Holding
          </button>
        )}

        {/* Privacy note */}
        <p className="text-center text-silver/20 text-xs mt-6 flex items-center justify-center gap-1.5">
          <Shield className="w-3 h-3 text-emerald-400/50" />
          All data is stored locally on your device. Nothing is sent to our servers.
        </p>
      </div>
    </main>
  )
}
