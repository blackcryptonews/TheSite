'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, ArrowRight, BookOpen, Users, Newspaper, Calculator } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { guides } from '@/lib/data/guides'
import { founders } from '@/lib/data/founders'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const lowerQuery = query.toLowerCase()
    const searchResults: any[] = []

    // Search guides
    guides.forEach(guide => {
      if (
        guide.title.toLowerCase().includes(lowerQuery) ||
        guide.excerpt.toLowerCase().includes(lowerQuery) ||
        guide.tags.some(tag => tag.includes(lowerQuery))
      ) {
        searchResults.push({
          type: 'guide',
          icon: BookOpen,
          title: guide.title,
          subtitle: guide.category,
          description: guide.excerpt,
          link: `/guides/${guide.slug}`
        })
      }
    })

    // Search founders
    founders.forEach(founder => {
      if (
        founder.name.toLowerCase().includes(lowerQuery) ||
        founder.project.toLowerCase().includes(lowerQuery) ||
        founder.category.toLowerCase().includes(lowerQuery) ||
        founder.mission.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: 'founder',
          icon: Users,
          title: founder.name,
          subtitle: founder.project,
          description: founder.mission,
          link: `#founders`
        })
      }
    })

    // Search news categories
    const newsCategories = ['Market', 'Security', 'Tech', 'Global', 'DeFi']
    newsCategories.forEach(category => {
      if (category.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          type: 'news',
          icon: Newspaper,
          title: `${category} News`,
          subtitle: 'Breaking Intelligence',
          description: `Latest ${category.toLowerCase()} news and updates`,
          link: `#intelligence`
        })
      }
    })

    // Search tools
    const tools = [
      { name: 'Portfolio Tracker', desc: 'Track your crypto holdings' },
      { name: 'DCA Calculator', desc: 'Calculate dollar-cost averaging' },
      { name: 'Gas Fee Estimator', desc: 'Check current gas prices' },
      { name: 'Wallet Comparison', desc: 'Compare crypto wallets' }
    ]
    tools.forEach(tool => {
      if (
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.desc.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: 'tool',
          icon: Calculator,
          title: tool.name,
          subtitle: 'Tools & Calculators',
          description: tool.desc,
          link: `#tools`
        })
      }
    })

    setResults(searchResults.slice(0, 8))
  }, [query])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (!isOpen) {
          // Open handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-onyx/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="relative w-full max-w-2xl"
        >
          <div className="backdrop-blur-xl bg-gradient-to-br from-purple/20 via-onyx/95 to-cyan/20 border border-purple/30 rounded-2xl shadow-2xl overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center gap-4 p-6 border-b border-purple/20">
              <Search className="w-6 h-6 text-purple" strokeWidth={2.5} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search guides, founders, news, tools..."
                className="flex-1 bg-transparent text-white text-lg placeholder-silver/50 outline-none"
              />
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-purple/10 transition-colors"
              >
                <X className="w-5 h-5 text-silver/70" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[500px] overflow-y-auto">
              {query.length < 2 ? (
                <div className="p-8 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple/10 border border-purple/20 text-silver/70 text-sm mb-4">
                    <kbd className="px-2 py-1 bg-onyx/50 rounded text-xs">⌘K</kbd>
                    <span>or</span>
                    <kbd className="px-2 py-1 bg-onyx/50 rounded text-xs">Ctrl+K</kbd>
                  </div>
                  <p className="text-silver/50 text-sm">
                    Type to search across guides, founders, news, and tools
                  </p>
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center text-silver/50">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="p-4 space-y-2">
                  {results.map((result, index) => {
                    const Icon = result.icon
                    return (
                      <motion.a
                        key={index}
                        href={result.link}
                        onClick={onClose}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-purple/10 border border-transparent hover:border-purple/30 transition-all group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-purple/10 border border-purple/20 group-hover:bg-purple/20 transition-colors">
                          <Icon className="w-5 h-5 text-purple" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white font-semibold group-hover:text-gradient transition-all truncate">
                              {result.title}
                            </h4>
                            <span className="text-xs text-silver/50 whitespace-nowrap">
                              {result.subtitle}
                            </span>
                          </div>
                          <p className="text-silver/70 text-sm line-clamp-1">
                            {result.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-silver/30 group-hover:text-cyan group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </motion.a>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer Hint */}
            {results.length > 0 && (
              <div className="px-6 py-3 border-t border-purple/20 text-xs text-silver/50 flex items-center justify-between">
                <span>Press ESC to close</span>
                <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
