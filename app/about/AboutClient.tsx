'use client'

import { motion } from 'framer-motion'
import {
  Globe, Shield, BookOpen, TrendingUp, Users, Zap,
  Target, Eye, Heart, ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const COVERAGE_PILLARS = [
  { icon: TrendingUp, label: 'Markets', desc: 'Bitcoin, Ethereum, altcoins, and macro crypto market coverage', color: 'text-cyan', bg: 'bg-cyan/10 border-cyan/20' },
  { icon: BookOpen, label: 'Education', desc: 'From beginner guides to advanced DeFi strategies — no jargon', color: 'text-gold', bg: 'bg-gold/10 border-gold/20' },
  { icon: Globe, label: 'Africa & Diaspora', desc: 'Nigeria, Ghana, Kenya, Caribbean, UK — the global Black crypto story', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { icon: Shield, label: 'Security', desc: 'Scam alerts, wallet safety, and protecting your digital assets', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  { icon: Users, label: 'Black Founders', desc: 'Spotlighting builders, innovators, and entrepreneurs in Web3', color: 'text-purple', bg: 'bg-purple/10 border-purple/20' },
  { icon: Zap, label: 'DeFi & Web3', desc: 'Decentralized finance, NFTs, DAOs, and the open internet economy', color: 'text-cyan', bg: 'bg-cyan/10 border-cyan/20' },
]

const EDITORIAL_VALUES = [
  {
    icon: Target,
    title: 'Accuracy First',
    desc: 'We verify before we publish. Every market claim, statistic, and security alert is checked against primary sources. Our readers make financial decisions based on what we write — we take that seriously.',
  },
  {
    icon: Eye,
    title: 'Editorial Independence',
    desc: 'We accept advertising and sponsorships, but our editorial voice is never for sale. Sponsored content is always clearly labeled. Our coverage of a platform never depends on whether they advertise with us.',
  },
  {
    icon: Heart,
    title: 'Community First',
    desc: 'We exist to serve the global Black community — not institutional investors or crypto whales. Every editorial decision is filtered through one question: does this help our readers build wealth and protect themselves?',
  },
  {
    icon: Shield,
    title: 'Anti-Scam Commitment',
    desc: 'Crypto is rife with bad actors. We will never promote rug pulls, undisclosed influencer deals, or "guaranteed return" schemes. When we see something predatory, we name it publicly.',
  },
]

const POWERNOMICS_PRINCIPLES = [
  {
    number: '01',
    title: 'Group Economics',
    desc: 'We cover crypto projects, DAOs, and DeFi protocols that enable collective wealth-building — not just individual speculation.',
  },
  {
    number: '02',
    title: 'Competitive Commerce',
    desc: 'We spotlight Black founders building competitive businesses in the Web3 economy and creating opportunities for the community.',
  },
  {
    number: '03',
    title: 'Self-Sufficiency',
    desc: 'We teach self-custody, decentralized finance, and financial sovereignty — reducing dependence on gatekeepers who have historically excluded us.',
  },
  {
    number: '04',
    title: 'Economic Education',
    desc: "Dr. Anderson argued knowledge is the foundation of economic power. Our mission: make crypto literacy universal in the Black community.",
  },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay },
})

export default function AboutClient() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple/15 via-onyx to-gold/10" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div {...fade()} className="mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-sm font-grotesk font-semibold">
              <span>✊🏾</span> Our Mission
            </div>
          </motion.div>

          <motion.h1 {...fade(0.1)} className="font-grotesk text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The Media Company the
            <br />
            <span className="text-gradient">Black Community Deserves</span>
            <br />
            in Crypto
          </motion.h1>

          <motion.p {...fade(0.2)} className="text-silver/75 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Black Crypto News is the definitive cryptocurrency media platform for the global Black community
            and African diaspora. We deliver trusted journalism, deep education, and AI-powered intelligence
            to close the knowledge gap around emerging financial technologies.
          </motion.p>

          <motion.div {...fade(0.3)} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/news"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple to-cyan text-white font-grotesk font-bold text-sm hover:shadow-lg hover:shadow-purple/30 transition-all"
            >
              Read Our Coverage <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#newsletter"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gold/40 text-gold font-grotesk font-semibold text-sm hover:bg-gold/10 transition-all"
            >
              Join Cryptonomics <span>✊🏾</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Powernomics Foundation */}
      <section className="py-16 px-4 border-t border-purple/20">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade()} className="text-center mb-12">
            <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-gradient mb-3">
              Built on Powernomics
            </h2>
            <p className="text-silver/60 max-w-2xl mx-auto">
              Dr. Claude Anderson's <em>Powernomics</em> defined the blueprint for Black economic independence.
              We believe blockchain technology is the most powerful implementation of that blueprint in the
              21st century. Our editorial lens is rooted in his four pillars.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {POWERNOMICS_PRINCIPLES.map((principle, i) => (
              <motion.div
                key={principle.number}
                {...fade(i * 0.1)}
                className="flex gap-5 p-6 rounded-2xl bg-gradient-to-br from-purple/10 via-onyx/50 to-gold/5 border border-purple/20"
              >
                <div className="font-orbitron text-3xl font-bold text-gradient opacity-40 flex-shrink-0">
                  {principle.number}
                </div>
                <div>
                  <h3 className="font-grotesk text-lg font-bold text-white mb-2">{principle.title}</h3>
                  <p className="text-silver/60 text-sm leading-relaxed">{principle.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Pillars */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-purple/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade()} className="text-center mb-12">
            <h2 className="font-grotesk text-3xl md:text-4xl font-bold mb-3 text-white">
              What We Cover
            </h2>
            <p className="text-silver/60 max-w-2xl mx-auto">
              Six coverage areas designed to inform, educate, and empower at every stage of your crypto journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COVERAGE_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                {...fade(i * 0.07)}
                className={`p-5 rounded-2xl border ${pillar.bg} backdrop-blur-sm`}
              >
                <pillar.icon className={`w-7 h-7 ${pillar.color} mb-3`} />
                <h3 className={`font-grotesk text-base font-bold ${pillar.color} mb-1.5`}>{pillar.label}</h3>
                <p className="text-silver/60 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Values */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade()} className="text-center mb-12">
            <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-gradient mb-3">
              Our Editorial Standards
            </h2>
            <p className="text-silver/60 max-w-xl mx-auto">
              Trust is the only currency that matters in media. Here's how we earn yours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {EDITORIAL_VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                {...fade(i * 0.1)}
                className="p-6 rounded-2xl bg-gradient-to-br from-purple/10 via-onyx/50 to-cyan/5 border border-purple/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-purple/20 border border-purple/30">
                    <value.icon className="w-5 h-5 text-purple" />
                  </div>
                  <h3 className="font-grotesk font-bold text-white">{value.title}</h3>
                </div>
                <p className="text-silver/65 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer + Contact */}
      <section className="py-16 px-4 border-t border-purple/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fade()}>
            <h2 className="font-grotesk text-2xl font-bold text-white mb-4">A Note on Financial Advice</h2>
            <p className="text-silver/60 text-sm leading-relaxed max-w-2xl mx-auto mb-8">
              Black Crypto News provides educational content, news, and analysis. Nothing published on this
              platform constitutes personalized financial, investment, tax, or legal advice. Cryptocurrency
              investments carry substantial risk of loss. Always conduct your own research and consult with
              a licensed financial professional before making investment decisions.
            </p>

            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <a
                href="mailto:hello@blackcryptonews.com"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-purple/40 text-purple font-grotesk font-semibold text-sm hover:bg-purple/10 transition-all"
              >
                hello@blackcryptonews.com
              </a>
              <Link
                href="/news"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple to-cyan text-white font-grotesk font-bold text-sm hover:shadow-lg hover:shadow-purple/30 transition-all"
              >
                Read the Latest <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
