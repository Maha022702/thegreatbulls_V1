'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface Webinar {
  id: string
  title: string
  date: string
  link: string
  description?: string
}

export default function AdminWebinarsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [webinars, setWebinars] = useState<Webinar[]>([])
  const [loading, setLoading] = useState(true)
  const [editingWebinar, setEditingWebinar] = useState<Webinar | null>(null)
  const [formData, setFormData] = useState({ title: '', date: '', link: '', description: '' })

  useEffect(() => {
    if (status === 'unauthenticated' || session?.user.role !== 'admin') {
      router.push('/login')
    } else {
      fetchWebinars()
    }
  }, [status, session, router])

  const fetchWebinars = async () => {
    const res = await fetch('/api/webinars')
    const data = await res.json()
    setWebinars(data.map((w: any) => ({ ...w, date: new Date(w.date).toISOString().split('T')[0] })))
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingWebinar ? 'PUT' : 'POST'
    const body = editingWebinar ? { ...formData, id: editingWebinar.id } : formData

    await fetch('/api/webinars', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    fetchWebinars()
    setFormData({ title: '', date: '', link: '', description: '' })
    setEditingWebinar(null)
  }

  const handleEdit = (webinar: Webinar) => {
    setEditingWebinar(webinar)
    setFormData({
      title: webinar.title,
      date: webinar.date,
      link: webinar.link,
      description: webinar.description || '',
    })
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/webinars?id=${id}`, { method: 'DELETE' })
    fetchWebinars()
  }

  if (status === 'loading' || loading) return <div>Loading...</div>
  if (!session || session.user.role !== 'admin') return null

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Manage Webinars</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Webinar</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingWebinar ? 'Edit Webinar' : 'Add Webinar'}</DialogTitle>
                <DialogDescription>
                  {editingWebinar ? 'Update the webinar details.' : 'Create a new webinar.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <Button type="submit">{editingWebinar ? 'Update' : 'Create'}</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {webinars.map((webinar) => (
            <Card key={webinar.id}>
              <CardHeader>
                <CardTitle>{webinar.title}</CardTitle>
                <CardDescription>{webinar.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Date: {webinar.date}</p>
                <p>Link: {webinar.link}</p>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => handleEdit(webinar)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDelete(webinar.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}