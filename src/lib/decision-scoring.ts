import { Choice, FinancialState } from '@/types/game'
import { formatCurrency } from '@/lib/utils'

export interface ScoringFactors {
  age: number
  income: number
  savings: number
  debt: number
  netWorth: number
  creditScore: number
  monthlyExpenses: number
  investments: number
}

export interface ChoiceAnalysis {
  choice: Choice
  score: number
  pros: string[]
  cons: string[]
  riskAssessment: string
  opportunityCost: string
  confidenceLevel: 'high' | 'medium' | 'low'
}

export class AdvancedDecisionScorer {
  private factors: ScoringFactors
  private decisionCategory: string

  constructor(financials: FinancialState, decisionCategory: string) {
    this.factors = {
      age: financials.age,
      income: financials.income,
      savings: financials.savings,
      debt: financials.debt,
      netWorth: financials.netWorth,
      creditScore: financials.creditScore,
      monthlyExpenses: financials.monthlyExpenses,
      investments: financials.investments
    }
    this.decisionCategory = decisionCategory
  }

  analyzeChoice(choice: Choice): ChoiceAnalysis {
    const analysis: ChoiceAnalysis = {
      choice,
      score: 50, // Base score
      pros: [],
      cons: [],
      riskAssessment: '',
      opportunityCost: '',
      confidenceLevel: 'medium'
    }

    // Calculate comprehensive score
    analysis.score = this.calculateComprehensiveScore(choice, analysis)
    
    // Assess risk level
    analysis.riskAssessment = this.assessRisk(choice)
    
    // Calculate opportunity cost
    analysis.opportunityCost = this.calculateOpportunityCost(choice)
    
    // Determine confidence level
    analysis.confidenceLevel = this.determineConfidence(choice, analysis.score)

    return analysis
  }

  private calculateComprehensiveScore(choice: Choice, analysis: ChoiceAnalysis): number {
    let score = 50
    const weights = this.getDecisionWeights()

    // 1. Financial Health Assessment (25% weight)
    score += this.scoreFinancialHealth(choice) * weights.financialHealth

    // 2. Age Appropriateness (20% weight)
    score += this.scoreAgeAppropriateness(choice) * weights.ageAppropriateness

    // 3. Risk-Reward Balance (20% weight)
    score += this.scoreRiskReward(choice) * weights.riskReward

    // 4. Liquidity and Emergency Preparedness (15% weight)
    score += this.scoreLiquidity(choice) * weights.liquidity

    // 5. Long-term Growth Potential (10% weight)
    score += this.scoreGrowthPotential(choice) * weights.growthPotential

    // 6. Credit and Debt Management (10% weight)
    score += this.scoreDebtManagement(choice) * weights.debtManagement

    return Math.max(0, Math.min(100, Math.round(score)))
  }

  private getDecisionWeights() {
    // Adjust weights based on life stage
    if (this.factors.age < 18) {
      // Teenagers: Focus heavily on education and age-appropriate choices
      return {
        financialHealth: 0.10,
        ageAppropriateness: 0.40,
        riskReward: 0.15,
        liquidity: 0.05,
        growthPotential: 0.25,
        debtManagement: 0.05
      }
    } else if (this.factors.age < 25) {
      return {
        financialHealth: 0.20,
        ageAppropriateness: 0.25,
        riskReward: 0.25,
        liquidity: 0.10,
        growthPotential: 0.15,
        debtManagement: 0.05
      }
    } else if (this.factors.age < 40) {
      return {
        financialHealth: 0.25,
        ageAppropriateness: 0.20,
        riskReward: 0.20,
        liquidity: 0.15,
        growthPotential: 0.15,
        debtManagement: 0.05
      }
    } else if (this.factors.age < 55) {
      return {
        financialHealth: 0.30,
        ageAppropriateness: 0.15,
        riskReward: 0.15,
        liquidity: 0.20,
        growthPotential: 0.10,
        debtManagement: 0.10
      }
    } else {
      return {
        financialHealth: 0.35,
        ageAppropriateness: 0.10,
        riskReward: 0.10,
        liquidity: 0.25,
        growthPotential: 0.05,
        debtManagement: 0.15
      }
    }
  }

  private scoreFinancialHealth(choice: Choice): number {
    let score = 0
    
    // Handle division by zero for very young ages with no income
    const safeIncome = Math.max(this.factors.income, 1)
    const safeExpenses = Math.max(this.factors.monthlyExpenses, 1)
    
    const debtToIncomeRatio = this.factors.debt / safeIncome
    const emergencyMonths = this.factors.savings / safeExpenses
    const savingsRate = (this.factors.income - this.factors.monthlyExpenses) / safeIncome

    // Special handling for teenagers with limited income
    if (this.factors.age < 18) {
      // For teenagers, any positive savings is great
      if (choice.impact.savingsChange && choice.impact.savingsChange > 0) {
        score += 30 // Extra reward for building savings habits
      }
      // Strongly discourage debt for teenagers
      if (choice.impact.debtChange && choice.impact.debtChange > 0) {
        score -= 30
      }
      // Small investments are good learning experiences
      if (choice.impact.investmentsChange && choice.impact.investmentsChange > 0 && choice.impact.investmentsChange < 2000) {
        score += 20
      }
      return score
    }

    // Debt impact scoring for adults
    if (choice.impact.debtChange) {
      if (choice.impact.debtChange < 0 && debtToIncomeRatio > 2) {
        score += 25 // High reward for debt reduction when debt is high
      } else if (choice.impact.debtChange > 0 && debtToIncomeRatio < 1) {
        score -= 10 // Penalty for taking on debt when debt is low
      }
    }

    // Emergency fund impact
    if (choice.impact.savingsChange) {
      if (choice.impact.savingsChange > 0 && emergencyMonths < 3) {
        score += 20 // High reward for building emergency fund
      } else if (choice.impact.savingsChange < 0 && emergencyMonths < 6) {
        score -= 15 // Penalty for depleting emergency fund
      }
    }

    // Income stability
    if (choice.impact.incomeChange) {
      const incomeChangePercent = choice.impact.incomeChange / this.factors.income
      if (incomeChangePercent > 0.1) {
        score += 15 // Reward significant income increases
      } else if (incomeChangePercent < -0.05) {
        score -= 20 // Penalty for income decreases
      }
    }

    return score
  }

  private scoreAgeAppropriateness(choice: Choice): number {
    let score = 0
    const yearsToRetirement = 65 - this.factors.age

    // Teenagers (14-18): Focus on education, learning, and foundation building
    if (this.factors.age < 18) {
      if (this.decisionCategory === 'Education') {
        score += 30 // Heavily prioritize education
      }
      if (this.decisionCategory === 'Career' && choice.riskLevel === 'low') {
        score += 20 // Safe career exploration
      }
      if (choice.impact.savingsChange && choice.impact.savingsChange > 0) {
        score += 25 // Building savings habits early is crucial
      }
      if (choice.impact.investmentsChange && choice.impact.investmentsChange > 0 && choice.impact.investmentsChange < 5000) {
        score += 20 // Small investments to learn
      }
      if (choice.impact.debtChange && choice.impact.debtChange > 0) {
        score -= 25 // Avoid debt at young age
      }
      if (choice.riskLevel === 'high' && this.decisionCategory !== 'Education') {
        score -= 15 // Generally avoid high risk except for education
      }
      // Reward choices that build financial literacy
      if (choice.text?.toLowerCase().includes('learn') || choice.text?.toLowerCase().includes('education')) {
        score += 15
      }
    }
    // Young adult strategies (18-30)
    else if (this.factors.age < 30) {
      if (choice.riskLevel === 'high' && choice.timeHorizon === 'long') {
        score += 20
      }
      if (choice.impact.investmentsChange && choice.impact.investmentsChange > 0) {
        score += 15
      }
      if (this.decisionCategory === 'Education' || this.decisionCategory === 'Career') {
        score += 10
      }
    }
    
    // Mid-career strategies (30-45)
    else if (this.factors.age < 45) {
      if (choice.riskLevel === 'medium' || choice.riskLevel === 'high') {
        score += 10
      }
      if (this.decisionCategory === 'Investment' || this.decisionCategory === 'Housing') {
        score += 15
      }
      if (choice.impact.investmentsChange && choice.impact.investmentsChange > this.factors.income * 0.1) {
        score += 10
      }
    }
    
    // Pre-retirement strategies (45-60)
    else if (this.factors.age < 60) {
      if (choice.riskLevel === 'low' || choice.riskLevel === 'medium') {
        score += 15
      }
      if (choice.impact.savingsChange && choice.impact.savingsChange > 0) {
        score += 10
      }
      if (choice.impact.debtChange && choice.impact.debtChange < 0) {
        score += 20 // Debt reduction becomes critical
      }
    }
    
    // Near retirement (60+)
    else {
      if (choice.riskLevel === 'low') {
        score += 20
      }
      if (choice.riskLevel === 'high') {
        score -= 15
      }
      if (choice.impact.savingsChange && choice.impact.savingsChange > 0) {
        score += 15
      }
    }

    return score
  }

  private scoreRiskReward(choice: Choice): number {
    let score = 0
    const riskCapacity = this.calculateRiskCapacity()

    // Match risk level to capacity
    if (choice.riskLevel === 'low' && riskCapacity < 0.3) {
      score += 15
    } else if (choice.riskLevel === 'medium' && riskCapacity >= 0.3 && riskCapacity < 0.7) {
      score += 15
    } else if (choice.riskLevel === 'high' && riskCapacity >= 0.7) {
      score += 15
    } else {
      score -= 10 // Risk mismatch penalty
    }

    // Reward diversification
    if (choice.impact.investmentsChange && this.factors.investments < this.factors.netWorth * 0.6) {
      score += 10
    }

    // Penalize concentration risk
    if (choice.impact.investmentsChange && choice.impact.investmentsChange > this.factors.netWorth * 0.3) {
      score -= 5
    }

    return score
  }

  private scoreLiquidity(choice: Choice): number {
    let score = 0
    const liquidityRatio = this.factors.savings / this.factors.monthlyExpenses

    // Emergency fund adequacy
    if (liquidityRatio < 3) {
      if (choice.impact.savingsChange && choice.impact.savingsChange > 0) {
        score += 20
      }
      if (choice.impact.investmentsChange && choice.impact.investmentsChange > this.factors.savings) {
        score -= 15 // Don't over-invest when emergency fund is low
      }
    } else if (liquidityRatio > 12) {
      if (choice.impact.investmentsChange && choice.impact.investmentsChange > 0) {
        score += 10 // Excess cash should be invested
      }
    }

    return score
  }

  private scoreGrowthPotential(choice: Choice): number {
    let score = 0
    const yearsToRetirement = 65 - this.factors.age

    if (choice.impact.investmentsChange && choice.impact.investmentsChange > 0) {
      // Compound growth potential
      const potentialGrowth = choice.impact.investmentsChange * Math.pow(1.07, Math.min(yearsToRetirement, 30))
      const growthMultiple = potentialGrowth / choice.impact.investmentsChange
      
      if (growthMultiple > 5) {
        score += 15
      } else if (growthMultiple > 2) {
        score += 10
      }
    }

    // Income growth potential
    if (choice.impact.incomeChange && choice.impact.incomeChange > 0) {
      const lifetimeValue = choice.impact.incomeChange * yearsToRetirement
      if (lifetimeValue > this.factors.netWorth) {
        score += 15
      }
    }

    return score
  }

  private scoreDebtManagement(choice: Choice): number {
    let score = 0
    const debtToIncomeRatio = this.factors.debt / this.factors.income

    if (debtToIncomeRatio > 3) {
      // High debt situation - prioritize debt reduction
      if (choice.impact.debtChange && choice.impact.debtChange < 0) {
        score += 25
      }
      if (choice.impact.investmentsChange && choice.impact.investmentsChange > 0) {
        score -= 15 // Investing while high debt is suboptimal
      }
    } else if (debtToIncomeRatio < 1) {
      // Low debt situation - can focus on growth
      if (choice.impact.investmentsChange && choice.impact.investmentsChange > 0) {
        score += 10
      }
    }

    // Credit score considerations
    if (choice.impact.creditScoreChange) {
      if (this.factors.creditScore < 700 && choice.impact.creditScoreChange > 0) {
        score += 10
      }
    }

    return score
  }

  private calculateRiskCapacity(): number {
    let capacity = 0.5 // Base capacity

    // Special handling for teenagers
    if (this.factors.age < 18) {
      // Teenagers have high time horizon but low financial resources
      capacity = 0.6 // Moderate-high capacity due to time
      
      // Adjust based on savings (not income since it's often low/zero)
      if (this.factors.savings > 5000) capacity += 0.1
      if (this.factors.savings > 10000) capacity += 0.1
      
      // Any debt is concerning for teenagers
      if (this.factors.debt > 0) capacity -= 0.3
      
      return Math.max(0.2, Math.min(0.8, capacity)) // Keep in reasonable range
    }

    // Age factor (younger = higher capacity)
    capacity += (40 - this.factors.age) / 100

    // Income stability factor
    if (this.factors.income > 75000) capacity += 0.1
    if (this.factors.income > 150000) capacity += 0.1

    // Emergency fund factor
    const safeExpenses = Math.max(this.factors.monthlyExpenses, 1)
    const emergencyMonths = this.factors.savings / safeExpenses
    if (emergencyMonths > 6) capacity += 0.1
    if (emergencyMonths < 3) capacity -= 0.2

    // Debt factor
    const safeIncome = Math.max(this.factors.income, 1)
    const debtToIncomeRatio = this.factors.debt / safeIncome
    if (debtToIncomeRatio > 2) capacity -= 0.2
    if (debtToIncomeRatio < 0.5) capacity += 0.1

    // Net worth factor
    if (this.factors.netWorth > 100000) capacity += 0.1
    if (this.factors.netWorth > 500000) capacity += 0.1

    return Math.max(0, Math.min(1, capacity))
  }

  private assessRisk(choice: Choice): string {
    const riskCapacity = this.calculateRiskCapacity()
    
    // Special messaging for teenagers
    if (this.factors.age < 18) {
      if (choice.riskLevel === 'high' && this.decisionCategory !== 'Education') {
        return 'At your age, focus on building financial knowledge and habits. High-risk choices outside of education should be approached carefully.'
      } else if (choice.riskLevel === 'high' && this.decisionCategory === 'Education') {
        return 'Investing in education is the best high-return, low-risk decision you can make at your age. The long-term benefits far outweigh the costs.'
      } else if (choice.riskLevel === 'low') {
        return 'Conservative choices help build a strong financial foundation. Perfect for learning good money management habits.'
      } else {
        return 'Moderate risk is appropriate as you learn about financial decisions. Focus on building knowledge and good habits.'
      }
    }
    
    if (choice.riskLevel === 'high' && riskCapacity < 0.4) {
      return 'High risk choice may not align with your current financial capacity. Consider building more financial stability first.'
    } else if (choice.riskLevel === 'low' && riskCapacity > 0.8) {
      return 'Conservative choice is safe but may not maximize your growth potential given your strong financial position.'
    } else if (choice.riskLevel === 'medium') {
      return 'Balanced risk level appropriate for most financial situations with proper planning.'
    } else {
      return 'Risk level aligns well with your current financial capacity and goals.'
    }
  }

  private calculateOpportunityCost(choice: Choice): string {
    const alternatives = []
    
    // Special opportunity cost messaging for teenagers
    if (this.factors.age < 18) {
      if (choice.impact.savingsChange && choice.impact.savingsChange > 0) {
        const yearsToRetirement = 65 - this.factors.age
        const investmentGrowth = choice.impact.savingsChange * Math.pow(1.07, Math.min(yearsToRetirement, 47))
        alternatives.push(`Starting to save ${formatCurrency(choice.impact.savingsChange)} now could grow to over ${formatCurrency(investmentGrowth)} by retirement - the power of starting early!`)
      }
      
      if (this.decisionCategory === 'Education') {
        alternatives.push(`Education is an investment in yourself with potentially unlimited returns. The knowledge and skills gained will benefit you for life.`)
      }
      
      if (choice.impact.debtChange && choice.impact.debtChange > 0) {
        alternatives.push(`Taking on debt at your age could limit future opportunities. Consider if this expense is truly necessary or if there are alternatives.`)
      }
      
      return alternatives.length > 0 ? alternatives[0] : 'At your age, every financial decision is a learning opportunity. Focus on building good habits that will serve you for life.'
    }
    
    // Standard opportunity cost calculations for adults
    if (choice.impact.savingsChange && choice.impact.savingsChange > 0) {
      const investmentGrowth = choice.impact.savingsChange * Math.pow(1.07, 10)
      alternatives.push(`Investing this amount could grow to ${formatCurrency(investmentGrowth)} in 10 years`)
    }
    
    if (choice.impact.debtChange && choice.impact.debtChange > 0) {
      const interestCost = choice.impact.debtChange * 0.15 * 5
      alternatives.push(`This debt could cost ${formatCurrency(interestCost)} in interest over 5 years`)
    }
    
    if (choice.impact.investmentsChange && choice.impact.investmentsChange < 0) {
      const lostGrowth = Math.abs(choice.impact.investmentsChange) * Math.pow(1.07, 15)
      alternatives.push(`Withdrawing investments could cost ${formatCurrency(lostGrowth)} in potential growth`)
    }

    return alternatives.length > 0 ? alternatives[0] : 'Consider the long-term implications of this choice on your financial goals.'
  }

  private determineConfidence(choice: Choice, score: number): 'high' | 'medium' | 'low' {
    if (score >= 80) return 'high'
    if (score >= 60) return 'medium'
    return 'low'
  }
}