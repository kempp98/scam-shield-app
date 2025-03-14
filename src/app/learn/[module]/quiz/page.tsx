import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getModuleById } from '@/lib/education';

interface QuizPageProps {
  params: {
    module: string;
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const moduleId = params.module;
  const moduleData = await getModuleById(moduleId);
  
  if (!moduleData) {
    notFound();
  }
  
  // This is a placeholder until we implement the actual quiz component
  return (
    <div className="container-padded py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{moduleData.title} - Quiz</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-10">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Coming Soon</h2>
          <p className="text-yellow-700">
            Our quiz functionality is currently under development. Check back soon to test your knowledge!
          </p>
          <div className="mt-4">
            <Link href="/learn">
              <Button variant="default">
                Return to Modules
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: QuizPageProps) {
  const moduleId = params.module;
  const moduleData = await getModuleById(moduleId);
  
  if (!moduleData) {
    return {
      title: 'Quiz Not Found - ScamShield',
    };
  }
  
  return {
    title: `Quiz: ${moduleData.title} - ScamShield`,
    description: `Test your knowledge on ${moduleData.title}`,
  };
}