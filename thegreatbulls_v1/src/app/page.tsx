'use client'

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Users, Award, Star, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-red-500/20"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent leading-tight">
              Master the Markets.<br />Build Real Wealth.
            </h1>
            <p className="text-xl md:text-3xl mb-8 text-slate-300 max-w-4xl mx-auto font-light">
              Practical Options & Price Action Training | 85%+ Traders Profitable in 90 Days | Trained 50,000+
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:from-yellow-500 hover:to-orange-600 px-8 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-yellow-400/25 transform hover:scale-105 transition-all duration-300">
              <Link href="/webinars" className="flex items-center">
                Join Free Live Trading Room
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 px-8 py-6 text-xl font-bold rounded-full backdrop-blur-sm bg-slate-900/50 hover:shadow-yellow-400/25 transform hover:scale-105 transition-all duration-300">
              <Link href="/courses" className="flex items-center">
                View Courses (Save ₹10,000 Today)
                <TrendingUp className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <p className="text-slate-400 mb-6 text-lg">As seen in</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[
                { name: "Zerodha", logo: "🟡" },
                { name: "NSE", logo: "🇮🇳" },
                { name: "Moneycontrol", logo: "📈" },
                { name: "Economic Times", logo: "📰" }
              ].map((brand, index) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-4xl"
                  title={brand.name}
                >
                  {brand.logo}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: "50,000+", label: "Traders Trained", icon: Users },
              { number: "85%+", label: "Success Rate", icon: TrendingUp },
              { number: "₹2.1 Cr+", label: "Community Profits", icon: Award },
              { number: "90 Days", label: "To First Profits", icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-400 mb-1">{stat.number}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* USPs Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Why Choose The Great Bulls?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-yellow-400">Practical Price Action Mastery</CardTitle>
                <CardDescription className="text-slate-300">
                  Learn demand-supply zones, support-resistance, and institutional order flow. Master Nifty & BankNifty setups with 1:3 risk-reward ratios.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-yellow-400">Options Strategy Builder</CardTitle>
                <CardDescription className="text-slate-300">
                  Iron Condor, Straddle, Spread strategies. Learn expiry trading, theta decay, and volatility harvesting for consistent monthly income.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-yellow-400">Live Market Edge</CardTitle>
                <CardDescription className="text-slate-300">
                  Real-time Nifty analysis, pre-market reports, and live trading room. Trade alongside mentors with proven track records.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-yellow-400">Risk Management First</CardTitle>
                <CardDescription className="text-slate-300">
                  Position sizing, stop-loss discipline, and psychological resilience. Learn to protect capital while maximizing returns.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-yellow-400">Community & Mentorship</CardTitle>
                <CardDescription className="text-slate-300">
                  Join 50,000+ traders. Get personalized guidance, strategy discussions, and continuous learning support.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Teaser */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Real Results from Real Traders</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-white">
              <div className="text-yellow-400 text-6xl mb-4">"</div>
              <p className="text-lg mb-4">Doubled my capital in 4 months using Price Action strategies. ₹1.2 lakh profit in one expiry!</p>
              <p className="font-semibold">- Rajesh Kumar, Mumbai</p>
            </div>
            <div className="text-white">
              <div className="text-yellow-400 text-6xl mb-4">"</div>
              <p className="text-lg mb-4">Consistent ₹50k+ monthly income through Options selling. Risk management changed everything.</p>
              <p className="font-semibold">- Priya Sharma, Delhi</p>
            </div>
            <div className="text-white">
              <div className="text-yellow-400 text-6xl mb-4">"</div>
              <p className="text-lg mb-4">From losses to profits in 90 days. BankNifty intraday strategies are pure gold.</p>
              <p className="font-semibold">- Amit Patel, Ahmedabad</p>
            </div>
          </div>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
            <Link href="/testimonials">Read More Success Stories</Link>
          </Button>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Daily Market Insights</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-yellow-400">Pre-Market Report: Nifty 50 Key Levels</CardTitle>
                <CardDescription className="text-slate-300">
                  Today's support at 21,800, resistance at 22,200. BankNifty showing strength above 47,500. Key watch: IT and Banking stocks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900">
                  <Link href="/blog">Read Full Report</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-yellow-400">Iron Condor Strategy: ₹25k Monthly Income</CardTitle>
                <CardDescription className="text-slate-300">
                  Step-by-step guide to implementing Iron Condor on Nifty options. Risk management and position sizing included.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900">
                  <Link href="/blog">Learn Strategy</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
