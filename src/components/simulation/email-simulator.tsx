'use client';

import React, { useEffect } from 'react';
import { useEmailSimulation } from './email-simulation-context';
import { EmailSidebar } from './email-sidebar';
import { EmailInbox } from './email-inbox';
import { EmailDetail } from './email-detail';
import { EmailQuestions } from './email-questions';

interface EmailSimulatorProps {
  scenarioId: string;
}

export function EmailSimulator({ scenarioId }: EmailSimulatorProps) {
  const { 
    isLoading, 
    error, 
    inboxState,
    resetScenario,
    startScenario
  } = useEmailSimulation();
  
  const { step } = inboxState;
  
  // Use the scenarioId to start the scenario when component mounts
  useEffect(() => {
    // Only start if not already started
    startScenario(scenarioId);
  }, [scenarioId, startScenario]);
  
  // Display loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Display any errors
  if (error) {
    return (
      <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
        <h3 className="font-bold text-lg">Error</h3>
        <p>{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={resetScenario}
        >
          Try Again
        </button>
      </div>
    );
  }
  
  // Render the questions interface when in question mode
  if (step === 'identification' || step === 'action' || step === 'complete') {
    return (
      <div className="w-full pt-6">
        <EmailQuestions />
      </div>
    );
  }
  
  // Render email interface
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full">
      {/* Email client sidebar - hidden on mobile for space */}
      <div className="w-full md:w-1/5 hidden md:block">
        <EmailSidebar />
      </div>
      
      {/* Main email interface */}
      <div className="flex flex-col md:flex-row w-full md:w-4/5 space-y-4 md:space-y-0 md:space-x-4">
        {/* Email list - full width on mobile, partial on desktop */}
        <div className={`w-full ${step === 'reading' ? 'hidden md:block' : ''} md:w-2/5 h-[600px]`}>
          <EmailInbox />
        </div>
        
        {/* Email detail - only show when an email is selected */}
        <div className={`w-full ${step !== 'reading' ? 'hidden md:block' : ''} md:w-3/5 h-[600px]`}>
          <EmailDetail />
        </div>
      </div>
    </div>
  );
}