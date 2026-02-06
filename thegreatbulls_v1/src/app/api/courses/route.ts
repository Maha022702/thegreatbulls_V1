import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET(req: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
            bio: true
          }
        },
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/courses - Starting course creation')

    const body = await request.json()
    console.log('Request body received:', { 
      title: body.title, 
      category: body.category,
      price: body.price,
      instructorName: body.instructorName 
    })

    const {
      title,
      subtitle = '',
      description,
      shortDescription = '',
      price,
      category,
      level = 'BEGINNER',
      instructorName,
      instructorBio = '',
      thumbnail = '',
      duration = 0,
      language = 'English',
      prerequisites = [],
      requirements = [],
      learningObjectives = [],
      whatYouWillLearn = [],
      learningOutcomes = null,
      courseOverview = '',
      courseTopics = [],
      skillsCovered = [],
      targetAudience = [],
      tags = [],
      status = 'DRAFT',
      isPublished = false,
      isFeatured = false,
      expiryDate = null,
      maxEnrollments = null,
      certificateTemplate = ''
    } = body

    // Validate required fields
    if (!title?.trim() || !description?.trim() || !price || !category?.trim() || !level?.trim()) {
      console.log('Validation failed - missing required fields')
      return NextResponse.json({ 
        error: 'Missing required fields',
        required: ['title', 'description', 'price', 'category', 'level']
      }, { status: 400 })
    }

    if (!instructorName?.trim()) {
      return NextResponse.json({ error: 'Instructor name is required' }, { status: 400 })
    }

    console.log('Validation passed, creating resources...')

    // Create or find category
    let categoryId: string | null = null
    try {
      const categoryRecord = await prisma.category.upsert({
        where: { name: category.trim() },
        update: {},
        create: {
          name: category.trim(),
          slug: category.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        }
      })
      categoryId = categoryRecord.id
      console.log('Category ready:', categoryId)
    } catch (categoryError) {
      console.error('Category creation error:', categoryError)
      categoryId = null
    }

    // Create unique slug for course
    const courseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Date.now().toString().slice(-6)

    // Create or find instructor
    const instructorEmail = `${instructorName.trim().toLowerCase().replace(/\s+/g, '.')}@instructor.local`
    let instructorId: string

    try {
      const instructor = await prisma.user.upsert({
        where: { email: instructorEmail },
        update: {
          name: instructorName.trim()
        },
        create: {
          email: instructorEmail,
          name: instructorName.trim(),
          password: await bcrypt.hash('password123', 10),
          role: 'INSTRUCTOR'
        }
      })
      instructorId = instructor.id
      console.log('Instructor ready:', instructorId)
    } catch (instructorError) {
      console.error('Instructor creation error:', instructorError)
      throw new Error(`Failed to create instructor: ${instructorError instanceof Error ? instructorError.message : 'Unknown error'}`)
    }

    // Create the course
    console.log('Creating course with slug:', courseSlug)
    const course = await prisma.course.create({
      data: {
        title: title.trim(),
        slug: courseSlug,
        subtitle: subtitle.trim(),
        description: description.trim(),
        shortDescription: shortDescription.trim(),
        price: parseFloat(price.toString()),
        categoryId,
        level: level.toUpperCase() as any,
        instructorId,
        thumbnail,
        duration: parseInt(duration.toString()) || 0,
        language,
        overview: courseOverview.trim() || null,
        courseTopics: (courseTopics || []).filter((t: string) => t.trim()),
        skillsCovered: (skillsCovered || []).filter((s: string) => s.trim()),
        prerequisites: (prerequisites || []).filter((p: string) => p.trim()),
        requirements: (requirements || []).filter((r: string) => r.trim()),
        whatYouWillLearn: (whatYouWillLearn || learningObjectives || []).filter((l: string) => l.trim()),
        learningOutcomes: learningOutcomes,
        targetAudience: (targetAudience || []).filter((a: string) => a.trim()),
        keywords: (tags || []).filter((t: string) => t.trim()),
        status: status.toUpperCase() as any,
        isPublished: Boolean(isPublished),
        isFeatured: Boolean(isFeatured),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        maxEnrollments: maxEnrollments ? parseInt(maxEnrollments.toString()) : null,
        certificateTemplate: certificateTemplate?.trim() || null
      }
    })

    console.log('Course created successfully:', course.id)
    return NextResponse.json(course, { status: 201 })

  } catch (error) {
    console.error('Error creating course:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ 
      error: 'Failed to create course',
      message: errorMessage 
    }, { status: 500 })
  }
}
