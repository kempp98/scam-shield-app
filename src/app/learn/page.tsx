'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModuleList, ModuleSummary } from '@/components/educational/module-list';

export default function LearnPage() {
  const [modules, setModules] = useState<ModuleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch modules from API
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('/api/modules');
        if (!response.ok) throw new Error('Failed to fetch modules');
        const data = await response.json();
        setModules(data);
      } catch (error) {
        console.error('Error fetching modules:', error);
        // Fallback to hardcoded modules in case of error
        setModules([
          {
            id: 'common-scam-types',
            title: 'Common Text Scam Types',
            description: 'Learn about the most prevalent text message scams and how they attempt to manipulate recipients.',
            coverImage: '/images/common-scams-cover.jpg',
            estimatedTime: '10 minutes'
          },
          {
            id: 'identifying-red-flags',
            title: 'Identifying Red Flags in Text Scams',
            description: 'Learn to spot the warning signs that indicate a text message might be a scam, regardless of the specific scenario.',
            coverImage: '/images/red-flags-cover.jpg',
            estimatedTime: '15 minutes'
          },
          {
            id: 'safe-response-techniques',
            title: 'Safe Response Techniques',
            description: 'Learn what to do when you receive suspicious text messages and how to protect yourself from scams.',
            coverImage: '/images/safe-response-cover.jpg',
            estimatedTime: '12 minutes'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="container-padded py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Educational Modules</h1>
        <p className="text-lg text-gray-600 mb-8">
          Our educational content will help you learn common scam tactics, learn to spot red flags, and keep yourself save in the digital world.
        </p>
        
        <ModuleList modules={modules} isLoading={isLoading} />
        
        <div className="mt-10 text-center">
          <p className="text-gray-500 mb-4">
            After completing these modules, test your knowledge with our scam simulations!
          </p>
          <Link href="/simulate">
            <Button variant="outline">
              Try Simulations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}