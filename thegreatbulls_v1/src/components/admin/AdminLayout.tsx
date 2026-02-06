'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  Menu,
  GraduationCap,
  CreditCard,
  MessageSquare,
  Bell,
  Shield,
  TrendingUp,
  Award,
  Tag,
  FolderOpen
} from 'lucide-react'

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'Overview and analytics'
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
    description: 'User management'
  },
  {
    title: 'Courses',
    href: '/admin/courses',
    icon: BookOpen,
    description: 'Course management'
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: FileText,
    description: 'Blog & content management'
  },
  {
    title: 'Categories',
    href: '/admin/categories',
    icon: Tag,
    description: 'Course categories'
  },
  {
    title: 'Enrollments',
    href: '/admin/enrollments',
    icon: GraduationCap,
    description: 'Student enrollments'
  },
  {
    title: 'Payments',
    href: '/admin/payments',
    icon: CreditCard,
    description: 'Payment management'
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    description: 'Reports & insights'
  },
  {
    title: 'Discussions',
    href: '/admin/discussions',
    icon: MessageSquare,
    description: 'Community management'
  },
  {
    title: 'Notifications',
    href: '/admin/notifications',
    icon: Bell,
    description: 'System notifications'
  },
  {
    title: 'Certificates',
    href: '/admin/certificates',
    icon: Award,
    description: 'Certificate management'
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'System settings'
  }
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-yellow-400" />
          <span className="text-yellow-400">Admin Panel</span>
        </Link>
      </div>
      <nav className="grid items-start px-2 py-4 text-sm font-medium lg:px-4">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-slate-800",
                isActive && "bg-slate-800 text-yellow-400"
              )}
            >
              <item.icon className="h-4 w-4" />
              <div className="flex flex-col">
                <span>{item.title}</span>
                <span className="text-xs text-slate-500">{item.description}</span>
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-slate-900 md:block">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-slate-900 px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold text-white">
              {adminNavItems.find(item => item.href === pathname)?.title || 'Admin Panel'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              <Link href="/">← Back to Site</Link>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  )
}