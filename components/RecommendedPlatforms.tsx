'use client'

import { ExternalLink, Sparkles, Gift } from 'lucide-react'

export default function RecommendedPlatforms() {
  const platforms = [
    {
      name: 'Moonshot',
      description: 'Discover early-stage crypto gems',
      url: 'https://moonshot.com?ref=7TvvlcnylJ',
      category: 'Discovery',
      bonus: 'Special features',
      icon: '🚀'
    },
    {
      name: 'Staker',
      description: 'Earn rewards by staking crypto',
      url: 'https://staker.app/invite/QLwM',
      category: 'Staking',
      bonus: 'Welcome bonus',
      icon: '💎'
    },
    {
      name: 'Webull',
      description: 'Commission-free trading platform',
      url: 'https://a.webull.com/TfjSXfLvnnTsN3DC1A',
      category: 'Trading',
      bonus: 'Free stocks',
      icon: '📈'
    },
    {
      name: 'Crypto.com',
      description: 'Buy, sell & earn crypto rewards',
      url: 'https://crypto.com/app/39xp8rtew5',
      category: 'Exchange',
      bonus: '$25 sign-up bonus',
      icon: '💳'
    },
    {
      name: 'Robinhood',
      description: 'Invest in stocks & crypto',
      url: 'https://join.robinhood.com/broderc30',
      category: 'Investing',
      bonus: 'Free stock',
      icon: '🏹'
    },
    {
      name: 'Coin App',
      description: 'Earn crypto while exploring',
      url: 'https://coin.onelink.me/ePJg/3e2700c6',
      category: 'Rewards',
      bonus: 'Earn crypto',
      icon: '🌍'
    },
    {
      name: 'Coinbase',
      description: 'Trusted crypto exchange',
      url: 'https://www.coinbase.com/join/curney_x?src=ios-link',
      category: 'Exchange',
      bonus: 'Learning rewards',
      icon: '🔷'
    },
    {
      name: 'Binance.US',
      description: 'Leading US crypto exchange',
      url: 'https://accounts.binance.us/en/register?ref=35292794',
      category: 'Exchange',
      bonus: 'Low fees',
      icon: '🟡'
    },
    {
      name: 'KuCoin',
      description: 'Trade 700+ cryptocurrencies',
      url: 'https://www.kucoin.com/land/register/r/7Nff5P',
      category: 'Exchange',
      bonus: 'Trading bonus',
      icon: '🟢'
    }
  ]

  const categories = ['All', 'Exchange', 'Trading', 'Staking', 'Rewards', 'Investing', 'Discovery']
  
  return (
    <section id="platforms" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple/10 border border-purple/30 rounded-full px-4 py-2 mb-4">
            <Sparkles className="text-purple" size={16} />
            <span className="text-purple text-sm font-grotesk">Recommended by BCN</span>
          </div>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold mb-4">
            Start Your <span className="text-gradient">Crypto Journey</span>
          </h2>
          <p className="text-silver/80 text-lg max-w-2xl mx-auto">
            Trusted platforms to buy, trade, and earn cryptocurrency. Get started with our referral bonuses.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, idx) => (
            <a
              key={idx}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-onyx border border-purple/30 rounded-lg p-6 hover:border-purple/60 transition-all hover:scale-105 group"
            >
              {/* Icon & Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{platform.icon}</div>
                <span className="text-xs bg-cyan/20 text-cyan px-2 py-1 rounded-full">
                  {platform.category}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-grotesk text-xl font-bold text-white mb-2 flex items-center gap-2">
                {platform.name}
                <ExternalLink 
                  size={16} 
                  className="text-purple opacity-0 group-hover:opacity-100 transition-opacity" 
                />
              </h3>
              <p className="text-silver/70 text-sm mb-4">
                {platform.description}
              </p>

              {/* Bonus */}
              <div className="flex items-center gap-2 text-gold">
                <Gift size={14} />
                <span className="text-xs font-grotesk">{platform.bonus}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-silver/60 text-sm">
            💡 <strong className="text-silver">Pro Tip:</strong> Start with small amounts and diversify across platforms. 
            Always do your own research before investing.
          </p>
          <p className="text-silver/50 text-xs mt-2">
            Disclosure: BCN may earn a commission from sign-ups through these links at no cost to you.
          </p>
        </div>
      </div>
    </section>
  )
}
