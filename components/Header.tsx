'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Search, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import SearchModal from './SearchModal'

const NAV_LINKS = [
  { label: 'News', href: '/news' },
  { label: 'Markets', href: '/#intelligence' },
  { label: 'Learn', href: '/#learn' },
  { label: 'Founders', href: '/#founders' },
  { label: 'Tools', href: '/tools/portfolio' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 20)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-onyx/98 backdrop-blur-md shadow-lg shadow-black/50 border-b border-purple/40'
        : 'bg-onyx/95 backdrop-blur-sm border-b border-purple/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity group">
            <div className="relative">
              <Image
                src="/images/logo-icon.png"
                alt="Black Crypto News"
                width={36}
                height={36}
                className="rounded-lg"
                priority
              />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <span className="font-grotesk text-lg font-bold text-gradient">BlackCryptoNews</span>
              <p className="text-silver/40 text-[9px] font-orbitron tracking-widest -mt-0.5 hidden md:block">THE FUTURE IS ON-CHAIN</p>
            </div>
            <span className="sm:hidden font-grotesk text-base font-bold text-gradient">BCN</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="text-silver/80 hover:text-cyan transition-colors font-grotesk text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple to-cyan rounded-full transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple/10 border border-purple/20 text-silver/70 hover:text-cyan hover:border-cyan/30 hover:bg-cyan/5 transition-all group"
            >
              <Search size={15} className="group-hover:scale-110 transition-transform" />
              <span className="hidden lg:inline text-xs font-grotesk">Search</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 bg-onyx/50 rounded text-[10px] border border-purple/20 font-orbitron">Ctrl+K</kbd>
            </button>

            {/* Oracle CTA */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openOracle'))}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple/80 to-cyan/50 text-white text-xs font-grotesk font-semibold hover:from-purple hover:to-cyan/70 transition-all shadow-lg shadow-purple/20"
            >
              <Zap size={12} />
              Oracle
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-1.5 text-silver hover:text-cyan transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-3 pt-3 border-t border-purple/30 flex flex-col gap-0.5">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2.5 text-silver hover:text-cyan hover:bg-purple/5 rounded-lg transition-all font-grotesk text-sm"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false)
                window.dispatchEvent(new CustomEvent('openOracle'))
              }}
              className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-purple/80 to-cyan/50 text-white text-sm font-grotesk font-semibold"
            >
              <Zap size={14} />
              Ask The Oracle
            </button>
          </nav>
        )}
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}
