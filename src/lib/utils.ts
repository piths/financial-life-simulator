import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

export function isGeminiConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_GEMINI_API_KEY && process.env.NEXT_PUBLIC_GEMINI_API_KEY.length > 0)
}

export function isGroqConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_GROQ_API_KEY && process.env.NEXT_PUBLIC_GROQ_API_KEY.length > 0)
}

export function isAIConfigured(): boolean {
  return isGeminiConfigured() || isGroqConfigured()
}

export function getAIStatus(): { configured: boolean; message: string; providers: string[] } {
  const groqConfigured = isGroqConfigured()
  const geminiConfigured = isGeminiConfigured()
  const providers = []
  
  // Prioritize Groq in the display
  if (groqConfigured) providers.push('Groq')
  if (geminiConfigured) providers.push('Gemini')
  
  const configured = providers.length > 0
  
  let message = ''
  if (configured) {
    if (groqConfigured) {
      message = `AI Assistant ready with Groq API (fast & reliable)`
    } else {
      message = `AI Assistant ready with Gemini API`
    }
  } else {
    message = 'No AI APIs configured. Add NEXT_PUBLIC_GROQ_API_KEY to your .env.local file for best performance'
  }
  
  return { configured, message, providers }
}

// Legacy function for backward compatibility
export function getGeminiStatus(): { configured: boolean; message: string } {
  const status = getAIStatus()
  return {
    configured: status.configured,
    message: status.message
  }
}