'use client'

export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple/20 via-onyx to-cyan/20 animate-pulse-slow" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `linear-gradient(#BD00FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="font-grotesk text-5xl md:text-7xl font-bold mb-6">
          The Future of{' '}
          <span className="text-gradient">Black Wealth</span>
          {' '}Is On-Chain.
        </h1>
        
        <p className="text-silver text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Financial intelligence terminal for the global Black community. 
          Breaking news, wealth guides, and AI-powered crypto advice.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => {
              document.getElementById('learn')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="bg-gradient-to-r from-purple to-cyan text-white px-8 py-4 rounded-lg font-grotesk text-lg hover:scale-105 transition-transform"
          >
            Start Learning
          </button>
          <button 
            onClick={() => {
              const event = new CustomEvent('openOracle');
              window.dispatchEvent(event);
            }}
            className="border-2 border-purple text-purple px-8 py-4 rounded-lg font-grotesk text-lg hover:bg-purple/10 transition-colors"
          >
            Ask The Oracle
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
