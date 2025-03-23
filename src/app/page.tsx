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
          <Link href="/simulate">
            <Button variant="secondary" size="lg">
              Try Our Simulations
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" size="lg">
              Get Updates on our Launch
            </Button>
          </Link>
        </div>
      </section>

      {/* Statistics & Impact Section */}
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-6">The Growing Threat of Scams</h2>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
      Scam attempts are increasing at an alarming rate, but traditional education methods aren&apos;t keeping pace.
    </p>
    
    <div className="grid md:grid-cols-2 gap-10 mb-12">
      {/* Stats column */}
      <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-semibold mb-6 text-primary">By the Numbers</h3>
        <div className="space-y-6">
          <div>
            <p className="text-3xl font-bold">$8.8 billion</p>
            <p className="text-gray-600">Lost to scams by Americans in 2022 alone, a 30% increase from the previous year</p>
          </div>
          <div>
            <p className="text-3xl font-bold">2.4 million</p>
            <p className="text-gray-600">Fraud reports filed with the FTC in 2022, with the average person losing $1,000</p>
          </div>
          <div>
            <p className="text-3xl font-bold">70%</p>
            <p className="text-gray-600">Of Americans report feeling underprepared to identify sophisticated scams</p>
          </div>
        </div>
      </div>
      
      {/* Why traditional approaches fail */}
      <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-semibold mb-6 text-primary">Why Traditional Education Falls Short</h3>
        <ul className="space-y-4">
          <li className="flex">
            <span className="text-danger mr-2">✖</span>
            <span><strong>Generic warnings</strong> fail to prepare people for increasingly sophisticated, personalized scams</span>
          </li>
          <li className="flex">
            <span className="text-danger mr-2">✖</span>
            <span><strong>One-time trainings</strong> don&apos;t create lasting behavioral change or adaptable skills</span>
          </li>
          <li className="flex">
            <span className="text-danger mr-2">✖</span>
            <span><strong>Passive learning</strong> without practice doesn&apos;t develop real-world recognition abilities</span>
          </li>
          <li className="flex mt-6">
            <span className="text-success mr-2">✓</span>
            <span><strong>Research shows</strong> interactive simulations can improve scam detection ability by up to 40% compared to traditional methods</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div className="bg-primary/5 rounded-lg p-8 text-center">
      <h3 className="text-xl font-semibold mb-4">A Modern Approach to Scam Protection</h3>
      <p className="text-gray-700 max-w-3xl mx-auto">
        ScamSafe&apos;s simulation-based learning doesn&apos;t just tell you about scams—it lets you experience them safely, building the practical skills you need to protect yourself in real-world situations.
      </p>
    </div>
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