"""
Simple test to verify the Blog Summarizer functionality
"""

def test_summarizer():
    """Test the summarizer with sample content."""
    
    # Import after ensuring packages are available
    try:
        from app import AISummarizer
    except ImportError as e:
        print(f"Import error: {e}")
        print("Please ensure all packages are installed: pip install flask requests beautifulsoup4 lxml")
        return False
    
    # Sample content
    title = "Understanding Machine Learning"
    content = """
    Machine learning is a subset of artificial intelligence that enables computers 
    to learn and make decisions without being explicitly programmed. It involves 
    algorithms that can identify patterns in data and make predictions or 
    classifications based on those patterns.
    
    There are three main types of machine learning: supervised learning, 
    unsupervised learning, and reinforcement learning. Supervised learning uses 
    labeled data to train models, while unsupervised learning finds patterns in 
    unlabeled data. Reinforcement learning involves agents learning through 
    interaction with an environment.
    
    Applications of machine learning are everywhere, from recommendation systems 
    to autonomous vehicles. The field continues to evolve rapidly with new 
    techniques and applications being developed constantly.
    """
    
    # Test summarizer
    summarizer = AISummarizer()
    result = summarizer.generate_summary(title, content)
    
    if result['success']:
        print("✅ Test PASSED!")
        print(f"📖 Summary: {result['summary']}")
        print(f"🏷️ Keywords: {', '.join(result['keywords'][:5])}")
        print(f"📊 Compression: {result['compression_ratio']}%")
        return True
    else:
        print(f"❌ Test FAILED: {result['error']}")
        return False

if __name__ == "__main__":
    print("🧪 Testing Blog Summarizer Components")
    print("=" * 50)
    test_summarizer()
