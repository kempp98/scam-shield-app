import { ScenarioSequence } from '@/types/simulation';

// Define sample sequences
const sequences: Record<string, ScenarioSequence> = {
  'basic-training': {
    id: 'basic-training',
    title: 'Basic Scam Recognition Training',
    description: 'A beginner-friendly sequence of scenarios to help you learn the fundamentals of identifying text scams.',
    scenarioIds: [
      'scenario-legitimate-banking-001.json', // Assuming this is an existing scenario ID
      'scenario-scam-banking-001.json',  // Assuming this is an existing scenario ID
      'scenario-scan-delivery-001.json' // Assuming this is an existing scenario ID
    ],
    category: 'beginner'
  }
};

/**
 * Get a sequence by ID
 */
export async function getSequenceById(id: string): Promise<ScenarioSequence | null> {
  // Simulate async behavior to match the pattern of other data fetching functions
  return new Promise((resolve) => {
    setTimeout(() => {
      const sequence = sequences[id] || null;
      resolve(sequence);
    }, 100);
  });
}

/**
 * Get all available sequences
 */
export async function getAllSequences(): Promise<ScenarioSequence[]> {
  // Simulate async behavior
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.values(sequences));
    }, 100);
  });
}

/**
 * Get sequences by category
 */
export async function getSequencesByCategory(category: string): Promise<ScenarioSequence[]> {
  // Simulate async behavior
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredSequences = Object.values(sequences).filter(
        sequence => sequence.category === category
      );
      resolve(filteredSequences);
    }, 100);
  });
}