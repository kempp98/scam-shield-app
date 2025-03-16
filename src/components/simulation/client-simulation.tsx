'use client';

import React from 'react';
import { SimulationProvider } from './simulation-context';
import { SmartphoneSimulator } from './smartphone-simulator';

export function ClientSimulation({ scenarioId }: { scenarioId: string }) {
  return (
    <SimulationProvider>
      <SmartphoneSimulator scenarioId={scenarioId} />
    </SimulationProvider>
  );
}