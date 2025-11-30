// src/components/educational/card-types/BasicCard.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ContentSection } from '@/lib/education';
import ReactMarkdown from 'react-markdown';

interface BasicCardProps {
  section: ContentSection;
}

export function BasicCard({ section }: BasicCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
        <div className="prose">
          <ReactMarkdown>{section.body}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}