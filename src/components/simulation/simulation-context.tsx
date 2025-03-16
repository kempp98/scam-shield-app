'use client';

import React, { createContext, useContext, useState} from 'react';
import { 
  SimulationScenario, 
  SimulationNode, 
  SimulationState,
  Message
} from '@/types/simulation';
import { getScenarioById } from '@/lib/simulation';

interface SimulationContextType {
  // Current state
  currentScenario: SimulationScenario | null;
  currentNode: SimulationNode | null;
  allMessages: Message[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  startScenario: (scenarioId: string) => Promise<void>;
  selectResponse: (responseId: string) => void;
  resetScenario: () => void;
  
  // Progress
  progress: SimulationState;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}

interface SimulationProviderProps {
  children: React.ReactNode;
}

export function SimulationProvider({ children }: SimulationProviderProps) {
  const [currentScenario, setCurrentScenario] = useState<SimulationScenario | null>(null);
  const [currentNode, setCurrentNode] = useState<SimulationNode | null>(null);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [progress, setProgress] = useState<SimulationState>({
    scenarioId: null,
    currentNodeId: null,
    history: [],
    completed: false,
  });

  // Start a new scenario
  const startScenario = async (scenarioId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const scenario = await getScenarioById(scenarioId);
      
      if (!scenario) {
        throw new Error(`Scenario with ID ${scenarioId} not found`);
      }
      
      const initialNode = scenario.nodes[scenario.initialNodeId];
      
      if (!initialNode) {
        throw new Error(`Initial node ${scenario.initialNodeId} not found in scenario`);
      }
      
      setCurrentScenario(scenario);
      setCurrentNode(initialNode);
      setAllMessages(initialNode.messages);
      
      setProgress({
        scenarioId,
        currentNodeId: scenario.initialNodeId,
        history: [{ nodeId: scenario.initialNodeId }],
        completed: false,
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Select a response and move to the next node
  const selectResponse = (responseId: string) => {
    if (!currentNode || !currentScenario) return;
    
    const selectedResponse = currentNode.responseOptions?.find(
      option => option.id === responseId
    );
    
    if (!selectedResponse) {
      setError(`Response with ID ${responseId} not found`);
      return;
    }
    
    const nextNode = currentScenario.nodes[selectedResponse.nextNodeId];
    
    if (!nextNode) {
      setError(`Next node ${selectedResponse.nextNodeId} not found in scenario`);
      return;
    }
    
    // Add user's selected response as a message
    const userResponseMessage: Message = {
      id: `user-response-${responseId}`,
      text: selectedResponse.text,
      isUserMessage: true,
      timestamp: getCurrentTime()
    };
    
    // Update messages with user response and next node messages
    setAllMessages(prev => [
      ...prev,
      userResponseMessage,
      ...nextNode.messages
    ]);
    
    // Update current node
    setCurrentNode(nextNode);
    
    // Update progress
    setProgress(prev => ({
      ...prev,
      currentNodeId: nextNode.id,
      history: [
        ...prev.history,
        { nodeId: nextNode.id, responseId }
      ],
      completed: nextNode.isEndNode,
      safetyScore: nextNode.isEndNode ? calculateSafetyScore(prev.history, responseId, currentScenario) : undefined
    }));
  };

  // Reset the current scenario to start over
  const resetScenario = () => {
    if (!currentScenario) return;
    
    const scenarioId = currentScenario.id;
    setCurrentScenario(null);
    setCurrentNode(null);
    setAllMessages([]);
    
    // Restart the same scenario
    startScenario(scenarioId);
  };
  
  // Helper function to get current time for message timestamps
  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Calculate a safety score based on chosen responses
  const calculateSafetyScore = (
    history: Array<{nodeId: string, responseId?: string}>,
    finalResponseId: string,
    scenario: SimulationScenario
  ): number => {
    // This is a simplified scoring algorithm
    // In a real implementation, this would be more sophisticated
    
    let safeResponses = 0;
    let totalResponses = 0;
    
    // Count previous responses
    history.forEach(item => {
      if (item.responseId) {
        totalResponses++;
        const node = scenario.nodes[item.nodeId];
        const response = node.responseOptions?.find(r => r.id === item.responseId);
        if (response && response.safetyLevel === 'safe') {
          safeResponses++;
        }
      }
    });
    
    // Add final response
    totalResponses++;
    const currentResponse = currentNode?.responseOptions?.find(r => r.id === finalResponseId);
    if (currentResponse && currentResponse.safetyLevel === 'safe') {
      safeResponses++;
    }
    
    // Calculate percentage
    return Math.round((safeResponses / totalResponses) * 100);
  };

  const value = {
    currentScenario,
    currentNode,
    allMessages,
    isLoading,
    error,
    startScenario,
    selectResponse,
    resetScenario,
    progress
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}