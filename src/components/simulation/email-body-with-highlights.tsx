// EmailBodyWithHighlights.tsx
import React, { useEffect, useRef } from 'react';
import { EmailRedFlag } from '@/types/email-simulation';

interface EmailBodyProps {
  htmlContent: string;
  redFlags: EmailRedFlag[];
  activeRedFlagId: string | null;
  onHighlightClick: (redFlagId: string) => void;
}

export function EmailBodyWithHighlights({ 
  htmlContent, 
  redFlags, 
  activeRedFlagId, 
  onHighlightClick 
}: EmailBodyProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Process and inject the content with highlights
  useEffect(() => {
    if (!contentRef.current) return;
    
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlContent;
    
    // Process each red flag
    redFlags.forEach(flag => {
      const textToFind = flag.highlightText;
      if (!textToFind) return;
      
      // Simple text replacement (a real implementation would use DOM parsing)
      const walkDOM = (node: Node) => {
        if (node.nodeType === 3) { // Text node
          const text = node.textContent || '';
          if (text.includes(textToFind)) {
            const span = document.createElement('span');
            span.className = 'potentially-suspicious';
            span.dataset.redFlagId = flag.id;
            span.textContent = textToFind;
            
            // If this flag is active, add the active class
            if (flag.id === activeRedFlagId) {
              span.classList.add('highlight-active');
            }
            
            // Replace text with the span
            const parts = text.split(textToFind);
            if (parts.length > 1) {
              const fragment = document.createDocumentFragment();
              fragment.appendChild(document.createTextNode(parts[0]));
              fragment.appendChild(span);
              fragment.appendChild(document.createTextNode(parts.slice(1).join(textToFind)));
              node.parentNode?.replaceChild(fragment, node);
            }
          }
        } else if (node.nodeType === 1) { // Element node
          Array.from(node.childNodes).forEach(walkDOM);
        }
      };
      
      walkDOM(tempContainer);
    });
    
    // Update the content
    contentRef.current.innerHTML = tempContainer.innerHTML;
    
    // Add click handlers
    const suspiciousElements = contentRef.current.querySelectorAll('.potentially-suspicious');
    suspiciousElements.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const redFlagId = (el as HTMLElement).dataset.redFlagId;
        if (redFlagId) {
          onHighlightClick(redFlagId);
        }
      });
    });
    
  }, [htmlContent, redFlags, activeRedFlagId, onHighlightClick]);
  
  return <div ref={contentRef} className="email-body" />;
}