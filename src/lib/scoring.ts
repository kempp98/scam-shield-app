/**
 * Scoring Engine for Educational Module V2
 *
 * Handles all score calculations with 70/30 weighting:
 * - 70% weight for module section interactions
 * - 30% weight for final quiz
 */

import {
  ScoringConfig,
  MultipleChoiceInteraction,
  DragDropInteraction,
  HighlightRiskInteraction,
  TimelineInteraction,
  MultipleChoiceResult,
  DragDropResult,
  HighlightRiskResult,
  TimelineResult,
  ExpandableResult,
} from '@/types/educationalV2';
import { SectionProgress, QuizProgress } from '@/types/progress';

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

export const DEFAULT_SCORING_CONFIG: ScoringConfig = {
  passingScore: 70,
  moduleWeight: 70,
  quizWeight: 30,
};

// =============================================================================
// SCORE CALCULATION FUNCTIONS
// =============================================================================

/**
 * Calculate weighted module score combining section scores and quiz score
 */
export function calculateModuleScore(
  sectionScores: { score: number; maxScore: number }[],
  quizScore: { score: number; maxScore: number } | undefined,
  config: ScoringConfig = DEFAULT_SCORING_CONFIG
): number {
  // Calculate section percentage
  const totalSectionScore = sectionScores.reduce((sum, s) => sum + s.score, 0);
  const totalSectionMax = sectionScores.reduce((sum, s) => sum + s.maxScore, 0);
  const sectionPercentage = totalSectionMax > 0 ? (totalSectionScore / totalSectionMax) * 100 : 0;

  // Calculate quiz percentage
  const quizPercentage = quizScore && quizScore.maxScore > 0
    ? (quizScore.score / quizScore.maxScore) * 100
    : 0;

  // Apply weights (70% module, 30% quiz by default)
  const weightedScore =
    (sectionPercentage * config.moduleWeight / 100) +
    (quizPercentage * config.quizWeight / 100);

  return Math.round(weightedScore);
}

/**
 * Check if user has passed the module
 */
export function hasPassed(
  percentageScore: number,
  config: ScoringConfig = DEFAULT_SCORING_CONFIG
): boolean {
  return percentageScore >= config.passingScore;
}

/**
 * Calculate progress percentage through module sections
 */
export function calculateProgressPercentage(
  sectionsProgress: Record<string, SectionProgress>,
  totalSections: number
): number {
  if (totalSections === 0) return 0;

  const completedCount = Object.values(sectionsProgress).filter(s => s.completed).length;
  return Math.round((completedCount / totalSections) * 100);
}

// =============================================================================
// MULTIPLE CHOICE SCORING
// =============================================================================

/**
 * Score a multiple choice interaction
 */
export function scoreMultipleChoice(
  selectedOptionIds: string[],
  interaction: MultipleChoiceInteraction,
  maxScore: number
): MultipleChoiceResult {
  const correctOptionIds = interaction.options
    .filter(opt => opt.isCorrect)
    .map(opt => opt.id);

  if (interaction.allowMultiple) {
    // For "select all that apply": calculate partial credit
    const correctSelected = selectedOptionIds.filter(id => correctOptionIds.includes(id)).length;
    const incorrectSelected = selectedOptionIds.filter(id => !correctOptionIds.includes(id)).length;
    const totalCorrect = correctOptionIds.length;

    // Points = (correct selected / total correct) - penalty for wrong selections
    const baseScore = totalCorrect > 0 ? correctSelected / totalCorrect : 0;
    const penalty = incorrectSelected * 0.25; // 25% penalty per wrong answer
    const adjustedScore = Math.max(0, baseScore - penalty);
    const score = Math.round(adjustedScore * maxScore);

    return {
      sectionId: '',
      type: 'multipleChoice',
      score,
      maxScore,
      passed: score >= maxScore * 0.7,
      timestamp: new Date().toISOString(),
      selectedOptionIds,
      correctOptionIds,
    };
  } else {
    // Single select: all or nothing
    const isCorrect = selectedOptionIds.length === 1 && correctOptionIds.includes(selectedOptionIds[0]);

    // Check for partial points on the selected option
    const selectedOption = interaction.options.find(opt => opt.id === selectedOptionIds[0]);
    const score = isCorrect ? maxScore : (selectedOption?.points ?? 0);

    return {
      sectionId: '',
      type: 'multipleChoice',
      score,
      maxScore,
      passed: isCorrect,
      timestamp: new Date().toISOString(),
      selectedOptionIds,
      correctOptionIds,
    };
  }
}

// =============================================================================
// DRAG AND DROP SCORING
// =============================================================================

/**
 * Score a drag and drop interaction
 */
export function scoreDragDrop(
  placements: Record<string, string>, // itemId -> zoneId
  interaction: DragDropInteraction,
  maxScore: number
): DragDropResult {
  let correctPlacements = 0;
  const totalItems = interaction.dragItems.length;

  for (const item of interaction.dragItems) {
    const placedZoneId = placements[item.id];
    const correctZone = interaction.dropZones.find(z => z.acceptsCategory === item.category);

    if (correctZone && placedZoneId === correctZone.id) {
      correctPlacements++;
    }
  }

  const score = totalItems > 0
    ? Math.round((correctPlacements / totalItems) * maxScore)
    : 0;

  return {
    sectionId: '',
    type: 'dragDrop',
    score,
    maxScore,
    passed: correctPlacements === totalItems,
    timestamp: new Date().toISOString(),
    placements,
    correctPlacements,
    totalItems,
  };
}

// =============================================================================
// HIGHLIGHT RISK SCORING
// =============================================================================

/**
 * Score a highlight the risk interaction
 */
export function scoreHighlightRisk(
  foundRiskIds: string[],
  interaction: HighlightRiskInteraction,
  maxScore: number
): HighlightRiskResult {
  const allRiskIds = interaction.risks.map(r => r.id);
  const totalRisks = allRiskIds.length;

  const validFoundRisks = foundRiskIds.filter(id => allRiskIds.includes(id));
  const missedRiskIds = allRiskIds.filter(id => !foundRiskIds.includes(id));

  const score = totalRisks > 0
    ? Math.round((validFoundRisks.length / totalRisks) * maxScore)
    : 0;

  const passed = validFoundRisks.length >= interaction.minRequiredRisks;

  return {
    sectionId: '',
    type: 'highlightRisk',
    score,
    maxScore,
    passed,
    timestamp: new Date().toISOString(),
    foundRiskIds: validFoundRisks,
    missedRiskIds,
    totalRisks,
  };
}

// =============================================================================
// TIMELINE SCORING
// =============================================================================

/**
 * Score a timeline interaction
 */
export function scoreTimeline(
  placements: Record<string, string>, // eventId -> stageId
  interaction: TimelineInteraction,
  maxScore: number
): TimelineResult {
  let correctPlacements = 0;
  const totalEvents = interaction.events.length;

  for (const event of interaction.events) {
    if (placements[event.id] === event.correctStageId) {
      correctPlacements++;
    }
  }

  const score = totalEvents > 0
    ? Math.round((correctPlacements / totalEvents) * maxScore)
    : 0;

  return {
    sectionId: '',
    type: 'timeline',
    score,
    maxScore,
    passed: correctPlacements === totalEvents,
    timestamp: new Date().toISOString(),
    placements,
    correctPlacements,
    totalEvents,
  };
}

// =============================================================================
// EXPANDABLE SCORING
// =============================================================================

/**
 * Score an expandable interaction (completion-based, not score-based)
 */
export function scoreExpandable(
  expandedItemIds: string[],
  totalItems: number,
  trackExpansions: boolean,
  maxScore: number
): ExpandableResult {
  const allExpanded = expandedItemIds.length >= totalItems;

  // If tracking expansions, require all items to be expanded for full score
  const score = trackExpansions
    ? (allExpanded ? maxScore : 0)
    : maxScore; // If not tracking, always give full score

  return {
    sectionId: '',
    type: 'expandable',
    score,
    maxScore,
    passed: !trackExpansions || allExpanded,
    timestamp: new Date().toISOString(),
    expandedItemIds,
    allExpanded,
  };
}

// =============================================================================
// QUIZ SCORING
// =============================================================================

/**
 * Score the final quiz
 */
export function scoreQuiz(
  answers: Record<string, string>, // questionId -> optionId
  questions: { id: string; options: { id: string; isCorrect: boolean }[] }[]
): QuizProgress {
  let correctCount = 0;

  for (const question of questions) {
    const selectedOptionId = answers[question.id];
    const correctOption = question.options.find(opt => opt.isCorrect);

    if (correctOption && selectedOptionId === correctOption.id) {
      correctCount++;
    }
  }

  const maxScore = questions.length;
  const score = correctCount;
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return {
    attempted: true,
    completed: true,
    score: percentage,
    maxScore: 100,
    answers,
    attemptDate: new Date().toISOString(),
  };
}

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

export type PerformanceLevel = 'excellent' | 'good' | 'needs_improvement' | 'poor';

/**
 * Get performance level based on percentage score
 */
export function getPerformanceLevel(percentageScore: number): PerformanceLevel {
  if (percentageScore >= 90) return 'excellent';
  if (percentageScore >= 70) return 'good';
  if (percentageScore >= 50) return 'needs_improvement';
  return 'poor';
}

/**
 * Get feedback message based on performance
 */
export function getPerformanceFeedback(level: PerformanceLevel): string {
  switch (level) {
    case 'excellent':
      return 'Excellent work! You have a strong understanding of this material.';
    case 'good':
      return 'Good job! You\'re on the right track.';
    case 'needs_improvement':
      return 'Keep practicing! Review the material and try again.';
    case 'poor':
      return 'Don\'t give up! Take your time to review the content carefully.';
  }
}

/**
 * Get coaching feedback type for interaction results
 */
export function getCoachingType(
  score: number,
  maxScore: number
): 'success' | 'partial' | 'failure' {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

  if (percentage >= 90) return 'success';
  if (percentage >= 50) return 'partial';
  return 'failure';
}
