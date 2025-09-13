import { FinancialTip, Achievement, FinancialState } from '@/types/game'

export const financialTips: FinancialTip[] = [
  {
    id: 'emergency-fund',
    title: 'Build an Emergency Fund',
    content: 'Aim to save 3-6 months of expenses in a high-yield savings account. This protects you from unexpected costs like medical bills or job loss.',
    category: 'emergency',
    relevantAge: 22
  },
  {
    id: 'compound-interest',
    title: 'The Power of Compound Interest',
    content: 'Starting to invest early is crucial. $100/month invested at age 25 becomes $349,000 by age 65 (assuming 7% returns). Starting at 35? Only $169,000.',
    category: 'investing',
    relevantAge: 25
  },
  {
    id: 'debt-avalanche',
    title: 'Debt Repayment Strategy',
    content: 'Pay minimums on all debts, then put extra money toward the highest interest rate debt first. This saves the most money over time.',
    category: 'debt',
    relevantAge: 25
  },
  {
    id: 'dollar-cost-averaging',
    title: 'Invest Consistently',
    content: 'Invest the same amount regularly regardless of market conditions. This reduces the impact of market volatility and builds wealth over time.',
    category: 'investing',
    relevantAge: 30
  },
  {
    id: 'lifestyle-inflation',
    title: 'Avoid Lifestyle Inflation',
    content: 'As your income grows, resist the urge to increase spending proportionally. Save and invest the extra income instead.',
    category: 'budgeting',
    relevantAge: 30
  },
  {
    id: 'retirement-planning',
    title: 'Retirement Rule of Thumb',
    content: 'Aim to save 10-15% of your income for retirement. If your employer offers a 401(k) match, contribute enough to get the full match - it\'s free money!',
    category: 'investing',
    relevantAge: 25
  }
]

export const achievements: Achievement[] = [
  {
    id: 'first-thousand',
    title: 'First $1,000',
    description: 'Saved your first $1,000',
    icon: '💰',
    unlocked: false,
    condition: (state: FinancialState) => state.savings >= 1000
  },
  {
    id: 'debt-free',
    title: 'Debt Free',
    description: 'Eliminated all debt',
    icon: '🎉',
    unlocked: false,
    condition: (state: FinancialState) => state.debt === 0 && state.age > 25
  },
  {
    id: 'six-figure-net-worth',
    title: 'Six Figure Net Worth',
    description: 'Reached $100,000 net worth',
    icon: '💎',
    unlocked: false,
    condition: (state: FinancialState) => state.netWorth >= 100000
  },
  {
    id: 'millionaire',
    title: 'Millionaire',
    description: 'Achieved $1,000,000 net worth',
    icon: '🏆',
    unlocked: false,
    condition: (state: FinancialState) => state.netWorth >= 1000000
  },
  {
    id: 'emergency-fund-complete',
    title: 'Emergency Fund Complete',
    description: 'Saved 6 months of expenses',
    icon: '🛡️',
    unlocked: false,
    condition: (state: FinancialState) => state.savings >= (state.monthlyExpenses * 6)
  },
  {
    id: 'investment-starter',
    title: 'Investment Journey Begins',
    description: 'Made your first investment',
    icon: '📈',
    unlocked: false,
    condition: (state: FinancialState) => state.investments > 0
  },
  {
    id: 'excellent-credit',
    title: 'Excellent Credit',
    description: 'Achieved credit score above 750',
    icon: '⭐',
    unlocked: false,
    condition: (state: FinancialState) => state.creditScore >= 750
  }
]

// National average net worth by age (simplified data)
export const nationalAverages: { [age: number]: number } = {
  25: 8000,
  30: 25000,
  35: 76000,
  40: 120000,
  45: 168000,
  50: 245000,
  55: 364000,
  60: 471000,
  65: 543000
}

export function getRelevantTip(age: number, category?: string): FinancialTip | null {
  const relevantTips = financialTips.filter(tip => 
    (!tip.relevantAge || Math.abs(tip.relevantAge - age) <= 5) &&
    (!category || tip.category === category)
  )
  
  if (relevantTips.length === 0) return null
  
  // Return a random relevant tip
  return relevantTips[Math.floor(Math.random() * relevantTips.length)]
}

export function checkAchievements(state: FinancialState, currentAchievements: Achievement[]): Achievement[] {
  return currentAchievements.map(achievement => ({
    ...achievement,
    unlocked: achievement.unlocked || achievement.condition(state)
  }))
}

export function getPercentile(age: number, netWorth: number): number {
  const avgNetWorth = nationalAverages[age] || nationalAverages[Math.floor(age / 5) * 5]
  if (!avgNetWorth) return 50
  
  // Simplified percentile calculation
  if (netWorth >= avgNetWorth * 3) return 95
  if (netWorth >= avgNetWorth * 2) return 85
  if (netWorth >= avgNetWorth * 1.5) return 75
  if (netWorth >= avgNetWorth) return 60
  if (netWorth >= avgNetWorth * 0.5) return 40
  if (netWorth >= avgNetWorth * 0.25) return 25
  return 10
}