const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCourseData() {
  try {
    const course = await prisma.course.findFirst({
      where: { slug: 'advanced-intraday-trading' }
    });

    if (!course) {
      console.log('❌ Course not found');
      return;
    }

    console.log('\n========== COURSE DATA IN DATABASE ==========\n');
    console.log('Title:', course.title);
    console.log('\nWhat You Will Learn (Current in DB):');
    console.log(JSON.stringify(course.whatYouWillLearn, null, 2));
    
    console.log('\n========== END ==========\n');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCourseData();
