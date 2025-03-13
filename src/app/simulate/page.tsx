import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export default function SimulatePage() {
  return (
    <div className="container-padded py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Text Scam Simulations</h1>
        <p className="text-lg text-gray-600 mb-8">
          Practice identifying and responding to text scams in our safe simulation environment.
          These realistic scenarios will help you apply what you've learned without any real-world risk.
        </p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-10">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Coming Soon</h2>
          <p className="text-yellow-700">
            Our simulation feature is currently under development. Sign up for early access to be the first to try it!
          </p>
          <div className="mt-4">
            <Link href="/signup">
              <Button variant="default">
                Get Early Access
              </Button>
            </Link>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Realistic Scenarios</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Experience authentic-looking text message scenarios based on real-world scams.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Interactive Choices</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Make decisions on how to respond and see the consequences of your choices.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Real-time Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Learn why your responses were effective or risky with detailed explanations.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Build Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Practice repeatedly until identifying scams becomes second nature.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">
            Haven't completed the educational modules yet?
          </p>
          <Link href="/learn">
            <Button variant="outline">
              Start Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}