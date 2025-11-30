import { notFound } from 'next/navigation';
import { getModuleById } from '@/lib/education';
import { Quiz } from '@/components/educational/quiz';
import { Metadata } from 'next';

interface QuizPageProps {
  params: Promise<{
    module: string;
  }>;
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { module } = await params;
  const moduleData = await getModuleById(module);

  if (!moduleData) {
    return {
      title: 'Quiz Not Found - ScamSafe',
      description: 'The requested quiz could not be found.',
    };
  }

  return {
    title: `${moduleData.title} Quiz - ScamSafe`,
    description: `Test your knowledge with the ${moduleData.title} quiz.`,
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { module } = await params;
  const moduleData = await getModuleById(module);

  if (!moduleData) {
    notFound();
  }

  return (
    <div className="container-padded py-12">
      <div className="max-w-4xl mx-auto">
        <Quiz
          moduleId={moduleData.id}
          moduleTitle={moduleData.title}
          questions={moduleData.quiz}
        />
      </div>
    </div>
  );
}