'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  badge?: string;
}

interface NavbarProps {
  logo?: React.ReactNode;
  items: NavItem[];
  rightContent?: React.ReactNode;
  sticky?: boolean;
  transparent?: boolean;
}

export function Navbar({
  logo = <span className="font-bold text-xl text-primary">ScamSafe</span>,
  items = [],
  rightContent,
  sticky = false,
  transparent = false,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for transparent navbar
  useEffect(() => {
    if (!transparent) return;
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transparent]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Check if a link is active
  const isActive = (path: string) => {
    return pathname === path || 
      (path !== '/' && pathname?.startsWith(path));
  };

  // Get navbar background class based on props and scroll state
  const getNavbarBg = () => {
    if (transparent) {
      return scrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-sm' 
        : 'bg-transparent';
    }
    return 'bg-white border-b border-gray-200';
  };

  return (
    <nav 
      className={`${getNavbarBg()} ${sticky ? 'sticky top-0 z-50' : ''} transition-all duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {typeof logo === 'string' ? (
                <Link href="/" className="font-bold text-xl text-primary">
                  {logo}
                </Link>
              ) : (
                <Link href="/">
                  {logo}
                </Link>
              )}
            </div>
            
            {/* Desktop navigation */}
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(item.href)
                      ? 'border-primary text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                  {item.badge && (
                    <span className="ml-2 py-0.5 px-1.5 text-xs rounded-full bg-primary/10 text-primary">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Right side content (buttons, etc) */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {rightContent}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              {!mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute w-full bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="pt-2 pb-3 space-y-1">
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center justify-between">
                  {item.name}
                  {item.badge && (
                    <span className="py-0.5 px-1.5 text-xs rounded-full bg-primary/10 text-primary">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
          
          {/* Mobile version of right content */}
          {rightContent && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-4 flex items-center">
                {rightContent}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}