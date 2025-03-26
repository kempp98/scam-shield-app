// src/components/educational/card-types/ExpandableCard.tsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ContentSection } from '@/lib/education';

interface ExpandableCardProps {
  section: ContentSection;
}

export function ExpandableCard({ section }: ExpandableCardProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const { expandableItems } = section.interactionData || { expandableItems: [] };
  
  const toggleItem = (itemId: string) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
        <p className="mb-6">{section.body}</p>
        
        <div className="space-y-3">
          {expandableItems?.map(item => (
            <div key={item.id} className="border rounded-md overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex justify-between items-center p-4 font-medium text-left focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <span>{item.title}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${expandedItems.includes(item.id) ? 'transform rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              {expandedItems.includes(item.id) && (
                <div className="p-4 bg-gray-50 border-t">
                  <p>{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}