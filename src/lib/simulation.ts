// src/lib/simulation.ts
import { SimulationScenario, ScenarioSummary, UserSimulationProgress } from '@/types/simulation';
import bankAlertScenario from '@/data/simulation/bank-alert';

// For MVP we're just using a single hardcoded scenario
// In production, these would be loaded from a database or API
const scenarios: SimulationScenario[] = [
  bankAlertScenario,
  // Additional scenarios would be imported here
];

/**
 * Get all scenario summaries
 */
export async function getScenarioSummaries(): Promise<ScenarioSummary[]> {
  // In a real implementation, we'd fetch this from an API or database
  return scenarios.map(scenario => ({
    id: scenario.id,
    title: scenario.title,
    description: scenario.description,
    category: scenario.category,
    difficulty: scenario.difficulty,
    // We'd get these from user data in a real implementation
    completed: false,
    safetyScore: undefined,
    iconName: getCategoryIcon(scenario.category)
  }));
}

/**
 * Get a specific scenario by ID
 */
export async function getScenarioById(id: string): Promise<SimulationScenario | null> {
  const scenario = scenarios.find(s => s.id === id);
  return scenario || null;
}

/**
 * Save user progress for a scenario
 * In a real implementation, this would save to a database
 */
export async function saveUserProgress(
  userId: string,
  scenarioId: string,
  progress: {
    completed: boolean;
    safetyScore: number;
  }
): Promise<boolean> {
  console.log(`Saving progress for user ${userId} on scenario ${scenarioId}:`, progress);
  // In a real implementation, save to database
  return true;
}

/**
 * Get user progress for scenarios
 * In a real implementation, this would retrieve from a database
 */
export async function getUserProgress(userId: string): Promise<UserSimulationProgress> {
  // Stub implementation
  console.log(`Saving progress for user ${userId}`);
  return {
    completedScenarios: {}
  };
}

/**
 * Get an icon name based on the category
 */
function getCategoryIcon(category: string): string {
  switch (category) {
    case 'financial':
      return 'bank';
    case 'delivery':
      return 'package';
    case 'government':
      return 'landmark';
    case 'prize':
      return 'gift';
    case 'tech':
      return 'laptop';
    case 'romantic':
      return 'heart';
    case 'job':
      return 'briefcase';
    default:
      return 'message-circle';
  }
}