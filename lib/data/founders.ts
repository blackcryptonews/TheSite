export interface Founder {
  id: string
  name: string
  initials: string
  project: string
  location: string
  mission: string
  description: string
  stage: 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Growth'
  raised: string
  website: string
  twitter: string
  founded: string
  team: number
  category: string
  featured: boolean
}

export const founders: Founder[] = [
  {
    id: '1',
    name: 'Jamila Chen',
    initials: 'JC',
    project: 'AfriChain Finance',
    location: 'Lagos, Nigeria',
    mission: 'Building DeFi infrastructure for African entrepreneurs',
    description: 'AfriChain connects small businesses across Africa to decentralized lending pools, providing access to capital without traditional banking barriers. The platform has facilitated over $50M in loans to 10,000+ businesses.',
    stage: 'Series A',
    raised: '$12M',
    website: '#',
    twitter: '#',
    founded: '2022',
    team: 28,
    category: 'DeFi',
    featured: true
  },
  {
    id: '2',
    name: 'Marcus Thompson',
    initials: 'MT',
    project: 'ChainWallet',
    location: 'Atlanta, USA',
    mission: 'Making crypto custody accessible for the everyday user',
    description: 'ChainWallet is a mobile-first self-custody wallet with built-in education and social recovery features. Designed specifically for newcomers to crypto, with over 500K downloads and partnerships with major exchanges.',
    stage: 'Seed',
    raised: '$4.5M',
    website: '#',
    twitter: '#',
    founded: '2023',
    team: 12,
    category: 'Infrastructure',
    featured: true
  },
  {
    id: '3',
    name: 'Aisha Williams',
    initials: 'AW',
    project: 'BlackNFT Marketplace',
    location: 'London, UK',
    mission: 'Empowering Black artists through Web3 ownership',
    description: 'BlackNFT is a curated marketplace exclusively for Black artists and creators. Features zero-knowledge proofs for privacy, low-cost minting on Polygon, and has helped artists earn over $8M in primary and secondary sales.',
    stage: 'Seed',
    raised: '$3M',
    website: '#',
    twitter: '#',
    founded: '2021',
    team: 15,
    category: 'NFTs',
    featured: false
  },
  {
    id: '4',
    name: 'David Okonkwo',
    initials: 'DO',
    project: 'RemitChain',
    location: 'Accra, Ghana',
    mission: 'Reducing remittance costs for the African diaspora',
    description: 'RemitChain uses stablecoins and local partnerships to enable instant, low-cost money transfers. Processing $200M+ annually with fees 80% lower than Western Union, serving 100K+ active users.',
    stage: 'Series A',
    raised: '$8M',
    website: '#',
    twitter: '#',
    founded: '2022',
    team: 22,
    category: 'Payments',
    featured: true
  },
  {
    id: '5',
    name: 'Keisha Brown',
    initials: 'KB',
    project: 'DAO Builders Collective',
    location: 'Brooklyn, USA',
    mission: 'Teaching communities to build and govern DAOs',
    description: 'DAO Builders provides education, tools, and infrastructure for marginalized communities to launch decentralized organizations. Has helped 50+ groups establish governance structures and treasury management.',
    stage: 'Pre-Seed',
    raised: '$1.2M',
    website: '#',
    twitter: '#',
    founded: '2023',
    team: 8,
    category: 'Education',
    featured: false
  },
  {
    id: '6',
    name: 'Emmanuel Baptiste',
    initials: 'EB',
    project: 'CryptoInsure',
    location: 'Paris, France',
    mission: 'Bringing DeFi insurance to emerging markets',
    description: 'CryptoInsure offers parametric insurance products on-chain, protecting farmers and small businesses against weather and market risks. Covering $25M in insured value across 8 African countries.',
    stage: 'Seed',
    raised: '$5M',
    website: '#',
    twitter: '#',
    founded: '2022',
    team: 18,
    category: 'Insurance',
    featured: false
  },
  {
    id: '7',
    name: 'Nia Johnson',
    initials: 'NJ',
    project: 'BlockGrad',
    location: 'Washington D.C., USA',
    mission: 'Training the next generation of Black blockchain developers',
    description: 'BlockGrad runs intensive coding bootcamps focused on smart contract development, security auditing, and Web3 engineering. 500+ graduates placed at crypto companies with $80K+ starting salaries.',
    stage: 'Growth',
    raised: '$15M',
    website: '#',
    twitter: '#',
    founded: '2020',
    team: 45,
    category: 'Education',
    featured: true
  },
  {
    id: '8',
    name: 'Kwame Asante',
    initials: 'KA',
    project: 'AfroLend Protocol',
    location: 'Johannesburg, South Africa',
    mission: 'Peer-to-peer lending for African SMEs',
    description: 'AfroLend is a decentralized lending protocol connecting African small businesses with global liquidity providers. Uses on-chain credit scoring and real-world asset collateral to facilitate loans.',
    stage: 'Series A',
    raised: '$10M',
    website: '#',
    twitter: '#',
    founded: '2021',
    team: 32,
    category: 'DeFi',
    featured: true
  },
  {
    id: '9',
    name: 'Tasha Mitchell',
    initials: 'TM',
    project: 'MetaRealty',
    location: 'Miami, USA',
    mission: 'Tokenizing real estate for fractional ownership',
    description: 'MetaRealty enables fractional ownership of real estate through NFTs, making property investment accessible with as little as $100. $50M in tokenized properties across 12 markets.',
    stage: 'Seed',
    raised: '$6M',
    website: '#',
    twitter: '#',
    founded: '2023',
    team: 16,
    category: 'RWA',
    featured: false
  },
  {
    id: '10',
    name: 'Jordan Price',
    initials: 'JP',
    project: 'BlackChain Gaming',
    location: 'Los Angeles, USA',
    mission: 'Building play-to-earn games for Black gamers',
    description: 'BlackChain creates culturally relevant P2E games where players own their in-game assets. Their flagship title has 200K+ active players and distributed $5M+ in player earnings.',
    stage: 'Series A',
    raised: '$18M',
    website: '#',
    twitter: '#',
    founded: '2021',
    team: 55,
    category: 'Gaming',
    featured: true
  }
]

export function getFeaturedFounders(): Founder[] {
  return founders.filter(founder => founder.featured)
}

export function getFounderById(id: string): Founder | undefined {
  return founders.find(founder => founder.id === id)
}

export function getFoundersByCategory(category: string): Founder[] {
  if (category === 'all') return founders
  return founders.filter(founder => founder.category.toLowerCase() === category.toLowerCase())
}

export function getFoundersByStage(stage: string): Founder[] {
  return founders.filter(founder => founder.stage === stage)
}
