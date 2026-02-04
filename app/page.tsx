import Hero from '@/components/Hero'
import BreakingIntelligence from '@/components/BreakingIntelligence'
import WealthGuides from '@/components/WealthGuides'
import BlackFounders from '@/components/BlackFounders'
import Tools from '@/components/Tools'
import OracleButton from '@/components/OracleButton'
import RecommendedPlatforms from '@/components/RecommendedPlatforms'

export default function Home() {
  return (
    <div>
      <Hero />
      
      {/* Dashboard Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <BreakingIntelligence />
          <BlackFounders />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <WealthGuides />
          <OracleButton />
        </div>
        
        <Tools />
      </div>

      {/* Recommended Platforms */}
      <RecommendedPlatforms />
    </div>
  )
}
