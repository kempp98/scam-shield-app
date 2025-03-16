import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ModuleNotFound() {
  return (
    <div className="container-padded py-16">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Module Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          The educational module you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/learn">
            <Button variant="default">
              Browse All Modules
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}