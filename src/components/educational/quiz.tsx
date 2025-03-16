'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizQuestion } from './quiz-question';
import { QuizResult } from './quiz-result';
import { QuizQuestion as QuizQuestionType } from '@/lib/education';

interface QuizProps {
  moduleId: string;
  moduleTitle: string;
  questions: QuizQuestionType[];
}

export function Quiz({ moduleId, moduleTitle, questions }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  
  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + (isCurrentQuestionAnswered ? 1 : 0)) / totalQuestions) * 100;
  
  // Handle answer selection
  const handleAnswer = (optionId: string, isCorrect: boolean) => {
    // Save the answer
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
    
    // Track correct answers
    if (isCorrect) {
      setCorrectAnswers((prev) => [...prev, currentQuestion.id]);
    }
    
    // Mark current question as answered
    setIsCurrentQuestionAnswered(true);
  };
  
  // Move to next question
  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Quiz completed
      setQuizCompleted(true);
    } else {
      // Move to next question
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsCurrentQuestionAnswered(false);
    }
  };
  
  // Restart the quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCorrectAnswers([]);
    setIsCurrentQuestionAnswered(false);
    setQuizCompleted(false);
  };
  
  if (quizCompleted) {
    return (
      <QuizResult
        score={correctAnswers.length}
        totalQuestions={totalQuestions}
        moduleId={moduleId}
        moduleTitle={moduleTitle}
        onRestartQuiz={handleRestartQuiz}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{moduleTitle} - Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Question counter */}
          <div className="text-gray-600 mb-4">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          
          {/* Current question */}
          <QuizQuestion
            question={currentQuestion.question}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
            isAnswered={isCurrentQuestionAnswered}
            selectedOptionId={answers[currentQuestion.id]}
          />
          
          {/* Next button */}
          {isCurrentQuestionAnswered && (
            <div className="flex justify-end">
              <Button onClick={handleNextQuestion}>
                {isLastQuestion ? 'See Results' : 'Next Question'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}