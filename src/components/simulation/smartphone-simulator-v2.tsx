'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ScenarioData } from '@/types/simulation-v2';
import { MessageBubble } from './message-bubble';
import { Button } from '@/components/ui/button';

interface SmartphoneSimulatorV2Props {
  scenario: ScenarioData;
  onIdentificationSelect: (optionId: string) => void;
  onActionSelect: (optionId: string) => void;
  step: 'identification' | 'action' | 'complete';
  identificationFeedback?: string;
  actionFeedback?: string;
}

export function SmartphoneSimulatorV2({ 
  scenario, 
  onIdentificationSelect, 
  onActionSelect, 
  step,
  identificationFeedback,
  actionFeedback
}: SmartphoneSimulatorV2Props) {
  const [showRedFlags, setShowRedFlags] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);
  
  // Current time for the phone UI
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Function to render the current question
  const renderQuestion = () => {
    if (step === 'identification') {
      return (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Is this a legitimate message or a scam?</h3>
          <div className="space-y-2">
            {scenario.identificationQuestion.options.map(option => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full text-left justify-start h-auto py-3 px-4 whitespace-normal rounded-lg text-blue-600 border-gray-200"
                onClick={() => onIdentificationSelect(option.id)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      );
    } else if (step === 'action') {
      return (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">How would you respond to this message?</h3>
          <div className="space-y-2">
            {scenario.actionQuestion.options.map(option => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full text-left justify-start h-auto py-3 px-4 whitespace-normal rounded-lg text-blue-600 border-gray-200"
                onClick={() => onActionSelect(option.id)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      );
    } else if (step === 'complete' && identificationFeedback && actionFeedback) {
      return (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium text-green-800 mb-2">Feedback</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Identification:</h4>
              <p className="text-gray-700">{identificationFeedback}</p>
            </div>
            <div>
              <h4 className="font-medium">Response:</h4>
              <p className="text-gray-700">{actionFeedback}</p>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="mx-auto max-w-[320px]">
      {/* Smartphone frame */}
      <div className="border-[8px] border-black rounded-[2rem] overflow-hidden shadow-xl bg-white">
        {/* Phone status bar */}
        <div className="bg-black text-white px-4 py-2 flex justify-between items-center">
          <div>{currentTime}</div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0a1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a1 1 0 00.707-.293l3-3a1 1 0 00.293-.707V5a1 1 0 00-1-1H3z" />
            </svg>
          </div>
        </div>
        
        {/* Message app header */}
        <div className="bg-[#f5f5f7] border-b border-gray-200 p-3 flex items-center">
          <div className="flex items-center flex-1 justify-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold mr-2">
              {scenario.sender.name.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{scenario.sender.name}</div>
              <div className="text-xs text-gray-500">{scenario.sender.phoneNumber}</div>
            </div>
          </div>
        </div>
        
        {/* Messages container */}
        <div className="bg-[#f7f7f7] p-4 h-[450px] overflow-y-auto">
          {/* Messages */}
          <div className="space-y-3 mb-4">
            {scenario.messages.map(message => (
              <MessageBubble
                key={message.id}
                message={{
                  ...message,
                  redFlags: step !== 'identification' && showRedFlags ? scenario.redFlags : undefined
                }}
                showRedFlags={step !== 'identification' && showRedFlags}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Current question */}
          {renderQuestion()}
        </div>
        
        {/* Bottom bar */}
        <div className="p-3 border-t border-gray-200 flex justify-between bg-[#f5f5f7]">
          <div className="text-sm text-gray-600">
            ScamShield Simulation
          </div>
          {step !== 'identification' && scenario.isScam && (
            <Button
              variant="outline"
              size="sm"
              className={`text-xs ${showRedFlags ? 'bg-red-50 text-red-600' : ''}`}
              onClick={() => setShowRedFlags(!showRedFlags)}
              type="button"
            >
              {showRedFlags ? 'Hide Red Flags' : 'Show Red Flags'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}