import { notFound } from 'next/navigation';
import { getModuleById } from '@/lib/education';
import { ModuleDetail } from '@/components/educational/module-detail';

export default async function ModulePage({ params }) {
  const moduleId = params.module;
  const moduleData = await getModuleById(moduleId);
  
  if (!moduleData) {
    notFound();
  }
  
  return (
    <div className="container-padded py-12">
      <div className="max-w-4xl mx-auto">
        <ModuleDetail
          id={moduleData.id}
          title={moduleData.title}
          description={moduleData.description}
          estimatedTime={moduleData.estimatedTime}
          content={moduleData.content}
        />
      </div>
    </div>
  );
}

// Metadata is causing type issues so we'll use a simple title
export const metadata = {
  title: 'Module Detail - ScamSafe',
};