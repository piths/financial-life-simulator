'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lightbulb, TrendingUp, Users, Calendar, ChevronRight } from 'lucide-react'
import { FinancialState, Decision } from '@/types/game'
import { formatCurrency, formatPercentage } from '@/lib/utils'

interface AIPersonalizedInsightsProps {
    financials: FinancialState
    decisionHistory: Decision[]
    onInsightClick?: (insight: PersonalizedInsight) => void
}

interface PersonalizedInsight {
    id: string
    category: 'comparison' | 'prediction' | 'optimization' | 'milestone'
    title: string
    description: string
    value: string
    change?: number
    actionable: boolean
    priority: number
}

export function AIPersonalizedInsights({
    financials,
    decisionHistory,
    onInsightClick
}: AIPersonalizedInsightsProps) {
    const [insights, setInsights] = useState<PersonalizedInsight[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    useEffect(() => {
        generatePersonalizedInsights()
    }, [financials, decisionHistory])

    const generatePersonalizedInsights = () => {
        const newInsights: PersonalizedInsight[] = []

        // Peer comparison insights
        const avgNetWorthForAge = getAverageNetWorthForAge(financials.age)
        const percentile = calculatePercentile(financials.netWorth, financials.age)

        newInsights.push({
            id: 'peer-comparison',
            category: 'comparison',
            title: 'Peer Comparison',
            description: `You're in the ${percentile}th percentile for your age group`,
            value: `${percentile > 50 ? 'Above' : 'Below'} Average`,
            change: ((financials.netWorth - avgNetWorthForAge) / avgNetWorthForAge) * 100,
            actionable: percentile < 50,
            priority: 8
        })

        // Retirement prediction
        const retirementProjection = calculateRetirementProjection(financials)
        newInsights.push({
            id: 'retirement-projection',
            category: 'prediction',
            title: 'Retirement Outlook',
            description: 'Based on current savings rate and investments',
            value: formatCurrency(retirementProjection.projectedValue),
            change: retirementProjection.confidenceScore,
            actionable: retirementProjection.projectedValue < 1000000,
            priority: 9
        })

        // Savings rate optimization
        const savingsRate = (financials.savings / (financials.income * 12)) * 100
        if (savingsRate < 20) {
            newInsights.push({
                id: 'savings-optimization',
                category: 'optimization',
                title: 'Savings Rate Boost',
                description: `Current rate: ${savingsRate.toFixed(1)}%. Target: 20%+`,
                value: `+${formatCurrency((financials.income * 0.2) - (financials.savings / 12))} monthly`,
                actionable: true,
                priority: 7
            })
        }

        // Debt payoff timeline
        if (financials.debt > 0) {
            const payoffTime = calculateDebtPayoffTime(financials)
            newInsights.push({
                id: 'debt-payoff',
                category: 'optimization',
                title: 'Debt Freedom Timeline',
                description: `At current rate, debt-free in ${payoffTime.years} years`,
                value: `Save ${formatCurrency(payoffTime.interestSaved)} in interest`,
                change: payoffTime.years,
                actionable: payoffTime.years > 5,
                priority: 8
            })
        }

        // Investment allocation insight
        const investmentRatio = financials.investments / financials.netWorth
        if (investmentRatio < 0.6 && financials.age < 50) {
            newInsights.push({
                id: 'investment-allocation',
                category: 'optimization',
                title: 'Investment Allocation',
                description: `${formatPercentage(investmentRatio)} invested. Consider increasing for growth`,
                value: 'Optimize for age',
                actionable: true,
                priority: 6
            })
        }

        // Milestone tracking
        const nextMilestone = getNextMilestone(financials.netWorth)
        if (nextMilestone) {
            newInsights.push({
                id: 'next-milestone',
                category: 'milestone',
                title: 'Next Milestone',
                description: `${formatCurrency(nextMilestone.target - financials.netWorth)} to go`,
                value: nextMilestone.name,
                change: ((financials.netWorth / nextMilestone.target) * 100),
                actionable: false,
                priority: 5
            })
        }

        // Decision pattern analysis
        const riskPattern = analyzeRiskPattern(decisionHistory)
        if (riskPattern.insight) {
            newInsights.push({
                id: 'decision-pattern',
                category: 'prediction',
                title: 'Decision Pattern',
                description: riskPattern.insight,
                value: riskPattern.recommendation,
                actionable: true,
                priority: 4
            })
        }

        setInsights(newInsights.sort((a, b) => b.priority - a.priority))
    }

    const getAverageNetWorthForAge = (age: number): number => {
        // Simplified average net worth by age (based on general statistics)
        const ageRanges = {
            25: 16000,
            30: 45000,
            35: 76000,
            40: 154000,
            45: 262000,
            50: 400000,
            55: 560000,
            60: 720000,
            65: 850000
        }

        const ages = Object.keys(ageRanges).map(Number).sort((a, b) => a - b)
        const closestAge = ages.reduce((prev, curr) =>
            Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev
        )

        return ageRanges[closestAge as keyof typeof ageRanges] || 50000
    }

    const calculatePercentile = (netWorth: number, age: number): number => {
        const avgNetWorth = getAverageNetWorthForAge(age)
        const ratio = netWorth / avgNetWorth

        if (ratio >= 2) return 90
        if (ratio >= 1.5) return 80
        if (ratio >= 1.2) return 70
        if (ratio >= 1) return 60
        if (ratio >= 0.8) return 50
        if (ratio >= 0.6) return 40
        if (ratio >= 0.4) return 30
        if (ratio >= 0.2) return 20
        return 10
    }

    const calculateRetirementProjection = (financials: FinancialState) => {
        const yearsToRetirement = 65 - financials.age
        const currentInvestments = financials.investments
        const monthlySavings = financials.savings / 12 // Assume monthly contribution
        const annualReturn = 0.07 // 7% average return

        // Future value calculation
        const futureValueCurrent = currentInvestments * Math.pow(1 + annualReturn, yearsToRetirement)
        const futureValueContributions = monthlySavings * 12 *
            ((Math.pow(1 + annualReturn, yearsToRetirement) - 1) / annualReturn)

        const totalProjected = futureValueCurrent + futureValueContributions

        return {
            projectedValue: totalProjected,
            confidenceScore: Math.min(95, 60 + (monthlySavings / 1000) * 10) // Confidence based on savings rate
        }
    }

    const calculateDebtPayoffTime = (financials: FinancialState) => {
        const monthlyPayment = Math.max(financials.monthlyExpenses * 0.1, 200) // Assume 10% of expenses or $200 min
        const interestRate = 0.15 // 15% average credit card rate
        const monthlyRate = interestRate / 12

        const months = Math.log(1 + (financials.debt * monthlyRate) / monthlyPayment) /
            Math.log(1 + monthlyRate)

        const totalPaid = monthlyPayment * months
        const interestSaved = totalPaid - financials.debt

        return {
            years: Math.ceil(months / 12),
            interestSaved: Math.max(0, interestSaved)
        }
    }

    const getNextMilestone = (netWorth: number) => {
        const milestones = [
            { name: 'First $10K', target: 10000 },
            { name: 'First $25K', target: 25000 },
            { name: 'First $50K', target: 50000 },
            { name: 'First $100K', target: 100000 },
            { name: 'Quarter Million', target: 250000 },
            { name: 'Half Million', target: 500000 },
            { name: 'Millionaire', target: 1000000 }
        ]

        return milestones.find(milestone => milestone.target > netWorth)
    }

    const analyzeRiskPattern = (decisions: Decision[]) => {
        const completedDecisions = decisions.filter(d => d.selectedChoice)
        if (completedDecisions.length < 3) return { insight: null, recommendation: '' }

        const riskCounts = { low: 0, medium: 0, high: 0 }
        completedDecisions.forEach(decision => {
            const selectedChoice = decision.choices.find(c => c.id === decision.selectedChoice)
            if (selectedChoice) {
                riskCounts[selectedChoice.riskLevel]++
            }
        })

        const totalDecisions = completedDecisions.length
        const highRiskRatio = riskCounts.high / totalDecisions
        const lowRiskRatio = riskCounts.low / totalDecisions

        if (highRiskRatio > 0.6) {
            return {
                insight: 'You tend to favor high-risk decisions',
                recommendation: 'Consider balancing with safer options'
            }
        } else if (lowRiskRatio > 0.7) {
            return {
                insight: 'You prefer conservative choices',
                recommendation: 'Consider some calculated risks for growth'
            }
        }

        return { insight: null, recommendation: '' }
    }

    const categories = [
        { id: 'all', name: 'All Insights', icon: Lightbulb },
        { id: 'comparison', name: 'Comparisons', icon: Users },
        { id: 'prediction', name: 'Predictions', icon: TrendingUp },
        { id: 'optimization', name: 'Optimization', icon: TrendingUp },
        { id: 'milestone', name: 'Milestones', icon: Calendar }
    ]

    const filteredInsights = selectedCategory === 'all'
        ? insights
        : insights.filter(insight => insight.category === selectedCategory)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    AI Personalized Insights
                </CardTitle>

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                    {categories.map(category => (
                        <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category.id)}
                            className="text-xs"
                        >
                            <category.icon className="w-3 h-3 mr-1" />
                            {category.name}
                        </Button>
                    ))}
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-3">
                    {filteredInsights.map(insight => (
                        <div
                            key={insight.id}
                            className={`p-3 rounded-lg border transition-colors cursor-pointer ${insight.actionable
                                ? 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-100/50 dark:hover:bg-blue-950/30'
                                : 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50'
                                }`}
                            onClick={() => onInsightClick?.(insight)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                            {insight.title}
                                        </h4>
                                        {insight.change !== undefined && (
                                            <span className={`text-xs px-2 py-1 rounded-full ${insight.change > 0
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                                }`}>
                                                {insight.change > 0 ? '+' : ''}{insight.change.toFixed(0)}%
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                                        {insight.description}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {insight.value}
                                    </p>
                                </div>
                                {insight.actionable && (
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                )}
                            </div>
                        </div>
                    ))}

                    {filteredInsights.length === 0 && (
                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                            <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No insights available for this category</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}