'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useModuleProgress } from '@/hooks/useModuleProgress';

// Define the type for module summary data
export interface ModuleSummary {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  estimatedTime: string;
}

// Props for the component
interface ModuleListProps {
  modules?: ModuleSummary[];
  isLoading?: boolean;
}

export function ModuleList({ modules = [], isLoading = false }: ModuleListProps) {
  // Use our custom hook to manage progress
  const { progress, isLoading: progressLoading } = useModuleProgress();

  // Render loading state
  if (isLoading || progressLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </CardContent>
            <CardFooter>
              <div className="h-10 bg-gray-200 rounded w-28"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  // Render empty state
  if (modules.length === 0) {
    return (
      <Card className="text-center p-6">
        <CardContent>
          <p className="text-gray-500 mb-4">No educational modules available yet.</p>
          <p className="text-sm text-gray-400">Check back soon for new content!</p>
        </CardContent>
      </Card>
    );
  }

  // Get progress status text and color
  const getProgressStatus = (moduleId: string) => {
    const moduleProgress = progress[moduleId];
    if (!moduleProgress) return { text: 'Not started', color: 'secondary' };
    
    if (moduleProgress.completed) {
      return { text: 'Completed', color: 'success' };
    } else if (moduleProgress.inProgress) {
      return { 
        text: `${moduleProgress.percentComplete}% complete`, 
        color: 'primary' 
      };
    }
    return { text: 'Not started', color: 'secondary' };
  };

  // Render the module list
  return (
    <div className="space-y-6">
      {modules.map(module => {
        const status = getProgressStatus(module.id);
        
        return (
          <Card key={module.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant={status.color}>{status.text}</Badge>
                <Badge variant="secondary">{module.estimatedTime}</Badge>
              </div>
              
              {progress[module.id]?.inProgress && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${progress[module.id].percentComplete}%` }}
                  ></div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link href={`/learn/${module.id}`}>
                <Button variant="default">
                  {progress[module.id]?.inProgress ? 'Continue' : 'Start'} Module
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}