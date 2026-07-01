import { NextResponse } from 'next/server'
import { NewsArticle } from '@/lib/api/news'

const RSS_FEEDS = [
  { url: 'https://cointelegraph.com/rss', source: 'CoinTelegraph' },
  { url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', source: 'CoinDesk' },
  { url: 'https://decrypt.co/feed', source: 'Decrypt' },
  { url: 'https://thedefiant.io/feed', source: 'The Defiant' },
  { url: 'https://blockworks.co/feed/', source: 'Blockworks' },
  { url: 'https://bitcoinmagazine.com/.rss/full/', source: 'Bitcoin Magazine' },
  { url: 'https://ambcrypto.com/feed/', source: 'AMBCrypto' },
]

function extractText(xml: string, tag: string): string {
  // Try CDATA first
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, 'i')
  const cdataMatch = xml.match(cdataRe)
  if (cdataMatch) return cdataMatch[1].trim()

  // Try plain tag
  const plainRe = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i')
  const plainMatch = xml.match(plainRe)
  if (plainMatch) return plainMatch[1].trim()

  return ''
}

function extractLink(itemXml: string): string {
  // Try <link> tag (non-self-closing)
  const linkMatch = itemXml.match(/<link>(https?:\/\/[^<]+)<\/link>/)
  if (linkMatch) return linkMatch[1].trim()

  // Try atom:link href
  const atomMatch = itemXml.match(/<(?:atom:)?link[^>]+href="([^"]+)"/)
  if (atomMatch) return atomMatch[1].trim()

  // Try guid as URL fallback
  const guidMatch = itemXml.match(/<guid[^>]*>(https?:\/\/[^<]+)<\/guid>/)
  if (guidMatch) return guidMatch[1].trim()

  return ''
}

function extractImage(itemXml: string): string {
  // media:content
  const mediaMatch = itemXml.match(/<media:content[^>]+url="([^"]+)"/)
  if (mediaMatch) return mediaMatch[1]

  // enclosure
  const enclosureMatch = itemXml.match(/<enclosure[^>]+url="([^"]+)"/)
  if (enclosureMatch) return enclosureMatch[1]

  // og:image in content
  const imgMatch = itemXml.match(/<img[^>]+src="([^"]+)"/)
  if (imgMatch) return imgMatch[1]

  return ''
}

function categorize(title: string, description: string): { category: NewsArticle['category']; isAlert: boolean } {
  const text = (title + ' ' + description).toLowerCase()

  if (
    text.includes('hack') || text.includes('scam') || text.includes('exploit') ||
    text.includes('breach') || text.includes('phish') || text.includes('fraud') ||
    text.includes('stolen') || text.includes('attack') || text.includes('security')
  ) {
    return { category: 'Security', isAlert: true }
  }

  if (
    text.includes('defi') || text.includes('yield') || text.includes('lending') ||
    text.includes('liquidity') || text.includes('protocol') || text.includes('uniswap') ||
    text.includes('aave') || text.includes('compound') || text.includes('dex')
  ) {
    return { category: 'DeFi', isAlert: false }
  }

  if (
    text.includes('layer 2') || text.includes('l2') || text.includes('ethereum') ||
    text.includes('scaling') || text.includes('zk') || text.includes('rollup') ||
    text.includes('blockchain') || text.includes('nft') || text.includes('smart contract') ||
    text.includes('solana') || text.includes('polygon') || text.includes('arbitrum')
  ) {
    return { category: 'Tech', isAlert: false }
  }

  if (
    text.includes('africa') || text.includes('nigeria') || text.includes('kenya') ||
    text.includes('ghana') || text.includes('regulation') || text.includes('government') ||
    text.includes('adoption') || text.includes('country') || text.includes('ban') ||
    text.includes('law') || text.includes('sec') || text.includes('cftc') ||
    text.includes('caribbean') || text.includes('diaspora') || text.includes('remittance')
  ) {
    return { category: 'Global', isAlert: false }
  }

  return { category: 'Market', isAlert: false }
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min`
}

async function parseRSSFeed(feedConfig: { url: string; source: string }): Promise<NewsArticle[]> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const response = await fetch(feedConfig.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'BlackCryptoNews/1.0 (https://blackcryptonews.com; news aggregator)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        'Cache-Control': 'no-cache',
      },
      next: { revalidate: 600 },
    })

    clearTimeout(timeout)

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const xml = await response.text()
    const articles: NewsArticle[] = []

    // Match both <item> (RSS) and <entry> (Atom)
    const itemRegex = /<(?:item|entry)>([\s\S]*?)<\/(?:item|entry)>/g
    let match
    let count = 0

    while ((match = itemRegex.exec(xml)) !== null && count < 12) {
      const item = match[1]

      const title = extractText(item, 'title')
      if (!title || title.length < 10) continue

      const rawDesc = extractText(item, 'description') ||
                      extractText(item, 'summary') ||
                      extractText(item, 'content')

      const description = rawDesc
        .replace(/<[^>]*>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#8217;/g, "'")
        .replace(/&#8216;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&#038;/g, '&')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 280)

      const link = extractLink(item)
      const image = extractImage(item)

      const pubDateStr = extractText(item, 'pubDate') ||
                         extractText(item, 'published') ||
                         extractText(item, 'updated')

      const pubDate = pubDateStr ? new Date(pubDateStr) : new Date()
      const isValidDate = !isNaN(pubDate.getTime())

      const { category, isAlert } = categorize(title, description)

      articles.push({
        id: `${feedConfig.source.toLowerCase().replace(/\s/g, '-')}-${count}-${Date.now()}`,
        title: title.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").substring(0, 160),
        summary: description || 'Click to read the full story.',
        category,
        readTime: estimateReadTime(description),
        timeAgo: isValidDate ? getTimeAgo(pubDate) : 'Recently',
        isAlert,
        url: link || feedConfig.url,
        source: feedConfig.source,
        image: image || undefined,
      })

      count++
    }

    return articles
  } catch (error) {
    console.error(`[BCN] RSS fetch failed for ${feedConfig.source}:`, error instanceof Error ? error.message : error)
    return []
  }
}

export async function GET() {
  try {
    // Fetch all feeds in parallel with graceful degradation
    const results = await Promise.allSettled(
      RSS_FEEDS.map(feed => parseRSSFeed(feed))
    )

    const allArticles: NewsArticle[] = []
    let successCount = 0

    results.forEach(result => {
      if (result.status === 'fulfilled' && result.value.length > 0) {
        allArticles.push(...result.value)
        successCount++
      }
    })

    console.log(`[BCN] RSS: ${successCount}/${RSS_FEEDS.length} feeds OK, ${allArticles.length} articles`)

    // Sort: alerts first, then by recency (most recent first)
    allArticles.sort((a, b) => {
      if (a.isAlert && !b.isAlert) return -1
      if (!a.isAlert && b.isAlert) return 1
      return 0
    })

    // Deduplicate by title similarity
    const seen = new Set<string>()
    const deduped = allArticles.filter(article => {
      const key = article.title.substring(0, 60).toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    const finalArticles = deduped.slice(0, 20)

    // If we got nothing, return error so caller uses fallback
    if (finalArticles.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No articles fetched', timestamp: new Date().toISOString() },
        { status: 503 }
      )
    }

    return NextResponse.json({
      success: true,
      data: finalArticles,
      meta: { sources: successCount, total: finalArticles.length },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[BCN] RSS aggregation error:', error)
    return NextResponse.json(
      { success: false, error: 'Aggregation failed', timestamp: new Date().toISOString() },
      { status: 500 }
    )
  }
}

export const revalidate = 600
