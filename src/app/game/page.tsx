'use client'

import { useEffect, useState } from 'react'
import { useGameStore } from '@/store/game-store'
import { DecisionCard } from '@/components/game/DecisionCard'
import { ProgressBar } from '@/components/game/ProgressBar'
import { FinancialChart } from '@/components/game/FinancialChart'
import { FinancialTipCard } from '@/components/game/FinancialTipCard'
import { InitialSetupModal } from '@/components/game/InitialSetupModal'
import { DecisionHistory } from '@/components/game/DecisionHistory'
import { FinancialSummary } from '@/components/game/FinancialSummary'
import { ThemeToggle } from '@/components/theme-toggle'
import { AIDecisionHelper } from '@/components/ai/AIDecisionHelper'
import { AIPersonalizedInsights } from '@/components/ai/AIPersonalizedInsights'
import { AIJourneyAnalysis } from '@/components/ai/AIJourneyAnalysis'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Share2, RotateCcw, Home, Sparkles, Brain, ChevronLeft, ChevronRight, Rewind, Settings, FileText, BarChart3, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { FinancialState } from '@/types/game'

export default function GamePage() {
  const {
    playerFinancials,
    decisionHistory,
    gameProgress,
    isGameComplete,
    achievements,
    currentTip,
    initializeGame,
    makeDecision,
    resetGame,
    getCurrentDecision,
    getNewTip,
    rewindToAge
  } = useGameStore()

  const [chartData, setChartData] = useState<any[]>([])
  const [currentView, setCurrentView] = useState('game')
  const [showAIInsights, setShowAIInsights] = useState(false)
  const [showAIHelper, setShowAIHelper] = useState(false)
  const [showInitialSetup, setShowInitialSetup] = useState(false)
  const [gameInitialized, setGameInitialized] = useState(false)
  const [completionView, setCompletionView] = useState<'summary' | 'decisions' | 'chart' | 'analysis'>('summary')

  useEffect(() => {
    // Show initial setup modal on first load
    if (decisionHistory.length === 0 && !gameInitialized) {
      setShowInitialSetup(true)
    }
  }, [decisionHistory.length, gameInitialized])

  useEffect(() => {
    // Update chart data when financials change
    const newDataPoint = {
      age: playerFinancials.age,
      netWorth: playerFinancials.netWorth,
      savings: playerFinancials.savings,
      debt: playerFinancials.debt,
      investments: playerFinancials.investments
    }

    setChartData(prev => {
      const existing = prev.find(d => d.age === playerFinancials.age)
      if (existing) {
        return prev.map(d => d.age === playerFinancials.age ? newDataPoint : d)
      }
      return [...prev, newDataPoint].sort((a, b) => a.age - b.age)
    })
  }, [playerFinancials])

  const currentDecision = getCurrentDecision()
  const startingAge = Math.max(14, playerFinancials.age - (decisionHistory.filter(d => d.selectedChoice).length * 3))
  const targetAge = Math.min(80, Math.max(65, playerFinancials.age + 10))
  const progress = ((playerFinancials.age - startingAge) / (targetAge - startingAge)) * 100

  const handleChoiceSelect = (choiceId: string) => {
    if (currentDecision) {
      makeDecision(currentDecision.id, choiceId)
    }
  }

  const handleRestart = () => {
    resetGame()
    setChartData([])
    setCurrentView('game')
    setGameInitialized(false)
    setShowInitialSetup(true)
  }

  const handleInitialSetup = (customFinancials: Partial<FinancialState>) => {
    // Reset chart data and reinitialize game with custom financials
    setChartData([])
    initializeGame(customFinancials)
    setGameInitialized(true)
    setShowInitialSetup(false)
  }

  const handleSkipSetup = () => {
    initializeGame()
    setGameInitialized(true)
    setShowInitialSetup(false)
  }

  const handleShare = () => {
    const shareText = `I just completed the Financial Life Simulator! At age 65, I achieved a net worth of ${formatCurrency(playerFinancials.netWorth)}. Try it yourself and see how your financial decisions shape your future!`
    
    if (navigator.share) {
      navigator.share({
        title: 'Financial Life Simulator Results',
        text: shareText,
        url: window.location.origin
      })
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.origin}`)
      alert('Results copied to clipboard!')
    }
  }

  // Year navigation functions
  const getCompletedDecisions = () => {
    return decisionHistory.filter(d => d.selectedChoice).sort((a, b) => a.age - b.age)
  }

  const handlePreviousYear = () => {
    const completedDecisions = getCompletedDecisions()
    const currentIndex = completedDecisions.findIndex(d => d.age >= playerFinancials.age)
    if (currentIndex > 0) {
      const previousDecision = completedDecisions[currentIndex - 1]
      rewindToAge(previousDecision.age)
    }
  }

  const handleNextYear = () => {
    const completedDecisions = getCompletedDecisions()
    const currentIndex = completedDecisions.findIndex(d => d.age > playerFinancials.age)
    if (currentIndex !== -1 && currentIndex < completedDecisions.length) {
      const nextDecision = completedDecisions[currentIndex]
      rewindToAge(nextDecision.age)
    }
  }

  const canGoBack = () => {
    const completedDecisions = getCompletedDecisions()
    return completedDecisions.length > 0 && completedDecisions[0].age < playerFinancials.age
  }

  const canGoForward = () => {
    const completedDecisions = getCompletedDecisions()
    return completedDecisions.some(d => d.age > playerFinancials.age)
  }

  const hasRewindsLeft = () => {
    return gameProgress.rewindsUsed < gameProgress.maxRewinds
  }

  if (isGameComplete) {
    const unlockedAchievements = achievements.filter(a => a.unlocked)
    const finalScore = Math.max(0, Math.round((playerFinancials.netWorth / 1000000) * 100))
    const startingAge = Math.max(14, playerFinancials.age - (decisionHistory.filter(d => d.selectedChoice).length * 3))
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-emerald-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">🎉 Simulation Complete!</h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    Age {playerFinancials.age} • Net Worth: <span className="font-semibold text-emerald-600">{formatCurrency(playerFinancials.netWorth)}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Button onClick={handleRestart} variant="outline" size="sm" className="text-xs sm:text-sm">
                    <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Try Again</span>
                    <span className="sm:hidden">Retry</span>
                  </Button>
                  <Link href="/">
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                      <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-3 sm:p-6">
            <div className="max-w-7xl mx-auto">
              {/* View Toggle - Mobile optimized */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-slate-600 w-full sm:w-auto overflow-x-auto">
                  <div className="flex gap-1 min-w-max sm:min-w-0">
                    <Button
                      variant={completionView === 'summary' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCompletionView('summary')}
                      className="rounded-md text-xs sm:text-sm px-2 sm:px-3"
                    >
                      <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Summary</span>
                      <span className="sm:hidden">Sum</span>
                    </Button>
                    <Button
                      variant={completionView === 'decisions' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCompletionView('decisions')}
                      className="rounded-md text-xs sm:text-sm px-2 sm:px-3"
                    >
                      <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Your Choices</span>
                      <span className="sm:hidden">Choices</span>
                    </Button>
                    <Button
                      variant={completionView === 'chart' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCompletionView('chart')}
                      className="rounded-md text-xs sm:text-sm px-2 sm:px-3"
                    >
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Journey</span>
                      <span className="sm:hidden">Chart</span>
                    </Button>
                    <Button
                      variant={completionView === 'analysis' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCompletionView('analysis')}
                      className="rounded-md text-xs sm:text-sm px-2 sm:px-3"
                    >
                      <Brain className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">AI Analysis</span>
                      <span className="sm:hidden">AI</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content Views */}
              {completionView === 'summary' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Financial Summary */}
                  <div className="lg:col-span-2">
                    <FinancialSummary 
                      financials={playerFinancials}
                      startingAge={startingAge}
                      finalScore={finalScore}
                    />
                  </div>

                  {/* Side Panel */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Achievements */}
                    {unlockedAchievements.length > 0 && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            Achievements ({unlockedAchievements.length}/{achievements.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 gap-2">
                            {unlockedAchievements.map(achievement => (
                              <div key={achievement.id} className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                <span className="text-sm sm:text-lg">{achievement.icon}</span>
                                <p className="font-medium text-yellow-800 dark:text-yellow-300 text-xs sm:text-sm">{achievement.title}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}

              {completionView === 'decisions' && (
                <div className="max-w-4xl mx-auto">
                  <DecisionHistory decisions={decisionHistory} />
                </div>
              )}

              {completionView === 'chart' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">Your Financial Journey</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 sm:h-80 lg:h-96">
                        <FinancialChart data={chartData} currentAge={playerFinancials.age} />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">Journey Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Starting Age</p>
                            <p className="font-semibold text-base sm:text-lg">{startingAge}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Final Age</p>
                            <p className="font-semibold text-base sm:text-lg">{playerFinancials.age}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Years Simulated</p>
                            <p className="font-semibold text-base sm:text-lg">{playerFinancials.age - startingAge}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Decisions Made</p>
                            <p className="font-semibold text-base sm:text-lg">{decisionHistory.filter(d => d.selectedChoice).length}</p>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-3 text-sm sm:text-base">Key Milestones</h4>
                          <div className="space-y-2 text-xs sm:text-sm">
                            {chartData.length > 0 && (
                              <>
                                <div className="flex justify-between">
                                  <span>Highest Net Worth:</span>
                                  <span className="font-medium text-green-600">
                                    {formatCurrency(Math.max(...chartData.map(d => d.netWorth)))}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Peak Savings:</span>
                                  <span className="font-medium text-blue-600">
                                    {formatCurrency(Math.max(...chartData.map(d => d.savings)))}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Max Investments:</span>
                                  <span className="font-medium text-purple-600">
                                    {formatCurrency(Math.max(...chartData.map(d => d.investments)))}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {completionView === 'analysis' && (
                <div className="max-w-6xl mx-auto">
                  <AIJourneyAnalysis 
                    finalFinancials={playerFinancials}
                    decisionHistory={decisionHistory}
                    startingAge={startingAge}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-slate-700">
                <Button onClick={handleShare} size="lg" variant="outline" className="w-full sm:w-auto">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Results
                </Button>
                <Button onClick={handleRestart} size="lg" className="w-full sm:w-auto">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start New Simulation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show loading state if game not initialized
  if (!gameInitialized && !showInitialSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">Loading game...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-col">
        {/* Compact Header - Sticky */}
        <div className="sticky top-0 z-10 border-b border-emerald-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          {/* Top row - Main info */}
          <div className="flex justify-between items-center p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Age {playerFinancials.age}</h1>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Net Worth: <span className="font-medium text-emerald-600">{formatCurrency(playerFinancials.netWorth)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <Button 
                onClick={() => setShowInitialSetup(true)} 
                variant="ghost" 
                size="sm"
                title="Customize starting conditions"
                className="p-2"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <ThemeToggle />
              <Button onClick={handleRestart} variant="ghost" size="sm" className="p-2">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Link href="/">
                <Button variant="ghost" size="sm" className="p-2">
                  <Home className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom row - Year Navigation (mobile-friendly) */}
          {hasRewindsLeft() && (
            <div className="flex justify-center items-center gap-2 px-3 pb-2 sm:pb-3">
              <Button 
                onClick={handlePreviousYear} 
                variant="ghost" 
                size="sm"
                disabled={!canGoBack()}
                title="Go to previous decision"
                className="p-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-xs text-gray-500 dark:text-gray-400 px-2 flex items-center gap-1">
                <Rewind className="w-3 h-3" />
                <span className="hidden sm:inline">Rewinds:</span>
                <span>{gameProgress.maxRewinds - gameProgress.rewindsUsed}</span>
              </div>
              <Button 
                onClick={handleNextYear} 
                variant="ghost" 
                size="sm"
                disabled={!canGoForward()}
                title="Go to next decision"
                className="p-2"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 sm:gap-6 p-3 sm:p-6 min-h-[calc(100vh-120px)]">
            {/* Decision Card - Main Focus */}
            <div className="lg:col-span-3 space-y-4 order-1">
              {currentDecision ? (
                <>
                  <DecisionCard 
                    decision={currentDecision} 
                    onChoiceSelect={handleChoiceSelect}
                  />
                  
                  {/* Contextual AI Help - Only when needed */}
                  {showAIHelper && currentDecision && (
                    <AIDecisionHelper 
                      decision={currentDecision}
                      financials={playerFinancials}
                      onChoiceRecommendation={(choiceId, reasoning) => {
                        handleChoiceSelect(choiceId)
                      }}
                    />
                  )}
                </>
              ) : (
                <Card className="min-h-[300px] sm:min-h-[400px] flex items-center justify-center">
                  <CardContent>
                    <p className="text-gray-600">Loading next decision...</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Panel - Clean & Focused */}
            <div className="lg:col-span-2 space-y-4 order-2 lg:order-3">
              {/* Progress Overview */}
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <ProgressBar 
                    financials={playerFinancials} 
                    progress={progress} 
                    achievements={achievements}
                  />
                </CardContent>
              </Card>

              {/* Financial Chart - Mobile optimized */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm sm:text-base">Financial Progress</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="h-[200px] sm:h-[250px] lg:h-[300px]">
                    <FinancialChart data={chartData} currentAge={playerFinancials.age} />
                  </div>
                </CardContent>
              </Card>

              {/* Optional AI Features - Collapsed by default */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAIInsights(!showAIInsights)}
                  className="flex-1 text-xs sm:text-sm"
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Insights</span>
                  <span className="sm:hidden">AI</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAIHelper(!showAIHelper)}
                  className="flex-1 text-xs sm:text-sm"
                >
                  <Brain className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Helper</span>
                  <span className="sm:hidden">Help</span>
                </Button>
              </div>

              {/* AI Insights - When expanded */}
              {showAIInsights && (
                <Card>
                  <CardContent className="p-3 sm:p-4">
                    <AIPersonalizedInsights 
                      financials={playerFinancials}
                      decisionHistory={decisionHistory}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Year Navigation Timeline - Mobile: Show only on larger screens or when expanded */}
              {hasRewindsLeft() && getCompletedDecisions().length > 1 && (
                <Card className="hidden sm:block">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                      <Rewind className="w-4 h-4" />
                      <span className="hidden sm:inline">Timeline ({gameProgress.maxRewinds - gameProgress.rewindsUsed} rewinds left)</span>
                      <span className="sm:hidden">History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {getCompletedDecisions().map((decision, index) => (
                        <button
                          key={decision.id}
                          onClick={() => rewindToAge(decision.age)}
                          className={`w-full text-left p-2 rounded text-xs sm:text-sm transition-colors ${
                            decision.age === playerFinancials.age
                              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>Age {decision.age}</span>
                            <span className="text-xs opacity-75 hidden sm:inline">{decision.category}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Initial Setup Modal */}
      <InitialSetupModal
        isOpen={showInitialSetup}
        onClose={() => {
          if (!gameInitialized) {
            handleSkipSetup()
          } else {
            setShowInitialSetup(false)
          }
        }}
        onSubmit={handleInitialSetup}
        defaultValues={gameInitialized ? playerFinancials : undefined}
        showSkipOption={!gameInitialized}
      />
    </div>
  )
}