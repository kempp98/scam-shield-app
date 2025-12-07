'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { CardRendererV2 } from '@/components/educational/card-renderer-v2';
import { useModuleProgressV2 } from '@/hooks/useModuleProgressV2';
import { EducationalModuleV2, InteractionResult } from '@/types/educationalV2';

// Import test module data
import testModuleData from '@/data/educational/test-v2-module.json';

// Type assertion for the imported JSON
const testModule = testModuleData as unknown as EducationalModuleV2;

export default function TestV2Page() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const {
    isLoading,
    getModuleProgress,
    startModule,
    recordSectionResult,
    markSectionCompleted,
  } = useModuleProgressV2();

  const sections = testModule.content.sections;
  const currentSection = sections[currentSectionIndex];
  const progress = getModuleProgress(testModule.id);

  // Start module on mount
  useEffect(() => {
    if (!isLoading) {
      startModule(testModule.id);
    }
  }, [isLoading, startModule]);

  // Handle interaction completion
  const handleInteractionComplete = (result: InteractionResult) => {
    console.log('Interaction completed:', result);
    recordSectionResult(
      testModule.id,
      currentSection.id,
      result,
      currentSection.maxScore || 10
    );
  };

  // Handle section navigation
  const goToNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      // Mark current section as completed if informational
      if (currentSection.sectionType === 'informational') {
        markSectionCompleted(testModule.id, currentSection.id);
      }
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const goToPrevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  // Calculate progress percentage
  const progressPercentage = Math.round(
    ((currentSectionIndex + 1) / sections.length) * 100
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          {testModule.badge && (
            <span className="text-2xl">{testModule.badge.icon}</span>
          )}
          <h1 className="text-3xl font-bold">{testModule.title}</h1>
        </div>
        <p className="text-gray-600 mb-4">{testModule.description}</p>

        {/* Progress Bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">
            Section {currentSectionIndex + 1} of {sections.length}
          </span>
        </div>
      </div>

      {/* Debug Info */}
      <Card className="mb-6 bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Progress Debug Info
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p><strong>Status:</strong> {progress.status}</p>
          <p><strong>Cumulative Score:</strong> {progress.cumulativeScore} / {progress.maxCumulativeScore}</p>
          <p><strong>Badge Earned:</strong> {progress.badgeEarned ? 'Yes' : 'No'}</p>
          <p><strong>Completed Sections:</strong></p>
          <ul className="ml-4 list-disc">
            {Object.entries(progress.sections).map(([sectionId, sectionProgress]) => (
              <li key={sectionId}>
                {sectionId}: {sectionProgress.completed ? '✓' : '○'}
                {sectionProgress.score > 0 && ` (Score: ${sectionProgress.score}/${sectionProgress.maxScore})`}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Current Section */}
      <div className="mb-8">
        <Badge variant="outline" className="mb-4">
          {currentSection.sectionType} • {currentSection.cardType}
        </Badge>

        <CardRendererV2
          section={currentSection}
          maxScore={currentSection.maxScore || 10}
          onInteractionComplete={handleInteractionComplete}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={goToPrevSection}
          disabled={currentSectionIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={goToNextSection}
          disabled={currentSectionIndex === sections.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Completion Message */}
      {currentSectionIndex === sections.length - 1 && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            🎉 Test Complete!
          </h2>
          <p className="text-green-700">
            The V2 educational system is working. Check the debug info above to see your progress data.
          </p>
        </div>
      )}
    </div>
  );
}
