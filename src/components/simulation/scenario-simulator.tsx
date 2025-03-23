'use client';

import React, { useState, useEffect } from 'react';
import { ScenarioData } from '@/types/simulation-v2';
import { SmartphoneSimulatorV2 } from './smartphone-simulator-v2';
import { Button } from '@/components/ui/button';

interface ScenarioSimulatorProps {
  scenario: ScenarioData;
  onComplete: (identificationCorrect: boolean, actionCorrect: boolean, safetyImpact: number) => void;
  onContinue?: () => void;
}

export function ScenarioSimulator({ scenario, onComplete, onContinue }: ScenarioSimulatorProps) {
  const [step, setStep] = useState<'identification' | 'action' | 'complete'>('identification');
  const [identificationSelectedId, setIdentificationSelectedId] = useState<string | null>(null);
  const [actionSelectedId, setActionSelectedId] = useState<string | null>(null);
  const [identificationCorrect, setIdentificationCorrect] = useState<boolean>(false);
  const [actionCorrect, setActionCorrect] = useState<boolean>(false);
  const [safetyImpact, setSafetyImpact] = useState<number>(0);
  const [identificationFeedback, setIdentificationFeedback] = useState<string>('');
  const [actionFeedback, setActionFeedback] = useState<string>('');
  
  // Handle identification selection
  const handleIdentificationSelect = (optionId: string) => {
    const option = scenario.identificationQuestion.options.find(opt => opt.id === optionId);
    if (!option) return;
    
    setIdentificationSelectedId(optionId);
    setIdentificationCorrect(option.isCorrect);
    setIdentificationFeedback(option.feedback);
    setStep('action');
  };
  
  // Handle action selection
  const handleActionSelect = (optionId: string) => {
    const option = scenario.actionQuestion.options.find(opt => opt.id === optionId);
    if (!option) return;
    
    setActionSelectedId(optionId);
    setActionCorrect(option.isCorrect);
    setSafetyImpact(option.safetyImpact);
    setActionFeedback(option.feedback);
    setStep('complete');
  };
  
  // When complete, notify parent
  useEffect(() => {
    if (step === 'complete') {
      onComplete(identificationCorrect, actionCorrect, safetyImpact);
    }
  }, [step, identificationCorrect, actionCorrect, safetyImpact, onComplete]);
  
  return (
    <div className="space-y-8">
      <SmartphoneSimulatorV2
        scenario={scenario}
        onIdentificationSelect={handleIdentificationSelect}
        onActionSelect={handleActionSelect}
        step={step}
        identificationFeedback={identificationFeedback}
        actionFeedback={actionFeedback}
      />
      
      {step === 'complete' && onContinue && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="default" 
            onClick={onContinue}
            className="px-8"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}