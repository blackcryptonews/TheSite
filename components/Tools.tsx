'use client'

import { Calculator, Wallet, TrendingUp, Scale, ArrowRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const tools = [
  {
    id: 1,
    name: 'Portfolio Tracker',
    description: 'Track your crypto holdings and performance in real-time',
    icon: Wallet,
    gradient: 'from-purple to-pink-500',
    comingSoon: false,
    link: '/tools/portfolio',
  },
  {
    id: 2,
    name: 'Gas Fee Estimator',
    description: 'Check current gas prices across multiple chains',
    icon: Zap,
    gradient: 'from-cyan to-blue-500',
    comingSoon: true,
  },
  {
    id: 3,
    name: 'DCA Calculator',
    description: 'Calculate dollar-cost averaging returns with historical data',
    icon: Calculator,
    gradient: 'from-gold to-orange-500',
    comingSoon: true,
  },
  {
    id: 4,
    name: 'Wallet Comparison',
    description: 'Compare features across MetaMask, Coinbase, and more',
    icon: Scale,
    gradient: 'from-emerald-500 to-teal-500',
    comingSoon: true,
  },
]

export default function Tools() {
  return (
    <section id="tools" className="py-16 px-4 bg-gradient-to-b from-onyx to-purple/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-gradient mb-4">
            Tools & Calculators
          </h2>
          <p className="text-silver/70 text-lg">
            Powerful tools to help you make smarter crypto decisions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <motion.a
                key={tool.id}
                href={tool.link || '#tools'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative block"
              >
                <div className="h-full backdrop-blur-xl bg-gradient-to-br from-purple/10 via-onyx/80 to-cyan/10 border border-purple/30 rounded-2xl p-6 transition-all duration-300 hover:border-purple/50 hover:shadow-xl hover:shadow-purple/20 cursor-pointer">
                  {/* Icon container with gradient */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={28} strokeWidth={2.5} />
                  </div>

                  <h3 className="font-grotesk text-xl text-white mb-3 font-bold group-hover:text-gradient transition-all">
                    {tool.name}
                  </h3>

                  <p className="text-silver/70 text-sm mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  {tool.comingSoon ? (
                    <span className="inline-flex items-center gap-2 text-xs text-silver/40 font-semibold">
                      Coming Soon
                    </span>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-purple group-hover:text-cyan transition-colors font-semibold">
                      Try it now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                    </div>
                  )}

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple/0 to-cyan/0 group-hover:from-purple/10 group-hover:to-cyan/10 transition-all duration-300 -z-10" />
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
