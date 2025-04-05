import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { mockEmailScenarios } from '@/data/simulation/email-scenarios';
import { ClientEmailSimulator } from '@/components/simulation/client-email-simulator';
import { CollapsibleInstructions } from '@/components/simulation/collapsible-instructions';

interface EmailSimulationPageProps {
  params: {
    scenarioId: string;
  };
}

export async function generateMetadata({ params }: EmailSimulationPageProps) {
  const { scenarioId } = params;
  const scenario = mockEmailScenarios.find(s => s.id === scenarioId);
  
  if (!scenario) {
    return {
      title: 'Email Scenario Not Found - ScamSafe',
      description: 'The requested email simulation scenario could not be found.'
    };
  }
  
  return {
    title: `${scenario.sender.name} - Email Simulation - ScamSafe`,
    description: scenario.isScam 
      ? 'Practice identifying and safely responding to email scams' 
      : 'Practice identifying and safely responding to legitimate emails'
  };
}

export default function EmailSimulationPage({ params }: EmailSimulationPageProps) {
  const { scenarioId } = params;
  
  // Using mock data for now
  const scenario = mockEmailScenarios.find(s => s.id === scenarioId);
  
  if (!scenario) {
    notFound();
  }
  
  return (
    <div className="container-padded py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center gap-2">
          <Link href="/simulate">
            <Button variant="ghost" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Scenarios
            </Button>
          </Link>
        </div>
        
        <CollapsibleInstructions />
        
        <ClientEmailSimulator scenarioId={scenarioId} />

      </div>
    </div>
  );
}