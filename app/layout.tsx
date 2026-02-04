import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Ticker from '@/components/Ticker'
import Oracle from '@/components/Oracle'

export const metadata: Metadata = {
  title: 'BlackCryptoNews - The Future of Black Wealth Is On-Chain',
  description: 'Financial intelligence terminal for Black wealth. Breaking crypto news, wealth guides, and AI-powered advice.',
  keywords: 'crypto, cryptocurrency, Bitcoin, Ethereum, Black wealth, DeFi, blockchain',
  icons: {
    icon: [
      { url: '/icons/favicon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icons/bcn-icon.png', sizes: 'any', type: 'image/png' }
    ],
    apple: '/icons/favicon-512.png',
  },
  openGraph: {
    title: 'BlackCryptoNews - The Future of Black Wealth Is On-Chain',
    description: 'Financial intelligence terminal for Black wealth. Breaking crypto news, wealth guides, and AI-powered advice.',
    images: ['/images/logo-full.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlackCryptoNews - The Future of Black Wealth Is On-Chain',
    description: 'Financial intelligence terminal for Black wealth. Breaking crypto news, wealth guides, and AI-powered advice.',
    images: ['/images/logo-full.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Header />
        <Ticker />
        <main className="min-h-screen">
          {children}
        </main>
        <Oracle />
        <footer className="border-t border-purple/30 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center text-silver/60 text-sm">
            <p>© 2025 BlackCryptoNews. Building wealth on-chain.</p>
            <p className="mt-2">Not financial advice. Do your own research.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
