import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="container-padded">
      {/* Hero Section */}
      <button className="test-button">Test CSS Button</button>
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Protect Yourself from <span className="text-gradient">Text Message Scams</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Learn to identify and avoid text scams through educational content and
          realistic simulations that build your confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/learn">
            <Button variant="default" size="lg">
              Start Learning
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" size="lg">
              Get Early Access
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-gray-50 -mx-4 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How ScamShield Helps You</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card>
              <CardHeader>
                <CardTitle>Learn About Scams</CardTitle>
                <CardDescription>Understand common scam techniques</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Our educational modules break down the most common text scams and teach you how to identify red flags in any message.</p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Practice Safely</CardTitle>
                <CardDescription>Risk-free simulation environment</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Try our realistic simulations to practice responding to suspicious messages without any real-world risk.</p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card>
              <CardHeader>
                <CardTitle>Build Confidence</CardTitle>
                <CardDescription>Become scam-resistant</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Gain the knowledge and skills to confidently handle suspicious messages and protect your personal information.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Protect Yourself?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Join others learning to protect themselves from scammers.
        </p>
        <Link href="/signup">
          <Button variant="default" size="lg">
            Get Early Access
          </Button>
        </Link>
      </section>
    </div>
  );
}