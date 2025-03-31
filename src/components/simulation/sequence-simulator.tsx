'use client';

import React, { useMemo } from 'react';
import { useSequence } from './sequence-context';
import { ScenarioSimulator } from './scenario-simulator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SequenceSimulator() {
  const {
    currentSequence,
    currentScenario,
    isLoading,
    error,
    completeCurrentScenario,
    moveToNextScenario,
    resetSequence,
    progress
  } = useSequence();
  
  // Calculate sequence results
  const results = useMemo(() => {
    if (!progress.completed) return null;
    
    const scenarios = Object.values(progress.completedScenarios);
    
    // Success rate
    const identificationCorrect = scenarios.filter(s => s.identificationCorrect).length;
    const actionCorrect = scenarios.filter(s => s.actionCorrect).length;
    const totalCorrect = scenarios.filter(s => s.identificationCorrect && s.actionCorrect).length;
    
    const identificationRate = Math.round((identificationCorrect / scenarios.length) * 100);
    const actionRate = Math.round((actionCorrect / scenarios.length) * 100);
    const successRate = Math.round((totalCorrect / scenarios.length) * 100);
    
    // Safety impact
    const totalSafetyImpact = Object.values(progress.completedScenarios)
      .reduce((sum, scenario) => sum + scenario.safetyImpact, 0);
    
    return {
      identificationRate,
      actionRate,
      successRate,
      totalSafetyImpact
    };
  }, [progress.completed, progress.completedScenarios]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
        <h3 className="font-bold text-lg">Error</h3>
        <p>{error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={resetSequence}
        >
          Try Again
        </Button>
      </div>
    );
  }
  
  if (!currentSequence || (!currentScenario && !progress.completed)) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No simulation sequence loaded</p>
          <Link href="/simulate">
            <Button variant="default">
              Browse Simulations
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  if (progress.completed && results) {
    return (
      <Card className="border-2">
        <CardHeader className="bg-primary/10 border-b border-primary/20">
          <CardTitle className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Sequence Complete!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Your Results</h3>
              <p className="mb-4">
                You completed the &quot;{currentSequence?.title || 'Scam Detection'}&quot;simulation sequence!
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Identification</p>
                  <p className="text-2xl font-bold">{results.identificationRate}%</p>
                  <p className="text-xs text-gray-500">correct</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Response</p>
                  <p className="text-2xl font-bold">{results.actionRate}%</p>
                  <p className="text-xs text-gray-500">correct</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Safety Impact</p>
                  <p className={`text-2xl font-bold ${results.totalSafetyImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {results.totalSafetyImpact > 0 ? '+' : ''}{results.totalSafetyImpact}
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-1">What you learned:</h4>
                <ul className="list-disc pl-5 text-blue-700 space-y-1">
                {currentSequence?.learningOutcomes ? (
                    // Use custom learning outcomes if available
                    currentSequence.learningOutcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))
                  ) : (
                    // Fallback to default learning outcomes if none provided
                    <>
                      <li>How to identify legitimate vs. scam messages</li>
                      <li>Safe ways to respond to suspicious texts</li>
                      <li>Common red flags in text message scams</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between gap-4 pt-2">
          <Button 
            variant="outline" 
            onClick={resetSequence}
          >
            Try Again
          </Button>
          
          <Link href="/simulate" className="flex-1">
            <Button 
              variant="default" 
              className="w-full"
            >
              More Simulations
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
  
  const scenarioNumber = progress.currentScenarioIndex + 1;
  const totalScenarios = progress.totalScenarios;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Scenario {scenarioNumber} of {totalScenarios}
        </div>
        <div className="h-2 bg-gray-200 rounded-full flex-1 max-w-xs mx-4">
          <div 
            className="h-full bg-primary rounded-full"
            style={{ width: `${(scenarioNumber / totalScenarios) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {currentScenario && (
        <ScenarioSimulator
          scenario={currentScenario}
          onComplete={completeCurrentScenario}
          onContinue={moveToNextScenario}
        />
      )}
    </div>
  );
}