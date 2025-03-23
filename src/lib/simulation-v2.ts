// Updated simulation data functions
import { SimulationSequence, ScenarioData, SequenceSummary } from '@/types/simulation-v2';

// For a real application, these would be loaded dynamically or from an API
// For the MVP, we'll define them directly

// Create basic text scams sequence
const basicTextScamsSequence: SimulationSequence = {
  id: 'basic-text-scams',
  title: 'Basic Text Scams',
  description: 'Practice identifying common text message scams and learn how to respond safely.',
  difficulty: 'beginner',
  category: 'educational',
  scenarioIds: [
    'scenario-legitimate-banking-001',
    'scenario-scam-banking-001',
    'scenario-scam-delivery-001'
  ],
  learnMoreUrl: '/learn/common-scam-types'
};

// Store all sequences
const sequences: Record<string, SimulationSequence> = {
  'basic-text-scams': basicTextScamsSequence
};

// Function to get all sequence summaries
export async function getSequenceSummaries(): Promise<SequenceSummary[]> {
  // In a real application, we'd fetch this from an API with user progress data
  return Object.values(sequences).map(sequence => ({
    id: sequence.id,
    title: sequence.title,
    description: sequence.description,
    difficulty: sequence.difficulty,
    category: sequence.category,
    learnMoreUrl: sequence.learnMoreUrl,
    thumbnailImage: sequence.thumbnailImage,
    completedCount: 0, // In a real app, this would come from user data
    totalCount: sequence.scenarioIds.length
  }));
}

// Function to get a sequence by ID
export async function getSequenceById(id: string): Promise<SimulationSequence | null> {
  const sequence = sequences[id];
  return sequence || null;
}

// Function to get a scenario by ID
export async function getScenarioById(id: string): Promise<ScenarioData | null> {
  // In a real implementation, we would dynamically import or fetch from API
  try {
    // Using a switch statement to map IDs to imported JSON
    switch (id) {
      case 'scenario-legitimate-banking-001': {
        // Import legitimate banking scenario
        const scenarioData = await import('@/data/simulation/scenarios/scenario-legitimate-banking-001.json');
        return scenarioData.default as ScenarioData;
      }
      case 'scenario-scam-banking-001': {
        // Import scam banking scenario
        const scenarioData = await import('@/data/simulation/scenarios/scenario-scam-banking-001.json');
        return scenarioData.default as ScenarioData;
      }
      case 'scenario-scam-delivery-001': {
        // Import delivery scam scenario
        const scenarioData = await import('@/data/simulation/scenarios/scenario-scam-delivery-001.json');
        return scenarioData.default as ScenarioData;
      }
      default:
        console.error(`Scenario with ID ${id} not found`);
        return null;
    }
  } catch (error) {
    console.error(`Failed to load scenario with ID ${id}:`, error);
    return null;
  }
}

// Function to save user progress (placeholder)
export async function saveSequenceProgress(
  userId: string,
  sequenceId: string,
  progress: {
    completed: boolean;
    completedScenarios: Record<string, {
      identificationCorrect: boolean;
      actionCorrect: boolean;
      safetyImpact: number;
    }>;
  }
): Promise<boolean> {
  // In a real implementation, this would save to a database or API
  console.log(`Saving progress for user ${userId} on sequence ${sequenceId}:`, progress);
  return true;
}