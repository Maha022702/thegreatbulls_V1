import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Users, Play } from 'lucide-react'

// Mock data
const upcomingWebinars = [
  {
    id: 1,
    title: 'Nifty 50 Pre-Market Analysis & Key Levels',
    description: 'Live analysis of Nifty support-resistance levels, FII data, and key setups for today\'s trading session.',
    date: '2026-02-15T08:30:00Z',
    duration: '45 minutes',
    instructor: 'Rahul Sharma',
    spotsLeft: 47,
    price: 'FREE',
    tags: ['Pre-Market', 'Nifty 50', 'Technical Analysis']
  },
  {
    id: 2,
    title: 'BankNifty Options: Iron Condor Strategy Deep Dive',
    description: 'Master the Iron Condor strategy with live examples. Learn position sizing, risk management, and profit booking.',
    date: '2026-02-17T19:00:00Z',
    duration: '90 minutes',
    instructor: 'Priya Patel',
    spotsLeft: 23,
    price: '₹499',
    tags: ['Options', 'BankNifty', 'Strategy']
  },
  {
    id: 3,
    title: 'Price Action Mastery: Demand-Supply Zones',
    description: 'Learn to identify institutional order flow and trade with the smart money. Live chart analysis included.',
    date: '2026-02-20T18:30:00Z',
    duration: '75 minutes',
    instructor: 'Amit Kumar',
    spotsLeft: 12,
    price: '₹799',
    tags: ['Price Action', 'Order Flow', 'Live Trading']
  },
  {
    id: 4,
    title: 'Risk Management Masterclass for Traders',
    description: 'Essential risk management techniques every trader must know. Position sizing, stop-loss, and psychological resilience.',
    date: '2026-02-22T17:00:00Z',
    duration: '60 minutes',
    instructor: 'Dr. Rajesh Gupta',
    spotsLeft: 38,
    price: '₹299',
    tags: ['Risk Management', 'Psychology', 'Trading Mindset']
  }
]

const pastRecordings = [
  {
    id: 5,
    title: 'Nifty Monthly Expiry Special: Last 5 Days Strategy',
    description: 'How to trade the final 5 days of monthly expiry for maximum returns.',
    date: '2026-01-28',
    duration: '85 minutes',
    views: 2847,
    rating: 4.8
  },
  {
    id: 6,
    title: 'BankNifty Momentum Trading: Live Setup Analysis',
    description: 'Real-time analysis of BankNifty momentum setups with entry-exit points.',
    date: '2026-01-25',
    duration: '70 minutes',
    views: 1923,
    rating: 4.9
  },
  {
    id: 7,
    title: 'Options Greeks Explained: Delta, Theta, Vega Mastery',
    description: 'Complete understanding of options Greeks and their practical application.',
    date: '2026-01-22',
    duration: '95 minutes',
    views: 3456,
    rating: 4.7
  }
]

export default function WebinarsPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    })
  }

  return (
    <div className="min-h-screen bg-slate-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Live Trading Webinars & Sessions</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join India's top traders for live market analysis, strategy sessions, and interactive Q&A.
            Learn directly from mentors with proven track records.
          </p>
        </div>

        {/* Join Live Trading Room CTA */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-8 mb-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Join Our Live Trading Room</h2>
          <p className="text-slate-800 mb-6 max-w-2xl mx-auto">
            Trade alongside expert mentors in real-time. Get live setups, analysis, and instant feedback.
            Available for enrolled students.
          </p>
          <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800">
            <Link href="/dashboard">Access Trading Room</Link>
          </Button>
        </div>

        {/* Upcoming Webinars */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Upcoming Live Sessions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingWebinars.map((webinar) => (
              <Card key={webinar.id} className="bg-slate-800 border-slate-700 text-white">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-yellow-400 text-xl">{webinar.title}</CardTitle>
                    <Badge className={webinar.price === 'FREE' ? 'bg-green-600' : 'bg-orange-600'}>
                      {webinar.price}
                    </Badge>
                  </div>
                  <CardDescription className="text-slate-300">
                    {webinar.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {webinar.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-slate-600 text-slate-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-slate-300">
                      <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                      {formatDate(webinar.date)}
                    </div>
                    <div className="flex items-center text-slate-300">
                      <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                      {webinar.duration}
                    </div>
                    <div className="flex items-center text-slate-300">
                      <Users className="w-4 h-4 mr-2 text-yellow-400" />
                      Instructor: {webinar.instructor}
                    </div>
                    <div className="text-sm text-orange-400">
                      Only {webinar.spotsLeft} spots left!
                    </div>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    {webinar.price === 'FREE' ? 'Register Free' : `Register - ${webinar.price}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Past Recordings */}
        <section>
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Past Webinar Recordings</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pastRecordings.map((recording) => (
              <Card key={recording.id} className="bg-slate-800 border-slate-700 text-white">
                <CardHeader>
                  <CardTitle className="text-yellow-400 text-lg">{recording.title}</CardTitle>
                  <CardDescription className="text-slate-300">
                    {recording.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-slate-400 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {recording.date}
                    </div>
                    <div className="flex items-center text-slate-400 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {recording.duration}
                    </div>
                    <div className="flex items-center text-slate-400 text-sm">
                      <Play className="w-4 h-4 mr-2" />
                      {recording.views.toLocaleString()} views • ⭐ {recording.rating}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900">
                    Watch Recording
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center mt-16 bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-4">Want Personalized Trading Guidance?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Book a 1-on-1 consultation with our expert traders. Get personalized strategy recommendations
            and answers to your specific trading questions.
          </p>
          <Button size="lg" className="bg-yellow-400 text-slate-900 hover:bg-yellow-500">
            <Link href="/contact">Book Free Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}