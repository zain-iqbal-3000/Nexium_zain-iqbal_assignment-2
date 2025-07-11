#!/usr/bin/env python3
"""
Demo script to showcase the Blog Summarizer functionality
"""

import time
from app import BlogScraper, AISummarizer

def demo_with_sample_content():
    """Demo the summarizer with sample content when URL scraping isn't available."""
    
    print("🚀 Blog Summarizer Demo")
    print("=" * 50)
    
    # Sample blog content for demonstration
    sample_title = "The Future of Artificial Intelligence in Healthcare"
    sample_content = """
    Artificial intelligence is revolutionizing healthcare in unprecedented ways. 
    From diagnostic imaging to drug discovery, AI technologies are transforming 
    how medical professionals approach patient care and treatment.
    
    Machine learning algorithms can now analyze medical images with remarkable 
    accuracy, often detecting diseases earlier than traditional methods. 
    Computer vision systems are being used to identify cancer cells in 
    pathology slides and detect diabetic retinopathy in eye scans.
    
    Natural language processing is helping doctors extract valuable insights 
    from electronic health records. These systems can identify patterns in 
    patient data that might otherwise go unnoticed, leading to better 
    treatment outcomes and personalized medicine approaches.
    
    The pharmaceutical industry is leveraging AI for drug discovery and 
    development. AI models can predict how different compounds will interact 
    with biological targets, significantly reducing the time and cost 
    associated with bringing new medications to market.
    
    However, the integration of AI in healthcare also presents challenges. 
    Issues around data privacy, algorithmic bias, and the need for regulatory 
    approval must be carefully addressed. Healthcare professionals need 
    proper training to effectively use these new technologies.
    
    Despite these challenges, the potential benefits of AI in healthcare 
    are enormous. As technology continues to advance, we can expect to see 
    even more innovative applications that improve patient outcomes and 
    make healthcare more accessible and efficient.
    """
    
    # Initialize summarizer
    summarizer = AISummarizer()
    
    print("📝 Original Content:")
    print("-" * 30)
    print(f"Title: {sample_title}")
    print(f"Word Count: {len(sample_content.split())} words")
    print(f"Character Count: {len(sample_content)} characters")
    
    print("\n🤖 Generating AI Summary...")
    time.sleep(1)  # Simulate processing time
    
    # Generate summary
    result = summarizer.generate_summary(sample_title, sample_content, target_length=100)
    
    if result['success']:
        print("\n✅ Summary Generated Successfully!")
        print("=" * 50)
        
        print(f"\n📖 Summary ({result['summary_length']} words):")
        print("-" * 30)
        print(result['summary'])
        
        print(f"\n🏷️ Top Keywords:")
        print("-" * 30)
        print(", ".join(result['keywords'][:8]))
        
        print(f"\n💡 Key Points:")
        print("-" * 30)
        for i, point in enumerate(result['key_points'][:3], 1):
            print(f"{i}. {point[:80]}{'...' if len(point) > 80 else ''}")
        
        print(f"\n📊 Statistics:")
        print("-" * 30)
        print(f"Original Length: {result['original_length']} words")
        print(f"Summary Length: {result['summary_length']} words")
        print(f"Compression Ratio: {result['compression_ratio']}%")
        
    else:
        print(f"❌ Error: {result['error']}")

def demo_url_scraping():
    """Demo URL scraping functionality."""
    
    print("\n🌐 URL Scraping Demo")
    print("=" * 50)
    
    # Test with a simple webpage (you can replace with any accessible URL)
    test_url = "https://httpbin.org/html"  # Simple test HTML page
    
    scraper = BlogScraper()
    
    print(f"🔗 Testing URL: {test_url}")
    print("🔄 Scraping content...")
    
    result = scraper.scrape_blog_content(test_url)
    
    if result['success']:
        print("✅ Scraping successful!")
        print(f"Title: {result['title']}")
        print(f"Content length: {result['word_count']} words")
        print(f"Preview: {result['content'][:100]}...")
    else:
        print(f"❌ Scraping failed: {result['error']}")

if __name__ == "__main__":
    print("🎭 Blog Summarizer - Interactive Demo")
    print("=" * 60)
    
    # Run content demo
    demo_with_sample_content()
    
    # Optional: Test URL scraping
    print("\n" + "=" * 60)
    try:
        demo_url_scraping()
    except Exception as e:
        print(f"⚠️ URL demo skipped: {e}")
    
    print("\n" + "=" * 60)
    print("🎉 Demo Complete!")
    print("\nTo run the full application:")
    print("1. Run: python app.py")
    print("2. Open: http://localhost:5000")
    print("3. Or use CLI: python cli_summarizer.py <url>")
