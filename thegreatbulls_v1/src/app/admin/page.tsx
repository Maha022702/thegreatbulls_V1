'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AdminLayout } from '@/components/admin/AdminLayout'
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  GraduationCap,
  Star,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Settings
} from 'lucide-react'
import { motion } from 'framer-motion'

// Mock data - replace with real API calls
const stats = [
  {
    title: 'Total Users',
    value: '12,847',
    change: '+12.5%',
    changeType: 'positive',
    icon: Users,
    description: 'Active registered users'
  },
  {
    title: 'Total Courses',
    value: '156',
    change: '+8.2%',
    changeType: 'positive',
    icon: BookOpen,
    description: 'Published courses'
  },
  {
    title: 'Total Revenue',
    value: '₹2,847,500',
    change: '+15.3%',
    changeType: 'positive',
    icon: DollarSign,
    description: 'This month'
  },
  {
    title: 'Active Enrollments',
    value: '8,932',
    change: '+22.1%',
    changeType: 'positive',
    icon: GraduationCap,
    description: 'Current students'
  }
]

const recentActivity = [
  {
    id: 1,
    type: 'user_registration',
    message: 'New user registered: rajesh.kumar@email.com',
    time: '2 minutes ago',
    status: 'success'
  },
  {
    id: 2,
    type: 'course_published',
    message: 'Course "Advanced Options Trading" published',
    time: '15 minutes ago',
    status: 'success'
  },
  {
    id: 3,
    type: 'payment',
    message: 'Payment received: ₹15,000 for Price Action Mastery',
    time: '1 hour ago',
    status: 'success'
  },
  {
    id: 4,
    type: 'enrollment',
    message: 'New enrollment: Options Strategist Pro',
    time: '2 hours ago',
    status: 'info'
  },
  {
    id: 5,
    type: 'review',
    message: 'New 5-star review for BankNifty Intraday course',
    time: '3 hours ago',
    status: 'success'
  }
]

const topCourses = [
  {
    id: 1,
    title: 'Price Action Mastery',
    enrollments: 2847,
    revenue: 4270500,
    rating: 4.9,
    status: 'published'
  },
  {
    id: 2,
    title: 'Options Strategist Pro',
    enrollments: 1923,
    revenue: 3846000,
    rating: 4.8,
    status: 'published'
  },
  {
    id: 3,
    title: 'Advanced Intraday Trading',
    enrollments: 1247,
    revenue: 3741000,
    rating: 4.9,
    status: 'published'
  }
]

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 mt-1">Welcome back! Here's what's happening with your platform.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-green-500 text-green-400">
              <Activity className="w-3 h-3 mr-1" />
              All Systems Operational
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="flex items-center text-xs text-slate-400 mt-1">
                    <span className={`flex items-center ${
                      stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </span>
                    <span className="ml-2">{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Latest platform activities and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-700/50">
                      <div className={`mt-0.5 ${
                        activity.status === 'success' ? 'text-green-400' :
                        activity.status === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                      }`}>
                        {activity.status === 'success' ? <CheckCircle className="w-4 h-4" /> :
                         activity.status === 'warning' ? <AlertCircle className="w-4 h-4" /> :
                         <Clock className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{activity.message}</p>
                        <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-slate-600 text-slate-300 hover:bg-slate-700">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Performing Courses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Top Courses
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Best performing courses this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCourses.map((course, index) => (
                    <div key={course.id} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {course.title}
                        </p>
                        <div className="flex items-center text-xs text-slate-400">
                          <Users className="w-3 h-3 mr-1" />
                          {course.enrollments.toLocaleString()} students
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-400">
                          ₹{(course.revenue / 100000).toFixed(1)}L
                        </div>
                        <div className="flex items-center text-xs text-yellow-400">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          {course.rating}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-slate-600 text-slate-300 hover:bg-slate-700">
                  View All Courses
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Quick Actions</CardTitle>
              <CardDescription className="text-slate-400">
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button className="h-20 flex-col bg-slate-700 hover:bg-slate-600 border border-slate-600">
                  <BookOpen className="w-6 h-6 mb-2" />
                  Create Course
                </Button>
                <Button className="h-20 flex-col bg-slate-700 hover:bg-slate-600 border border-slate-600">
                  <Users className="w-6 h-6 mb-2" />
                  Add User
                </Button>
                <Button className="h-20 flex-col bg-slate-700 hover:bg-slate-600 border border-slate-600">
                  <Eye className="w-6 h-6 mb-2" />
                  View Reports
                </Button>
                <Button className="h-20 flex-col bg-slate-700 hover:bg-slate-600 border border-slate-600">
                  <Settings className="w-6 h-6 mb-2" />
                  System Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  )
}