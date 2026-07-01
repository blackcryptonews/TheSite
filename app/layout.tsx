import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Ticker from '@/components/Ticker'
import Oracle from '@/components/Oracle'
import ToastProvider from '@/components/ui/Toast'

const SITE_URL = 'https://blackcryptonews.com'
const SITE_NAME = 'Black Crypto News'
const TAGLINE = 'The Future of Black Wealth Is On-Chain'
const DESCRIPTION = 'The definitive crypto media platform for Black wealth. Breaking news, market analysis, DeFi education, and AI-powered intelligence for the global Black community and African diaspora.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    'Black crypto news', 'cryptocurrency', 'Bitcoin', 'Ethereum', 'DeFi',
    'blockchain', 'Black wealth', 'African diaspora crypto', 'Web3',
    'crypto education', 'NFT', 'altcoins', 'crypto market', 'financial empowerment',
    'Nigeria crypto', 'Africa blockchain', 'Black investors', 'crypto news',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icons/favicon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icons/bcn-icon.png', sizes: 'any', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    images: [
      {
        url: '/images/logo-full.png',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BlackCryptoNews',
    creator: '@BlackCryptoNews',
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    images: ['/images/logo-full.png'],
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/api/news/rss`,
    },
  },
  category: 'finance',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsMediaOrganization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/logo-full.png`,
    width: 512,
    height: 512,
  },
  sameAs: [
    'https://twitter.com/BlackCryptoNews',
    'https://instagram.com/BlackCryptoNews',
    'https://youtube.com/@BlackCryptoNews',
  ],
  description: DESCRIPTION,
  foundingDate: '2024',
  knowsAbout: [
    'Cryptocurrency', 'Bitcoin', 'Ethereum', 'DeFi', 'Blockchain',
    'Web3', 'NFTs', 'Financial Literacy', 'Black Wealth',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/news?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#BD00FF" />
        <meta name="color-scheme" content="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <Header />
        <Ticker />
        <main className="min-h-screen">
          {children}
        </main>
        <Oracle />
        <footer className="border-t border-purple/30 py-10 px-4 mt-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <h3 className="font-grotesk text-lg font-bold text-gradient mb-3">Black Crypto News</h3>
                <p className="text-silver/60 text-sm leading-relaxed max-w-sm">
                  The definitive crypto media platform for the global Black community.
                  Building wealth, one block at a time.
                </p>
              </div>
              <div>
                <h4 className="font-grotesk text-sm font-semibold text-silver mb-3">Coverage</h4>
                <ul className="space-y-2 text-sm text-silver/60">
                  {['Market', 'DeFi', 'Security', 'Tech', 'Global'].map(cat => (
                    <li key={cat}>
                      <a href={`/news/${cat.toLowerCase()}`} className="hover:text-cyan transition-colors">
                        {cat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-grotesk text-sm font-semibold text-silver mb-3">Platform</h4>
                <ul className="space-y-2 text-sm text-silver/60">
                  {[
                    { label: 'Learn', href: '/learn' },
                    { label: 'Founders', href: '/founders' },
                    { label: 'Portfolio Tool', href: '/tools/portfolio' },
                    { label: 'Newsletter', href: '#newsletter' },
                    { label: 'About', href: '/about' },
                  ].map(link => (
                    <li key={link.label}>
                      <a href={link.href} className="hover:text-cyan transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-purple/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-silver/40">
              <p>© {new Date().getFullYear()} Black Crypto News. All rights reserved.</p>
              <p>Not financial advice. Always do your own research.</p>
            </div>
          </div>
        </footer>
        <ToastProvider />
      </body>
    </html>
  )
}
