// src/app/simulate/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { SequenceHub } from '@/components/simulation/sequence-hub';

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
        
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-10">
          <h2 className="text-lg font-semibold text-primary mb-2">How the Simulator Works</h2>
          <ul className="space-y-2 list-disc pl-5 text-gray-700">
            <li>You&apos;ll receive text messages in a realistic smartphone interface</li>
            <li>Choose how to respond from multiple options</li>
            <li>See the consequences of your choices play out</li>
            <li>Get feedback on what red flags to look for</li>
            <li>Learn the safest ways to handle suspicious messages</li>
          </ul>
        </div>
        
        <SequenceHub />
      </div>
    </div>
  );
}