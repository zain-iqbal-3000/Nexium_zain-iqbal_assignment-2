// Demo supercar content for testing
export const supercarDemo = {
  url: 'https://demo.supercar-news.com/ferrari-f80-hypercar',
  title: 'Ferrari F80 Hypercar: The Ultimate 1,200HP Beast',
  content: `
Ferrari has unveiled its latest masterpiece, the F80 hypercar, featuring an incredible 1,200 horsepower hybrid powertrain. This automotive marvel represents the pinnacle of Ferrari's engineering excellence and racing heritage.

The Ferrari F80 combines a twin-turbocharged V8 engine with cutting-edge electric motors to deliver unparalleled performance. The hybrid system produces a combined output of 1,200 horsepower, making it one of the most powerful road-legal Ferraris ever created.

Key features of the F80 include advanced aerodynamics with active elements, carbon fiber construction throughout, and state-of-the-art suspension technology. The car can accelerate from 0-60 mph in just 2.3 seconds and reach a top speed of over 220 mph.

The interior showcases Ferrari's commitment to luxury and performance, featuring premium materials, advanced telemetry systems, and racing-inspired design elements. Only 799 units will be produced, making it an extremely exclusive addition to Ferrari's lineup.

Performance specifications include torque vectoring, advanced traction control, and multiple driving modes optimized for different conditions. The F80 represents Ferrari's vision for the future of high-performance automotive technology.

This hypercar continues Ferrari's tradition of creating vehicles that push the boundaries of automotive engineering while maintaining the soul and passion that defines the brand.
  `,
  metadata: {
    scraped_at: new Date(),
    word_count: 195,
    char_count: 1456,
    content_type: 'text/html',
    user_agent: 'Blog Summarizer Demo'
  }
}

// Function to test the summarizer with demo content
export async function testSupercarSummarizer() {
  try {
    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: supercarDemo.url }),
    })

    if (response.ok) {
      const result = await response.json()
      console.log('✅ Supercar Summarizer Test Successful!')
      console.log('📄 Title:', result.data.title)
      console.log('🔑 Keywords:', result.data.keywords)
      console.log('🚗 English Summary:', result.data.summary_english.substring(0, 100) + '...')
      console.log('🌐 Urdu Summary:', result.data.summary_urdu.substring(0, 100) + '...')
      return result
    } else {
      console.error('❌ Test failed:', response.status)
      return null
    }
  } catch (error) {
    console.error('❌ Test error:', error.message)
    return null
  }
}
