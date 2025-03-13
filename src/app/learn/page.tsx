import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// This would normally come from the API, but we'll hardcode it for now
const modules = [
  {
    id: 'common-scam-types',
    title: 'Common Text Scam Types',
    description: 'Learn about the most prevalent text message scams and how they attempt to manipulate recipients.',
    estimatedTime: '10 minutes'
  },
  {
    id: 'identifying-red-flags',
    title: 'Identifying Red Flags in Text Scams',
    description: 'Learn to spot the warning signs that indicate a text message might be a scam, regardless of the specific scenario.',
    estimatedTime: '15 minutes'
  },
  {
    id: 'safe-response-techniques',
    title: 'Safe Response Techniques',
    description: 'Learn what to do when you receive suspicious text messages and how to protect yourself from scams.',
    estimatedTime: '12 minutes'
  }
];

export default function LearnPage() {
  return (
    <div className="container-padded py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Educational Modules</h1>
        <p className="text-lg text-gray-600 mb-8">
          Our educational content will help you understand common text scams, recognize red flags, 
          and learn how to respond safely to suspicious messages.
        </p>
        
        <div className="space-y-6">
          {modules.map((module) => (
            <Card key={module.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {module.estimatedTime}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/learn/${module.id}`}>
                  <Button variant="default">
                    Start Module
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
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