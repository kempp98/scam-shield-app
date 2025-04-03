'use client';

import React from 'react';
import { EmailSimulationProvider } from './email-simulation-context';
import { EmailSimulator } from './email-simulator';

interface ClientEmailSimulatorProps {
  scenarioId: string;
}

export function ClientEmailSimulator({ scenarioId }: ClientEmailSimulatorProps) {
  return (
    <EmailSimulationProvider scenarioId={scenarioId}>
      <EmailSimulator scenarioId={scenarioId} />
    </EmailSimulationProvider>
  );
}