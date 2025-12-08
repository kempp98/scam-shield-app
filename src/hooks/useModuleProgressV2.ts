'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ModuleProgressV2,
  SectionProgress,
  QuizProgress,
  EducationProgressData,
  ModuleProgressSummary,
  createEmptyModuleProgress,
  createEmptySectionProgress,
  PROGRESS_STORAGE_KEY,
} from '@/types/progress';
import { InteractionResult, ScoringConfig } from '@/types/educationalV2';
import {
  calculateModuleScore,
  hasPassed,
  calculateProgressPercentage,
  DEFAULT_SCORING_CONFIG,
} from '@/lib/scoring';

// =============================================================================
// TYPES
// =============================================================================

interface UseModuleProgressV2Return {
  /** All progress data */
  progressData: EducationProgressData;
  /** Loading state */
  isLoading: boolean;
  /** Get progress for a specific module */
  getModuleProgress: (moduleId: string) => ModuleProgressV2;
  /** Get summary for module list display */
  getModuleSummary: (moduleId: string, totalSections: number) => ModuleProgressSummary;
  /** Start a module (marks as in_progress) */
  startModule: (moduleId: string) => void;
  /** Record section interaction result */
  recordSectionResult: (
    moduleId: string,
    sectionId: string,
    result: InteractionResult,
    maxScore: number
  ) => void;
  /** Mark section as completed (for non-interactive sections) */
  markSectionCompleted: (moduleId: string, sectionId: string) => void;
  /** Record quiz result and calculate final score */
  recordQuizResult: (
    moduleId: string,
    quizProgress: QuizProgress,
    scoringConfig?: ScoringConfig
  ) => void;
  /** Complete module and award badge if passed */
  completeModule: (moduleId: string, scoringConfig?: ScoringConfig) => void;
  /** Retake a module (reset progress but keep badge) */
  retakeModule: (moduleId: string) => void;
  /** Reset all progress */
  resetAllProgress: () => void;
  /** Check if section is unlocked (for locked progression) */
  isSectionUnlocked: (moduleId: string, sectionIndex: number) => boolean;
}

// =============================================================================
// HOOK IMPLEMENTATION
// =============================================================================

export function useModuleProgressV2(): UseModuleProgressV2Return {
  const [progressData, setProgressData] = useState<EducationProgressData>({
    version: '2.0',
    modules: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  // ---------------------------------------------------------------------------
  // Load from localStorage on mount
  // ---------------------------------------------------------------------------
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as EducationProgressData;
        // Check version and migrate if needed
        if (parsed.version === '2.0') {
          setProgressData(parsed);
        } else {
          // Future: handle migration from older versions
          console.warn('Progress data version mismatch, starting fresh');
        }
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Save to localStorage on change
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressData));
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  }, [progressData, isLoading]);

  // ---------------------------------------------------------------------------
  // Helper to update progress data
  // ---------------------------------------------------------------------------
  const updateProgress = useCallback((
    updater: (prev: EducationProgressData) => EducationProgressData
  ) => {
    setProgressData(prev => updater(prev));
  }, []);

  // ---------------------------------------------------------------------------
  // Get module progress (creates empty if doesn't exist)
  // ---------------------------------------------------------------------------
  const getModuleProgress = useCallback((moduleId: string): ModuleProgressV2 => {
    return progressData.modules[moduleId] || createEmptyModuleProgress(moduleId);
  }, [progressData.modules]);

  // ---------------------------------------------------------------------------
  // Get module summary for list display
  // ---------------------------------------------------------------------------
  const getModuleSummary = useCallback((
    moduleId: string,
    totalSections: number
  ): ModuleProgressSummary => {
    const progress = getModuleProgress(moduleId);
    const sectionsCompleted = Object.values(progress.sections).filter(s => s.completed).length;

    return {
      moduleId,
      status: progress.status,
      percentComplete: calculateProgressPercentage(progress.sections, totalSections),
      sectionsCompleted,
      totalSections,
      percentageScore: progress.percentageScore,
      badgeEarned: progress.badgeEarned,
    };
  }, [getModuleProgress]);

  // ---------------------------------------------------------------------------
  // Start a module
  // ---------------------------------------------------------------------------
  const startModule = useCallback((moduleId: string) => {
    updateProgress(prev => {
      const existing = prev.modules[moduleId];
      const now = new Date().toISOString();

      return {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: existing
            ? {
                ...existing,
                status: 'in_progress',
                lastAccessedDate: now,
              }
            : {
                ...createEmptyModuleProgress(moduleId),
                status: 'in_progress',
                startedDate: now,
                lastAccessedDate: now,
              },
        },
      };
    });
  }, [updateProgress]);

  // ---------------------------------------------------------------------------
  // Record section interaction result
  // ---------------------------------------------------------------------------
  const recordSectionResult = useCallback((
    moduleId: string,
    sectionId: string,
    result: InteractionResult,
    maxScore: number
  ) => {
    updateProgress(prev => {
      const moduleData = prev.modules[moduleId] || createEmptyModuleProgress(moduleId);
      const existingSection = moduleData.sections[sectionId] || createEmptySectionProgress();
      const now = new Date().toISOString();

      // Keep best score
      const newScore = Math.max(existingSection.score, result.score);

      const updatedSection: SectionProgress = {
        attempted: true,
        completed: true,
        score: newScore,
        maxScore: maxScore,
        attempts: existingSection.attempts + 1,
        lastAttemptDate: now,
        lastInteractionResult: result,
      };

      const updatedSections = {
        ...moduleData.sections,
        [sectionId]: updatedSection,
      };

      // Recalculate cumulative scores
      const sectionScores = Object.values(updatedSections)
        .filter(s => s.maxScore > 0)
        .map(s => ({ score: s.score, maxScore: s.maxScore }));

      const cumulativeScore = sectionScores.reduce((sum, s) => sum + s.score, 0);
      const maxCumulativeScore = sectionScores.reduce((sum, s) => sum + s.maxScore, 0);

      return {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...moduleData,
            status: 'in_progress',
            sections: updatedSections,
            cumulativeScore,
            maxCumulativeScore,
            lastAccessedDate: now,
          },
        },
      };
    });
  }, [updateProgress]);

  // ---------------------------------------------------------------------------
  // Mark section as completed (for informational sections)
  // ---------------------------------------------------------------------------
  const markSectionCompleted = useCallback((moduleId: string, sectionId: string) => {
    updateProgress(prev => {
      const moduleData = prev.modules[moduleId] || createEmptyModuleProgress(moduleId);
      const existingSection = moduleData.sections[sectionId] || createEmptySectionProgress();
      const now = new Date().toISOString();

      return {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...moduleData,
            status: 'in_progress',
            sections: {
              ...moduleData.sections,
              [sectionId]: {
                ...existingSection,
                attempted: true,
                completed: true,
                lastAttemptDate: now,
              },
            },
            lastAccessedDate: now,
          },
        },
      };
    });
  }, [updateProgress]);

  // ---------------------------------------------------------------------------
  // Record quiz result
  // ---------------------------------------------------------------------------
  const recordQuizResult = useCallback((
    moduleId: string,
    quizProgress: QuizProgress,
    scoringConfig: ScoringConfig = DEFAULT_SCORING_CONFIG
  ) => {
    updateProgress(prev => {
      const moduleData = prev.modules[moduleId] || createEmptyModuleProgress(moduleId);
      const now = new Date().toISOString();

      // Calculate weighted score
      const sectionScores = Object.values(moduleData.sections)
        .filter(s => s.maxScore > 0)
        .map(s => ({ score: s.score, maxScore: s.maxScore }));

      const quizScore = {
        score: quizProgress.score,
        maxScore: quizProgress.maxScore,
      };

      const percentageScore = calculateModuleScore(sectionScores, quizScore, scoringConfig);

      return {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...moduleData,
            finalQuiz: quizProgress,
            percentageScore,
            lastAccessedDate: now,
          },
        },
      };
    });
  }, [updateProgress]);

  // ---------------------------------------------------------------------------
  // Complete module
  // ---------------------------------------------------------------------------
  const completeModule = useCallback((
    moduleId: string,
    scoringConfig: ScoringConfig = DEFAULT_SCORING_CONFIG
  ) => {
    updateProgress(prev => {
      const moduleData = prev.modules[moduleId];
      if (!moduleData) return prev;

      const now = new Date().toISOString();
      const passed = hasPassed(moduleData.percentageScore, scoringConfig);

      return {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...moduleData,
            status: 'completed',
            badgeEarned: passed || moduleData.badgeEarned, // Don't remove badge
            badgeEarnedDate: passed && !moduleData.badgeEarned ? now : moduleData.badgeEarnedDate,
            completedDate: now,
            lastAccessedDate: now,
          },
        },
      };
    });
  }, [updateProgress]);

  // ---------------------------------------------------------------------------
  // Retake module
  // ---------------------------------------------------------------------------
  const retakeModule = useCallback((moduleId: string) => {
    updateProgress(prev => {
      const existing = prev.modules[moduleId];
      const now = new Date().toISOString();

      return {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...createEmptyModuleProgress(moduleId),
            // Preserve badge and increment retake count
            badgeEarned: existing?.badgeEarned || false,
            badgeEarnedDate: existing?.badgeEarnedDate,
            retakeCount: (existing?.retakeCount || 0) + 1,
            startedDate: now,
            lastAccessedDate: now,
          },
        },
      };
    });
  }, [updateProgress]);

  // ---------------------------------------------------------------------------
  // Reset all progress
  // ---------------------------------------------------------------------------
  const resetAllProgress = useCallback(() => {
    setProgressData({
      version: '2.0',
      modules: {},
    });
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
  }, []);

  // ---------------------------------------------------------------------------
  // Check if section is unlocked
  // ---------------------------------------------------------------------------
  const isSectionUnlocked = useCallback((
    moduleId: string,
    sectionIndex: number
  ): boolean => {
    // First section is always unlocked
    if (sectionIndex === 0) return true;

    const moduleData = progressData.modules[moduleId];
    if (!moduleData) return false;

    // For now, allow if the module is in progress
    // More strict checking can be added based on section IDs
    return moduleData.status === 'in_progress' || moduleData.status === 'completed';
  }, [progressData.modules]);

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------
  return {
    progressData,
    isLoading,
    getModuleProgress,
    getModuleSummary,
    startModule,
    recordSectionResult,
    markSectionCompleted,
    recordQuizResult,
    completeModule,
    retakeModule,
    resetAllProgress,
    isSectionUnlocked,
  };
}
