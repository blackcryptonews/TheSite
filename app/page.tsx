import Hero from '@/components/Hero'
import BreakingIntelligence from '@/components/BreakingIntelligence'
import WealthGuides from '@/components/WealthGuides'
import BlackFounders from '@/components/BlackFounders'
import Tools from '@/components/Tools'
import RecommendedPlatforms from '@/components/RecommendedPlatforms'
import NewsletterSignup from '@/components/NewsletterSignup'

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <BreakingIntelligence />
      <WealthGuides />
      <BlackFounders />
      <Tools />
      <NewsletterSignup />
      <RecommendedPlatforms />
    </div>
  )
}
