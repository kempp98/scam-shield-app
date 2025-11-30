import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModuleList } from '@/components/educational/module-list';
import { getModuleSummaries } from '@/lib/education';

export default async function LearnPage() {
  // Fetch modules directly on the server
  const modules = await getModuleSummaries();

  return (
    <div className="container-padded py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Educational Modules</h1>
        <p className="text-lg text-gray-600 mb-8">
          Our educational content will help you learn common scam tactics, learn to spot red flags, and keep yourself safe in the digital world.
        </p>

        <ModuleList modules={modules} isLoading={false} />

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