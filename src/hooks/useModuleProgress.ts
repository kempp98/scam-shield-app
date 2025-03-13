'use client';

import { useState, useEffect } from 'react';

export interface ModuleProgress {
  completed: boolean;
  inProgress: boolean;
  completedSections: string[];
  percentComplete: number;
  lastUpdated: string;
}

export type ProgressRecord = Record<string, ModuleProgress>;

const LOCAL_STORAGE_KEY = 'scamshield-module-progress';

export function useModuleProgress() {
  const [progress, setProgress] = useState<ProgressRecord>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading module progress:', error);
      setIsLoading(false);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading && Object.keys(progress).length > 0) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error('Error saving module progress:', error);
      }
    }
  }, [progress, isLoading]);

  // Initialize progress for a module if it doesn't exist
  const initializeModule = (moduleId: string) => {
    if (!progress[moduleId]) {
      setProgress(prev => ({
        ...prev,
        [moduleId]: {
          completed: false,
          inProgress: false,
          completedSections: [],
          percentComplete: 0,
          lastUpdated: new Date().toISOString()
        }
      }));
    }
  };

  // Update progress for a module
  const updateModuleProgress = (
    moduleId: string, 
    updates: Partial<ModuleProgress>,
    totalSections?: number
  ) => {
    setProgress(prev => {
      // Initialize if needed
      const currentProgress = prev[moduleId] || {
        completed: false,
        inProgress: false,
        completedSections: [],
        percentComplete: 0,
        lastUpdated: new Date().toISOString()
      };
      
      // Calculate percent complete if total sections is provided
      let percentComplete = currentProgress.percentComplete;
      if (totalSections && updates.completedSections) {
        percentComplete = Math.round((updates.completedSections.length / totalSections) * 100);
      }
      
      // Create updated progress
      const updatedProgress = {
        ...currentProgress,
        ...updates,
        percentComplete: updates.percentComplete !== undefined ? updates.percentComplete : percentComplete,
        lastUpdated: new Date().toISOString()
      };
      
      return {
        ...prev,
        [moduleId]: updatedProgress
      };
    });
  };

  // Mark a section as completed
  const completeSection = (moduleId: string, sectionId: string, totalSections: number) => {
    setProgress(prev => {
      const currentProgress = prev[moduleId] || {
        completed: false,
        inProgress: true,
        completedSections: [],
        percentComplete: 0,
        lastUpdated: new Date().toISOString()
      };
      
      // Add section to completed sections if not already there
      const completedSections = [...currentProgress.completedSections];
      if (!completedSections.includes(sectionId)) {
        completedSections.push(sectionId);
      }
      
      // Calculate percent complete
      const percentComplete = Math.round((completedSections.length / totalSections) * 100);
      
      // Check if all sections are completed
      const allCompleted = completedSections.length === totalSections;
      
      return {
        ...prev,
        [moduleId]: {
          ...currentProgress,
          inProgress: !allCompleted,
          completed: allCompleted,
          completedSections,
          percentComplete,
          lastUpdated: new Date().toISOString()
        }
      };
    });
  };

  // Mark a module as started
  const startModule = (moduleId: string) => {
    updateModuleProgress(moduleId, { inProgress: true });
  };

  // Mark a module as completed
  const completeModule = (moduleId: string) => {
    updateModuleProgress(moduleId, { completed: true, inProgress: false, percentComplete: 100 });
  };

  // Reset progress for a module
  const resetModuleProgress = (moduleId: string) => {
    updateModuleProgress(moduleId, {
      completed: false,
      inProgress: false,
      completedSections: [],
      percentComplete: 0
    });
  };

  // Reset all progress
  const resetAllProgress = () => {
    setProgress({});
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return {
    progress,
    isLoading,
    initializeModule,
    updateModuleProgress,
    completeSection,
    startModule,
    completeModule,
    resetModuleProgress,
    resetAllProgress
  };
}