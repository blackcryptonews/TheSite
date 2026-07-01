import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group'

  const variants = {
    primary: 'bg-gradient-to-r from-purple via-cyber-blue to-purple bg-size-200 hover:bg-pos-100 text-onyx shadow-lg shadow-purple/50 hover:shadow-xl hover:shadow-purple/60',
    secondary: 'bg-gradient-to-r from-gold to-cyber-blue text-onyx shadow-lg shadow-gold/50 hover:shadow-xl hover:shadow-gold/60',
    outline: 'border-2 border-purple/50 text-purple hover:bg-purple/10 hover:border-purple',
    ghost: 'text-cyber-blue hover:bg-cyber-blue/10'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}
