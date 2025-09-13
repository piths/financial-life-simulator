'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, DollarSign, Target, BarChart3, Brain, Sparkles, Users } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            Financial Life Simulator
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            Master your financial future through hands-on experience. Make real-life decisions from age 18 to 65, 
            learn from expert tips, and watch your choices compound into wealth—or debt. 
            <span className="font-semibold text-emerald-600">No risk, all learning.</span>
          </p>
          <Link href="/game">
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
              Start Your Financial Journey
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 mx-auto mb-3 sm:mb-4" />
              <CardTitle className="text-base sm:text-lg">Real-Time Modeling</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                See the power of compound interest in action. Watch $100/month become $349,000 over 40 years
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-4">
              <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 mx-auto mb-3 sm:mb-4" />
              <CardTitle className="text-base sm:text-lg">AI-Powered Insights</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                Get personalized recommendations, peer comparisons, and smart decision analysis powered by AI
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-4">
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 mx-auto mb-3 sm:mb-4" />
              <CardTitle className="text-base sm:text-lg">Life Decisions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                Navigate 12+ realistic scenarios: college vs trade school, buying vs renting, market crashes, and more
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-4">
              <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 mx-auto mb-3 sm:mb-4" />
              <CardTitle className="text-base sm:text-lg">Smart Education</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                AI advisor provides contextual tips, achievement tracking, and explains the "why" behind every choice
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* AI Features Highlight */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 sm:p-8 border border-purple-200 dark:border-purple-800">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-purple-900 dark:text-purple-100 text-center">AI-Powered Financial Coaching</h2>
            </div>
            <p className="text-purple-800 dark:text-purple-200 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              Our advanced AI analyzes your decisions in real-time, providing personalized insights, 
              peer comparisons, and smart recommendations tailored to your unique financial journey.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <div className="flex items-center gap-2 justify-center">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-purple-800 dark:text-purple-200">Personalized Insights</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-purple-800 dark:text-purple-200">Smart Recommendations</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-purple-800 dark:text-purple-200">Peer Comparisons</span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto border dark:border-emerald-800">
                <span className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-300">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Make Decisions</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Choose your path through education, career, housing, and investment decisions
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto border dark:border-emerald-800">
                <span className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-300">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">See Impact</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Watch real-time charts show how your choices affect your financial future
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto border dark:border-emerald-800">
                <span className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-300">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Learn & Improve</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Understand the reasoning behind each outcome and try different strategies
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white dark:bg-slate-800 rounded-lg p-6 sm:p-8 shadow-lg border dark:border-slate-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Shape Your Financial Future?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
            Start your simulation now and discover how small decisions can lead to big outcomes.
          </p>
          <Link href="/game">
            <Button size="lg" className="w-full sm:w-auto">
              Begin Simulation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}