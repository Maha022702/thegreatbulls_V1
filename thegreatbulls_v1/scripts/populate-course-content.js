const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const courseContentData = {
  'price-action-mastery': {
    title: 'Price Action Mastery: Professional Trading Techniques',
    subtitle: 'Master the art of reading price movements and making profitable trading decisions',
    description: `Unlock the secrets of professional price action trading with our comprehensive course designed for serious traders. This intensive program combines classical chart analysis with modern market psychology to give you a complete edge in today's volatile markets.

Our expert instructors, with decades of combined experience in institutional trading floors, will guide you through proven methodologies used by hedge funds and proprietary trading firms. You'll learn to identify high-probability setups, manage risk effectively, and develop the mental discipline required for consistent profitability.

Whether you're transitioning from indicator-based trading or looking to refine your existing price action skills, this course provides the structured learning path you need to become a confident, profitable trader.`,
    shortDescription: 'Master professional price action techniques used by institutional traders worldwide.',
    courseOverview: `This comprehensive course takes you on a journey from basic price action concepts to advanced institutional trading strategies. You'll start with fundamental chart reading skills and progress through sophisticated analysis techniques that professional traders use daily.

The curriculum is structured to build your knowledge progressively, ensuring you develop both technical proficiency and the psychological resilience needed for successful trading. Each module includes practical exercises, real-market examples, and detailed case studies from actual trading scenarios.

By the end of this course, you'll have a complete toolkit for analyzing markets, identifying opportunities, and executing trades with confidence. You'll understand not just what to do, but why certain strategies work in different market conditions.`,
    courseTopics: [
      'Candlestick Pattern Recognition',
      'Support and Resistance Analysis',
      'Trend Identification and Trading',
      'Volume Price Analysis',
      'Market Structure Breakdown',
      'Entry and Exit Strategies',
      'Risk Management Techniques',
      'Trade Psychology and Discipline',
      'Multi-timeframe Analysis',
      'Institutional Order Flow',
      'Market Microstructure',
      'Advanced Pattern Combinations'
    ],
    skillsCovered: [
      'Chart Analysis',
      'Pattern Recognition',
      'Risk Assessment',
      'Position Sizing',
      'Trade Timing',
      'Market Psychology',
      'Discipline Development',
      'Performance Tracking'
    ],
    prerequisites: [
      'Basic understanding of financial markets',
      'Access to a trading platform',
      'Commitment to daily practice',
      'Basic computer skills'
    ],
    whatYouWillLearn: [
      'Master advanced candlestick patterns and their psychological significance',
      'Identify institutional support and resistance levels with precision',
      'Develop systematic approaches to trend trading and reversal strategies',
      'Understand volume-price relationships and their impact on market direction',
      'Apply multi-timeframe analysis for better trade timing and risk management',
      'Build mental discipline and emotional control for consistent trading performance',
      'Create comprehensive trading plans with clear entry, exit, and risk parameters',
      'Analyze market microstructure to understand order flow and liquidity'
    ],
    learningOutcomes: {
      technical: {
        title: 'Technical Analysis Mastery',
        icon: 'bar-chart',
        outcomes: [
          'Master advanced candlestick pattern recognition and interpretation',
          'Identify key support and resistance levels with institutional accuracy',
          'Apply volume-price analysis to understand market direction and strength',
          'Develop proficiency in multi-timeframe analysis techniques',
          'Understand market structure and how it influences price movement'
        ]
      },
      strategies: {
        title: 'Trading Strategy Development',
        icon: 'trending-up',
        outcomes: [
          'Create systematic entry and exit strategies based on price action',
          'Develop risk management protocols for different market conditions',
          'Build comprehensive trading plans with clear objectives and rules',
          'Learn position sizing techniques for optimal risk-adjusted returns',
          'Master trade timing using confluence of multiple price action signals'
        ]
      },
      risk: {
        title: 'Risk Management Excellence',
        icon: 'shield',
        outcomes: [
          'Implement proper position sizing for different account sizes',
          'Develop stop-loss placement strategies based on price action',
          'Create risk-reward ratios that ensure long-term profitability',
          'Build portfolio risk management across multiple positions',
          'Learn to manage drawdowns and maintain trading discipline'
        ]
      },
      psychology: {
        title: 'Trading Psychology & Discipline',
        icon: 'brain',
        outcomes: [
          'Develop mental discipline for consistent trading execution',
          'Overcome emotional biases that lead to poor trading decisions',
          'Build confidence in your trading methodology through practice',
          'Learn to handle losing streaks and maintain psychological resilience',
          'Create routines that support long-term trading success'
        ]
      },
      tools: {
        title: 'Professional Trading Tools',
        icon: 'zap',
        outcomes: [
          'Master professional charting platforms and their features',
          'Learn to use drawing tools for effective chart analysis',
          'Develop custom indicators based on price action principles',
          'Create trading checklists and routines for consistency',
          'Build performance tracking systems for continuous improvement'
        ]
      },
      execution: {
        title: 'Trade Execution Mastery',
        icon: 'target',
        outcomes: [
          'Execute trades with precision and discipline',
          'Manage open positions effectively during market hours',
          'Apply scaling techniques for larger position management',
          'Learn to exit positions at optimal profit targets',
          'Develop post-trade analysis routines for improvement'
        ]
      }
    },
    price: 29999,
    duration: 1800, // 30 hours
    level: 'INTERMEDIATE',
    maxEnrollments: 75,
    currentEnrollments: 23,
    isFeatured: true
  },
  'options-strategist-pro': {
    title: 'Options Trading Mastery: Advanced Strategies & Risk Management',
    subtitle: 'Transform your trading with professional options strategies and sophisticated risk management',
    description: `Elevate your trading career with our comprehensive Options Trading Mastery course. Designed for serious traders seeking to harness the power of options, this program covers everything from basic option mechanics to advanced multi-leg strategies used by professional traders.

Our expert instructors bring real-world experience from derivatives trading desks, teaching you proven strategies that consistently generate profits while managing risk effectively. You'll learn to think like a market maker, understanding the Greeks, volatility trading, and complex spread strategies.

Whether you're new to options or looking to refine your existing strategies, this course provides the knowledge and tools you need to trade options with confidence and precision.`,
    shortDescription: 'Master advanced options strategies and risk management techniques used by professional traders.',
    courseOverview: `This intensive course transforms you from an options novice to a sophisticated trader capable of navigating complex market conditions. Starting with fundamental option concepts, you'll progress through increasingly advanced strategies, learning to manage risk while maximizing profit potential.

The curriculum emphasizes practical application, with real-market examples and case studies from actual trading scenarios. You'll learn not just theoretical concepts, but proven methodologies that professional traders use to generate consistent returns.

By course completion, you'll have a complete options trading toolkit, understanding how to construct, manage, and exit complex positions across various market conditions.`,
    courseTopics: [
      'Options Basics and Terminology',
      'Understanding the Greeks',
      'Volatility Trading Strategies',
      'Spread Strategies and Arbitrage',
      'Risk Management Techniques',
      'Market Making Concepts',
      'Advanced Multi-leg Strategies',
      'Portfolio Hedging Techniques',
      'Earnings and Event Trading',
      'Tax Optimization Strategies',
      'Position Sizing and Scaling',
      'Performance Analytics'
    ],
    skillsCovered: [
      'Options Analysis',
      'Greeks Calculation',
      'Strategy Construction',
      'Risk Assessment',
      'Portfolio Management',
      'Market Timing',
      'Tax Planning',
      'Performance Tracking'
    ],
    prerequisites: [
      'Understanding of basic trading concepts',
      'Familiarity with financial markets',
      'Basic mathematics and probability',
      'Access to options trading platform',
      'Commitment to learning complex strategies'
    ],
    whatYouWillLearn: [
      'Master the fundamental mechanics of options trading and terminology',
      'Understand and apply the Greeks (Delta, Gamma, Theta, Vega, Rho) in real trading',
      'Develop sophisticated volatility-based trading strategies',
      'Construct and manage complex multi-leg spread positions',
      'Implement advanced risk management techniques for options portfolios',
      'Apply market making concepts to improve trading profitability',
      'Create comprehensive hedging strategies for portfolio protection',
      'Optimize tax efficiency in options trading strategies'
    ],
    learningOutcomes: {
      technical: {
        title: 'Options Technical Mastery',
        icon: 'bar-chart',
        outcomes: [
          'Master options pricing models and theoretical valuation',
          'Calculate and interpret all Greek values accurately',
          'Understand implied vs realized volatility relationships',
          'Analyze option chains for optimal strategy selection',
          'Apply technical analysis to options trading decisions'
        ]
      },
      strategies: {
        title: 'Advanced Strategy Development',
        icon: 'trending-up',
        outcomes: [
          'Construct complex multi-leg spread strategies',
          'Develop volatility-based trading approaches',
          'Create arbitrage opportunities in mispriced options',
          'Build earnings trading strategies with defined risk',
          'Design custom strategies for specific market conditions'
        ]
      },
      risk: {
        title: 'Professional Risk Management',
        icon: 'shield',
        outcomes: [
          'Implement position sizing for options strategies',
          'Manage gamma and delta exposure effectively',
          'Create stop-loss mechanisms for options positions',
          'Develop portfolio-level risk management protocols',
          'Build contingency plans for adverse market moves'
        ]
      },
      psychology: {
        title: 'Options Trading Psychology',
        icon: 'brain',
        outcomes: [
          'Overcome fear of options complexity and time decay',
          'Develop patience for position management and adjustment',
          'Build confidence in advanced strategy implementation',
          'Learn to handle the emotional aspects of leveraged trading',
          'Create mental frameworks for complex decision-making'
        ]
      },
      tools: {
        title: 'Professional Options Tools',
        icon: 'zap',
        outcomes: [
          'Master options analysis platforms and software',
          'Use advanced charting tools for options strategies',
          'Apply risk management calculators and simulators',
          'Create custom screening tools for opportunity identification',
          'Build automated monitoring systems for position management'
        ]
      },
      execution: {
        title: 'Precision Execution',
        icon: 'target',
        outcomes: [
          'Execute complex orders with accuracy and speed',
          'Manage position adjustments during market hours',
          'Apply scaling techniques for larger position management',
          'Exit positions at optimal points with minimal slippage',
          'Document and analyze all trading decisions for improvement'
        ]
      }
    },
    price: 49999,
    duration: 2400, // 40 hours
    level: 'ADVANCED',
    maxEnrollments: 50,
    currentEnrollments: 18,
    isFeatured: true
  },
  'advanced-intraday-trading': {
    title: 'Advanced Intraday Trading Mastery',
    subtitle: 'Master the art of day trading with proven strategies and risk management techniques',
    description: `Master the art of intraday trading with our comprehensive Advanced Intraday Trading course. This intensive program is designed for traders who want to excel in fast-paced day trading environments, combining technical analysis, market microstructure, and advanced execution techniques.

Our expert instructors, with extensive experience in proprietary trading firms and market making, will guide you through proven intraday strategies that consistently generate profits. You'll learn to read order flow, understand market microstructure, and execute trades with institutional precision.

Whether you're transitioning to full-time day trading or looking to enhance your intraday skills, this course provides the comprehensive knowledge and practical tools you need to succeed in competitive day trading markets.`,
    shortDescription: 'Master advanced intraday trading strategies used by professional day traders and proprietary firms.',
    courseOverview: `This advanced course takes you deep into the world of professional intraday trading, covering everything from market microstructure to sophisticated execution strategies. You'll learn to think like institutional traders, understanding how markets truly work at the microstructural level.

The curriculum emphasizes practical, actionable strategies that work in real market conditions. You'll study actual trading scenarios, learn to read order flow, and develop the mental toughness required for successful day trading.

By the end of this course, you'll have a complete intraday trading system, with the knowledge and skills to consistently identify and capitalize on intraday opportunities while managing risk effectively.`,
    courseTopics: [
      'Market Microstructure and Order Flow',
      'Level 2 and Time & Sales Analysis',
      'Intraday Chart Patterns and Setups',
      'Scalping and Momentum Strategies',
      'Gap Trading and Opening Range Breakouts',
      'News and Event-Based Trading',
      'Advanced Risk Management',
      'Position Sizing and Scaling',
      'Trade Execution Excellence',
      'Performance Tracking and Analytics',
      'Market Hours Strategy Optimization',
      'Technology and Platform Mastery'
    ],
    skillsCovered: [
      'Order Flow Analysis',
      'Level 2 Reading',
      'Scalping Techniques',
      'Risk Management',
      'Trade Execution',
      'Market Timing',
      'Performance Analysis',
      'Technology Utilization'
    ],
    prerequisites: [
      'Basic trading knowledge and experience',
      'Understanding of technical analysis',
      'Access to real-time market data and fast execution',
      'Discipline and commitment to daily trading routine',
      'Minimum account size appropriate for day trading'
    ],
    whatYouWillLearn: [
      'Master market microstructure and understand how institutional orders move markets',
      'Read Level 2 data and Time & Sales to identify institutional activity',
      'Develop sophisticated intraday chart patterns and high-probability setups',
      'Apply scalping techniques for consistent small profits with minimal risk',
      'Trade gap openings and opening range breakouts with precision',
      'Navigate news events and earnings releases for profitable opportunities',
      'Implement advanced risk management specific to intraday trading',
      'Scale positions effectively as intraday opportunities develop'
    ],
    learningOutcomes: {
      technical: {
        title: 'Market Microstructure Mastery',
        icon: 'bar-chart',
        outcomes: [
          'Master Level 2 and Time & Sales analysis for order flow reading',
          'Understand market maker behavior and institutional order patterns',
          'Identify liquidity zones and optimal execution points',
          'Read order book dynamics and price action relationships',
          'Apply volume profile analysis to intraday trading decisions'
        ]
      },
      strategies: {
        title: 'Intraday Strategy Development',
        icon: 'trending-up',
        outcomes: [
          'Develop systematic scalping strategies with defined risk parameters',
          'Create momentum-based trading systems for fast-moving markets',
          'Build gap trading methodologies with statistical edge',
          'Design opening range breakout strategies with proper risk management',
          'Construct news and event-based trading approaches'
        ]
      },
      risk: {
        title: 'Intraday Risk Management',
        icon: 'shield',
        outcomes: [
          'Implement position sizing for high-frequency day trading',
          'Create stop-loss strategies that work in fast markets',
          'Manage daily loss limits and maximum drawdown controls',
          'Develop position scaling protocols for intraday opportunities',
          'Build contingency plans for extreme market conditions'
        ]
      },
      psychology: {
        title: 'Day Trading Psychology',
        icon: 'brain',
        outcomes: [
          'Develop mental discipline for high-frequency trading',
          'Overcome emotional challenges of rapid decision-making',
          'Build focus and concentration for extended trading sessions',
          'Learn to handle the stress of intraday market fluctuations',
          'Create routines that support consistent daily performance'
        ]
      },
      tools: {
        title: 'Professional Trading Technology',
        icon: 'zap',
        outcomes: [
          'Master high-speed execution platforms and order types',
          'Utilize advanced charting tools for intraday analysis',
          'Apply real-time scanners and alert systems',
          'Create custom indicators for specific intraday strategies',
          'Build automated trade management and monitoring systems'
        ]
      },
      execution: {
        title: 'Precision Trade Execution',
        icon: 'target',
        outcomes: [
          'Execute trades with institutional speed and accuracy',
          'Manage multiple positions simultaneously during market hours',
          'Apply advanced order types for optimal execution',
          'Scale into and out of positions with minimal market impact',
          'Document and review all trades for continuous improvement'
        ]
      }
    },
    price: 24999,
    duration: 2400, // 40 hours
    level: 'ADVANCED',
    maxEnrollments: 50,
    currentEnrollments: 32,
    isFeatured: true
  }
};

async function updateCoursesWithContent() {
  try {
    console.log('🚀 Starting course content update...');

    for (const [slug, content] of Object.entries(courseContentData)) {
      console.log(`\n📝 Updating course: ${content.title}`);

      const course = await prisma.course.findUnique({
        where: { slug }
      });

      if (!course) {
        console.log(`❌ Course not found: ${slug}`);
        continue;
      }

      await prisma.course.update({
        where: { id: course.id },
        data: {
          title: content.title,
          subtitle: content.subtitle,
          description: content.description,
          shortDescription: content.shortDescription,
          overview: content.courseOverview,
          courseTopics: content.courseTopics,
          skillsCovered: content.skillsCovered,
          prerequisites: content.prerequisites,
          whatYouWillLearn: content.whatYouWillLearn,
          learningOutcomes: content.learningOutcomes,
          price: content.price,
          duration: content.duration,
          level: content.level,
          maxEnrollments: content.maxEnrollments,
          currentEnrollments: content.currentEnrollments,
          isFeatured: content.isFeatured
        }
      });

      console.log(`✅ Successfully updated: ${content.title}`);
    }

    console.log('\n🎉 All courses updated successfully!');

  } catch (error) {
    console.error('❌ Error updating courses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateCoursesWithContent();