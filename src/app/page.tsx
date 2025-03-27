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
          Your Shield Against <span className="text-gradient">Everyday Scams</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          We&apos;re here to help you protect yourself and your loved ones from scammers with friendly, 
          practical guidance and safe practice opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/learn">
            <Button variant="default" size="lg" className="font-medium">
              Start Your Journey
            </Button>
          </Link>
          <Link href="/simulate">
            <Button variant="secondary" size="lg" className="font-medium">
              Practice Safely
            </Button>
          </Link>
        </div>
      </section>

      {/* Real Stories Section - NEW personalized section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-16 -mx-4 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Real People, Real Protection</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-start mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg mr-4">
                  MS
                </div>
                <div>
                  <h3 className="font-medium text-lg">Maria S.</h3>
                  <p className="text-gray-600 text-sm">Retired Teacher, 67</p>
                </div>
              </div>
              <p className="italic text-gray-700">&quot;I almost lost $3,000 to a phone scammer claiming to be my grandson. After practicing with ScamSafe&apos;s simulations, I recognized the warning signs when it happened in real life.&quot;</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-start mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg mr-4">
                  JT
                </div>
                <div>
                  <h3 className="font-medium text-lg">James T.</h3>
                  <p className="text-gray-600 text-sm">College Student, 21</p>
                </div>
              </div>
              <p className="italic text-gray-700">&quot;I thought I was too smart to fall for scams until I tried ScamSafe&apos;s simulations. They showed me how sophisticated these scams have become and how to protect myself.&quot;</p>
            </div>
          </div>
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
                  <p className="text-gray-700">Lost by everyday people to scammers in 2024—money that could have gone to education, healthcare, or retirement.</p>
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
          
          <div className="bg-blue-50 rounded-lg p-8 text-center border border-blue-100">
            <h3 className="text-xl font-semibold mb-4">A Friendly Approach to Protection</h3>
            <p className="text-gray-700 max-w-3xl mx-auto">
              ScamSafe doesn&apos;t just tell you about scams—we help you experience them safely. It&apos;s like having a trusted friend guide you through potential dangers so you can recognize them when they really matter.
            </p>
          </div>
        </div>
      </section>

      {/* How We Help Section - Warmer descriptions */}
      <section className="py-14 bg-white rounded-xl mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">How We Support You</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 - More relatable */}
            <Card className="border border-gray-200 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-primary">Learn at Your Pace</CardTitle>
                <CardDescription>Quick, friendly lessons on scam safety</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Our bite-sized modules explain common scams in plain language, showing you exactly what to watch for—no technical jargon, just practical guidance you can use right away.</p>
              </CardContent>
            </Card>

            {/* Feature 2 - More relatable */}
            <Card className="border border-gray-200 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-primary">Practice Without Risk</CardTitle>
                <CardDescription>Safe environment to build confidence</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Try our realistic but completely safe simulations that let you experience scam attempts firsthand—so you&apos;ll recognize them instantly when they happen in your daily life.</p>
              </CardContent>
            </Card>

            {/* Feature 3 - More relatable */}
            <Card className="border border-gray-200 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-primary">Join Our Community</CardTitle>
                <CardDescription>You&apos;re not in this alone</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Connect with others learning to protect themselves, share experiences, and gain confidence knowing you have the knowledge to keep yourself and your loved ones safe from scammers.</p>
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
            Join our community and receive friendly updates on the latest scams and how to protect yourself and your loved ones.
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
                {isSubmitting ? 'Joining...' : 'Join Our Community'}
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