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
  const isFirstSection = activeSection === 0;
  
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
    <div className="relative pb-16">
      {/* Module header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">{estimatedTime}</Badge>
          <div className="text-sm text-gray-500">
            Section {activeSection + 1} of {sections.length}
          </div>
        </div>
      </div>
      
      {/* Progress indicator - more compact for many sections */}
      <div className="flex items-center justify-center mb-8 overflow-x-auto py-2 no-scrollbar">
        <div className="flex space-x-1">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeSection 
                  ? 'bg-primary w-6' 
                  : sectionProgress[section.id]
                    ? 'bg-primary/40'
                    : 'bg-gray-200'
              }`}
              title={`${index + 1}. ${section.title}`}
            />
          ))}
        </div>
      </div>
      
      {/* Side navigation arrows */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12 hidden md:block">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPreviousSection}
          disabled={isFirstSection}
          className={`rounded-full p-2 ${isFirstSection ? 'opacity-0' : 'opacity-90 hover:opacity-100'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Button>
      </div>
      
      {/* Only show right arrow if not on last section */}
      {!isLastSection && (
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12 hidden md:block">
          <Button
            variant="default"
            size="icon"
            onClick={goToNextSection}
            className="rounded-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Button>
        </div>
      )}
      
      {/* Current section title */}
      <h2 className="text-2xl font-semibold mb-6">{currentSection.title}</h2>
      
      {/* Current section content using the CardRenderer */}
      <CardRenderer 
        section={currentSection} 
        onInteractionComplete={handleInteractionComplete} 
      />
      
      {/* Bottom Take Quiz button - only shown on last section */}
      {isLastSection && (
        <div className="flex justify-center mt-12">
          <Link href={`/learn/${id}/quiz`}>
            <Button
              variant="default"
              className="rounded-full bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 text-lg shadow-md"
            >
              Take Quiz
            </Button>
          </Link>
        </div>
      )}
      
      {/* Mobile navigation buttons (visible on small screens) */}
      <div className="flex justify-between mt-8 md:hidden">
        <Button
          variant="outline"
          onClick={goToPreviousSection}
          disabled={isFirstSection}
          className="flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Previous
        </Button>
        
        {isLastSection ? (
          <Link href={`/learn/${id}/quiz`}>
            <Button variant="default" className="flex items-center">
              Take Quiz
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Button>
          </Link>
        ) : (
          <Button variant="default" onClick={goToNextSection} className="flex items-center">
            Next
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Button>
        )}
      </div>

      {/* Section navigation mini-map (optional for very long modules) */}
      <div className="mt-12 pt-6 border-t border-gray-100">
        <details className="text-sm">
          <summary className="text-gray-500 cursor-pointer font-medium">
            Module Outline
          </summary>
          <ul className="mt-2 space-y-1">
            {sections.map((section, index) => (
              <li key={section.id}>
                <button 
                  onClick={() => setActiveSection(index)}
                  className={`text-left w-full px-2 py-1 rounded ${
                    index === activeSection 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="inline-block w-6">{index + 1}.</span> {section.title}
                  {sectionProgress[section.id] && (
                    <span className="ml-2 text-green-500">✓</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}