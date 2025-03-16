import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getScenarioById } from '@/lib/simulation';
import { ClientSimulation } from '@/components/simulation/client-simulation';

interface SimulateScenarioPageProps {
  params: {
    scenarioId: string;
  };
}

export async function generateMetadata({ params }: SimulateScenarioPageProps) {
  const scenario = await getScenarioById(params.scenarioId);
  
  if (!scenario) {
    return {
      title: 'Scenario Not Found - ScamShield',
      description: 'The requested simulation scenario could not be found.'
    };
  }
  
  return {
    title: `${scenario.title} - ScamShield Simulation`,
    description: scenario.description
  };
}

export default async function SimulateScenarioPage({ params }: SimulateScenarioPageProps) {
  const { scenarioId } = params;
  const scenario = await getScenarioById(scenarioId);
  
  if (!scenario) {
    notFound();
  }
  
  return (
    <div className="container-padded py-12">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold mb-2">{scenario.title}</h1>
          <p className="text-lg text-gray-600">{scenario.description}</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-8">
          <h2 className="text-md font-semibold text-blue-800 mb-1">Simulation Instructions</h2>
          <p className="text-blue-700">
            Interact with this text message conversation as if it were happening to you in real life. 
            Choose the responses you think would be safest and most appropriate. There may be multiple 
            safe approaches, and you can always try again to explore different outcomes.
          </p>
        </div>
        
        <ClientSimulation scenarioId={scenarioId} />
        
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>
            Remember: This is a safe simulation environment. In real life, never share personal information, 
            financial details, or click on suspicious links in text messages.
          </p>
        </div>
      </div>
    </div>
  );
}