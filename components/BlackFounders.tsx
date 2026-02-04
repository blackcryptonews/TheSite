'use client'

import { Users, ExternalLink, Twitter, Globe } from 'lucide-react'

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
}

export default function BlackFounders() {
  return (
    <div id="founders" className="bg-onyx border border-purple/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-grotesk text-2xl text-purple">Black Founders</h2>
        <Users className="text-cyan" size={24} />
      </div>

      <div className="mb-4">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple to-cyan rounded-full flex items-center justify-center text-2xl font-bold text-white">
            JC
          </div>
          <div className="flex-1">
            <h3 className="font-grotesk text-xl text-white mb-1">
              {featuredFounder.name}
            </h3>
            <p className="text-cyan text-sm mb-1">{featuredFounder.project}</p>
            <p className="text-silver/60 text-xs">📍 {featuredFounder.location}</p>
          </div>
        </div>

        <p className="text-silver/70 text-sm mb-4 italic">
          "{featuredFounder.mission}"
        </p>

        <p className="text-silver text-sm mb-4">
          {featuredFounder.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-silver/60 mb-4">
          <span className="px-2 py-1 bg-purple/20 text-purple rounded">
            {featuredFounder.stage}
          </span>
          <span className="text-gold font-bold">💰 {featuredFounder.raised} raised</span>
        </div>

        <div className="flex gap-3">
          <a
            href={featuredFounder.website}
            className="flex items-center gap-2 px-4 py-2 bg-purple/10 border border-purple/30 text-purple hover:bg-purple/20 transition-colors rounded-lg text-sm"
          >
            <Globe size={14} />
            Visit Site
          </a>
          <a
            href={featuredFounder.twitter}
            className="flex items-center gap-2 px-4 py-2 bg-cyan/10 border border-cyan/30 text-cyan hover:bg-cyan/20 transition-colors rounded-lg text-sm"
          >
            <Twitter size={14} />
            Follow
          </a>
        </div>
      </div>

      <div className="pt-4 border-t border-silver/20">
        <button className="text-cyan hover:text-purple transition-colors font-grotesk text-sm">
          View More Founders →
        </button>
      </div>
    </div>
  )
}
