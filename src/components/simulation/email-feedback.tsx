// src/components/simulation/email-feedback.tsx
'use client';

import React from 'react';
import { useEmailSimulation } from './email-simulation-context';
import { Button } from '@/components/ui/button';

export function EmailFeedback() {
  const {
    identificationCorrect,
    identificationFeedback,
    proceedToAction
  } = useEmailSimulation();
  
  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <h2 className="text-xl font-semibold mb-4">
        {identificationCorrect 
          ? "That's Correct!" 
          : "Not Quite Right"}
      </h2>
      
      <div className={`p-4 rounded-lg mb-6 ${
        identificationCorrect 
          ? "bg-green-50 border border-green-200 text-green-800" 
          : "bg-red-50 border border-red-200 text-red-800"
      }`}>
        <p className="text-sm">{identificationFeedback}</p>
      </div>
      
      <Button 
        variant="default" 
        className="w-full"
        onClick={proceedToAction}
      >
        Continue to Safety Response
      </Button>
    </div>
  );
}