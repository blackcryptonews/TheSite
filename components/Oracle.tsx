'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Trash2, Sparkles, TrendingUp, Shield, Wallet, Lightbulb, ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_ACTIONS = [
  { icon: TrendingUp, label: "What's trending in crypto?", color: 'text-cyan' },
  { icon: Shield,    label: "How do I secure my wallet?", color: 'text-purple' },
  { icon: Wallet,    label: "Explain DeFi simply",         color: 'text-gold' },
  { icon: Lightbulb, label: "Best crypto for beginners?",  color: 'text-emerald-400' },
]

const SUGGESTED = [
  "How does group economics apply to crypto?",
  "Explain Bitcoin like I'm new to money",
  "Best way to start with $100 in crypto?",
  "How do I keep my crypto safe from hackers?",
  "What's a DAO and why should I care?",
  "How can Africans use crypto for remittances?",
]

export default function Oracle() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('openOracle', handleOpen)
    return () => window.removeEventListener('openOracle', handleOpen)
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('oracle_v2')
      if (saved) setMessages(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      try { localStorage.setItem('oracle_v2', JSON.stringify(messages.slice(-20))) } catch {}
    }
  }, [messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  const sendMessage = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg || isLoading) return

    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/oracle/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: messages }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || data.error || 'The Oracle is temporarily unavailable.',
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection lost. Please check your internet and try again.',
      }])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages])

  const clear = () => {
    setMessages([])
    try { localStorage.removeItem('oracle_v2') } catch {}
    toast.success('Conversation cleared')
  }

  return (
    <>
      {/* ── Subtle FAB ─────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="fab"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open Oracle AI"
            className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-onyx/90 border border-purple/40 backdrop-blur-md shadow-lg shadow-black/40 hover:border-purple/70 hover:bg-onyx/95 transition-all duration-200"
          >
            {/* Subtle pulse ring */}
            <span className="relative flex-shrink-0">
              <span className="absolute inset-0 rounded-full bg-purple/30 animate-ping opacity-60" />
              <span className="relative text-lg">🔮</span>
            </span>
            <span className="font-grotesk text-sm font-semibold text-silver/80 group-hover:text-white transition-colors pr-1">
              Oracle
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ─────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className={`
                fixed z-50 flex flex-col
                bg-gradient-to-br from-[#0a0a0f] via-[#0d0011] to-[#040a14]
                border border-purple/30 shadow-2xl shadow-purple/10 overflow-hidden
                /* Mobile: full screen */
                inset-x-2 bottom-2 top-16
                /* Desktop: floating panel */
                sm:inset-auto sm:bottom-8 sm:right-8 sm:w-[420px] sm:h-[680px]
                sm:rounded-3xl rounded-2xl
              `}
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple/15 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan/10 rounded-full blur-3xl" />
              </div>

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-white/5 bg-black/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple/40 to-cyan/20 border border-purple/40 flex items-center justify-center text-lg">🔮</div>
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0f]" />
                  </div>
                  <div>
                    <h3 className="font-grotesk text-sm font-bold text-white">The Oracle</h3>
                    <p className="text-[10px] text-silver/40 font-orbitron tracking-wider">CRYPTONOMICS AI · LIVE</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <button
                      onClick={clear}
                      className="p-2 rounded-lg text-silver/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      title="Clear conversation"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-silver/30 hover:text-white hover:bg-white/5 transition-all"
                    aria-label="Close Oracle"
                  >
                    <ChevronDown size={18} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth overscroll-contain">
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                  >
                    {/* Welcome */}
                    <div className="text-center py-4">
                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-5xl mb-3"
                      >🔮</motion.div>
                      <h4 className="font-grotesk text-base font-bold text-white mb-1.5">Welcome to The Oracle</h4>
                      <p className="text-silver/50 text-xs leading-relaxed max-w-xs mx-auto">
                        AI crypto intelligence powered by Powernomics. Ask me anything about crypto,
                        DeFi, blockchain, and building generational wealth.
                      </p>
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-2 gap-2">
                      {QUICK_ACTIONS.map((a, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07 }}
                          onClick={() => sendMessage(a.label)}
                          className="p-3 rounded-xl bg-white/3 border border-white/8 hover:border-purple/40 hover:bg-purple/10 transition-all text-left group"
                        >
                          <a.icon className={`w-4 h-4 ${a.color} mb-1.5`} />
                          <p className="text-xs text-silver/70 group-hover:text-white leading-snug">{a.label}</p>
                        </motion.button>
                      ))}
                    </div>

                    {/* Suggested */}
                    <div className="space-y-1.5">
                      <p className="text-[10px] text-silver/30 font-orbitron tracking-widest uppercase px-1">Try asking...</p>
                      {SUGGESTED.map((s, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          onClick={() => sendMessage(s)}
                          className="w-full text-left text-xs text-silver/55 hover:text-white px-3 py-2 rounded-lg hover:bg-purple/10 border border-transparent hover:border-purple/20 transition-all group"
                        >
                          <span className="text-purple/40 group-hover:text-purple mr-2">›</span>
                          {s}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {messages.map((msg, i) => (
                  <MessageBubble key={i} message={msg} />
                ))}

                {isLoading && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/3 border border-white/5 max-w-[80%]">
                    <span className="text-base">🔮</span>
                    <div className="flex gap-1.5">
                      {[0,1,2].map(i => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-purple/70 animate-bounce"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="relative z-10 px-4 pb-4 pt-3 border-t border-white/5 bg-black/10">
                <div className="flex gap-2 items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                    placeholder="Ask about crypto, DeFi, wealth..."
                    className="flex-1 bg-white/5 border border-white/10 text-white text-sm px-4 py-3 rounded-xl outline-none focus:border-purple/50 focus:bg-white/8 transition-all placeholder-silver/25"
                    disabled={isLoading}
                  />
                  <motion.button
                    onClick={() => sendMessage()}
                    disabled={isLoading || !input.trim()}
                    whileTap={{ scale: 0.92 }}
                    className={`p-3 rounded-xl flex-shrink-0 transition-all ${
                      isLoading || !input.trim()
                        ? 'bg-white/5 text-silver/20 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple to-cyan text-white shadow-lg shadow-purple/30 hover:shadow-purple/50'
                    }`}
                    aria-label="Send"
                  >
                    {isLoading
                      ? <Sparkles size={17} className="animate-spin" />
                      : <Send size={17} />
                    }
                  </motion.button>
                </div>
                <p className="text-center text-[10px] text-silver/20 mt-2 font-orbitron tracking-wider">
                  NOT FINANCIAL ADVICE · POWERED BY CRYPTONOMICS AI
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm mt-0.5 ${
        isUser
          ? 'bg-gradient-to-br from-cyan/30 to-blue-500/20 border border-cyan/30'
          : 'bg-gradient-to-br from-purple/30 to-pink-500/10 border border-purple/30'
      }`}>
        {isUser ? '👤' : '🔮'}
      </div>
      <div className={`flex-1 min-w-0 ${isUser ? 'flex justify-end' : ''}`}>
        <div className={`inline-block max-w-[88%] px-4 py-3 rounded-2xl text-sm leading-relaxed text-silver/90 whitespace-pre-wrap ${
          isUser
            ? 'bg-gradient-to-br from-cyan/15 to-blue-500/10 border border-cyan/20 rounded-tr-sm'
            : 'bg-white/4 border border-white/8 rounded-tl-sm'
        }`}>
          {message.content}
        </div>
      </div>
    </motion.div>
  )
}
