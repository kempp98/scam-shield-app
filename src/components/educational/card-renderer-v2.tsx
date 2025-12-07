'use client';

import React from 'react';
import { ContentSectionV2, InteractionResult, CardType } from '@/types/educationalV2';
import { BasicCard } from './card-types/basic-card';
import { MultipleChoiceCardV2 } from './card-types/multiple-choice-card-v2';
import { ExpandableCard } from './card-types/expandable-card';
import { DragDropCard } from './card-types/drag-drop-card';
// Future card types (Phase 3-5):
// import { HighlightRiskCard } from './card-types/highlight-risk-card';
// import { TimelineCard } from './card-types/timeline-card';
// import { ContentCard } from './card-types/content-card';
// import { HybridCard } from './card-types/hybrid-card';

// =============================================================================
// TYPES
// =============================================================================

interface CardRendererV2Props {
  /** Section data to render */
  section: ContentSectionV2;
  /** Maximum score for this section (used for scoring) */
  maxScore?: number;
  /** Callback when interaction is completed */
  onInteractionComplete?: (result: InteractionResult) => void;
  /** Additional CSS classes */
  className?: string;
}

// =============================================================================
// ADAPTER FOR LEGACY CARDS
// =============================================================================

/**
 * Adapts a V2 section to the legacy ContentSection format
 * for use with cards that haven't been upgraded yet.
 */
function adaptToLegacySection(section: ContentSectionV2): {
  id: string;
  title: string;
  body: string;
  cardType: string;
  interactionData?: Record<string, unknown>;
} {
  return {
    id: section.id,
    title: section.title,
    body: section.body || '',
    cardType: section.cardType,
    interactionData: section.interactionData as Record<string, unknown> | undefined,
  };
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function CardRendererV2({
  section,
  maxScore = 10,
  onInteractionComplete,
  className,
}: CardRendererV2Props) {
  // Map card type to component
  const cardType = section.cardType as CardType;

  switch (cardType) {
    // -------------------------------------------------------------------------
    // Enhanced Cards (V2)
    // -------------------------------------------------------------------------
    case 'multipleChoice':
      return (
        <MultipleChoiceCardV2
          section={section}
          maxScore={maxScore}
          onComplete={onInteractionComplete}
          className={className}
        />
      );

    // -------------------------------------------------------------------------
    // Legacy Cards (adapted for V2 section format)
    // -------------------------------------------------------------------------
    case 'content':
      // Use BasicCard for now, will be replaced by ContentCard in Phase 5
      return <BasicCard section={adaptToLegacySection(section)} />;

    case 'expandable':
      return (
        <ExpandableCard
          section={adaptToLegacySection(section)}
        />
      );

    case 'dragDrop':
      return (
        <DragDropCard
          section={adaptToLegacySection(section)}
          onComplete={(result) => {
            // Adapt legacy result to V2 format
            if (onInteractionComplete) {
              onInteractionComplete({
                sectionId: section.id,
                type: 'dragDrop',
                score: result.correct ? maxScore : Math.round(maxScore * 0.5),
                maxScore,
                passed: result.correct,
                timestamp: new Date().toISOString(),
                placements: result.matches || {},
                correctPlacements: result.correct ? Object.keys(result.matches || {}).length : 0,
                totalItems: Object.keys(result.matches || {}).length,
              });
            }
          }}
        />
      );

    // -------------------------------------------------------------------------
    // Placeholder Cards (coming in future phases)
    // -------------------------------------------------------------------------
    case 'highlightRisk':
      return (
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-700 font-medium">
            Highlight Risk Card - Coming in Phase 3
          </p>
          <p className="text-amber-600 text-sm mt-1">
            Section: {section.title}
          </p>
        </div>
      );

    case 'timeline':
      return (
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-700 font-medium">
            Timeline Card - Coming in Phase 4
          </p>
          <p className="text-amber-600 text-sm mt-1">
            Section: {section.title}
          </p>
        </div>
      );

    case 'hybrid':
      return (
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-700 font-medium">
            Hybrid Card - Coming in Phase 5
          </p>
          <p className="text-amber-600 text-sm mt-1">
            Section: {section.title}
          </p>
        </div>
      );

    // -------------------------------------------------------------------------
    // Default / Fallback
    // -------------------------------------------------------------------------
    default:
      // Fallback to BasicCard
      return <BasicCard section={adaptToLegacySection(section)} />;
  }
}

// =============================================================================
// UTILITY EXPORTS
// =============================================================================

/**
 * Check if a card type is interactive (requires user input)
 */
export function isInteractiveCardType(cardType: CardType): boolean {
  return ['multipleChoice', 'dragDrop', 'highlightRisk', 'timeline'].includes(cardType);
}

/**
 * Check if a card type is V2-ready (fully upgraded)
 */
export function isV2ReadyCardType(cardType: CardType): boolean {
  return ['multipleChoice'].includes(cardType);
}
