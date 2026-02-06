'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, TrendingUp, Award, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'

// Mock data with powerful results
const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Mumbai',
    image: 'https://i.pravatar.cc/150?img=1',
    videoThumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop',
    quote: 'Doubled my capital in 4 months using Price Action strategies. ₹1.2 lakh profit in one expiry through Nifty options. The demand-supply zone concept changed everything for me.',
    results: '₹8 lakh → ₹16 lakh in 4 months',
    strategy: 'Price Action + Options',
    joined: 'March 2025',
    rating: 5,
    verified: true,
    beforeAfter: {
      before: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=150&fit=crop',
      after: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=200&h=150&fit=crop'
    }
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Delhi',
    image: 'https://i.pravatar.cc/150?img=2',
    videoThumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    quote: 'Consistent ₹50k+ monthly income through Options selling. Risk management techniques saved me during market crashes. Now I trade with complete confidence.',
    results: '₹25k monthly average income',
    strategy: 'Iron Condor + Risk Management',
    joined: 'January 2025',
    rating: 5,
    verified: true,
    beforeAfter: {
      before: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=150&fit=crop',
      after: 'https://images.unsplash.com/photo-1579621970584-e8cc81e91bd3?w=200&h=150&fit=crop'
    }
  },
  {
    id: 3,
    name: 'Amit Patel',
    location: 'Ahmedabad',
    image: 'https://i.pravatar.cc/150?img=3',
    videoThumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=300&h=200&fit=crop',
    quote: 'From losses to profits in 90 days. BankNifty intraday strategies are pure gold. ₹75,000 profit in my first month of profitable trading.',
    results: 'First profitable month: ₹75k',
    strategy: 'BankNifty Intraday',
    joined: 'April 2025',
    rating: 5,
    verified: true,
    beforeAfter: {
      before: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=150&fit=crop',
      after: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=200&h=150&fit=crop'
    }
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    location: 'Hyderabad',
    image: 'https://i.pravatar.cc/150?img=4',
    videoThumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=200&fit=crop',
    quote: 'Theta decay is my new best friend. ₹35k monthly from Iron Condor positions. The live trading room support is incredible - instant feedback on every trade.',
    results: '₹35k monthly passive income',
    strategy: 'Monthly Iron Condor',
    joined: 'February 2025',
    rating: 5,
    verified: true,
    beforeAfter: {
      before: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=150&fit=crop',
      after: 'https://images.unsplash.com/photo-1579621970584-e8cc81e91bd3?w=200&h=150&fit=crop'
    }
  },
  {
    id: 5,
    name: 'Vikram Singh',
    location: 'Pune',
    image: 'https://i.pravatar.cc/150?img=5',
    videoThumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300&h=200&fit=crop',
    quote: 'Straddle strategy during volatile markets gave me ₹2.1 lakh in one week. The psychology module helped me control emotions and stick to the plan.',
    results: '₹2.1 lakh in one volatile week',
    strategy: 'Long Straddle',
    joined: 'December 2024',
    rating: 5,
    verified: true,
    beforeAfter: {
      before: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=150&fit=crop',
      after: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=200&h=150&fit=crop'
    }
  }
]

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="min-h-screen bg-slate-900 py-16 px-4">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-white mb-6"
          >
            Real Results from Real Traders
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto mb-8"
          >
            Join 50,000+ successful traders who have transformed their financial lives.
            These are verified results from our community members.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center items-center gap-8 mb-8"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">85%+</div>
              <div className="text-slate-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">₹50k+</div>
              <div className="text-slate-400">Avg Monthly Income</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">90 Days</div>
              <div className="text-slate-400">To First Profits</div>
            </div>
          </motion.div>
        </div>

        {/* Video Testimonial Carousel */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Card className="bg-slate-800 border-slate-700 text-white overflow-hidden">
                  <div className="relative">
                    <img
                      src={currentTestimonial.videoThumbnail}
                      alt={`${currentTestimonial.name}'s testimonial`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-yellow-400 text-slate-900 p-4 rounded-full shadow-lg"
                      >
                        <Play className="w-8 h-8" />
                      </motion.button>
                    </div>
                    {currentTestimonial.verified && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-600 text-white">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-8">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="text-yellow-400 text-4xl mb-4">"</div>
                    <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                      {currentTestimonial.quote}
                    </p>

                    {/* Before/After Screenshots */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <img
                          src={currentTestimonial.beforeAfter.before}
                          alt="Before results"
                          className="w-full h-24 object-cover rounded-lg mb-2"
                        />
                        <div className="text-xs text-slate-400">BEFORE</div>
                      </div>
                      <div className="text-center">
                        <img
                          src={currentTestimonial.beforeAfter.after}
                          alt="After results"
                          className="w-full h-24 object-cover rounded-lg mb-2"
                        />
                        <div className="text-xs text-slate-400">AFTER</div>
                      </div>
                    </div>

                    {/* Results Highlight */}
                    <div className="bg-slate-700 rounded-lg p-4 mb-6">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-green-400 font-semibold">Key Result:</span>
                      </div>
                      <div className="text-yellow-400 font-bold text-lg">{currentTestimonial.results}</div>
                      <div className="text-slate-400 text-sm">{currentTestimonial.strategy}</div>
                    </div>

                    {/* Profile */}
                    <div className="flex items-center">
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        className="w-12 h-12 rounded-full mr-4 border-2 border-yellow-400"
                      />
                      <div>
                        <div className="font-semibold text-yellow-400">{currentTestimonial.name}</div>
                        <div className="text-slate-400 text-sm">{currentTestimonial.location}</div>
                        <div className="text-slate-500 text-xs">Joined {currentTestimonial.joined}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevTestimonial}
                className="p-3 bg-slate-800 hover:bg-slate-700 text-yellow-400 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-yellow-400' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextTestimonial}
                className="p-3 bg-slate-800 hover:bg-slate-700 text-yellow-400 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Success Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-linear-to-r from-yellow-400 to-orange-500 rounded-lg p-8 text-center text-slate-900 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Our Community Success Metrics</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">₹2.1 Cr+</div>
              <div className="text-lg">Total Community Profits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-lg">Active Traders</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₹1.2 lakh</div>
              <div className="text-lg">Highest Single Month</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">90 Days</div>
              <div className="text-lg">Average Time to Profits</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center bg-slate-800 rounded-lg p-8 border border-slate-700"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Success Stories?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Start your journey today with our free webinar and see how our proven strategies
            can transform your trading results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Join Free Webinar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 px-8 py-3 rounded-lg font-semibold"
            >
              View Courses
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}