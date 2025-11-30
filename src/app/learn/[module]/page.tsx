import { notFound } from 'next/navigation';
import { getModuleById } from '@/lib/education';
import { ModuleDetail } from '@/components/educational/module-detail';
import { Metadata } from 'next';

interface ModulePageProps {
  params: Promise<{
    module: string;
  }>;
}

export async function generateMetadata({ params }: ModulePageProps): Promise<Metadata> {
  const { module } = await params;
  const moduleData = await getModuleById(module);

  if (!moduleData) {
    return {
      title: 'Module Not Found - ScamSafe',
      description: 'The requested learning module could not be found.',
    };
  }

  return {
    title: `${moduleData.title} - ScamSafe`,
    description: moduleData.description,
    openGraph: {
      title: moduleData.title,
      description: moduleData.description,
      images: [moduleData.coverImage],
    },
  };
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { module } = await params;
  const moduleData = await getModuleById(module);

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