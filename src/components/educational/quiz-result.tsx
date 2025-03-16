'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  moduleId: string;
  moduleTitle: string;
  onRestartQuiz: () => void;
}

export function QuizResult({ score, totalQuestions, moduleId, moduleTitle, onRestartQuiz }: QuizResultProps) {
  // Calculate percentage score
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Determine result message based on score
  const getMessage = () => {
    if (percentage >= 90) {
      return "Excellent! You have a great understanding of how to identify and avoid scams.";
    } else if (percentage >= 70) {
      return "Good job! You have a solid grasp of scam awareness, but there's still a bit to learn.";
    } else if (percentage >= 50) {
      return "You're on the right track, but you might want to review the module again to strengthen your scam detection skills.";
    } else {
      return "It looks like you need more practice with identifying scams. Consider reviewing the module and trying again.";
    }
  };
  
  // Determine result color based on score
  const getColorClass = () => {
    if (percentage >= 90) return "text-success";
    if (percentage >= 70) return "text-primary";
    if (percentage >= 50) return "text-warning";
    return "text-danger";
  };
  
  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl mb-2">Quiz Results</CardTitle>
        <CardDescription>
          {moduleTitle}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-center">
        {/* Score display */}
        <div className="mb-6">
          <div className={`text-5xl font-bold mb-2 ${getColorClass()}`}>
            {percentage}%
          </div>
          <div className="text-gray-600">
            You got {score} out of {totalQuestions} questions correct
          </div>
        </div>
        
        {/* Feedback message */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <p className="text-lg">{getMessage()}</p>
        </div>
        
        {/* Celebration confetti for high scores */}
        {percentage >= 70 && (
          <div className="flex justify-center mb-6">
            <div className="text-4xl">
              🎉
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center gap-4">
        <Button onClick={onRestartQuiz} variant="outline">
          Try Again
        </Button>
        
        <Link href={`/learn/${moduleId}`}>
          <Button variant="outline">
            Review Module
          </Button>
        </Link>
        
        <Link href="/learn">
          <Button variant="default">
            Back to Modules
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}