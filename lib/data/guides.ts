export interface Guide {
  id: string
  slug: string
  title: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  readTime: string
  icon: string
  excerpt: string
  content: GuideSection[]
  author: string
  publishedDate: string
  tags: string[]
}

export interface GuideSection {
  heading: string
  content: string[]
}

export const guides: Guide[] = [
  {
    id: '1',
    slug: 'how-to-buy-your-first-crypto',
    title: 'How to Buy Your First Crypto in 2025',
    category: 'Getting Started',
    difficulty: 'Beginner',
    readTime: '8 min',
    icon: 'Rocket',
    excerpt: 'A complete beginner\'s guide to purchasing cryptocurrency safely and securely.',
    author: 'BlackCryptoNews Team',
    publishedDate: '2025-01-15',
    tags: ['beginner', 'buying', 'exchanges', 'wallets'],
    content: [
      {
        heading: 'Why Buy Cryptocurrency?',
        content: [
          'Cryptocurrency represents a revolutionary shift in how we think about money and value transfer. For the Black community, crypto offers unique opportunities for financial sovereignty, wealth building, and participation in the global digital economy.',
          'Unlike traditional banking systems that have historically underserved minority communities, crypto operates on decentralized networks accessible to anyone with an internet connection.',
          'Key benefits include: 24/7 market access, lower barriers to entry, potential for significant returns, and freedom from traditional banking restrictions.'
        ]
      },
      {
        heading: 'Step 1: Choose a Reputable Exchange',
        content: [
          'Your first step is selecting a cryptocurrency exchange. Think of exchanges as digital marketplaces where you can buy, sell, and trade crypto.',
          'Recommended exchanges for beginners: Coinbase (most user-friendly), Kraken (excellent security), Binance.US (wide selection), Cash App (simple Bitcoin purchases).',
          'What to look for: Strong security features (2FA, insurance), low fees, good customer support, easy-to-use interface, and availability in your state/country.',
          'Most exchanges require identity verification (KYC) - have your driver\'s license or passport ready.'
        ]
      },
      {
        heading: 'Step 2: Secure Your Account',
        content: [
          'Security is paramount. Enable two-factor authentication (2FA) immediately using an authenticator app like Google Authenticator or Authy.',
          'Create a strong, unique password (use a password manager like 1Password or Bitwarden).',
          'Never share your login credentials or 2FA codes with anyone.',
          'Be wary of phishing emails - always type the exchange URL directly into your browser.'
        ]
      },
      {
        heading: 'Step 3: Fund Your Account',
        content: [
          'Link a payment method: bank account (lowest fees, 3-5 days), debit card (instant, higher fees), or wire transfer (large amounts).',
          'Start small - invest only what you can afford to lose. $50-$100 is a great starting point.',
          'Many exchanges offer recurring purchases - consider dollar-cost averaging by buying small amounts regularly.'
        ]
      },
      {
        heading: 'Step 4: Make Your First Purchase',
        content: [
          'Bitcoin (BTC) and Ethereum (ETH) are recommended for beginners due to their established track records and liquidity.',
          'Navigate to the "Buy" section, enter the amount you want to spend, review the fees, and confirm your purchase.',
          'Your crypto will appear in your exchange wallet within minutes.'
        ]
      },
      {
        heading: 'Step 5: Consider Self-Custody',
        content: [
          'While exchanges are convenient, they control your crypto. For long-term holdings, consider moving funds to a personal wallet.',
          'Hardware wallets (Ledger, Trezor) offer maximum security for larger amounts.',
          'Software wallets (MetaMask, Trust Wallet) provide a good balance of security and convenience.',
          'Remember: "Not your keys, not your crypto" - whoever controls the private keys controls the funds.'
        ]
      },
      {
        heading: 'Common Mistakes to Avoid',
        content: [
          'Don\'t FOMO (Fear Of Missing Out) - resist the urge to buy during price spikes.',
          'Don\'t invest based on social media hype or "hot tips."',
          'Don\'t store large amounts on exchanges long-term.',
          'Don\'t lose your seed phrase - write it down and store it securely offline.',
          'Don\'t day trade as a beginner - focus on long-term holding.'
        ]
      },
      {
        heading: 'Next Steps',
        content: [
          'Continue your education - crypto is complex and evolving.',
          'Join crypto communities focused on the Black community to learn and network.',
          'Track your portfolio but avoid checking prices obsessively.',
          'Consider spreading investments across multiple cryptocurrencies (diversification).',
          'Stay informed about regulatory changes and market trends.'
        ]
      }
    ]
  },
  {
    id: '2',
    slug: 'wallet-security-101',
    title: 'Wallet Security 101: Protect Your Assets',
    category: 'Security',
    difficulty: 'Beginner',
    readTime: '10 min',
    icon: 'Shield',
    excerpt: 'Essential security practices to keep your cryptocurrency safe from theft and loss.',
    author: 'BlackCryptoNews Security Team',
    publishedDate: '2025-01-20',
    tags: ['security', 'wallets', 'best-practices', 'safety'],
    content: [
      {
        heading: 'Understanding Crypto Wallets',
        content: [
          'A cryptocurrency wallet doesn\'t actually store your crypto - it stores the private keys that give you access to your funds on the blockchain.',
          'There are two main types: Hot wallets (connected to internet) and Cold wallets (offline storage).',
          'Hot wallets: Convenient for daily use, higher risk. Examples: MetaMask, Trust Wallet, Coinbase Wallet.',
          'Cold wallets: Maximum security for long-term storage. Examples: Ledger Nano X, Trezor Model T, paper wallets.'
        ]
      },
      {
        heading: 'The Sacred Seed Phrase',
        content: [
          'Your seed phrase (also called recovery phrase or mnemonic) is typically 12-24 words that can restore your entire wallet.',
          'This is the MOST IMPORTANT thing to protect. Anyone with your seed phrase has complete access to your funds.',
          'NEVER store it digitally - no screenshots, no cloud storage, no password managers.',
          'Write it down on paper (or metal for fire/water resistance) and store in a secure location like a safe.',
          'Consider storing copies in multiple secure locations.',
          'Never share your seed phrase with anyone - legitimate companies will NEVER ask for it.'
        ]
      },
      {
        heading: 'Private Keys vs Public Keys',
        content: [
          'Public key (wallet address): Like your email address - safe to share, used to receive funds.',
          'Private key: Like your email password - NEVER share, used to send funds and prove ownership.',
          'Your seed phrase generates your private keys, which generate your public keys.',
          'Losing your private keys = losing access to your funds forever.'
        ]
      },
      {
        heading: 'Hardware Wallet Setup',
        content: [
          'Hardware wallets are USB-like devices that store your private keys offline.',
          'Buy ONLY from official manufacturers - never from third parties or marketplaces like eBay.',
          'During setup, the device generates a seed phrase - write it down immediately.',
          'Set a strong PIN to prevent physical access.',
          'Regularly update firmware for security patches.',
          'Cost: $50-200, but worth it for amounts over $1000.'
        ]
      },
      {
        heading: 'Software Wallet Best Practices',
        content: [
          'Download wallets only from official websites or verified app stores.',
          'Enable all available security features: PIN/password, biometric authentication, transaction signing.',
          'Keep your device\'s operating system and wallet software updated.',
          'Use a dedicated device for crypto if holding significant amounts.',
          'Be extremely cautious of browser extensions - verify authenticity before installing.'
        ]
      },
      {
        heading: 'Common Attack Vectors',
        content: [
          'Phishing: Fake websites mimicking real exchanges/wallets. Always double-check URLs.',
          'Clipboard malware: Replaces copied wallet addresses. Always verify addresses before sending.',
          'Fake customer support: Scammers pretending to be support staff asking for seed phrases.',
          'SIM swapping: Attackers take over your phone number to bypass 2FA.',
          'Dusting attacks: Small amounts sent to your wallet to track your activity.',
          'Man-in-the-middle attacks: Intercepting your connection on public WiFi.'
        ]
      },
      {
        heading: 'The $5 Wrench Attack',
        content: [
          'Physical security matters too. Don\'t openly discuss how much crypto you own.',
          'Use a privacy-focused approach - avoid posting holdings on social media.',
          'Consider using a "decoy wallet" with a small amount for plausible deniability.',
          'Some hardware wallets support "duress PINs" that open a decoy wallet under threat.'
        ]
      },
      {
        heading: 'Inheritance Planning',
        content: [
          'Crypto requires special estate planning. If you pass away without a plan, your crypto could be lost forever.',
          'Options: Secure vault instructions, multi-signature wallets requiring multiple family members, services like Casa or Unchained Capital.',
          'Never put seed phrases in a standard will (becomes public record).',
          'Consider a trust specifically designed for digital assets.'
        ]
      },
      {
        heading: 'Security Checklist',
        content: [
          '✓ Seed phrase written down and stored securely offline',
          '✓ Hardware wallet for long-term holdings',
          '✓ 2FA enabled on all accounts (preferably not SMS)',
          '✓ Unique passwords for each platform',
          '✓ Regular security audits of your setup',
          '✓ Educated about common scams and attack vectors',
          '✓ Emergency plan for inheritance/incapacitation',
          '✓ Using a VPN when accessing crypto accounts',
          '✓ Separate email for crypto accounts only'
        ]
      }
    ]
  },
  {
    id: '3',
    slug: 'defi-explained',
    title: 'DeFi Explained: Banking Without Banks',
    category: 'DeFi',
    difficulty: 'Intermediate',
    readTime: '12 min',
    icon: 'Blocks',
    excerpt: 'Understanding decentralized finance and how it\'s revolutionizing access to financial services.',
    author: 'BlackCryptoNews DeFi Team',
    publishedDate: '2025-01-25',
    tags: ['defi', 'lending', 'yield', 'dapps'],
    content: [
      {
        heading: 'What is DeFi?',
        content: [
          'DeFi (Decentralized Finance) recreates traditional financial services without intermediaries like banks.',
          'Built on blockchains (primarily Ethereum), DeFi uses smart contracts - self-executing code that automatically enforces agreements.',
          'Why it matters for the Black community: Access to financial services without discrimination, gatekeeping, or geographical restrictions.',
          'Total Value Locked (TVL) in DeFi has reached hundreds of billions, proving real-world adoption.'
        ]
      },
      {
        heading: 'Core DeFi Services',
        content: [
          'Lending/Borrowing: Earn interest by lending crypto, or borrow against your holdings (Aave, Compound).',
          'Decentralized Exchanges (DEXs): Trade crypto peer-to-peer without KYC (Uniswap, SushiSwap).',
          'Stablecoins: Crypto pegged to stable assets like USD (USDC, DAI) - bridges between traditional and crypto finance.',
          'Yield Farming: Earn rewards by providing liquidity to protocols.',
          'Derivatives: Trade futures, options, and synthetic assets on-chain.'
        ]
      },
      {
        heading: 'How DeFi Lending Works',
        content: [
          'Supply side: Deposit crypto into a lending pool and earn interest (typically 2-15% APY).',
          'Borrow side: Put up collateral (often 150%+ of loan value) and borrow other assets.',
          'Interest rates adjust automatically based on supply and demand.',
          'No credit checks, no applications - purely algorithmic.',
          'Example: Deposit $10,000 USDC on Aave, earn ~4% APY, withdraw anytime.'
        ]
      },
      {
        heading: 'Understanding Yield Farming',
        content: [
          'Yield farming means providing liquidity to DeFi protocols in exchange for rewards.',
          'Rewards come from trading fees + protocol tokens.',
          'Higher yields = higher risk. 50%+ APY often comes with significant risks.',
          'Impermanent loss: When you provide liquidity, price changes can result in losses compared to just holding.',
          'Start conservative with blue-chip pools (ETH/USDC) before chasing high-yield exotic pairs.'
        ]
      },
      {
        heading: 'DeFi Risks',
        content: [
          'Smart contract risk: Bugs in code can be exploited (hundreds of millions lost to hacks).',
          'Impermanent loss: Providing liquidity can underperform holding.',
          'Liquidation risk: If collateral value drops, your position gets liquidated.',
          'Rug pulls: New projects abandoning ship with investor funds.',
          'Regulatory uncertainty: DeFi regulations are still evolving.',
          'Gas fees: Ethereum transactions can be expensive during high demand.'
        ]
      },
      {
        heading: 'Layer 2 Solutions',
        content: [
          'Layer 2s scale Ethereum by processing transactions off-chain then settling on mainnet.',
          'Popular L2s: Arbitrum, Optimism, Polygon - same DeFi protocols, 95% lower fees.',
          'Bridge your funds from Ethereum mainnet to L2s for cheaper transactions.',
          'Most major DeFi protocols now support multiple L2s.'
        ]
      },
      {
        heading: 'Getting Started with DeFi',
        content: [
          'Step 1: Get a self-custody wallet (MetaMask recommended).',
          'Step 2: Fund it with ETH (for gas) + stablecoins like USDC.',
          'Step 3: Start conservative - lend USDC on Aave or Compound.',
          'Step 4: Explore DEXs - try swapping small amounts on Uniswap.',
          'Step 5: Learn about different protocols before investing significantly.',
          'Step 6: Use L2s to minimize gas costs.',
          'Never invest more than you can afford to lose in DeFi.'
        ]
      },
      {
        heading: 'DeFi for Economic Empowerment',
        content: [
          'Access to capital: Borrow against crypto holdings without banks.',
          'Remittances: Send money globally faster and cheaper than Western Union.',
          'Savings: Earn yields that far exceed traditional bank accounts.',
          'Entrepreneurship: Launch projects using DeFi primitives without VC funding.',
          'Financial privacy: Transact without surveillance or discrimination.',
          'The future of finance is being built now - the Black community should be at the forefront.'
        ]
      }
    ]
  },
  {
    id: '4',
    slug: 'accept-crypto-payments-business',
    title: 'Accept Crypto Payments in Your Business',
    category: 'Business',
    difficulty: 'Intermediate',
    readTime: '10 min',
    icon: 'Briefcase',
    excerpt: 'A practical guide to integrating cryptocurrency payments into your business.',
    author: 'BlackCryptoNews Business Team',
    publishedDate: '2025-02-01',
    tags: ['business', 'payments', 'merchants', 'entrepreneurship'],
    content: [
      {
        heading: 'Why Accept Crypto?',
        content: [
          'Lower fees: 1-2% vs 2.5-3.5% for credit cards.',
          'Global reach: Accept payments from anywhere without currency conversion.',
          'Fast settlement: Receive funds in minutes, not days.',
          'No chargebacks: Crypto transactions are irreversible.',
          'Attract tech-savvy customers: Show you\'re forward-thinking.',
          'Financial inclusion: Serve unbanked/underbanked customers.'
        ]
      },
      {
        heading: 'Choosing a Payment Processor',
        content: [
          'Coinbase Commerce: Easy setup, converts to cash automatically, 1% fee.',
          'BitPay: Oldest processor, supports multiple cryptos, settles next day.',
          'BTCPay Server: Self-hosted, zero fees, maximum control (technical).',
          'Strike: Lightning Network payments, instant, near-zero fees.',
          'Square/Block: Integrated with existing POS systems.',
          'Consider: fees, settlement time, supported coins, ease of integration, tax reporting tools.'
        ]
      },
      {
        heading: 'Implementation Steps',
        content: [
          '1. Choose your processor and create an account.',
          '2. Integrate payment buttons/links on your website or POS.',
          '3. Most processors offer plugins for Shopify, WooCommerce, etc.',
          '4. Decide: hold crypto or auto-convert to USD?',
          '5. Train staff on accepting crypto payments.',
          '6. Add "We Accept Bitcoin" signage.',
          '7. Announce on social media to attract crypto customers.'
        ]
      },
      {
        heading: 'Which Cryptocurrencies to Accept',
        content: [
          'Bitcoin (BTC): Most recognized, highest trust.',
          'Ethereum (ETH): Second largest, smart contract platform.',
          'Stablecoins (USDC, USDT): Price stability, no volatility risk.',
          'Lightning Network: Instant Bitcoin payments, perfect for retail.',
          'Start with Bitcoin and stablecoins, expand later based on customer demand.',
          'Most processors handle multiple currencies automatically.'
        ]
      },
      {
        heading: 'Managing Volatility',
        content: [
          'Option 1: Instant conversion to USD (eliminates price risk).',
          'Option 2: Keep a percentage in crypto for potential appreciation.',
          'Option 3: Convert only what you need for expenses, hold the rest.',
          'Use stablecoins (USDC) for zero volatility.',
          'Consider your risk tolerance and business cash flow needs.'
        ]
      },
      {
        heading: 'Tax and Accounting',
        content: [
          'Crypto payments are taxable income based on fair market value at receipt.',
          'Most processors provide transaction reports for accounting.',
          'Software like CoinTracker or TaxBit integrates with processors.',
          'Consult a crypto-savvy CPA for proper tax treatment.',
          'Keep detailed records of all crypto transactions.',
          'Sales tax still applies - calculated in USD equivalent.'
        ]
      },
      {
        heading: 'Real-World Success Stories',
        content: [
          'Small businesses accepting crypto often see 5-10% revenue boost from new customers.',
          'Black-owned businesses using crypto for international sales avoid high forex fees.',
          'Service businesses (consultants, designers) particularly benefit from instant global payments.',
          'Restaurants in crypto-friendly cities report enthusiastic customer response.',
          'E-commerce stores reduce fraud and chargeback losses.'
        ]
      },
      {
        heading: 'Customer Education',
        content: [
          'Many customers want to use crypto but don\'t know how.',
          'Provide simple instructions: "Scan QR code with crypto wallet."',
          'Offer small discounts (2-3%) for crypto payments to encourage adoption.',
          'Train staff to assist first-time crypto payers.',
          'Create FAQ page on your website about crypto payments.',
          'Consider hosting a "Crypto Night" to educate customers.'
        ]
      },
      {
        heading: 'Next Steps',
        content: [
          'Start with one processor - Coinbase Commerce is easiest for beginners.',
          'Begin with online/digital products to minimize technical complexity.',
          'Join merchant communities to learn from others\' experiences.',
          'Track crypto payment volume and customer feedback.',
          'Gradually expand crypto acceptance as you gain confidence.',
          'Consider becoming a thought leader in your industry for crypto adoption.'
        ]
      }
    ]
  }
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(guide => guide.slug === slug)
}

export function getGuidesByCategory(category: string): Guide[] {
  if (category === 'all') return guides
  return guides.filter(guide => guide.category.toLowerCase() === category.toLowerCase())
}

export function getGuidesByDifficulty(difficulty: string): Guide[] {
  return guides.filter(guide => guide.difficulty.toLowerCase() === difficulty.toLowerCase())
}
