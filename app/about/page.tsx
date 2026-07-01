import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About — Black Crypto News',
  description: 'Black Crypto News is the definitive cryptocurrency media platform for the global Black community and African diaspora. Our mission: close the digital wealth gap through trusted journalism, education, and AI-powered tools.',
}

export default function AboutPage() {
  return <AboutClient />
}
