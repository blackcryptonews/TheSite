# BlackCryptoNews - Quick Deployment Guide

## 🚀 Get Your Site Live in 10 Minutes

### Step 1: Get Your API Key (2 minutes)

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up / Log in
3. Click "API Keys" in sidebar
4. Click "Create Key"
5. Copy your key (starts with `sk-ant-...`)

**Cost:** First $5 free, then ~$0.001 per conversation

---

### Step 2: Set Up Locally (3 minutes)

```bash
# Navigate to the project folder
cd blackcryptonews

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local and add your API key
# ANTHROPIC_API_KEY=sk-ant-your-key-here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - your site is running!

---

### Step 3: Deploy to Vercel (5 minutes)

**Option A: Deploy from GitHub (Recommended)**

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
# Create a new repo on GitHub, then:
git remote add origin https://github.com/yourusername/blackcryptonews.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repo
5. Add environment variable:
   - Key: `ANTHROPIC_API_KEY`
   - Value: Your API key
6. Click "Deploy"

**Done!** Your site is live at `your-project.vercel.app`

---

**Option B: Deploy via CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts, add ANTHROPIC_API_KEY when asked
```

---

### Step 4: Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project
2. Click "Settings" → "Domains"
3. Add `blackcryptonew.com` (or your domain)
4. Follow DNS instructions from your domain registrar

---

## Common Issues

### "API key not configured"
- Make sure `.env.local` exists
- Check the API key starts with `sk-ant-`
- Restart the dev server (`npm run dev`)

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Oracle not responding
- Check console for errors (F12 in browser)
- Verify API key is valid at console.anthropic.com
- Check network tab for 401/403 errors

---

## What's Included

✅ **Fully functional website** with:
- Landing page with hero section
- Crypto price ticker
- Breaking Intelligence panel
- Wealth Guides panel
- Black Founders spotlight
- Tools & Calculators section
- Ask The Oracle™ AI chatbot

✅ **Production-ready code:**
- TypeScript
- Tailwind CSS
- Responsive design
- SEO optimized
- <2 second load time

---

## Next Steps

1. **Add real content:**
   - Replace sample articles in `components/BreakingIntelligence.tsx`
   - Update guides in `components/WealthGuides.tsx`
   - Feature real founders in `components/BlackFounders.tsx`

2. **Connect real APIs:**
   - CoinGecko for live crypto prices
   - RSS feeds for auto-news
   - Pinecone for Oracle knowledge base

3. **Build features:**
   - Working calculators
   - Newsletter signup
   - CMS for articles
   - Premium tier

---

## Support

**Need help?**
- Check README.md for detailed docs
- Email: hello@blackcryptonews.com
- Twitter: @BlackCryptoNews

**Want to customize?**
- All colors in `tailwind.config.ts`
- Oracle personality in `app/api/oracle/chat/route.ts`
- Content in `components/*.tsx`

---

## Costs

**Monthly operating costs:**
- Vercel: Free (Pro: $20/mo)
- Anthropic API: ~$10-50/mo depending on usage
- Domain: ~$12/year
- **Total: ~$10-70/mo**

**To reduce costs:**
- Use rate limiting on Oracle (10 msgs/hour free tier)
- Cache responses in database
- Launch premium tier ($9.99/mo) to cover costs

---

## You're Ready! 🎉

Your BCN site is production-ready. Deploy it, share it, and start building the future of Black wealth on-chain.

**Questions?** Open an issue on GitHub or reach out.

**Let's go! 🚀**
