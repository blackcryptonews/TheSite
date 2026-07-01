import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    // Fetch real news from RSS feeds
    const baseUrl = request.url.includes('localhost')
      ? 'http://localhost:3000'
      : `https://${request.headers.get('host')}`

    const rssResponse = await fetch(`${baseUrl}/api/news/rss`, {
      next: { revalidate: 600 }
    })

    if (!rssResponse.ok) {
      throw new Error('Failed to fetch RSS news')
    }

    const rssData = await rssResponse.json()
    let news = rssData.data || []

    // Filter by category if specified
    if (category && category !== 'all') {
      news = news.filter((article: any) =>
        article.category.toLowerCase() === category.toLowerCase()
      )
    }

    return NextResponse.json({
      success: true,
      data: news,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('News API error:', error)

    // Return fallback curated content on error
    return NextResponse.json({
      success: true,
      data: getFallbackNews(),
      timestamp: new Date().toISOString()
    })
  }
}

function getFallbackNews() {
  return [
    {
      id: 'fallback-1',
      title: 'Bitcoin Continues Strong Performance in Global Markets',
      summary: 'Bitcoin maintains its position as the leading cryptocurrency with increased institutional adoption and growing mainstream acceptance.',
      category: 'Market',
      readTime: '3 min',
      timeAgo: '2 hours ago',
      isAlert: false,
      source: 'Market Analysis'
    },
    {
      id: 'fallback-2',
      title: 'Security Alert: New Phishing Campaign Targets Crypto Users',
      summary: 'Cybersecurity experts warn of sophisticated phishing attacks targeting cryptocurrency wallet users. Learn how to protect yourself.',
      category: 'Security',
      readTime: '4 min',
      timeAgo: '4 hours ago',
      isAlert: true,
      source: 'Security Update'
    },
    {
      id: 'fallback-3',
      title: 'Ethereum Layer 2 Solutions Show Continued Growth',
      summary: 'Layer 2 scaling solutions on Ethereum process millions of transactions daily, significantly reducing gas fees and improving user experience.',
      category: 'Tech',
      readTime: '5 min',
      timeAgo: '6 hours ago',
      isAlert: false,
      source: 'Tech News'
    },
    {
      id: 'fallback-4',
      title: 'African Nations Lead Global Crypto Adoption',
      summary: 'Countries across Africa continue to show the highest rates of cryptocurrency adoption globally as citizens seek financial alternatives.',
      category: 'Global',
      readTime: '4 min',
      timeAgo: '8 hours ago',
      isAlert: false,
      source: 'Global Report'
    },
    {
      id: 'fallback-5',
      title: 'DeFi Platforms Introduce New Yield Strategies',
      summary: 'Major decentralized finance protocols launch innovative yield farming opportunities with enhanced security measures.',
      category: 'DeFi',
      readTime: '5 min',
      timeAgo: '10 hours ago',
      isAlert: false,
      source: 'DeFi Update'
    }
  ]
}

export const revalidate = 600 // Revalidate every 10 minutes
