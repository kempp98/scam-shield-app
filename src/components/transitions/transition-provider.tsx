'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Context for managing transition state
type TransitionContextType = {
  isLoading: boolean;
};

const TransitionContext = createContext<TransitionContextType>({
  isLoading: false,
});

export const useTransition = () => useContext(TransitionContext);

export function TransitionProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  // Track route changes to trigger transitions
  useEffect(() => {
    // Combine pathname and search params (unused variable removed)
    
    const handleStart = () => {
      setIsLoading(true);
    };
    
    const handleComplete = () => {
      setIsLoading(false);
    };
    
    // Set loading to true for a brief period to trigger transitions
    handleStart();
    const timeout = setTimeout(() => {
      handleComplete();
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);
  
  return (
    <TransitionContext.Provider value={{ isLoading }}>
      {children}
    </TransitionContext.Provider>
  );
}