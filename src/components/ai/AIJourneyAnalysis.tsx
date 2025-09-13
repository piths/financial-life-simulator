'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FinancialState, Decision } from '@/types/game'
import { formatCurrency } from '@/lib/utils'
import { generateFinancialAdvice } from '@/lib/ai-providers'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  AlertTriangle, 
  Lightbulb,
  BarChart3,
  Clock,
  DollarSign,
  Zap,
  CheckCircle,
  XCircle,
  Share2,
  Download,
  FileText
} from 'lucide-react'

interface AIJourneyAnalysisProps {
  finalFinancials: FinancialState
  decisionHistory: Decision[]
  startingAge: number
}

interface AnalysisSection {
  title: string
  content: string
  score: number
  icon: React.ReactNode
  type: 'success' | 'warning' | 'info' | 'error'
}

interface DecisionAnalysis {
  category: string
  decisions: string[]
  impact: 'positive' | 'negative' | 'neutral'
  analysis: string
}

export function AIJourneyAnalysis({ finalFinancials, decisionHistory, startingAge }: AIJourneyAnalysisProps) {
  const [analysis, setAnalysis] = useState<AnalysisSection[]>([])
  const [decisionAnalysis, setDecisionAnalysis] = useState<DecisionAnalysis[]>([])
  const [overallScore, setOverallScore] = useState<number>(0)
  const [keyInsights, setKeyInsights] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const analysisRef = useRef<HTMLDivElement>(null)

  const completedDecisions = decisionHistory.filter(d => d.selectedChoice)
  const yearsSimulated = finalFinancials.age - startingAge

  useEffect(() => {
    generateAnalysis()
  }, [])

  const generateAnalysis = async () => {
    setIsAnalyzing(true)
    
    try {
      // Generate comprehensive AI analysis
      await Promise.all([
        generateOverallAnalysis(),
        generateDecisionCategoryAnalysis(),
        generateKeyInsights(),
        generateRecommendations()
      ])
    } catch (error) {
      console.error('Error generating AI analysis:', error)
      generateFallbackAnalysis()
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateOverallAnalysis = async () => {
    const prompt = `
    Analyze this person's complete financial journey and provide 4 separate analysis sections:

    FINANCIAL DATA:
    - Journey: Age ${startingAge} to ${finalFinancials.age} (${yearsSimulated} years)
    - Final Net Worth: ${formatCurrency(finalFinancials.netWorth)}
    - Income: ${formatCurrency(finalFinancials.income)}
    - Savings: ${formatCurrency(finalFinancials.savings)}
    - Debt: ${formatCurrency(finalFinancials.debt)}
    - Investments: ${formatCurrency(finalFinancials.investments)}
    - Credit Score: ${finalFinancials.creditScore}

    MAJOR DECISIONS:
    ${completedDecisions.map(d => `- ${d.category}: ${d.choices.find(c => c.id === d.selectedChoice)?.text}`).join('\n')}

    Please provide exactly 4 analysis sections, each formatted as:
    SECTION_TITLE: [Title]
    SCORE: [Number 1-100]
    ANALYSIS: [2-3 sentences of analysis]

    The 4 sections should cover:
    1. Overall Financial Performance
    2. Wealth Building Strategy  
    3. Risk Management
    4. Long-term Planning
    `

    try {
      const response = await generateFinancialAdvice(prompt)
      const analysisData = parseStructuredResponse(response)
      
      if (analysisData.length > 0) {
        setAnalysis(analysisData)
        setOverallScore(Math.round(analysisData.reduce((sum, a) => sum + a.score, 0) / analysisData.length))
      } else {
        generateFallbackOverallAnalysis()
      }
    } catch (error) {
      generateFallbackOverallAnalysis()
    }
  }

  const generateDecisionCategoryAnalysis = async () => {
    const categories = ['Education', 'Career', 'Housing', 'Investment', 'Savings', 'Lifestyle']
    const categoryAnalyses: DecisionAnalysis[] = []

    for (const category of categories) {
      const categoryDecisions = completedDecisions.filter(d => d.category === category)
      if (categoryDecisions.length === 0) continue

      const decisionTexts = categoryDecisions.map(d => 
        d.choices.find(c => c.id === d.selectedChoice)?.text || 'Unknown choice'
      )

      const prompt = `
      Analyze these ${category} decisions and their financial impact:

      DECISIONS MADE: ${decisionTexts.join(' | ')}
      FINAL NET WORTH: ${formatCurrency(finalFinancials.netWorth)}
      
      Provide:
      1. A concise 2-sentence analysis of the impact
      2. Rate the overall impact as: POSITIVE, NEGATIVE, or NEUTRAL
      
      Format your response as:
      IMPACT: [POSITIVE/NEGATIVE/NEUTRAL]
      ANALYSIS: [Your 2-sentence analysis]
      `

      try {
        const response = await generateFinancialAdvice(prompt)
        const lines = response.split('\n').filter(line => line.trim())
        
        let impact: 'positive' | 'negative' | 'neutral' = 'neutral'
        let analysis = `Made ${categoryDecisions.length} ${category.toLowerCase()} decision(s) during the simulation.`
        
        for (const line of lines) {
          if (line.startsWith('IMPACT:')) {
            const impactText = line.replace('IMPACT:', '').trim().toLowerCase()
            if (impactText.includes('positive')) impact = 'positive'
            else if (impactText.includes('negative')) impact = 'negative'
          } else if (line.startsWith('ANALYSIS:')) {
            analysis = line.replace('ANALYSIS:', '').trim()
          }
        }
        
        categoryAnalyses.push({
          category,
          decisions: decisionTexts,
          impact,
          analysis
        })
      } catch (error) {
        // Fallback analysis
        categoryAnalyses.push({
          category,
          decisions: decisionTexts,
          impact: 'neutral',
          analysis: `Made ${categoryDecisions.length} strategic ${category.toLowerCase()} decision(s) that contributed to the overall financial journey.`
        })
      }
    }

    setDecisionAnalysis(categoryAnalyses)
  }

  const generateKeyInsights = async () => {
    const prompt = `
    Analyze this ${yearsSimulated}-year financial journey and provide exactly 4 key insights:

    JOURNEY: Age ${startingAge} → ${finalFinancials.age}
    RESULT: ${formatCurrency(finalFinancials.netWorth)} net worth
    DECISIONS: ${completedDecisions.slice(0, 5).map(d => d.category).join(', ')}

    Provide exactly 4 insights, each as a single clear sentence:
    INSIGHT_1: [One key insight about what worked well]
    INSIGHT_2: [One insight about a challenge or missed opportunity] 
    INSIGHT_3: [One insight about their financial strategy]
    INSIGHT_4: [One insight about lessons for the future]
    `

    try {
      const response = await generateFinancialAdvice(prompt)
      const insights = parseInsights(response)
      
      setKeyInsights(insights.length >= 3 ? insights : getFallbackInsights())
    } catch (error) {
      setKeyInsights(getFallbackInsights())
    }
  }

  const generateRecommendations = async () => {
    const prompt = `
    Based on this financial journey (${formatCurrency(finalFinancials.netWorth)} at age ${finalFinancials.age}), provide exactly 4 actionable recommendations:

    CONTEXT: ${yearsSimulated}-year journey with ${completedDecisions.length} major decisions
    OUTCOME: ${finalFinancials.netWorth >= 0 ? 'Positive' : 'Negative'} net worth

    Provide exactly 4 recommendations:
    REC_1: [One recommendation for immediate next steps]
    REC_2: [One recommendation for long-term strategy]  
    REC_3: [One recommendation for risk management]
    REC_4: [One recommendation for optimization]

    Each should be a single, actionable sentence.
    `

    try {
      const response = await generateFinancialAdvice(prompt)
      const recs = parseRecommendations(response)
      
      setRecommendations(recs.length >= 3 ? recs : getFallbackRecommendations())
    } catch (error) {
      setRecommendations(getFallbackRecommendations())
    }
  }

  // Helper functions for parsing structured responses
  const parseStructuredResponse = (response: string): AnalysisSection[] => {
    const sections: AnalysisSection[] = []
    const lines = response.split('\n').filter(line => line.trim())
    
    let currentSection: Partial<AnalysisSection> = {}
    
    for (const line of lines) {
      if (line.startsWith('SECTION_TITLE:')) {
        if (currentSection.title && currentSection.content) {
          sections.push(completeSection(currentSection))
        }
        currentSection = { title: line.replace('SECTION_TITLE:', '').trim() }
      } else if (line.startsWith('SCORE:')) {
        const scoreText = line.replace('SCORE:', '').trim()
        currentSection.score = parseInt(scoreText) || 75
      } else if (line.startsWith('ANALYSIS:')) {
        currentSection.content = line.replace('ANALYSIS:', '').trim()
      }
    }
    
    // Add the last section
    if (currentSection.title && currentSection.content) {
      sections.push(completeSection(currentSection))
    }
    
    return sections.length > 0 ? sections : generateFallbackSections()
  }

  const completeSection = (partial: Partial<AnalysisSection>): AnalysisSection => {
    const score = partial.score || 75
    return {
      title: partial.title || 'Financial Analysis',
      content: partial.content || 'Analysis completed successfully.',
      score,
      icon: getIconForSection(0),
      type: getTypeForScore(score)
    }
  }

  const parseInsights = (response: string): string[] => {
    const insights: string[] = []
    const lines = response.split('\n').filter(line => line.trim())
    
    for (const line of lines) {
      if (line.startsWith('INSIGHT_')) {
        const insight = line.replace(/INSIGHT_\d+:/, '').trim()
        if (insight) insights.push(insight)
      }
    }
    
    return insights
  }

  const parseRecommendations = (response: string): string[] => {
    const recommendations: string[] = []
    const lines = response.split('\n').filter(line => line.trim())
    
    for (const line of lines) {
      if (line.startsWith('REC_')) {
        const rec = line.replace(/REC_\d+:/, '').trim()
        if (rec) recommendations.push(rec)
      }
    }
    
    return recommendations
  }

  const generateFallbackSections = (): AnalysisSection[] => {
    const netWorthScore = Math.min(100, Math.max(0, (finalFinancials.netWorth / 500000) * 100))
    const debtScore = finalFinancials.debt === 0 ? 100 : Math.max(0, 100 - (finalFinancials.debt / finalFinancials.income) * 20)
    
    return [
      {
        title: 'Overall Financial Performance',
        content: `Achieved ${formatCurrency(finalFinancials.netWorth)} net worth over ${yearsSimulated} years, demonstrating ${finalFinancials.netWorth > 0 ? 'positive wealth building' : 'financial challenges'}.`,
        score: Math.round(netWorthScore),
        icon: <BarChart3 className="w-5 h-5" />,
        type: getTypeForScore(netWorthScore)
      },
      {
        title: 'Debt Management',
        content: `Current debt level of ${formatCurrency(finalFinancials.debt)} ${finalFinancials.debt === 0 ? 'shows excellent debt control' : 'indicates room for improvement in debt reduction'}.`,
        score: Math.round(debtScore),
        icon: <Target className="w-5 h-5" />,
        type: getTypeForScore(debtScore)
      }
    ]
  }

  const extractScore = (text: string): number | null => {
    const scoreMatch = text.match(/(\d+)\/100|(\d+)%|score.*?(\d+)/i)
    if (scoreMatch) {
      return parseInt(scoreMatch[1] || scoreMatch[2] || scoreMatch[3])
    }
    return null
  }

  const extractTitle = (text: string): string | null => {
    const lines = text.split('\n').filter(l => l.trim())
    return lines[0]?.length < 50 ? lines[0] : null
  }

  const getIconForSection = (index: number) => {
    const icons = [
      <BarChart3 className="w-5 h-5" />,
      <TrendingUp className="w-5 h-5" />,
      <Target className="w-5 h-5" />,
      <Award className="w-5 h-5" />
    ]
    return icons[index] || <Brain className="w-5 h-5" />
  }

  const getTypeForScore = (score: number): 'success' | 'warning' | 'info' | 'error' => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'info'
    if (score >= 40) return 'warning'
    return 'error'
  }

  const generateFallbackAnalysis = () => {
    const netWorthScore = Math.min(100, Math.max(0, (finalFinancials.netWorth / 500000) * 100))
    const debtScore = finalFinancials.debt === 0 ? 100 : Math.max(0, 100 - (finalFinancials.debt / finalFinancials.income) * 20)
    
    setAnalysis([
      {
        title: 'Wealth Building Performance',
        content: `Achieved a net worth of ${formatCurrency(finalFinancials.netWorth)} over ${yearsSimulated} years. This represents ${finalFinancials.netWorth > 0 ? 'positive' : 'negative'} wealth accumulation.`,
        score: Math.round(netWorthScore),
        icon: <TrendingUp className="w-5 h-5" />,
        type: getTypeForScore(netWorthScore)
      },
      {
        title: 'Debt Management',
        content: `Current debt level: ${formatCurrency(finalFinancials.debt)}. ${finalFinancials.debt === 0 ? 'Excellent debt management with zero debt.' : 'Consider strategies to reduce debt burden.'}`,
        score: Math.round(debtScore),
        icon: <Target className="w-5 h-5" />,
        type: getTypeForScore(debtScore)
      }
    ])
    
    setOverallScore(Math.round((netWorthScore + debtScore) / 2))
  }

  const generateFallbackOverallAnalysis = () => {
    generateFallbackAnalysis()
  }

  const getFallbackInsights = (): string[] => {
    const insights = []
    
    if (finalFinancials.netWorth > 100000) {
      insights.push('Successfully built substantial wealth over the simulation period')
    }
    
    if (finalFinancials.debt === 0) {
      insights.push('Achieved debt-free status, providing financial freedom')
    }
    
    if (finalFinancials.investments > finalFinancials.savings) {
      insights.push('Prioritized investments over cash savings for long-term growth')
    }
    
    insights.push(`Made ${completedDecisions.length} major financial decisions over ${yearsSimulated} years`)
    
    return insights.slice(0, 4)
  }

  // Share and PDF functions
  const handleShare = async () => {
    const shareText = `🎯 My Financial Life Simulator Results:

📊 Journey: Age ${startingAge} → ${finalFinancials.age} (${yearsSimulated} years)
💰 Final Net Worth: ${formatCurrency(finalFinancials.netWorth)}
🏆 AI Score: ${overallScore}/100
📈 Decisions Made: ${completedDecisions.length}

Key Insights:
${keyInsights.slice(0, 3).map(insight => `• ${insight}`).join('\n')}

Try the Financial Life Simulator and see how your decisions shape your future!`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Financial Journey Analysis',
          text: shareText,
          url: window.location.origin
        })
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareText}\n\n${window.location.origin}`)
        alert('Results copied to clipboard!')
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(`${shareText}\n\n${window.location.origin}`)
      alert('Results copied to clipboard!')
    }
  }

  const generatePDF = async () => {
    if (!analysisRef.current) return
    
    setIsGeneratingPDF(true)
    
    try {
      // Dynamic imports to reduce bundle size
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default
      
      // Create a clone of the element for PDF generation
      const element = analysisRef.current.cloneNode(true) as HTMLElement
      
      // Style the cloned element for better PDF appearance
      element.style.width = '800px'
      element.style.backgroundColor = 'white'
      element.style.padding = '20px'
      element.style.fontFamily = 'Arial, sans-serif'
      
      // Temporarily add to DOM for rendering
      element.style.position = 'absolute'
      element.style.left = '-9999px'
      document.body.appendChild(element)
      
      // Generate canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })
      
      // Remove temporary element
      document.body.removeChild(element)
      
      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      
      let position = 0
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      // Save the PDF
      const fileName = `financial-journey-analysis-${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const getFallbackRecommendations = (): string[] => {
    return [
      'Continue building emergency fund with 3-6 months of expenses',
      'Diversify investments across different asset classes',
      'Review and optimize tax-advantaged retirement accounts',
      'Consider working with a financial advisor for complex decisions'
    ]
  }

  if (isAnalyzing) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Journey Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                AI is analyzing your complete financial journey...
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Reviewing {completedDecisions.length} decisions over {yearsSimulated} years
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6" ref={analysisRef}>
      {/* Overall Score */}
      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI Journey Analysis</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive review of your financial decisions</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overall Score</div>
              <Badge 
                variant={overallScore >= 80 ? 'default' : overallScore >= 60 ? 'secondary' : 'destructive'}
                className="text-lg px-3 py-1"
              >
                {overallScore}/100
              </Badge>
              <div className="flex gap-2 mt-3">
                <Button
                  onClick={handleShare}
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  onClick={generatePDF}
                  size="sm"
                  variant="outline"
                  disabled={isGeneratingPDF}
                  className="flex items-center gap-1"
                >
                  {isGeneratingPDF ? (
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {isGeneratingPDF ? 'Generating...' : 'PDF'}
                </Button>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Journey Summary</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Duration</span>
                  <span className="font-medium">{yearsSimulated} years</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Age Range</span>
                  <span className="font-medium">{startingAge} → {finalFinancials.age}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Decisions Made</span>
                  <span className="font-medium">{completedDecisions.length}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-200 dark:border-emerald-800">
                  <span className="text-sm text-emerald-700 dark:text-emerald-300">Final Net Worth</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(finalFinancials.netWorth)}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Financial Breakdown</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Annual Income</span>
                  <span className="font-medium">{formatCurrency(finalFinancials.income)}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-sm text-blue-700 dark:text-blue-300">Savings</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">{formatCurrency(finalFinancials.savings)}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
                  <span className="text-sm text-purple-700 dark:text-purple-300">Investments</span>
                  <span className="font-medium text-purple-600 dark:text-purple-400">{formatCurrency(finalFinancials.investments)}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                  <span className="text-sm text-red-700 dark:text-red-300">Debt</span>
                  <span className="font-medium text-red-600 dark:text-red-400">{formatCurrency(finalFinancials.debt)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Sections */}
      {analysis.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {analysis.map((section, index) => (
            <Card key={index} className={`border-l-4 ${
              section.type === 'success' ? 'border-l-green-500' :
              section.type === 'warning' ? 'border-l-yellow-500' :
              section.type === 'error' ? 'border-l-red-500' :
              'border-l-blue-500'
            }`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {section.icon}
                    {section.title}
                  </div>
                  <Badge variant={section.type === 'success' ? 'default' : 'secondary'}>
                    {section.score}/100
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {section.content.split('. ').map((sentence, idx) => (
                    <p key={idx} className="mb-2 last:mb-0">
                      {sentence.trim()}{sentence.includes('.') ? '' : '.'}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Decision Category Analysis */}
      {decisionAnalysis.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Decision Category Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {decisionAnalysis.map((category, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium flex items-center gap-2">
                      {category.impact === 'positive' ? <CheckCircle className="w-4 h-4 text-green-500" /> :
                       category.impact === 'negative' ? <XCircle className="w-4 h-4 text-red-500" /> :
                       <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                      {category.category}
                    </h4>
                    <Badge variant={
                      category.impact === 'positive' ? 'default' :
                      category.impact === 'negative' ? 'destructive' :
                      'secondary'
                    }>
                      {category.impact}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <strong>Key Decisions:</strong>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {category.decisions.map((decision, idx) => (
                        <span key={idx} className="inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                          {decision}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {category.analysis.split('. ').map((sentence, idx) => (
                      <p key={idx} className="mb-1 last:mb-0">
                        {sentence.trim()}{sentence.includes('.') ? '' : '.'}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Insights */}
      {keyInsights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {keyInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {rec}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Share Your Financial Journey
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share your results with friends or download a detailed PDF report of your analysis
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleShare}
                size="lg"
                variant="outline"
                className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Share2 className="w-5 h-5" />
                Share Results
              </Button>
              <Button
                onClick={generatePDF}
                size="lg"
                disabled={isGeneratingPDF}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isGeneratingPDF ? (
                  <>
                    <div className="w-5 h-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Download PDF Report
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PDF includes complete analysis, insights, and recommendations
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}