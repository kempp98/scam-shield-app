'use client';

import { useState } from 'react';
import { X } from 'lucide-react'; // Using lucide-react for icons, adjust if needed

interface SignupPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignupPopup({ isOpen, onClose }: SignupPopupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/newsletter-popup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage({ type: 'success', text: 'Thank you for signing up!' });
        setEmail(''); // Clear input on success
        // Optionally close popup after a delay
        setTimeout(onClose, 2000);
      } else {
        setMessage({ type: 'error', text: result.error || 'An error occurred. Please try again.' });
      }
    } catch (error) {
      console.error('SignupPopup submission error:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md m-4 relative transform transition-all duration-300 scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Stay Scam-Smart</h3>
        <p className="text-gray-600 mb-6">
        Stay connected with ScamSafe and learn how to avoid costly scams. 
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary transition-colors mb-4"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="w-full btn btn-primary py-2 text-lg" // Use existing button styles
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Email'}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-sm text-center ${message.type === 'success' ? 'text-success' : 'text-danger'}`}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}