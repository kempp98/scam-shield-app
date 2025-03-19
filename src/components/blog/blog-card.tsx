'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block transition-transform hover:scale-[1.01]">
      <Card className="h-full overflow-hidden border hover:shadow-md transition-shadow">
        {post.coverImage && (
          <div className="relative h-48 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              {/* Placeholder if image fails to load */}
              <span className="text-gray-400">ScamShield Blog</span>
            </div>
            <Image 
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
          <CardDescription className="line-clamp-2">{post.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-sm text-gray-600 line-clamp-3">
            {/* Get just the first paragraph from the content */}
            {post.content.split('\n\n')[0]?.replace('#', '').trim()}
          </div>
        </CardContent>
        <CardFooter className="pt-0 text-xs text-gray-500 flex justify-between">
          <span>By {post.author}</span>
          <div className="flex items-center gap-2">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}