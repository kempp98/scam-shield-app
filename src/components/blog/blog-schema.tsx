// src/components/blog/blog-schema.tsx

'use client';

import { BlogPost } from '@/types/blog';

export function BlogSchema({ post }: { post: BlogPost }) {
  // Format the schema according to Schema.org Article type
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.coverImage,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'ScamShield',
      logo: {
        '@type': 'ImageObject',
        url: 'https://scamshield.com/images/logo.png'
      }
    },
    keywords: post.tags.join(', ')
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}