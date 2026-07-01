import type { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'

export const metadata: Metadata = {
  title: 'Crypto Portfolio Tracker | Black Crypto News',
  description: 'Track your crypto portfolio in real time. Add your holdings, see live prices, and monitor your total value — free, private, no account needed.',
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
