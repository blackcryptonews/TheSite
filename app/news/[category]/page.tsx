import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NewsCategoryClient from './NewsCategoryClient'

const VALID_CATEGORIES = ['market', 'defi', 'security', 'tech', 'global'] as const
type ValidCategory = typeof VALID_CATEGORIES[number]

const categoryMeta: Record<ValidCategory, { title: string; description: string }> = {
  market: {
    title: 'Market News',
    description: 'Live cryptocurrency market updates, price analysis, and trading news for Bitcoin, Ethereum, and top altcoins.',
  },
  defi: {
    title: 'DeFi Intelligence',
    description: 'Decentralized finance news — yield farming, lending protocols, DEXs, liquidity pools, and the future of open finance.',
  },
  security: {
    title: 'Security Alerts',
    description: 'Crypto security alerts, hacks, scam warnings, and best practices to protect your digital assets.',
  },
  tech: {
    title: 'Blockchain Technology',
    description: 'Ethereum, Layer 2, NFTs, smart contracts, and the latest in blockchain infrastructure and development.',
  },
  global: {
    title: 'Global & Africa',
    description: 'Cryptocurrency adoption in Africa, Caribbean, and the diaspora. Regulatory news and emerging market coverage.',
  },
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map(category => ({ category }))
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const cat = params.category as ValidCategory
  if (!VALID_CATEGORIES.includes(cat)) return {}

  const meta = categoryMeta[cat]
  return {
    title: meta.title,
    description: meta.description,
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = params.category as ValidCategory
  if (!VALID_CATEGORIES.includes(cat)) notFound()

  return <NewsCategoryClient category={cat} meta={categoryMeta[cat]} />
}
