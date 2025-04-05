'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { EmailScenarioData,  EmailInboxState } from '@/types/email-simulation';
import mockEmailScenarios from '@/data/simulation/email-scenarios';

interface EmailSimulationContextType {
  // Current state
  currentScenario: EmailScenarioData | null;
  inboxState: EmailInboxState;
  isLoading: boolean;
  error: string | null;
  showRedFlags: boolean;
  activeRedFlagId: string | null;
  
  // Actions
  startScenario: (scenarioId: string) => Promise<void>;
  selectEmail: (emailId: string) => void;
  goToStep: (step: EmailInboxState['step']) => void;
  completeIdentification: (optionId: string) => void;
  completeAction: (optionId: string) => void;
  resetScenario: () => void;
  toggleRedFlags: () => void;
  highlightRedFlag: (redFlagId: string) => void;
  proceedToAction: () => void;
  
  // Results
  identificationCorrect: boolean | null;
  actionCorrect: boolean | null;
  safetyImpact: number | null;
  identificationFeedback: string | null;
  actionFeedback: string | null;
}

const EmailSimulationContext = createContext<EmailSimulationContextType | undefined>(undefined);

export function useEmailSimulation() {
  const context = useContext(EmailSimulationContext);
  if (context === undefined) {
    throw new Error('useEmailSimulation must be used within an EmailSimulationProvider');
  }
  return context;
}

interface EmailSimulationProviderProps {
  children: React.ReactNode;
  scenarioId?: string;
}

export function EmailSimulationProvider({ 
  children, 
  scenarioId: initialScenarioId 
}: EmailSimulationProviderProps) {
  // State for the current scenario
  const [currentScenario, setCurrentScenario] = useState<EmailScenarioData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showRedFlags, setShowRedFlags] = useState<boolean>(false);
  const [activeRedFlagId, setActiveRedFlagId] = useState<string | null>(null);

  
  // User interaction states
  const [inboxState, setInboxState] = useState<EmailInboxState>({
    emails: [],
    selectedEmailId: null,
    activeFolder: 'inbox',
    step: 'inbox'
  });
  
  // Results state
  const [identificationCorrect, setIdentificationCorrect] = useState<boolean | null>(null);
  const [actionCorrect, setActionCorrect] = useState<boolean | null>(null);
  const [safetyImpact, setSafetyImpact] = useState<number | null>(null);
  const [identificationFeedback, setIdentificationFeedback] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const highlightRedFlag = useCallback((redFlagId: string) => {
    setActiveRedFlagId(prevId => prevId === redFlagId ? null : redFlagId);
  }, []);
  
  // Load a scenario by ID
  const startScenario = useCallback(async (scenarioId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would fetch from an API
      // For now, we're using mock data
      const scenario = mockEmailScenarios.find(s => s.id === scenarioId);
      
      if (!scenario) {
        throw new Error(`Scenario with ID ${scenarioId} not found`);
      }
      
      // Reset state
      setIdentificationCorrect(null);
      setActionCorrect(null);
      setSafetyImpact(null);
      setIdentificationFeedback(null);
      setActionFeedback(null);
      setShowRedFlags(false);
      
      // Set up inbox state
      setInboxState({
        emails: scenario.emails,
        selectedEmailId: null,
        activeFolder: 'inbox',
        step: 'inbox'
      });
      
      setCurrentScenario(scenario);
    } catch (err) {
      console.error('Error loading scenario:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Start scenario from prop if provided
  useEffect(() => {
    if (initialScenarioId && !currentScenario && !isLoading) {
      startScenario(initialScenarioId);
    }
  }, [initialScenarioId, currentScenario, isLoading, startScenario]);
  
  // Select an email from the inbox
  const selectEmail = useCallback((emailId: string) => {
    setInboxState(prev => ({
      ...prev,
      selectedEmailId: emailId,
      step: 'reading',
      // Mark email as read
      emails: prev.emails.map(email => 
        email.id === emailId 
          ? { ...email, isRead: true } 
          : email
      )
    }));
    setActiveRedFlagId(null);
  }, []);
  
  // Go to a specific step in the simulation
  const goToStep = useCallback((step: EmailInboxState['step']) => {
    setInboxState(prev => ({
      ...prev,
      step
    }));
  }, []);
  
  // Handle identification question answer
  const completeIdentification = useCallback((optionId: string) => {
    if (!currentScenario) return;
    
    const selectedOption = currentScenario.identificationQuestion.options.find(
      option => option.id === optionId
    );
    
    if (selectedOption) {
      setIdentificationCorrect(selectedOption.isCorrect);
      setIdentificationFeedback(selectedOption.feedback);
      
      // Move to action question
      setInboxState(prev => ({
        ...prev,
        step: 'feedback'
      }));
    }
  }, [currentScenario]);

  const proceedToAction = useCallback(() => {
    setInboxState(prev => ({
      ...prev,
      step: 'action'
    }));
  },[]);
  
  // Handle action question answer
  const completeAction = useCallback((optionId: string) => {
    if (!currentScenario) return;
    
    const selectedOption = currentScenario.actionQuestion.options.find(
      option => option.id === optionId
    );
    
    if (selectedOption) {
      setActionCorrect(selectedOption.isCorrect);
      setSafetyImpact(selectedOption.safetyImpact);
      setActionFeedback(selectedOption.feedback);
      
      // Complete the scenario
      setInboxState(prev => ({
        ...prev,
        step: 'complete'
      }));
    }
  }, [currentScenario]);
  
  // Reset the scenario
  const resetScenario = useCallback(() => {
    if (!currentScenario) return;
    
    const scenarioId = currentScenario.id;
    
    // Reset all state
    setCurrentScenario(null);
    setInboxState({
      emails: [],
      selectedEmailId: null,
      activeFolder: 'inbox',
      step: 'inbox'
    });
    setIdentificationCorrect(null);
    setActionCorrect(null);
    setSafetyImpact(null);
    setIdentificationFeedback(null);
    setActionFeedback(null);
    setShowRedFlags(false);
    setActiveRedFlagId(null);
    
    // Start over
    startScenario(scenarioId);
  }, [currentScenario, startScenario]);
  
  // Toggle red flags visibility
  const toggleRedFlags = useCallback(() => {
    setShowRedFlags(prev => !prev);
    if (showRedFlags) {
      setActiveRedFlagId(null);
    }
  }, []);
  
  const value = {
    currentScenario,
    inboxState,
    isLoading,
    error,
    showRedFlags,
    activeRedFlagId,
    startScenario,
    selectEmail,
    goToStep,
    completeIdentification,
    completeAction,
    resetScenario,
    toggleRedFlags,
    highlightRedFlag,
    proceedToAction,
    identificationCorrect,
    actionCorrect,
    safetyImpact,
    identificationFeedback,
    actionFeedback
  };
  
  return (
    <EmailSimulationContext.Provider value={value}>
      {children}
    </EmailSimulationContext.Provider>
  );
}