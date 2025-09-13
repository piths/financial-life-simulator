'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FinancialState } from '@/types/game'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, TrendingDown, DollarSign, CreditCard, PiggyBank, Target, Calendar, Award } from 'lucide-react'

interface FinancialSummaryProps {
  financials: FinancialState
  startingAge: number
  finalScore: number
}

export function FinancialSummary({ financials, startingAge, finalScore }: FinancialSummaryProps) {
  const yearsSimulated = financials.age - startingAge
  const monthlyNetWorth = financials.netWorth / (yearsSimulated * 12 || 1)
  const debtToIncomeRatio = financials.income > 0 ? (financials.debt / financials.income) * 100 : 0
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    if (score >= 40) return 'text-orange-600 dark:text-orange-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A+'
    if (score >= 80) return 'A'
    if (score >= 70) return 'B'
    if (score >= 60) return 'C'
    if (score >= 50) return 'D'
    return 'F'
  }

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600 dark:text-green-400'
    if (score >= 700) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-emerald-200 dark:border-emerald-800">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-8 h-8 text-emerald-600" />
              <div>
                <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">
                  Financial Score: {finalScore}/100
                </h3>
                <p className={`text-lg font-semibold ${getScoreColor(finalScore)}`}>
                  Grade: {getScoreGrade(finalScore)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Journey Duration</p>
                <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                  {yearsSimulated} years
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Monthly Growth</p>
                <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                  {formatCurrency(monthlyNetWorth)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Assets */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm sm:text-base flex items-center gap-2 text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4" />
              Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-blue-500" />
                <span className="text-xs sm:text-sm">Savings</span>
              </div>
              <span className="font-medium text-green-600 dark:text-green-400 text-xs sm:text-sm">
                {formatCurrency(financials.savings)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-500" />
                <span className="text-xs sm:text-sm">Investments</span>
              </div>
              <span className="font-medium text-green-600 dark:text-green-400 text-xs sm:text-sm">
                {formatCurrency(financials.investments)}
              </span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center font-semibold text-xs sm:text-sm">
                <span>Total Assets</span>
                <span className="text-green-600 dark:text-green-400">
                  {formatCurrency(financials.savings + financials.investments)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liabilities & Income */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm sm:text-base flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <DollarSign className="w-4 h-4" />
              Income & Debt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-500" />
                <span className="text-xs sm:text-sm">Annual Income</span>
              </div>
              <span className="font-medium text-green-600 dark:text-green-400 text-xs sm:text-sm">
                {formatCurrency(financials.income)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-red-500" />
                <span className="text-xs sm:text-sm">Total Debt</span>
              </div>
              <span className="font-medium text-red-600 dark:text-red-400 text-xs sm:text-sm">
                {formatCurrency(financials.debt)}
              </span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span>Debt-to-Income Ratio</span>
                <span className={debtToIncomeRatio > 40 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                  {debtToIncomeRatio.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Net Worth & Credit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">Final Net Worth</h3>
            <p className={`text-2xl sm:text-3xl font-bold ${financials.netWorth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {formatCurrency(financials.netWorth)}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              {financials.netWorth >= 0 ? 'Positive' : 'Negative'} net worth
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold text-purple-800 dark:text-purple-300 mb-2">Credit Score</h3>
            <p className={`text-2xl sm:text-3xl font-bold ${getCreditScoreColor(financials.creditScore)}`}>
              {financials.creditScore}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              {financials.creditScore >= 750 ? 'Excellent' : 
               financials.creditScore >= 700 ? 'Good' : 
               financials.creditScore >= 650 ? 'Fair' : 'Poor'} credit
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lifestyle & Expenses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Lifestyle Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Lifestyle</p>
              <p className="font-medium capitalize">{financials.lifestyle}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Monthly Expenses</p>
              <p className="font-medium">{formatCurrency(financials.monthlyExpenses)}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Annual Expenses</p>
              <p className="font-medium">{formatCurrency(financials.monthlyExpenses * 12)}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Savings Rate</p>
              <p className="font-medium">
                {financials.income > 0 ? 
                  `${(((financials.income - (financials.monthlyExpenses * 12)) / financials.income) * 100).toFixed(1)}%` : 
                  'N/A'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}