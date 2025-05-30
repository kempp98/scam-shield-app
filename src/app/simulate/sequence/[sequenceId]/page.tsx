import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getSequenceById } from '@/lib/simulation-v2';
import { SequenceProvider } from '@/components/simulation/sequence-context';
import { SequenceSimulator } from '@/components/simulation/sequence-simulator';
import { CollapsibleInstructions } from '@/components/simulation/collapsible-instructions';

interface SequencePageProps {
  params: {
    sequenceId: string;
  };
}

export async function generateMetadata({ params }: SequencePageProps) {
    // Access the sequenceId directly without destructuring
    const sequenceId = params.sequenceId;
    const sequence = await getSequenceById(sequenceId);
    
    if (!sequence) {
      return {
        title: 'Sequence Not Found - ScamSafe',
        description: 'The requested simulation sequence could not be found.'
      };
    }
    
    return {
      title: `${sequence.title} - ScamSafe Simulation`,
      description: sequence.description
    };
  }

export default async function SequencePage({ params }: SequencePageProps) {
    // Access the sequenceId directly without destructuring
    const sequenceId = params.sequenceId;
    const sequence = await getSequenceById(sequenceId);
    
    if (!sequence) {
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
              Back to Simulations
            </Button>
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{sequence.title}</h1>
          <p className="text-lg text-gray-600">{sequence.description}</p>
        </div>
        
        <CollapsibleInstructions />
        
        <SequenceProvider sequenceId={sequenceId}>
          <SequenceSimulator />
        </SequenceProvider>
        
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