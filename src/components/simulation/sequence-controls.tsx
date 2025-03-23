'use client';

import React from 'react';
import { useSequence } from './sequence-context';
import { Button } from '@/components/ui/button';

export function SequenceControls() {
  const { 
    moveToNextScenario, 
    moveToPreviousScenario, 
    resetSequence,
    currentSequenceIndex,
    scenarioIds,
    isSequenceLoading: isLoading
  } = useSequence();

  return (
    <div className="flex gap-3">
      <Button 
        onClick={() => moveToPreviousScenario()} 
        disabled={currentSequenceIndex <= 0 || isLoading}
      >
        Previous Scenario
      </Button>
      
      <Button 
        onClick={() => moveToNextScenario()} 
        disabled={!scenarioIds || currentSequenceIndex >= scenarioIds.length - 1 || isLoading}
      >
        Next Scenario
      </Button>
      
      <Button 
        onClick={() => resetSequence()} 
        variant="outline"
        disabled={isLoading}
      >
        Reset Sequence
      </Button>
    </div>
  );
}