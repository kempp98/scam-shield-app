// src/components/simulation/email-action-buttons.tsx
'use client';

import React from 'react';
import { useEmailSimulation } from './email-simulation-context';
import { Button } from '@/components/ui/button';

export function EmailActionButtons() {
  const {
    goToStep,
    showRedFlags,
    toggleRedFlags
  } = useEmailSimulation();
  
  const handleIdentify = () => {
    goToStep('identification');
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-2">
      <Button
        className="w-full justify-center"
        onClick={handleIdentify}
      >
        Identify This Email
      </Button>
      
      <Button
        variant="outline"
        className="w-full justify-center"
        onClick={toggleRedFlags}
      >
        {showRedFlags ? 'Hide Red Flags' : 'Show Red Flags'}
      </Button>
    </div>
  );
}