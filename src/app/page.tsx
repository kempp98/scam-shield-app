import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="container-padded">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Protect Yourself from <span className="text-gradient">Scams</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Learn to identify and avoid scam attempts through bite-sized modules and
          realistic scam simulations that build your confidence and scam recognition skills.
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
          <h2 className="text-3xl font-bold text-center mb-12">How ScamSafe Helps You</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card>
              <CardHeader>
                <CardTitle>Learn About Scams</CardTitle>
                <CardDescription>Understand common scam techniques</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Our educational modules break down common scam tactics and teach you how to identify red flags to keep yourself safe.</p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Practice Safely</CardTitle>
                <CardDescription>Risk-free simulation environment</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Try our realistic simulations to practice recognizing scams and building confidence, ensuring you can recognize real-life scams when you face them.</p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card>
              <CardHeader>
                <CardTitle>Build Confidence</CardTitle>
                <CardDescription>Become scam-resistant</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Gain the knowledge and skills to confidently handle suspicious messages and protect your personal information and finances.</p>
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