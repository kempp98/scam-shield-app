// Types for the enhanced simulation system

// Already existing types we'll reference
import { DifficultyLevel, SafetyRating, RedFlag, Message } from './simulation';

// Scenario data format for text message simulations
export interface ScenarioData {
  id: string;
  type: "text"; // Could expand to other types in future
  category: string;
  isScam: boolean;
  difficulty: DifficultyLevel;
  sender: {
    name: string;
    phoneNumber: string;
  };
  messages: Message[];
  redFlags?: RedFlag[];
  identificationQuestion: {
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  };
  actionQuestion: {
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      safetyImpact: number;
      feedback: string;
    }[];
  };
}

// A sequence of scenarios
export interface SimulationSequence {
  id: string;
  title: string;
  description: string;
  scenarioIds: string[];
  difficulty: DifficultyLevel;
  category: string;
  learnMoreUrl?: string;
  thumbnailImage?: string;
}

// This tracks a user's progress in a sequence
export interface SequenceState {
  sequenceId: string | null;
  currentScenarioIndex: number;
  currentScenarioId: string | null;
  completedScenarios: {
    [scenarioId: string]: {
      identificationCorrect: boolean;
      actionCorrect: boolean;
      safetyImpact: number;
    };
  };
  totalScenarios: number;
  completed: boolean;
  overallScore?: number;
}

// Summary of a sequence for display in the hub
export interface SequenceSummary extends Omit<SimulationSequence, 'scenarioIds'> {
  completedCount: number;
  totalCount: number;
}