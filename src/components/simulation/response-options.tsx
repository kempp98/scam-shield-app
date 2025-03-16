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
    <div className="space-y-2">
      {options.map((option) => (
        <Button
          key={option.id}
          variant="outline"
          className="w-full text-left justify-start h-auto py-3 px-4 whitespace-normal rounded-2xl text-blue-600 border-blue-200 hover:bg-blue-50 shadow-sm transition-all hover:translate-y-[-1px]"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(option.id);
          }}
          disabled={disabled}
        >
          <div className="text-sm">{option.text}</div>
        </Button>
      ))}
    </div>
  );
}