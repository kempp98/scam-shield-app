'use client';

import { useState } from 'react';

export function CollapsibleInstructions() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="mb-8">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center w-full text-left px-4 py-3 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
      >
        <span className="flex-1 font-semibold text-blue-800">Simulation Instructions</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 text-blue-600 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-md animate-slideDown">
          <p className="text-blue-700">
            In this simulation, you&apos;ll encounter several text message scenarios. For each one, you&apos;ll need to:
            <br /><br />
            1. Identify whether the message is legitimate or a scam
            <br />
            2. Choose the safest way to respond
            <br /><br />
            Complete all the scenarios to test your scam-detection skills!
          </p>
        </div>
      )}
    </div>
  );
}