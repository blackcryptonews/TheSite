import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        onyx: '#050505',
        purple: '#BD00FF',
        cyan: '#00F0FF',
        gold: '#FFD700',
        silver: '#C8C8C8',
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        orbitron: ['Orbitron', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
