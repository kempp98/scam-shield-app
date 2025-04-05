// src/components/simulation/email-questions.tsx
'use client';

import React from 'react';
import { useEmailSimulation } from './email-simulation-context';
import { Button } from '@/components/ui/button';

export function EmailQuestions() {
  const {
    currentScenario,
    inboxState,
    completeIdentification,
    completeAction,
    identificationCorrect,
    actionCorrect,
    identificationFeedback,
    actionFeedback,
    resetScenario
  } = useEmailSimulation();
  
  const { step } = inboxState;
  
  if (!currentScenario) {
    return null;
  }
  
  // Identification question
  if (step === 'identification') {
    return (
      <div className="bg-white rounded-md shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-4">Analyze this Email</h2>
        
        <p className="text-gray-600 mb-4">Is this email legitimate or a scam?</p>
        
        <div className="space-y-3">
          {currentScenario.identificationQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => completeIdentification(option.id)}
              className="w-full border border-gray-200 hover:border-primary hover:bg-primary/5 rounded-md p-3 text-left text-sm transition"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  // Action question
  if (step === 'action') {
    return (
      <div className="bg-white rounded-md shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-2">Choose your Response</h2>
        
        <p className={`text-sm mb-4 ${identificationCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {identificationFeedback}
        </p>
        
        <p className="text-gray-600 mb-3">What would be the safest response to this email?</p>
        
        <div className="space-y-3">
          {currentScenario.actionQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => completeAction(option.id)}
              className="w-full border border-gray-200 hover:border-primary hover:bg-primary/5 rounded-md p-3 text-left text-sm transition"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  // Completion feedback
  if (step === 'complete') {
    return (
      <div className="bg-white rounded-md shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-2">Analysis Complete</h2>
        
        <p className={`text-sm mb-4 ${actionCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {actionFeedback}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Identification:</span>
            <span className={`text-sm font-medium ${identificationCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {identificationCorrect ? 'Correct' : 'Incorrect'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Response:</span>
            <span className={`text-sm font-medium ${actionCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {actionCorrect ? 'Correct' : 'Incorrect'}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={resetScenario}
          >
            Try Again
          </Button>
          
        </div>
      </div>
    );
  }
  
  return null;
}