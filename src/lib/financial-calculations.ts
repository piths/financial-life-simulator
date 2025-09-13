import { FinancialState, FinancialImpact } from '@/types/game'

export function calculateNetWorth(financials: FinancialState): number {
  return financials.savings + financials.investments - financials.debt
}

export function applyFinancialImpact(
  currentState: FinancialState, 
  impact: FinancialImpact
): FinancialState {
  const newState = { ...currentState }

  if (impact.incomeChange) {
    newState.income += impact.incomeChange
  }
  
  if (impact.expensesChange) {
    newState.monthlyExpenses += impact.expensesChange
  }
  
  if (impact.savingsChange) {
    newState.savings = Math.max(0, newState.savings + impact.savingsChange)
  }
  
  if (impact.debtChange) {
    newState.debt = Math.max(0, newState.debt + impact.debtChange)
  }
  
  if (impact.investmentsChange) {
    newState.investments = Math.max(0, newState.investments + impact.investmentsChange)
  }
  
  if (impact.creditScoreChange) {
    newState.creditScore = Math.min(850, Math.max(300, newState.creditScore + impact.creditScoreChange))
  }
  
  if (impact.lifestyleChange) {
    newState.lifestyle = impact.lifestyleChange
  }

  // Recalculate net worth
  newState.netWorth = calculateNetWorth(newState)

  return newState
}

export function calculateCompoundGrowth(
  principal: number, 
  rate: number, 
  years: number, 
  monthlyContribution: number = 0
): number {
  const monthlyRate = rate / 12
  const months = years * 12
  
  // Future value of principal
  const principalGrowth = principal * Math.pow(1 + monthlyRate, months)
  
  // Future value of monthly contributions
  const contributionGrowth = monthlyContribution * 
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  
  return principalGrowth + contributionGrowth
}

export function calculateMonthlyPayment(
  principal: number, 
  annualRate: number, 
  years: number
): number {
  const monthlyRate = annualRate / 12
  const numPayments = years * 12
  
  if (monthlyRate === 0) return principal / numPayments
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
    (Math.pow(1 + monthlyRate, numPayments) - 1)
}

export function simulateMarketVolatility(baseReturn: number, volatility: number): number {
  // Simple random walk for market returns
  const randomFactor = (Math.random() - 0.5) * 2 * volatility
  return Math.max(-0.5, Math.min(0.5, baseReturn + randomFactor))
}