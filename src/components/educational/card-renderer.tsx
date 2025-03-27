// src/components/educational/CardRenderer.tsx
import React from 'react';
import { ContentSection } from '@/lib/education';
import { InteractionResult } from '@/types/interactions';
import { BasicCard } from './card-types/basic-card';
// import { RedFlagCard } from './card-types/RedFlagCard';
import { MultipleChoiceCard } from './card-types/multiple-choice-card';
import { ExpandableCard } from './card-types/expandable-card';
// import { ExampleCard } from './card-types/ExampleCard';
// import { StepByStepCard } from './card-types/StepByStepCard';
import { DragDropCard } from './card-types/drag-drop-card';
// import { FlashcardCard } from './card-types/FlashcardCard';
// import { ScenarioCard } from './card-types/ScenarioCard';

interface CardRendererProps {
    section: ContentSection;
    onInteractionComplete?: (result: InteractionResult) => void;
  }

  export function CardRenderer({ section, onInteractionComplete }: CardRendererProps) {
    // Render the appropriate card based on the section's cardType
    switch (section.cardType) {
      case 'basic':
        return <BasicCard section={section} />;
      case 'multipleChoice':
        return <MultipleChoiceCard 
                 section={section} 
                 onComplete={(result) => onInteractionComplete?.({
                   ...result,
                   type: 'multipleChoice'
                 })} 
               />;
      case 'expandable':
         return <ExpandableCard section={section} />;
      case 'dragDrop':
        return <DragDropCard 
                 section={section} 
                 onComplete={(result) => onInteractionComplete?.({
                   ...result,
                   type: 'dragDrop'
                 })} 
               />;
      default:
        // Fallback to basic card if type is not specified
        return <BasicCard section={section} />;
    }
  }