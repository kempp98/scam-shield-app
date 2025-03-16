'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
  
  // Use a ref to track if component is mounted to prevent memory leaks
  const isMounted = useRef(true);
  
  // Track pending timeouts to clear them if needed
  const pendingTimeouts = useRef<number[]>([]);
  
  const [progress, setProgress] = useState<SimulationState>({
    scenarioId: null,
    currentNodeId: null,
    history: [],
    completed: false,
  });

  // Clear all pending timeouts
  const clearAllTimeouts = useCallback(() => {
    pendingTimeouts.current.forEach(timeoutId => window.clearTimeout(timeoutId));
    pendingTimeouts.current = [];
  }, []);

  // Make sure to clear timeouts when unmounting
  useEffect(() => {
    return () => {
      isMounted.current = false;
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  // Start a new scenario with proper error handling
  const startScenario = useCallback(async (scenarioId: string) => {
    if (!isMounted.current) return;
    
    setIsLoading(true);
    setError(null);
    clearAllTimeouts();
    
    try {
      console.log('Loading scenario:', scenarioId);
      const scenario = await getScenarioById(scenarioId);
      
      if (!isMounted.current) return;
      
      if (!scenario) {
        console.error(`Scenario with ID ${scenarioId} not found`);
        throw new Error(`Scenario with ID ${scenarioId} not found`);
      }
      
      const initialNode = scenario.nodes[scenario.initialNodeId];
      
      if (!initialNode) {
        console.error(`Initial node ${scenario.initialNodeId} not found in scenario`);
        throw new Error(`Initial node ${scenario.initialNodeId} not found in scenario`);
      }
      
      setAllMessages(initialNode.messages || []);
      setCurrentNode(initialNode);
      setCurrentScenario(scenario);
      
      setProgress({
        scenarioId,
        currentNodeId: scenario.initialNodeId,
        history: [{ nodeId: scenario.initialNodeId }],
        completed: false,
      });
      
    } catch (err) {
      if (!isMounted.current) return;
      console.error('Error loading scenario:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [clearAllTimeouts]);

  // Helper function to get current time for message timestamps
  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Calculate a safety score based on chosen responses
  const calculateSafetyScore = useCallback((
    history: Array<{nodeId: string, responseId?: string}>,
    finalResponseId: string,
    scenario: SimulationScenario
  ): number => {
    // This is a simplified scoring algorithm
    
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
    const finalNode = currentNode;
    const currentResponse = finalNode?.responseOptions?.find(r => r.id === finalResponseId);
    if (currentResponse && currentResponse.safetyLevel === 'safe') {
      safeResponses++;
    }
    
    // Calculate percentage (handle division by zero)
    return totalResponses > 0 ? Math.round((safeResponses / totalResponses) * 100) : 0;
  }, [currentNode]);

  // Select a response and move to the next node - optimized to prevent freezing
  const selectResponse = useCallback((responseId: string) => {
    if (!currentNode || !currentScenario) {
      console.error("Cannot select response: missing currentNode or currentScenario");
      return;
    }
    
    // Prevent duplicate clicks
    if (isLoading) {
      console.log("Ignoring response while loading");
      return;
    }
    
    const selectedResponse = currentNode.responseOptions?.find(
      option => option.id === responseId
    );
    
    if (!selectedResponse) {
      console.error(`Response with ID ${responseId} not found`);
      setError(`Response with ID ${responseId} not found`);
      return;
    }
    
    const nextNode = currentScenario.nodes[selectedResponse.nextNodeId];
    
    if (!nextNode) {
      console.error(`Next node ${selectedResponse.nextNodeId} not found in scenario`);
      setError(`Next node ${selectedResponse.nextNodeId} not found in scenario`);
      return;
    }
    
    // Start loading
    setIsLoading(true);
    
    // Add user's selected response as a message
    const userResponseMessage: Message = {
      id: `user-response-${responseId}`,
      text: selectedResponse.text,
      isUserMessage: true,
      timestamp: getCurrentTime()
    };
    
    // Update messages with user response (make a copy to avoid state mutation issues)
    const updatedMessages = [...allMessages, userResponseMessage];
    setAllMessages(updatedMessages);
    
    // Use setTimeout to create a small delay between user response and next node
    // Store the timeout ID so we can clear it if needed
    const timeoutId = window.setTimeout(() => {
      if (!isMounted.current) return;
      
      // Make sure we have nextNode.messages and it's an array to avoid crashes
      const nextNodeMessages = nextNode.messages || [];
      
      // Update with next node messages (make a copy to avoid state mutation issues)
      setAllMessages([...updatedMessages, ...nextNodeMessages]);
      
      // Update current node
      setCurrentNode(nextNode);
      
      // Update progress
      setProgress(prev => {
        // Only calculate safety score if this is an end node
        const safetyScore = nextNode.isEndNode 
          ? calculateSafetyScore(prev.history, responseId, currentScenario)
          : undefined;
          
        return {
          ...prev,
          currentNodeId: nextNode.id,
          history: [
            ...prev.history,
            { nodeId: nextNode.id, responseId }
          ],
          completed: nextNode.isEndNode,
          safetyScore
        };
      });
      
      // Remove the timeout ID from our tracking list
      pendingTimeouts.current = pendingTimeouts.current.filter(id => id !== timeoutId);
      
      // End loading
      setIsLoading(false);
    }, 300); // Reduced from 400ms to 300ms to improve responsiveness
    
    // Add the timeout ID to our tracking list
    pendingTimeouts.current.push(timeoutId);
  }, [currentNode, currentScenario, allMessages, isLoading, calculateSafetyScore]);

  // Reset the current scenario to start over
  const resetScenario = useCallback(() => {
    if (!currentScenario) return;
    
    const scenarioId = currentScenario.id;
    
    // Clear all pending operations
    clearAllTimeouts();
    
    // Reset state
    setCurrentScenario(null);
    setCurrentNode(null);
    setAllMessages([]);
    setProgress({
      scenarioId: null,
      currentNodeId: null,
      history: [],
      completed: false,
    });
    
    // Use a short timeout to ensure state is properly reset before restarting
    const timeoutId = window.setTimeout(() => {
      if (isMounted.current) {
        // Restart the same scenario
        startScenario(scenarioId);
      }
      // Remove the timeout ID from our tracking list
      pendingTimeouts.current = pendingTimeouts.current.filter(id => id !== timeoutId);
    }, 50);
    
    // Add the timeout ID to our tracking list
    pendingTimeouts.current.push(timeoutId);
  }, [currentScenario, startScenario, clearAllTimeouts]);

  // Safety mechanism for loading state - prevent stuck loading state
  useEffect(() => {
    if (isLoading) {
      const timer = window.setTimeout(() => {
        if (isLoading && isMounted.current) {
          console.warn("Loading state stuck for 3 seconds, resetting");
          setIsLoading(false);
        }
      }, 3000); // Reduced from 5s to 3s
      
      // Add the timeout ID to our tracking list
      pendingTimeouts.current.push(timer);
      
      return () => {
        window.clearTimeout(timer);
        // Remove the timeout ID from our tracking list
        pendingTimeouts.current = pendingTimeouts.current.filter(id => id !== timer);
      };
    }
  }, [isLoading]);

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