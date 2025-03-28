'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { subscribeToNewsletter } from '@/lib/feedback-service';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setSubmitResult({
        success: false,
        message: 'Please enter your email address'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        setSubmitResult({
          success: true,
          message: 'Thank you for joining our community! We\'ll share helpful tips and updates to keep you protected.'
        });
        
        // Reset the form
        setEmail('');
      } else {
        setSubmitResult({
          success: false,
          message: result.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      
      setSubmitResult({
        success: false,
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-padded">
      {/* Hero Section - Warmer and more personal */}
      <section className="py-16 md:py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Stop Scams <span className="text-gradient">Before</span> They Happen
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
        Learn to spot sophisticated scams and practice your detection skills in a safe environment. 
        Build the habits to stay secure online.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/learn">
            <Button variant="default" size="lg" className="font-medium">
              Learn About Scams
            </Button>
          </Link>
          <Link href="/simulate">
            <Button variant="secondary" size="lg" className="font-medium">
              Practice Recognizing Scams
            </Button>
          </Link>
        </div>
      </section>


      {/* Statistics & Impact Section - More conversational */}
      <section className="py-14 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-5">Why This Matters</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-10">
            Scams are becoming more sophisticated every day, and anyone can become a target—regardless of age, education, or tech-savviness.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Stats column - More conversational */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6 text-primary">The Reality We Face</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-3xl font-bold text-gray-800">$12.4 billion</p>
                  <p className="text-gray-700">Lost by everyday people to scammers in 2024—money that could have gone to education, healthcare, or retirement. <i>(FTC, 2024)</i></p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">2.6 million</p>
                  <p className="text-gray-700">People reported being targeted by scams last year, with nearly 1 in 3 losing money. Many more cases go unreported due to embarrassment.</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">44%</p>
                  <p className="text-gray-700">Of scam victims are now between 20-29 years old. Contrary to popular belief, scams affect people of all ages—not just older adults.</p>
                </div>
              </div>
            </div>
            
            {/* Traditional approach issues - More empathetic */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6 text-primary">Why Old Approaches Aren&apos;t Working</h3>
              <ul className="space-y-5">
                <li className="flex items-start">
                  <span className="text-danger mr-2 mt-1">✖</span>
                  <span><strong>Generic warnings</strong> like &quot;watch out for scams&quot; don&apos;t prepare us for today&apos;s highly convincing, personalized attempts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-danger mr-2 mt-1">✖</span>
                  <span><strong>One-time tips</strong> are quickly forgotten and don&apos;t create the protective habits we need in our daily lives</span>
                </li>
                <li className="flex items-start">
                  <span className="text-danger mr-2 mt-1">✖</span>
                  <span><strong>Reading about scams</strong> isn&apos;t enough—we need safe practice opportunities to recognize them in the moment</span>
                </li>
                <li className="flex items-start mt-6">
                  <span className="text-success mr-2 mt-1">✓</span>
                  <span><strong>Studies show</strong> interactive learning, like our approach, can improve your ability to spot scams by up to 40%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section - Warmer descriptions */}
      <section className="py-14 bg-white rounded-xl mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">Build Your Scam Defenses</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-primary">Understand Scam Tactics</CardTitle>
                <CardDescription>Easy lessons to spot red flags</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Quickly learn to identify common scams with clear, practical, bite-sized lessons. </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-primary">Practice Without Risk</CardTitle>
                <CardDescription>Recognize threats through practice.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Experience realistic phishing emails, fake login pages, or scam calls in our 100% safe simulation environment. 
                  Learn to spot tricks firsthand, building the confidence and muscle memory to react safely in real life.</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-primary">Stay Updated & Alert</CardTitle>
                <CardDescription>Get the latest on new scam tactics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Scams evolve constantly. We keep you informed with regular updates, blog posts, and alerts on the newest threats to watch out for.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscribe Section - Using the newsletter form */}
      <section className="py-14 bg-gradient-to-b from-white to-blue-50 rounded-xl mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Stay Protected</h2>
          <p className="text-lg text-gray-700 mb-8">
          Sign up for essential scam alerts, safety tips, and platform updates. Plus, be the first to know when we launch new features, including our community!
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={email}
                onChange={handleInputChange}
                required
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Sign Me Up'}
              </button>
            </div>
            {submitResult.message && (
              <div className={`mt-4 p-3 rounded-md text-sm ${
                submitResult.success 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitResult.message}
              </div>
            )}
            <p className="text-sm text-gray-600 mt-4">
              We respect your privacy and will never share your information. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}