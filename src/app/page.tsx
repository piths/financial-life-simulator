'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, DollarSign, Target, BarChart3, Brain, Sparkles, ArrowRight, CheckCircle, Star, Zap, Shield, Award, Settings, GraduationCap, Home, Briefcase, PiggyBank, Calculator } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 bg-[size:20px_20px] opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                FinSim
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-16 sm:mb-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">AI-Powered Financial Education</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Master Money
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              Without the Risk
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience 47 years of financial decisions in minutes. Make choices, see consequences,
            and learn from AI-powered insights—all in a <span className="font-semibold text-emerald-600 dark:text-emerald-400">risk-free environment</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/game">
              <Button size="lg" className="text-lg px-8 py-4 w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 w-full sm:w-auto border-2 hover:bg-white/50 dark:hover:bg-slate-800/50 backdrop-blur-sm">
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full border-2 border-white dark:border-slate-900" />
                ))}
              </div>
              <span>10,000+ learners</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1">4.9/5 rating</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800/80">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg font-bold">Real-Time Impact</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Watch $100/month grow to <span className="font-bold text-emerald-600">$349,000</span> over 40 years with live compound interest visualization
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800/80">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg font-bold">AI Financial Coach</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Get personalized insights, peer comparisons, and smart recommendations tailored to your unique journey
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800/80">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg font-bold">Life Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Navigate <span className="font-bold text-orange-600">15+ realistic scenarios</span>: college, career changes, market crashes, and major purchases
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800/80">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg font-bold">Achievement System</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Unlock achievements, track progress, and understand the "why" behind every financial decision
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition */}
        <div className="relative mb-20">
          <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-emerald-500/10 dark:from-purple-500/20 dark:via-blue-500/20 dark:to-emerald-500/20 rounded-3xl p-8 sm:p-12 border border-white/20 dark:border-slate-700/50 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Why FinSim Works
                </h2>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Traditional financial education tells you what to do. We show you what happens when you do it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Safe Learning Environment</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Make mistakes without real consequences. Learn from failures in a risk-free simulation.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">AI-Powered Insights</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get personalized feedback and recommendations based on your unique decision patterns.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Real-World Impact</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  See the long-term effects of your choices with realistic financial modeling and projections.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Your Financial Starting Point */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Setup Your Financial Starting Point
              </h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every financial journey is unique. Customize your starting situation to match your reality and explore different paths.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Starting Scenarios */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose Your Starting Scenario</h3>

              <div className="space-y-4">
                <Card className="p-6 border-0 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Fresh Graduate</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        Just finished college with student loans and looking for your first job
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-xs">$35K Debt</span>
                        <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 rounded text-xs">$0 Savings</span>
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded text-xs">Age 22</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-0 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Working Professional</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        Established career with some savings, ready to make bigger financial moves
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded text-xs">$15K Savings</span>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded text-xs">$65K Income</span>
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded text-xs">Age 28</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-0 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Family Starter</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        Married with kids, balancing family expenses with long-term planning
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded text-xs">$25K Savings</span>
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded text-xs">$85K Income</span>
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded text-xs">Age 32</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Column - Customization Options */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Or Customize Everything</h3>

              <Card className="p-6 border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Calculator className="w-6 h-6 text-emerald-600" />
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Fine-tune Your Profile</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Starting Age</label>
                      <div className="h-10 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <span className="text-emerald-600 font-semibold">18-35</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Income Level</label>
                      <div className="h-10 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <span className="text-emerald-600 font-semibold">$25K-$150K</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Savings</label>
                      <div className="h-10 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <span className="text-emerald-600 font-semibold">$0-$50K</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Debt</label>
                      <div className="h-10 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <span className="text-emerald-600 font-semibold">$0-$100K</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white">Additional Options</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Education level & student loans</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Family situation & dependents</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Geographic location & cost of living</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Risk tolerance & investment experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 dark:from-emerald-500/20 dark:to-blue-500/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
              <PiggyBank className="w-8 h-8 text-emerald-600" />
              <div className="text-left">
                <h4 className="font-bold text-gray-900 dark:text-white">Ready to Start?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Choose a preset or customize your profile in the simulator</p>
              </div>
              <Link href="/game">
                <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                  Begin Setup
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* AI Assistant Preview */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Your AI Financial Coach
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get personalized insights, detailed analysis, and smart recommendations for every financial decision
            </p>
          </div>

          {/* AI Assistant Demo */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-900 border-slate-700 text-white overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <CardTitle className="text-white">AI Decision Assistant</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" className="border-purple-600 text-purple-400 hover:bg-purple-600/20">
                    Re-analyze
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Recommended Choice */}
                <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="font-semibold text-emerald-400">Recommended Choice</span>
                    <span className="text-xs bg-orange-600 px-2 py-1 rounded">85/100 match</span>
                    <span className="text-xs text-orange-400">high confidence</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Start investing in index funds</h3>
                </div>

                {/* AI Reasoning - Improved Formatting */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-200">AI Reasoning</h3>

                  {/* Overall Assessment */}
                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-semibold text-blue-400 mb-2">📊 Overall Assessment</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Based on your age (25), stable income ($65K), and 6-month emergency fund, you're in an ideal position
                      to start long-term investing. Index funds offer diversification with low fees.
                    </p>
                  </div>

                  {/* Key Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-700">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <h4 className="font-semibold text-emerald-400">Why This Works</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Compound growth over 40 years</li>
                        <li>• Low expense ratios (0.03-0.20%)</li>
                        <li>• Automatic diversification</li>
                        <li>• Tax-efficient in retirement accounts</li>
                      </ul>
                    </div>

                    <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-blue-400" />
                        <h4 className="font-semibold text-blue-400">Smart Strategy</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Start with $500/month</li>
                        <li>• Use tax-advantaged accounts first</li>
                        <li>• Automate contributions</li>
                        <li>• Increase by 1% annually</li>
                      </ul>
                    </div>
                  </div>

                  {/* Long-term Impact */}
                  <div className="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 rounded-lg p-4 border border-emerald-600">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-semibold text-emerald-400">💰 Long-term Projection</h4>
                    </div>
                    <p className="text-gray-300">
                      Investing $500/month with 7% average returns could grow to <span className="font-bold text-emerald-400">$1.37 million</span> by retirement.
                      Starting now vs. waiting 5 years saves you <span className="font-bold text-yellow-400">$400,000</span> in lost growth.
                    </p>
                  </div>
                </div>

                {/* Risk & Opportunity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-900/20 rounded-lg p-4 border border-red-700">
                    <h4 className="font-semibold text-red-400 mb-2">⚠️ Risk Assessment</h4>
                    <p className="text-gray-300 text-sm">
                      Market volatility is normal for long-term investing. Your 40-year timeline allows you to ride out short-term fluctuations.
                    </p>
                  </div>

                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700">
                    <h4 className="font-semibold text-purple-400 mb-2">🎯 Opportunity Cost</h4>
                    <p className="text-gray-300 text-sm">
                      Every month you delay costs approximately $2,100 in retirement wealth. Time in the market beats timing the market.
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white">
                  Follow AI Recommendation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Financial Journey in 3 Steps
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            From first job to retirement, experience decades of financial decisions in minutes
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-emerald-300 to-blue-300 dark:from-emerald-600 dark:to-blue-600" />

            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Path</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Navigate life's biggest decisions: education, career moves, housing choices, and investment strategies
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-sm">College</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm">Career</span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm">Housing</span>
              </div>
            </div>

            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Watch It Unfold</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                See immediate and long-term consequences with dynamic charts, projections, and AI-powered analysis
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm">Live Charts</span>
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-full text-sm">AI Insights</span>
              </div>
            </div>

            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Master Your Money</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Learn from outcomes, replay scenarios, and build confidence for real-world financial decisions
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full text-sm">Replay</span>
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full text-sm">Learn</span>
                <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-full text-sm">Improve</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="relative">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-white/10 bg-[size:20px_20px] bg-grid-white/10" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Master Money?
              </h2>
              <p className="text-xl sm:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto">
                Join thousands learning financial literacy through experience, not lectures.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/game">
                  <Button size="lg" className="text-lg px-8 py-4 w-full sm:w-auto bg-white text-emerald-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    Start Free Simulation
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-emerald-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>No Sign-up Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Start Immediately</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                FinSim
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 Financial Life Simulator. Learn money without the risk.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}