'use client'

import { useState } from 'react'
import { Mail, CheckCircle, AlertCircle, Loader2, BookOpen, TrendingUp, Users, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const PILLARS = [
  { icon: Users,      title: 'Group Economics',      desc: 'Collective wealth strategies on the blockchain', color: 'text-gold',        bg: 'bg-gold/10 border-gold/20' },
  { icon: TrendingUp, title: 'Competitive Commerce', desc: 'Building Black-owned digital businesses',        color: 'text-cyan',        bg: 'bg-cyan/10 border-cyan/20' },
  { icon: Zap,        title: 'Financial Sovereignty', desc: 'Own your keys. Own your future.',               color: 'text-purple',      bg: 'bg-purple/10 border-purple/20' },
  { icon: BookOpen,   title: 'Economic Education',    desc: "Dr. Anderson's principles meet Web3",           color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
]

const BENEFITS = [
  { text: 'Weekly market intel through a Black wealth lens',               color: 'text-gold' },
  { text: 'Group economics plays - community DAOs, collective strategies',  color: 'text-cyan' },
  { text: 'Black founders and projects in Web3 you need to know',          color: 'text-purple' },
  { text: 'DeFi, Bitcoin, and stablecoins explained without jargon',       color: 'text-emerald-400' },
  { text: 'Regulatory updates that affect the diaspora',                   color: 'text-gold' },
]

export default function NewsletterSignup() {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  const valid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email)        { setErrMsg('Enter your email'); setStatus('error'); return }
    if (!valid(email)) { setErrMsg('Enter a valid email'); setStatus('error'); return }
    setStatus('loading'); setErrMsg('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setEmail('')
        toast.success('Welcome to Cryptonomics! Check your inbox for confirmation.', {
          duration: 6000,
          icon: '✊',
        })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrMsg('Connection error. Please try again.')
    }
  }

  return (
    <section id="newsletter" className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-onyx to-purple/10" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] bg-purple/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Brand badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-sm">
            <span className="text-gold text-base">&#x270A;</span>
            <span className="text-sm font-grotesk font-semibold text-gold tracking-wide">Powered by Powernomics</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center mb-4">
          <h2 className="font-grotesk text-4xl md:text-6xl font-bold mb-2">
            <span className="text-gradient">Crypto</span><span className="text-gold">nomics</span>
          </h2>
          <p className="font-orbitron text-xs tracking-widest text-silver/50 uppercase">
            The Newsletter for Black Economic Power in Web3
          </p>
        </motion.div>

        {/* Quote */}
        <motion.blockquote initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-silver/75 text-base md:text-lg leading-relaxed italic">
            "Black people must become self-reliant and competitive as a group in the open marketplace."
          </p>
          <footer className="mt-2 text-gold/70 text-sm font-grotesk font-semibold">
            - Dr. Claude Anderson, <cite>Powernomics</cite>
          </footer>
          <p className="mt-4 text-silver/60 text-sm max-w-xl mx-auto">
            Blockchain is the most powerful economic tool since land ownership.
            <strong className="text-white"> Cryptonomics</strong> teaches you to use it through the lens of
            group economics, competitive commerce, and financial sovereignty.
          </p>
        </motion.blockquote>

        {/* Pillars */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {PILLARS.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08 }} className={"p-4 rounded-2xl border " + p.bg + " backdrop-blur-sm"}>
              <p.icon className={"w-6 h-6 " + p.color + " mb-2"} />
              <h4 className={"font-grotesk text-sm font-bold " + p.color + " mb-1"}>{p.title}</h4>
              <p className="text-silver/55 text-xs leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Signup card */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }} className="max-w-2xl mx-auto mb-8">
          <div className="backdrop-blur-xl bg-gradient-to-br from-purple/10 via-onyx/60 to-gold/5 border border-purple/30 rounded-3xl p-6 md:p-8">

            {/* Lead magnet */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gold/20 border border-gold/30">
                <BookOpen className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-grotesk font-bold text-white text-base">Free with every subscription</h3>
                <p className="text-silver/50 text-xs">Instant download after signup</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gold/5 border border-gold/20 mb-5">
              <p className="text-gold font-grotesk font-bold text-sm mb-1">
                "The 7 Principles of Cryptonomics" - Free Guide
              </p>
              <p className="text-silver/60 text-xs">
                How Dr. Claude Anderson's Powernomics framework maps to crypto, DeFi, and building
                Black wealth on the blockchain. 20 pages. No fluff.
              </p>
            </div>

            {/* Benefits */}
            <ul className="space-y-2.5 mb-6">
              {BENEFITS.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className={"w-4 h-4 mt-0.5 flex-shrink-0 " + b.color} />
                  <span className="text-silver/75">{b.text}</span>
                </li>
              ))}
            </ul>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silver/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setStatus('idle'); setErrMsg('') }}
                    placeholder="your@email.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-onyx/60 border border-purple/30 rounded-xl text-white placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-all text-sm"
                    disabled={status === 'loading' || status === 'success'}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={{ scale: (status === 'idle' || status === 'error') ? 1.02 : 1 }}
                  whileTap={{  scale: (status === 'idle' || status === 'error') ? 0.98 : 1 }}
                  className={"px-6 py-3.5 rounded-xl font-grotesk font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap min-w-[160px] disabled:opacity-60 disabled:cursor-not-allowed " +
                    (status === 'success' ? 'bg-emerald-500 text-white' :
                     status === 'error'   ? 'bg-red-500/80 text-white' :
                     'bg-gradient-to-r from-gold via-yellow-500 to-gold text-onyx hover:shadow-lg hover:shadow-gold/30')}
                >
                  {status === 'loading' && <><Loader2 className="w-4 h-4 animate-spin" />Joining...</>}
                  {status === 'success' && <><CheckCircle className="w-4 h-4" />Subscribed!</>}
                  {(status === 'idle' || status === 'error') && <>Join Cryptonomics</>}
                </motion.button>
              </div>
              {errMsg && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex items-center gap-1.5 text-red-400 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" />{errMsg}
                </motion.p>
              )}
            </form>

            <p className="text-center text-silver/30 text-xs mt-3">
              Free forever. No spam. Unsubscribe anytime. Built for the culture.
            </p>
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-center">
          <div className="inline-flex items-center gap-3 text-silver/40 text-sm flex-wrap justify-center">
            <div className="flex -space-x-2">
              {['#BD00FF','#00F0FF','#FFD700','#34d399','#BD00FF'].map((color, i) => (
                <div key={i} style={{ background: 'linear-gradient(135deg, ' + color + '80, ' + color + '30)' }} className="w-8 h-8 rounded-full border-2 border-onyx flex items-center justify-center text-xs font-bold text-white">
                  {['M','K','J','A','D'][i]}
                </div>
              ))}
            </div>
            <span>Joined by builders, investors, and everyday people across the diaspora</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
