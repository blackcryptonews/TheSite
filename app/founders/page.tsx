import type { Metadata } from 'next'
import FoundersClient from './FoundersClient'

export const metadata: Metadata = {
  title: 'Black Founders in Crypto & Web3 | Black Crypto News',
  description: 'Spotlighting Black entrepreneurs building the future of finance. Discover founders, projects, and innovations from the global Black crypto community.',
  openGraph: {
    title: 'Black Founders in Crypto & Web3',
    description: 'The directory of Black-led projects shaping the decentralized economy.',
  },
}

export default function FoundersPage() {
  return <FoundersClient />
}
