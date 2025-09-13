'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, RefreshCw, CheckCircle, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react'

export function AIDecisionAssistant() {
  return (
    <Card className="w-full max-w-4xl bg-slate-900 border-slate-700 text-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <CardTitle className="text-white">AI Decision Assistant</CardTitle>
          </div>
          <Button variant="outline" size="sm" className="border-purple-600 text-purple-400 hover:bg-purple-600/20">
            <RefreshCw className="w-4 h-4 mr-2" />
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
            <span className="text-xs bg-orange-600 px-2 py-1 rounded">60/100 match</span>
            <span className="text-xs text-orange-400">medium confidence</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Part-time retail job</h3>
        </div>

        {/* AI Reasoning - Improved Formatting */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-200">AI Reasoning</h3>
          
          {/* Overall Assessment */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
            <h4 className="font-semibold text-blue-400 mb-2">Overall Assessment</h4>
            <p className="text-gray-300 leading-relaxed">
              At 14, the best financial move is to earn a modest, reliable income while keeping school as the priority. 
              This builds work habits, creates credit-free cash flow, and develops essential life skills.
            </p>
          </div>

          {/* Options Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Part-time retail job */}
            <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-700">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <h4 className="font-semibold text-emerald-400">Part-time retail job</h4>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Pros:</strong> Steady pay, teaches budgeting and time-management</p>
                <p><strong>Cons:</strong> Low hourly wage, schedule may conflict with school</p>
                <p><strong>Best for:</strong> After-school shifts or weekend hours that don't affect grades</p>
              </div>
            </div>

            {/* Tutoring younger students */}
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <h4 className="font-semibold text-blue-400">Tutoring younger students</h4>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Pros:</strong> Higher hourly rate, reinforces academic skills</p>
                <p><strong>Cons:</strong> Requires consistent demand and marketing effort</p>
                <p><strong>Best for:</strong> Students with strong academic performance</p>
              </div>
            </div>

            {/* Start small online business */}
            <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-700">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <h4 className="font-semibold text-orange-400">Start small online business</h4>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Pros:</strong> Potential for higher profits, entrepreneurial experience</p>
                <p><strong>Cons:</strong> Time-intensive, may violate platform age rules</p>
                <p><strong>Risk:</strong> Losing the $500 seed capital with limited legal knowledge</p>
              </div>
            </div>

            {/* Focus on studies */}
            <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-700">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-yellow-400" />
                <h4 className="font-semibold text-yellow-400">Focus on studies instead</h4>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Pros:</strong> Good for long-term earnings potential</p>
                <p><strong>Cons:</strong> No immediate cash flow, misses early work experience</p>
                <p><strong>Tip:</strong> Combine light work (2-3 hrs/week) with study time</p>
              </div>
            </div>
          </div>

          {/* Actionable Tip */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-600">
            <h4 className="font-semibold text-purple-400 mb-2">💡 Actionable Tip</h4>
            <p className="text-gray-300">
              Pick the highest-paying option that doesn't compromise your grades. Start with retail for steady income, 
              then explore tutoring as your reputation grows.
            </p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-red-900/20 rounded-lg p-4 border border-red-700">
          <h4 className="font-semibold text-red-400 mb-2">Risk Assessment</h4>
          <p className="text-gray-300">
            Conservative choices help build a strong financial foundation. Perfect for learning good money management habits.
          </p>
        </div>

        {/* Opportunity Cost */}
        <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700">
          <h4 className="font-semibold text-purple-400 mb-2">Opportunity Cost</h4>
          <p className="text-gray-300">
            At your age, every financial decision is a learning opportunity. Focus on building good habits that will serve you for life.
          </p>
        </div>

        {/* Long-term Projection */}
        <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-blue-400" />
            <h4 className="font-semibold text-blue-400">Long-term Projection</h4>
          </div>
          <p className="text-gray-300">
            This income increase of $8,000 could add $408,000 to your lifetime earnings. If you invest just 20% of the increase, 
            it could grow to $50,430 by retirement.
          </p>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          Follow AI Recommendation
        </Button>
      </CardContent>
    </Card>
  )
}