'use client';

import React, {useState} from 'react';
import { Navbar } from './navbar';
import { Button } from './button';
import { SignupPopup } from './SignupPopup';

export function Header() {
  // Navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Learn', href: '/learn' },
    { name: 'Simulate', href: '/simulate' },
    { name: 'Blog', href: '/blog' },
  ];

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Right side content with signup button - fixed to remove asChild prop
  const rightContent = (
    <Button 
      variant="default" 
      size="default"
      onClick={() => setIsPopupOpen(true)}
    >
      Sign-Up For Updates
    </Button>

  );

  return (
    <header>
      <Navbar 
        items={navItems}
        rightContent={rightContent}
        sticky={true}
      />

      <SignupPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </header>
  );
}