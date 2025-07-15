import { NextRequest, NextResponse } from 'next/server'
import { JSDOM } from 'jsdom'
import { translateToUrdu, getPartialUrduTranslation } from '@/lib/urdu-translations-clean'
import { saveSummary } from '@/lib/supabase'
import { saveFullContent } from '@/lib/mongodb'

// Enhanced Blog Scraper with better content extraction using JSDOM
class EnhancedBlogScraper {
  private userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'

  async scrapeContent(url: string) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
        },
        signal: AbortSignal.timeout(15000), // 15 second timeout
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const html = await response.text()
      const dom = new JSDOM(html, { url })
      const document = dom.window.document

      // Remove unwanted elements
      const unwantedSelectors = [
        'script', 'style', 'nav', 'header', 'footer', 'aside', 
        '.advertisement', '.ads', '.sidebar', '.menu',
        '.social-share', '.comments', '.related-posts',
        '[class*="ad"]', '[id*="ad"]'
      ]
      
      unwantedSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove())
      })

      // Extract title
      const title = this.extractTitle(document)

      // Extract main content
      const content = this.extractMainContent(document)

      // Extract metadata
      const images = this.extractImages(document, url)
      const links = this.extractLinks(document, url)

      return {
        success: true,
        url,
        title,
        content: this.cleanText(content),
        html_content: html,
        images,
        links,
        metadata: {
          scraped_at: new Date(),
          word_count: content.split(/\s+/).length,
          char_count: content.length,
          content_type: response.headers.get('content-type') || 'text/html',
          user_agent: this.userAgent
        }
      }
    } catch (error) {
      console.error('Scraping error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to scrape the webpage. Please check your internet connection and try again.'
      }
    }
  }

  private extractTitle(document: Document): string {
    // Try multiple title extraction methods
    const selectors = [
      'h1[class*="title"]',
      'h1[class*="headline"]', 
      'h1[class*="header"]',
      '.post-title h1',
      '.entry-title',
      '.article-title',
      'h1',
      'title'
    ]

    for (const selector of selectors) {
      const element = document.querySelector(selector)
      if (element?.textContent?.trim()) {
        return element.textContent.trim()
      }
    }

    return 'Untitled Article'
  }

  private extractMainContent(document: Document): string {
    // Try to find main content
    const contentSelectors = [
      '[role="main"]',
      'main',
      '.post-content',
      '.entry-content', 
      '.article-content',
      '.content',
      '.post-body',
      '.article-body',
      'article',
      '.story-body'
    ]

    for (const selector of contentSelectors) {
      const element = document.querySelector(selector)
      if (element?.textContent?.trim() && element.textContent.trim().length > 200) {
        return element.textContent.trim()
      }
    }

    // Fallback: extract from body
    const bodyText = document.body?.textContent || ''
    return bodyText.trim()
  }

  private extractImages(document: Document, baseUrl: string): string[] {
    const images: string[] = []
    const imgElements = document.querySelectorAll('img[src]')
    
    imgElements.forEach(img => {
      const src = img.getAttribute('src')
      if (src) {
        try {
          const imageUrl = new URL(src, baseUrl).href
          if (imageUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            images.push(imageUrl)
          }
        } catch (e) {
          // Invalid URL, skip
        }
      }
    })

    return Array.from(new Set(images)).slice(0, 10) // Unique images, limit to 10
  }

  private extractLinks(document: Document, baseUrl: string): string[] {
    const links: string[] = []
    const linkElements = document.querySelectorAll('a[href]')
    
    linkElements.forEach(link => {
      const href = link.getAttribute('href')
      if (href && !href.startsWith('#') && !href.startsWith('mailto:')) {
        try {
          const linkUrl = new URL(href, baseUrl).href
          links.push(linkUrl)
        } catch (e) {
          // Invalid URL, skip
        }
      }
    })

    return Array.from(new Set(links)).slice(0, 20) // Unique links, limit to 20
  }

  private cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim()
  }
}

// AI-powered blog summarizer with intelligent content analysis
class IntelligentSummarizer {
  generateSummary(title: string, content: string) {
    try {
      // Clean and prepare content
      const cleanContent = this.preprocessContent(content)
      const sentences = this.extractSentences(cleanContent)
      
      if (sentences.length < 3) {
        return {
          success: false,
          error: 'Content too short',
          message: 'The article content is too short to generate a meaningful summary.'
        }
      }

      // Extract key information
      const keywords = this.extractKeywords(cleanContent)
      const keyPoints = this.extractKeyPoints(sentences)
      
      // Generate English summary
      const summaryEnglish = this.generateEnglishSummary(title, sentences, keyPoints)
      
      // Translate to Urdu
      const summaryUrdu = translateToUrdu(summaryEnglish)
      
      // Calculate metrics
      const originalLength = cleanContent.split(/\s+/).length
      const summaryLength = summaryEnglish.split(/\s+/).length
      const compressionRatio = summaryLength / originalLength

      return {
        success: true,
        summary_english: summaryEnglish,
        summary_urdu: summaryUrdu,
        keywords,
        key_points: keyPoints,
        original_length: originalLength,
        summary_length: summaryLength,
        compression_ratio: Number(compressionRatio.toFixed(3))
      }
    } catch (error) {
      console.error('Summarization error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to generate summary. Please try again.'
      }
    }
  }

  private preprocessContent(content: string): string {
    return content
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s.,!?;:-]/g, '')
      .trim()
  }

  private extractSentences(content: string): string[] {
    return content
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.split(/\s+/).length > 5)
      .slice(0, 50) // Limit for processing
  }

  private extractKeywords(content: string): string[] {
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 4)

    const stopWords = new Set([
      'the', 'and', 'that', 'have', 'for', 'not', 'with', 'you', 'this', 'but',
      'his', 'from', 'they', 'she', 'her', 'been', 'than', 'its', 'were', 'said',
      'each', 'which', 'their', 'time', 'will', 'about', 'would', 'there', 'could',
      'other', 'after', 'first', 'well', 'water', 'very', 'what', 'know', 'get',
      'through', 'back', 'much', 'before', 'good', 'new', 'write', 'where', 'being',
      'here', 'how', 'when', 'many', 'some', 'come', 'made', 'most', 'over', 'such'
    ])

    const wordFreq = new Map<string, number>()
    
    words.forEach(word => {
      if (!stopWords.has(word) && word.length > 4) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1)
      }
    })

    return Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word]) => word)
  }

  private extractKeyPoints(sentences: string[]): string[] {
    // Score sentences based on various factors
    const scoredSentences = sentences.map(sentence => {
      let score = 0
      
      // Length factor (prefer medium-length sentences)
      const wordCount = sentence.split(/\s+/).length
      if (wordCount >= 10 && wordCount <= 25) score += 2
      
      // Position factor (first and last sentences are important)
      const index = sentences.indexOf(sentence)
      if (index < 3 || index >= sentences.length - 3) score += 1
      
      // Keyword presence
      const lowercaseSentence = sentence.toLowerCase()
      if (lowercaseSentence.includes('important') || 
          lowercaseSentence.includes('significant') ||
          lowercaseSentence.includes('key') ||
          lowercaseSentence.includes('main') ||
          lowercaseSentence.includes('research') ||
          lowercaseSentence.includes('study') ||
          lowercaseSentence.includes('result')) {
        score += 2
      }
      
      return { sentence, score }
    })

    return scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => `• ${item.sentence.trim()}`)
  }

  private generateEnglishSummary(title: string, sentences: string[], keyPoints: string[]): string {
    // Select the most important sentences for summary
    const importantSentences = sentences.slice(0, 3)
    
    let summary = `This article discusses ${title.toLowerCase()}. `
    
    if (importantSentences.length > 0) {
      summary += importantSentences[0] + ' '
    }
    
    if (importantSentences.length > 1) {
      summary += importantSentences[1] + ' '
    }
    
    // Add conclusion if available
    if (sentences.length > 5) {
      const lastSentences = sentences.slice(-2)
      if (lastSentences.length > 0) {
        summary += lastSentences[0]
      }
    }

    return summary.trim()
  }
}

// Main API handler
export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    const scraper = new EnhancedBlogScraper()
    const summarizer = new IntelligentSummarizer()

    // Step 1: Scrape content
    const scrapeResult = await scraper.scrapeContent(url)
    
    if (!scrapeResult.success) {
      return NextResponse.json(scrapeResult, { status: 400 })
    }

    // Step 2: Generate summary
    const summaryResult = summarizer.generateSummary(
      scrapeResult.title || '',
      scrapeResult.content || ''
    )

    if (!summaryResult.success) {
      return NextResponse.json(summaryResult, { status: 500 })
    }

    // Step 3: Save to databases (optional - only if environment variables are configured)
    try {
      if (saveSummary && process.env.SUPABASE_ANON_KEY) {
        // Save summary to Supabase
        const blogSummary = {
          url: scrapeResult.url || '',
          title: scrapeResult.title || '',
          summary_english: summaryResult.summary_english || '',
          summary_urdu: summaryResult.summary_urdu || '',
          keywords: summaryResult.keywords || [],
          key_points: summaryResult.key_points || [],
          word_count: summaryResult.original_length || 0,
          summary_length: summaryResult.summary_length || 0,
          compression_ratio: summaryResult.compression_ratio || 0
        }

        const supabaseResult = await saveSummary(blogSummary)
        console.log('Supabase storage successful:', supabaseResult)
      }

      if (saveFullContent && process.env.MONGODB_URI) {
        // Save full content to MongoDB
        const blogContent = {
          url: scrapeResult.url || '',
          title: scrapeResult.title || '',
          content: scrapeResult.content || '',
          metadata: scrapeResult.metadata || {
            scraped_at: new Date(),
            word_count: 0,
            char_count: 0,
            content_type: 'unknown',
            user_agent: 'Blog Summarizer'
          },
          html_content: scrapeResult.html_content,
          images: scrapeResult.images,
          links: scrapeResult.links
        }

        const mongoResult = await saveFullContent(blogContent)
        console.log('MongoDB storage successful:', mongoResult)
      }
    } catch (dbError) {
      console.error('Database storage error:', dbError)
      // Continue with response even if database storage fails
    }

    // Step 4: Return comprehensive response
    return NextResponse.json({
      success: true,
      data: {
        url: scrapeResult.url,
        title: scrapeResult.title,
        summary_english: summaryResult.summary_english,
        summary_urdu: summaryResult.summary_urdu,
        keywords: summaryResult.keywords,
        key_points: summaryResult.key_points,
        metadata: {
          word_count: summaryResult.original_length,
          summary_length: summaryResult.summary_length,
          compression_ratio: summaryResult.compression_ratio,
          images_found: scrapeResult.images?.length || 0,
          links_found: scrapeResult.links?.length || 0,
          scraped_at: new Date().toISOString()
        }
      }
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error',
        message: 'An unexpected error occurred. Please try again.'
      },
      { status: 500 }
    )
  }
}
