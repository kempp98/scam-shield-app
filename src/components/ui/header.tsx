'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from './navbar';
import { Button } from './button';

export function Header() {
  // Navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Learn', href: '/learn' },
    { name: 'Simulate', href: '/simulate' },
  ];
  
  // Right side content with signup button - fixed to remove asChild prop
  const rightContent = (
    <Link href="/signup">
      <Button 
        variant="default" 
        size="default"
      >
        Get Early Access
      </Button>
    </Link>
  );

  return (
    <header>
      <Navbar 
        items={navItems}
        rightContent={rightContent}
        sticky={true}
      />
    </header>
  );
}