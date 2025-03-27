// src/components/educational/card-types/DragDropCard.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContentSection } from '@/lib/education';

interface DragDropResult {
    correct: boolean;
    matches: Record<string, string>;
  }

interface DragDropCardProps {
    section: ContentSection;
    onComplete?: (result: DragDropResult) => void;
  }

export function DragDropCard({ section, onComplete }: DragDropCardProps) {
  const { dragItems, dropZones } = section.interactionData || { dragItems: [], dropZones: [] };
  
  const [dragging, setDragging] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Reset available items when section changes
  useEffect(() => {
    setPlacements({});
    setCompleted(false);
    setIsCorrect(null);
  }, [section]);
  
  const handleDragStart = (itemId: string) => {
    setDragging(itemId);
  };
  
  const handleDrop = (zoneId: string) => {
    if (dragging) {
      // Update placements
      setPlacements({
        ...placements,
        [dragging]: zoneId
      });
      setDragging(null);
    }
  };
  
  const handleCheck = () => {
    // Get all placed items
    const placedItems = Object.keys(placements);
    
    // Check if all items are correctly placed
    let allCorrect = true;
    
    placedItems.forEach(itemId => {
      const item = dragItems?.find(i => i.id === itemId);
      const zone = dropZones?.find(z => z.id === placements[itemId]);
      
      if (item && zone && item.category !== zone.acceptsCategory) {
        allCorrect = false;
      }
    });
    
    setIsCorrect(allCorrect);
    setCompleted(true);
    
    if (onComplete) {
      onComplete({
        correct: allCorrect,
        matches: placements
      });
    }
  };
  
  const reset = () => {
    setPlacements({});
    setCompleted(false);
    setIsCorrect(null);
  };
  
  // Get items that haven't been placed yet
  const availableItems = dragItems?.filter(item => !Object.keys(placements).includes(item.id)) || [];
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
        <p className="mb-6">{section.body}</p>
        
        {/* Available items */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Items to categorize:</h3>
          <div className="flex flex-wrap gap-2">
            {availableItems.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                className="p-2 bg-gray-100 rounded border border-gray-300 cursor-move hover:bg-gray-200"
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
        
        {/* Drop zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {dropZones?.map(zone => {
            // Find items placed in this zone
            const zoneItems = Object.entries(placements)
              .filter(([, zoneId]) => zoneId === zone.id)
              .map(([itemId]) => dragItems?.find(item => item.id === itemId))
              .filter(Boolean);
            
            return (
              <div
                key={zone.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(zone.id)}
                className={`p-4 rounded-md border-2 border-dashed min-h-[100px] ${
                  dragging ? 'border-primary bg-primary/5' : 'border-gray-300'
                }`}
              >
                <h4 className="font-medium mb-2">{zone.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {zoneItems.map(item => item && (
                    <div 
                      key={item.id}
                      className={`p-2 rounded ${
                        completed 
                          ? (item.category === zone.acceptsCategory 
                            ? 'bg-success/10 border border-success' 
                            : 'bg-danger/10 border border-danger')
                          : 'bg-primary/10 border border-primary'
                      }`}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Results and control buttons */}
        {Object.keys(placements).length > 0 && !completed && (
          <Button onClick={handleCheck} className="w-full">
            Check Answers
          </Button>
        )}
        
        {completed && (
          <div className="mt-4">
            <div className={`p-4 rounded-md mb-4 ${
              isCorrect 
                ? 'bg-success/10 text-success' 
                : 'bg-danger/10 text-danger'
            }`}>
              <p className="font-medium">
                {isCorrect 
                  ? 'Great job! All items are correctly categorized.' 
                  : 'Some items are incorrectly categorized. Try again!'}
              </p>
            </div>
            
            <Button onClick={reset} variant="outline" className="w-full">
              Reset Activity
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}