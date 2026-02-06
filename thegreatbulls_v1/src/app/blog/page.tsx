import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, TrendingUp, BookOpen } from 'lucide-react'
import { Navbar } from '@/components/Navbar'

// Mock data
const blogPosts = [
  {
    id: 1,
    title: 'Pre-Market Report: Nifty 50 Key Levels for Today',
    excerpt: 'Today\'s Nifty 50 analysis shows critical support at 21,800 and resistance at 22,200. BankNifty holding above 47,500 with IT stocks leading the momentum. FII data shows net buying of ₹1,200 crores.',
    readTime: 5,
    date: '2026-02-03',
    category: 'Pre-Market',
    tags: ['Nifty 50', 'Technical Analysis', 'FII Data'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'Iron Condor Strategy: ₹25,000 Monthly Income Blueprint',
    excerpt: 'Complete step-by-step guide to implementing Iron Condor on Nifty options. Learn position sizing, risk management, and how to consistently generate ₹25k+ monthly through theta decay.',
    readTime: 12,
    date: '2026-02-02',
    category: 'Strategy',
    tags: ['Options', 'Iron Condor', 'Monthly Income'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop'
  },
  {
    id: 3,
    title: 'BankNifty Monthly Expiry: Last 7 Days Power Strategy',
    excerpt: 'Master the final week of monthly expiry trading. Learn gamma effects, time decay acceleration, and how institutional players position for maximum returns.',
    readTime: 8,
    date: '2026-02-01',
    category: 'Strategy',
    tags: ['BankNifty', 'Expiry Trading', 'Gamma Effects'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=200&fit=crop'
  },
  {
    id: 4,
    title: 'Weekly Market Outlook: Nifty 22,500 Target Analysis',
    excerpt: 'Comprehensive weekly analysis of Nifty 50 with key levels, sector rotation, and trading opportunities. Banking and IT sectors showing strength for next week.',
    readTime: 6,
    date: '2026-01-31',
    category: 'Analysis',
    tags: ['Weekly Outlook', 'Sector Analysis', 'Trading Opportunities'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=200&fit=crop'
  },
  {
    id: 5,
    title: 'Straddle Strategy: Profit from High Volatility Events',
    excerpt: 'When and how to use Long Straddle strategy during earnings, elections, and major economic events. Risk management and position sizing included.',
    readTime: 10,
    date: '2026-01-30',
    category: 'Strategy',
    tags: ['Options', 'Straddle', 'Volatility Trading'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop'
  },
  {
    id: 6,
    title: 'Price Action Trading: Demand-Supply Zones Mastery',
    excerpt: 'Learn to identify institutional order flow through price action. Master demand-supply zones, liquidity concepts, and trade with the smart money.',
    readTime: 15,
    date: '2026-01-29',
    category: 'Education',
    tags: ['Price Action', 'Order Flow', 'Institutional Trading'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop'
  },
  {
    id: 7,
    title: 'Nifty Intraday Scalping: 5-Point Blueprint',
    excerpt: 'Professional intraday scalping system for Nifty futures. Entry timing, risk management, and profit booking techniques used by full-time traders.',
    readTime: 9,
    date: '2026-01-28',
    category: 'Strategy',
    tags: ['Intraday', 'Scalping', 'Nifty Futures'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=200&fit=crop'
  },
  {
    id: 8,
    title: 'Options Greeks: Delta, Theta, Vega Practical Application',
    excerpt: 'Understanding options Greeks is crucial for successful options trading. Learn how Delta, Theta, and Vega affect your positions and profitability.',
    readTime: 11,
    date: '2026-01-27',
    category: 'Education',
    tags: ['Options Greeks', 'Delta', 'Theta', 'Vega'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop'
  }
]

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-slate-900 py-16 px-4">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Market Insights & Trading Strategies</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Daily pre-market reports, in-depth strategy analysis, and educational content
            to help you master the Indian stock market.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-8 text-slate-900">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <Badge className="bg-slate-800 text-yellow-400 mb-4">Featured • Pre-Market Report</Badge>
                  <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-lg mb-6 opacity-90">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm mb-6">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime} min read
                    </div>
                  </div>
                  <Button size="lg" className="bg-slate-900 text-yellow-400 hover:bg-slate-800">
                    <Link href={`/blog/${featuredPost.id}`}>Read Full Report</Link>
                  </Button>
                </div>
                <div className="lg:w-96">
                  <div className="bg-slate-800 rounded-lg p-6 text-yellow-400">
                    <h3 className="font-bold mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Today's Key Levels
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>Nifty Support: 21,800</div>
                      <div>Nifty Resistance: 22,200</div>
                      <div>BankNifty Support: 47,500</div>
                      <div>BankNifty Resistance: 48,200</div>
                      <div className="pt-2 border-t border-slate-700">FII Buying: ₹1,200 Cr</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Latest Articles</h2>
            <div className="flex gap-2">
              <Badge variant="outline" className="border-yellow-400 text-yellow-400">All Posts</Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-400">Strategy</Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-400">Analysis</Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-400">Education</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="bg-slate-800 border-slate-700 text-white overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-yellow-400" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-yellow-400 text-slate-900 text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-slate-400">{post.date}</span>
                  </div>
                  <CardTitle className="text-yellow-400 text-lg leading-tight">{post.title}</CardTitle>
                  <CardDescription className="text-slate-300 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-slate-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime} min read
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="border-slate-600 text-slate-400 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900">
                    <Link href={`/blog/${post.id}`}>Read Article</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-slate-800 rounded-lg p-8 border border-slate-700 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get Daily Market Insights</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and receive daily pre-market reports, key levels, and trading opportunities
            directly in your inbox every morning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded border border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
            />
            <Button className="bg-yellow-400 text-slate-900 hover:bg-yellow-500 whitespace-nowrap">
              Subscribe Free
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}