'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SimulationSequence, ScenarioData, SequenceState } from '@/types/simulation-v2';
import { getSequenceById, getScenarioById } from '@/lib/simulation';

interface SequenceContextType {
  // Current state
  currentSequence: SimulationSequence | null;
  currentScenario: ScenarioData | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  startSequence: (sequenceId: string) => Promise<void>;
  completeCurrentScenario: (
    identificationCorrect: boolean,
    actionCorrect: boolean,
    safetyImpact: number
  ) => void;
  moveToNextScenario: () => void;
  resetSequence: () => void;
  
  // Progress tracking
  progress: SequenceState;
}

const SequenceContext = createContext<SequenceContextType | undefined>(undefined);

export function useSequence() {
  const context = useContext(SequenceContext);
  if (context === undefined) {
    throw new Error('useSequence must be used within a SequenceProvider');
  }
  return context;
}

interface SequenceProviderProps {
  children: React.ReactNode;
  sequenceId?: string;
}

export function SequenceProvider({ children, sequenceId: initialSequenceId }: SequenceProviderProps) {
  const [currentSequence, setCurrentSequence] = useState<SimulationSequence | null>(null);
  const [currentScenario, setCurrentScenario] = useState<ScenarioData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [progress, setProgress] = useState<SequenceState>({
    sequenceId: null,
    currentScenarioIndex: 0,
    currentScenarioId: null,
    completedScenarios: {},
    totalScenarios: 0,
    completed: false
  });
  
  // Start a sequence by ID
  const startSequence = useCallback(async (sequenceId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get sequence data
      const sequence = await getSequenceById(sequenceId);
      
      if (!sequence) {
        throw new Error(`Sequence with ID ${sequenceId} not found`);
      }
      
      // Initialize progress
      setProgress({
        sequenceId,
        currentScenarioIndex: 0,
        currentScenarioId: sequence.scenarioIds[0],
        completedScenarios: {},
        totalScenarios: sequence.scenarioIds.length,
        completed: false
      });
      
      // Load first scenario
      const firstScenario = await getScenarioById(sequence.scenarioIds[0]);
      
      if (!firstScenario) {
        throw new Error(`Scenario with ID ${sequence.scenarioIds[0]} not found`);
      }
      
      setCurrentSequence(sequence);
      setCurrentScenario(firstScenario);
    } catch (err) {
      console.error('Error starting sequence:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Start sequence from prop if provided
  useEffect(() => {
    if (initialSequenceId && !currentSequence && !isLoading) {
      startSequence(initialSequenceId);
    }
  }, [initialSequenceId, currentSequence, isLoading, startSequence]);
  
  // Complete the current scenario
  const completeCurrentScenario = useCallback((
    identificationCorrect: boolean,
    actionCorrect: boolean,
    safetyImpact: number
  ) => {
    if (!currentScenario || !progress.currentScenarioId) return;
    
    // Update completed scenarios
    setProgress(prev => ({
      ...prev,
      completedScenarios: {
        ...prev.completedScenarios,
        [progress.currentScenarioId as string]: {
          identificationCorrect,
          actionCorrect,
          safetyImpact
        }
      }
    }));
  }, [currentScenario, progress.currentScenarioId]);
  
  // Move to the next scenario
  const moveToNextScenario = useCallback(async () => {
    if (!currentSequence || progress.currentScenarioIndex >= progress.totalScenarios - 1) {
      // Complete the sequence
      setProgress(prev => ({
        ...prev,
        completed: true
      }));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Calculate next index
      const nextIndex = progress.currentScenarioIndex + 1;
      const nextScenarioId = currentSequence.scenarioIds[nextIndex];
      
      // Load next scenario
      const nextScenario = await getScenarioById(nextScenarioId);
      
      if (!nextScenario) {
        throw new Error(`Scenario with ID ${nextScenarioId} not found`);
      }
      
      // Update state
      setProgress(prev => ({
        ...prev,
        currentScenarioIndex: nextIndex,
        currentScenarioId: nextScenarioId
      }));
      
      setCurrentScenario(nextScenario);
    } catch (err) {
      console.error('Error loading next scenario:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [currentSequence, progress.currentScenarioIndex, progress.totalScenarios]);
  
  // Reset the sequence
  const resetSequence = useCallback(() => {
    if (!currentSequence) return;
    
    const sequenceId = currentSequence.id;
    
    // Reset state
    setCurrentSequence(null);
    setCurrentScenario(null);
    setProgress({
      sequenceId: null,
      currentScenarioIndex: 0,
      currentScenarioId: null,
      completedScenarios: {},
      totalScenarios: 0,
      completed: false
    });
    
    // Start over
    startSequence(sequenceId);
  }, [currentSequence, startSequence]);
  
  const value = {
    currentSequence,
    currentScenario,
    isLoading,
    error,
    startSequence,
    completeCurrentScenario,
    moveToNextScenario,
    resetSequence,
    progress
  };
  
  return (
    <SequenceContext.Provider value={value}>
      {children}
    </SequenceContext.Provider>
  );
}