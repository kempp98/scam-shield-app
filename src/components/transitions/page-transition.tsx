'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransition } from './transition-provider';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const { isLoading } = useTransition();
  
  return (
    <AnimatePresence mode="wait">
      {!isLoading ? (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full flex items-center justify-center py-16"
        >
          <LoadingSpinner />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Simple loading spinner component
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  );
}