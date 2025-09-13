import { Decision } from '@/types/game'

export const gameScenarios: Decision[] = [
  {
    id: 'education-path',
    age: 18,
    category: 'Education',
    title: 'Your Educational Journey',
    description: 'You\'ve just graduated high school. How do you want to pursue your education and career?',
    choices: [
      {
        id: 'college-degree',
        text: 'Go to college (4-year degree)',
        impact: {
          debtChange: 40000,
          incomeChange: 0, // Will increase after graduation
          expensesChange: 800
        },
        explanation: 'College provides higher earning potential but comes with student debt.',
        educationalTip: 'College graduates earn on average $1.2M more over their lifetime, but student loan debt can take 10-20 years to pay off. Consider in-state tuition and community college for first two years to reduce costs.',
        riskLevel: 'medium',
        timeHorizon: 'long'
      },
      {
        id: 'community-college',
        text: 'Start at community college',
        impact: {
          debtChange: 15000,
          incomeChange: 0,
          expensesChange: 400
        },
        explanation: 'More affordable education path with lower debt burden.',
        educationalTip: 'Community college can save you $20,000+ compared to 4-year universities. Many successful people started at community college and transferred to complete their degree.',
        riskLevel: 'low',
        timeHorizon: 'medium'
      },
      {
        id: 'trade-school',
        text: 'Attend trade school',
        impact: {
          debtChange: 20000,
          incomeChange: 35000,
          expensesChange: 300
        },
        explanation: 'Faster entry into workforce with practical skills and moderate debt.',
        educationalTip: 'Skilled trades are in high demand with median salaries of $50,000-$80,000. Many trades offer apprenticeships that pay while you learn, and there\'s less job outsourcing risk.',
        riskLevel: 'low',
        timeHorizon: 'short'
      },
      {
        id: 'work-immediately',
        text: 'Enter workforce immediately',
        impact: {
          incomeChange: 25000,
          expensesChange: 200
        },
        explanation: 'Start earning right away but with limited advancement opportunities.',
        educationalTip: 'Starting work immediately gives you a 4-year head start on earning and saving. However, lifetime earnings may be lower without additional education or skills training.',
        riskLevel: 'medium',
        timeHorizon: 'short'
      }
    ]
  },
  {
    id: 'first-job',
    age: 22,
    category: 'Career',
    title: 'Your First Real Job',
    description: 'You\'ve completed your education and have job offers. Which opportunity do you choose?',
    choices: [
      {
        id: 'corporate-job',
        text: 'Corporate position with benefits',
        impact: {
          incomeChange: 45000,
          expensesChange: 600,
          creditScoreChange: 20
        },
        explanation: 'Stable income with good benefits and career advancement potential.',
        educationalTip: 'Corporate jobs often provide health insurance, 401(k) matching, and career development opportunities. The stability can be worth more than a higher salary elsewhere.',
        riskLevel: 'low',
        timeHorizon: 'long'
      },
      {
        id: 'startup-job',
        text: 'Startup with equity potential',
        impact: {
          incomeChange: 35000,
          expensesChange: 400
        },
        explanation: 'Lower salary but potential for significant equity gains if successful.',
        educationalTip: 'Startup equity can be worth millions if the company succeeds, but 90% of startups fail. Consider your risk tolerance and financial obligations.',
        riskLevel: 'high',
        timeHorizon: 'long'
      },
      {
        id: 'freelance-work',
        text: 'Freelance/consulting work',
        impact: {
          incomeChange: 40000,
          expensesChange: 800 // No employer benefits
        },
        explanation: 'Flexible schedule but irregular income and no employer benefits.',
        educationalTip: 'Freelancers must save extra for taxes (25-30%), health insurance, and retirement since there\'s no employer contribution. Consider setting aside 40% of income for these costs.',
        riskLevel: 'medium',
        timeHorizon: 'short'
      }
    ]
  },
  {
    id: 'housing-decision',
    age: 25,
    category: 'Housing',
    title: 'Where Will You Live?',
    description: 'You\'re ready to move out on your own. What\'s your housing strategy?',
    choices: [
      {
        id: 'rent-apartment',
        text: 'Rent a nice apartment',
        impact: {
          expensesChange: 1200,
          lifestyleChange: 'comfortable'
        },
        explanation: 'Flexibility to move but no equity building.',
        educationalTip: 'Renting makes sense if you plan to move within 5 years, can\'t afford a 20% down payment, or want to invest the difference in the stock market.',
        riskLevel: 'low',
        timeHorizon: 'short'
      },
      {
        id: 'buy-condo',
        text: 'Buy a small condo',
        impact: {
          debtChange: 180000,
          expensesChange: 1400,
          investmentsChange: 20000 // Down payment becomes equity
        },
        explanation: 'Building equity but taking on mortgage debt and maintenance costs.',
        educationalTip: 'Homeownership builds wealth through equity and tax deductions, but requires 20% down payment to avoid PMI and budget 1-3% annually for maintenance.',
        riskLevel: 'medium',
        timeHorizon: 'long'
      },
      {
        id: 'live-with-roommates',
        text: 'Share housing with roommates',
        impact: {
          expensesChange: 600
        },
        explanation: 'Most affordable option, allowing more money for savings and investments.',
        educationalTip: 'Living with roommates can save $500-1000/month. Investing this difference in index funds could be worth $200,000+ over 20 years.',
        riskLevel: 'low',
        timeHorizon: 'medium'
      }
    ]
  },
  {
    id: 'emergency-fund',
    age: 27,
    category: 'Savings',
    title: 'Building Your Safety Net',
    description: 'You\'ve been working for a few years. How do you approach building an emergency fund?',
    choices: [
      {
        id: 'aggressive-savings',
        text: 'Save 6 months of expenses aggressively',
        impact: {
          savingsChange: 15000,
          expensesChange: 300 // Reduced lifestyle temporarily
        },
        explanation: 'Strong financial security but requires lifestyle sacrifices.',
        educationalTip: 'A 6-month emergency fund protects against job loss, medical bills, and major repairs. It prevents you from going into debt during crises.',
        riskLevel: 'low',
        timeHorizon: 'short'
      },
      {
        id: 'moderate-savings',
        text: 'Build 3-month emergency fund gradually',
        impact: {
          savingsChange: 8000,
          expensesChange: 100
        },
        explanation: 'Balanced approach to emergency preparedness.',
        educationalTip: 'A 3-month emergency fund covers most short-term crises while allowing you to invest more for long-term growth. Good balance of security and opportunity.',
        riskLevel: 'low',
        timeHorizon: 'short'
      },
      {
        id: 'minimal-savings',
        text: 'Keep minimal emergency fund, invest the rest',
        impact: {
          savingsChange: 3000,
          investmentsChange: 8000
        },
        explanation: 'Higher risk but potentially higher returns through investments.',
        educationalTip: 'This strategy works if you have stable income and other safety nets (family support, good insurance). One emergency could force you to sell investments at a loss.',
        riskLevel: 'high',
        timeHorizon: 'long'
      }
    ]
  },
  {
    id: 'investment-start',
    age: 30,
    category: 'Investment',
    title: 'Starting Your Investment Journey',
    description: 'You\'re ready to start investing for the long term. What\'s your strategy?',
    choices: [
      {
        id: 'conservative-portfolio',
        text: 'Conservative portfolio (bonds, CDs)',
        impact: {
          investmentsChange: 25000,
          savingsChange: -25000
        },
        explanation: 'Lower risk but also lower potential returns.',
        educationalTip: 'Conservative portfolios protect against market crashes but may not beat inflation long-term. At 30, you have 35 years until retirement - time to recover from market downturns.',
        riskLevel: 'low',
        timeHorizon: 'long'
      },
      {
        id: 'balanced-portfolio',
        text: 'Balanced portfolio (60% stocks, 40% bonds)',
        impact: {
          investmentsChange: 25000,
          savingsChange: -25000
        },
        explanation: 'Moderate risk with steady long-term growth potential.',
        educationalTip: 'The 60/40 portfolio is a classic allocation that balances growth with stability. Historically returns 7-8% annually with moderate volatility.',
        riskLevel: 'medium',
        timeHorizon: 'long'
      },
      {
        id: 'aggressive-portfolio',
        text: 'Aggressive portfolio (90% stocks)',
        impact: {
          investmentsChange: 25000,
          savingsChange: -25000
        },
        explanation: 'Higher risk but potentially much higher returns over time.',
        educationalTip: 'Young investors can handle more risk since they have decades to recover from market downturns. The S&P 500 has averaged 10% annually over the long term.',
        riskLevel: 'high',
        timeHorizon: 'long'
      }
    ]
  },
  {
    id: 'career-advancement',
    age: 32,
    category: 'Career',
    title: 'Career Growth Opportunity',
    description: 'You have an opportunity for a major career move. What do you choose?',
    choices: [
      {
        id: 'promotion-current',
        text: 'Accept promotion at current company',
        impact: {
          incomeChange: 15000,
          expensesChange: 200 // Slightly higher lifestyle
        },
        explanation: 'Steady advancement with people you know and trust.',
        educationalTip: 'Internal promotions often come with better work-life balance and job security. You already know the company culture and have established relationships.',
        riskLevel: 'low',
        timeHorizon: 'medium'
      },
      {
        id: 'new-company',
        text: 'Take higher-paying job at new company',
        impact: {
          incomeChange: 25000,
          expensesChange: 400 // Relocation and adjustment costs
        },
        explanation: 'Significant salary increase but requires adapting to new environment.',
        educationalTip: 'Job hopping can accelerate salary growth - external hires often get 10-20% more than internal promotions. Just ensure the new role aligns with your career goals.',
        riskLevel: 'medium',
        timeHorizon: 'medium'
      },
      {
        id: 'start-business',
        text: 'Start your own business',
        impact: {
          incomeChange: -20000, // Initial income drop
          expensesChange: 1000, // Business expenses
          savingsChange: -15000 // Startup costs
        },
        explanation: 'High risk but unlimited earning potential if successful.',
        educationalTip: 'Most businesses fail within 5 years, but successful entrepreneurs can build significant wealth. Ensure you have 6-12 months of expenses saved before starting.',
        riskLevel: 'high',
        timeHorizon: 'long'
      }
    ]
  },
  {
    id: 'major-purchase',
    age: 35,
    category: 'Lifestyle',
    title: 'A Major Purchase Decision',
    description: 'You\'re considering a significant purchase that could impact your finances. What do you do?',
    choices: [
      {
        id: 'buy-new-car',
        text: 'Buy a new reliable car',
        impact: {
          debtChange: 25000,
          expensesChange: 400,
          creditScoreChange: -10
        },
        explanation: 'Reliable transportation but adds to monthly expenses.',
        educationalTip: 'New cars lose 20% of value immediately and 60% in 5 years. The average car payment is $700/month - investing this could be worth $300,000 over 20 years.',
        riskLevel: 'medium',
        timeHorizon: 'medium'
      },
      {
        id: 'buy-used-car',
        text: 'Buy a quality used car',
        impact: {
          savingsChange: -12000,
          expensesChange: 200
        },
        explanation: 'More affordable option with lower ongoing costs.',
        educationalTip: 'Quality used cars (2-3 years old) offer the best value. Let someone else take the depreciation hit while you get reliable transportation at half the cost.',
        riskLevel: 'low',
        timeHorizon: 'medium'
      },
      {
        id: 'no-car',
        text: 'Continue using public transport/rideshare',
        impact: {
          expensesChange: 150,
          investmentsChange: 15000 // Money saved goes to investments
        },
        explanation: 'Most economical choice, allowing more money for investments.',
        educationalTip: 'In cities with good public transit, car-free living can save $8,000-12,000 annually. This money invested could grow to over $500,000 by retirement.',
        riskLevel: 'low',
        timeHorizon: 'long'
      }
    ]
  },
  {
    id: 'family-planning',
    age: 38,
    category: 'Family',
    title: 'Family and Financial Planning',
    description: 'Life changes are coming that will affect your financial situation. How do you prepare?',
    choices: [
      {
        id: 'increase-insurance',
        text: 'Increase life insurance and start college fund',
        impact: {
          expensesChange: 500,
          investmentsChange: 10000 // College savings
        },
        explanation: 'Responsible planning for family\'s future financial security.',
        educationalTip: 'Life insurance should be 10-12x your annual income. College costs average $35,000/year, so starting a 529 plan early takes advantage of compound growth.',
        riskLevel: 'low',
        timeHorizon: 'long'
      },
      {
        id: 'maintain-current',
        text: 'Maintain current financial approach',
        impact: {
          expensesChange: 300 // Some additional family costs
        },
        explanation: 'Minimal changes to current financial strategy.',
        educationalTip: 'While maintaining your current approach provides stability, major life changes often require financial adjustments to optimize for new circumstances.',
        riskLevel: 'medium',
        timeHorizon: 'medium'
      },
      {
        id: 'reduce-expenses',
        text: 'Significantly reduce expenses to save more',
        impact: {
          expensesChange: -200,
          savingsChange: 8000,
          lifestyleChange: 'modest'
        },
        explanation: 'Prioritize savings over lifestyle for family security.',
        educationalTip: 'Reducing expenses by $200/month and investing the difference could provide an additional $100,000+ for your family\'s future security.',
        riskLevel: 'low',
        timeHorizon: 'long'
      }
    ]
  },
  {
    id: 'retirement-planning',
    age: 45,
    category: 'Retirement',
    title: 'Retirement Planning Strategy',
    description: 'You\'re 20 years from retirement. How do you maximize your retirement savings?',
    choices: [
      {
        id: 'max-401k',
        text: 'Maximize 401(k) contributions',
        impact: {
          investmentsChange: 50000,
          expensesChange: 1500 // Reduced take-home pay
        },
        explanation: 'Contribute the maximum allowed to your 401(k) for tax benefits and employer matching.',
        educationalTip: 'In 2024, you can contribute up to $23,000 to a 401(k), plus $7,500 catch-up if you\'re 50+. Employer matches are free money!',
        riskLevel: 'low',
        timeHorizon: 'long'
      },
      {
        id: 'balanced-retirement',
        text: 'Balanced approach with IRA and 401(k)',
        impact: {
          investmentsChange: 35000,
          expensesChange: 1000
        },
        explanation: 'Diversify retirement savings across different account types.',
        educationalTip: 'Traditional vs Roth accounts offer different tax advantages. Traditional gives immediate deductions, Roth provides tax-free withdrawals in retirement.',
        riskLevel: 'low',
        timeHorizon: 'long'
      },
      {
        id: 'catch-up-aggressive',
        text: 'Aggressive catch-up strategy',
        impact: {
          investmentsChange: 75000,
          expensesChange: 2000,
          lifestyleChange: 'modest'
        },
        explanation: 'Drastically increase savings to catch up on retirement planning.',
        educationalTip: 'If you\'re behind on retirement savings, the "catch-up" contribution limits allow extra savings. Time is your biggest asset in retirement planning.',
        riskLevel: 'medium',
        timeHorizon: 'long'
      }
    ]
  },
  {
    id: 'market-crash',
    age: 50,
    category: 'Crisis',
    title: 'Market Downturn Response',
    description: 'The market has crashed and your investments are down 30%. How do you respond?',
    choices: [
      {
        id: 'stay-course',
        text: 'Stay the course, keep investing',
        impact: {
          investmentsChange: 10000 // Continue regular investing
        },
        explanation: 'Maintain your investment strategy despite market volatility.',
        educationalTip: 'Market crashes are temporary. Historically, markets recover and reach new highs. Dollar-cost averaging during downturns can actually improve long-term returns.',
        riskLevel: 'medium',
        timeHorizon: 'long'
      },
      {
        id: 'panic-sell',
        text: 'Sell investments to avoid further losses',
        impact: {
          investmentsChange: -50000,
          savingsChange: 35000 // Realized losses
        },
        explanation: 'Lock in losses by selling during the downturn.',
        educationalTip: 'Panic selling during market crashes is one of the biggest investment mistakes. You lock in losses and miss the recovery. "Time in the market beats timing the market."',
        riskLevel: 'high',
        timeHorizon: 'short'
      },
      {
        id: 'buy-dip',
        text: 'Invest more while prices are low',
        impact: {
          investmentsChange: 25000,
          savingsChange: -25000
        },
        explanation: 'Take advantage of lower prices to invest more.',
        educationalTip: 'Buying during market downturns can be very profitable long-term. Warren Buffett says "Be fearful when others are greedy, and greedy when others are fearful."',
        riskLevel: 'medium',
        timeHorizon: 'long'
      }
    ]
  },
  {
    id: 'healthcare-costs',
    age: 55,
    category: 'Healthcare',
    title: 'Healthcare Planning',
    description: 'Healthcare costs are rising and you need to plan for medical expenses in retirement.',
    choices: [
      {
        id: 'hsa-max',
        text: 'Maximize Health Savings Account (HSA)',
        impact: {
          investmentsChange: 15000,
          expensesChange: 400
        },
        explanation: 'Use HSA as a retirement healthcare fund.',
        educationalTip: 'HSAs offer triple tax benefits: deductible contributions, tax-free growth, and tax-free withdrawals for medical expenses. After 65, you can withdraw for any purpose (taxed as income).',
        riskLevel: 'low',
        timeHorizon: 'long'
      },
      {
        id: 'health-insurance',
        text: 'Purchase comprehensive health insurance',
        impact: {
          expensesChange: 800
        },
        explanation: 'Invest in better health coverage now.',
        educationalTip: 'Healthcare costs average $300,000+ per person in retirement. Good insurance and preventive care can save significant money long-term.',
        riskLevel: 'low',
        timeHorizon: 'medium'
      },
      {
        id: 'self-insure',
        text: 'Self-insure with basic coverage',
        impact: {
          savingsChange: 10000,
          expensesChange: 200
        },
        explanation: 'Save money on premiums but take on more risk.',
        educationalTip: 'Self-insuring can work if you have substantial savings, but one major medical event can be financially devastating. Consider your risk tolerance carefully.',
        riskLevel: 'high',
        timeHorizon: 'short'
      }
    ]
  }]
