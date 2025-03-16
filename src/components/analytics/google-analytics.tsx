'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Create a separate component that uses useSearchParams
function AnalyticsPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (!MEASUREMENT_ID) return;
    
    // Track page views when the route changes
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    window.gtag('config', MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);
  
  return null;
}

export default function GoogleAnalytics() {
  if (!MEASUREMENT_ID) return null;
  
  return (
    <>
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