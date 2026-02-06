import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@thegreatbulls.com' },
    update: {},
    create: {
      email: 'admin@thegreatbulls.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

  // Create instructors
  const instructor1 = await prisma.user.upsert({
    where: { email: 'rajesh@thegreatbulls.com' },
    update: {},
    create: {
      email: 'rajesh@thegreatbulls.com',
      name: 'Rajesh Kumar',
      password: await bcrypt.hash('password123', 10),
      role: 'INSTRUCTOR'
    }
  })

  const instructor2 = await prisma.user.upsert({
    where: { email: 'priya@thegreatbulls.com' },
    update: {},
    create: {
      email: 'priya@thegreatbulls.com',
      name: 'Priya Sharma',
      password: await bcrypt.hash('password123', 10),
      role: 'INSTRUCTOR'
    }
  })

  // Create courses
  const course1 = await prisma.course.upsert({
    where: { slug: 'price-action-mastery' },
    update: {},
    create: {
      title: 'Price Action Mastery',
      slug: 'price-action-mastery',
      description: 'Master the art of price action trading with advanced techniques and strategies.',
      price: 9999,
      level: 'INTERMEDIATE',
      instructorId: instructor1.id,
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
      status: 'PUBLISHED',
      language: 'English',
      duration: 8 * 60 // 8 weeks in minutes
    }
  })

  const course2 = await prisma.course.upsert({
    where: { slug: 'options-strategist-pro' },
    update: {},
    create: {
      title: 'Options Strategist Pro',
      slug: 'options-strategist-pro',
      description: 'Advanced options trading strategies for professional traders.',
      price: 14999,
      level: 'ADVANCED',
      instructorId: instructor2.id,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      status: 'PUBLISHED',
      language: 'English',
      duration: 12 * 60
    }
  })

  const course3 = await prisma.course.upsert({
    where: { slug: 'advanced-intraday-trading' },
    update: {},
    create: {
      title: 'Advanced Intraday Trading',
      slug: 'advanced-intraday-trading',
      description: 'Master intraday trading with proven strategies and risk management.',
      price: 19999,
      level: 'EXPERT',
      instructorId: instructor1.id,
      thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop',
      status: 'DRAFT',
      language: 'English',
      duration: 16 * 60
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log('Created users:', { admin: admin.email, instructor1: instructor1.email, instructor2: instructor2.email })
  console.log('Created courses:', { course1: course1.title, course2: course2.title, course3: course3.title })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })