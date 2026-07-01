import type { Metadata } from 'next'
import LearnClient from './LearnClient'

export const metadata: Metadata = {
  title: 'Cryptonomics Academy | Learn Crypto — Black Crypto News',
  description: 'Free crypto education through the lens of Black economic empowerment. Bitcoin, DeFi, wallets, Web3 — explained clearly for the diaspora.',
  openGraph: {
    title: 'Cryptonomics Academy — Learn Crypto the Right Way',
    description: 'Bitcoin, DeFi, wallets, and wealth-building strategies for the global Black community.',
  },
}

export default function LearnPage() {
  return <LearnClient />
}
