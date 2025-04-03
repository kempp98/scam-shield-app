'use client';

import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

// Create context for tab state
type TabsContextValue = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
}

// Tabs container component
interface TabsProps {
  children: React.ReactNode;
  defaultIndex?: number;
  className?: string;
}

export function Tabs({ children, defaultIndex = 0, className }: TabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  return (
    <TabsContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      <div className={cn('w-full', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// Tab list component (container for tab buttons)
interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabList({ children, className }: TabListProps) {
  return (
    <div className={cn('flex border-b', className)}>
      {children}
    </div>
  );
}

// Individual tab button
interface TabProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

export function Tab({ children, index, className }: TabProps) {
  const { selectedIndex, setSelectedIndex } = useTabs();
  const isSelected = selectedIndex === index;

  return (
    <button
      type="button"
      className={cn(
        'px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-inset focus:ring-2 focus:ring-primary',
        isSelected 
          ? 'border-b-2 border-primary text-primary' 
          : 'text-gray-500 hover:text-gray-700',
        className
      )}
      onClick={() => setSelectedIndex(index)}
      role="tab"
      aria-selected={isSelected}
    >
      {children}
    </button>
  );
}

// Tab panel component (content area)
interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

export function TabPanel({ children, index, className }: TabPanelProps) {
  const { selectedIndex } = useTabs();
  const isSelected = selectedIndex === index;

  if (!isSelected) return null;

  return (
    <div 
      className={cn('pt-4', className)}
      role="tabpanel"
    >
      {children}
    </div>
  );
}
