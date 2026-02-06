const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateCourse() {
  try {
    // Find the course by slug
    const course = await prisma.course.findFirst({
      where: { slug: 'advanced-intraday-trading' }
    });

    if (!course) {
      console.log('Course not found. Creating new course...');
      return;
    }

    console.log('Found course:', course.title);
    console.log('Updating with production-ready content...');

    // Update with production-ready content
    const updated = await prisma.course.update({
      where: { id: course.id },
      data: {
        title: 'Advanced Intraday Trading Mastery',
        subtitle: 'Master the art of day trading with proven strategies and risk management techniques',
        shortDescription: 'Learn professional intraday trading strategies used by successful traders to generate consistent daily profits in the Indian stock market.',
        description: `This comprehensive advanced intraday trading program is designed to transform you into a confident and profitable day trader. Over 40 hours of intensive training, you'll learn everything from market microstructure to advanced order flow analysis.

Our curriculum combines deep theoretical knowledge with practical, real-world application. Each module includes live market examples, backtested strategies, and hands-on exercises that you can apply immediately in your trading.

What sets this course apart is our focus on institutional-grade techniques adapted for retail traders. You'll learn how smart money operates, how to identify high-probability setups, and most importantly, how to manage risk like a professional.

By the end of this course, you'll have a complete trading system that you can use to generate consistent income from the markets. We don't promise overnight riches, but rather a systematic, disciplined approach to intraday trading that works in all market conditions.`,
        
        price: 24999,
        originalPrice: 39999,
        duration: 2400, // 40 hours
        level: 'ADVANCED',
        language: 'Hindi & English',
        isFeatured: true,
        maxEnrollments: 50,
        currentEnrollments: 32,
        
        whatYouWillLearn: [
          'Master 15+ high-probability intraday trading setups',
          'Understand order flow and volume profile analysis',
          'Implement institutional-grade risk management',
          'Read market sentiment through price action',
          'Execute trades with precision entry and exit points',
          'Use advanced technical indicators effectively',
          'Develop your own profitable trading system',
          'Manage emotions and trading psychology'
        ],
        
        learningOutcomes: {
          "technical": {
            "title": "Technical Analysis Mastery",
            "icon": "bar-chart",
            "outcomes": [
              "Advanced candlestick patterns and price action reading",
              "Support and resistance zones identification",
              "Volume profile and market profile analysis",
              "Order flow analysis and tape reading basics",
              "Multiple timeframe analysis for confirmation",
              "Chart patterns for intraday trading"
            ]
          },
          "strategies": {
            "title": "Proven Trading Strategies",
            "icon": "trending-up",
            "outcomes": [
              "Opening range breakout strategy",
              "VWAP-based mean reversion setups",
              "Gap and go momentum trading",
              "Pullback trading in trending markets",
              "Range-bound scalping techniques",
              "News-based event trading"
            ]
          },
          "risk": {
            "title": "Risk Management",
            "icon": "shield",
            "outcomes": [
              "Position sizing based on account capital",
              "Stop loss placement for maximum protection",
              "Risk-reward ratio optimization (1:2 minimum)",
              "Daily loss limits and profit targets",
              "Portfolio heat management",
              "Drawdown recovery strategies"
            ]
          },
          "psychology": {
            "title": "Trading Psychology",
            "icon": "brain",
            "outcomes": [
              "Overcome fear and greed in trading",
              "Develop disciplined execution habits",
              "Handle losing streaks professionally",
              "Maintain emotional control during volatility",
              "Build unshakeable trading confidence",
              "Create and follow your trading plan"
            ]
          },
          "tools": {
            "title": "Trading Tools & Technology",
            "icon": "zap",
            "outcomes": [
              "Setup professional trading workstation",
              "Use market scanners for stock selection",
              "Leverage trading software and platforms",
              "Create custom indicators and alerts",
              "Maintain detailed trade journals",
              "Automate repetitive tasks"
            ]
          },
          "execution": {
            "title": "Live Market Execution",
            "icon": "target",
            "outcomes": [
              "Watch live trade setups and executions",
              "Learn market opening strategies",
              "Handle news and volatility events",
              "Scale in and out of positions",
              "Manage multiple positions simultaneously",
              "Adjust stops and take profits dynamically"
            ]
          }
        }
      }
    });

    console.log('✅ Course updated successfully!');
    console.log('Title:', updated.title);
    console.log('Price: ₹' + updated.price);
    console.log('Duration:', updated.duration, 'minutes');
    console.log('Enrollments:', updated.currentEnrollments, '/', updated.maxEnrollments);
    
  } catch (error) {
    console.error('❌ Error updating course:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateCourse();
