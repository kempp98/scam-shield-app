// src/types/simulation.ts

import { RedFlag } from './educational';

/**
 * Types for simulation scenarios
 */

export type ScenarioCategory = 
  | 'financial' 
  | 'delivery' 
  | 'government' 
  | 'prize' 
  | 'tech' 
  | 'romantic'
  | 'job'
  | 'other';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type SafetyRating = 'safe' | 'partially_safe' | 'risky' | 'dangerous';

export interface Message {
  id: string;
  text: string;
  isUserMessage: boolean;
  redFlags?: RedFlag[];
  timestamp?: string; // Optional timestamp for realistic display
}

export interface ResponseOption {
  id: string;
  text: string;
  nextNodeId: string;
  safetyLevel: 'safe' | 'neutral' | 'risky';
  explanation: string; // Explanation of why this response is safe/risky
}

export interface SimulationNode {
  id: string;
  messages: Message[];
  responseOptions?: ResponseOption[];
  isEndNode: boolean;
  safetyRating?: SafetyRating;
  feedback?: {
    title: string;
    description: string;
    redFlagsExplanation?: string[];
    whatToDoNext?: string;
  };
}

export interface Sender {
  name: string;
  phoneNumber: string;
  avatarUrl?: string;
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  category: ScenarioCategory;
  difficulty: DifficultyLevel;
  isScam: boolean;
  sender: Sender;
  initialNodeId: string;
  nodes: Record<string, SimulationNode>;
}

export interface ScenarioSummary {
  id: string;
  title: string;
  description: string;
  category: ScenarioCategory;
  difficulty: DifficultyLevel;
  completed?: boolean;
  safetyScore?: number; // 0-100 percentage score
  iconName?: string;
}

export interface SimulationState {
  scenarioId: string | null;
  currentNodeId: string | null;
  history: Array<{
    nodeId: string;
    responseId?: string;
  }>;
  completed: boolean;
  safetyScore?: number;
}

// Progress tracking for user
export interface UserSimulationProgress {
  completedScenarios: Record<string, {
    lastCompleted: string; // ISO date string
    safetyScore: number; // 0-100
    attempts: number;
  }>;
}