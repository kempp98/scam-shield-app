'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { RedFlag } from '@/lib/education';

interface RedFlagHighlightProps {
  redFlag: RedFlag;
}

export function RedFlagHighlight({ redFlag }: RedFlagHighlightProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="relative">
      <Badge 
        redFlag={true}
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {redFlag.text}
      </Badge>
      
      {isExpanded && (
        <div className="mt-2 p-3 bg-red-50 text-red-800 rounded-md border border-red-200 text-sm">
          {redFlag.explanation}
        </div>
      )}
    </div>
  );
}