'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, Zap, Brain, Eye, Users, Globe2, Loader2, Copy, Check } from 'lucide-react'

const exampleUrls = [
  "https://medium.com/@pallavisinha12/understanding-llm-based-agents-and-their-multi-agent-architecture-299cf54ebae4",
  "https://www.topgear.com/car-news/electric/new-rimac-nevera-r-1914hp-electric-hypercar",
  "https://www.motortrend.com/news/mclaren-w1-2024-hypercar-first-look/",
  "https://www.caranddriver.com/news/a62529057/koenigsegg-cc850-review/",
  "https://www.roadandtrack.com/news/a46127134/lamborghini-revuelto-first-drive/"
]

export default function Home() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [summaryEnglish, setSummaryEnglish] = useState('')
  const [summaryUrdu, setSummaryUrdu] = useState('')
  const [title, setTitle] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [isUrdu, setIsUrdu] = useState(false)
  const [copied, setCopied] = useState(false)

  // Get current summary based on language
  const currentSummary = isUrdu ? summaryUrdu : summaryEnglish

  const handleSummarize = async () => {
    if (!url) return

    setIsLoading(true)
    setSummaryEnglish('')
    setSummaryUrdu('')
    setTitle('')
    setWordCount(0)

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (data.success && data.data) {
        setSummaryEnglish(data.data.summary_english || '')
        setSummaryUrdu(data.data.summary_urdu || '')
        setTitle(data.data.title || 'Untitled Article')
        setWordCount(data.data.metadata?.word_count || 0)
      } else {
        setSummaryEnglish('Error: ' + (data.error || 'Failed to summarize'))
        setSummaryUrdu('Error: ' + (data.error || 'Failed to summarize'))
      }
    } catch (error) {
      setSummaryEnglish('Error: Network request failed')
      setSummaryUrdu('Error: Network request failed')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(currentSummary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getRandomExample = () => {
    const randomUrl = exampleUrls[Math.floor(Math.random() * exampleUrls.length)]
    setUrl(randomUrl)
  }

  // Cyberpunk floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 5
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10 animate-pulse">
        <div className="w-full h-full bg-gradient-to-r from-slate-700/20 to-gray-700/20"></div>
      </div>
      
      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-slate-400 opacity-20 animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      {/* Grid Lines */}
      <div className="absolute inset-0">
        <div className="w-full h-full opacity-3 bg-gradient-to-r from-slate-600 to-gray-600" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(100,116,139,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(100,116,139,0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-gray-300 to-slate-400 mb-4 font-mono tracking-wider">
            NEXIUM
          </h1>
          <p className="text-xl text-slate-400 font-mono mb-2">BLOG SUMMARIZER PROTOCOL</p>
          <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm leading-relaxed">
            Advanced AI-powered content analysis system. Transform any blog post into concise, 
            actionable insights using quantum-enhanced natural language processing.
          </p>
        </div>

        {/* Main Interface */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Section */}
          <Card className="bg-gray-950/70 border-slate-600/40 backdrop-blur-sm shadow-2xl shadow-slate-800/30">
            <CardHeader className="border-b border-slate-600/30">
              <CardTitle className="text-2xl font-mono text-slate-300 flex items-center gap-2">
                <Globe2 className="h-6 w-6" />
                URL INPUT TERMINAL
              </CardTitle>
              <CardDescription className="text-gray-500 font-mono">
                Insert target URL for quantum content analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://example.com/blog-post"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 bg-gray-900/90 border-slate-500/40 text-slate-200 placeholder-gray-600 font-mono focus:border-slate-400 focus:ring-slate-400"
                />
                <Button
                  onClick={getRandomExample}
                  variant="outline"
                  className="border-slate-500/50 text-slate-400 hover:bg-slate-800/40 font-mono"
                >
                  SAMPLE
                </Button>
              </div>
              
              <Button
                onClick={handleSummarize}
                disabled={!url || isLoading}
                className="w-full bg-gradient-to-r from-slate-700 to-gray-700 hover:from-slate-600 hover:to-gray-600 text-white font-mono font-bold text-lg py-6 disabled:opacity-50 shadow-lg shadow-slate-700/40"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ANALYZING QUANTUM DATA...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-5 w-5" />
                    INITIALIZE NEURAL SCAN
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-gray-900/40 to-slate-900/40 border-slate-500/40 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                <h3 className="font-mono font-bold text-slate-300 mb-2">QUANTUM SPEED</h3>
                <p className="text-gray-500 text-sm font-mono">Lightning-fast AI processing with neural optimization</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-slate-900/40 to-gray-900/40 border-slate-500/40 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Eye className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                <h3 className="font-mono font-bold text-slate-300 mb-2">DEEP ANALYSIS</h3>
                <p className="text-gray-500 text-sm font-mono">Advanced content parsing with semantic understanding</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-gray-900/40 to-slate-800/40 border-slate-500/40 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                <h3 className="font-mono font-bold text-slate-300 mb-2">MULTI-LINGUAL</h3>
                <p className="text-gray-500 text-sm font-mono">Support for English and Urdu language processing</p>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          {(currentSummary || isLoading) && (
            <Card className="bg-gray-950/80 border-slate-600/40 backdrop-blur-sm shadow-2xl shadow-slate-700/30">
              <CardHeader className="border-b border-slate-600/30">
                <CardTitle className="text-2xl font-mono text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Brain className="h-6 w-6" />
                    ANALYSIS RESULTS
                  </span>
                  {currentSummary && (
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => setIsUrdu(!isUrdu)}
                        variant="outline"
                        size="sm"
                        className="border-slate-500/50 text-slate-400 hover:bg-slate-800/40 font-mono"
                      >
                        {isUrdu ? 'EN' : 'اردو'}
                      </Button>
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        size="sm"
                        className="border-slate-500/50 text-slate-400 hover:bg-slate-800/40 font-mono"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  )}
                </CardTitle>
                {title && (
                  <CardDescription className="text-gray-500 font-mono">
                    Source: {title} | Words: {wordCount.toLocaleString()}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Loader2 className="h-12 w-12 animate-spin text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400 font-mono">Processing neural pathways...</p>
                      <p className="text-gray-600 font-mono text-sm mt-2">Analysis in progress</p>
                    </div>
                  </div>
                ) : (
                  <Textarea
                    value={currentSummary}
                    readOnly
                    className="min-h-[300px] bg-gray-900/90 border-slate-600/40 text-slate-200 font-mono text-sm leading-relaxed resize-none focus:ring-slate-400"
                    placeholder="Analysis results will appear here..."
                  />
                )}
              </CardContent>
            </Card>
          )}

          {/* Sample URLs */}
          <Card className="bg-gray-950/60 border-slate-600/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-mono text-slate-400">SAMPLE TARGETS</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-2">
                {exampleUrls.map((exampleUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setUrl(exampleUrl)}
                    className="text-left p-3 rounded bg-gray-900/60 hover:bg-gray-800/60 border border-slate-600/40 hover:border-slate-500/60 transition-all font-mono text-sm text-gray-400 hover:text-slate-300"
                  >
                    {exampleUrl}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <p className="text-gray-600 font-mono text-sm">
            NEXIUM v2.0 | Enhanced Content Analysis System
          </p>
          <p className="text-gray-700 font-mono text-xs mt-2">
            Powered by Neural Language Processing | MongoDB & Supabase Integration
          </p>
        </div>
      </div>
    </div>
  )
}
