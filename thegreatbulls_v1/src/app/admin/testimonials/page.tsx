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

interface Testimonial {
  id: string
  name: string
  quote: string
  image?: string
  rating?: number
}

export default function AdminTestimonialsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({ name: '', quote: '', image: '', rating: '' })

  useEffect(() => {
    if (status === 'unauthenticated' || session?.user.role !== 'admin') {
      router.push('/login')
    } else {
      fetchTestimonials()
    }
  }, [status, session, router])

  const fetchTestimonials = async () => {
    const res = await fetch('/api/testimonials')
    const data = await res.json()
    setTestimonials(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingTestimonial ? 'PUT' : 'POST'
    const body = editingTestimonial ? { ...formData, id: editingTestimonial.id, rating: parseInt(formData.rating) } : { ...formData, rating: parseInt(formData.rating) }

    await fetch('/api/testimonials', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    fetchTestimonials()
    setFormData({ name: '', quote: '', image: '', rating: '' })
    setEditingTestimonial(null)
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      quote: testimonial.quote,
      image: testimonial.image || '',
      rating: testimonial.rating?.toString() || '',
    })
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' })
    fetchTestimonials()
  }

  if (status === 'loading' || loading) return <div>Loading...</div>
  if (!session || session.user.role !== 'admin') return null

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Manage Testimonials</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Testimonial</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
                <DialogDescription>
                  {editingTestimonial ? 'Update the testimonial.' : 'Create a new testimonial.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="quote">Quote</Label>
                  <Input
                    id="quote"
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  />
                </div>
                <Button type="submit">{editingTestimonial ? 'Update' : 'Create'}</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
                <CardDescription>{testimonial.quote}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Rating: {testimonial.rating}/5</p>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => handleEdit(testimonial)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDelete(testimonial.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}