'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ScenarioSummary, DifficultyLevel, ScenarioCategory } from '@/types/simulation';
import { getScenarioSummaries } from '@/lib/simulation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function SimulationHub() {
  const [scenarios, setScenarios] = useState<ScenarioSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<{
    category: ScenarioCategory | 'all';
    difficulty: DifficultyLevel | 'all';
    completed: 'all' | 'completed' | 'incomplete';
  }>({
    category: 'all',
    difficulty: 'all',
    completed: 'all'
  });
  
  useEffect(() => {
    const loadScenarios = async () => {
      setIsLoading(true);
      try {
        const data = await getScenarioSummaries();
        setScenarios(data);
      } catch (error) {
        console.error('Error loading scenarios:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadScenarios();
  }, []);
  
  // Get icon for scenario category
  const getCategoryIcon = (category: ScenarioCategory) => {
    switch (category) {
      case 'financial':
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
      case 'government':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        );
      case 'prize':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        );
      case 'tech':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
  
  // Get badge color for difficulty
  const getDifficultyColor = (difficulty: DifficultyLevel) => {
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
  
  // Filter scenarios
  const filteredScenarios = scenarios.filter(scenario => {
    // Category filter
    if (filter.category !== 'all' && scenario.category !== filter.category) {
      return false;
    }
    
    // Difficulty filter
    if (filter.difficulty !== 'all' && scenario.difficulty !== filter.difficulty) {
      return false;
    }
    
    // Completion filter
    if (filter.completed === 'completed' && !scenario.completed) {
      return false;
    }
    if (filter.completed === 'incomplete' && scenario.completed) {
      return false;
    }
    
    return true;
  });
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium mb-3">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              value={filter.category}
              onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value as ScenarioCategory | 'all' }))}
            >
              <option value="all">All Categories</option>
              <option value="financial">Financial</option>
              <option value="delivery">Delivery</option>
              <option value="government">Government</option>
              <option value="prize">Prize/Giveaway</option>
              <option value="tech">Tech Support</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          {/* Difficulty filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              value={filter.difficulty}
              onChange={(e) => setFilter(prev => ({ ...prev, difficulty: e.target.value as DifficultyLevel | 'all' }))}
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          {/* Completion filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              value={filter.completed}
              onChange={(e) => setFilter(prev => ({ ...prev, completed: e.target.value as 'all' | 'completed' | 'incomplete' }))}
            >
              <option value="all">All Scenarios</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Not Yet Completed</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredScenarios.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No scenarios match your filters</h3>
          <p className="text-gray-500">Try adjusting your filter criteria</p>
          <Button 
            variant="outline"
            className="mt-4"
            onClick={() => setFilter({
              category: 'all',
              difficulty: 'all',
              completed: 'all'
            })}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((scenario) => (
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
      )}
    </div>
  );
}