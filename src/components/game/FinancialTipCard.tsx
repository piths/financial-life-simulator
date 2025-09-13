'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FinancialTip } from '@/types/game'
import { Lightbulb, X } from 'lucide-react'

interface FinancialTipCardProps {
  tip: FinancialTip
  onDismiss: () => void
}

export function FinancialTipCard({ tip, onDismiss }: FinancialTipCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'budgeting': return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'investing': return 'bg-green-50 border-green-200 text-green-800'
      case 'debt': return 'bg-red-50 border-red-200 text-red-800'
      case 'career': return 'bg-purple-50 border-purple-200 text-purple-800'
      case 'emergency': return 'bg-orange-50 border-orange-200 text-orange-800'
      default: return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  return (
    <Card className="border-l-4 border-l-yellow-400 bg-yellow-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <CardTitle className="text-lg text-yellow-800">Financial Tip</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(tip.category)}`}>
            {tip.category}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
        <p className="text-sm text-gray-700">{tip.content}</p>
      </CardContent>
    </Card>
  )
}