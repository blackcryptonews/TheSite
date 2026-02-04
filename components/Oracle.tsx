'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, ThumbsUp, ThumbsDown } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: { title: string; url: string }[]
}

export default function Oracle() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Listen for open Oracle event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('openOracle', handleOpen)
    return () => window.removeEventListener('openOracle', handleOpen)
  }, [])

  // Load conversation from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('oracle_conversation')
    if (saved) {
      try {
        setMessages(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load conversation:', e)
      }
    }
  }, [])

  // Save conversation to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('oracle_conversation', JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/oracle/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        sources: data.sources,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Oracle error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again or check your API key in the .env.local file.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const suggestedPrompts = [
    "How do I buy my first crypto?",
    "What's the difference between Bitcoin and Ethereum?",
    "How do I keep my crypto safe?",
    "Can I use crypto for my small business?",
  ]

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple to-cyan text-white px-6 py-4 rounded-full font-grotesk text-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
        >
          <span className="text-2xl">🔮</span>
          Ask The Oracle
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] bg-onyx border border-purple rounded-2xl flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple">
              <h3 className="font-grotesk text-xl text-purple">ASK THE ORACLE™</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-silver hover:text-cyan transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center space-y-4">
                  <p className="text-silver text-lg">👋 I'm your crypto financial advisor.</p>
                  <p className="text-silver/80">
                    Ask me anything about blockchain, DeFi, or building wealth.
                  </p>
                  <div className="space-y-2 mt-4">
                    {suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInput(prompt)}
                        className="w-full text-left bg-purple/10 border border-purple/30 text-silver p-3 rounded-lg hover:bg-purple/20 transition-colors text-sm"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} />
              ))}

              {isLoading && (
                <div className="flex gap-2 p-3">
                  <span className="w-2 h-2 bg-purple rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-purple rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-purple rounded-full animate-bounce delay-200" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-purple">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Type your question..."
                  className="flex-1 bg-purple/5 border border-purple/30 text-white p-3 rounded-lg outline-none focus:border-purple transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-purple to-cyan text-white p-3 rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className="text-2xl">{isUser ? '👤' : '🔮'}</div>
      <div className="flex-1">
        <div
          className={`p-3 rounded-lg ${
            isUser
              ? 'bg-cyan/10 border border-cyan/30 ml-auto max-w-[80%]'
              : 'bg-purple/5 border border-purple/30'
          }`}
        >
          <p className="text-silver text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 space-y-1">
            <p className="text-xs text-silver/60">📖 Related articles:</p>
            {message.sources.map((source, idx) => (
              <a
                key={idx}
                href={source.url}
                className="block text-xs text-cyan hover:text-purple transition-colors"
              >
                → {source.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
