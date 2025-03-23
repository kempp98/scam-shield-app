'use client';

import { useState } from 'react';

export function HowItWorks() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="mb-10">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center w-full text-left px-4 py-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors"
      >
        <span className="flex-1 font-semibold text-primary">How the Simulator Works</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 text-primary transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="mt-2 p-6 bg-white border border-primary/20 rounded-lg animate-slideDown">
          <ul className="space-y-3 list-none">
            <li className="flex items-start">
              <svg className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>You&apos;ll receive text messages in a realistic smartphone interface</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Choose how to respond from multiple options and see the consequences of your choices</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Learn the red flags to look for and the safest ways to handle suspicious messages</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}