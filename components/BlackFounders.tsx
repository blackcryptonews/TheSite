'use client'

import { Users, Globe, MapPin, TrendingUp, DollarSign, Link as LinkIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const featuredFounder = {
  name: 'Jamila Chen',
  project: 'AfriChain Finance',
  location: 'Lagos, Nigeria',
  mission: 'Building DeFi infrastructure for African entrepreneurs',
  description: 'AfriChain connects small businesses across Africa to decentralized lending pools, providing access to capital without traditional banking barriers.',
  stage: 'Seed',
  raised: '$2M',
  website: '#',
  twitter: '#',
  initials: 'JC',
}

export default function BlackFounders() {
  return (
    <section id="founders" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-gradient mb-2">
                Black Founders
              </h2>
              <p className="text-silver/70">Spotlighting builders shaping the future of Web3</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="text-cyan w-8 h-8" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-gradient-to-br from-purple/10 via-onyx/50 to-cyan/10 border border-purple/30 rounded-2xl p-8 transition-all duration-300 hover:border-purple/50 hover:shadow-lg hover:shadow-purple/20"
        >
          <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple via-cyan to-gold rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {featuredFounder.initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-onyx flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-onyx" strokeWidth={3} />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-grotesk text-2xl text-white mb-2 font-bold">
                {featuredFounder.name}
              </h3>
              <p className="text-gradient-static text-lg mb-2 font-semibold">
                {featuredFounder.project}
              </p>
              <div className="flex items-center gap-2 text-silver/60 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                {featuredFounder.location}
              </div>

              <div className="bg-purple/10 border-l-4 border-purple px-4 py-3 rounded-r-lg mb-4">
                <p className="text-silver/90 text-sm leading-relaxed italic">
                  "{featuredFounder.mission}"
                </p>
              </div>

              <p className="text-silver/80 mb-6 leading-relaxed">
                {featuredFounder.description}
              </p>

              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-purple/20 text-purple text-sm font-bold rounded-lg border border-purple/30">
                  {featuredFounder.stage}
                </span>
                <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold text-sm font-bold rounded-lg border border-gold/30">
                  <DollarSign className="w-4 h-4" />
                  {featuredFounder.raised} raised
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={featuredFounder.website}
                  className="flex items-center gap-2 px-5 py-2.5 bg-purple/10 border border-purple/30 text-purple hover:bg-purple/20 transition-all rounded-xl text-sm font-semibold"
                >
                  <Globe size={16} strokeWidth={2.5} />
                  Visit Site
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={featuredFounder.twitter}
                  className="flex items-center gap-2 px-5 py-2.5 bg-cyan/10 border border-cyan/30 text-cyan hover:bg-cyan/20 transition-all rounded-xl text-sm font-semibold"
                >
                  <LinkIcon size={16} strokeWidth={2.5} />
                  Connect
                </motion.a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-purple/20">
            <button className="group inline-flex items-center gap-2 text-cyan hover:text-purple transition-all font-grotesk text-sm font-semibold">
              View More Founders
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
