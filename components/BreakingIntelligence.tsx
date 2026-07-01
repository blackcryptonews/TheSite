'use client'

import { useEffect, useState } from 'react'
import { Clock, TrendingUp, AlertTriangle, ArrowRight, RefreshCw, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NewsArticle } from '@/lib/api/news'
import Skeleton from './ui/Skeleton'
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

const categoryBg: Record<string, string> = {
  Market:   'bg-cyan/10 border-cyan/30 text-cyan',
  Security: 'bg-red-500/10 border-red-500/30 text-red-400',
  Tech:     'bg-purple/10 border-purple/30 text-purple',
  Global:   'bg-gold/10 border-gold/30 text-gold',
  DeFi:     'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
}

export default function BreakingIntelligence() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All')
  const [visibleCount, setVisibleCount] = useState(6)

  const fetchNews = async (showToast = false) => {
    try {
      if (showToast) setIsRefreshing(true)
      const response = await fetch('/api/news')
      const data = await response.json()
      if (data.success && data.data?.length > 0) {
        setArticles(data.data)
        if (showToast) toast.success('Intelligence updated', { icon: '📡' })
      } else {
        if (showToast) toast.error('No new articles available')
      }
    } catch (error) {
      console.error('Error fetching news:', error)
      if (showToast) toast.error('Failed to reach news servers')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchNews()
    const interval = setInterval(() => fetchNews(), 600000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = activeFilter === 'All'
    ? articles
    : articles.filter(a => a.category === activeFilter)

  const visible = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  if (isLoading) {
    return (
      <section id="intelligence" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-gradient mb-2">
              Breaking Intelligence
            </h2>
            <p className="text-silver/70">Latest crypto news and security alerts</p>
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="backdrop-blur-xl bg-gradient-to-br from-purple/10 via-onyx/50 to-cyan/10 border border-purple/30 rounded-2xl p-6">
                <Skeleton lines={3} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="intelligence" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-gradient mb-2">
              Breaking Intelligence
            </h2>
            <p className="text-silver/70 text-sm">
              Live from {articles.length > 0 ? `${articles.length} articles across 7 sources` : 'our newsroom'}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchNews(true)}
            disabled={isRefreshing}
            className="p-2 rounded-lg bg-purple/10 border border-purple/30 text-purple hover:bg-purple/20 transition-all disabled:opacity-50"
            title="Refresh news"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </motion.button>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveFilter(cat); setVisibleCount(6) }}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold font-grotesk border transition-all duration-200
                ${activeFilter === cat
                  ? 'bg-purple text-white border-purple shadow-lg shadow-purple/30'
                  : 'bg-purple/5 border-purple/20 text-silver/70 hover:border-purple/40 hover:text-silver'
                }
              `}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-1.5 text-xs opacity-60">
                  {articles.filter(a => a.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Article Grid */}
        <AnimatePresence mode="wait">
          {visible.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 text-silver/50"
            >
              <TrendingUp className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No articles in this category yet. Refreshing shortly.</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-4"
            >
              {visible.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={article.url || '#'}
                    target={article.url ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="block group"
                    aria-label={`Read: ${article.title}`}
                  >
                    <motion.article
                      whileHover={{ scale: 1.005, y: -2 }}
                      className="backdrop-blur-xl bg-gradient-to-br from-purple/10 via-onyx/50 to-cyan/10 border border-purple/30 rounded-2xl p-6 transition-all duration-300 hover:border-purple/60 hover:shadow-xl hover:shadow-purple/20"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">

                          {/* Alert badge */}
                          {article.isAlert && (
                            <motion.div
                              animate={{ opacity: [1, 0.6, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1.5 rounded-full mb-3 border border-red-500/30"
                            >
                              <AlertTriangle className="w-3 h-3" />
                              SECURITY ALERT
                            </motion.div>
                          )}

                          {/* Title */}
                          <h3 className="font-grotesk text-lg md:text-xl text-white mb-3 group-hover:text-gradient transition-all leading-snug line-clamp-2">
                            {article.title}
                          </h3>

                          {/* Summary */}
                          <p className="text-silver/65 text-sm mb-4 leading-relaxed line-clamp-2">
                            {article.summary}
                          </p>

                          {/* Meta row */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-silver/50">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3" />
                              {article.timeAgo}
                            </span>
                            <span>{article.readTime} read</span>
                            {article.source && (
                              <span className="text-silver/40">{article.source}</span>
                            )}
                            <span className={`font-bold ${categoryColors[article.category] ?? 'text-silver'}`}>
                              {article.category}
                            </span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <motion.div
                          className="text-purple/40 group-hover:text-cyan transition-colors flex-shrink-0 mt-1"
                          whileHover={{ x: 4 }}
                        >
                          {article.url ? (
                            <ExternalLink className="w-5 h-5" />
                          ) : (
                            <ArrowRight className="w-5 h-5" />
                          )}
                        </motion.div>
                      </div>
                    </motion.article>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More / View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {hasMore && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setVisibleCount(v => v + 6)}
              className="px-6 py-3 rounded-xl bg-purple/10 border border-purple/30 text-purple font-grotesk font-semibold text-sm hover:bg-purple/20 hover:border-purple/50 transition-all"
            >
              Load More ({filtered.length - visibleCount} remaining)
            </motion.button>
          )}
          <a
            href="/news"
            className="group inline-flex items-center gap-2 text-cyan hover:text-purple transition-all font-grotesk text-sm font-semibold"
          >
            View All Articles
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
