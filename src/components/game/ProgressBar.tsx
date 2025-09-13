'use client'

import { FinancialState, Achievement } from '@/types/game'
import { formatCurrency } from '@/lib/utils'
import { getPercentile, nationalAverages } from '@/lib/financial-tips'
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react'

interface ProgressBarProps {
  financials: FinancialState
  progress: number // 0-100
  achievements?: Achievement[]
}

export function ProgressBar({ financials, progress, achievements = [] }: ProgressBarProps) {
  const percentile = getPercentile(financials.age, financials.netWorth)
  const avgNetWorth = nationalAverages[Math.floor(financials.age / 5) * 5] || 0
  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const recentAchievements = unlockedAchievements.slice(-3)
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-6 shadow-sm border dark:border-slate-700">
      {/* Age Progress */}
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Progress</span>
          <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">Age {financials.age} of 65</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Financial Summary - Mobile optimized grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Net Worth</p>
          <p className={`text-sm sm:text-lg font-bold ${financials.netWorth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {formatCurrency(financials.netWorth)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Monthly Income</p>
          <p className="text-sm sm:text-lg font-bold text-gray-900 dark:text-gray-100">
            {formatCurrency(financials.income)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Monthly Expenses</p>
          <p className="text-sm sm:text-lg font-bold text-gray-900 dark:text-gray-100">
            {formatCurrency(financials.monthlyExpenses)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Credit Score</p>
          <p className={`text-sm sm:text-lg font-bold ${
            financials.creditScore >= 700 ? 'text-emerald-600' : 
            financials.creditScore >= 600 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {financials.creditScore}
          </p>
        </div>
      </div>

      {/* Comparison with National Average */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t dark:border-slate-600">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">vs National Average</span>
          <div className="flex items-center gap-1">
            {financials.netWorth >= avgNetWorth ? (
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
            )}
            <span className="text-xs sm:text-sm font-medium">{percentile}th percentile</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Your Net Worth</p>
            <p className={`font-medium ${financials.netWorth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {formatCurrency(financials.netWorth)}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">National Average</p>
            <p className="font-medium text-gray-600 dark:text-gray-300">{formatCurrency(avgNetWorth)}</p>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t dark:border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Recent Achievements</span>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {recentAchievements.map(achievement => (
              <div 
                key={achievement.id}
                className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-full px-2 py-1"
              >
                <span className="text-xs sm:text-sm">{achievement.icon}</span>
                <span className="text-xs font-medium text-yellow-800 dark:text-yellow-300">{achievement.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Breakdown */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t dark:border-slate-600 grid grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Savings</p>
          <p className="font-medium text-blue-600">{formatCurrency(financials.savings)}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Investments</p>
          <p className="font-medium text-purple-600">{formatCurrency(financials.investments)}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Debt</p>
          <p className="font-medium text-red-600">{formatCurrency(financials.debt)}</p>
        </div>
      </div>
    </div>
  )
}