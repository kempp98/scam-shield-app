'use client';

import React from 'react';
import { CheckCircle, AlertCircle, Info, Trophy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export type FeedbackType = 'success' | 'partial' | 'incorrect' | 'info';

export interface InteractionFeedbackProps {
  /** Type of feedback to display */
  type: FeedbackType;
  /** Main feedback message */
  message: string;
  /** Optional additional details or explanation */
  details?: string;
  /** Score earned (optional) */
  score?: number;
  /** Maximum possible score (optional) */
  maxScore?: number;
  /** Show retry button */
  showRetry?: boolean;
  /** Callback when retry is clicked */
  onRetry?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the score with animation */
  animateScore?: boolean;
}

// =============================================================================
// FEEDBACK CONFIGURATION
// =============================================================================

const feedbackConfig: Record<FeedbackType, {
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
}> = {
  success: {
    icon: <CheckCircle className="w-6 h-6" />,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    iconColor: 'text-green-500',
  },
  partial: {
    icon: <AlertCircle className="w-6 h-6" />,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    iconColor: 'text-amber-500',
  },
  incorrect: {
    icon: <Info className="w-6 h-6" />,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-800',
    iconColor: 'text-red-500',
  },
  info: {
    icon: <Info className="w-6 h-6" />,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-500',
  },
};

// =============================================================================
// SCORE DISPLAY COMPONENT
// =============================================================================

interface ScoreDisplayProps {
  score: number;
  maxScore: number;
  animate?: boolean;
}

function ScoreDisplay({ score, maxScore, animate }: ScoreDisplayProps) {
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 text-sm font-medium",
      animate && "animate-in fade-in zoom-in duration-300"
    )}>
      <Trophy className="w-4 h-4" />
      <span>
        {score}/{maxScore}
        <span className="text-gray-500 ml-1">({percentage}%)</span>
      </span>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function InteractionFeedback({
  type,
  message,
  details,
  score,
  maxScore,
  showRetry = false,
  onRetry,
  className,
  animateScore = true,
}: InteractionFeedbackProps) {
  const config = feedbackConfig[type];

  return (
    <div
      className={cn(
        "rounded-lg border p-4 animate-in slide-in-from-bottom-2 duration-300",
        config.bgColor,
        config.borderColor,
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Header: Icon, Message, and Score */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className={cn("flex-shrink-0 mt-0.5", config.iconColor)}>
            {config.icon}
          </span>
          <div className="space-y-1">
            <p className={cn("font-medium", config.textColor)}>
              {message}
            </p>
            {details && (
              <p className={cn("text-sm opacity-80", config.textColor)}>
                {details}
              </p>
            )}
          </div>
        </div>

        {score !== undefined && maxScore !== undefined && (
          <ScoreDisplay
            score={score}
            maxScore={maxScore}
            animate={animateScore}
          />
        )}
      </div>

      {/* Retry Button */}
      {showRetry && onRetry && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// COACHING PANEL COMPONENT
// =============================================================================

export interface CoachingPanelProps {
  /** Title of the coaching tip */
  title?: string;
  /** Main coaching message */
  message: string;
  /** Optional hints (collapsible) */
  hints?: string[];
  /** Whether hints are initially visible */
  hintsVisible?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function CoachingPanel({
  title = "Coach's Tip",
  message,
  hints,
  hintsVisible = false,
  className,
}: CoachingPanelProps) {
  const [showHints, setShowHints] = React.useState(hintsVisible);

  return (
    <div
      className={cn(
        "rounded-lg border border-blue-100 bg-blue-50/50 p-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-blue-500 flex-shrink-0 mt-0.5">
          <Info className="w-5 h-5" />
        </span>
        <div className="space-y-2 flex-1">
          <p className="font-medium text-blue-900">{title}</p>
          <p className="text-sm text-blue-800">{message}</p>

          {hints && hints.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline"
              >
                {showHints ? 'Hide hints' : `Show ${hints.length} hint${hints.length > 1 ? 's' : ''}`}
              </button>

              {showHints && (
                <ul className="mt-2 space-y-1 text-sm text-blue-700 list-disc list-inside animate-in slide-in-from-top-1 duration-200">
                  {hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// HELPER FUNCTION
// =============================================================================

/**
 * Get the appropriate feedback type based on score
 */
export function getFeedbackType(score: number, maxScore: number): FeedbackType {
  if (maxScore === 0) return 'info';

  const percentage = (score / maxScore) * 100;

  if (percentage >= 90) return 'success';
  if (percentage >= 50) return 'partial';
  return 'incorrect';
}

/**
 * Get a default message based on feedback type
 */
export function getDefaultMessage(type: FeedbackType): string {
  switch (type) {
    case 'success':
      return 'Great job!';
    case 'partial':
      return 'Good try!';
    case 'incorrect':
      return "Let's review";
    case 'info':
      return 'Good to know';
  }
}
