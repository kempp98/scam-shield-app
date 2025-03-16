'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
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
  
  if (!MEASUREMENT_ID) return null;
  
  return <GoogleTagManager gtmId={MEASUREMENT_ID} />;
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