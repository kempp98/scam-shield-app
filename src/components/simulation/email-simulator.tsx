'use client';

import React, { useEffect } from 'react';
import { useEmailSimulation } from './email-simulation-context';
import { EmailSidebar } from './email-sidebar';
import { EmailInbox } from './email-inbox';
import { EmailDetail } from './email-detail';
import { EmailQuestions } from './email-questions';
import { EmailRedFlags } from './email-red-flags';
import { EmailActionButtons } from './email-action-buttons';
import { EmailFeedback } from './email-feedback';

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
  
  // Determine if we're showing questions or feedback
  const showingFeedback = inboxState.step === 'feedback';
  const showingQuestions = inboxState.step === 'identification' || inboxState.step === 'action' || inboxState.step === 'complete';
  
  return (
    <div className="w-full space-y-4">
      
      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Email interface with shared backdrop */}
        <div className="lg:col-span-9">
          <div className="bg-gray-100 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 h-[600px]">
              {/* Email client sidebar */}
              <div className="w-full md:w-1/5 bg-white border-r border-gray-200 h-full overflow-y-auto">
                <EmailSidebar />
              </div>
              
              {/* Email content */}
              <div className="flex flex-col md:flex-row w-full md:w-4/5 h-full">
                {/* Email list */}
                <div className={`w-full ${inboxState.step === 'reading' ? 'hidden md:block' : ''} md:w-2/5 border-r border-gray-200 bg-white h-full overflow-y-auto`}>
                  <EmailInbox />
                </div>
                
                {/* Email detail */}
                
                <div className={`w-full ${inboxState.step === 'reading' ? '' : 'hidden md:flex'} md:w-3/5 h-[600px]`}>
                  <EmailDetail />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3 space-y-4">
          {/* Action Buttons - only shown when email is selected */}
          {inboxState.selectedEmailId && <EmailActionButtons />}
          
          {/* Red flags - only shown when email is selected */}
          {inboxState.selectedEmailId && <EmailRedFlags />}

          {/* Feedback - shown after identification question */}
          {showingFeedback && <EmailFeedback />}
          
          {/* Questions - only shown in analysis mode */}
          {showingQuestions && !showingFeedback && <EmailQuestions />}
        </div>
      </div>
      
      {/* Footer reminder */}
      <div className="text-center text-sm text-gray-500 mt-4">
        Remember: This is a safe simulation environment. In real life, be cautious with emails from unknown senders and never share sensitive information through email.
      </div>
    </div>
  );
}