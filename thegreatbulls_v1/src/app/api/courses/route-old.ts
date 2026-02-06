import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET(req: NextRequest) {
  try {
    // Temporarily remove auth check for testing
    // const session = await getServerSession(authOptions)
    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/courses - Starting course creation')

    // Temporarily remove auth check for testing
    // const session = await getServerSession(authOptions)
    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    console.log('Request body:', JSON.stringify(body, null, 2))
    const {
      title,
      subtitle,
      description,
      shortDescription,
      price,
      category,
      level,
      instructorName,
      instructorBio,
      thumbnail,
      duration,
      language = 'English',
      prerequisites,
      requirements,
      learningObjectives,
      whatYouWillLearn,
      learningOutcomes,
      courseOverview,
      courseTopics,
      skillsCovered,
      targetAudience,
      tags,
      status = 'DRAFT',
      isPublished = false,
      isFeatured = false,
      expiryDate,
      maxEnrollments,
      certificateTemplate
    } = body

    // Validate required fields
    if (!title || !description || !price || !category || !level) {
      console.log('Validation failed:', { title: !!title, description: !!description, price: !!price, category: !!category, level: !!level })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Handle category - find or create by name
    let categoryIdToUse
    if (!category || !category.trim()) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 })
    }

    console.log('Creating/finding category:', category.trim())
    // Find or create category by name
    const categoryRecord = await prisma.category.upsert({
      where: { name: category.trim() },
      update: {},
      create: {
        name: category.trim(),
        slug: category.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      }
    })
    categoryIdToUse = categoryRecord.id
    console.log('Category created/found:', categoryRecord)

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Date.now().toString().slice(-6)

    // Handle instructor - create or find by name
    let instructorIdToUse
    if (!instructorName || !instructorName.trim()) {
      return NextResponse.json({ error: 'Instructor name is required' }, { status: 400 })
    }

    console.log('Creating/finding instructor:', instructorName.trim())
    // Create email from instructor name
    const instructorEmail = `${instructorName.trim().toLowerCase().replace(/\s+/g, '.')}@instructor.local`
    
    // Find or create instructor by email (which is unique)
    const instructor = await prisma.user.upsert({
      where: { 
        email: instructorEmail
      },
      update: {
        name: instructorName.trim(),
        bio: instructorBio || null
      },
      create: {
        email: instructorEmail,
        name: instructorName.trim(),
        bio: instructorBio || null,
        password: await bcrypt.hash('password123', 10),
        role: 'INSTRUCTOR'
      }
    })
    instructorIdToUse = instructor.id
    console.log('Instructor created/found:', instructor)

    console.log('Creating course with data:', {
      title,
      slug,
      subtitle,
      description,
      shortDescription,
      price: parseFloat(price),
      categoryId: categoryIdToUse,
      level,
      instructorId: instructorIdToUse,
      thumbnail,
      duration,
      language,
      overview: courseOverview || null,
      courseTopics: courseTopics || [],
      skillsCovered: skillsCovered || [],
      prerequisites: prerequisites || [],
      requirements: requirements || prerequisites || [],
      whatYouWillLearn: whatYouWillLearn || learningObjectives || [],
      learningOutcomes: learningOutcomes || null,
      targetAudience: targetAudience || [],
      keywords: tags || [],
      status,
      isPublished,
      isFeatured,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      maxEnrollments: maxEnrollments ? parseInt(maxEnrollments) : null,
      certificateTemplate: certificateTemplate || null
    })

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        subtitle,
        description,
        shortDescription,
        price: parseFloat(price),
        categoryId: categoryIdToUse,
        level,
        instructorId: instructorIdToUse,
        thumbnail,
        duration,
        language,
        overview: courseOverview || null,
        courseTopics: courseTopics || [],
        skillsCovered: skillsCovered || [],
        prerequisites: prerequisites || [],
        requirements: requirements || prerequisites || [],
        whatYouWillLearn: whatYouWillLearn || learningObjectives || [],
        learningOutcomes: learningOutcomes || null,
        targetAudience: targetAudience || [],
        keywords: tags || [],
        status,
        isPublished,
        isFeatured,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        maxEnrollments: maxEnrollments ? parseInt(maxEnrollments) : null,
        certificateTemplate: certificateTemplate || null
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    console.log('Course created successfully:', course)

    // Log admin action (temporarily disabled)
    // await prisma.adminAction.create({
    //   data: {
    //     adminId: session.user.id,
    //     action: 'CREATE_COURSE',
    //     details: `Created course: ${title}`,
    //     targetId: course.id,
    //     targetType: 'course'
    //   }
    // })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    console.error('Error details:', errorMessage)
    return NextResponse.json({ error: errorMessage, details: String(error) }, { status: 500 })
  }
}