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
  const [userResponses, setUserResponses] = useState<{
    identification?: string;
    action?: string;
  }>({});
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step, userResponses]);
  
  // Current time for the phone UI
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Handle identification selection with user response display
  const handleIdentificationSelect = (optionId: string) => {
    const selectedOption = scenario.identificationQuestion.options.find(
      option => option.id === optionId
    );
    
    if (selectedOption) {
      setUserResponses(prev => ({
        ...prev,
        identification: selectedOption.text
      }));
      onIdentificationSelect(optionId);
    }
  };

  // Handle action selection with user response display
  const handleActionSelect = (optionId: string) => {
    const selectedOption = scenario.actionQuestion.options.find(
      option => option.id === optionId
    );
    
    if (selectedOption) {
      setUserResponses(prev => ({
        ...prev,
        action: selectedOption.text
      }));
      onActionSelect(optionId);
    }
  };
  
  // Function to render the current question
  const renderQuestion = () => {
    if (step === 'identification') {
      return (
        <div className="p-4 bg-blue-50 rounded-lg h-full flex flex-col">
          <h3 className="font-medium text-blue-800 mb-2">Is this a legitimate message or a scam?</h3>
          <div className="space-y-2">
            {scenario.identificationQuestion.options.map(option => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full text-left justify-start h-auto py-3 px-4 whitespace-normal rounded-lg text-blue-600 border-gray-200"
                onClick={() => handleIdentificationSelect(option.id)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      );
    } else if (step === 'action') {
      return (
        <div className="p-4 bg-blue-50 rounded-lg h-full flex flex-col">
          <h3 className="font-medium text-blue-800 mb-2">How would you respond to this message?</h3>
          <div className="space-y-2">
            {scenario.actionQuestion.options.map(option => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full text-left justify-start h-auto py-3 px-4 whitespace-normal rounded-lg text-blue-600 border-gray-200"
                onClick={() => handleActionSelect(option.id)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      );
    } else if (step === 'complete' && identificationFeedback && actionFeedback) {
      return (
        <div className="p-4 bg-green-50 rounded-lg h-full flex flex-col">
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
    <div className="mx-auto max-w-[1000px] flex flex-col md:flex-row gap-6 items-start">
      {/* Smartphone section */}
      <div className="flex-shrink-0 w-full md:w-[320px]">
        {/* Step indicator - only visible on mobile */}
        <div className="mb-4 flex justify-between items-center md:hidden">
          <div className="text-sm font-medium text-gray-500">
            {step === 'identification' && 'Step 1: Identify if this is a scam'}
            {step === 'action' && 'Step 2: Choose your response'}
            {step === 'complete' && 'Scenario Complete'}
          </div>
          <div className="flex space-x-1">
            <div className={`h-2 w-8 rounded-full ${step !== 'identification' ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`h-2 w-8 rounded-full ${step === 'complete' ? 'bg-primary' : 'bg-gray-200'}`}></div>
          </div>
        </div>
        
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
            <button className="text-blue-500 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="flex-1">
              {scenario.sender.name ? (
                <div className="font-medium">{scenario.sender.name}</div>
              ) : (
                <div className="font-medium">{scenario.sender.phoneNumber}</div>
              )}
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </button>
              <button className="text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Messages container */}
          <div className="bg-[#f7f7f7] p-4 h-[380px] overflow-y-auto">
            {/* Messages */}
            <div className="space-y-3 mb-4">
              {scenario.messages.map((message) => (
                <React.Fragment key={message.id}>
                  {/* Add timestamp above message */}
                  <div className="text-xs text-gray-500 text-center my-1">
                    {message.timestamp || "Today"}
                  </div>
                  <MessageBubble
                    message={{
                      ...message,
                      timestamp: undefined, // Remove timestamp from message itself
                      redFlags: step !== 'identification' && showRedFlags ? scenario.redFlags : undefined
                    }}
                    showRedFlags={step !== 'identification' && showRedFlags}
                  />
                </React.Fragment>
              ))}
              
              {/* User responses */}
              {step !== 'identification' && userResponses.identification && (
                <>
                  <div className="text-xs text-gray-500 text-center my-1">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="flex justify-end">
                    <div className="rounded-lg py-2 px-3 max-w-[85%] bg-blue-500 text-white break-words">
                      {userResponses.identification}
                    </div>
                  </div>
                </>
              )}
              {step === 'complete' && userResponses.action && (
                <>
                  <div className="text-xs text-gray-500 text-center my-1">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="flex justify-end">
                    <div className="rounded-lg py-2 px-3 max-w-[85%] bg-blue-500 text-white break-words">
                      {userResponses.action}
                    </div>
                  </div>
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Message input area */}
          {step !== 'complete' && (
            <div className="bg-white p-2 border-t flex items-center">
              <div className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-gray-400 text-sm">
                Message
              </div>
              <button className="ml-2 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          )}
          
          {/* Bottom bar */}
          <div className="px-3 py-1 border-t border-gray-200 bg-[#f5f5f7] text-xs text-gray-500">
            <div className="flex justify-between items-center">
              <div>
                ScamShield Simulation
              </div>
              {step !== 'identification' && scenario.isScam && (
                <Button
                  variant="outline"
                  size="sm"
                  className={`text-xs py-1 ${showRedFlags ? 'bg-red-50 text-red-600' : ''}`}
                  onClick={() => setShowRedFlags(!showRedFlags)}
                  type="button"
                >
                  {showRedFlags ? 'Hide Red Flags' : 'Show Red Flags'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Question section - right side */}
      <div className="flex-1 md:mt-12">
        {/* Step indicator - only visible on desktop */}
        <div className="hidden md:flex justify-between items-center mb-4">
          <div className="text-sm font-medium text-gray-500">
            {step === 'identification' && 'Step 1: Identify if this is a scam'}
            {step === 'action' && 'Step 2: Choose your response'}
            {step === 'complete' && 'Scenario Complete'}
          </div>
          <div className="flex space-x-1">
            <div className={`h-2 w-8 rounded-full ${step !== 'identification' ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`h-2 w-8 rounded-full ${step === 'complete' ? 'bg-primary' : 'bg-gray-200'}`}></div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-5 rounded-lg shadow-sm h-full">
          {renderQuestion()}
        </div>
      </div>
    </div>
  );
}