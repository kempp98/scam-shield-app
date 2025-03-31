import { notFound } from 'next/navigation';
import { getModuleById } from '@/lib/education';
import { Quiz } from '@/components/educational/quiz';

export default async function QuizPage({ params }) {
  const moduleId = params.module;
  const moduleData = await getModuleById(moduleId);
  
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

// Simplified metadata
export const metadata = {
  title: 'Quiz - ScamSafe',
};