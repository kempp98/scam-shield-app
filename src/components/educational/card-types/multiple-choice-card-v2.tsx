'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, X, Square, CheckSquare } from 'lucide-react';
import {
  ContentSectionV2,
  MultipleChoiceInteraction,
  MultipleChoiceResult,
} from '@/types/educationalV2';
import { scoreMultipleChoice } from '@/lib/scoring';
import {
  InteractionFeedback,
  CoachingPanel,
  getFeedbackType,
} from '../interaction-feedback';

// =============================================================================
// TYPES
// =============================================================================

interface MultipleChoiceCardV2Props {
  /** Section data containing the multiple choice interaction */
  section: ContentSectionV2;
  /** Maximum score for this interaction */
  maxScore?: number;
  /** Callback when interaction is completed */
  onComplete?: (result: MultipleChoiceResult) => void;
  /** Additional CSS classes */
  className?: string;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function MultipleChoiceCardV2({
  section,
  maxScore = 10,
  onComplete,
  className,
}: MultipleChoiceCardV2Props) {
  // Extract interaction data
  const interaction = section.interactionData as MultipleChoiceInteraction | undefined;

  // State - must be declared before any conditional returns
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<MultipleChoiceResult | null>(null);

  // Shuffle options if configured (only on initial render)
  // Must be called before any conditional returns
  const displayOptions = useMemo(() => {
    if (!interaction) return [];
    return interaction.shuffleOptions
      ? shuffleArray(interaction.options)
      : interaction.options;
  }, [interaction]);

  // Whether this is a multi-select question
  const isMultiSelect = interaction?.allowMultiple ?? false;

  // Early return for invalid data - after all hooks
  if (!interaction || interaction.type !== 'multipleChoice') {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <p className="text-red-500">Invalid interaction data for MultipleChoice card</p>
        </CardContent>
      </Card>
    );
  }

  // ---------------------------------------------------------------------------
  // Event Handlers
  // ---------------------------------------------------------------------------

  const handleOptionClick = (optionId: string) => {
    if (isSubmitted) return;

    setSelectedOptions(prev => {
      const next = new Set(prev);

      if (isMultiSelect) {
        // Toggle selection for multi-select
        if (next.has(optionId)) {
          next.delete(optionId);
        } else {
          next.add(optionId);
        }
      } else {
        // Single select - clear and set
        next.clear();
        next.add(optionId);
      }

      return next;
    });
  };

  const handleSubmit = () => {
    if (selectedOptions.size === 0) return;

    const selectedArray = Array.from(selectedOptions);
    const scoreResult = scoreMultipleChoice(selectedArray, interaction, maxScore);

    // Add section ID to result
    const fullResult: MultipleChoiceResult = {
      ...scoreResult,
      sectionId: section.id,
    };

    setResult(fullResult);
    setIsSubmitted(true);

    if (onComplete) {
      onComplete(fullResult);
    }
  };

  const handleRetry = () => {
    setSelectedOptions(new Set());
    setIsSubmitted(false);
    setResult(null);
  };

  // ---------------------------------------------------------------------------
  // Render Helpers
  // ---------------------------------------------------------------------------

  const getOptionClassName = (optionId: string, isCorrect: boolean) => {
    const isSelected = selectedOptions.has(optionId);
    const baseClass = cn(
      "relative flex items-center gap-3 p-4 border-2 rounded-lg text-left w-full transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
    );

    if (!isSubmitted) {
      return cn(
        baseClass,
        isSelected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      );
    }

    // After submission
    if (isSelected) {
      return cn(
        baseClass,
        isCorrect
          ? 'border-green-500 bg-green-50'
          : 'border-red-500 bg-red-50'
      );
    }

    if (isCorrect) {
      // Show correct answers that weren't selected
      return cn(baseClass, 'border-green-300 bg-green-50/50');
    }

    return cn(baseClass, 'border-gray-200 opacity-50');
  };

  const getCheckboxIcon = (optionId: string, isCorrect: boolean) => {
    const isSelected = selectedOptions.has(optionId);

    if (!isSubmitted) {
      if (isMultiSelect) {
        return isSelected ? (
          <CheckSquare className="w-5 h-5 text-primary" />
        ) : (
          <Square className="w-5 h-5 text-gray-400" />
        );
      }
      // Radio button style for single select
      return (
        <span
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
            isSelected ? "border-primary bg-primary" : "border-gray-400"
          )}
        >
          {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
        </span>
      );
    }

    // After submission
    if (isSelected) {
      return isCorrect ? (
        <Check className="w-5 h-5 text-green-600" />
      ) : (
        <X className="w-5 h-5 text-red-600" />
      );
    }

    if (isCorrect) {
      return <Check className="w-5 h-5 text-green-500" />;
    }

    return <span className="w-5 h-5" />;
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // Get feedback configuration
  const feedbackType = result ? getFeedbackType(result.score, result.maxScore) : null;
  const coaching = section.coaching;

  // Get the selected option for feedback display
  const selectedOption = interaction.options.find(
    opt => selectedOptions.has(opt.id)
  );

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="pt-6 space-y-6">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900">
          {section.title}
        </h2>

        {/* Body text (if any) */}
        {section.body && (
          <p className="text-gray-600 leading-relaxed">{section.body}</p>
        )}

        {/* Question */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-medium text-gray-800 whitespace-pre-wrap">
            {interaction.question}
          </p>
          {isMultiSelect && (
            <p className="text-sm text-gray-500 mt-2">
              Select all that apply
            </p>
          )}
        </div>

        {/* Options */}
        <div
          className="space-y-3"
          role={isMultiSelect ? "group" : "radiogroup"}
          aria-label={interaction.question}
        >
          {displayOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              disabled={isSubmitted}
              className={getOptionClassName(option.id, option.isCorrect)}
              role={isMultiSelect ? "checkbox" : "radio"}
              aria-checked={selectedOptions.has(option.id)}
              aria-disabled={isSubmitted}
            >
              {getCheckboxIcon(option.id, option.isCorrect)}
              <span className="flex-1 text-gray-800">{option.text}</span>

              {/* Points indicator for partial credit */}
              {option.points !== undefined && option.points > 0 && !isSubmitted && (
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  +{option.points} pts
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Feedback after submission */}
        {isSubmitted && result && feedbackType && (
          <div className="space-y-4">
            {/* Main feedback */}
            <InteractionFeedback
              type={feedbackType}
              message={
                feedbackType === 'success'
                  ? 'Excellent!'
                  : feedbackType === 'partial'
                  ? 'Good try!'
                  : "Let's review"
              }
              details={
                selectedOption?.feedback ||
                (feedbackType === 'incorrect'
                  ? 'Review the correct answer above.'
                  : undefined)
              }
              score={result.score}
              maxScore={result.maxScore}
              showRetry={feedbackType !== 'success'}
              onRetry={handleRetry}
            />

            {/* Coaching panel */}
            {coaching && (
              <CoachingPanel
                message={
                  feedbackType === 'success'
                    ? coaching.onSuccess
                    : feedbackType === 'partial'
                    ? coaching.onPartialSuccess || coaching.onFailure
                    : coaching.onFailure
                }
                hints={coaching.hints}
              />
            )}
          </div>
        )}

        {/* Submit button */}
        {!isSubmitted && (
          <Button
            onClick={handleSubmit}
            disabled={selectedOptions.size === 0}
            className="w-full"
            size="lg"
          >
            {isMultiSelect ? 'Check Answers' : 'Submit Answer'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
