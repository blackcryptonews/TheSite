import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  gradient?: boolean
}

export default function Card({
  children,
  className = '',
  hover = true,
  glow = false,
  gradient = false
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? {
        y: -4,
        transition: { duration: 0.2 }
      } : {}}
      className={`
        relative
        backdrop-blur-xl
        bg-gradient-to-br from-purple/10 via-onyx/50 to-cyan/10
        border border-purple/30
        rounded-2xl
        p-6
        shadow-2xl
        transition-all duration-300
        ${hover ? 'hover:shadow-purple/20 hover:border-purple/50' : ''}
        ${glow ? 'hover:shadow-[0_0_30px_rgba(189,0,255,0.3)]' : ''}
        ${gradient ? 'before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-purple before:via-cyan before:to-gold before:-z-10' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
