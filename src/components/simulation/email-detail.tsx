'use client';

import React, { useState } from 'react';
import { useEmailSimulation } from './email-simulation-context';
import { EmailMessage } from '@/types/email-simulation';
import { RedFlag } from '@/types/simulation-v2';
import { Badge } from '@/components/ui/badge';

export function EmailDetail() {
  const {
    inboxState,
    goToStep,
    showRedFlags,
    toggleRedFlags
  } = useEmailSimulation();
  
  const { emails, selectedEmailId } = inboxState;
  const selectedEmail = emails.find(email => email.id === selectedEmailId);
  
  const [showingRedFlag, setShowingRedFlag] = useState<string | null>(null);
  
  // If no email is selected, display a placeholder
  if (!selectedEmail) {
    return (
      <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center p-8 h-full">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">No email selected</h3>
          <p className="mt-1 text-sm text-gray-500">Select an email from the inbox to view it here.</p>
        </div>
      </div>
    );
  }
  
  // Format the email sender information
  const formatSender = (email: EmailMessage) => {
    return `${email.from.name} <${email.from.email}>`;
  };
  
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
  
  // Actions for the email
  const handleIdentify = () => {
    goToStep('identification');
  };
  
  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden bg-white">
      {/* Email header */}
      <div className="bg-gray-100 p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => goToStep('inbox')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="flex gap-2">
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            onClick={handleIdentify}
          >
            Identify This Email
          </button>
          <button
            className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
            onClick={toggleRedFlags}
          >
            {showRedFlags ? 'Hide Red Flags' : 'Show Red Flags'}
          </button>
        </div>
      </div>
      
      {/* Email content */}
      <div className="flex-1 overflow-auto">
        {/* Email subject */}
        <div className="p-4 border-b">
          <h1 className="text-xl font-medium">{selectedEmail.subject}</h1>
          <div className="mt-2 flex items-start">
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
              {selectedEmail.from.name.charAt(0)}
            </div>
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedEmail.from.name}</p>
                  <p className="text-sm text-gray-500">{formatSender(selectedEmail)}</p>
                </div>
                <p className="text-sm text-gray-500">{selectedEmail.date}</p>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                To: {selectedEmail.to.name} {' '}
                &lt;{selectedEmail.to.email}&gt;
              </div>
            </div>
          </div>
        </div>
        
        {/* Email body */}
        <div className="p-4">
          <div dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
        </div>
      </div>
      
      {/* Red flags section - only show when enabled */}
      {showRedFlags && selectedEmail.redFlags && selectedEmail.redFlags.length > 0 && (
        <div className="border-t p-3 bg-gray-50">
          <h3 className="text-sm font-medium text-red-600 mb-2">Red Flags in This Email:</h3>
          <div className="space-y-1">
            {selectedEmail.redFlags.map(flag => renderRedFlag(flag))}
          </div>
        </div>
      )}
    </div>
  );
}