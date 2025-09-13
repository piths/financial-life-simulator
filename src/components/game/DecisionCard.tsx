'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Decision, Choice } from '@/types/game'
import { formatCurrency } from '@/lib/utils'
import { Info, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

interface DecisionCardProps {
  decision: Decision
  onChoiceSelect: (choiceId: string) => void
}

export function DecisionCard({ decision, onChoiceSelect }: DecisionCardProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [showEducationalTip, setShowEducationalTip] = useState<string | null>(null)
  const getImpactText = (choice: Choice) => {
    const impacts = []
    
    if (choice.impact.incomeChange) {
      impacts.push(`Income: ${choice.impact.incomeChange > 0 ? '+' : ''}${formatCurrency(choice.impact.incomeChange)}`)
    }
    if (choice.impact.expensesChange) {
      impacts.push(`Expenses: ${choice.impact.expensesChange > 0 ? '+' : ''}${formatCurrency(choice.impact.expensesChange)}`)
    }
    if (choice.impact.savingsChange) {
      impacts.push(`Savings: ${choice.impact.savingsChange > 0 ? '+' : ''}${formatCurrency(choice.impact.savingsChange)}`)
    }
    if (choice.impact.debtChange) {
      impacts.push(`Debt: ${choice.impact.debtChange > 0 ? '+' : ''}${formatCurrency(choice.impact.debtChange)}`)
    }
    if (choice.impact.investmentsChange) {
      impacts.push(`Investments: ${choice.impact.investmentsChange > 0 ? '+' : ''}${formatCurrency(choice.impact.investmentsChange)}`)
    }
    if (choice.impact.creditScoreChange) {
      impacts.push(`Credit Score: ${choice.impact.creditScoreChange > 0 ? '+' : ''}${choice.impact.creditScoreChange}`)
    }
    
    return impacts.join(', ')
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'medium': return <TrendingUp className="w-4 h-4 text-yellow-500" />
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return null
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'high': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }
  }

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId)
    // Add a small delay to show the selection before proceeding
    setTimeout(() => {
      onChoiceSelect(choiceId)
      setSelectedChoice(null)
    }, 300)
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <span className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-1 rounded border dark:border-emerald-800 w-fit">
            Age {decision.age} • {decision.category}
          </span>
        </div>
        <CardTitle className="text-lg sm:text-xl">{decision.title}</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          {decision.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {decision.choices.map((choice) => (
            <div 
              key={choice.id} 
              className={`border rounded-lg p-3 sm:p-4 transition-all duration-300 ${
                selectedChoice === choice.id 
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700 scale-[1.01] sm:scale-[1.02]' 
                  : 'hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-600'
              }`}
            >
              {/* Mobile-first layout */}
              <div className="space-y-3">
                {/* Title and risk info */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base leading-tight">{choice.text}</h4>
                      {choice.riskLevel && getRiskIcon(choice.riskLevel)}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getRiskColor(choice.riskLevel)}`}>
                        {choice.riskLevel} risk
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {choice.timeHorizon} term
                      </span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 sm:flex-shrink-0">
                    {choice.educationalTip && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowEducationalTip(
                          showEducationalTip === choice.id ? null : choice.id
                        )}
                        className="p-2"
                      >
                        <Info className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    )}
                    <Button 
                      onClick={() => handleChoiceSelect(choice.id)}
                      size="sm"
                      disabled={selectedChoice === choice.id}
                      className="text-xs sm:text-sm px-3 sm:px-4"
                    >
                      {selectedChoice === choice.id ? 'Selected...' : 'Choose'}
                    </Button>
                  </div>
                </div>
                
                {/* Explanation */}
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{choice.explanation}</p>
                
                {/* Educational tip */}
                {showEducationalTip === choice.id && choice.educationalTip && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">{choice.educationalTip}</p>
                    </div>
                  </div>
                )}
                
                {/* Financial impact */}
                {getImpactText(choice) && (
                  <div className="bg-gray-100 dark:bg-slate-800 rounded p-2 sm:p-3">
                    <p className="text-xs text-gray-600 dark:text-gray-300 font-medium mb-1">Financial Impact:</p>
                    <p className="text-xs text-gray-700 dark:text-gray-200 font-mono break-words">
                      {getImpactText(choice)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}