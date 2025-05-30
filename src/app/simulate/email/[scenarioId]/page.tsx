import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { mockEmailScenarios } from '@/data/simulation/email-scenarios';
import { ClientEmailSimulator } from '@/components/simulation/client-email-simulator';

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
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Email Simulation: {scenario.sender.name}</h1>
          <p className="text-lg text-gray-600">
            Practice identifying and responding to {scenario.isScam ? 'scam' : 'legitimate'} emails safely.
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-8">
          <h2 className="text-md font-semibold text-blue-800 mb-1">Simulation Instructions</h2>
          <p className="text-blue-700">
            In this simulation, you will interact with an email interface. Your goal is to:
            <br />
            1. Determine whether the email is legitimate or a scam
            <br />
            2. Choose the appropriate response action to take
            <br />
            Take your time to analyze the email carefully before making your decisions.
          </p>
        </div>
        
        <ClientEmailSimulator scenarioId={scenarioId} />
        
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>
            Remember: This is a safe simulation environment. In real life, be cautious 
            with emails from unknown senders and never share sensitive information through email.
          </p>
        </div>
      </div>
    </div>
  );
}