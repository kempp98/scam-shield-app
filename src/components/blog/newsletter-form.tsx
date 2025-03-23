'use client';

import { useState } from 'react';
import { subscribeToNewsletter } from '@/lib/feedback-service';

export function NewsletterForm() {
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
        message: 'Email is required'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        setSubmitResult({
          success: true,
          message: 'Thank you for subscribing! We\'ll keep you updated.'
        });
        
        // Reset the form
        setEmail('');
      } else {
        setSubmitResult({
          success: false,
          message: result.error || 'Failed to subscribe. Please try again.'
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-md mx-auto flex gap-2">
        <input 
          type="email" 
          placeholder="Your email address" 
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={email}
          onChange={handleInputChange}
          required
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
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
    </form>
  );
}