import type { Metadata } from 'next'
import NewsPageClient from './NewsPageClient'

export const metadata: Metadata = {
  title: 'Crypto News',
  description: 'Live cryptocurrency news across markets, DeFi, security, technology, and global blockchain adoption — curated for the Black community.',
}

export default function NewsPage() {
  return <NewsPageClient />
}
