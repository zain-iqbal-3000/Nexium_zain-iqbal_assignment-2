#!/usr/bin/env python3
"""
Simple CLI version of the Blog Summarizer
Usage: python cli_summarizer.py <blog_url>
"""

import sys
import json
from app import BlogScraper, AISummarizer

def main():
    if len(sys.argv) != 2:
        print("Usage: python cli_summarizer.py <blog_url>")
        print("Example: python cli_summarizer.py https://example.com/blog-post")
        sys.exit(1)
    
    url = sys.argv[1]
    
    # Initialize components
    scraper = BlogScraper()
    summarizer = AISummarizer()
    
    print(f"🔄 Scraping content from: {url}")
    
    # Scrape content
    scrape_result = scraper.scrape_blog_content(url)
    
    if not scrape_result['success']:
        print(f"❌ Error: {scrape_result['error']}")
        sys.exit(1)
    
    print(f"✅ Successfully scraped content")
    print(f"📰 Title: {scrape_result['title']}")
    print(f"📊 Word count: {scrape_result['word_count']}")
    
    # Generate summary
    print(f"🤖 Generating AI summary...")
    summary_result = summarizer.generate_summary(
        scrape_result['title'], 
        scrape_result['content']
    )
    
    if not summary_result['success']:
        print(f"❌ Summarization error: {summary_result['error']}")
        sys.exit(1)
    
    # Display results
    print("\n" + "="*60)
    print("📝 BLOG SUMMARY")
    print("="*60)
    print(f"\n🏷️  Title: {scrape_result['title']}")
    print(f"🔗 URL: {url}")
    print(f"📊 Original length: {summary_result['original_length']} words")
    print(f"📊 Summary length: {summary_result['summary_length']} words")
    print(f"📊 Compression ratio: {summary_result['compression_ratio']}%")
    
    print(f"\n📖 Summary:")
    print("-" * 40)
    print(summary_result['summary'])
    
    print(f"\n🏷️  Top Keywords:")
    print("-" * 40)
    print(", ".join(summary_result['keywords'][:10]))
    
    print(f"\n💡 Key Points:")
    print("-" * 40)
    for i, point in enumerate(summary_result['key_points'][:3], 1):
        print(f"{i}. {point[:100]}{'...' if len(point) > 100 else ''}")
    
    print("\n" + "="*60)

if __name__ == "__main__":
    main()
