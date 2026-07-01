'use client'

import { BookOpen, ArrowRight, Sparkles, Rocket, Shield, Layers, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'

const guides = [
  {
    id: 1,
    title: 'How to Buy Your First Crypto in 2025',
    category: 'Getting Started',
    difficulty: 'Beginner' as const,
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Wallet Security 101: Protect Your Assets',
    category: 'Security',
    difficulty: 'Beginner' as const,
    readTime: '7 min',
  },
  {
    id: 3,
    title: 'DeFi Explained: Banking Without Banks',
    category: 'DeFi',
    difficulty: 'Intermediate' as const,
    readTime: '8 min',
  },
  {
    id: 4,
    title: 'Accept Crypto Payments in Your Business',
    category: 'Business',
    difficulty: 'Intermediate' as const,
    readTime: '6 min',
  },
]

const getIcon = (index: number) => {
  const icons = [Rocket, Shield, Layers, Briefcase]
  return icons[index] || BookOpen
}

const getIconColors = (index: number) => {
  const colors = [
    { color: 'text-cyan', bg: 'bg-cyan/10' },
    { color: 'text-purple', bg: 'bg-purple/10' },
    { color: 'text-gold', bg: 'bg-gold/10' },
    { color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ]
  return colors[index] || { color: 'text-cyan', bg: 'bg-cyan/10' }
}

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-gold/20 text-gold border-gold/30',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export default function WealthGuides() {
  return (
    <section id="learn" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple/30 bg-purple/10 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-grotesk text-silver">Build Real Wealth</span>
          </div>
          <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-gradient mb-4">
            Wealth Guides
          </h2>
          <p className="text-silver/70 text-lg max-w-2xl mx-auto">
            Step-by-step guides to build wealth with crypto. No jargon, just clear instructions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide, index) => {
            const IconComponent = getIcon(index)
            const { color, bg } = getIconColors(index)
            return (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full backdrop-blur-xl bg-gradient-to-br from-purple/10 via-onyx/50 to-cyan/10 border border-purple/30 rounded-2xl p-6 transition-all duration-300 hover:border-purple/50 hover:shadow-lg hover:shadow-purple/20 cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`${bg} ${color} p-3 rounded-xl border border-current/20`}>
                        <IconComponent className="w-6 h-6" strokeWidth={2.5} />
                      </div>
                    <div>
                      <span className="inline-block text-xs text-cyan font-semibold mb-1 uppercase tracking-wider">
                        {guide.category}
                      </span>
                      <h3 className="font-grotesk text-lg text-white group-hover:text-gradient transition-all font-bold">
                        {guide.title}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    className="text-cyan/50 group-hover:text-cyan transition-colors"
                    whileHover={{ x: 5, scale: 1.1 }}
                  >
                    <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                  </motion.div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${difficultyColors[guide.difficulty]}`}>
                    {guide.difficulty}
                  </span>
                  <span className="text-xs text-silver/60">•</span>
                  <span className="text-xs text-silver/60">{guide.readTime} read</span>
                </div>
              </motion.div>
            </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <button className="group inline-flex items-center gap-2 text-cyan hover:text-purple transition-all font-grotesk text-sm font-semibold">
            Browse All Guides
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
