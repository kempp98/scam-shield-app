// src/components/educational/card-types/MultipleChoiceCard.tsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContentSection } from '@/lib/education';

interface MultipleChoiceResult {
    correct: boolean;
    selectedOption: string;
  }

  interface MultipleChoiceCardProps {
    section: ContentSection;
    onComplete?: (result: MultipleChoiceResult) => void;
  }

export function MultipleChoiceCard({ section, onComplete }: MultipleChoiceCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { question, options } = section.interactionData || { 
    question: section.title, 
    options: [] 
  };
  
  const handleOptionSelect = (optionId: string) => {
    if (!isSubmitted) {
      setSelectedOption(optionId);
    }
  };
  
  const handleSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true);
      
      const option = options?.find(opt => opt.id === selectedOption);
      const isCorrect = option?.isCorrect || false;
      
      if (onComplete) {
        onComplete({ 
          correct: isCorrect, 
          selectedOption 
        });
      }
    }
  };
  
  const getOptionClassName = (optionId: string, isCorrect: boolean) => {
    const baseClass = "p-4 border rounded-md text-left w-full transition-colors mb-2";
    
    if (!isSubmitted) {
      return `${baseClass} ${selectedOption === optionId ? 'border-primary bg-primary/10' : 'border-gray-200 hover:bg-gray-50'}`;
    }
    
    if (optionId === selectedOption) {
      return `${baseClass} ${isCorrect ? 'border-success bg-success/10 text-success' : 'border-danger bg-danger/10 text-danger'}`;
    }
    
    if (isCorrect) {
      return `${baseClass} border-success bg-success/5`;
    }
    
    return `${baseClass} border-gray-200 opacity-60`;
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
        <p className="mb-6">{question}</p>
        
        <div className="space-y-2 mb-6">
          {options?.map(option => (
            <div key={option.id}>
              <button
                onClick={() => handleOptionSelect(option.id)}
                disabled={isSubmitted}
                className={getOptionClassName(option.id, option.isCorrect)}
              >
                {option.text}
              </button>
              
              {isSubmitted && selectedOption === option.id && option.feedback && (
                <div className={`mt-2 p-3 rounded text-sm ${option.isCorrect ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                  {option.feedback}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {!isSubmitted && (
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedOption}
            className="w-full"
          >
            Submit Answer
          </Button>
        )}
        
        {isSubmitted && (
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setSelectedOption(null);
            }}
            variant="outline"
            className="w-full mt-4"
          >
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}