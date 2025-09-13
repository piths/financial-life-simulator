import Groq from 'groq-sdk';

// Initialize Groq AI as primary provider
const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || '',
  dangerouslyAllowBrowser: true // Required for client-side usage
});

// Helper function to generate financial advice using Groq API
async function generateAdviceWithGroq(prompt: string): Promise<string> {
  if (!process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY.length === 0) {
    throw new Error('Groq API key not configured');
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable financial advisor. Provide practical, actionable financial advice. Keep responses concise and focused on the specific question asked."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "openai/gpt-oss-120b", // Using the larger model for better financial advice
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;
    if (response && response.trim().length > 0) {
      return response.trim();
    } else {
      throw new Error('Empty response from Groq');
    }
  } catch (error: any) {
    console.error('Error with Groq API:', error);
    throw error;
  }
}

// Helper function to generate financial advice using Groq as primary, with local fallback
export async function generateFinancialAdvice(prompt: string, retries = 2): Promise<string> {
  const hasGroqKey = process.env.NEXT_PUBLIC_GROQ_API_KEY && process.env.NEXT_PUBLIC_GROQ_API_KEY.length > 0;

  // Try Groq first (primary provider)
  if (hasGroqKey) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const groqResponse = await generateAdviceWithGroq(prompt);
        console.log('✅ Generated advice using Groq');
        return groqResponse;
      } catch (error: any) {
        console.error(`Error with Groq (attempt ${attempt + 1}):`, error);
        
        // Check for specific error types
        const isRateLimit = error?.message?.includes('429') || error?.message?.includes('rate limit');
        const isNetworkError = error?.message?.includes('fetch') || error?.message?.includes('network');
        const isServerError = error?.message?.includes('500') || error?.message?.includes('502') || error?.message?.includes('503') || error?.message?.includes('504');
        
        // If we have retries left and it's a retryable error
        if (attempt < retries && (isRateLimit || isNetworkError || isServerError)) {
          const baseDelay = isRateLimit ? 2000 : 1000;
          const delay = baseDelay * Math.pow(2, attempt);
          const maxDelay = 6000;
          const actualDelay = Math.min(delay, maxDelay);
          
          console.log(`Retrying Groq in ${actualDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, actualDelay));
          continue;
        }
        
        // If this is the last attempt, break to use local fallback
        break;
      }
    }
  }

  // If Groq failed or is not available, use local fallback
  console.log('⚠️ Using local fallback advice');
  return getFallbackAdvice(prompt);
}

// Fallback advice based on prompt content
function getFallbackAdvice(prompt: string): string {
  if (prompt.toLowerCase().includes('debt')) {
    return 'Focus on paying off high-interest debt first, as it typically provides guaranteed returns higher than most investments.';
  }
  if (prompt.toLowerCase().includes('invest')) {
    return 'Consider diversified index funds for long-term growth, and remember that time in the market beats timing the market.';
  }
  if (prompt.toLowerCase().includes('emergency')) {
    return 'Build an emergency fund with 3-6 months of expenses in a high-yield savings account before aggressive investing.';
  }
  if (prompt.toLowerCase().includes('young') || prompt.toLowerCase().includes('age')) {
    return 'Starting early gives you the power of compound interest. Even small amounts invested regularly can grow significantly over time.';
  }
  return 'Focus on the fundamentals: spend less than you earn, build an emergency fund, pay off high-interest debt, and invest for the long term.';
}

// Helper function to analyze financial decisions
export async function analyzeFinancialDecision(
  decision: string,
  context: {
    age: number;
    income: number;
    savings: number;
    debt: number;
  }
): Promise<string> {
  const prompt = `
    As a financial advisor, analyze this decision for someone who is ${context.age} years old 
    with an income of $${context.income}, savings of $${context.savings}, and debt of $${context.debt}.
    
    Decision: ${decision}
    
    Provide a brief analysis (2-3 sentences) focusing on:
    - Whether this is a good financial decision
    - Potential risks or benefits
    - Alternative suggestions if applicable
    
    Keep the response concise and actionable.
  `;

  try {
    return await generateFinancialAdvice(prompt);
  } catch (error) {
    // Fallback analysis based on context
    return getContextualFallback(decision, context);
  }
}

// Contextual fallback for decision analysis
function getContextualFallback(decision: string, context: any): string {
  const debtToIncomeRatio = context.debt / context.income;
  const emergencyMonths = context.savings / (context.income / 12 * 0.7); // Rough monthly expenses
  
  if (decision.toLowerCase().includes('invest') && debtToIncomeRatio > 3) {
    return 'With high debt levels, consider prioritizing debt repayment over investing. The guaranteed return from debt reduction often exceeds investment returns.';
  }
  
  if (decision.toLowerCase().includes('buy') && emergencyMonths < 3) {
    return 'Before major purchases, ensure you have an adequate emergency fund. This provides financial security and prevents debt accumulation during unexpected events.';
  }
  
  if (context.age < 30 && decision.toLowerCase().includes('invest')) {
    return 'Your young age is a significant advantage for long-term investing. Consider aggressive growth strategies and consistent contributions to maximize compound growth.';
  }
  
  return 'Consider your current financial position, emergency fund status, and long-term goals when making this decision. Prioritize financial stability before taking on additional risks.';
}

// Helper function to generate personalized financial tips
export async function generatePersonalizedTips(
  userProfile: {
    age: number;
    income: number;
    savings: number;
    debt: number;
    goals: string[];
  }
): Promise<{ tips: string[]; isAIGenerated: boolean; provider: string }> {
  const prompt = `
    Generate 3 personalized financial tips for someone with this profile:
    - Age: ${userProfile.age}
    - Income: $${userProfile.income}
    - Savings: $${userProfile.savings}
    - Debt: $${userProfile.debt}
    - Goals: ${userProfile.goals.join(', ')}
    
    Provide 3 specific, actionable tips. Format each tip as a separate line starting with "•".
  `;

  try {
    const advice = await generateFinancialAdvice(prompt);
    
    // Check if this looks like a fallback response
    const isLikelyFallback = advice.includes('Focus on the fundamentals') || 
                            advice.includes('Build an emergency fund') ||
                            advice.length < 100;
    
    if (!isLikelyFallback) {
      const tips = advice.split('\n').filter(tip => tip.trim().startsWith('•')).map(tip => tip.trim());
      
      // If we got valid AI-generated tips, return them
      if (tips.length >= 2) {
        return { tips: tips.slice(0, 3), isAIGenerated: true, provider: 'Groq' };
      }
    }
    
    // Otherwise fall back to personalized defaults
    return { tips: getPersonalizedFallbackTips(userProfile), isAIGenerated: false, provider: 'Local' };
  } catch (error) {
    return { tips: getPersonalizedFallbackTips(userProfile), isAIGenerated: false, provider: 'Local' };
  }
}

// Generate personalized fallback tips based on user profile
function getPersonalizedFallbackTips(profile: any): string[] {
  const tips: string[] = [];
  const debtToIncomeRatio = profile.debt / profile.income;
  const emergencyMonths = profile.savings / (profile.income / 12 * 0.7);
  
  // Debt-focused tip
  if (debtToIncomeRatio > 2) {
    tips.push('• Focus on debt reduction - pay minimums on all debts, then attack the highest interest rate debt aggressively');
  } else if (profile.debt > 0) {
    tips.push('• Consider the debt avalanche method: pay off highest interest rate debts first to minimize total interest paid');
  }
  
  // Emergency fund tip
  if (emergencyMonths < 3) {
    tips.push('• Build your emergency fund to 3-6 months of expenses before aggressive investing - this prevents debt during crises');
  } else if (emergencyMonths > 8) {
    tips.push('• Your emergency fund is solid - consider investing excess savings for long-term growth');
  }
  
  // Age-appropriate tip
  if (profile.age < 30) {
    tips.push('• Take advantage of your time horizon - even $100/month invested now could be worth $500K+ at retirement');
  } else if (profile.age < 50) {
    tips.push('• Balance growth and stability - consider a mix of stocks and bonds appropriate for your timeline to retirement');
  } else {
    tips.push('• Focus on capital preservation and income generation as you approach retirement');
  }
  
  // Income-based tip
  if (profile.income > 75000 && tips.length < 3) {
    tips.push('• Maximize tax-advantaged accounts like 401(k) and IRA - the tax savings compound over time');
  }
  
  // Fill remaining slots with general advice
  while (tips.length < 3) {
    const generalTips = [
      '• Automate your savings and investments to remove emotion and ensure consistency',
      '• Review and optimize your spending regularly - small cuts can lead to significant long-term gains',
      '• Diversify your investments across asset classes to reduce risk while maintaining growth potential'
    ];
    
    for (const tip of generalTips) {
      if (!tips.includes(tip) && tips.length < 3) {
        tips.push(tip);
      }
    }
  }
  
  return tips.slice(0, 3);
}