'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Clock, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const { data: session } = useSession()
  const [marketData, setMarketData] = useState([
    { symbol: 'NIFTY 50', price: '21,847.50', change: '+0.85%', isPositive: true },
    { symbol: 'BANKNIFTY', price: '47,123.80', change: '-0.32%', isPositive: false },
    { symbol: 'SENSEX', price: '71,234.56', change: '+0.67%', isPositive: true }
  ])
  const [showBanner, setShowBanner] = useState(true)

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: (parseFloat(item.price.replace(',', '')) + (Math.random() - 0.5) * 10).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        change: `${(Math.random() - 0.5) * 2 > 0 ? '+' : ''}${(Math.random() * 2).toFixed(2)}%`,
        isPositive: Math.random() > 0.5
      })))
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Limited Time Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 relative overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Early Bird Offer – Flat 30% off till 15th Feb | Only 47 seats left</span>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-slate-700 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Market Ticker */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
            {marketData.map((item, index) => (
              <motion.div
                key={item.symbol}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2 text-sm whitespace-nowrap"
              >
                <span className="text-slate-400 font-medium">{item.symbol}</span>
                <span className="text-white font-semibold">{item.price}</span>
                <div className={`flex items-center space-x-1 ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {item.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span className="font-medium">{item.change}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center group">
                <motion.span
                  className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  The Great Bulls
                </motion.span>
              </Link>

              <div className="hidden md:ml-10 md:flex md:space-x-8">
                {[
                  { href: '/courses', label: 'Courses' },
                  { href: '/webinars', label: 'Live Sessions' },
                  { href: '/blog', label: 'Market Insights' },
                  { href: '/testimonials', label: 'Success Stories' }
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative text-slate-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors group"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      className="text-slate-300 hover:text-yellow-400 hover:bg-slate-800"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  {session.user.role === 'admin' && (
                    <Link href="/admin">
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-yellow-400 hover:bg-slate-800"
                      >
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={() => signOut()}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-slate-300 hover:text-yellow-400 hover:bg-slate-800"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:from-yellow-500 hover:to-orange-600 font-semibold">
                      Join Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}