'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/lib/store'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { TrendingUp, TrendingDown, BookOpen, Target, Award, Activity, Zap } from 'lucide-react'

// Animated Counter Component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const controls = animate(count, value, { duration })
    return controls.stop
  }, [count, value, duration])

  return <motion.span>{rounded}</motion.span>
}

// Circular Progress Component
function CircularProgress({ progress, size = 80, strokeWidth = 8 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#374151"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F59E0B"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-yellow-400">{progress}%</span>
      </div>
    </div>
  )
}

// Mock data for charts
const portfolioData = [
  { date: 'Jan', value: 10000 },
  { date: 'Feb', value: 10500 },
  { date: 'Mar', value: 10200 },
  { date: 'Apr', value: 10800 },
  { date: 'May', value: 11200 },
]

const gainersLosers = [
  { symbol: 'AAPL', change: 2.5 },
  { symbol: 'GOOGL', change: -1.2 },
  { symbol: 'MSFT', change: 1.8 },
  { symbol: 'TSLA', change: -3.1 },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { watchlist, addToWatchlist, removeFromWatchlist } = useUserStore()
  const [marketData, setMarketData] = useState<{ symbol: string; price: number; change: number; changePercent: string }[]>([])
  const [searchSymbol, setSearchSymbol] = useState('')

  const fetchMarketData = useCallback(async () => {
    const symbols = ['NSE:NIFTY', 'NSE:SENSEX', 'NSE:BANKNIFTY', 'NASDAQ', 'GC=F'] // Adjust for Alpha Vantage
    const data = await Promise.all(
      symbols.map(async (symbol) => {
        try {
          const res = await fetch(`/api/stock/${symbol}`)
          return await res.json()
        } catch {
          return { symbol, price: 0, change: 0, changePercent: '0%' }
        }
      })
    )
    setMarketData(data)
  }, [])

  const hasFetchedData = useRef(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && !hasFetchedData.current) {
      hasFetchedData.current = true
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchMarketData()
    }
  }, [status, router, fetchMarketData])

  const handleSearch = async () => {
    if (searchSymbol) {
      try {
        const res = await fetch(`/api/stock/${searchSymbol}`)
        const data = await res.json()
        if (data.price) {
          addToWatchlist(searchSymbol)
          setSearchSymbol('')
        }
      } catch {
        alert('Symbol not found')
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-linear-to-r from-yellow-400 to-orange-500 rounded-lg p-8 mb-8 text-slate-900"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {session?.user?.name}!</h1>
              <p className="text-lg opacity-90 mb-4">Ready to conquer the markets today?</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                  Live Trading Room: Active
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
                  Market: Open
                </div>
                <div>Last login: Today 9:15 AM</div>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 lg:mt-0"
            >
              <div className="bg-slate-800 text-yellow-400 p-6 rounded-lg text-center shadow-lg">
                <div className="text-3xl font-bold mb-1">
                  ₹<AnimatedCounter value={245000} />
                </div>
                <div className="text-sm opacity-75">Portfolio Value</div>
                <div className="text-green-400 text-sm font-semibold flex items-center justify-center mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +₹<AnimatedCounter value={15200} /> (+6.6%)
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Market Overview - Heat Map Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-5 gap-4 mb-8"
        >
          {marketData.map((data, index) => (
            <motion.div
              key={data.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`rounded-lg border-2 transition-all duration-300 ${
                data.change >= 0
                  ? 'bg-green-900/20 border-green-500/50 hover:bg-green-900/30'
                  : 'bg-red-900/20 border-red-500/50 hover:bg-red-900/30'
              }`}
            >
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  {data.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                  )}
                  <p className="font-bold text-yellow-400">{data.symbol}</p>
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {data.symbol.includes('NIFTY') || data.symbol.includes('SENSEX') ?
                    data.price.toLocaleString('en-IN') :
                    `$${data.price.toFixed(2)}`
                  }
                </p>
                <p className={`font-semibold text-sm mb-1 ${
                  data.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {data.changePercent}
                </p>
                <p className="text-xs text-slate-400">
                  {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}
                </p>
              </CardContent>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Activity, title: 'Live Trading Room', desc: 'Join active sessions', color: 'text-green-400' },
            { icon: TrendingUp, title: 'Pre-Market Report', desc: 'Today\'s key levels', color: 'text-blue-400' },
            { icon: Target, title: 'Strategy Alerts', desc: 'New opportunities', color: 'text-yellow-400' },
            { icon: BookOpen, title: 'My Courses', desc: 'Continue learning', color: 'text-purple-400' }
          ].map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-slate-800 border-slate-700 text-white cursor-pointer hover:bg-slate-700 hover:border-yellow-400/50 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <action.icon className={`w-8 h-8 mx-auto mb-3 ${action.color} group-hover:scale-110 transition-transform`} />
                  <div className="font-semibold text-lg mb-1">{action.title}</div>
                  <div className="text-sm text-slate-400">{action.desc}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Search */}
        <div className="flex gap-2 mb-8">
          <Input
            placeholder="Search Nifty, BankNifty, or any stock symbol (e.g., RELIANCE, TCS)"
            value={searchSymbol}
            onChange={(e) => setSearchSymbol(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white"
          />
          <Button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-600">
            Add to Watchlist
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Portfolio Chart */}
          <Card className="md:col-span-2 bg-slate-800 border-slate-700 text-white">
            <CardHeader>
              <CardTitle className="text-yellow-400">Portfolio Performance</CardTitle>
              <CardDescription className="text-slate-300">Your trading journey progress</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={portfolioData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Watchlist */}
          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader>
              <CardTitle className="text-yellow-400">My Watchlist</CardTitle>
              <CardDescription className="text-slate-300">Stocks you&apos;re tracking</CardDescription>
            </CardHeader>
            <CardContent>
              {watchlist.length > 0 ? (
                <ul className="space-y-2">
                  {watchlist.map((ticker) => (
                    <li key={ticker} className="flex justify-between items-center p-2 bg-slate-700 rounded">
                      <span className="font-medium">{ticker}</span>
                      <Button variant="destructive" size="sm" onClick={() => removeFromWatchlist(ticker)}>
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-slate-400 mb-4">No stocks in watchlist yet</p>
                  <p className="text-sm text-slate-500">Search and add stocks above to start tracking</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Movers */}
          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader>
              <CardTitle className="text-yellow-400">Top Movers Today</CardTitle>
              <CardDescription className="text-slate-300">Nifty 50 gainers & losers</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={gainersLosers}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="symbol" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }}
                  />
                  <Bar dataKey="change" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* My Courses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  My Learning Journey
                </CardTitle>
                <CardDescription className="text-slate-300">Continue your education</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <CircularProgress progress={65} />
                    <div className="flex-1">
                      <div className="font-semibold text-yellow-400 mb-1">Price Action Mastery</div>
                      <div className="text-sm text-slate-400">Module 3 of 8 • 65% Complete</div>
                      <div className="text-xs text-green-400 mt-1">Next: Support-Resistance with Volume</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CircularProgress progress={25} />
                    <div className="flex-1">
                      <div className="font-semibold text-yellow-400 mb-1">Options Strategist Pro</div>
                      <div className="text-sm text-slate-400">Module 1 of 12 • 25% Complete</div>
                      <div className="text-xs text-green-400 mt-1">Next: Iron Condor Strategy</div>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      <a href="/courses">Browse All Courses</a>
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-slate-300">Your latest actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { icon: Award, color: 'bg-green-400', title: 'Completed Module 3', desc: 'Price Action Mastery • 2 hours ago' },
                    { icon: TrendingUp, color: 'bg-blue-400', title: 'Added RELIANCE to watchlist', desc: '1 hour ago' },
                    { icon: Zap, color: 'bg-yellow-400', title: 'Attended Live Webinar', desc: 'BankNifty Strategies • Yesterday' }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      className="flex items-center p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <div className={`w-2 h-2 ${activity.color} rounded-full mr-3 animate-pulse`}></div>
                      <activity.icon className="w-4 h-4 text-yellow-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium">{activity.title}</div>
                        <div className="text-xs text-slate-400">{activity.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}