import { notFound } from 'next/navigation';
import { getModuleById } from '@/lib/education';
import { ModuleDetail } from '@/components/educational/module-detail';
import { Metadata } from 'next';

type Props = {
  params: { module: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function ModulePage({ params }: Props) {
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const moduleId = params.module;
  const moduleData = await getModuleById(moduleId);
  
  if (!moduleData) {
    return {
      title: 'Module Not Found - ScamShield',
    };
  }
  
  return {
    title: `${moduleData.title} - ScamShield`,
    description: moduleData.description,
  };
}