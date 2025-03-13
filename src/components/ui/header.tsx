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
  
  // Right side content with signup button
  const rightContent = (
    <Button 
      variant="default" 
      size="default"
      asChild
    >
      <Link href="/signup">
        Get Early Access
      </Link>
    </Button>
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