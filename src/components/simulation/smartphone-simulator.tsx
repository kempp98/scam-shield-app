'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSimulation } from '@/components/simulation/simulation-context';
import { MessageBubble } from '@/components/simulation/message-bubble';
import { ResponseOptions } from '@/components/simulation/response-options';
import { SimulationFeedback } from '@/components/simulation/simulation-feedback';
import { Button } from '@/components/ui/button';

interface SmartphoneSimulatorProps {
  scenarioId: string;
}

export function SmartphoneSimulator({ scenarioId }: SmartphoneSimulatorProps) {
  const { 
    startScenario,
    currentScenario,
    currentNode, 
    allMessages,
    selectResponse,
    resetScenario,
    progress,
    isLoading,
    error
  } = useSimulation();
  
  const [showRedFlags, setShowRedFlags] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAttemptedStart = useRef(false);
  
  // Memoize the scroll function to prevent unnecessary re-renders
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  // Start scenario when component mounts with proper error handling
  useEffect(() => {
    let isActive = true;
    
    const initScenario = async () => {
      try {
        console.log('Starting scenario:', scenarioId);
        hasAttemptedStart.current = true;
        await startScenario(scenarioId);
      } catch (error) {
        if (isActive) {
          console.error('Error initializing scenario:', error);
        }
      }
    };
    
    if (!hasAttemptedStart.current) {
      initScenario();
    }
    
    return () => {
      isActive = false;
    };
  }, [scenarioId, startScenario]);
  
  // Scroll to bottom whenever messages change, with debounce to improve performance
  useEffect(() => {
    if (allMessages.length === 0) return;
    
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [allMessages, scrollToBottom]);
  
  // Generate current time for the phone UI
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Safe click handler for response selection with error handling
  const handleResponseSelect = useCallback((responseId: string) => {
    try {
      selectResponse(responseId);
    } catch (error) {
      console.error('Error selecting response:', error);
    }
  }, [selectResponse]);
  
  // Safe click handler for scenario reset with error handling
  const handleResetScenario = useCallback(() => {
    try {
      resetScenario();
    } catch (error) {
      console.error('Error resetting scenario:', error);
    }
  }, [resetScenario]);
  
  // Loading state with a more lightweight spinner
  if (isLoading && !currentScenario) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Error state with retry button
  if (error) {
    return (
      <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
        <h3 className="font-bold text-lg">Error</h3>
        <p>{error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => {
            hasAttemptedStart.current = false;
            startScenario(scenarioId);
          }}
        >
          Try Again
        </Button>
      </div>
    );
  }
  
  // If no scenario is loaded yet, show a minimal loading state
  if (!currentScenario) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-36"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mx-auto max-w-[320px]">
      {/* Smartphone frame - optimized for performance */}
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
        
        {/* Message app header - simplified for performance */}
        <div className="bg-[#f5f5f7] border-b border-gray-200 p-3 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2 text-blue-500"
            onClick={handleResetScenario}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Button>
          
          <div className="flex items-center flex-1 justify-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold mr-2">
              {currentScenario.sender?.name?.charAt(0) || "?"}
            </div>
            <div>
              <div className="font-medium">{currentScenario.sender?.name || "Unknown"}</div>
              <div className="text-xs text-gray-500">{currentScenario.sender?.phoneNumber || ""}</div>
            </div>
          </div>
        </div>
        
        {/* Messages container - optimized with windowing for performance */}
        <div 
          className="bg-[#f7f7f7] p-4 h-[450px] overflow-y-auto"
          style={{ overscrollBehavior: 'contain' }} // Prevent scroll chaining
        >
          {/* Show simulation complete feedback when scenario is done */}
          {progress.completed && currentNode?.feedback ? (
            <SimulationFeedback
              title={currentNode.feedback.title}
              description={currentNode.feedback.description}
              whatToDoNext={currentNode.feedback.whatToDoNext}
              safetyRating={currentNode.safetyRating || 'safe'}
              safetyScore={progress.safetyScore}
              onRestart={handleResetScenario}
            />
          ) : (
            <>
              {/* Messages - only render what's needed */}
              <div className="space-y-3">
                {allMessages.slice(-20).map((message) => ( // Only show last 20 messages for performance
                  <MessageBubble 
                    key={message.id} 
                    message={message} 
                    showRedFlags={showRedFlags}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Response options */}
              {currentNode?.responseOptions && !progress.completed && (
                <div className="mt-4 pt-2">
                  <div className="text-sm text-gray-500 mb-2">Choose your response:</div>
                  <ResponseOptions
                    options={currentNode.responseOptions}
                    onSelect={handleResponseSelect}
                    disabled={isLoading}
                  />
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Bottom bar with show red flags button - simplified */}
        <div className="p-3 border-t border-gray-200 flex justify-between bg-[#f5f5f7]">
          {progress.completed ? (
            <div className="text-xs text-gray-500">
              Scenario completed. You can try again or choose another scenario.
            </div>
          ) : (
            <>
              <div className="text-sm text-gray-600">
                ScamShield Simulation
              </div>
              <Button
                variant="outline"
                size="sm"
                className={`text-xs ${showRedFlags ? 'bg-red-50 text-red-600' : ''}`}
                onClick={() => setShowRedFlags(!showRedFlags)}
                type="button"
              >
                {showRedFlags ? 'Hide Red Flags' : 'Show Red Flags'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}