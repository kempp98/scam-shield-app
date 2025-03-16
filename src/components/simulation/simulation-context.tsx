'use client';

// CHANGE 1: Add useEffect to imports
import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // CHANGE 2: Fix the localStorage effect - it should use progress.scenarioId instead
  useEffect(() => {
    // Save progress to localStorage whenever it changes
    if (progress.scenarioId) {
      localStorage.setItem(`sim-progress-${progress.scenarioId}`, JSON.stringify(progress));
    }
  }, [progress]);

  // CHANGE 3: Add loading timeout safety
  useEffect(() => {
    // Add a timeout to ensure loading state gets reset if something goes wrong
    let loadingTimeout: NodeJS.Timeout | null = null;
    
    if (isLoading) {
      loadingTimeout = setTimeout(() => {
        if (isLoading) {
          console.warn("Loading state stuck for 5 seconds, resetting");
          setIsLoading(false);
        }
      }, 5000);
    }
    
    return () => {
      if (loadingTimeout) clearTimeout(loadingTimeout);
    };
  }, [isLoading]);

  // Start a new scenario
  const startScenario = async (scenarioId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add more error handling and logging
      console.log('Loading scenario:', scenarioId);
      const scenario = await getScenarioById(scenarioId);
      
      if (!scenario) {
        console.error(`Scenario with ID ${scenarioId} not found`);
        throw new Error(`Scenario with ID ${scenarioId} not found`);
      }
      
      const initialNode = scenario.nodes[scenario.initialNodeId];
      
      if (!initialNode) {
        console.error(`Initial node ${scenario.initialNodeId} not found in scenario`);
        throw new Error(`Initial node ${scenario.initialNodeId} not found in scenario`);
      }
      
      // Set state in a more predictable order
      setAllMessages(initialNode.messages);
      setCurrentNode(initialNode);
      setCurrentScenario(scenario);
      
      setProgress({
        scenarioId,
        currentNodeId: scenario.initialNodeId,
        history: [{ nodeId: scenario.initialNodeId }],
        completed: false,
      });
      
    } catch (err) {
      console.error('Error loading scenario:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // CHANGE 4: Fix the selectResponse function
  const selectResponse = (responseId: string) => {
    if (!currentNode || !currentScenario) {
      console.error("Cannot select response: currentNode or currentScenario is null");
      return;
    }
    
    // Prevent selecting responses while loading
    if (isLoading) {
      console.log("Ignoring selection while loading");
      return;
    }
    
    console.log('Selecting response:', responseId);
    
    // First find the selected response
    const selectedResponse = currentNode.responseOptions?.find(
      option => option.id === responseId
    );
    
    if (!selectedResponse) {
      console.error(`Response with ID ${responseId} not found`);
      setError(`Response with ID ${responseId} not found`);
      return;
    }
    
    // Find the next node
    const nextNode = currentScenario.nodes[selectedResponse.nextNodeId];
    
    if (!nextNode) {
      console.error(`Next node ${selectedResponse.nextNodeId} not found`);
      setError(`Next node ${selectedResponse.nextNodeId} not found in scenario`);
      return;
    }
    
    // Set loading to prevent multiple clicks
    setIsLoading(true);
    
    // Create a user message from the response
    const userResponseMessage: Message = {
      id: `user-response-${responseId}`,
      text: selectedResponse.text,
      isUserMessage: true,
      timestamp: getCurrentTime()
    };
    
    // First update messages array with just the user's selection
    setAllMessages(prev => [...prev, userResponseMessage]);
    
    // Use setTimeout to create a small delay before showing the next node's messages
    setTimeout(() => {
      try {
        // CHANGE 5: Only add the next node's messages, not the user message again
        setAllMessages(prev => [...prev, ...nextNode.messages]);
        setCurrentNode(nextNode);
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
      } catch (err) {
        console.error("Error updating state after response:", err);
        setError("An error occurred processing your response");
      } finally {
        setIsLoading(false);
      }
    }, 500); // 500ms delay feels natural for a conversation
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