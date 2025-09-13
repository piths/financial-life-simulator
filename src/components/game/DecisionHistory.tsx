'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Decision } from '@/types/game'
import { formatCurrency } from '@/lib/utils'
import { ChevronDown, ChevronRight, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface DecisionHistoryProps {
  decisions: Decision[]
}

export function DecisionHistory({ decisions }: DecisionHistoryProps) {
  const [expandedDecisions, setExpandedDecisions] = useState<Set<string>>(new Set())

  const completedDecisions = decisions.filter(d => d.selectedChoice).sort((a, b) => a.age - b.age)

  const toggleDecision = (decisionId: string) => {
    const newExpanded = new Set(expandedDecisions)
    if (newExpanded.has(decisionId)) {
      newExpanded.delete(decisionId)
    } else {
      newExpanded.add(decisionId)
    }
    setExpandedDecisions(newExpanded)
  }

  const getImpactIcon = (impact: any) => {
    const totalImpact = (impact.savingsChange || 0) + (impact.investmentsChange || 0) - (impact.debtChange || 0)
    if (totalImpact > 0) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (totalImpact < 0) return <TrendingDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const getImpactColor = (impact: any) => {
    const totalImpact = (impact.savingsChange || 0) + (impact.investmentsChange || 0) - (impact.debtChange || 0)
    if (totalImpact > 0) return 'text-green-600 dark:text-green-400'
    if (totalImpact < 0) return 'text-red-600 dark:text-red-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  if (completedDecisions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">No decisions made yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Your Decision Journey ({completedDecisions.length} decisions)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {completedDecisions.map((decision) => {
          const selectedChoice = decision.choices.find(c => c.id === decision.selectedChoice)
          const isExpanded = expandedDecisions.has(decision.id)

          if (!selectedChoice) return null

          return (
            <div key={decision.id} className="border border-gray-200 dark:border-slate-600 rounded-lg">
              <button
                onClick={() => toggleDecision(decision.id)}
                className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Age {decision.age}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{decision.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedChoice.text}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getImpactIcon(selectedChoice.impact)}
                    <span className="text-xs text-gray-500 dark:text-gray-400">{decision.category}</span>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100 dark:border-slate-700">
                  <div className="pt-3 space-y-3">
                    {/* Decision Context */}
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{decision.description}</p>
                    </div>

                    {/* Selected Choice Details */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="font-medium text-blue-900 dark:text-blue-300 mb-1">Your Choice:</p>
                      <p className="text-sm text-blue-800 dark:text-blue-400 mb-2">{selectedChoice.explanation}</p>

                      {/* Financial Impact */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {selectedChoice.impact.incomeChange && (
                          <div className={getImpactColor(selectedChoice.impact)}>
                            Income: {selectedChoice.impact.incomeChange > 0 ? '+' : ''}{formatCurrency(selectedChoice.impact.incomeChange)}
                          </div>
                        )}
                        {selectedChoice.impact.savingsChange && (
                          <div className={getImpactColor(selectedChoice.impact)}>
                            Savings: {selectedChoice.impact.savingsChange > 0 ? '+' : ''}{formatCurrency(selectedChoice.impact.savingsChange)}
                          </div>
                        )}
                        {selectedChoice.impact.debtChange && (
                          <div className={getImpactColor({ debtChange: -selectedChoice.impact.debtChange })}>
                            Debt: {selectedChoice.impact.debtChange > 0 ? '+' : ''}{formatCurrency(selectedChoice.impact.debtChange)}
                          </div>
                        )}
                        {selectedChoice.impact.investmentsChange && (
                          <div className={getImpactColor(selectedChoice.impact)}>
                            Investments: {selectedChoice.impact.investmentsChange > 0 ? '+' : ''}{formatCurrency(selectedChoice.impact.investmentsChange)}
                          </div>
                        )}
                        {selectedChoice.impact.expensesChange && (
                          <div className={getImpactColor({ expensesChange: -selectedChoice.impact.expensesChange })}>
                            Monthly Expenses: {selectedChoice.impact.expensesChange > 0 ? '+' : ''}{formatCurrency(selectedChoice.impact.expensesChange)}
                          </div>
                        )}
                        {selectedChoice.impact.creditScoreChange && (
                          <div className={selectedChoice.impact.creditScoreChange > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                            Credit Score: {selectedChoice.impact.creditScoreChange > 0 ? '+' : ''}{selectedChoice.impact.creditScoreChange}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Alternative Choices */}
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Other options you had:</p>
                      <div className="space-y-1">
                        {decision.choices
                          .filter(c => c.id !== decision.selectedChoice)
                          .map(choice => (
                            <div key={choice.id} className="text-xs text-gray-500 dark:text-gray-400 pl-2 border-l-2 border-gray-200 dark:border-slate-600">
                              {choice.text}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}