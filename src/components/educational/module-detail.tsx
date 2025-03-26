'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContentSection } from '@/lib/education';
import { CardRenderer } from '@/components/educational/card-renderer';
import { InteractionResult } from '@/types/interactions';

interface ModuleDetailProps {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  content: {
    sections: ContentSection[];
  };
}

export function ModuleDetail({ id, title, description, estimatedTime, content }: ModuleDetailProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState<Record<string, boolean>>({});
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

  // Handle interaction completion
  const handleInteractionComplete = (result: InteractionResult) => {
    console.log('Interaction completed:', result);
    
    // Mark the section as completed
    if (result.correct) {
      setSectionProgress({
        ...sectionProgress,
        [sections[activeSection].id]: true
      });
    }
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
            className={`px-3 py-1 text-sm rounded-full transition-colors flex items-center gap-1 ${
              index === activeSection
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {index + 1}. {section.title}
            {sectionProgress[section.id] && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            )}
          </button>
        ))}
      </div>
      
      {/* Current section content - Using the CardRenderer */}
      <CardRenderer 
        section={currentSection} 
        onInteractionComplete={handleInteractionComplete} 
      />
      
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