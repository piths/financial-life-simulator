'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, ThumbsUp, ThumbsDown, Zap, Target } from 'lucide-react'
import { Decision, Choice, FinancialState } from '@/types/game'
import { formatCurrency } from '@/lib/utils'
import { analyzeFinancialDecision } from '@/lib/ai-providers'
import { AdvancedDecisionScorer, ChoiceAnalysis } from '@/lib/decision-scoring'

interface AIDecisionHelperProps {
  decision: Decision
  financials: FinancialState
  onChoiceRecommendation?: (choiceId: string, reasoning: string) => void
}

interface AIRecommendation {
  choiceId: string
  score: number
  reasoning: string
  pros: string[]
  cons: string[]
  longTermImpact: string
  riskAssessment: string
  opportunityCost: string
  confidenceLevel: 'high' | 'medium' | 'low'
}

export function AIDecisionHelper({ decision, financials, onChoiceRecommendation }: AIDecisionHelperProps) {
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [lastAnalyzedFinancials, setLastAnalyzedFinancials] = useState<string>('')

  const analyzeDecision = async (isAutomatic = false) => {
    setIsAnalyzing(true)
    if (!isAutomatic) {
      setShowAnalysis(true)
    }

    try {
      // Get Gemini analysis for the decision
      const geminiAnalysis = await analyzeFinancialDecision(
        decision.title + ': ' + decision.choices.map(c => c.text).join(', '),
        {
          age: financials.age,
          income: financials.income,
          savings: financials.savings,
          debt: financials.debt
        }
      )

      // Generate recommendation with Gemini insights
      const analysis = generateAIRecommendation(geminiAnalysis)
      setRecommendation(analysis)
      
      // Track the financial state we analyzed
      const financialSnapshot = JSON.stringify({
        age: financials.age,
        income: financials.income,
        savings: financials.savings,
        debt: financials.debt,
        netWorth: financials.netWorth
      })
      setLastAnalyzedFinancials(financialSnapshot)
    } catch (error) {
      console.error('Error analyzing decision:', error)
      // Fallback to local analysis
      const analysis = generateAIRecommendation()
      setRecommendation(analysis)
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Auto-reanalyze when financial situation changes significantly
  useEffect(() => {
    const currentFinancialSnapshot = JSON.stringify({
      age: financials.age,
      income: financials.income,
      savings: financials.savings,
      debt: financials.debt,
      netWorth: financials.netWorth
    })

    // If we have a previous analysis and the financial situation changed
    if (showAnalysis && lastAnalyzedFinancials && lastAnalyzedFinancials !== currentFinancialSnapshot) {
      // Re-analyze automatically
      analyzeDecision(true)
    }
  }, [financials.age, financials.income, financials.savings, financials.debt, financials.netWorth])

  // Reset analysis when decision changes
  useEffect(() => {
    setRecommendation(null)
    setShowAnalysis(false)
    setLastAnalyzedFinancials('')
  }, [decision.id])

  const generateAIRecommendation = (geminiInsight?: string): AIRecommendation => {
    const scorer = new AdvancedDecisionScorer(financials, decision.category)
    const choices = decision.choices

    // Analyze each choice with advanced scoring
    const analyses: ChoiceAnalysis[] = choices.map(choice => scorer.analyzeChoice(choice))

    // Find best choice
    const bestAnalysis = analyses.reduce((best, current) => 
      current.score > best.score ? current : best
    )

    // Generate enhanced long-term impact prediction
    let longTermImpact = ''
    const bestChoice = bestAnalysis.choice
    
    if (bestChoice.impact.investmentsChange && bestChoice.impact.investmentsChange > 0) {
      const yearsToRetirement = 65 - financials.age
      const futureValue = bestChoice.impact.investmentsChange * Math.pow(1.07, Math.min(yearsToRetirement, 30))
      const monthlyContribution = bestChoice.impact.investmentsChange / 12
      longTermImpact = `This ${formatCurrency(bestChoice.impact.investmentsChange)} investment could grow to approximately ${formatCurrency(futureValue)} by retirement. If you continue investing ${formatCurrency(monthlyContribution)}/month, you could accumulate over ${formatCurrency(futureValue * 2)} by age 65.`
    } else if (bestChoice.impact.debtChange && bestChoice.impact.debtChange < 0) {
      const debtReduction = Math.abs(bestChoice.impact.debtChange)
      const interestSaved = debtReduction * 0.15 * 10
      const creditImpact = bestChoice.impact.creditScoreChange || 20
      longTermImpact = `Reducing debt by ${formatCurrency(debtReduction)} could save approximately ${formatCurrency(interestSaved)} in interest over 10 years and potentially improve your credit score by ${creditImpact} points, opening doors to better rates on future loans.`
    } else if (bestChoice.impact.incomeChange && bestChoice.impact.incomeChange > 0) {
      const yearsToRetirement = 65 - financials.age
      const lifetimeIncrease = bestChoice.impact.incomeChange * yearsToRetirement
      const investmentPotential = (bestChoice.impact.incomeChange * 0.2) * Math.pow(1.07, yearsToRetirement)
      longTermImpact = `This income increase of ${formatCurrency(bestChoice.impact.incomeChange)} could add ${formatCurrency(lifetimeIncrease)} to your lifetime earnings. If you invest just 20% of the increase, it could grow to ${formatCurrency(investmentPotential)} by retirement.`
    } else if (bestChoice.impact.savingsChange && bestChoice.impact.savingsChange > 0) {
      const emergencyValue = bestChoice.impact.savingsChange
      const peaceOfMindValue = emergencyValue * 0.05 // 5% annual peace of mind value
      longTermImpact = `Building ${formatCurrency(emergencyValue)} in emergency savings provides financial security worth approximately ${formatCurrency(peaceOfMindValue)} annually in avoided stress and financial flexibility.`
    }

    return {
      choiceId: bestChoice.id,
      score: bestAnalysis.score,
      reasoning: geminiInsight || generateAdvancedReasoning(bestAnalysis, financials),
      pros: bestAnalysis.pros,
      cons: bestAnalysis.cons,
      longTermImpact,
      riskAssessment: bestAnalysis.riskAssessment,
      opportunityCost: bestAnalysis.opportunityCost,
      confidenceLevel: bestAnalysis.confidenceLevel
    }
  }

  const generateAdvancedReasoning = (analysis: ChoiceAnalysis, financials: FinancialState): string => {
    const reasons = []
    const choice = analysis.choice
    
    // Life stage reasoning
    if (financials.age < 18) {
      reasons.push(`At ${financials.age}, you're in the perfect position to build strong financial habits and learn about money management. Every dollar saved now has decades to grow.`)
    } else if (financials.age < 25) {
      reasons.push(`At ${financials.age}, you have significant time for compound growth and can recover from potential setbacks.`)
    } else if (financials.age < 40) {
      reasons.push(`In your ${Math.floor(financials.age/10)*10}s, balancing growth and stability becomes crucial for long-term wealth building.`)
    } else if (financials.age < 55) {
      reasons.push(`As you approach peak earning years, optimizing for both growth and risk management is essential.`)
    } else {
      reasons.push(`With retirement approaching, preserving capital while maintaining some growth exposure is key.`)
    }
    
    // Financial health reasoning
    const safeIncome = Math.max(financials.income, 1)
    const safeExpenses = Math.max(financials.monthlyExpenses, 1)
    const debtToIncomeRatio = financials.debt / safeIncome
    const emergencyMonths = financials.savings / safeExpenses
    
    // Special handling for teenagers
    if (financials.age < 18) {
      if (financials.savings > 1000) {
        reasons.push(`You're already ahead of most teenagers with ${formatCurrency(financials.savings)} in savings. This shows excellent financial discipline.`)
      } else if (financials.savings > 0) {
        reasons.push(`Building your savings to ${formatCurrency(financials.savings)} is a great start. Keep developing these good money habits.`)
      }
      
      if (financials.debt > 0) {
        reasons.push(`Having debt at your age is concerning. Focus on avoiding unnecessary expenses and building positive financial habits instead.`)
      }
      
      if (decision?.category === 'Education') {
        reasons.push(`Education investments at your age have the highest return potential of any financial decision you can make.`)
      }
    } else {
      // Adult financial health reasoning
      if (debtToIncomeRatio > 3) {
        reasons.push(`Your debt-to-income ratio of ${(debtToIncomeRatio * 100).toFixed(0)}% suggests prioritizing debt reduction for financial stability.`)
      } else if (debtToIncomeRatio < 1) {
        reasons.push(`With manageable debt levels, you have flexibility to focus on wealth building strategies.`)
      }
      
      if (emergencyMonths < 3) {
        reasons.push(`With only ${emergencyMonths.toFixed(1)} months of expenses saved, building emergency reserves should be a priority.`)
      } else if (emergencyMonths > 8) {
        reasons.push(`Your strong emergency fund of ${emergencyMonths.toFixed(1)} months provides excellent financial security for growth-oriented decisions.`)
      }
    }
    
    // Risk capacity reasoning
    if (choice.riskLevel === 'high' && financials.netWorth > 100000) {
      reasons.push(`Your solid net worth of ${formatCurrency(financials.netWorth)} provides the foundation to take calculated risks for higher returns.`)
    } else if (choice.riskLevel === 'low' && financials.netWorth < 25000) {
      reasons.push(`A conservative approach aligns with building your initial financial foundation.`)
    }
    
    // Confidence-based reasoning
    if (analysis.confidenceLevel === 'high') {
      reasons.push(`This recommendation has high confidence based on your financial profile and current market conditions.`)
    } else if (analysis.confidenceLevel === 'low') {
      reasons.push(`While this choice has merit, consider seeking additional financial advice given the complexity of your situation.`)
    }
    
    return reasons.join(' ') || 'This choice aligns well with your current financial situation and long-term goals.'
  }

  return (
    <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">
              AI Decision Assistant
            </CardTitle>
          </div>
          {!showAnalysis && (
            <Button 
              onClick={() => analyzeDecision(false)}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Zap className="w-4 h-4 mr-1" />
              Analyze
            </Button>
          )}
          {showAnalysis && !isAnalyzing && (
            <Button 
              onClick={() => analyzeDecision(false)}
              size="sm"
              variant="outline"
              className="text-purple-600 border-purple-600 hover:bg-purple-50"
            >
              <Zap className="w-4 h-4 mr-1" />
              Re-analyze
            </Button>
          )}
        </div>
      </CardHeader>
      
      {showAnalysis && (
        <CardContent className="pt-0">
          {isAnalyzing ? (
            <div className="flex items-center gap-3 py-6">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                AI is analyzing your options...
              </span>
            </div>
          ) : recommendation ? (
            <div className="space-y-4">
              {/* Recommendation Score */}
              <div className="flex items-center gap-3 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-purple-900 dark:text-purple-100">
                      Recommended Choice
                    </span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        recommendation.score >= 80 ? 'bg-green-500' :
                        recommendation.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        {recommendation.score}/100 match
                      </span>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        recommendation.confidenceLevel === 'high' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                        recommendation.confidenceLevel === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                      }`}>
                        {recommendation.confidenceLevel} confidence
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    {decision.choices.find(c => c.id === recommendation.choiceId)?.text}
                  </p>
                </div>
              </div>

              {/* Reasoning */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                  AI Reasoning
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {recommendation.reasoning}
                </p>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendation.pros.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">
                        Advantages
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {recommendation.pros.map((pro, index) => (
                        <li key={index} className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-1">
                          <span className="text-green-500 mt-1">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {recommendation.cons.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <ThumbsDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                      <span className="text-sm font-medium text-red-800 dark:text-red-200">
                        Considerations
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {recommendation.cons.map((con, index) => (
                        <li key={index} className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-1">
                          <span className="text-red-500 mt-1">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Risk Assessment */}
              {recommendation.riskAssessment && (
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h4 className="font-medium text-orange-900 dark:text-orange-100 text-sm mb-1">
                    Risk Assessment
                  </h4>
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    {recommendation.riskAssessment}
                  </p>
                </div>
              )}

              {/* Opportunity Cost */}
              {recommendation.opportunityCost && (
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-medium text-purple-900 dark:text-purple-100 text-sm mb-1">
                    Opportunity Cost
                  </h4>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    {recommendation.opportunityCost}
                  </p>
                </div>
              )}

              {/* Long-term Impact */}
              {recommendation.longTermImpact && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-1">
                    Long-term Projection
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {recommendation.longTermImpact}
                  </p>
                </div>
              )}

              {/* Action Button */}
              {onChoiceRecommendation && (
                <Button
                  onClick={() => onChoiceRecommendation(recommendation.choiceId, recommendation.reasoning)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  size="sm"
                >
                  Follow AI Recommendation
                </Button>
              )}
            </div>
          ) : null}
        </CardContent>
      )}
    </Card>
  )
}