'use client';

import React from 'react';
import { useEmailSimulation } from './email-simulation-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function EmailQuestions() {
  const {
    currentScenario,
    inboxState,
    goToStep,
    completeIdentification,
    completeAction,
    identificationCorrect,
    actionCorrect,
    safetyImpact,
    identificationFeedback,
    actionFeedback,
    resetScenario
  } = useEmailSimulation();
  
  const { step } = inboxState;
  
  if (!currentScenario) {
    return null;
  }
  
  // Render the identification question
  const renderIdentificationQuestion = () => {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle>Is this email legitimate or a scam?</CardTitle>
          <CardDescription>
            Analyze the email carefully and make your determination.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-2">
          <div className="space-y-3">
            {currentScenario.identificationQuestion.options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full text-left justify-start h-auto p-4 whitespace-normal"
                onClick={() => completeIdentification(option.id)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // Render the action question
  const renderActionQuestion = () => {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className={cn(
          "border-b",
          identificationCorrect ? "bg-green-50" : "bg-red-50"
        )}>
          <CardTitle>{identificationCorrect ? "Correct!" : "Incorrect"}</CardTitle>
          <CardDescription className="text-base">
            {identificationFeedback}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-2">
          <h3 className="text-lg font-medium mb-4">What would be the safest response to this email?</h3>
          <div className="space-y-3">
            {currentScenario.actionQuestion.options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full text-left justify-start h-auto p-4 whitespace-normal"
                onClick={() => completeAction(option.id)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // Render the completion feedback
  const renderCompletionFeedback = () => {
    const getSafetyColor = (impact: number) => {
      if (impact >= 8) return "text-green-600";
      if (impact >= 4) return "text-green-500";
      if (impact >= 0) return "text-yellow-600";
      if (impact >= -5) return "text-orange-600";
      return "text-red-600";
    };
    
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className={cn(
          "border-b",
          actionCorrect ? "bg-green-50" : "bg-red-50"
        )}>
          <CardTitle>Simulation Complete</CardTitle>
          <CardDescription className="text-base">
            {actionFeedback}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Your Results</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Identification</p>
                  <p className={cn(
                    "text-2xl font-bold",
                    identificationCorrect ? "text-green-600" : "text-red-600"
                  )}>
                    {identificationCorrect ? "Correct" : "Incorrect"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Safety Impact</p>
                  <p className={cn(
                    "text-2xl font-bold",
                    safetyImpact !== null && getSafetyColor(safetyImpact)
                  )}>
                    {safetyImpact !== null && (
                      <>
                        {safetyImpact > 0 ? "+" : ""}{safetyImpact}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Key Learning Points:</h4>
              <ul className="list-disc pl-5 text-blue-700 space-y-1">
                {currentScenario.isScam ? (
                  <>
                    <li>Always check the sender&apos;s email address carefully</li>
                    <li>Be wary of urgent requests or threats</li>
                    <li>Verify independently through official channels</li>
                    <li>Never click suspicious links or attachments</li>
                  </>
                ) : (
                  <>
                    <li>Legitimate emails can still be verified through official channels</li>
                    <li>Notice the professional tone and lack of urgency</li>
                    <li>They don&apos;t request sensitive information via email</li>
                    <li>The sender domain matches the official company domain</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-4 pt-4">
          <Button 
            variant="outline" 
            onClick={resetScenario}
          >
            Try Again
          </Button>
          
          <Button 
            variant="default" 
            onClick={() => goToStep('inbox')}
          >
            Back to Inbox
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  // Determine which component to show based on the current step
  if (step === 'identification') {
    return renderIdentificationQuestion();
  } else if (step === 'action') {
    return renderActionQuestion();
  } else if (step === 'complete') {
    return renderCompletionFeedback();
  }
  
  return null;
}