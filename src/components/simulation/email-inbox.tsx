'use client';

import React from 'react';
import { useEmailSimulation } from './email-simulation-context';
import { cn } from '@/lib/utils';

export function EmailInbox() {
  const {
    inboxState,
    selectEmail,
    // currentScenario
  } = useEmailSimulation();
  
  const { emails, selectedEmailId} = inboxState;
  
  // Format the preview text (truncated body text without HTML)
  const formatPreviewText = (body: string): string => {
    // Remove HTML tags
    const textOnly = body.replace(/<[^>]*>/g, '');
    // Truncate to 100 characters
    return textOnly.length > 100
      ? textOnly.substring(0, 100) + '...'
      : textOnly;
  };
  
  return (
    <div className="flex flex-col border rounded-md overflow-hidden bg-white h-full">
      {/* Inbox header */}
      <div className="bg-gray-100 p-3 border-b flex items-center justify-between flex-shrink-0">
        <h2 className="font-medium">Inbox</h2>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-200 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Email list */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
        {emails.map((email) => (
          <button
            key={email.id}
            onClick={() => selectEmail(email.id)}
            className={cn(
              "w-full text-left p-3 transition-colors hover:bg-blue-50 flex flex-col gap-1",
              selectedEmailId === email.id && "bg-blue-100",
              !email.isRead && "font-semibold bg-blue-50"
            )}
          >
            <div className="flex justify-between items-center">
              <span className={cn(
                "text-sm truncate flex-1",
                !email.isRead && "font-semibold"
              )}>
                {email.from.name}
              </span>
              <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                {email.date}
              </span>
            </div>
            
            <div className="text-sm font-medium truncate pr-4">
              {email.subject}
            </div>
            
            <div className="text-xs text-gray-500 truncate">
              {formatPreviewText(email.body)}
            </div>
          </button>
        ))}
        
        {emails.length === 0 && (
          <div className="flex items-center justify-center h-40 text-gray-500">
            No emails found
          </div>
        )}
      </div>
      
      {/* Status bar */}
      <div className="bg-gray-100 p-2 border-t text-xs text-gray-500 flex justify-between flex-shrink-0">
        <span>{emails.length} messages</span>
      </div>
    </div>
  );
}