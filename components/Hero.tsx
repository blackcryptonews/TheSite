'use client'

import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Shield, Zap } from 'lucide-react'
import Button from './ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple/20 via-onyx to-cyan/20">
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent" />
      </div>

      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-10 md:opacity-20"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
        style={{
          backgroundImage: `linear-gradient(#BD00FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating particles - SSR-safe positions */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple to-cyan rounded-full"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 80}%`,
            }}
            animate={{ y: [0, -120], opacity: [0, 0.8, 0] }}
            transition={{ duration: 10 + (i % 10), repeat: Infinity, delay: (i % 5) * 1.2, ease: 'linear' }}
          />
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyan/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple/30 bg-purple/10 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-xs sm:text-sm font-grotesk text-silver">Powered by AI &bull; Backed by Community</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-grotesk text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          The Future of{' '}
          <span className="relative inline-block">
            <span className="text-gradient animate-glow">Black Wealth</span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple via-cyan to-gold rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </span>
          <br />
          Is On-Chain.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-silver text-base sm:text-xl md:text-2xl mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-2"
        >
          Your financial intelligence terminal. Breaking crypto news, wealth-building guides,
          and AI-powered advice for the global Black community.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-10 px-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => document.getElementById('learn')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Learning
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.dispatchEvent(new CustomEvent('openOracle'))}
          >
            Ask The Oracle
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto px-2"
        >
          {[
            { icon: TrendingUp, label: 'Live Market Data', value: '24/7' },
            { icon: Shield,     label: 'Trusted Sources',  value: '7+'   },
            { icon: Zap,        label: 'AI-Powered',       value: 'GPT-4o' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <div className="backdrop-blur-xl bg-gradient-to-br from-purple/10 via-onyx/50 to-cyan/10 border border-purple/30 rounded-xl md:rounded-2xl p-3 md:p-4 transition-all duration-300 hover:border-purple/50 hover:shadow-lg hover:shadow-purple/20">
                <stat.icon className="w-5 h-5 text-cyan mx-auto mb-1.5" />
                <div className="text-lg md:text-2xl font-bold text-gradient mb-0.5">{stat.value}</div>
                <div className="text-xs text-silver/70">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
