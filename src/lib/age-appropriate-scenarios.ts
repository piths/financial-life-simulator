import { Decision } from '@/types/game'

// Base scenario templates that can be adapted to different ages
const scenarioTemplates = {
  // Teenage Scenarios (14-17)
  teenager: [
    {
      id: 'first-job',
      category: 'Career',
      title: 'Your First Job',
      description: 'You\'re ready to start earning your own money. What\'s your first job?',
      choices: [
        {
          id: 'part-time-retail',
          text: 'Part-time retail job',
          explanation: 'Learn customer service and work ethic while earning spending money.',
          impact: {
            incomeChange: 8000, // Part-time minimum wage
            expensesChange: 100 // Work clothes, transportation
          },
          riskLevel: 'low' as const,
          timeHorizon: 'short' as const
        },
        {
          id: 'tutoring',
          text: 'Tutoring younger students',
          explanation: 'Use your academic skills to help others while earning good money.',
          impact: {
            incomeChange: 6000,
            expensesChange: 50
          },
          riskLevel: 'low' as const,
          timeHorizon: 'short' as const
        },
        {
          id: 'online-business',
          text: 'Start small online business',
          explanation: 'Learn entrepreneurship early but with uncertain income.',
          impact: {
            incomeChange: 4000,
            expensesChange: 200,
            savingsChange: -500 // Startup costs
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'medium' as const
        },
        {
          id: 'focus-studies',
          text: 'Focus on studies instead of working',
          explanation: 'Prioritize education and grades over earning money now.',
          impact: {
            expensesChange: 50 // Study materials, activities
          },
          riskLevel: 'low' as const,
          timeHorizon: 'long' as const
        }
      ]
    },
    {
      id: 'money-management',
      category: 'Savings',
      title: 'Learning Money Management',
      description: 'You\'ve started earning money. How do you manage it?',
      choices: [
        {
          id: 'save-most',
          text: 'Save 70% of earnings',
          explanation: 'Build strong savings habits early and watch money grow.',
          impact: {
            savingsChange: 3000,
            expensesChange: -100 // Reduced spending
          },
          riskLevel: 'low' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'balanced-approach',
          text: 'Save 40%, spend 60%',
          explanation: 'Balance saving for the future with enjoying your teenage years.',
          impact: {
            savingsChange: 1500,
            expensesChange: 200
          },
          riskLevel: 'low' as const,
          timeHorizon: 'medium' as const
        },
        {
          id: 'spend-most',
          text: 'Spend most, save a little',
          explanation: 'Enjoy your money now while you\'re young.',
          impact: {
            savingsChange: 500,
            expensesChange: 400
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'short' as const
        },
        {
          id: 'learn-investing',
          text: 'Start learning about investing',
          explanation: 'Begin investing small amounts to learn about the stock market.',
          impact: {
            savingsChange: 1000,
            investmentsChange: 1000,
            expensesChange: 100
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'long' as const
        }
      ]
    },
    {
      id: 'financial-education',
      category: 'Education',
      title: 'Financial Education',
      description: 'How do you learn about money and personal finance?',
      choices: [
        {
          id: 'take-finance-class',
          text: 'Take personal finance class at school',
          explanation: 'Get formal education about budgeting, investing, and financial planning.',
          impact: {
            expensesChange: 100 // Books and materials
          },
          riskLevel: 'low' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'read-books',
          text: 'Read finance books and blogs',
          explanation: 'Self-educate through books, podcasts, and online resources.',
          impact: {
            expensesChange: 50,
            savingsChange: 200 // Better money decisions
          },
          riskLevel: 'low' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'learn-by-doing',
          text: 'Learn by trial and error',
          explanation: 'Figure out money management through experience.',
          impact: {
            savingsChange: -300 // Some costly mistakes
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'medium' as const
        },
        {
          id: 'family-guidance',
          text: 'Learn from family members',
          explanation: 'Get financial advice and guidance from parents/relatives.',
          impact: {
            savingsChange: 500 // Good habits from family
          },
          riskLevel: 'low' as const,
          timeHorizon: 'long' as const
        }
      ]
    },
    {
      id: 'big-purchase',
      category: 'Lifestyle',
      title: 'Your First Big Purchase',
      description: 'You\'ve saved up money and want to make your first big purchase. What do you choose?',
      choices: [
        {
          id: 'gaming-setup',
          text: 'Gaming computer/console setup',
          explanation: 'Invest in entertainment and potentially content creation.',
          impact: {
            savingsChange: -1500,
            expensesChange: 50 // Games, subscriptions
          },
          riskLevel: 'low' as const,
          timeHorizon: 'short' as const
        },
        {
          id: 'car-savings',
          text: 'Save for a car',
          explanation: 'Start saving for transportation independence.',
          impact: {
            savingsChange: 2000,
            expensesChange: -50 // Reduced spending
          },
          riskLevel: 'low' as const,
          timeHorizon: 'medium' as const
        },
        {
          id: 'investment-account',
          text: 'Open investment account',
          explanation: 'Start investing for long-term wealth building.',
          impact: {
            savingsChange: -1000,
            investmentsChange: 1000
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'education-fund',
          text: 'Save for college expenses',
          explanation: 'Build a fund for future education costs.',
          impact: {
            savingsChange: 2500,
            expensesChange: -100
          },
          riskLevel: 'low' as const,
          timeHorizon: 'long' as const
        }
      ]
    }
  ],
  
  // Young Adult Scenarios (18-25)
  youngAdult: [
    {
      id: 'education-path',
      category: 'Education',
      title: 'Your Educational Journey',
      description: 'How do you want to pursue your education and career?',
      choices: [
        {
          id: 'college-degree',
          text: 'Go to college (4-year degree)',
          explanation: 'College provides higher earning potential but comes with student debt.',
          impact: {
            debtChange: 40000,
            expensesChange: 800
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'community-college',
          text: 'Start at community college',
          explanation: 'More affordable education path with lower debt burden.',
          impact: {
            debtChange: 15000,
            expensesChange: 400
          },
          riskLevel: 'low' as const,
          timeHorizon: 'medium' as const
        },
        {
          id: 'trade-school',
          text: 'Attend trade school',
          explanation: 'Faster entry into workforce with practical skills.',
          impact: {
            debtChange: 20000,
            incomeChange: 35000,
            expensesChange: 300
          },
          riskLevel: 'low' as const,
          timeHorizon: 'short' as const
        },
        {
          id: 'work-immediately',
          text: 'Enter workforce immediately',
          explanation: 'Start earning right away but with limited advancement opportunities.',
          impact: {
            incomeChange: 25000,
            expensesChange: 200
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'short' as const
        }
      ]
    },
    {
      id: 'first-job',
      category: 'Career',
      title: 'Your First Real Job',
      description: 'You have job offers. Which opportunity do you choose?',
      choices: [
        {
          id: 'corporate-job',
          text: 'Corporate position with benefits',
          explanation: 'Stable income with good benefits and career advancement potential.',
          impact: {
            incomeChange: 45000,
            expensesChange: 600,
            creditScoreChange: 20
          },
          riskLevel: 'low' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'startup-job',
          text: 'Startup with equity potential',
          explanation: 'Lower salary but potential for significant equity gains.',
          impact: {
            incomeChange: 35000,
            expensesChange: 400
          },
          riskLevel: 'high' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'freelance-work',
          text: 'Freelance/consulting work',
          explanation: 'Flexible schedule but irregular income and no benefits.',
          impact: {
            incomeChange: 40000,
            expensesChange: 800
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'short' as const
        }
      ]
    }
  ],

  // Early Career Scenarios (25-35)
  earlyCareer: [
    {
      id: 'housing-decision',
      category: 'Housing',
      title: 'Where Will You Live?',
      description: 'What\'s your housing strategy?',
      choices: [
        {
          id: 'rent-apartment',
          text: 'Rent a nice apartment',
          explanation: 'Flexibility to move but no equity building.',
          impact: {
            expensesChange: 1200
          },
          riskLevel: 'low' as const,
          timeHorizon: 'short' as const
        },
        {
          id: 'buy-condo',
          text: 'Buy a small condo',
          explanation: 'Building equity but taking on mortgage debt.',
          impact: {
            debtChange: 180000,
            expensesChange: 1400,
            investmentsChange: 20000
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'live-with-roommates',
          text: 'Share housing with roommates',
          explanation: 'Most affordable option for more savings.',
          impact: {
            expensesChange: 600
          },
          riskLevel: 'low' as const,
          timeHorizon: 'medium' as const
        }
      ]
    },
    {
      id: 'emergency-fund',
      category: 'Savings',
      title: 'Building Your Safety Net',
      description: 'How do you approach building an emergency fund?',
      choices: [
        {
          id: 'aggressive-savings',
          text: 'Save 6 months of expenses aggressively',
          explanation: 'Strong financial security but requires lifestyle sacrifices.',
          impact: {
            savingsChange: 15000,
            expensesChange: 300
          },
          riskLevel: 'low' as const,
          timeHorizon: 'short' as const
        },
        {
          id: 'moderate-savings',
          text: 'Build 3-month emergency fund gradually',
          explanation: 'Balanced approach to emergency preparedness.',
          impact: {
            savingsChange: 8000,
            expensesChange: 100
          },
          riskLevel: 'low' as const,
          timeHorizon: 'short' as const
        },
        {
          id: 'minimal-savings',
          text: 'Keep minimal emergency fund, invest the rest',
          explanation: 'Higher risk but potentially higher returns.',
          impact: {
            savingsChange: 3000,
            investmentsChange: 8000
          },
          riskLevel: 'high' as const,
          timeHorizon: 'long' as const
        }
      ]
    }
  ],

  // Mid Career Scenarios (35-50)
  midCareer: [
    {
      id: 'career-advancement',
      category: 'Career',
      title: 'Career Growth Opportunity',
      description: 'You have an opportunity for a major career move. What do you choose?',
      choices: [
        {
          id: 'promotion-current',
          text: 'Accept promotion at current company',
          explanation: 'Steady advancement with people you know and trust.',
          impact: {
            incomeChange: 15000,
            expensesChange: 200
          },
          riskLevel: 'low' as const,
          timeHorizon: 'medium' as const
        },
        {
          id: 'new-company',
          text: 'Take higher-paying job at new company',
          explanation: 'Significant salary increase but requires adapting to new environment.',
          impact: {
            incomeChange: 25000,
            expensesChange: 400
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'medium' as const
        },
        {
          id: 'start-business',
          text: 'Start your own business',
          explanation: 'High risk but unlimited earning potential if successful.',
          impact: {
            incomeChange: -20000,
            expensesChange: 1000,
            savingsChange: -15000
          },
          riskLevel: 'high' as const,
          timeHorizon: 'long' as const
        }
      ]
    },
    {
      id: 'investment-strategy',
      category: 'Investment',
      title: 'Investment Strategy',
      description: 'How do you approach investing for the future?',
      choices: [
        {
          id: 'conservative-portfolio',
          text: 'Conservative portfolio (bonds, CDs)',
          explanation: 'Lower risk but also lower potential returns.',
          impact: {
            investmentsChange: 25000,
            savingsChange: -25000
          },
          riskLevel: 'low' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'balanced-portfolio',
          text: 'Balanced portfolio (60% stocks, 40% bonds)',
          explanation: 'Moderate risk with steady long-term growth potential.',
          impact: {
            investmentsChange: 25000,
            savingsChange: -25000
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'aggressive-portfolio',
          text: 'Aggressive portfolio (90% stocks)',
          explanation: 'Higher risk but potentially much higher returns over time.',
          impact: {
            investmentsChange: 25000,
            savingsChange: -25000
          },
          riskLevel: 'high' as const,
          timeHorizon: 'long' as const
        }
      ]
    }
  ],

  // Pre-Retirement Scenarios (50-65)
  preRetirement: [
    {
      id: 'retirement-planning',
      category: 'Retirement',
      title: 'Retirement Planning Strategy',
      description: 'How do you maximize your retirement savings?',
      choices: [
        {
          id: 'max-401k',
          text: 'Maximize 401(k) contributions',
          explanation: 'Contribute the maximum allowed for tax benefits and employer matching.',
          impact: {
            investmentsChange: 50000,
            expensesChange: 1500
          },
          riskLevel: 'low' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'balanced-retirement',
          text: 'Balanced approach with IRA and 401(k)',
          explanation: 'Diversify retirement savings across different account types.',
          impact: {
            investmentsChange: 35000,
            expensesChange: 1000
          },
          riskLevel: 'low' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'catch-up-aggressive',
          text: 'Aggressive catch-up strategy',
          explanation: 'Drastically increase savings to catch up on retirement planning.',
          impact: {
            investmentsChange: 75000,
            expensesChange: 2000
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'long' as const
        }
      ]
    },
    {
      id: 'healthcare-costs',
      category: 'Healthcare',
      title: 'Healthcare Planning',
      description: 'How do you plan for medical expenses in retirement?',
      choices: [
        {
          id: 'hsa-max',
          text: 'Maximize Health Savings Account (HSA)',
          explanation: 'Use HSA as a retirement healthcare fund.',
          impact: {
            investmentsChange: 15000,
            expensesChange: 400
          },
          riskLevel: 'low' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'health-insurance',
          text: 'Purchase comprehensive health insurance',
          explanation: 'Invest in better health coverage now.',
          impact: {
            expensesChange: 800
          },
          riskLevel: 'low' as const,
          timeHorizon: 'medium' as const
        },
        {
          id: 'self-insure',
          text: 'Self-insure with basic coverage',
          explanation: 'Save money on premiums but take on more risk.',
          impact: {
            savingsChange: 10000,
            expensesChange: 200
          },
          riskLevel: 'high' as const,
          timeHorizon: 'short' as const
        }
      ]
    }
  ],

  // Universal scenarios that apply to any age
  universal: [
    {
      id: 'unexpected-expense',
      category: 'Crisis',
      title: 'Unexpected Major Expense',
      description: 'You face an unexpected major expense. How do you handle it?',
      choices: [
        {
          id: 'use-emergency-fund',
          text: 'Use emergency fund',
          explanation: 'Tap into your emergency savings to cover the expense.',
          impact: {
            savingsChange: -8000
          },
          riskLevel: 'low' as const,
          timeHorizon: 'short' as const
        },
        {
          id: 'take-loan',
          text: 'Take out a loan',
          explanation: 'Borrow money to cover the expense.',
          impact: {
            debtChange: 8000,
            expensesChange: 200
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'medium' as const
        },
        {
          id: 'payment-plan',
          text: 'Set up payment plan',
          explanation: 'Arrange to pay the expense over time.',
          impact: {
            expensesChange: 300
          },
          riskLevel: 'low' as const,
          timeHorizon: 'short' as const
        }
      ]
    },
    {
      id: 'windfall',
      category: 'Opportunity',
      title: 'Unexpected Windfall',
      description: 'You receive an unexpected sum of money. What do you do with it?',
      choices: [
        {
          id: 'invest-windfall',
          text: 'Invest it all',
          explanation: 'Put the money into investments for long-term growth.',
          impact: {
            investmentsChange: 15000
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'long' as const
        },
        {
          id: 'split-windfall',
          text: 'Split between savings and investments',
          explanation: 'Diversify the windfall between safe savings and investments.',
          impact: {
            savingsChange: 7500,
            investmentsChange: 7500
          },
          riskLevel: 'low' as const,
          timeHorizon: 'medium' as const
        },
        {
          id: 'pay-debt',
          text: 'Pay down debt',
          explanation: 'Use the money to reduce existing debt.',
          impact: {
            debtChange: -15000
          },
          riskLevel: 'low' as const,
          timeHorizon: 'short' as const
        },
        {
          id: 'lifestyle-upgrade',
          text: 'Upgrade lifestyle',
          explanation: 'Spend the money on improving your quality of life.',
          impact: {
            expensesChange: 300
          },
          riskLevel: 'medium' as const,
          timeHorizon: 'short' as const
        }
      ]
    }
  ]
}

export function generateAgeAppropriateScenarios(startingAge: number): Decision[] {
  const scenarios: Decision[] = []
  let currentAge = startingAge
  
  // Determine which scenario categories to include based on starting age
  const scenarioCategories: string[] = []
  
  if (startingAge <= 17) {
    scenarioCategories.push('teenager', 'youngAdult', 'earlyCareer', 'midCareer', 'preRetirement')
  } else if (startingAge <= 25) {
    scenarioCategories.push('youngAdult', 'earlyCareer', 'midCareer', 'preRetirement')
  } else if (startingAge <= 35) {
    scenarioCategories.push('earlyCareer', 'midCareer', 'preRetirement')
  } else if (startingAge <= 50) {
    scenarioCategories.push('midCareer', 'preRetirement')
  } else {
    scenarioCategories.push('preRetirement')
  }
  
  // Always include universal scenarios
  scenarioCategories.push('universal')
  
  // Generate scenarios with appropriate ages
  scenarioCategories.forEach(category => {
    const categoryScenarios = scenarioTemplates[category as keyof typeof scenarioTemplates]
    
    categoryScenarios.forEach((template, index) => {
      // Calculate appropriate age for this scenario
      let scenarioAge = currentAge
      
      if (category === 'teenager') {
        scenarioAge = Math.max(startingAge, 14) + (index * 1) // 1 year between teenage scenarios
      } else if (category === 'youngAdult') {
        scenarioAge = Math.max(startingAge, 18) + (index * 2)
      } else if (category === 'earlyCareer') {
        scenarioAge = Math.max(startingAge, 25) + (index * 3)
      } else if (category === 'midCareer') {
        scenarioAge = Math.max(startingAge, 35) + (index * 4)
      } else if (category === 'preRetirement') {
        scenarioAge = Math.max(startingAge, 50) + (index * 3)
      } else if (category === 'universal') {
        // Universal scenarios are spread throughout
        scenarioAge = startingAge + 5 + (index * 8)
      }
      
      // Don't create scenarios beyond reasonable retirement age
      if (scenarioAge > 75) return
      
      scenarios.push({
        id: `${template.id}-${scenarioAge}`,
        age: scenarioAge,
        category: template.category,
        title: template.title,
        description: template.description,
        choices: template.choices.map(choice => ({
          id: choice.id,
          text: choice.text,
          explanation: choice.explanation,
          impact: choice.impact,
          riskLevel: choice.riskLevel,
          timeHorizon: choice.timeHorizon
        }))
      })
      
      currentAge = Math.max(currentAge, scenarioAge + 1)
    })
  })
  
  // Sort scenarios by age and limit to reasonable number
  return scenarios
    .sort((a, b) => a.age - b.age)
    .slice(0, 12) // Limit to 12 scenarios max
}