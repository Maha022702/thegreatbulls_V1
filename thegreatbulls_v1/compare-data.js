const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function compareData() {
  try {
    const course = await prisma.course.findFirst({
      where: { slug: 'advanced-intraday-trading' }
    });

    if (!course) {
      console.log('❌ Course not found');
      return;
    }

    console.log('\n========== DATA COMPARISON ==========\n');
    console.log('🔍 Current Course in Database:');
    console.log('Title:', course.title);
    console.log('Slug:', course.slug);
    
    console.log('\n📋 What You Will Learn (Simple Array):');
    if (course.whatYouWillLearn && course.whatYouWillLearn.length > 0) {
      course.whatYouWillLearn.forEach((item, i) => {
        console.log(`  ${i + 1}. ${item}`);
      });
    } else {
      console.log('  (EMPTY)');
    }

    console.log('\n🎓 Learning Outcomes (Structured):');
    if (course.learningOutcomes && Object.keys(course.learningOutcomes).length > 0) {
      Object.entries(course.learningOutcomes).forEach(([key, section]) => {
        console.log(`\n  ${section.title}:`);
        if (section.outcomes && Array.isArray(section.outcomes)) {
          section.outcomes.forEach((outcome, i) => {
            console.log(`    ${i + 1}. ${outcome}`);
          });
        }
      });
    } else {
      console.log('  (EMPTY)');
    }

    console.log('\n========== END ==========\n');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

compareData();
