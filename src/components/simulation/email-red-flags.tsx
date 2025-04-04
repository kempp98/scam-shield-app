// src/components/simulation/email-red-flags.tsx
'use client';

import React, { useState } from 'react';
import { useEmailSimulation } from './email-simulation-context';
import { RedFlag } from '@/types/simulation-v2';
import { Badge } from '@/components/ui/badge';

export function EmailRedFlags() {
  const {
    inboxState,
    showRedFlags
  } = useEmailSimulation();
  
  const { emails, selectedEmailId } = inboxState;
  const selectedEmail = emails.find(email => email.id === selectedEmailId);
  
  const [showingRedFlag, setShowingRedFlag] = useState<string | null>(null);
  
  // If no email is selected or no red flags to show
  if (!selectedEmail || !showRedFlags || !selectedEmail.redFlags || selectedEmail.redFlags.length === 0) {
    return null;
  }
  
  // Handle red flag click
  const handleRedFlagClick = (flagId: string) => {
    setShowingRedFlag(showingRedFlag === flagId ? null : flagId);
  };
  
  // Render a red flag component
  const renderRedFlag = (flag: RedFlag) => {
    return (
      <div key={flag.id} className="mb-2">
        <Badge 
          redFlag={true}
          className="cursor-pointer"
          onClick={() => handleRedFlagClick(flag.id)}
        >
          {flag.text}
        </Badge>
        
        {showingRedFlag === flag.id && (
          <div className="mt-1 p-2 bg-red-50 text-red-800 rounded-md border border-red-200 text-xs">
            {flag.explanation}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-medium text-red-600 mb-2">Red Flags in This Email:</h3>
      <div className="space-y-1">
        {selectedEmail.redFlags.map(flag => renderRedFlag(flag))}
      </div>
    </div>
  );
}