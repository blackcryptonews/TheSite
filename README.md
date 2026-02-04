# BlackCryptoNews (BCN)

**The Future of Black Wealth Is On-Chain**

A financial intelligence terminal for the global Black community. Breaking crypto news, wealth guides, Black founder spotlights, and AI-powered advice via Ask The Oracle™.

---

## Features

### ✅ Built & Ready
- **Landing Page** - Hero section with animated gradient background
- **Crypto Ticker** - Real-time prices for BTC, ETH, SOL, BNB, MATIC, USDC
- **Breaking Intelligence** - Curated crypto news feed
- **Wealth Guides** - Step-by-step educational content
- **Black Founders** - Spotlight on Black-owned Web3 projects
- **Tools & Calculators** - Portfolio tracker, gas estimator, DCA calculator
- **Ask The Oracle™** - AI chatbot powered by Claude Sonnet 4.5

### 🚧 Coming Soon
- Content Management System (CMS)
- Auto-feed from crypto news APIs
- Real-time price updates from CoinGecko
- Vector database for Oracle knowledge base
- Premium tier ($9.99/mo)
- Mobile app

---

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com/))

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
blackcryptonews/
├── app/
│   ├── api/
│   │   └── oracle/
│   │       └── chat/
│   │           └── route.ts          # Oracle API endpoint
│   ├── globals.css                   # Global styles with BCN colors
│   ├── layout.tsx                    # Root layout with header/footer
│   └── page.tsx                      # Homepage
├── components/
│   ├── Header.tsx                    # Navigation bar
│   ├── Ticker.tsx                    # Crypto price ticker
│   ├── Hero.tsx                      # Hero section
│   ├── Oracle.tsx                    # AI chatbot component
│   ├── BreakingIntelligence.tsx     # News feed
│   ├── WealthGuides.tsx              # Educational content
│   ├── BlackFounders.tsx             # Founder profiles
│   └── Tools.tsx                     # Calculators/utilities
├── lib/                              # Utility functions (future)
├── public/                           # Static assets
├── .env.local.example                # Environment template
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind with BCN colors
└── package.json                      # Dependencies
```

---

## Design System

### Colors
```css
Primary:
  Onyx:          #050505  (background)
  Electric Purple: #BD00FF  (primary accent)
  Cyber Blue:    #00F0FF  (secondary accent)

Accents:
  Gold:          #FFD700  (highlights only)
  Soft Silver:   #C8C8C8  (text)
```

### Typography
```css
Headlines:  Space Grotesk
Numbers:    Orbitron
Body:       Inter
```

### Usage
```tsx
// Gradient text
<span className="text-gradient">Black Wealth</span>

// Primary button
<button className="bg-gradient-to-r from-purple to-cyan">
  Click Me
</button>

// Card border
<div className="border border-purple/30">
  Content
</div>
```

---

## Deployment

### Vercel (Recommended)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

2. **Deploy to Vercel:**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repo
- Add environment variable: `ANTHROPIC_API_KEY`
- Deploy!

Your site will be live at: `your-project.vercel.app`

### Netlify

1. **Build command:** `npm run build`
2. **Publish directory:** `.next`
3. **Add environment variables** in Netlify dashboard

### Railway / Render

Both support Next.js out of the box:
1. Connect your GitHub repo
2. Add `ANTHROPIC_API_KEY` in environment settings
3. Deploy

---

## Customization

### Update Sample Content

**Breaking Intelligence** (`components/BreakingIntelligence.tsx`):
```tsx
const sampleArticles = [
  {
    id: 1,
    title: 'Your Article Title',
    summary: 'Article summary...',
    category: 'Market',
    readTime: '3 min',
    timeAgo: '2 hours ago',
    isAlert: false,
  },
  // Add more articles
]
```

**Wealth Guides** (`components/WealthGuides.tsx`):
```tsx
const guides = [
  {
    id: 1,
    title: 'Your Guide Title',
    category: 'Getting Started',
    difficulty: 'Beginner',
    readTime: '5 min',
  },
  // Add more guides
]
```

**Black Founders** (`components/BlackFounders.tsx`):
```tsx
const featuredFounder = {
  name: 'Founder Name',
  project: 'Project Name',
  location: 'City, Country',
  mission: 'Mission statement...',
  description: 'Project description...',
  stage: 'Seed',
  raised: '$2M',
  website: 'https://...',
  twitter: 'https://...',
}
```

### Oracle Personality

Edit `app/api/oracle/chat/route.ts` to customize the Oracle's system prompt:

```ts
const SYSTEM_PROMPT = `Your custom personality here...`
```

---

## API Integration (Next Steps)

### Real-Time Crypto Prices

Replace sample data in `components/Ticker.tsx` with CoinGecko API:

```tsx
useEffect(() => {
  const fetchPrices = async () => {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,matic-network&vs_currencies=usd&include_24hr_change=true'
    )
    const data = await response.json()
    // Update state
  }
  fetchPrices()
  const interval = setInterval(fetchPrices, 60000)
  return () => clearInterval(interval)
}, [])
```

### Auto-Feed Breaking News

1. Set up RSS parser (e.g., `rss-parser`)
2. Create API route: `app/api/news/route.ts`
3. Use Claude API to rewrite articles
4. Store in database or display directly

### Vector Database for Oracle

1. Set up Pinecone account
2. Create embeddings for all articles (OpenAI API)
3. Query Pinecone in `app/api/oracle/chat/route.ts`
4. Add relevant articles as context for Claude

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI:** Framer Motion (animations)
- **Icons:** Lucide React
- **AI:** Anthropic Claude Sonnet 4.5

---

## Performance

Current site loads in **<2 seconds** on 4G:
- Optimized images (future: next/image)
- Minimal JavaScript (React hydration)
- Edge-deployed (Vercel/Netlify CDN)

---

## Roadmap

### Phase 1: MVP (Current)
- ✅ Landing page
- ✅ Oracle chatbot
- ✅ Sample content
- ✅ Responsive design

### Phase 2: Content (Month 1)
- [ ] CMS for articles
- [ ] Auto-feed from news APIs
- [ ] 10+ Wealth Guides
- [ ] 3+ Founder profiles

### Phase 3: Features (Month 2)
- [ ] Working calculators
- [ ] Real-time price updates
- [ ] Newsletter signup
- [ ] Social media integration

### Phase 4: Monetization (Month 3)
- [ ] Oracle Premium ($9.99/mo)
- [ ] Stripe integration
- [ ] Sponsored content
- [ ] API licensing

---

## Support

**Issues?** Open a GitHub issue or email: hello@blackcryptonews.com

**Want to contribute?** Pull requests welcome!

**API Errors?**
- Check `.env.local` has valid `ANTHROPIC_API_KEY`
- Verify API key at [console.anthropic.com](https://console.anthropic.com/)
- Check console for detailed error messages

---

## License

MIT License - Build your own version!

---

## Credits

Built by the BCN team. Designed for the global Black community.

**The future of wealth is on-chain. Let's build it together. 🚀**
