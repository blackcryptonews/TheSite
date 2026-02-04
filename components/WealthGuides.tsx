'use client'

import { BookOpen, ArrowRight } from 'lucide-react'

const guides = [
  {
    id: 1,
    title: 'How to Buy Your First Crypto in 2025',
    category: 'Getting Started',
    difficulty: 'Beginner',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Wallet Security 101: Protect Your Assets',
    category: 'Security',
    difficulty: 'Beginner',
    readTime: '7 min',
  },
  {
    id: 3,
    title: 'DeFi Explained: Banking Without Banks',
    category: 'DeFi',
    difficulty: 'Intermediate',
    readTime: '8 min',
  },
  {
    id: 4,
    title: 'Accept Crypto Payments in Your Business',
    category: 'Business',
    difficulty: 'Intermediate',
    readTime: '6 min',
  },
]

export default function WealthGuides() {
  return (
    <div id="learn" className="bg-onyx border border-purple/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-grotesk text-2xl text-purple">Wealth Guides</h2>
        <BookOpen className="text-cyan" size={24} />
      </div>

      <p className="text-silver/70 text-sm mb-6">
        Step-by-step guides to build wealth with crypto. No jargon, just clear instructions.
      </p>

      <div className="space-y-3">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="border border-silver/20 rounded-lg p-4 hover:border-purple/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="inline-block text-xs text-cyan mb-2">
                  {guide.category}
                </span>
                <h3 className="font-grotesk text-white group-hover:text-cyan transition-colors mb-2">
                  {guide.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-silver/60">
                  <span className="px-2 py-1 bg-purple/20 text-purple rounded">
                    {guide.difficulty}
                  </span>
                  <span>{guide.readTime} read</span>
                </div>
              </div>
              <ArrowRight className="text-silver/40 group-hover:text-cyan transition-colors flex-shrink-0" size={20} />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-cyan hover:text-purple transition-colors font-grotesk text-sm">
        Browse All Guides →
      </button>
    </div>
  )
}
