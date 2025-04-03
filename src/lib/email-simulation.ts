import { EmailScenarioData } from '@/types/email-simulation';
import { mockEmailScenarios } from '@/data/simulation/email-scenarios';

// Get all email scenario summaries
export async function getEmailScenarioSummaries() {
  // In a real implementation, this would fetch from an API or database
  return mockEmailScenarios.map(scenario => ({
    id: scenario.id,
    title: `Email from ${scenario.sender.name}`,
    description: scenario.isScam 
      ? 'Identify and respond to this potential scam email' 
      : 'Identify and respond to this email correctly',
    category: scenario.category,
    difficulty: scenario.difficulty,
    isCompleted: false, // In a real app, this would come from user data
  }));
}

// Get an email scenario by ID
export async function getEmailScenarioById(id: string): Promise<EmailScenarioData | null> {
  // In a real implementation, this would fetch from an API or database
  const scenario = mockEmailScenarios.find(s => s.id === id);
  return scenario || null;
}

// Save progress for an email scenario (placeholder)
export async function saveEmailScenarioProgress(
  userId: string,
  scenarioId: string,
  progress: {
    identificationCorrect: boolean;
    actionCorrect: boolean;
    safetyImpact: number;
  }
): Promise<boolean> {
  // In a real implementation, this would save to a database or API
  console.log(`Saving progress for user ${userId} on email scenario ${scenarioId}:`, progress);
  
  // Placeholder to simulate success
  return true;
}