'use client'

import { Calculator, Wallet, TrendingUp, Scale } from 'lucide-react'

const tools = [
  {
    id: 1,
    name: 'Portfolio Tracker',
    description: 'Track your crypto holdings and performance',
    icon: Wallet,
    comingSoon: false,
  },
  {
    id: 2,
    name: 'Gas Fee Estimator',
    description: 'Check current gas prices across chains',
    icon: TrendingUp,
    comingSoon: false,
  },
  {
    id: 3,
    name: 'DCA Calculator',
    description: 'Calculate dollar-cost averaging returns',
    icon: Calculator,
    comingSoon: false,
  },
  {
    id: 4,
    name: 'Wallet Comparison',
    description: 'Compare MetaMask, Coinbase, Trust Wallet',
    icon: Scale,
    comingSoon: false,
  },
]

export default function Tools() {
  return (
    <div id="tools" className="bg-onyx border border-purple/30 rounded-lg p-6">
      <h2 className="font-grotesk text-2xl text-purple mb-6">Tools & Calculators</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <div
              key={tool.id}
              className="border border-silver/20 rounded-lg p-4 hover:border-purple/50 transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple/20 to-cyan/20 rounded-lg flex items-center justify-center mb-3 group-hover:from-purple/30 group-hover:to-cyan/30 transition-colors">
                <Icon className="text-purple group-hover:text-cyan transition-colors" size={24} />
              </div>
              
              <h3 className="font-grotesk text-white mb-2 group-hover:text-cyan transition-colors">
                {tool.name}
              </h3>
              
              <p className="text-silver/70 text-sm mb-3">
                {tool.description}
              </p>
              
              {tool.comingSoon ? (
                <span className="text-xs text-silver/40">Coming Soon</span>
              ) : (
                <span className="text-xs text-purple group-hover:text-cyan transition-colors">
                  Try it →
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
