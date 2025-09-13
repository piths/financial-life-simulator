'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bot, Sparkles, TrendingUp, AlertCircle, X } from 'lucide-react'
import { FinancialState, Decision } from '@/types/game'
import { formatCurrency } from '@/lib/utils'
import { generatePersonalizedTips, analyzeFinancialDecision } from '@/lib/ai-providers'

interface AIAdvisorProps {
  financials: FinancialState
  currentDecision?: Decision | null
  onDismiss?: () => void
}

interface AIInsight {
  type: 'warning' | 'opportunity' | 'achievement' | 'tip'
  title: string
  message: string
  icon: React.ReactNode
  priority: number
}

export function AIAdvisor({ financials, currentDecision, onDismiss }: AIAdvisorProps) {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [currentInsight, setCurrentInsight] = useState(0)
  const [isThinking, setIsThinking] = useState(false)
  const [geminiInsights, setGeminiInsights] = useState<string[]>([])
  const [geminiAnalysis, setGeminiAnalysis] = useState<string>('')
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  const fetchGeminiInsights = async () => {
    try {
      const userProfile = {
        age: financials.age,
        income: financials.income,
        savings: financials.savings,
        debt: financials.debt,
        goals: ['Financial Independence', 'Debt Reduction', 'Investment Growth']
      }
      
      const result = await generatePersonalizedTips(userProfile)
      setGeminiInsights(result.tips)
      setIsUsingFallback(!result.isAIGenerated)

      if (currentDecision) {
        const analysis = await analyzeFinancialDecision(
          currentDecision.title,
          {
            age: financials.age,
            income: financials.income,
            savings: financials.savings,
            debt: financials.debt
          }
        )
        setGeminiAnalysis(analysis)
      }
    } catch (error) {
      console.error('Error fetching Gemini insights:', error)
    }
  }

  const generateInsights = () => {
    const newInsights: AIInsight[] = []

    // Add Gemini-powered insights
    geminiInsights.forEach((tip, index) => {
      if (tip && tip.length > 0) {
        newInsights.push({
          type: 'tip',
          title: 'AI Personalized Tip',
          message: tip.replace('•', '').trim(),
          icon: <Sparkles className="w-5 h-5 text-purple-500" />,
          priority: 10 - index
        })
      }
    })

    // Add Gemini decision analysis
    if (geminiAnalysis && currentDecision) {
      newInsights.push({
        type: 'tip',
        title: 'AI Decision Analysis',
        message: geminiAnalysis,
        icon: <Bot className="w-5 h-5 text-blue-500" />,
        priority: 11
      })
    }

    // Debt analysis
    if (financials.debt > financials.income * 3) {
      newInsights.push({
        type: 'warning',
        title: 'High Debt Alert',
        message: `Your debt-to-income ratio is concerning. Consider prioritizing debt reduction - even an extra $100/month could save thousands in interest.`,
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        priority: 9
      })
    }

    // Emergency fund analysis
    const monthlyExpenses = financials.monthlyExpenses
    const emergencyFundMonths = financials.savings / monthlyExpenses
    if (emergencyFundMonths < 3) {
      newInsights.push({
        type: 'warning',
        title: 'Emergency Fund Gap',
        message: `You have ${emergencyFundMonths.toFixed(1)} months of expenses saved. Aim for 3-6 months to protect against unexpected events.`,
        icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
        priority: 8
      })
    }

    // Investment opportunity
    if (financials.savings > monthlyExpenses * 6 && financials.investments < financials.savings * 0.5) {
      newInsights.push({
        type: 'opportunity',
        title: 'Investment Opportunity',
        message: `With ${formatCurrency(financials.savings)} in savings, consider investing some for long-term growth. Time in the market beats timing the market!`,
        icon: <TrendingUp className="w-5 h-5 text-green-500" />,
        priority: 7
      })
    }

    // Age-specific advice
    if (financials.age < 30 && financials.investments < financials.income * 0.5) {
      newInsights.push({
        type: 'tip',
        title: 'Young Investor Advantage',
        message: `At ${financials.age}, you have time on your side! Even small investments now can grow significantly. Consider aggressive growth strategies.`,
        icon: <Sparkles className="w-5 h-5 text-blue-500" />,
        priority: 6
      })
    }

    // Net worth milestone
    if (financials.netWorth > 100000 && financials.netWorth < 150000) {
      newInsights.push({
        type: 'achievement',
        title: 'Wealth Building Milestone',
        message: `Congratulations! You're approaching $150K net worth. The first $100K is the hardest - compound growth accelerates from here.`,
        icon: <Sparkles className="w-5 h-5 text-purple-500" />,
        priority: 5
      })
    }

    // Credit score insights
    if (financials.creditScore < 700) {
      newInsights.push({
        type: 'tip',
        title: 'Credit Score Boost',
        message: `Your credit score of ${financials.creditScore} has room for improvement. Pay bills on time and keep credit utilization below 30%.`,
        icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
        priority: 4
      })
    }

    // Decision-specific advice
    if (currentDecision) {
      if (currentDecision.category === 'Investment' && financials.debt > 0) {
        newInsights.push({
          type: 'tip',
          title: 'Debt vs Investment Strategy',
          message: `Consider your debt interest rates. If they're above 6-7%, paying off debt might give better guaranteed returns than investing.`,
          icon: <Bot className="w-5 h-5 text-cyan-500" />,
          priority: 8
        })
      }
    }

    // Sort by priority and take top 3
    return newInsights.sort((a, b) => b.priority - a.priority).slice(0, 3)
  }

  useEffect(() => {
    setIsThinking(true)
    
    // Fetch Gemini insights first, then generate all insights
    const fetchAndGenerate = async () => {
      await fetchGeminiInsights()
      // Small delay to show thinking animation
      setTimeout(() => {
        setInsights(generateInsights())
        setIsThinking(false)
      }, 1000)
    }

    fetchAndGenerate()
  }, [financials, currentDecision])

  // Re-generate insights when Gemini data changes
  useEffect(() => {
    if (!isThinking && (geminiInsights.length > 0 || geminiAnalysis)) {
      setInsights(generateInsights())
    }
  }, [geminiInsights, geminiAnalysis])

  useEffect(() => {
    if (insights.length > 1) {
      const interval = setInterval(() => {
        setCurrentInsight((prev) => (prev + 1) % insights.length)
      }, 8000) // Change insight every 8 seconds

      return () => clearInterval(interval)
    }
  }, [insights.length])

  if (insights.length === 0 && !isThinking) return null

  const insight = insights[currentInsight]

  return (
    <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
              AI Financial Advisor
              {isUsingFallback && (
                <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                  Offline Mode
                </span>
              )}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {insights.length > 1 && (
              <div className="flex gap-1">
                {insights.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentInsight 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            )}
            {onDismiss && (
              <Button variant="ghost" size="sm" onClick={onDismiss}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isThinking ? (
          <div className="flex items-center gap-3 py-4">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Analyzing your financial situation...
            </span>
          </div>
        ) : insight ? (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              {insight.icon}
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {insight.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {insight.message}
                </p>
              </div>
            </div>
            
            {insights.length > 1 && (
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Insight {currentInsight + 1} of {insights.length}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentInsight((prev) => 
                      prev === 0 ? insights.length - 1 : prev - 1
                    )}
                    className="h-6 px-2 text-xs"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentInsight((prev) => 
                      (prev + 1) % insights.length
                    )}
                    className="h-6 px-2 text-xs"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}