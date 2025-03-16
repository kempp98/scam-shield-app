'use client';

import React from 'react';
import { ResponseOption } from '@/types/simulation';
import { Button } from '@/components/ui/button';

interface ResponseOptionsProps {
  options: ResponseOption[];
  onSelect: (responseId: string) => void;
  disabled?: boolean;
}

export function ResponseOptions({ options, onSelect, disabled = false }: ResponseOptionsProps) {
  return (
    <div className="mt-4 space-y-3">
      <div className="text-sm text-gray-500 mb-1">Choose your response:</div>
      
      {options.map((option) => (
        <Button
          key={option.id}
          variant="outline"
          className="w-full text-left justify-start h-auto py-3 px-4 whitespace-normal"
          onClick={() => onSelect(option.id)}
          disabled={disabled}
        >
          {option.text}
        </Button>
      ))}
    </div>
  );
}