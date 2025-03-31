import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} ScamSafe. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Educational platform for recognizing and avoiding scams.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex justify-center md:justify-end space-x-6">
              <Link 
                href="/privacy-policy" 
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Terms of Service
              </Link>
              <Link 
                href="/contact" 
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
        
        <div className="py-4 border-t border-gray-200 text-center md:text-left">
          <p className="text-xs text-gray-400">
            ScamSafe is an educational service and does not guarantee protection from all scams. 
            Always verify communications from financial institutions and businesses through official channels.
          </p>
        </div>
      </div>
    </footer>
  );
}