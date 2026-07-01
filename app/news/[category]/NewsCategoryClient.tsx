'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertTriangle, ExternalLink, RefreshCw, ArrowLeft } from 'lucide-react'
import { NewsArticle } from '@/lib/api/news'
import Skeleton from '@/components/ui/Skeleton'
import toast from 'react-hot-toast'
import Link from 'next/link'

const categoryColors: Record<string, string> = {
  market:   'text-cyan',
  security: 'text-red-400',
  tech:     'text-purple',
  global:   'text-gold',
  defi:     'text-emerald-400',
}

const categoryEmoji: Record<string, string> = {
  market:   '📈',
  security: '🔐',
  tech:     '⚡',
  global:   '🌍',
  defi:     '🏦',
}

interface Props {
  category: string
  meta: { title: string; description: string }
}

export default function NewsCategoryClient({ category, meta }: Props) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchNews = useCallback(async (showToast = false) => {
    try {
      if (showToast) setIsRefreshing(true)
      const res = await fetch(`/api/news?category=${category}`)
      const data = await res.json()
      if (data.success) {
        setArticles(data.data || [])
        if (showToast) toast.success('Updated', { icon: categoryEmoji[category] })
      }
    } catch {
      if (showToast) toast.error('Refresh failed')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [category])

  useEffect(() => {
    fetchNews()
    const interval = setInterval(() => fetchNews(), 600000)
    return () => clearInterval(interval)
  }, [fetchNews])

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Back */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-silver/50 hover:text-cyan text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All News
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="text-4xl mb-3">{categoryEmoji[category]}</div>
          <h1 className={`font-grotesk text-4xl md:text-5xl font-bold mb-3 ${categoryColors[category]}`}>
            {meta.title}
          </h1>
          <p className="text-silver/60 text-lg max-w-2xl">{meta.description}</p>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-silver/40 text-xs font-orbitron">
            {isLoading ? 'LOADING...' : `${articles.length} ARTICLES`}
          </p>
          <button
            onClick={() => fetchNews(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-purple/10 border border-purple/30 rounded-lg text-purple text-sm font-grotesk hover:bg-purple/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Articles */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="backdrop-blur-xl bg-gradient-to-br from-purple/10 via-onyx/50 to-cyan/10 border border-purple/30 rounded-2xl p-6">
                <Skeleton lines={4} />
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-silver/40 font-grotesk">No articles yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <a
                  href={article.url || '#'}
                  target={article.url ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group block h-full"
                >
                  <article className="h-full backdrop-blur-xl bg-gradient-to-br from-purple/10 via-onyx/50 to-cyan/10 border border-purple/30 rounded-2xl p-5 transition-all duration-300 hover:border-purple/60 hover:shadow-xl hover:shadow-purple/20 hover:-translate-y-1 flex flex-col">
                    {article.isAlert && (
                      <div className="flex items-center gap-2 text-red-400 text-xs font-bold mb-3">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        SECURITY ALERT
                      </div>
                    )}
                    <h2 className="font-grotesk text-base font-bold text-white group-hover:text-gradient transition-all mb-2 line-clamp-3 leading-snug flex-1">
                      {article.title}
                    </h2>
                    <p className="text-silver/55 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {article.summary}
                    </p>
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
                        <span>{article.source}</span>
                      </div>
                    </div>
                  </article>
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
