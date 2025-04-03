'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getScenarioSummaries } from '@/lib/simulation';
import { getEmailScenarioSummaries } from '@/lib/email-simulation';

// Define proper types for our scenario data
interface ScenarioSummary {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  completed?: boolean;
  isCompleted?: boolean;
}

type SimulationType = 'text' | 'email';

export function EnhancedSimulationHub() {
  const [activeTab, setActiveTab] = useState<SimulationType>('text');
  const [textScenarios, setTextScenarios] = useState<ScenarioSummary[]>([]);
  const [emailScenarios, setEmailScenarios] = useState<ScenarioSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Load both text and email scenarios
        const [textData, emailData] = await Promise.all([
          getScenarioSummaries(),
          getEmailScenarioSummaries()
        ]);
        
        setTextScenarios(textData);
        setEmailScenarios(emailData);
      } catch (error) {
        console.error('Error loading scenarios:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Get icon for scenario category
  const getCategoryIcon = (category: string) => {
    // Return different icons based on the category
    switch (category) {
      case 'financial':
      case 'banking':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5 5 0 006.424 6.169l.576-.102m7.5-6.467l.586.583a3.375 3.375 0 005.43-4.167S18.75 6.108 16.5 7.5" />
          </svg>
        );
      case 'delivery':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      case 'phishing':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        );
      case 'job-scam':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
    }
  };
  
  // Helper to get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Use simple tabs implementation
  return (
    <div className="mb-8">
      <div className="flex border-b">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'text' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('text')}
        >
          Text Message Simulations
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'email' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('email')}
        >
          Email Simulations
        </button>
      </div>
      
      <div className="pt-6">
        {activeTab === 'text' ? renderTextScenarios() : renderEmailScenarios()}
      </div>
    </div>
  );
  
  // Render text message scenarios
  function renderTextScenarios() {
    if (textScenarios.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No text message simulations available</h3>
          <p className="text-gray-500">Check back soon for new simulation content!</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {textScenarios.map((scenario) => (
          <Card key={scenario.id} className="border hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  {getCategoryIcon(scenario.category)}
                </div>
                
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                  {scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1)}
                </div>
              </div>
              <CardTitle className="mt-2">{scenario.title}</CardTitle>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {scenario.category.charAt(0).toUpperCase() + scenario.category.slice(1)}
                </Badge>
                
                {scenario.completed && (
                  <Badge variant="success">
                    Completed
                  </Badge>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Link href={`/simulate/${scenario.id}`} className="w-full">
                <Button className="w-full">
                  {scenario.completed ? 'Try Again' : 'Start Scenario'}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  // Render email scenarios
  function renderEmailScenarios() {
    if (emailScenarios.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No email simulations available</h3>
          <p className="text-gray-500">Check back soon for new simulation content!</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emailScenarios.map((scenario) => (
          <Card key={scenario.id} className="border hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                  {scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1)}
                </div>
              </div>
              <CardTitle className="mt-2">{scenario.title}</CardTitle>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {scenario.category.charAt(0).toUpperCase() + scenario.category.slice(1)}
                </Badge>
                
                {scenario.isCompleted && (
                  <Badge variant="success">
                    Completed
                  </Badge>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Link href={`/simulate/email/${scenario.id}`} className="w-full">
                <Button className="w-full">
                  {scenario.isCompleted ? 'Try Again' : 'Start Scenario'}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
}