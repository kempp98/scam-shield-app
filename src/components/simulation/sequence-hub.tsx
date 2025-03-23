'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getSequenceSummaries } from '@/lib/simulation-v2';
import { SequenceSummary } from '@/types/simulation-v2';

export function SequenceHub() {
  const [sequences, setSequences] = useState<SequenceSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadSequences = async () => {
      setIsLoading(true);
      try {
        const data = await getSequenceSummaries();
        setSequences(data);
      } catch (error) {
        console.error('Error loading sequences:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSequences();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (sequences.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-700 mb-2">No simulations available</h3>
        <p className="text-gray-500">Check back soon for new simulation content!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sequences.map((sequence) => (
          <Card key={sequence.id} className="border hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                
                <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {sequence.difficulty.charAt(0).toUpperCase() + sequence.difficulty.slice(1)}
                </div>
              </div>
              <CardTitle className="mt-2">{sequence.title}</CardTitle>
              <CardDescription>{sequence.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {sequence.completedCount} / {sequence.totalCount} Completed
                </Badge>
              </div>
            </CardContent>
            
            <CardFooter>
              <Link href={`/simulate/sequence/${sequence.id}`} className="w-full">
                <Button className="w-full">
                  Start Simulation
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}