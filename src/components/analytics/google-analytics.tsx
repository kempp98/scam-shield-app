'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { GoogleTagManager, GoogleAnalytics as GA } from '@next/third-parties/google';

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Safe gtag function to prevent errors
function safeGtag(command: string, target: string, config?: Record<string, unknown> | string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(command, target, config);
  }
}

// Create a separate component that uses useSearchParams
function AnalyticsPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (!MEASUREMENT_ID) return;
    
    // Small delay to ensure gtag is loaded
    const timeoutId = setTimeout(() => {
      // Track page views when the route changes
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      safeGtag('config', MEASUREMENT_ID, {
        page_path: url,
      });
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]);
  
  return null;
}

export default function GoogleAnalytics() {
  if (!MEASUREMENT_ID) return null;
  
  return (
    <>
      {/* Add both GA and GTM for complete functionality */}
      <GA gaId={MEASUREMENT_ID} />
      <GoogleTagManager gtmId={MEASUREMENT_ID} />
      <Suspense fallback={null}>
        <AnalyticsPageTracker />
      </Suspense>
    </>
  );
}

// This adds the gtag script to the window object
declare global {
  interface Window {
    gtag: (
      command: string,
      target: string,
      config?: Record<string, unknown> | string
    ) => void;
  }
}

// Export a safe version of gtag for use elsewhere in the app
export function trackEvent(
  action: string,
  category: string,
  label: string,
  value?: number
) {
  safeGtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}