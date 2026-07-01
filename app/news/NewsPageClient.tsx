'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, AlertTriangle, ExternalLink, RefreshCw, Search, TrendingUp } from 'lucide-react'
import { NewsArticle } from '@/lib/api/news'
import Skeleton from '@/components/ui/Skeleton'
import toast from 'react-hot-toast'

const CATEGORIES = ['All', 'Market', 'DeFi', 'Tech', 'Security', 'Global'] as const
type FilterCategory = typeof CATEGORIES[number]

const categoryColors: Record<string, string> = {
  Market:   'text-cyan',
  Security: 'text-red-400',
  Tech:     'text-purple',
  Global:   'text-gold',
  DeFi:     'text-emerald-400',
}

const categoryDot: Record<string, string> = {
  Market:   'bg-cyan',
  Security: 'bg-red-400',
  Tech:     'bg-purple',
  Global:   'bg-gold',
  DeFi:     'bg-emerald-400',
}

export default function NewsPageClient() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const PER_PAGE = 12

  const fetchNews = useCallback(async (showToast = false) => {
    try {
      if (showToast) setIsRefreshing(true)
      const res = await fetch('/api/news')
      const data = await res.json()
      if (data.success && data.data?.length > 0) {
        setArticles(data.data)
        if (showToast) toast.success('Feed refreshed', { icon: '📡' })
      }
    } catch {
      if (showToast) toast.error('Could not refresh feed')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchNews()
    const interval = setInterval(() => fetchNews(), 600000)
    return () => clearInterval(interval)
  }, [fetchNews])

  // Reset page on filter/search change
  useEffect(() => { setPage(1) }, [activeFilter, query])

  const filtered = articles
    .filter(a => activeFilter === 'All' || a.category === activeFilter)
    .filter(a =>
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.summary.toLowerCase().includes(query.toLowerCase())
    )

  const paginated = filtered.slice(0, page * PER_PAGE)
  const hasMore = paginated.length < filtered.length

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
            <span className="text-cyan font-orbitron text-xs tracking-widest uppercase">Live Feed</span>
          </div>
          <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-gradient mb-3">
            Crypto Intelligence
          </h1>
          <p className="text-silver/60 text-lg max-w-2xl">
            Breaking news, market moves, security alerts, and global blockchain developments —
            curated for the Black community worldwide.
          </p>
        </motion.div>

        {/* Search + Refresh */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver/40" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 bg-purple/5 border border-purple/20 rounded-xl text-silver placeholder-silver/30 focus:outline-none focus:border-purple/50 focus:bg-purple/10 transition-all"
            />
          </div>
          <button
            onClick={() => fetchNews(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-5 py-3 bg-purple/10 border border-purple/30 rounded-xl text-purple font-grotesk font-semibold text-sm hover:bg-purple/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold font-grotesk border transition-all duration-200
                ${activeFilter === cat
                  ? 'bg-purple text-white border-purple shadow-lg shadow-purple/30'
                  : 'bg-purple/5 border-purple/20 text-silver/70 hover:border-purple/40 hover:text-silver'
                }
              `}
            >
              {cat}
              {cat !== 'All' && !isLoading && (
                <span className="ml-1.5 text-xs opacity-60">
                  {articles.filter(a => a.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results count */}
        {!isLoading && (
          <p className="text-silver/40 text-xs mb-4 font-orbitron">
            {filtered.length} ARTICLE{filtered.length !== 1 ? 'S' : ''}
            {activeFilter !== 'All' ? ` IN ${activeFilter.toUpperCase()}` : ''}
            {query ? ` MATCHING "${query.toUpperCase()}"` : ''}
          </p>
        )}

        {/* Article Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="backdrop-blur-xl bg-gradient-to-br from-purple/10 via-onyx/50 to-cyan/10 border border-purple/30 rounded-2xl p-6">
                <Skeleton lines={4} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple/30" />
            <p className="text-silver/40 font-grotesk">No articles match your search.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFilter}-${query}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginated.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={article.url || '#'}
                    target={article.url ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group block h-full"
                  >
                    <article className="h-full backdrop-blur-xl bg-gradient-to-br from-purple/10 via-onyx/50 to-cyan/10 border border-purple/30 rounded-2xl p-5 transition-all duration-300 hover:border-purple/60 hover:shadow-xl hover:shadow-purple/20 hover:-translate-y-1 flex flex-col">

                      {/* Category + Alert */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${categoryDot[article.category] ?? 'bg-silver'}`} />
                          <span className={`text-xs font-bold font-grotesk ${categoryColors[article.category] ?? 'text-silver'}`}>
                            {article.category}
                          </span>
                        </div>
                        {article.isAlert && (
                          <span className="flex items-center gap-1 text-red-400 text-xs font-bold">
                            <AlertTriangle className="w-3 h-3" />
                            ALERT
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="font-grotesk text-base font-bold text-white group-hover:text-gradient transition-all mb-2 line-clamp-3 leading-snug flex-1">
                        {article.title}
                      </h2>

                      {/* Summary */}
                      <p className="text-silver/55 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {article.summary}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-silver/40 mt-auto pt-3 border-t border-purple/10">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.timeAgo}
                          </span>
                          <span>{article.readTime} read</span>
                        </div>
                        <div className="flex items-center gap-1 text-purple/40 group-hover:text-cyan transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="text-xs">{article.source}</span>
                        </div>
                      </div>
                    </article>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Load More */}
        {hasMore && !isLoading && (
          <div className="mt-10 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPage(p => p + 1)}
              className="px-8 py-4 rounded-xl bg-purple/10 border border-purple/30 text-purple font-grotesk font-semibold hover:bg-purple/20 hover:border-purple/50 transition-all"
            >
              Load More ({filtered.length - paginated.length} remaining)
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}
