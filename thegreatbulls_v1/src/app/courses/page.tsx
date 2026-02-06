'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Award, BookOpen, Crown, Star, Target, TrendingUp, Users, Zap } from 'lucide-react'

type CourseLevelType = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
type CourseStatusType = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED' | 'DELETED'

type CourseCardData = {
  id: string
  slug?: string
  title: string
  subtitle?: string
  description?: string
  price?: number
  originalPrice?: number
  duration?: number
  level?: CourseLevelType
  language?: string
  thumbnail?: string
  status?: CourseStatusType
  isFeatured?: boolean
  expiryDate?: string
  maxEnrollments?: number
  currentEnrollments?: number
  instructor?: { name?: string }
  publishedAt?: string
  category?: { name?: string }
}

const priceFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
})

const formatCurrency = (value?: number | null) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return priceFormatter.format(0)
  }
  return priceFormatter.format(value)
}

const formatDurationLabel = (minutes?: number) => {
  if (!minutes || minutes <= 0) {
    return 'Self-paced / upcoming'
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) {
    return `${mins} min`
  }
  if (mins === 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`
  }
  return `${hours}h ${mins}m`
}

const LEVEL_META: Record<CourseLevelType, { label: string; color: string; icon: typeof Target }> = {
  BEGINNER: { label: 'Beginner', color: 'bg-green-600', icon: Target },
  INTERMEDIATE: { label: 'Intermediate', color: 'bg-yellow-600', icon: Zap },
  ADVANCED: { label: 'Advanced', color: 'bg-orange-600', icon: Award },
  EXPERT: { label: 'Expert', color: 'bg-red-600', icon: Crown }
}

const DEFAULT_LEVEL_META = {
  label: 'All Levels',
  color: 'bg-slate-600',
  icon: Target
}

const STATUS_LABELS: Record<CourseStatusType, string> = {
  DRAFT: 'Draft',
  REVIEW: 'Review',
  PUBLISHED: 'Published',
  ARCHIVED: 'Archived',
  DELETED: 'Deleted'
}

const STATUS_COLORS: Record<CourseStatusType, string> = {
  DRAFT: 'bg-slate-700 text-white',
  REVIEW: 'bg-amber-500 text-slate-900',
  PUBLISHED: 'bg-green-600 text-white',
  ARCHIVED: 'bg-red-600 text-white',
  DELETED: 'bg-gray-600 text-white'
}

const formatPublishedLabel = (value?: string) => {
  if (!value) {
    return 'Self-paced / upcoming'
  }
  try {
    return new Date(value).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return 'Self-paced / upcoming'
  }
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadCourses = async () => {
      try {
        const response = await fetch('/api/courses')
        if (!response.ok) {
          throw new Error('Unable to load courses')
        }
        const data: CourseCardData[] = await response.json()
        if (isMounted) {
          setCourses(data)
        }
      } catch (err) {
        console.error('Failed to load courses:', err)
        if (isMounted) {
          setError('Unable to load courses. Please try again later.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadCourses()

    return () => {
      isMounted = false
    }
  }, [])

  const handleEnroll = (course: CourseCardData) => {
    alert(`Mock payment successful! Enrolled in ${course.title}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="text-white text-lg font-semibold">Loading courses...</div>
      </div>
    )
  }

  const totalCourses = courses.length
  const publishedCount = courses.filter(course => ((course.status ?? 'DRAFT').toUpperCase() as CourseStatusType) === 'PUBLISHED').length
  const featuredCount = courses.filter(course => course.isFeatured === true).length
  const totalEnrollments = courses.reduce((sum, course) => sum + (course.currentEnrollments ?? 0), 0)
  const expiringCourses = courses.filter(course => {
    if (!course.expiryDate) return false
    const expiry = new Date(course.expiryDate)
    const now = new Date()
    const daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry >= 0 && daysUntilExpiry <= 30
  }).length

  return (
    <div className="min-h-screen bg-slate-900 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">Flagship Trading Courses</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Transform your trading career with India&apos;s most practical and results-driven programs.
            Join thousands of traders who have scaled their knowledge with real data-backed curriculum.
          </p>
          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">{totalCourses}</div>
              <div className="text-slate-400">Total Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">{totalEnrollments.toLocaleString()}</div>
              <div className="text-slate-400">Total Enrollments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">{featuredCount}</div>
              <div className="text-slate-400">Featured Courses</div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalCourses}</div>
              <p className="text-xs text-slate-400">{publishedCount} published</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Featured Courses</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{featuredCount}</div>
              <p className="text-xs text-slate-400">Highlighted programs</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Enrollments</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalEnrollments.toLocaleString()}</div>
              <p className="text-xs text-slate-400">Students enrolled</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Expiring Soon</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{expiringCourses}</div>
              <p className="text-xs text-slate-400">Within 30 days</p>
            </CardContent>
          </Card>
        </div>

        {error && (
          <div className="text-center text-red-400 bg-slate-800 border border-red-900 rounded-md px-4 py-3">
            {error}
          </div>
        )}

        {courses.length === 0 ? (
          <div className="text-center text-slate-400">No courses available yet. Check back soon.</div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const levelKey = (course.level ?? 'BEGINNER') as CourseLevelType
              const levelMeta = LEVEL_META[levelKey] ?? DEFAULT_LEVEL_META
              const statusKey = ((course.status ?? 'DRAFT').toUpperCase() as CourseStatusType)
              const coursePrice = typeof course.price === 'number' && Number.isFinite(course.price) ? course.price : 0
              const originalPriceRaw = typeof course.originalPrice === 'number' && Number.isFinite(course.originalPrice)
                ? course.originalPrice
                : coursePrice > 0
                  ? coursePrice * 1.25
                  : coursePrice
              const discount = originalPriceRaw > coursePrice
                ? Math.max(0, Math.round((1 - coursePrice / originalPriceRaw) * 100))
                : 0
              const publishedLabel = formatPublishedLabel(course.publishedAt)
              const enrollments = course.currentEnrollments ?? 0
              const maxEnrollments = course.maxEnrollments
              const isFeatured = course.isFeatured === true
              const expiryDate = course.expiryDate ? new Date(course.expiryDate) : null
              const daysUntilExpiry = expiryDate ? Math.floor((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null
              const LevelIcon = levelMeta.icon

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800 border-slate-700 shadow-black/20 shadow-lg">
                    <div
                      className="relative h-48 overflow-hidden rounded-t-xl border-b border-slate-700"
                      style={{
                        backgroundImage: course.thumbnail ? `url(${course.thumbnail})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: course.thumbnail ? undefined : '#0f172a'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-4">
                        <Badge className={`${levelMeta.color} text-white text-xs uppercase px-3 py-1`}>
                          <LevelIcon className="w-3 h-3 mr-1" />
                          {levelMeta.label}
                        </Badge>
                        <Badge className="bg-slate-900/70 text-slate-200 text-xs uppercase px-3 py-1">
                          {publishedLabel}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="space-y-3 pt-5 px-5 pb-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <CardTitle className="text-2xl font-semibold text-white">{course.title}</CardTitle>
                          <div className="text-sm text-slate-400">
                            {course.subtitle ?? course.category?.name ?? 'Flagship trading program'}
                          </div>
                        </div>
                        <Badge className={`${STATUS_COLORS[statusKey]} text-xs uppercase px-3 py-1`}>
                          {STATUS_LABELS[statusKey]}
                        </Badge>
                      </div>
                      <CardDescription className="text-slate-300">
                        {course.description
                          ? course.description.length > 160
                            ? `${course.description.slice(0, 160)}…`
                            : course.description
                          : 'Detailed overview available once the instructor finalizes the syllabus.'}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {isFeatured && (
                          <Badge className="bg-yellow-500 text-slate-900 text-xs uppercase px-2 py-1">
                            ⭐ Featured
                          </Badge>
                        )}
                        {course.category?.name && (
                          <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs uppercase px-2 py-1">
                            {course.category.name}
                          </Badge>
                        )}
                        {daysUntilExpiry !== null && daysUntilExpiry >= 0 && daysUntilExpiry <= 30 && (
                          <Badge className="bg-orange-500 text-white text-xs uppercase px-2 py-1">
                            Expires in {daysUntilExpiry} days
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="px-5 pb-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center text-lg font-bold text-blue-400">
                            <Users className="w-4 h-4 mr-1" />
                            {enrollments.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-400">Enrolled</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-400">
                            {maxEnrollments ? maxEnrollments.toLocaleString() : '∞'}
                          </div>
                          <div className="text-xs text-slate-400">Max Spots</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-300">
                            {maxEnrollments ? Math.max(0, maxEnrollments - enrollments) : '∞'}
                          </div>
                          <div className="text-xs text-slate-400">Available</div>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 mt-6 text-sm text-slate-300">
                        <div>
                          <span className="text-xs uppercase text-slate-500">Duration</span>
                          <p className="font-medium text-white">{formatDurationLabel(course.duration)}</p>
                        </div>
                        <div>
                          <span className="text-xs uppercase text-slate-500">Language</span>
                          <p className="font-medium text-white">{course.language ?? 'English'}</p>
                        </div>
                        <div>
                          <span className="text-xs uppercase text-slate-500">Instructor</span>
                          <p className="font-medium text-white">{course.instructor?.name ?? 'The Great Bulls team'}</p>
                        </div>
                        <div>
                          <span className="text-xs uppercase text-slate-500">Published</span>
                          <p className="font-medium text-white">{publishedLabel}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed mt-4">
                        {course.description ?? 'Detailed course outline will be shared by the instructor soon.'}
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link href={`/courses/${course.slug || course.id}`}>
                              <Button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3">
                                View Details & Enroll – {formatCurrency(coursePrice)}
                              </Button>
                            </Link>
                          </motion.div>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-800 border-slate-700 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-yellow-400">Enroll in {course.title}</DialogTitle>
                            <DialogDescription className="text-slate-300">
                              Secure your spot before the next batch fills up.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="bg-slate-700 p-4 rounded">
                              <div className="flex justify-between mb-2">
                                <span>Course Fee:</span>
                                <span className="line-through text-slate-400">{formatCurrency(originalPriceRaw)}</span>
                              </div>
                              <div className="flex justify-between text-yellow-400 font-bold">
                                <span>Discounted Price:</span>
                                <span>{formatCurrency(coursePrice)}</span>
                              </div>
                              {discount > 0 && (
                                <div className="text-sm text-green-400 mt-1">
                                  You save {discount}% off the original price
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-slate-400">
                              Mock payment: clicking &quot;Pay Now&quot; simulates enrollment. Production will integrate Razorpay or Stripe.
                            </p>
                            <Button onClick={() => handleEnroll(course)} className="w-full bg-orange-500 hover:bg-orange-600">
                              Pay Now (Mock) – {formatCurrency(coursePrice)}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-slate-800 rounded-lg p-8 border border-slate-700"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Trading Journey?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Join thousands of successful traders who have transformed their financial future with our proven programs.
            Start with a free webinar to see how deep operational rigor and live examples make the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/webinars">Join Free Webinar</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900">
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
