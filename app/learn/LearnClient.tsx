'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen, Zap, Shield, TrendingUp, Globe, Users,
  Clock, ChevronRight, Star, Lock, Wallet, RefreshCw
} from 'lucide-react'

const CATEGORIES = ['All', 'Beginner', 'Bitcoin', 'DeFi', 'Security', 'Web3', 'Investing']

const GUIDES = [
  {
    slug: 'what-is-bitcoin',
    title: 'What Is Bitcoin? A Guide for First-Time Investors',
    excerpt: 'Bitcoin explained from first principles — what it is, why it was created, and why the Black community has a unique reason to care about decentralized money.',
    category: 'Beginner',
    level: 'Beginner',
    readTime: '8 min',
    icon: TrendingUp,
    color: 'text-gold',
    bg: 'from-gold/10 to-yellow-900/5',
    border: 'border-gold/20',
    featured: true,
  },
  {
    slug: 'crypto-wallet-guide',
    title: 'Your Keys, Your Crypto: The Complete Wallet Guide',
    excerpt: 'Hot wallets, cold wallets, hardware wallets, seed phrases — everything you need to know to actually own your crypto and not just hold it on an exchange.',
    category: 'Security',
    level: 'Beginner',
    readTime: '10 min',
    icon: Wallet,
    color: 'text-cyan',
    bg: 'from-cyan/10 to-blue-900/5',
    border: 'border-cyan/20',
    featured: true,
  },
  {
    slug: 'defi-explained',
    title: 'DeFi Explained: Banking Without the Bank',
    excerpt: 'Decentralized finance is removing the gatekeepers who have historically excluded Black communities from wealth-building. Here is how it works.',
    category: 'DeFi',
    level: 'Intermediate',
    readTime: '12 min',
    icon: RefreshCw,
    color: 'text-purple',
    bg: 'from-purple/10 to-violet-900/5',
    border: 'border-purple/20',
    featured: true,
  },
  {
    slug: 'group-economics-crypto',
    title: 'Powernomics Meets Crypto: Group Economics on the Blockchain',
    excerpt: "Dr. Claude Anderson's group economics principles applied to DAOs, community treasuries, and collective DeFi strategies for Black wealth building.",
    category: 'Investing',
    level: 'Intermediate',
    readTime: '15 min',
    icon: Users,
    color: 'text-emerald-400',
    bg: 'from-emerald-500/10 to-green-900/5',
    border: 'border-emerald-500/20',
    featured: false,
  },
  {
    slug: 'avoid-crypto-scams',
    title: 'How to Spot and Avoid Crypto Scams Targeting the Black Community',
    excerpt: 'Rug pulls, Ponzi schemes, fake influencers — scammers specifically target our community. Learn the red flags before they cost you.',
    category: 'Security',
    level: 'Beginner',
    readTime: '7 min',
    icon: Shield,
    color: 'text-red-400',
    bg: 'from-red-500/10 to-red-900/5',
    border: 'border-red-500/20',
    featured: false,
  },
  {
    slug: 'bitcoin-remittances-africa',
    title: 'Bitcoin as a Remittance Tool: Sending Money Across the Diaspora',
    excerpt: 'Western Union charges 7-12%. Bitcoin charges cents. How the diaspora is using crypto to reclaim billions lost to remittance fees every year.',
    category: 'Bitcoin',
    level: 'Beginner',
    readTime: '9 min',
    icon: Globe,
    color: 'text-cyan',
    bg: 'from-cyan/10 to-blue-900/5',
    border: 'border-cyan/20',
    featured: false,
  },
  {
    slug: 'what-is-a-dao',
    title: 'What Is a DAO? The Digital Co-op That Could Change Everything',
    excerpt: "DAOs are member-owned organizations run by code, not corporations. Think of it as a digital credit union — but borderless, permissionless, and owned by its members.",
    category: 'Web3',
    level: 'Intermediate',
    readTime: '11 min',
    icon: Users,
    color: 'text-purple',
    bg: 'from-purple/10 to-violet-900/5',
    border: 'border-purple/20',
    featured: false,
  },
  {
    slug: 'staking-explained',
    title: 'Crypto Staking: Earn Passive Income on Your Holdings',
    excerpt: 'Staking lets your crypto earn yield while you sleep. We break down how it works, what risks exist, and which coins are worth staking for long-term holders.',
    category: 'Investing',
    level: 'Intermediate',
    readTime: '10 min',
    icon: TrendingUp,
    color: 'text-gold',
    bg: 'from-gold/10 to-yellow-900/5',
    border: 'border-gold/20',
    featured: false,
  },
  {
    slug: 'hardware-wallet-setup',
    title: 'Setting Up Your Ledger or Trezor: Step-by-Step Guide',
    excerpt: 'A hardware wallet is the gold standard for crypto security. This step-by-step walkthrough shows you how to set one up and never lose access to your funds.',
    category: 'Security',
    level: 'Intermediate',
    readTime: '14 min',
    icon: Lock,
    color: 'text-cyan',
    bg: 'from-cyan/10 to-blue-900/5',
    border: 'border-cyan/20',
    featured: false,
  },
]

const PATHS = [
  {
    title: 'Complete Beginner',
    desc: 'Zero crypto knowledge to your first wallet in 5 guides',
    steps: ['What Is Bitcoin?', 'Setting Up a Wallet', 'Buying Your First Crypto', 'Staying Safe', 'Long-Term Strategy'],
    color: 'from-gold/20 to-gold/5',
    border: 'border-gold/30',
    tag: 'text-gold',
  },
  {
    title: 'DeFi Explorer',
    desc: 'Master decentralized finance from basics to advanced',
    steps: ['What Is DeFi?', 'Lending & Borrowing', 'Liquidity Pools', 'Yield Farming', 'Risk Management'],
    color: 'from-cyan/20 to-cyan/5',
    border: 'border-cyan/30',
    tag: 'text-cyan',
  },
  {
    title: 'Diaspora Wealth Builder',
    desc: 'Powernomics principles applied to the blockchain economy',
    steps: ['Group Economics + Crypto', 'Remittances & Bitcoin', 'DAOs & Collective Power', 'Black Founders to Follow', 'Building Generational Wealth'],
    color: 'from-purple/20 to-purple/5',
    border: 'border-purple/30',
    tag: 'text-purple',
  },
]

const LEVEL_COLOR: Record<string, string> = {
  Beginner:     'bg-emerald-500/20 text-emerald-400',
  Intermediate: 'bg-gold/20 text-gold',
  Advanced:     'bg-red-500/20 text-red-400',
}

export default function LearnClient() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? GUIDES
    : GUIDES.filter(g => g.category === activeCategory)

  const featured = GUIDES.filter(g => g.featured)

  return (
    <main className="min-h-screen bg-onyx">

      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple/10 via-onyx to-cyan/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple/15 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple/30 bg-purple/10 mb-6">
              <BookOpen className="w-4 h-4 text-gold" />
              <span className="text-sm font-grotesk text-silver">Free Education · No Jargon</span>
            </div>
            <h1 className="font-grotesk text-4xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">Cryptonomics</span> Academy
            </h1>
            <p className="text-silver/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Crypto education built for the Black community and global diaspora.
              From Bitcoin basics to advanced DeFi — explained clearly, grounded in economic empowerment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="font-grotesk text-2xl font-bold text-white mb-1">Learning Paths</h2>
          <p className="text-silver/50 text-sm">Structured journeys from zero to confident</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {PATHS.map((path, i) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={"p-6 rounded-2xl bg-gradient-to-br border " + path.color + " " + path.border}
            >
              <h3 className={"font-grotesk font-bold text-base mb-1 " + path.tag}>{path.title}</h3>
              <p className="text-silver/50 text-xs mb-4">{path.desc}</p>
              <ol className="space-y-2">
                {path.steps.map((step, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-silver/70">
                    <span className={"w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold flex-shrink-0 " + path.tag + " bg-black/20"}>{j + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <button className={"mt-4 text-xs font-grotesk font-semibold flex items-center gap-1 " + path.tag}>
                Start path <ChevronRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={"px-4 py-2 rounded-full text-sm font-grotesk font-medium transition-all " +
                (activeCategory === cat
                  ? 'bg-purple text-white shadow-lg shadow-purple/30'
                  : 'bg-purple/10 border border-purple/20 text-silver/70 hover:text-white hover:border-purple/50')}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Guide Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((guide, i) => (
            <motion.article
              key={guide.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={"group p-5 rounded-2xl bg-gradient-to-br border " + guide.bg + " " + guide.border + " hover:border-opacity-60 transition-all cursor-pointer hover:shadow-lg hover:shadow-black/30"}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={"p-2 rounded-xl bg-black/20"}>
                  <guide.icon className={"w-5 h-5 " + guide.color} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={"px-2 py-0.5 rounded-full text-[10px] font-grotesk font-semibold " + LEVEL_COLOR[guide.level]}>
                    {guide.level}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-silver/40">
                    <Clock className="w-3 h-3" />{guide.readTime}
                  </span>
                </div>
              </div>
              <h3 className="font-grotesk font-bold text-white text-sm leading-snug mb-2 group-hover:text-cyan transition-colors">
                {guide.title}
              </h3>
              <p className="text-silver/55 text-xs leading-relaxed line-clamp-3">{guide.excerpt}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-grotesk font-semibold text-purple/70 group-hover:text-cyan transition-colors">
                Read guide <ChevronRight className="w-3 h-3" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Coming soon callout */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple/10 via-cyan/5 to-purple/10 border border-purple/20 text-center">
          <Star className="w-6 h-6 text-gold mx-auto mb-2" />
          <h3 className="font-grotesk font-bold text-white mb-1">More guides dropping weekly</h3>
          <p className="text-silver/50 text-sm mb-4">Subscribe to Cryptonomics to get every new guide in your inbox the day it drops.</p>
          <a href="/#newsletter" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold via-yellow-500 to-gold text-onyx text-sm font-grotesk font-bold hover:shadow-lg hover:shadow-gold/30 transition-all">
            Get new guides free
          </a>
        </motion.div>
      </section>
    </main>
  )
}
