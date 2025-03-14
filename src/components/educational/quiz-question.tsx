'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizOption } from '@/lib/education';

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  onAnswer: (optionId: string, isCorrect: boolean) => void;
  isAnswered: boolean;
  selectedOptionId?: string;
}

export function QuizQuestion({
  question,
  options,
  onAnswer,
  isAnswered,
  selectedOptionId,
}: QuizQuestionProps) {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">{question}</h3>
        
        <div className="space-y-3">
          {options.map((option) => {
            // Determine option styling based on selection state
            const isSelected = selectedOptionId === option.id;
            const showCorrectStyle = isAnswered && option.isCorrect;
            const showIncorrectStyle = isAnswered && isSelected && !option.isCorrect;
            
            let optionClassName = "w-full text-left p-4 rounded-md border transition-colors";
            
            if (isSelected && !isAnswered) {
              // Selected but not answered yet
              optionClassName += " bg-primary/10 border-primary";
            } else if (showCorrectStyle) {
              // Correct answer
              optionClassName += " bg-success/10 border-success text-success";
            } else if (showIncorrectStyle) {
              // Incorrect selected answer
              optionClassName += " bg-danger/10 border-danger text-danger";
            } else {
              // Default/unselected style
              optionClassName += " bg-white border-gray-200 hover:bg-gray-50";
            }
            
            // Disable options after answering
            const isDisabled = isAnswered;
            
            return (
              <div key={option.id} className="relative">
                <button
                  onClick={() => !isAnswered && onAnswer(option.id, option.isCorrect)}
                  disabled={isDisabled}
                  className={optionClassName}
                >
                  {option.text}
                </button>
                
                {/* Show feedback when answered */}
                {isAnswered && isSelected && (
                  <div className={`mt-2 p-3 rounded text-sm ${option.isCorrect ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                    {option.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}