'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Twitter, Globe, ChevronRight, Rocket, Users, Zap, Shield, BookOpen, TrendingUp } from 'lucide-react'

const CATEGORIES = ['All', 'DeFi', 'Infrastructure', 'NFT & Creator', 'Education', 'Payments', 'DAO']

const FOUNDERS = [
  {
    name: 'Najah Roberts',
    title: 'Founder, Crypto Finally',
    location: 'USA',
    category: 'Education',
    bio: 'Known as "The Crypto Mom," Najah Roberts launched Crypto Finally to make blockchain education accessible to Black communities. Her Chicago-based exchange and education center has served thousands.',
    project: 'Crypto Finally',
    projectDesc: 'Crypto exchange and education center focused on the Black community',
    twitter: 'cryptofinally',
    website: 'https://cryptofinally.com',
    tags: ['Education', 'Exchange', 'Community'],
    icon: BookOpen,
    color: 'text-gold',
    bg: 'from-gold/10 to-yellow-900/5',
    border: 'border-gold/20',
  },
  {
    name: 'Keisha Cash',
    title: 'Founder, Justice HQ',
    location: 'USA',
    category: 'DAO',
    bio: 'Keisha Cash is a venture capitalist and founder focused on impact investing and community empowerment through Web3 structures. A pioneer in connecting Black entrepreneurs to decentralized capital.',
    project: 'Justice HQ',
    projectDesc: 'Community and investment platform for underrepresented founders',
    twitter: '',
    website: 'https://justicehq.com',
    tags: ['VC', 'Community', 'Investing'],
    icon: Users,
    color: 'text-purple',
    bg: 'from-purple/10 to-violet-900/5',
    border: 'border-purple/20',
  },
  {
    name: 'Oluwaseun Ojedeji',
    title: 'Co-Founder, Bundle Africa',
    location: 'Nigeria',
    category: 'Payments',
    bio: 'Bundle Africa is a social payments app built for Africa, enabling users to send money and crypto across borders. Co-founded by Nigerian entrepreneurs solving the continent\'s remittance problem.',
    project: 'Bundle Africa',
    projectDesc: 'Social crypto payments app built for Africa',
    twitter: 'bundle_africa',
    website: 'https://bundle.africa',
    tags: ['Payments', 'Africa', 'Remittance'],
    icon: Zap,
    color: 'text-cyan',
    bg: 'from-cyan/10 to-blue-900/5',
    border: 'border-cyan/20',
  },
  {
    name: 'Charlene Fadirepo',
    title: 'Founder, Guava',
    location: 'USA',
    category: 'DeFi',
    bio: 'Former Federal Reserve examiner turned fintech founder. Charlene built Guava to provide Black business owners with the financial tools and community they deserve — with crypto integration at its core.',
    project: 'Guava',
    projectDesc: 'Banking and financial community for Black business owners',
    twitter: 'charlene_fadi',
    website: 'https://guava.bank',
    tags: ['Banking', 'Business', 'Community'],
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'from-emerald-500/10 to-green-900/5',
    border: 'border-emerald-500/20',
  },
  {
    name: 'Sinclair Skinner',
    title: 'Co-Founder, Blackcoin',
    location: 'Caribbean',
    category: 'Infrastructure',
    bio: 'Caribbean-based entrepreneur building blockchain infrastructure designed for the economic needs of the Caribbean and African diaspora, with a focus on sovereignty and community ownership.',
    project: 'Diaspora Blockchain Collective',
    projectDesc: 'Blockchain infrastructure for Caribbean and African diaspora',
    twitter: '',
    website: '#',
    tags: ['Infrastructure', 'Caribbean', 'Sovereignty'],
    icon: Shield,
    color: 'text-purple',
    bg: 'from-purple/10 to-violet-900/5',
    border: 'border-purple/20',
  },
  {
    name: 'Toya Powell',
    title: 'Founder, Black NFT Art',
    location: 'USA',
    category: 'NFT & Creator',
    bio: 'Toya Powell built Black NFT Art to spotlight and amplify Black artists entering the NFT space, creating a marketplace and community that puts creators first and eliminates traditional gatekeepers.',
    project: 'Black NFT Art',
    projectDesc: 'NFT marketplace and community celebrating Black artists',
    twitter: 'blacknftart',
    website: 'https://blacknftart.io',
    tags: ['NFT', 'Art', 'Creator Economy'],
    icon: Rocket,
    color: 'text-gold',
    bg: 'from-gold/10 to-yellow-900/5',
    border: 'border-gold/20',
  },
]

const STATS = [
  { value: '3%', label: 'Of VC funding goes to Black founders', sub: 'We are changing that in Web3' },
  { value: '$15B+', label: 'Remittance fees paid by Africa annually', sub: 'Crypto cuts this to near zero' },
  { value: '400M+', label: 'Unbanked adults in Africa', sub: 'DeFi is their first bank' },
]

export default function FoundersClient() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? FOUNDERS
    : FOUNDERS.filter(f => f.category === activeCategory)

  return (
    <main className="min-h-screen bg-onyx">

      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-onyx to-purple/10" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-gold/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 mb-6">
              <Rocket className="w-4 h-4 text-gold" />
              <span className="text-sm font-grotesk text-gold font-semibold">Black Excellence in Web3</span>
            </div>
            <h1 className="font-grotesk text-4xl md:text-6xl font-bold mb-4">
              Black Founders <span className="text-gradient">Building the Future</span>
            </h1>
            <p className="text-silver/70 text-lg max-w-2xl mx-auto leading-relaxed">
              The entrepreneurs, builders, and visionaries from the Black community and African diaspora
              who are reshaping finance, ownership, and power through blockchain technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-purple/10 to-onyx border border-purple/20 text-center"
            >
              <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-white text-sm font-grotesk font-semibold mb-0.5">{stat.label}</div>
              <div className="text-silver/40 text-xs">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={"px-4 py-2 rounded-full text-sm font-grotesk font-medium transition-all " +
                (activeCategory === cat
                  ? 'bg-gold text-onyx font-bold shadow-lg shadow-gold/20'
                  : 'bg-gold/10 border border-gold/20 text-silver/70 hover:text-white hover:border-gold/40')}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Founder Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filtered.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={"group p-5 rounded-2xl bg-gradient-to-br border transition-all hover:shadow-lg hover:shadow-black/30 " + founder.bg + " " + founder.border}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={"w-10 h-10 rounded-xl bg-black/20 border flex items-center justify-center " + founder.border}>
                    <founder.icon className={"w-5 h-5 " + founder.color} />
                  </div>
                  <div>
                    <h3 className="font-grotesk font-bold text-white text-sm">{founder.name}</h3>
                    <p className="text-silver/40 text-xs">{founder.location}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {founder.twitter && (
                    <a href={"https://twitter.com/" + founder.twitter} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-silver/30 hover:text-cyan transition-colors">
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {founder.website && founder.website !== '#' && (
                    <a href={founder.website} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-silver/30 hover:text-cyan transition-colors">
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-silver/50 text-xs mb-1 font-grotesk">{founder.title}</p>

              {/* Project */}
              <div className={"mt-2 mb-3 p-2.5 rounded-lg bg-black/20 border " + founder.border}>
                <p className={"text-xs font-grotesk font-bold " + founder.color}>{founder.project}</p>
                <p className="text-silver/45 text-[11px]">{founder.projectDesc}</p>
              </div>

              <p className="text-silver/60 text-xs leading-relaxed mb-3 line-clamp-3">{founder.bio}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {founder.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-black/30 border border-white/5 text-[10px] text-silver/40">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submit CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-gradient-to-br from-purple/15 via-onyx/80 to-gold/10 border border-purple/30 text-center"
        >
          <Rocket className="w-8 h-8 text-gold mx-auto mb-3" />
          <h2 className="font-grotesk text-2xl font-bold text-white mb-2">Are You Building in Web3?</h2>
          <p className="text-silver/60 max-w-lg mx-auto text-sm leading-relaxed mb-6">
            We are actively looking to feature Black-led crypto and Web3 projects. If you are building
            something the community needs to know about, get in touch.
          </p>
          <a
            href="mailto:hello@blackcryptonews.com?subject=Feature My Project"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple to-cyan text-white font-grotesk font-bold text-sm hover:shadow-lg hover:shadow-purple/30 transition-all"
          >
            Submit Your Project <ChevronRight className="w-4 h-4" />
          </a>
          <p className="text-silver/30 text-xs mt-3">hello@blackcryptonews.com</p>
        </motion.div>
      </section>
    </main>
  )
}
