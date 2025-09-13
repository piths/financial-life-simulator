'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FinancialState } from '@/types/game'
import { formatCurrency } from '@/lib/utils'
import { Calculator, DollarSign, CreditCard, TrendingUp, User, Zap, Star } from 'lucide-react'

interface InitialSetupModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (financials: Partial<FinancialState>) => void
  defaultValues?: Partial<FinancialState>
  showSkipOption?: boolean
}

export function InitialSetupModal({ isOpen, onClose, onSubmit, defaultValues, showSkipOption = false }: InitialSetupModalProps) {
  const [formData, setFormData] = useState<Partial<FinancialState>>({
    age: defaultValues?.age || 14,
    income: 0,
    monthlyExpenses: 200,
    savings: 500,
    debt: 0,
    investments: 0,
    creditScore: 0, // No credit history for teenagers
    lifestyle: 'modest',
    ...defaultValues
  })

  // Update form data when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      setFormData(prev => ({
        age: defaultValues.age || 14,
        income: 0,
        monthlyExpenses: 200,
        savings: 500,
        debt: 0,
        investments: 0,
        creditScore: 0,
        lifestyle: 'modest',
        ...defaultValues
      }))
    }
  }, [defaultValues])

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof FinancialState, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.age || formData.age < 14 || formData.age > 80) {
      newErrors.age = 'Age must be between 14 and 80'
    }

    if (formData.income !== undefined && formData.income < 0) {
      newErrors.income = 'Income cannot be negative'
    }

    if (formData.monthlyExpenses === undefined || formData.monthlyExpenses < 0) {
      newErrors.monthlyExpenses = 'Monthly expenses cannot be negative'
    }

    if (formData.savings !== undefined && formData.savings < 0) {
      newErrors.savings = 'Savings cannot be negative'
    }

    if (formData.debt !== undefined && formData.debt < 0) {
      newErrors.debt = 'Debt cannot be negative'
    }

    if (formData.investments !== undefined && formData.investments < 0) {
      newErrors.investments = 'Investments cannot be negative'
    }

    if (formData.creditScore !== undefined && (formData.creditScore < 0 || formData.creditScore > 850)) {
      newErrors.creditScore = 'Credit score must be between 0 and 850 (0 for no credit history)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Calculate net worth
      const netWorth = (formData.savings || 0) + (formData.investments || 0) - (formData.debt || 0)
      
      onSubmit({
        ...formData,
        netWorth
      })
      onClose()
    }
  }

  const presets = [
    {
      name: 'Starting Teen',
      icon: <Star className="w-5 h-5" />,
      data: { age: 14, income: 0, monthlyExpenses: 200, savings: 500, debt: 0, investments: 0, creditScore: 0 }
    },
    {
      name: 'Working Teen',
      icon: <Zap className="w-5 h-5" />,
      data: { age: 15, income: 6000, monthlyExpenses: 300, savings: 1200, debt: 0, investments: 0, creditScore: 0 }
    },
    {
      name: 'Teen Saver',
      icon: <DollarSign className="w-5 h-5" />,
      data: { age: 16, income: 8000, monthlyExpenses: 400, savings: 2500, debt: 0, investments: 500, creditScore: 0 }
    },
    {
      name: 'Teen Entrepreneur',
      icon: <TrendingUp className="w-5 h-5" />,
      data: { age: 17, income: 15000, monthlyExpenses: 600, savings: 3000, debt: 0, investments: 1000, creditScore: 650 }
    },
    {
      name: 'High School Graduate',
      icon: <User className="w-5 h-5" />,
      data: { age: 18, income: 25000, monthlyExpenses: 1200, savings: 1000, debt: 0, investments: 0, creditScore: 650 }
    },
    {
      name: 'College Graduate',
      icon: <TrendingUp className="w-5 h-5" />,
      data: { age: 22, income: 45000, monthlyExpenses: 2000, savings: 2000, debt: 25000, investments: 0, creditScore: 680 }
    },
    {
      name: 'Young Professional',
      icon: <DollarSign className="w-5 h-5" />,
      data: { age: 25, income: 60000, monthlyExpenses: 2500, savings: 5000, debt: 15000, investments: 3000, creditScore: 720 }
    },
    {
      name: 'Mid-Career',
      icon: <Calculator className="w-5 h-5" />,
      data: { age: 35, income: 85000, monthlyExpenses: 4000, savings: 15000, debt: 10000, investments: 25000, creditScore: 750 }
    },
    {
      name: 'Experienced Professional',
      icon: <Calculator className="w-5 h-5" />,
      data: { age: 45, income: 120000, monthlyExpenses: 6000, savings: 50000, debt: 5000, investments: 100000, creditScore: 780 }
    },
    {
      name: 'Pre-Retirement',
      icon: <Calculator className="w-5 h-5" />,
      data: { age: 55, income: 150000, monthlyExpenses: 7000, savings: 100000, debt: 0, investments: 300000, creditScore: 800 }
    }
  ]

  const currentNetWorth = (formData.savings || 0) + (formData.investments || 0) - (formData.debt || 0)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Setup Your Financial Starting Point" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Presets */}
        <div>
          <h3 className="text-lg font-medium mb-3">Quick Start Presets</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
            {presets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, ...preset.data }))}
                className="p-3 text-left border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  {preset.icon}
                  <span className="font-medium text-sm">{preset.name}</span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Age {preset.data.age} • {formatCurrency(preset.data.income)}/year
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Setup */}
        <div>
          <h3 className="text-lg font-medium mb-3">Custom Setup</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Age */}
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <Input
                type="number"
                min="14"
                max="80"
                value={formData.age ?? ''}
                onChange={(e) => handleInputChange('age', e.target.value === '' ? 14 : parseInt(e.target.value))}
                className={errors.age ? 'border-red-500' : ''}
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
            </div>

            {/* Annual Income */}
            <div>
              <label className="block text-sm font-medium mb-1">Annual Income</label>
              <Input
                type="number"
                min="0"
                step="1"
                value={formData.income ?? ''}
                onChange={(e) => handleInputChange('income', e.target.value === '' ? 0 : parseInt(e.target.value))}
                className={errors.income ? 'border-red-500' : ''}
              />
              {errors.income && <p className="text-red-500 text-xs mt-1">{errors.income}</p>}
            </div>

            {/* Monthly Expenses */}
            <div>
              <label className="block text-sm font-medium mb-1">Monthly Expenses</label>
              <Input
                type="number"
                min="0"
                step="1"
                value={formData.monthlyExpenses ?? ''}
                onChange={(e) => handleInputChange('monthlyExpenses', e.target.value === '' ? 0 : parseInt(e.target.value))}
                className={errors.monthlyExpenses ? 'border-red-500' : ''}
              />
              {errors.monthlyExpenses && <p className="text-red-500 text-xs mt-1">{errors.monthlyExpenses}</p>}
            </div>

            {/* Savings */}
            <div>
              <label className="block text-sm font-medium mb-1">Current Savings</label>
              <Input
                type="number"
                min="0"
                step="1"
                value={formData.savings ?? ''}
                onChange={(e) => handleInputChange('savings', e.target.value === '' ? 0 : parseInt(e.target.value))}
                className={errors.savings ? 'border-red-500' : ''}
              />
              {errors.savings && <p className="text-red-500 text-xs mt-1">{errors.savings}</p>}
            </div>

            {/* Debt */}
            <div>
              <label className="block text-sm font-medium mb-1">Current Debt</label>
              <Input
                type="number"
                min="0"
                step="1"
                value={formData.debt ?? ''}
                onChange={(e) => handleInputChange('debt', e.target.value === '' ? 0 : parseInt(e.target.value))}
                className={errors.debt ? 'border-red-500' : ''}
              />
              {errors.debt && <p className="text-red-500 text-xs mt-1">{errors.debt}</p>}
            </div>

            {/* Investments */}
            <div>
              <label className="block text-sm font-medium mb-1">Current Investments</label>
              <Input
                type="number"
                min="0"
                step="1"
                value={formData.investments ?? ''}
                onChange={(e) => handleInputChange('investments', e.target.value === '' ? 0 : parseInt(e.target.value))}
                className={errors.investments ? 'border-red-500' : ''}
              />
              {errors.investments && <p className="text-red-500 text-xs mt-1">{errors.investments}</p>}
            </div>

            {/* Credit Score */}
            <div>
              <label className="block text-sm font-medium mb-1">Credit Score (0 = No Credit History)</label>
              <Input
                type="number"
                min="0"
                max="850"
                value={formData.creditScore ?? ''}
                onChange={(e) => handleInputChange('creditScore', e.target.value === '' ? 0 : parseInt(e.target.value))}
                className={errors.creditScore ? 'border-red-500' : ''}
              />
              {errors.creditScore && <p className="text-red-500 text-xs mt-1">{errors.creditScore}</p>}
              <p className="text-xs text-gray-500 mt-1">Enter 0 if you have no credit history yet</p>
            </div>

            {/* Lifestyle */}
            <div>
              <label className="block text-sm font-medium mb-1">Lifestyle</label>
              <select
                value={formData.lifestyle || 'modest'}
                onChange={(e) => handleInputChange('lifestyle', e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <option value="frugal">Frugal</option>
                <option value="modest">Modest</option>
                <option value="comfortable">Comfortable</option>
                <option value="luxurious">Luxurious</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Starting Financial Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Net Worth:</span>
                <span className={`ml-2 font-medium ${currentNetWorth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {formatCurrency(currentNetWorth)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Monthly Cash Flow:</span>
                <span className="ml-2 font-medium">
                  {formatCurrency(((formData.income || 0) / 12) - (formData.monthlyExpenses || 0))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 justify-between">
          <div>
            {showSkipOption && (
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => onSubmit({})}
              >
                Use Defaults
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Start Simulation
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}