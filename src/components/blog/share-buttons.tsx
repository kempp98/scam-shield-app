// src/components/blog/share-buttons.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  
  // Reset the copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  
  const handleCopyLink = async () => {
    try {
      const url = window.location.href;

      // Check if the Clipboard API is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url)
          .then(() => {
            setCopied(true);
          })
          .catch(err => {
            console.error('Failed to copy link:', err);
            fallbackCopyToClipboard(url);
          });
      } else {
        // Fallback method for browsers that don't support the Clipboard API
        fallbackCopyToClipboard(url);
      }
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };
  
  const fallbackCopyToClipboard = (text: string) => {
    try {
      // Create a temporary textarea element
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // Make it non-visible
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      // Execute the copy command
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
      } else {
        console.error('Fallback copy method failed');
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleCopyLink}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>
      {copied && (
        <span className="text-xs text-green-600 ml-2 animate-fade-in">
          Link copied to clipboard!
        </span>
      )}
    </>
  );
}

export function FacebookShareButton() {
  const handleShare = () => {
    try {
      const url = window.location.href;
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, 
        '_blank', 
        'width=600,height=400,resizable=yes,scrollbars=yes,status=yes'
      );
    } catch (err) {
      console.error('Failed to open share dialog:', err);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleShare}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
      Facebook
    </Button>
  );
}