'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error handler:', error);
    }
  }, [error]);

  return (
    <div className="container-padded py-20 text-center max-w-2xl mx-auto">
      <div className="mb-6">
        <svg
          className="w-20 h-20 mx-auto text-danger"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-8">
        We&apos;re sorry for the inconvenience. Please try again or return to the homepage.
      </p>
      <div className="flex gap-4 justify-center">
        <Button onClick={reset}>Try Again</Button>
        <Button
          variant="outline"
          onClick={() => window.location.href = '/'}
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
}
