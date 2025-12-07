/**
 * Progress Tracking Types for Educational Module V2
 *
 * Designed for localStorage with future Firebase migration in mind.
 * Structure mirrors Firestore document structure for easy migration.
 */

import { InteractionResult } from './educationalV2';

// =============================================================================
// SECTION PROGRESS
// =============================================================================

export interface SectionProgress {
  /** Has user interacted with this section */
  attempted: boolean;
  /** Has user met completion criteria */
  completed: boolean;
  /** Points earned (best score across attempts) */
  score: number;
  /** Maximum points possible */
  maxScore: number;
  /** Number of attempts */
  attempts: number;
  /** Timestamp of last attempt */
  lastAttemptDate: string;
  /** Detailed result from last interaction (optional, for analytics) */
  lastInteractionResult?: InteractionResult;
}

// =============================================================================
// QUIZ PROGRESS
// =============================================================================

export interface QuizProgress {
  /** Has user attempted the quiz */
  attempted: boolean;
  /** Has user completed the quiz */
  completed: boolean;
  /** Score as percentage (0-100) */
  score: number;
  /** Maximum possible score */
  maxScore: number;
  /** User's answers (questionId -> optionId) */
  answers: Record<string, string>;
  /** Timestamp of attempt */
  attemptDate: string;
}

// =============================================================================
// MODULE PROGRESS
// =============================================================================

export interface ModuleProgressV2 {
  /** Module identifier */
  moduleId: string;

  /** Overall module status */
  status: 'not_started' | 'in_progress' | 'completed';

  /** Progress for each section */
  sections: Record<string, SectionProgress>;

  /** Final quiz progress */
  finalQuiz?: QuizProgress;

  /** Total points earned across all sections */
  cumulativeScore: number;

  /** Total points possible across all sections */
  maxCumulativeScore: number;

  /** Overall percentage score (weighted: 70% module, 30% quiz) */
  percentageScore: number;

  /** Has user earned the badge for this module */
  badgeEarned: boolean;

  /** Timestamp when badge was earned */
  badgeEarnedDate?: string;

  /** When user first started this module */
  startedDate: string;

  /** Last time user accessed this module */
  lastAccessedDate: string;

  /** When user completed the module (if completed) */
  completedDate?: string;

  /** Number of times user has restarted this module */
  retakeCount: number;
}

// =============================================================================
// ROOT PROGRESS STORAGE
// =============================================================================

export interface EducationProgressData {
  /** Schema version for migration support */
  version: '2.0';

  /** Progress data keyed by module ID */
  modules: Record<string, ModuleProgressV2>;

  /** For future Firebase sync */
  lastSyncAttempt?: string;

  /** User ID when accounts are implemented */
  userId?: string;
}

// =============================================================================
// PROGRESS UPDATE PAYLOADS
// =============================================================================

export interface SectionProgressUpdate {
  attempted?: boolean;
  completed?: boolean;
  score?: number;
  maxScore?: number;
  lastInteractionResult?: InteractionResult;
}

export interface ModuleProgressUpdate {
  status?: 'not_started' | 'in_progress' | 'completed';
  cumulativeScore?: number;
  maxCumulativeScore?: number;
  percentageScore?: number;
  badgeEarned?: boolean;
  badgeEarnedDate?: string;
  completedDate?: string;
}

// =============================================================================
// HELPER TYPES
// =============================================================================

/** Progress summary for module list display */
export interface ModuleProgressSummary {
  moduleId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  percentComplete: number;
  sectionsCompleted: number;
  totalSections: number;
  percentageScore: number;
  badgeEarned: boolean;
}

/** Default empty progress for a new module */
export const createEmptyModuleProgress = (moduleId: string): ModuleProgressV2 => ({
  moduleId,
  status: 'not_started',
  sections: {},
  cumulativeScore: 0,
  maxCumulativeScore: 0,
  percentageScore: 0,
  badgeEarned: false,
  startedDate: new Date().toISOString(),
  lastAccessedDate: new Date().toISOString(),
  retakeCount: 0,
});

/** Default empty section progress */
export const createEmptySectionProgress = (): SectionProgress => ({
  attempted: false,
  completed: false,
  score: 0,
  maxScore: 0,
  attempts: 0,
  lastAttemptDate: new Date().toISOString(),
});

// =============================================================================
// LOCALSTORAGE KEY
// =============================================================================

export const PROGRESS_STORAGE_KEY = 'scamsafe-education-progress-v2';
