# Financial Life Simulator(FinanceSim) 🎯💰

**Hack the System - Track 1: Hack the Economy**

An interactive life simulation game that democratizes financial education by making complex economic concepts accessible through hands-on experience. Players navigate from age 18 to 65, making crucial financial decisions and watching their choices compound into wealth or debt—all without real-world risk.

## 🌟 Why This Matters

Financial literacy is a critical life skill, yet traditional education often fails to teach practical money management. Our simulator bridges this gap by:

- **Making Economics Accessible**: Complex financial concepts become intuitive through interactive gameplay
- **Democratizing Financial Education**: Free, web-based tool available to anyone with internet access
- **Building Economic Empowerment**: Users gain confidence to make better real-world financial decisions
- **Promoting Social Good**: Helps reduce wealth inequality through education and awareness

## 🚀 Key Features

### 🧠 **AI-Powered Financial Coaching**
- Personalized insights based on your decisions
- Real-time recommendations from multiple AI providers (OpenAI and Google)
- Peer comparisons with national financial averages
- Contextual educational tips explaining the "why" behind each choice

### 📊 **Real-Time Economic Modeling**
- Watch $100/month investments become $349,000 over 40 years
- Interactive charts showing compound interest in action
- Dynamic net worth tracking across decades
- Visual representation of financial decisions' long-term impact

### 🎮 **Engaging Gamification**
- 12+ realistic life scenarios (college vs trade school, buying vs renting, market crashes)
- Achievement system with meaningful financial milestones
- Rewind feature to explore alternative strategies
- Progress tracking with national percentile comparisons

### 📱 **Mobile-First Design**
- Fully responsive interface optimized for all devices
- Touch-friendly controls and intuitive navigation
- Accessible design following WCAG guidelines
- Works seamlessly on phones, tablets, and desktops

## 🎯 Hackathon Alignment

This project directly addresses the **"Hack the Economy"** track by:

✅ **Helping people understand money**: Interactive scenarios teach budgeting, investing, and debt management  
✅ **Building financial literacy**: Educational tips and AI insights explain complex concepts  
✅ **Accessing economic opportunity**: Users learn to identify and capitalize on financial opportunities  
✅ **Making economics accessible**: Gamification makes learning engaging and memorable  

## 🛠 Technology Stack

- **Frontend**: Next.js 15, React , TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Data Visualization**: Recharts for interactive financial charts
- **State Management**: Zustand for efficient state handling
- **AI Integration**: Multi-provider support (OpenAI GPT-0ss 120b open model in groq.com and Google Gemini)
- **Deployment**: Vercel-optimized for instant global deployment

## 🚀 Getting Started

### Quick Start (1 minute setup)

1. **Clone and install**:
```bash
git clone <repository-url>
cd financial-life-simulator
npm install
```

2. **Run locally**:
```bash
npm run dev
```

3. **Open**: [http://localhost:3000](http://localhost:3000)

### Full Setup with AI Features

1. **Environment setup**:
```bash
cp .env.local.example .env.local
```

2. **Add AI API keys** (optional - app works without them):
```env
# AI API Configuration

# Groq API (Primary - Fast & Reliable)
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
# Get your API key from: https://console.groq.com/keys

# Optional: Gemini API (if you want to experiment)
# NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
# Get your API key from: https://makersuite.google.com/app/apikey

```

## 🎮 How to Play

1. **🎯 Initial Setup**: Customize your starting financial situation or use realistic defaults
2. **🤔 Make Decisions**: Navigate age-appropriate scenarios from education to retirement
3. **📈 See Impact**: Watch real-time charts show how choices compound over decades  
4. **🧠 Learn & Improve**: Get AI-powered insights and educational explanations
5. **🏆 Track Progress**: Earn achievements and compare with national averages

## 📚 Educational Impact

### Core Financial Concepts Taught:
- **Compound Interest**: See how small, consistent investments grow exponentially
- **Risk Management**: Balance high-risk/high-reward vs. stable investments
- **Debt Strategy**: Learn when debt helps vs. hurts long-term wealth
- **Career ROI**: Compare education costs vs. lifetime earning potential
- **Emergency Planning**: Understand the importance of financial safety nets
- **Lifestyle Inflation**: See how spending creep affects long-term goals

### Real-World Applications:
- **Budgeting Skills**: Learn to balance income, expenses, and savings
- **Investment Literacy**: Understand stocks, bonds, and retirement accounts
- **Credit Management**: Build and maintain healthy credit scores
- **Insurance Planning**: Protect against financial catastrophes
- **Tax Strategy**: Optimize decisions for tax efficiency

## 🌍 Social Impact

### Democratizing Financial Education
- **Free Access**: No paywalls or subscriptions—education should be accessible
- **Global Reach**: Web-based platform available worldwide
- **Inclusive Design**: Mobile-optimized for users without high-end devices
- **Multiple Languages**: Architecture supports internationalization

### Addressing Economic Inequality
- **Early Education**: Teaches crucial skills often learned too late
- **Mistake-Free Learning**: Practice financial decisions without real consequences
- **Confidence Building**: Users gain knowledge to make better real-world choices
- **Generational Impact**: Better financial decisions benefit families and communities

## � Whait Makes This Special

### Innovation in Financial Education
- **AI-Powered Personalization**: Tailored advice based on individual decisions
- **Gamified Learning**: Makes complex topics engaging and memorable
- **Real-Time Feedback**: Immediate consequences help reinforce learning
- **Scenario Diversity**: Covers edge cases and economic downturns

### Technical Excellence
- **Performance Optimized**: Fast loading, smooth interactions
- **Accessibility First**: Screen reader compatible, keyboard navigation
- **Mobile Responsive**: Works perfectly on any device
- **Scalable Architecture**: Built to handle thousands of concurrent users

## 🎬 Demo & Submission

- **🌐 Live Demo**: 
- **💻 Source Code**: [https://github.com/piths/financial-life-simulator](https://github.com/piths/financial-life-simulator)

## 🤝 Contributing

We welcome contributions! This project can grow into a comprehensive financial education platform. Areas for expansion:
- Additional scenarios and life stages
- Multiplayer family financial planning
- Integration with real financial data
- Curriculum for schools and organizations

## 📄 License

MIT License - Built for social good and community benefit.

---

**Built with ❤️ for Hack the System 2024**  
*Empowering people to understand and navigate the economic systems that shape their lives.*
