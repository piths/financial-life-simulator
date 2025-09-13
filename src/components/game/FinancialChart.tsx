'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface ChartDataPoint {
  age: number
  netWorth: number
  savings: number
  debt: number
  investments: number
}

interface FinancialChartProps {
  data: ChartDataPoint[]
  currentAge: number
}

export function FinancialChart({ data, currentAge }: FinancialChartProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-2 sm:p-4 border rounded-lg shadow-lg max-w-xs">
          <p className="font-semibold text-xs sm:text-sm">{`Age: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-xs sm:text-sm">
              {`${entry.dataKey}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const formatYAxisTick = (value: number) => {
    if (isMobile) {
      if (Math.abs(value) >= 1000000) {
        return `$${(value / 1000000).toFixed(0)}M`
      } else if (Math.abs(value) >= 1000) {
        return `$${(value / 1000).toFixed(0)}K`
      }
      return `$${value}`
    }
    return formatCurrency(value)
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ 
            top: 5, 
            right: isMobile ? 10 : 30, 
            left: isMobile ? 10 : 20, 
            bottom: 5 
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="age" 
            domain={[18, 65]}
            type="number"
            scale="linear"
            fontSize={isMobile ? 10 : 12}
            tickFormatter={(value) => `${value}`}
          />
          <YAxis 
            tickFormatter={formatYAxisTick}
            fontSize={isMobile ? 10 : 12}
            width={isMobile ? 50 : 80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }}
          />
          <Line 
            type="monotone" 
            dataKey="netWorth" 
            stroke="#10b981" 
            strokeWidth={isMobile ? 2 : 3}
            name="Net Worth"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="savings" 
            stroke="#3b82f6" 
            strokeWidth={isMobile ? 1.5 : 2}
            name="Savings"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="debt" 
            stroke="#ef4444" 
            strokeWidth={isMobile ? 1.5 : 2}
            name="Debt"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="investments" 
            stroke="#8b5cf6" 
            strokeWidth={isMobile ? 1.5 : 2}
            name="Investments"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}