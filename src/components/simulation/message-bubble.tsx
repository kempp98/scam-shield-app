'use client';

import React, { useState } from 'react';
import { Message } from '@/types/simulation';
import { Badge } from '@/components/ui/badge';

interface MessageBubbleProps {
  message: Message;
  showRedFlags?: boolean;
}

export function MessageBubble({ message, showRedFlags = false }: MessageBubbleProps) {
  const [showFlagDetails, setShowFlagDetails] = useState<string | null>(null);
  
  // Helper to convert URLs to clickable links in text messages
  const formatMessageText = (text: string) => {
    // Simple URL regex
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Split by URLs and map to elements
    const parts = text.split(urlRegex);
    const matches = text.match(urlRegex) || [];
    
    return parts.map((part, i) => {
      // If this is a URL part
      if (matches.includes(part)) {
        return (
          <span key={i} className="text-blue-600 underline">
            {part}
          </span>
        );
      }
      // Regular text part
      return <span key={i}>{part}</span>;
    });
  };
  
  return (
    <div className={`flex ${message.isUserMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-3/4 ${message.isUserMessage ? 'order-1' : 'order-none'}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            message.isUserMessage
              ? 'bg-primary text-white rounded-br-none'
              : 'bg-gray-200 text-gray-800 rounded-bl-none'
          }`}
        >
          <div className="text-sm">
            {formatMessageText(message.text)}
          </div>
          
          {message.timestamp && (
            <div
              className={`text-xs mt-1 ${
                message.isUserMessage ? 'text-blue-100' : 'text-gray-500'
              }`}
            >
              {message.timestamp}
            </div>
          )}
        </div>
        
        {/* Red flags section - only show for non-user messages when enabled */}
        {showRedFlags && !message.isUserMessage && message.redFlags && message.redFlags.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.redFlags.map((flag) => (
              <div key={flag.id}>
                <Badge 
                  redFlag={true}
                  className="cursor-pointer text-xs"
                  onClick={() => setShowFlagDetails(showFlagDetails === flag.id ? null : flag.id)}
                >
                  {flag.text}
                </Badge>
                
                {showFlagDetails === flag.id && (
                  <div className="mt-1 p-2 bg-red-50 text-red-800 rounded-md border border-red-200 text-xs">
                    {flag.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}