'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Award,
  BookOpen,
  Clock,
  Crown,
  Globe,
  PlayCircle,
  Star,
  Target,
  Users,
  Zap,
  CheckCircle2,
  Trophy,
  TrendingUp,
  Shield,
  BarChart,
  Brain
} from 'lucide-react'

type CourseLevelType = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'

interface CourseModule {
  id: string
  title: string
  description?: string
  order: number
  duration: number
  lessons: CourseLesson[]
}

interface CourseLesson {
  id: string
  title: string
  description?: string
  duration: number
  order: number
  isPreview: boolean
}

interface CourseDetail {
  id: string
  title: string
  slug: string
  subtitle?: string
  description?: string
  shortDescription?: string
  thumbnail?: string
  price: number
  originalPrice?: number
  level: CourseLevelType
  language: string
  duration: number
  status: string
  isPublished: boolean
  publishedAt?: string
  isFeatured?: boolean
  expiryDate?: string
  maxEnrollments?: number
  currentEnrollments?: number
  certificateTemplate?: string
  instructor: {
    id: string
    name: string
    email: string
    bio?: string
  }
  category?: {
    id: string
    name: string
  }
  whatYouWillLearn?: string[]
  learningOutcomes?: {
    [key: string]: {
      title: string
      icon: string
      outcomes: string[]
    }
  }
  requirements?: string[]
  targetAudience?: string[]
  modules?: CourseModule[]
  courseOverview?: string
  courseTopics?: string[]
  skillsCovered?: string[]
  prerequisites?: string[]
}

const priceFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
})

const formatCurrency = (value: number) => priceFormatter.format(value)

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins} minutes`
  if (mins === 0) return `${hours} ${hours > 1 ? 'hours' : 'hour'}`
  return `${hours}h ${mins}m`
}

const LEVEL_META: Record<CourseLevelType, { label: string; color: string; icon: typeof Target }> = {
  BEGINNER: { label: 'Beginner', color: 'bg-green-600', icon: Target },
  INTERMEDIATE: { label: 'Intermediate', color: 'bg-yellow-600', icon: Zap },
  ADVANCED: { label: 'Advanced', color: 'bg-orange-600', icon: Award },
  EXPERT: { label: 'Expert', color: 'bg-red-600', icon: Crown }
}

// Icon mapping for learning outcomes
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    'target': Target,
    'trending-up': TrendingUp,
    'shield': Shield,
    'bar-chart': BarChart,
    'brain': Brain,
    'zap': Zap
  }
  return iconMap[iconName] || CheckCircle2
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const slug = params.slug as string
        // Try to fetch by slug, fallback to ID
        const response = await fetch(`/api/courses/${slug}`)
        
        if (!response.ok) {
          throw new Error('Course not found')
        }

        const data = await response.json()
        setCourse(data)
      } catch (err) {
        console.error('Error fetching course:', err)
        setError('Unable to load course details')
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchCourseDetails()
    }
  }, [params.slug])

  const handleEnroll = () => {
    alert(`Enrollment for "${course?.title}" - Payment integration coming soon!`)
    // TODO: Redirect to payment/checkout
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading course details...</div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <Card className="bg-slate-800 border-slate-700 max-w-md">
          <CardHeader>
            <CardTitle className="text-red-400">Course Not Found</CardTitle>
            <CardDescription className="text-slate-300">{error || 'The course you are looking for does not exist.'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/courses')} className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900">
              Back to Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const levelKey = (course.level || 'BEGINNER') as CourseLevelType
  const levelMeta = LEVEL_META[levelKey]
  const LevelIcon = levelMeta.icon
  const discount = course.originalPrice && course.originalPrice > course.price
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge className={`${levelMeta.color} text-white`}>
                  <LevelIcon className="w-3 h-3 mr-1" />
                  {levelMeta.label}
                </Badge>
                {course.category && (
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {course.category.name}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {course.title}
              </h1>
              
              {course.subtitle && (
                <p className="text-xl text-slate-300 mb-6">{course.subtitle}</p>
              )}
              
              {course.shortDescription && (
                <p className="text-slate-400 mb-6">{course.shortDescription}</p>
              )}

              <div className="flex flex-wrap items-center gap-6 mb-6">
                {course.isFeatured && (
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-5 h-5 fill-current mr-1" />
                    <span className="font-semibold">Featured Course</span>
                  </div>
                )}
                <div className="flex items-center text-slate-300">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{course.currentEnrollments || 0} enrolled</span>
                  {course.maxEnrollments && (
                    <span className="text-slate-400 ml-1">/ {course.maxEnrollments} max</span>
                  )}
                </div>
                <div className="flex items-center text-slate-300">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{formatDuration(course.duration)}</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <Globe className="w-5 h-5 mr-2" />
                  <span>{course.language}</span>
                </div>
              </div>

              <div className="text-sm text-slate-400 mb-6">
                Created by <span className="text-yellow-400 font-medium">{course.instructor.name}</span>
              </div>
            </motion.div>

            {/* Right Card - Pricing */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-slate-800 border-slate-700 shadow-2xl">
                {course.thumbnail && (
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-bold text-white">
                        {formatCurrency(course.price)}
                      </span>
                      {discount > 0 && (
                        <>
                          <span className="text-xl text-slate-400 line-through">
                            {formatCurrency(course.originalPrice!)}
                          </span>
                          <Badge className="bg-green-600 text-white">
                            {discount}% OFF
                          </Badge>
                        </>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm">One-time payment • Lifetime access</p>
                    {course.expiryDate && (() => {
                      const expiry = new Date(course.expiryDate)
                      const now = new Date()
                      const daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                      if (daysUntilExpiry >= 0 && daysUntilExpiry <= 30) {
                        return (
                          <div className="mt-2 text-sm text-orange-400 font-medium">
                            ⚠️ Enrollment closes in {daysUntilExpiry} days
                          </div>
                        )
                      }
                      return null
                    })()}
                  </div>

                  <Button
                    onClick={handleEnroll}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-6 text-lg mb-4"
                    disabled={course.maxEnrollments ? (course.currentEnrollments || 0) >= course.maxEnrollments : false}
                  >
                    {course.maxEnrollments && (course.currentEnrollments || 0) >= course.maxEnrollments
                      ? 'Course Full'
                      : 'Enroll Now'}
                  </Button>

                  {course.maxEnrollments && (
                    <div className="mb-4 text-center">
                      <span className="text-sm text-slate-400">
                        {Math.max(0, course.maxEnrollments - (course.currentEnrollments || 0))} spots remaining
                      </span>
                    </div>
                  )}

                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced What You'll Learn */}
            {course.learningOutcomes && Object.keys(course.learningOutcomes).length > 0 ? (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center gap-2 text-2xl">
                    <Trophy className="w-6 h-6" />
                    What You'll Learn
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Master these essential skills and concepts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(course.learningOutcomes).map(([key, section]) => {
                      const IconComponent = getIconComponent(section.icon)
                      return (
                        <div key={key} className="border border-slate-700 rounded-lg p-5 bg-slate-900/50">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-yellow-400/10">
                              <IconComponent className="w-5 h-5 text-yellow-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                          </div>
                          <div className="grid gap-3">
                            {section.outcomes.map((outcome, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300">{outcome}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : course.whatYouWillLearn && course.whatYouWillLearn.length > 0 ? (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    What You'll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {/* Course Description */}
            {course.description && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {course.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Course Overview */}
            {course.courseOverview && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Course Overview
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    What this course covers in detail
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {course.courseOverview}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Course Topics */}
            {course.courseTopics && course.courseTopics.length > 0 && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Course Topics
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Key topics you'll master in this course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.courseTopics.map((topic, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-slate-300">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Skills Covered */}
            {course.skillsCovered && course.skillsCovered.length > 0 && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Skills You'll Master
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Professional skills and competencies you'll gain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {course.skillsCovered.map((skill, index) => (
                      <Badge key={index} className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30 px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Prerequisites */}
            {(course.prerequisites || course.requirements) && (course.prerequisites?.length || course.requirements?.length) && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Prerequisites
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    What you need before starting this course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(course.prerequisites || course.requirements || []).map((prereq, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{prereq}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Course Curriculum */}
            {course.modules && course.modules.length > 0 && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Course Curriculum
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {course.modules.length} modules • {course.modules.reduce((total, mod) => total + (mod.lessons?.length || 0), 0)} lessons
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.modules.map((module, index) => (
                      <div key={module.id} className="border border-slate-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1">
                              Module {index + 1}: {module.title}
                            </h4>
                            {module.description && (
                              <p className="text-sm text-slate-400">{module.description}</p>
                            )}
                          </div>
                          <Badge variant="outline" className="border-slate-600 text-slate-300 ml-4">
                            {formatDuration(module.duration)}
                          </Badge>
                        </div>
                        {module.lessons && module.lessons.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {module.lessons.map((lesson) => (
                              <div key={lesson.id} className="flex items-center justify-between text-sm py-2 px-3 bg-slate-900 rounded">
                                <div className="flex items-center gap-2">
                                  <PlayCircle className="w-4 h-4 text-slate-400" />
                                  <span className="text-slate-300">{lesson.title}</span>
                                  {lesson.isPreview && (
                                    <Badge className="bg-blue-600 text-white text-xs">Preview</Badge>
                                  )}
                                </div>
                                <span className="text-slate-400">{formatDuration(lesson.duration)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor Info */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-yellow-400">Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-white text-lg">{course.instructor.name}</h4>
                  {course.instructor.bio && (
                    <p className="text-slate-400 text-sm">{course.instructor.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
