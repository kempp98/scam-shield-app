'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RedFlag } from '@/lib/education';
import { RedFlagHighlight } from './red-flag';

interface ModuleDetailProps {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  content: {
    sections: Array<{
      id: string;
      title: string;
      body: string;
      redFlags?: RedFlag[];
      keyPoints?: Array<{
        id: string;
        title: string;
        description: string;
      }>;
      examples?: string[];
      actionSteps?: string[];
    }>;
  };
}

export function ModuleDetail({ id, title, description, estimatedTime, content }: ModuleDetailProps) {
  const [activeSection, setActiveSection] = useState(0);
  const { sections } = content;
  
  // Helper to check if we're on the last section
  const isLastSection = activeSection === sections.length - 1;
  
  // Helper to navigate to the next section
  const goToNextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
      // Scroll to top of content area
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Helper to navigate to the previous section
  const goToPreviousSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
      // Scroll to top of content area
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Process the body text to highlight red flags if present
  const renderBodyWithRedFlags = (body: string, redFlags?: RedFlag[]) => {
    if (!redFlags || redFlags.length === 0) {
      return <p className="mb-4">{body}</p>;
    }

    // Simple text rendering with red flag highlights
    // In a more complete implementation, this would parse the text and insert
    // RedFlagHighlight components at the appropriate locations
    return (
      <div className="mb-4">
        <p>{body}</p>
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Red Flags to Watch For:</h4>
          <ul className="space-y-2">
            {redFlags.map((flag) => (
              <li key={flag.id}>
                <RedFlagHighlight redFlag={flag} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  // Render key points if present
  const renderKeyPoints = (keyPoints?: Array<{ id: string; title: string; description: string }>) => {
    if (!keyPoints || keyPoints.length === 0) return null;
    
    return (
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Key Points:</h4>
        <div className="space-y-4">
          {keyPoints.map((point) => (
            <div key={point.id} className="bg-gray-50 p-4 rounded-md">
              <h5 className="font-medium text-primary">{point.title}</h5>
              <p className="text-gray-700 mt-1">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render examples if present
  const renderExamples = (examples?: string[]) => {
    if (!examples || examples.length === 0) return null;
    
    return (
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Examples:</h4>
        <div className="space-y-2">
          {examples.map((example, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-md border-l-4 border-warning text-sm italic">
              &ldquo;{example}&rdquo;
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render action steps if present
  const renderActionSteps = (actionSteps?: string[]) => {
    if (!actionSteps || actionSteps.length === 0) return null;
    
    return (
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Action Steps:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {actionSteps.map((step, index) => (
            <li key={index} className="text-gray-700">{step}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  const currentSection = sections[activeSection];
  
  return (
    <div className="space-y-6">
      {/* Module header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-4">{description}</p>
        <Badge variant="secondary">{estimatedTime}</Badge>
      </div>
      
      {/* Section navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(index)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              index === activeSection
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {index + 1}. {section.title}
          </button>
        ))}
      </div>
      
      {/* Current section content */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">{currentSection.title}</h2>
          {renderBodyWithRedFlags(currentSection.body, currentSection.redFlags)}
          {renderKeyPoints(currentSection.keyPoints)}
          {renderExamples(currentSection.examples)}
          {renderActionSteps(currentSection.actionSteps)}
        </CardContent>
      </Card>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={goToPreviousSection}
          disabled={activeSection === 0}
        >
          Previous Section
        </Button>
        
        {isLastSection ? (
          <Link href={`/learn/${id}/quiz`}>
            <Button variant="default">
              Take Quiz
            </Button>
          </Link>
        ) : (
          <Button
            variant="default"
            onClick={goToNextSection}
          >
            Next Section
          </Button>
        )}
      </div>
    </div>
  );
}