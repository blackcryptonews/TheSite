'use client'

import { Clock, TrendingUp } from 'lucide-react'

const sampleArticles = [
  {
    id: 1,
    title: 'Bitcoin Hits $67K: What This Means for Your Portfolio',
    summary: 'Bitcoin surged to $67,000 this week after regulatory clarity. Here\'s what investors need to know.',
    category: 'Market',
    readTime: '3 min',
    timeAgo: '2 hours ago',
    isAlert: false,
  },
  {
    id: 2,
    title: '[ALERT] New Crypto Scam Targets Social Media Users',
    summary: 'Scammers are impersonating exchanges on Twitter. Learn how to protect yourself.',
    category: 'Security',
    readTime: '4 min',
    timeAgo: '5 hours ago',
    isAlert: true,
  },
  {
    id: 3,
    title: 'Ethereum Layer 2 Solutions See Record Usage',
    summary: 'Gas fees drop 80% as users migrate to Arbitrum and Optimism networks.',
    category: 'Tech',
    readTime: '5 min',
    timeAgo: '8 hours ago',
    isAlert: false,
  },
  {
    id: 4,
    title: 'African Countries Lead in Crypto Adoption',
    summary: 'Nigeria, Kenya lead global crypto adoption as citizens seek alternatives to local currencies.',
    category: 'Global',
    readTime: '6 min',
    timeAgo: '12 hours ago',
    isAlert: false,
  },
]

export default function BreakingIntelligence() {
  return (
    <div id="intelligence" className="bg-onyx border border-purple/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-grotesk text-2xl text-purple">Breaking Intelligence</h2>
        <TrendingUp className="text-cyan" size={24} />
      </div>

      <div className="space-y-4">
        {sampleArticles.map((article) => (
          <article
            key={article.id}
            className="border border-silver/20 rounded-lg p-4 hover:border-purple/50 transition-colors cursor-pointer group"
          >
            {article.isAlert && (
              <span className="inline-block bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded mb-2">
                [ALERT]
              </span>
            )}
            
            <h3 className="font-grotesk text-lg text-white mb-2 group-hover:text-cyan transition-colors">
              {article.title}
            </h3>
            
            <p className="text-silver/70 text-sm mb-3">
              {article.summary}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-silver/60">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {article.timeAgo}
              </span>
              <span>•</span>
              <span>{article.readTime} read</span>
              <span>•</span>
              <span className="text-purple">{article.category}</span>
            </div>
          </article>
        ))}
      </div>

      <button className="w-full mt-4 text-cyan hover:text-purple transition-colors font-grotesk text-sm">
        View All Articles →
      </button>
    </div>
  )
}
