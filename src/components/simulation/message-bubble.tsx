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
    <div className={`flex ${message.isUserMessage ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-[75%] ${message.isUserMessage ? 'order-1' : 'order-none'}`}>
        <div
          className={`px-4 py-2.5 ${
            message.isUserMessage
              ? 'bg-[#0b93f6] text-white rounded-t-xl rounded-l-xl rounded-br-none'
              : 'bg-[#e9e9eb] text-black rounded-t-xl rounded-r-xl rounded-bl-none'
          } shadow-sm`}
        >
          <div className="text-sm leading-tight">
            {formatMessageText(message.text)}
          </div>
          
          {message.timestamp && (
            <div
              className={`text-[10px] mt-1 ${
                message.isUserMessage ? 'text-blue-100' : 'text-gray-500'
              }`}
            >
              {message.timestamp}
            </div>
          )}
        </div>
        
        {/* Red flags section - only show for non-user messages when enabled */}
        {showRedFlags && !message.isUserMessage && message.redFlags && message.redFlags.length > 0 && (
          <div className="mt-2 space-y-1.5">
            {message.redFlags.map((flag) => (
              <div key={flag.id}>
                <Badge 
                  redFlag={true}
                  className="cursor-pointer text-xs hover:bg-red-100"
                  onClick={() => setShowFlagDetails(showFlagDetails === flag.id ? null : flag.id)}
                >
                  {flag.text}
                </Badge>
                
                {showFlagDetails === flag.id && (
                  <div className="mt-1.5 p-2.5 bg-red-50 text-red-800 rounded-lg border border-red-200 text-xs shadow-sm">
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