'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { SafetyRating } from '@/types/simulation';
import Link from 'next/link';

interface SimulationFeedbackProps {
  title: string;
  description: string;
  whatToDoNext?: string;
  safetyRating: SafetyRating;
  safetyScore?: number;
  onRestart: () => void;
}

export function SimulationFeedback({
  title,
  description,
  whatToDoNext,
  safetyRating,
  safetyScore,
  onRestart
}: SimulationFeedbackProps) {
  // Get color and icon based on safety rating
  const getSafetyColor = (): string => {
    switch (safetyRating) {
      case 'safe':
        return 'bg-success/10 border-success text-success';
      case 'partially_safe':
        return 'bg-warning/10 border-warning text-warning';
      case 'risky':
        return 'bg-orange-500/10 border-orange-500 text-orange-500';
      case 'dangerous':
        return 'bg-danger/10 border-danger text-danger';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };
  
  const getSafetyText = (): string => {
    switch (safetyRating) {
      case 'safe':
        return 'Safe Response';
      case 'partially_safe':
        return 'Partially Safe Response';
      case 'risky':
        return 'Risky Response';
      case 'dangerous':
        return 'Dangerous Response';
      default:
        return 'Response Evaluation';
    }
  };
  
  const getSafetyIcon = (): React.ReactNode => {
    switch (safetyRating) {
      case 'safe':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'partially_safe':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'risky':
      case 'dangerous':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className="border-2">
      <CardHeader className={`flex flex-row items-center gap-2 ${getSafetyColor()} rounded-t-lg`}>
        <div>
          {getSafetyIcon()}
        </div>
        <div>
          <CardTitle>{getSafetyText()}</CardTitle>
          <CardDescription className={safetyRating === 'dangerous' ? 'text-danger/70' : ''}>
            {title}
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-4">
          <p>{description}</p>
          
          {whatToDoNext && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-800 mb-1">What to do next:</h4>
              <p className="text-blue-700">{whatToDoNext}</p>
            </div>
          )}
          
          {typeof safetyScore === 'number' && (
            <div className="mt-4">
              <h4 className="font-medium mb-1">Safety Score:</h4>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary"
                  style={{ width: `${safetyScore}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{safetyScore}% safe choices</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between gap-4 pt-2">
        <Button 
          variant="outline" 
          onClick={onRestart}
        >
          Try Again
        </Button>
        
        <Link href="/simulate" className="flex-1">
          <Button 
            variant="default" 
            className="w-full"
          >
            More Scenarios
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}