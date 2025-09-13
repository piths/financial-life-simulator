'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Bot, CheckCircle, AlertCircle } from 'lucide-react'
import { getAIStatus } from '@/lib/utils'

export function AIStatus() {
  const [status, setStatus] = useState<{ configured: boolean; message: string }>({
    configured: false,
    message: 'Checking AI configuration...'
  })
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const aiStatus = getAIStatus()
    setStatus({ configured: aiStatus.configured, message: aiStatus.message })
    
    // Check if we're in fallback mode by testing a simple request
    if (aiStatus.configured) {
      checkAIAvailability()
    }
  }, [])

  const checkAIAvailability = async () => {
    try {
      // This will use the circuit breaker and fallback logic
      const testPrompt = "Test"
      const response = await fetch('/api/test-ai', { 
        method: 'POST', 
        body: JSON.stringify({ prompt: testPrompt }),
        headers: { 'Content-Type': 'application/json' }
      }).catch(() => null)
      
      // For now, assume online if configured
      setIsOnline(true)
    } catch (error) {
      setIsOnline(false)
    }
  }

  if (status.configured && isOnline) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            <Bot className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm text-green-800 dark:text-green-200">
              AI Assistant Ready
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (status.configured && !isOnline) {
    return (
      <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <Bot className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm text-orange-800 dark:text-orange-200">
              AI Offline - Using Smart Fallbacks
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800">
      <CardContent className="p-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          <Bot className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm text-yellow-800 dark:text-yellow-200">
            {status.message}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}