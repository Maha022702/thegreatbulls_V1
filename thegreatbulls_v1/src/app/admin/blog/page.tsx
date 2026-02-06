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

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  readTime: number
  category: string
}

export default function AdminBlogPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({ title: '', content: '', excerpt: '', readTime: '', category: '' })

  useEffect(() => {
    if (status === 'unauthenticated' || session?.user.role !== 'admin') {
      router.push('/login')
    } else {
      fetchPosts()
    }
  }, [status, session, router])

  const fetchPosts = async () => {
    const res = await fetch('/api/blog')
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingPost ? 'PUT' : 'POST'
    const body = editingPost ? { ...formData, id: editingPost.id, readTime: parseInt(formData.readTime) } : { ...formData, readTime: parseInt(formData.readTime) }

    await fetch('/api/blog', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    fetchPosts()
    setFormData({ title: '', content: '', excerpt: '', readTime: '', category: '' })
    setEditingPost(null)
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      readTime: post.readTime.toString(),
      category: post.category,
    })
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/blog?id=${id}`, { method: 'DELETE' })
    fetchPosts()
  }

  if (status === 'loading' || loading) return <div>Loading...</div>
  if (!session || session.user.role !== 'admin') return null

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Manage Blog Posts</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Post</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingPost ? 'Edit Post' : 'Add Post'}</DialogTitle>
                <DialogDescription>
                  {editingPost ? 'Update the blog post.' : 'Create a new blog post.'}
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
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Input
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Input
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="readTime">Read Time (minutes)</Label>
                  <Input
                    id="readTime"
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit">{editingPost ? 'Update' : 'Create'}</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Category: {post.category}</p>
                <p>Read Time: {post.readTime} min</p>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => handleEdit(post)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDelete(post.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}