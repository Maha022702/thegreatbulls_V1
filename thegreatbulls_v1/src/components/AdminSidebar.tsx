'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { BarChart3, BookOpen, Calendar, FileText, MessageSquare, Users, Settings } from 'lucide-react'

const sidebarItems = [
  { href: '/admin', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/admin/webinars', label: 'Webinars', icon: Calendar },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <nav className="space-y-2 px-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              asChild
            >
              <Link href={item.href}>
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}