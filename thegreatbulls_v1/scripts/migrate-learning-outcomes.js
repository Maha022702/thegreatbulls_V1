// This script migrates courses to ensure learningOutcomes are properly structured
// It converts whatYouWillLearn simple array to structured learningOutcomes JSON if needed

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function migrateLearningOutcomes() {
  try {
    const courses = await prisma.course.findMany()
    
    console.log(`Found ${courses.length} courses to check...`)
    
    let migrated = 0
    
    for (const course of courses) {
      const hasSimpleArray = course.whatYouWillLearn && course.whatYouWillLearn.length > 0
      const hasStructuredJson = course.learningOutcomes && Object.keys(course.learningOutcomes).length > 0
      
      // If we have simple array but no structured JSON, create it
      if (hasSimpleArray && !hasStructuredJson) {
        console.log(`\nMigrating: ${course.title}`)
        console.log(`  Simple array items: ${course.whatYouWillLearn.length}`)
        
        const outcomes = course.whatYouWillLearn.filter(item => item && item.trim())
        
        // Group outcomes into sections
        const learningOutcomes = {
          'core-concepts': {
            title: 'Core Concepts & Fundamentals',
            icon: 'book',
            outcomes: outcomes.slice(0, Math.ceil(outcomes.length / 2))
          },
          'advanced-skills': {
            title: 'Advanced Skills & Techniques',
            icon: 'star',
            outcomes: outcomes.slice(Math.ceil(outcomes.length / 2))
          }
        }
        
        await prisma.course.update({
          where: { id: course.id },
          data: { learningOutcomes }
        })
        
        console.log(`  ✓ Created structured learning outcomes with ${Object.keys(learningOutcomes).length} sections`)
        migrated++
      }
    }
    
    console.log(`\n✓ Migration complete! Updated ${migrated} courses.`)
    
  } catch (error) {
    console.error('Migration error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateLearningOutcomes()
