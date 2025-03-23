'use client';

import React from 'react';
import { SequenceProvider } from '@/components/simulation/sequence-context';
import { SequenceSimulator } from '@/components/simulation/sequence-simulator';

interface ClientSequenceProps {
  sequenceId: string;
}

export function ClientSequence({ sequenceId }: ClientSequenceProps) {
  return (
    <SequenceProvider sequenceId={sequenceId}>
      <SequenceSimulator />
    </SequenceProvider>
  );
}