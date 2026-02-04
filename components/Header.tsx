'use client'

import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-onyx/95 backdrop-blur-sm border-b border-purple/30">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image 
              src="/images/logo-icon.png" 
              alt="BlackCryptoNews Logo" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <span className="font-grotesk text-xl font-bold text-gradient">
              BlackCryptoNews
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#intelligence" className="text-silver hover:text-cyan transition-colors">
              Intelligence
            </a>
            <a href="#learn" className="text-silver hover:text-cyan transition-colors">
              Learn
            </a>
            <a href="#founders" className="text-silver hover:text-cyan transition-colors">
              Founders
            </a>
            <a href="#platforms" className="text-silver hover:text-cyan transition-colors">
              Platforms
            </a>
            <a href="#tools" className="text-silver hover:text-cyan transition-colors">
              Tools
            </a>
          </nav>

          {/* Search & Menu */}
          <div className="flex items-center gap-4">
            <button className="text-silver hover:text-cyan transition-colors">
              <Search size={20} />
            </button>
            <button 
              className="md:hidden text-silver hover:text-cyan transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-purple/30 flex flex-col gap-4">
            <a href="#intelligence" className="text-silver hover:text-cyan transition-colors">
              Intelligence
            </a>
            <a href="#learn" className="text-silver hover:text-cyan transition-colors">
              Learn
            </a>
            <a href="#founders" className="text-silver hover:text-cyan transition-colors">
              Founders
            </a>
            <a href="#platforms" className="text-silver hover:text-cyan transition-colors">
              Platforms
            </a>
            <a href="#tools" className="text-silver hover:text-cyan transition-colors">
              Tools
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
