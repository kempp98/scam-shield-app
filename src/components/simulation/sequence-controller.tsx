'use client';

import React from 'react';
import { useSequence } from './sequence-context';
import { ClientSimulation } from './client-simulation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function SequenceController() {
  const { 
    currentScenarioId,
    scenarioIds,
    currentSequenceIndex,
    totalScenariosInSequence,
    sequenceTitle,
    handleScenarioComplete,
    isLoading,
    error
  } = useSequence();
  
  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Handle error state
  if (error) {
    return (
      <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
        <h3 className="font-bold text-lg">Error</h3>
        <p>{error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }
  
  // If no current scenario, show placeholder or loading
  if (!currentScenarioId) {
    return (
      <div className="text-center py-8">
        <p>No scenarios available in this sequence.</p>
      </div>
    );
  }
  
  return (
    <div>
      {/* Sequence progress indicator */}
      <div className="mb-6">
        <Card className="bg-gray-50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{sequenceTitle}</h3>
                <p className="text-gray-500 text-sm">
                  Scenario {currentSequenceIndex + 1} of {totalScenariosInSequence}
                </p>
              </div>
              <div className="bg-gray-200 h-2 w-40 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full" 
                  style={{ 
                    width: `${((currentSequenceIndex) / totalScenariosInSequence) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Current scenario simulation */}
      <ClientSimulation 
        scenarioId={currentScenarioId} 
        onScenarioComplete={handleScenarioComplete}
        isInSequence={true}
      />
    </div>
  );
}