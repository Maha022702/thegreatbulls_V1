'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { AdminLayout } from '@/components/admin/AdminLayout'
import Image from 'next/image'
import toast from 'react-hot-toast'
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Users,
  Star,
  TrendingUp,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  Target,
  Award,
  Settings,
  Image as ImageIcon,
  BarChart3,
  Clock,
  Globe,
  DollarSign,
  User,
  Calendar,
  Shield
} from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'REVIEW', label: 'In Review' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'ARCHIVED', label: 'Archived' }
]

const LEVEL_OPTIONS = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
  { value: 'EXPERT', label: 'Expert' }
]

const DEFAULT_CATEGORIES = ['Technical Analysis', 'Options Trading', 'Intraday Trading', 'Index Trading']

const SORT_OPTIONS = [
  { value: 'recent', label: 'Newest' },
  { value: 'featured', label: 'Featured' },
  { value: 'expiring', label: 'Expiring Soon' }
]

const priceFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
})

const formatCurrency = (value?: number) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return priceFormatter.format(0)
  }
  return priceFormatter.format(value)
}

const lookupLabel = (options: { value: string; label: string }[], value?: string) => {
  if (!value) return 'Unknown'
  const normalized = value.toUpperCase()
  return options.find(option => option.value === normalized)?.label ?? value
}

const getLevelLabel = (level: string) => lookupLabel(LEVEL_OPTIONS, level)
const getStatusLabel = (status: string) => lookupLabel(STATUS_OPTIONS, status)

const sanitizeStatusColor = (status: string) => {
  const normalized = status?.toLowerCase() ?? ''
  switch (normalized) {
    case 'published':
      return 'bg-green-600'
    case 'draft':
      return 'bg-gray-600'
    case 'review':
      return 'bg-yellow-600'
    case 'archived':
      return 'bg-red-600'
    default:
      return 'bg-gray-600'
  }
}

const sanitizeLevelColor = (level: string) => {
  const normalized = level?.toLowerCase() ?? ''
  switch (normalized) {
    case 'beginner':
      return 'bg-blue-600'
    case 'intermediate':
      return 'bg-yellow-600'
    case 'advanced':
      return 'bg-orange-600'
    case 'expert':
      return 'bg-red-600'
    default:
      return 'bg-gray-600'
  }
}

const initialFormState = {
  title: '',
  subtitle: '',
  description: '',
  shortDescription: '',
  price: '',
  category: '',
  level: 'BEGINNER',
  instructorName: '',
  instructorBio: '',
  thumbnail: '',
  duration: '',
  language: 'English',
  status: 'DRAFT',
  isPublished: false,
  isFeatured: false,
  expiryDate: '',
  maxEnrollments: '',
  certificateTemplate: '',
  courseOverview: '',
  courseTopics: [] as string[],
  skillsCovered: [] as string[],
  prerequisites: [] as string[],
  requirements: [] as string[],
  whatYouWillLearn: [] as string[],
  targetAudience: [] as string[],
  learningOutcomes: [] as Array<{ id: string; title: string; icon: string; outcomes: string[] }>
}

const getStatusColor = sanitizeStatusColor
const getLevelColor = sanitizeLevelColor

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editingCourse, setEditingCourse] = useState<any>(null)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [formData, setFormData] = useState(initialFormState)
  const [sortOption, setSortOption] = useState('recent')
  const [levelFilter, setLevelFilter] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [featuredFilter, setFeaturedFilter] = useState('all')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState('basic')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = 'Course title is required'
    if (!formData.category || !formData.category.trim()) newErrors.category = 'Category is required'
    if (!formData.instructorName.trim()) newErrors.instructorName = 'Instructor name is required'
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required'
    if (!formData.level) newErrors.level = 'Difficulty level is required'
    if (!formData.duration || Number(formData.duration) <= 0) newErrors.duration = 'Valid duration is required'
    if (!formData.description.trim()) newErrors.description = 'Course description is required'
    if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Short description is required'

    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      console.log('Validation errors:', newErrors)
    }
    
    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const resetForm = () => {
    setFormData({ ...initialFormState })
    setActiveTab('basic')
    setErrors({})
  }

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses')
      if (response.ok) {
        const data = await response.json()
        setCourses(data)
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const buildCoursePayload = () => {
    // Convert structured learning outcomes array to the format expected by the API
    let learningOutcomes: Record<string, any> | null = null
    if (formData.learningOutcomes && formData.learningOutcomes.length > 0) {
      learningOutcomes = {}
      formData.learningOutcomes.forEach(section => {
        if (section.title && section.outcomes && section.outcomes.length > 0) {
          const key = section.id || section.title.toLowerCase().replace(/\s+/g, '-')
          learningOutcomes![key] = {
            title: section.title,
            icon: section.icon || 'book',
            outcomes: section.outcomes.filter(o => o.trim())
          }
        }
      })
      if (Object.keys(learningOutcomes).length === 0) {
        learningOutcomes = null
      }
    }
    
    const payload = {
      title: formData.title,
      subtitle: formData.subtitle || '',
      description: formData.description,
      shortDescription: formData.shortDescription || '',
      price: Number(formData.price) || 0,
      category: formData.category,
      level: formData.level || 'BEGINNER',
      instructorName: formData.instructorName,
      instructorBio: formData.instructorBio || '',
      thumbnail: formData.thumbnail,
      duration: Number(formData.duration) || 0,
      language: formData.language || 'English',
      status: formData.status || 'DRAFT',
      isPublished: Boolean(formData.isPublished),
      isFeatured: Boolean(formData.isFeatured),
      expiryDate: formData.expiryDate || null,
      maxEnrollments: formData.maxEnrollments ? Number(formData.maxEnrollments) : null,
      certificateTemplate: formData.certificateTemplate || null,
      courseOverview: formData.courseOverview || '',
      courseTopics: formData.courseTopics || [],
      skillsCovered: formData.skillsCovered || [],
      prerequisites: formData.prerequisites || [],
      requirements: formData.requirements || [],
      whatYouWillLearn: formData.whatYouWillLearn.filter(item => item.trim()) || [],
      targetAudience: formData.targetAudience || [],
      learningOutcomes: learningOutcomes
    }
    
    console.log('Course Payload:', {
      category: payload.category,
      instructorName: payload.instructorName,
      price: payload.price,
      duration: payload.duration
    })
    
    return payload
  }

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      toast.error('Please fill all required fields in the Basic Info tab')
      setActiveTab('basic')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(buildCoursePayload())
      })

      if (response.ok) {
        toast.success('Course created successfully!')
        await fetchCourses()
        setIsDialogOpen(false)
        resetForm()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to create course')
      }
    } catch (error) {
      console.error('Error creating course:', error)
      toast.error('Failed to create course')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePartialUpdate = async (courseId: string, data: any) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        await fetchCourses()
        if (editingCourse?.id === courseId) {
          setEditingCourse(null)
          resetForm()
        }
        return true
      } else {
        const errorData = await response.json()
        const errorMsg = errorData.details || errorData.error || 'Failed to update course'
        toast.error(errorMsg)
        console.error('Update failed:', errorData)
        return false
      }
    } catch (error) {
      console.error('Error updating course:', error)
      toast.error('Network error: Failed to update course')
      return false
    }
  }

  const handleStatusChange = (courseId: string, newStatus: string) => {
    handlePartialUpdate(courseId, { status: newStatus })
  }

  const handleTogglePublish = (courseId: string, published: boolean) => {
    handlePartialUpdate(courseId, { isPublished: published })
  }

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      toast.error('Please fill all required fields in the Basic Info tab')
      setActiveTab('basic')
      return
    }

    if (!editingCourse) return

    setIsSubmitting(true)
    try {
      const success = await handlePartialUpdate(editingCourse.id, buildCoursePayload())
      if (success) {
        toast.success('Course updated successfully!')
        setIsDialogOpen(false)
        resetForm()
        setEditingCourse(null)
      }
    } catch (error) {
      console.error('Update error:', error)
      toast.error('Failed to update course')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchCourses()
      }
    } catch (error) {
      console.error('Error deleting course:', error)
    }
  }

  const handleEditCourse = (course: any) => {
    setEditingCourse(course)
    setIsDialogOpen(true)
    setFormData({
      title: course.title,
      subtitle: course.subtitle || '',
      description: course.description,
      shortDescription: course.shortDescription || '',
      price: course.price?.toString() || '',
      category: course.category?.name || course.category || '',
      level: course.level || 'BEGINNER',
      instructorName: course.instructor?.name || '',
      instructorBio: course.instructor?.bio || '',
      thumbnail: course.thumbnail || '',
      duration: course.duration?.toString() || '',
      language: course.language || 'English',
      status: course.status || 'DRAFT',
      isPublished: Boolean(course.isPublished),
      isFeatured: Boolean(course.isFeatured),
      expiryDate: course.expiryDate ? new Date(course.expiryDate).toISOString().split('T')[0] : '',
      maxEnrollments: course.maxEnrollments?.toString() || '',
      certificateTemplate: course.certificateTemplate || '',
      courseOverview: course.overview || '',
      courseTopics: course.courseTopics || [],
      skillsCovered: course.skillsCovered || [],
      prerequisites: course.prerequisites || [],
      requirements: course.requirements || [],
      whatYouWillLearn: course.whatYouWillLearn || [],
      targetAudience: course.targetAudience || [],
      learningOutcomes: course.learningOutcomes ? Object.entries(course.learningOutcomes).map(([key, value]: [string, any]) => ({
        id: key,
        title: value.title || '',
        icon: value.icon || 'book',
        outcomes: value.outcomes || []
      })) : []
    })
  }

  const handleViewCourse = (course: any) => {
    setSelectedCourse(course)
  }

  const categoryOptions = useMemo(() => {
    return Array.from(new Set(courses.map(course => 
      typeof course.category === 'object' && course.category?.name 
        ? course.category.name 
        : typeof course.category === 'string' 
          ? course.category 
          : null
    ).filter(Boolean)))
  }, [courses])

  const availableCategories = useMemo(() => {
    return Array.from(new Set([...DEFAULT_CATEGORIES, ...categoryOptions]))
  }, [categoryOptions])

  const filteredCourses = useMemo(() => {
    let list = [...courses]
    const normalizedSearch = searchTerm.trim().toLowerCase()

    if (normalizedSearch) {
      list = list.filter(course => {
        const titleMatch = course.title?.toLowerCase().includes(normalizedSearch)
        const instructorMatch = course.instructor?.name?.toLowerCase().includes(normalizedSearch)
        return titleMatch || instructorMatch
      })
    }

    if (statusFilter !== 'all') {
      list = list.filter(course => course.status?.toLowerCase() === statusFilter)
    }

    if (categoryFilter !== 'all') {
      list = list.filter(course => {
        const categoryName = typeof course.category === 'object' && course.category?.name
          ? course.category.name
          : course.category
        return categoryName === categoryFilter
      })
    }

    if (levelFilter !== 'all') {
      list = list.filter(course => course.level?.toLowerCase() === levelFilter)
    }

    if (featuredFilter !== 'all') {
      const isFeatured = featuredFilter === 'featured'
      list = list.filter(course => Boolean(course.isFeatured) === isFeatured)
    }

    if (priceRange.min) {
      const minValue = Number(priceRange.min)
      if (!Number.isNaN(minValue)) {
        list = list.filter(course => (course.price || 0) >= minValue)
      }
    }

    if (priceRange.max) {
      const maxValue = Number(priceRange.max)
      if (!Number.isNaN(maxValue)) {
        list = list.filter(course => (course.price || 0) <= maxValue)
      }
    }

    list.sort((a, b) => {
      switch (sortOption) {
        case 'featured':
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        case 'expiring':
          if (!a.expiryDate && !b.expiryDate) return 0
          if (!a.expiryDate) return 1
          if (!b.expiryDate) return -1
          return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
        default:
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0
          return bTime - aTime
      }
    })

    return list
  }, [courses, searchTerm, statusFilter, categoryFilter, levelFilter, featuredFilter, priceRange, sortOption])

  const totalCourses = courses.length
  const publishedCourses = courses.filter(c => c.status?.toLowerCase() === 'published').length
  const featuredCourses = courses.filter(c => c.isFeatured).length

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading courses...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Course Management</h1>
            <p className="text-slate-400 mt-1">Manage and monitor all courses on your platform</p>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-slate-900"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalCourses}</div>
              <p className="text-xs text-slate-400">{publishedCourses} published</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Featured Courses</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{featuredCourses}</div>
              <p className="text-xs text-yellow-400">Highlighted courses</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Course Categories</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{categoryOptions.length}</div>
              <p className="text-xs text-slate-400">Unique categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48 bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="review">In Review</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="w-full md:w-48 bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">All Levels</SelectItem>
                      {LEVEL_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value.toLowerCase()}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-48 bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">All Categories</SelectItem>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
                  <SelectTrigger className="w-full md:w-48 bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="featured">Featured Only</SelectItem>
                    <SelectItem value="not-featured">Not Featured</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  min={0}
                  placeholder="Min price"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="Max price"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />

                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full md:w-48 bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {SORT_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses Table */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">Courses ({filteredCourses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-400">Course</TableHead>
                  <TableHead className="text-slate-400">Instructor</TableHead>
                  <TableHead className="text-slate-400">Category</TableHead>
                  <TableHead className="text-slate-400">Level</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-slate-400">Featured</TableHead>
                  <TableHead className="text-slate-400">Expiry Date</TableHead>
                  <TableHead className="text-slate-400">Max Students</TableHead>
                  <TableHead className="text-slate-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id} className="border-slate-700">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {course.thumbnail ? (
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            width={48}
                            height={32}
                            className="w-12 h-8 rounded object-cover"
                          />
                        ) : (
                          <div className="w-12 h-8 bg-slate-600 rounded flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-slate-400" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-white">{course.title}</div>
                          <div className="text-sm text-slate-400">
                            {course.stats?.totalModules || 0} modules • {course.stats?.totalLessons || 0} lessons
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">{course.instructor?.name || 'Unknown'}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {typeof course.category === 'object' && course.category?.name 
                          ? course.category.name 
                          : course.category || 'General'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getLevelColor(course.level)} text-white`}>
                        {getLevelLabel(course.level)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={course.status || 'DRAFT'}
                        onValueChange={(value) => handleStatusChange(course.id, value)}
                      >
                        <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {STATUS_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {course.isFeatured ? (
                        <Badge className="bg-yellow-600 text-white">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Featured
                        </Badge>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {course.expiryDate ? (
                        <div className="text-sm">
                          {new Date(course.expiryDate).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-slate-400">No expiry</span>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {course.maxEnrollments ? (
                        <div className="text-sm">
                          {course.currentEnrollments || 0} / {course.maxEnrollments}
                        </div>
                      ) : (
                        <span className="text-slate-400">Unlimited</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center flex-wrap gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300"
                          onClick={() => handleViewCourse(course)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-yellow-400 hover:text-yellow-300"
                          onClick={() => handleEditCourse(course)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-200 hover:text-white"
                          onClick={() => handleTogglePublish(course.id, !course.isPublished)}
                        >
                          {course.isPublished ? 'Unpublish' : 'Publish'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Create/Edit Course Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) {
            setIsDialogOpen(false)
            setEditingCourse(null)
            resetForm()
          }
        }}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-yellow-400 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                {editingCourse ? 'Update the course details and content' : 'Create a comprehensive course with detailed information'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={editingCourse ? handleUpdateCourse : handleCreateCourse} className="space-y-6">
              {/* Custom Tab Navigation */}
              <div className="border-b border-slate-700">
                <div className="flex space-x-1">
                  {[
                    { id: 'basic', label: 'Basic Info', icon: FileText },
                    { id: 'content', label: 'Content', icon: Target },
                    { id: 'outcomes', label: 'Learning', icon: Award },
                    { id: 'settings', label: 'Settings', icon: Settings },
                    { id: 'media', label: 'Media', icon: ImageIcon }
                  ].map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? 'border-yellow-400 text-yellow-400'
                            : 'border-transparent text-slate-400 hover:text-slate-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Course Title *
                        </label>
                        <Input
                          className={`bg-slate-700 border-slate-600 text-white mt-2 ${errors.title ? 'border-red-500' : ''}`}
                          placeholder="Enter compelling course title"
                          value={formData.title}
                          onChange={(e) => {
                            setFormData({ ...formData, title: e.target.value })
                            if (errors.title) setErrors({ ...errors, title: '' })
                          }}
                          required
                        />
                        {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
                        <p className="text-xs text-slate-400 mt-1">Make it engaging and descriptive</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Subtitle
                        </label>
                        <Input
                          className="bg-slate-700 border-slate-600 text-white mt-2"
                          placeholder="Brief subtitle that highlights key benefits"
                          value={formData.subtitle}
                          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Category *
                        </label>
                        <Select value={formData.category} onValueChange={(value) => {
                          setFormData({ ...formData, category: value })
                          if (errors.category) setErrors({ ...errors, category: '' })
                        }}>
                          <SelectTrigger className={`bg-slate-700 border-slate-600 text-white mt-2 ${errors.category ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select course category" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            {availableCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.category && <p className="text-xs text-red-400 mt-1">{errors.category}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Instructor Name *
                        </label>
                        <Input
                          className={`bg-slate-700 border-slate-600 text-white mt-2 ${errors.instructorName ? 'border-red-500' : ''}`}
                          placeholder="Instructor full name"
                          value={formData.instructorName}
                          onChange={(e) => {
                            setFormData({ ...formData, instructorName: e.target.value })
                            if (errors.instructorName) setErrors({ ...errors, instructorName: '' })
                          }}
                          required
                        />
                        {errors.instructorName && <p className="text-xs text-red-400 mt-1">{errors.instructorName}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Instructor Bio
                        </label>
                        <Input
                          className="bg-slate-700 border-slate-600 text-white mt-2"
                          placeholder="Brief instructor biography"
                          value={formData.instructorBio}
                          onChange={(e) => setFormData({ ...formData, instructorBio: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Price (₹) *
                        </label>
                        <Input
                          type="number"
                          min={0}
                          className={`bg-slate-700 border-slate-600 text-white mt-2 ${errors.price ? 'border-red-500' : ''}`}
                          placeholder="Course price in rupees"
                          value={formData.price}
                          onChange={(e) => {
                            setFormData({ ...formData, price: e.target.value })
                            if (errors.price) setErrors({ ...errors, price: '' })
                          }}
                          required
                        />
                        {errors.price && <p className="text-xs text-red-400 mt-1">{errors.price}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Difficulty Level *
                        </label>
                        <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-2">
                            <SelectValue placeholder="Select difficulty level" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            {LEVEL_OPTIONS.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Duration (minutes) *
                        </label>
                        <Input
                          type="number"
                          min={0}
                          className="bg-slate-700 border-slate-600 text-white mt-2"
                          placeholder="Total course duration"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          required
                        />
                        <p className="text-xs text-slate-400 mt-1">Total minutes of content</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Language
                        </label>
                        <Input
                          className="bg-slate-700 border-slate-600 text-white mt-2"
                          placeholder="Course language"
                          value={formData.language}
                          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-300">Short Description *</label>
                    <textarea
                      className="w-full mt-2 p-3 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 resize-none"
                      rows={3}
                      placeholder="Brief overview that appears in course listings (2-3 sentences)"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      required
                    />
                    <p className="text-xs text-slate-400 mt-1">Appears in course cards and search results</p>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Course Description *
                    </label>
                    <textarea
                      className="w-full mt-2 p-3 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 resize-none"
                      rows={6}
                      placeholder="Detailed course description explaining what students will learn..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                    <p className="text-xs text-slate-400 mt-1">Comprehensive description for the course detail page</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Course Overview
                    </label>
                    <textarea
                      className="w-full mt-2 p-3 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 resize-none"
                      rows={5}
                      placeholder="Detailed overview of the course structure and learning journey..."
                      value={formData.courseOverview}
                      onChange={(e) => setFormData({ ...formData, courseOverview: e.target.value })}
                    />
                    <p className="text-xs text-slate-400 mt-1">Explains the course structure and what students will achieve</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Course Topics
                      </label>
                      <div className="mt-2 space-y-2">
                        {formData.courseTopics.map((topic, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              className="flex-1 p-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 text-sm"
                              value={topic}
                              onChange={(e) => {
                                const newTopics = [...formData.courseTopics]
                                newTopics[index] = e.target.value
                                setFormData({ ...formData, courseTopics: newTopics })
                              }}
                              placeholder="Enter course topic..."
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newTopics = formData.courseTopics.filter((_, i) => i !== index)
                                setFormData({ ...formData, courseTopics: newTopics })
                              }}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-600 rounded-md transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, courseTopics: [...formData.courseTopics, ''] })}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-slate-600 rounded-md transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add Topic
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">Key topics covered in this course</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Skills Covered
                      </label>
                      <div className="mt-2 space-y-2">
                        {formData.skillsCovered.map((skill, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              className="flex-1 p-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 text-sm"
                              value={skill}
                              onChange={(e) => {
                                const newSkills = [...formData.skillsCovered]
                                newSkills[index] = e.target.value
                                setFormData({ ...formData, skillsCovered: newSkills })
                              }}
                              placeholder="Enter skill..."
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newSkills = formData.skillsCovered.filter((_, i) => i !== index)
                                setFormData({ ...formData, skillsCovered: newSkills })
                              }}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-600 rounded-md transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, skillsCovered: [...formData.skillsCovered, ''] })}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-slate-600 rounded-md transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add Skill
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">Professional skills students will master</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'outcomes' && (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      What You'll Learn (Simple List)
                    </label>
                    <p className="text-xs text-slate-400 mt-1 mb-2">
                      Quick bullet points. For detailed sections, use "Structured Learning Outcomes" below.
                    </p>
                    <div className="mt-2 space-y-2">
                      {formData.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            className="flex-1 p-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 text-sm"
                            value={item}
                            onChange={(e) => {
                              const newItems = [...formData.whatYouWillLearn]
                              newItems[index] = e.target.value
                              setFormData({ ...formData, whatYouWillLearn: newItems })
                            }}
                            placeholder="Enter learning objective..."
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = formData.whatYouWillLearn.filter((_, i) => i !== index)
                              setFormData({ ...formData, whatYouWillLearn: newItems })
                            }}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-600 rounded-md transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, whatYouWillLearn: [...formData.whatYouWillLearn, ''] })}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-slate-600 rounded-md transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Learning Objective
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Simple list fallback. Structured outcomes below take priority on course page.</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Prerequisites
                    </label>
                    <div className="mt-2 space-y-2">
                      {formData.prerequisites.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            className="flex-1 p-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 text-sm"
                            value={item}
                            onChange={(e) => {
                              const newItems = [...formData.prerequisites]
                              newItems[index] = e.target.value
                              setFormData({ ...formData, prerequisites: newItems })
                            }}
                            placeholder="Enter prerequisite..."
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = formData.prerequisites.filter((_, i) => i !== index)
                              setFormData({ ...formData, prerequisites: newItems })
                            }}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-600 rounded-md transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, prerequisites: [...formData.prerequisites, ''] })}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-slate-600 rounded-md transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Prerequisite
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">What students need before starting this course</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Target Audience
                    </label>
                    <div className="mt-2 space-y-2">
                      {formData.targetAudience.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            className="flex-1 p-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 text-sm"
                            value={item}
                            onChange={(e) => {
                              const newItems = [...formData.targetAudience]
                              newItems[index] = e.target.value
                              setFormData({ ...formData, targetAudience: newItems })
                            }}
                            placeholder="Enter target audience..."
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = formData.targetAudience.filter((_, i) => i !== index)
                              setFormData({ ...formData, targetAudience: newItems })
                            }}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-600 rounded-md transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, targetAudience: [...formData.targetAudience, ''] })}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-slate-600 rounded-md transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Target Audience
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Who this course is designed for</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Structured Learning Outcomes
                    </label>
                    <p className="text-xs text-slate-400 mt-1 mb-3">Organize learning outcomes into sections for better presentation</p>
                    
                    <div className="space-y-4">
                      {formData.learningOutcomes.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="p-4 bg-slate-700/50 border border-slate-600 rounded-lg space-y-3">
                          <div className="flex items-start gap-2">
                            <div className="flex-1 space-y-2">
                              <input
                                type="text"
                                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 text-sm font-medium"
                                placeholder="Section Title (e.g., 'Technical Analysis Mastery')"
                                value={section.title}
                                onChange={(e) => {
                                  const newSections = [...formData.learningOutcomes]
                                  newSections[sectionIndex].title = e.target.value
                                  setFormData({ ...formData, learningOutcomes: newSections })
                                }}
                              />
                              <select
                                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm"
                                value={section.icon}
                                onChange={(e) => {
                                  const newSections = [...formData.learningOutcomes]
                                  newSections[sectionIndex].icon = e.target.value
                                  setFormData({ ...formData, learningOutcomes: newSections })
                                }}
                              >
                                <option value="book">📚 Book (General)</option>
                                <option value="bar-chart">📊 Bar Chart (Analysis)</option>
                                <option value="trending-up">📈 Trending Up (Growth)</option>
                                <option value="shield">🛡️ Shield (Protection)</option>
                                <option value="brain">🧠 Brain (Psychology)</option>
                                <option value="zap">⚡ Zap (Speed/Power)</option>
                                <option value="target">🎯 Target (Precision)</option>
                                <option value="star">⭐ Star (Excellence)</option>
                              </select>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const newSections = formData.learningOutcomes.filter((_, i) => i !== sectionIndex)
                                setFormData({ ...formData, learningOutcomes: newSections })
                              }}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-600 rounded-md transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="space-y-2 pl-2 border-l-2 border-slate-600">
                            <label className="text-xs font-medium text-slate-400">Outcomes in this section:</label>
                            {section.outcomes.map((outcome, outcomeIndex) => (
                              <div key={outcomeIndex} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  className="flex-1 p-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 text-sm"
                                  placeholder="Enter outcome..."
                                  value={outcome}
                                  onChange={(e) => {
                                    const newSections = [...formData.learningOutcomes]
                                    newSections[sectionIndex].outcomes[outcomeIndex] = e.target.value
                                    setFormData({ ...formData, learningOutcomes: newSections })
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newSections = [...formData.learningOutcomes]
                                    newSections[sectionIndex].outcomes = newSections[sectionIndex].outcomes.filter((_, i) => i !== outcomeIndex)
                                    setFormData({ ...formData, learningOutcomes: newSections })
                                  }}
                                  className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-600 rounded-md transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => {
                                const newSections = [...formData.learningOutcomes]
                                newSections[sectionIndex].outcomes.push('')
                                setFormData({ ...formData, learningOutcomes: newSections })
                              }}
                              className="flex items-center gap-2 px-3 py-1.5 text-xs text-blue-400 hover:text-blue-300 hover:bg-slate-600 rounded-md transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                              Add Outcome
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            learningOutcomes: [...formData.learningOutcomes, { id: `section-${Date.now()}`, title: '', icon: 'book', outcomes: [''] }]
                          })
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-slate-600 rounded-md transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add New Section
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Course Status
                        </label>
                        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-2">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            {STATUS_OPTIONS.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Max Enrollments
                        </label>
                        <Input
                          type="number"
                          min={0}
                          className="bg-slate-700 border-slate-600 text-white mt-2"
                          placeholder="Leave empty for unlimited"
                          value={formData.maxEnrollments}
                          onChange={(e) => setFormData({ ...formData, maxEnrollments: e.target.value })}
                        />
                        <p className="text-xs text-slate-400 mt-1">Maximum number of students (optional)</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Expiry Date
                        </label>
                        <Input
                          type="date"
                          className="bg-slate-700 border-slate-600 text-white mt-2"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        />
                        <p className="text-xs text-slate-400 mt-1">When course access expires (optional)</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Certificate Template
                        </label>
                        <Input
                          className="bg-slate-700 border-slate-600 text-white mt-2"
                          placeholder="Template name or ID"
                          value={formData.certificateTemplate}
                          onChange={(e) => setFormData({ ...formData, certificateTemplate: e.target.value })}
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-300">Course Options</label>
                        <div className="space-y-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setFormData({ ...formData, isPublished: !formData.isPublished })}
                            className={`w-full justify-start ${formData.isPublished ? 'bg-green-600 text-white border-green-600' : 'border-slate-600'}`}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {formData.isPublished ? 'Published' : 'Mark as Published'}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
                            className={`w-full justify-start ${formData.isFeatured ? 'bg-yellow-600 text-white border-yellow-600' : 'border-slate-600'}`}
                          >
                            <Star className="w-4 h-4 mr-2" />
                            {formData.isFeatured ? 'Featured Course' : 'Mark as Featured'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Course Thumbnail URL
                    </label>
                    <Input
                      className="bg-slate-700 border-slate-600 text-white mt-2"
                      placeholder="https://example.com/thumbnail.jpg"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    />
                    <p className="text-xs text-slate-400 mt-1">High-quality image (recommended: 1280x720px)</p>
                  </div>

                  {formData.thumbnail && (
                    <div className="border border-slate-600 rounded-lg p-4 bg-slate-900/50">
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Thumbnail Preview</label>
                      <div className="relative w-full h-48 rounded-lg overflow-hidden bg-slate-700">
                        <Image
                          src={formData.thumbnail}
                          alt="Course thumbnail preview"
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-700">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <AlertCircle className="w-4 h-4" />
                  Fields marked with * are required
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false)
                      setEditingCourse(null)
                      resetForm()
                    }}
                    className="border-slate-600 hover:bg-slate-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-slate-900">
                    <Save className="w-4 h-4 mr-2" />
                    {editingCourse ? 'Update Course' : 'Create Course'}
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}