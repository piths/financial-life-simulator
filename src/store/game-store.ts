import { create } from 'zustand'
import { GameState, FinancialState, Decision, Choice, FinancialImpact, Achievement, FinancialTip } from '@/types/game'
import { calculateNetWorth, applyFinancialImpact } from '@/lib/financial-calculations'
import { gameScenarios } from '@/lib/scenarios'
import { generateAgeAppropriateScenarios } from '@/lib/age-appropriate-scenarios'
import { achievements, checkAchievements, getRelevantTip } from '@/lib/financial-tips'

interface GameStore extends GameState {
  achievements: Achievement[]
  currentTip: FinancialTip | null
  initializeGame: (customFinancials?: Partial<FinancialState>) => void
  makeDecision: (decisionId: string, choiceId: string) => void
  rewindToAge: (age: number) => void
  resetGame: () => void
  getCurrentDecision: () => Decision | null
  updateAchievements: () => void
  getNewTip: () => void
}

const initialFinancialState: FinancialState = {
  age: 14,
  income: 0, // No regular income yet
  monthlyExpenses: 200, // Minimal personal expenses (parents cover most)
  savings: 500, // Small starting amount from gifts/allowance
  debt: 0,
  investments: 0,
  netWorth: 500,
  creditScore: 0, // No credit history yet
  lifestyle: 'modest'
}

const initialGameProgress = {
  currentDecisionIndex: 0,
  completedDecisions: [],
  rewindsUsed: 0,
  maxRewinds: 3
}

export const useGameStore = create<GameStore>((set, get) => ({
  playerFinancials: initialFinancialState,
  decisionHistory: [],
  gameProgress: initialGameProgress,
  isGameComplete: false,
  achievements: [...achievements],
  currentTip: null,

  initializeGame: (customFinancials?: Partial<FinancialState>) => {
    const startingFinancials = {
      ...initialFinancialState,
      ...customFinancials
    }
    
    // Ensure net worth is calculated correctly
    if (customFinancials) {
      startingFinancials.netWorth = calculateNetWorth(startingFinancials)
    }

    // Generate age-appropriate scenarios based on starting age
    const ageAppropriateScenarios = generateAgeAppropriateScenarios(startingFinancials.age)

    set({
      playerFinancials: startingFinancials,
      decisionHistory: ageAppropriateScenarios,
      gameProgress: { ...initialGameProgress },
      isGameComplete: false,
      achievements: [...achievements],
      currentTip: getRelevantTip(startingFinancials.age)
    })
  },

  makeDecision: (decisionId: string, choiceId: string) => {
    const state = get()
    const decision = state.decisionHistory.find(d => d.id === decisionId)
    if (!decision) return

    const choice = decision.choices.find(c => c.id === choiceId)
    if (!choice) return

    // Apply financial impact and age progression
    let newFinancials = applyFinancialImpact(state.playerFinancials, choice.impact)
    
    // Age progression - move to next decision's age or increment by 2-4 years
    const nextDecision = state.decisionHistory[state.gameProgress.currentDecisionIndex + 1]
    if (nextDecision) {
      newFinancials.age = nextDecision.age
    } else {
      // Dynamic retirement age based on starting age
      const retirementAge = Math.max(65, state.playerFinancials.age + 30)
      newFinancials.age = Math.min(retirementAge, newFinancials.age + 3)
    }
    
    // Apply time-based growth (simplified compound interest on investments)
    const yearsElapsed = newFinancials.age - state.playerFinancials.age
    if (yearsElapsed > 0 && newFinancials.investments > 0) {
      const annualReturn = 0.07 // 7% average return
      newFinancials.investments *= Math.pow(1 + annualReturn, yearsElapsed)
    }
    
    // Recalculate net worth
    newFinancials.netWorth = calculateNetWorth(newFinancials)
    
    // Update decision with selected choice
    const updatedDecision = { ...decision, selectedChoice: choiceId }
    const updatedHistory = state.decisionHistory.map(d => 
      d.id === decisionId ? updatedDecision : d
    )

    // Update game progress
    const newProgress = {
      ...state.gameProgress,
      currentDecisionIndex: state.gameProgress.currentDecisionIndex + 1,
      completedDecisions: [...state.gameProgress.completedDecisions, decisionId]
    }

    // Check for new achievements
    const updatedAchievements = checkAchievements(newFinancials, state.achievements)
    
    // Get a relevant tip for the new age
    const newTip = getRelevantTip(newFinancials.age, decision.category)

    // Check if game is complete - either all decisions made or reached reasonable retirement age
    const retirementAge = Math.max(65, state.playerFinancials.age + 30)
    const isComplete = newProgress.currentDecisionIndex >= state.decisionHistory.length || newFinancials.age >= retirementAge

    set({
      playerFinancials: newFinancials,
      decisionHistory: updatedHistory,
      gameProgress: newProgress,
      isGameComplete: isComplete,
      achievements: updatedAchievements,
      currentTip: newTip
    })
  },

  rewindToAge: (age: number) => {
    const state = get()
    if (state.gameProgress.rewindsUsed >= state.gameProgress.maxRewinds) return

    // Find the decision at or before the target age
    const targetDecisionIndex = state.decisionHistory.findIndex(d => d.age > age)
    const rewindIndex = targetDecisionIndex === -1 ? 0 : Math.max(0, targetDecisionIndex - 1)

    // Reset financial state and replay decisions up to rewind point
    let financials = { ...initialFinancialState }
    const updatedHistory = state.decisionHistory.map((decision, index) => {
      if (index < rewindIndex && decision.selectedChoice) {
        const choice = decision.choices.find(c => c.id === decision.selectedChoice)
        if (choice) {
          financials = applyFinancialImpact(financials, choice.impact)
        }
        return decision
      }
      return { ...decision, selectedChoice: undefined }
    })

    set({
      playerFinancials: financials,
      decisionHistory: updatedHistory,
      gameProgress: {
        ...state.gameProgress,
        currentDecisionIndex: rewindIndex,
        completedDecisions: state.gameProgress.completedDecisions.slice(0, rewindIndex),
        rewindsUsed: state.gameProgress.rewindsUsed + 1
      },
      isGameComplete: false
    })
  },

  resetGame: () => {
    get().initializeGame()
  },

  getCurrentDecision: () => {
    const state = get()
    return state.decisionHistory[state.gameProgress.currentDecisionIndex] || null
  },

  updateAchievements: () => {
    const state = get()
    const updatedAchievements = checkAchievements(state.playerFinancials, state.achievements)
    set({ achievements: updatedAchievements })
  },

  getNewTip: () => {
    const state = get()
    const newTip = getRelevantTip(state.playerFinancials.age)
    set({ currentTip: newTip })
  }
}))