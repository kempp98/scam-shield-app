// src/app/simulate/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { SequenceHub } from '@/components/simulation/sequence-hub';
import { HowItWorks } from '@/components/simulation/how-it-works';

export const metadata: Metadata = {
  title: 'ScamSafe - Practice with Realistic Scam Simulations',
  description: 'Test your knowledge and practice identifying scams in our safe, realistic text message simulator',
};


export default function SimulatePage() {
  return (
    <div className="container-padded py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Scam Simulation Training</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl">
          Practice identifying and responding to text scams in our safe simulation environment.
          These realistic scenarios will help you apply what you&apos;ve learned without any real-world risk.
        </p>
        
        <HowItWorks />
        
        <SequenceHub />
      </div>
    </div>
  );
}