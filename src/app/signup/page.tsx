'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { submitSignupForm } from '@/lib/feedback-service';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    concernLevel: 3, // Default to middle value
    paymentWillingness: '', // Default to empty
    betaTester: '' // Default to empty
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      concernLevel: parseInt(e.target.value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      setSubmitResult({
        success: false,
        message: 'Email is required'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitSignupForm({
        name: formData.name || undefined,
        email: formData.email,
        concernLevel: formData.concernLevel,
        paymentWillingness: formData.paymentWillingness,
        betaTester: formData.betaTester
      });
      
      if (result.success) {
        setSubmitResult({
          success: true,
          message: 'Thank you for joining our waitlist!'
        });
        
        // Reset the form
        setFormData({
          name: '',
          email: '',
          concernLevel: 3,
          paymentWillingness: '',
          betaTester: ''
        });
      } else {
        setSubmitResult({
          success: false,
          message: result.error || 'Failed to submit. Please try again.'
        });
      }
    } catch (err) {
      // Convert the error to a string message
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      
      setSubmitResult({
        success: false,
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get label text for concern level
  const getConcernLevelLabel = (level: number) => {
    switch(level) {
      case 1: return 'Not concerned';
      case 2: return 'Slightly concerned';
      case 3: return 'Moderately concerned';
      case 4: return 'Very concerned';
      case 5: return 'Extremely concerned';
      default: return '';
    }
  };

  return (
    <div className="container-padded py-12">
      <div className="max-w-md mx-auto">
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Get Early Access</CardTitle>
            <CardDescription>
              Be among the first to experience ScamSafe when we launch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input 
                  id="name" 
                  name="name"
                  type="text" 
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-danger">*</span>
                </label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="you@example.com" 
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Concern level slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How concerned are you about fraud and financial scams?
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={formData.concernLevel}
                    onChange={handleRangeChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Not concerned</span>
                    <span>Extremely concerned</span>
                  </div>
                  <div className="text-center font-medium text-primary">
                    {getConcernLevelLabel(formData.concernLevel)}
                  </div>
                </div>
              </div>
              
              {/* Payment willingness */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Would you be willing to pay a small fee for up-to-date, innovative scam education content?
                </label>
                <div className="space-y-2">
                  {['Yes', 'No', 'For the right price', 'Never!!'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="paymentWillingness"
                        value={option}
                        checked={formData.paymentWillingness === option}
                        onChange={() => handleRadioChange('paymentWillingness', option)}
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Beta tester interest */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Are you interested in being a beta tester for new features and content?
                </label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="betaTester"
                        value={option}
                        checked={formData.betaTester === option}
                        onChange={() => handleRadioChange('betaTester', option)}
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Form submission feedback */}
              {submitResult.message && (
                <div className={`p-3 rounded-md ${
                  submitResult.success 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitResult.message}
                </div>
              )}
              
              {/* Submit button */}
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center pt-2">
                We respect your privacy and will never share your information with third parties.
              </p>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            ScamSafe is currently in development. By signing up, you&apos;ll be notified when we launch and may be invited to participate in beta testing.
          </p>
        </div>
      </div>
    </div>
  );
}