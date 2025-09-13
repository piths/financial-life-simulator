export interface FinancialState {
  age: number
  income: number
  monthlyExpenses: number
  savings: number
  debt: number
  investments: number
  netWorth: number
  creditScore: number
  lifestyle: 'modest' | 'comfortable' | 'luxury'
}

export interface Decision {
  id: string
  age: number
  category: string
  title: string
  description: string
  choices: Choice[]
  selectedChoice?: string
}

export interface Choice {
  id: string
  text: string
  impact: FinancialImpact
  explanation: string
  educationalTip?: string
  riskLevel: 'low' | 'medium' | 'high'
  timeHorizon: 'short' | 'medium' | 'long'
}

export interface FinancialImpact {
  incomeChange?: number
  expensesChange?: number
  savingsChange?: number
  debtChange?: number
  investmentsChange?: number
  creditScoreChange?: number
  lifestyleChange?: 'modest' | 'comfortable' | 'luxury'
}

export interface GameProgress {
  currentDecisionIndex: number
  completedDecisions: string[]
  rewindsUsed: number
  maxRewinds: number
}

export interface GameState {
  playerFinancials: FinancialState
  decisionHistory: Decision[]
  gameProgress: GameProgress
  isGameComplete: boolean
}

export interface FinancialTip {
  id: string
  title: string
  content: string
  category: 'budgeting' | 'investing' | 'debt' | 'career' | 'emergency'
  relevantAge?: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  condition: (state: FinancialState) => boolean
}

export interface ComparisonData {
  age: number
  userNetWorth: number
  averageNetWorth: number
  percentile: number
}