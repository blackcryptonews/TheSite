'use client'

export default function OracleButton() {
  const handleClick = () => {
    const event = new CustomEvent('openOracle');
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-onyx border border-purple/30 rounded-lg p-6">
      <h2 className="font-grotesk text-2xl text-purple mb-4">Ask The Oracle™</h2>
      <p className="text-silver/80 mb-4">
        Get personalized crypto advice from our AI advisor. Click the button below to start.
      </p>
      <button 
        onClick={handleClick}
        className="bg-gradient-to-r from-purple to-cyan text-white px-6 py-3 rounded-lg font-grotesk hover:scale-105 transition-transform"
      >
        Ask The Oracle
      </button>
    </div>
  );
}
