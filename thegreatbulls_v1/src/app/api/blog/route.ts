import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: Fetch all blog posts
export async function GET() {
  try {
    const posts = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

// POST: Create a new blog post
export async function POST(req: NextRequest) {
  try {
    const { title, slug, content, excerpt, category, authorId } = await req.json()
    const post = await prisma.blog.create({
      data: { title, slug, content, excerpt, category, authorId },
    })
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}

// PUT: Update a blog post
export async function PUT(req: NextRequest) {
  try {
    const { id, title, slug, content, excerpt, category } = await req.json()
    const post = await prisma.blog.update({
      where: { id },
      data: { title, slug, content, excerpt, category },
    })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

// DELETE: Delete a blog post
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    await prisma.blog.delete({ where: { id } })
    return NextResponse.json({ message: 'Blog post deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}