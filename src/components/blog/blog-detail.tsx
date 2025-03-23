
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { BlogSchema } from '@/components/blog/blog-schema';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import { CopyLinkButton, FacebookShareButton } from './share-buttons';



// Copy Link Button Component
interface BlogDetailProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

export function BlogDetail({ post, relatedPosts = [] }: BlogDetailProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <BlogSchema post={post} />
      {/* Post header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center text-gray-600 gap-x-4 gap-y-2">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">
              {post.author.charAt(0)}
            </div>
            <span>{post.author}</span>
          </div>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Featured image */}
      {post.coverImage && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Post content */}
      <div className="prose prose-blue max-w-none mb-12">
        <ReactMarkdown
          components={{
            h1: ({ ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
            h2: ({ ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-primary" {...props} />,
            h3: ({ ...props }) => <h3 className="text-xl font-medium mt-5 mb-2" {...props} />,
            p: ({ ...props }) => <p className="mb-4 text-gray-700" {...props} />,
            ul: ({ ...props }) => <ul className="list-disc pl-5 mb-4 text-gray-700" {...props} />,
            ol: ({ ...props }) => <ol className="list-decimal pl-5 mb-4 text-gray-700" {...props} />,
            li: ({ ...props }) => <li className="mb-1" {...props} />,
            blockquote: ({ ...props }) => (
              <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-gray-600" {...props} />
            ),
            a: ({ ...props }) => (
              <a className="text-primary hover:underline" {...props} />
            ),
            strong: ({ ...props }) => <strong className="font-semibold" {...props} />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Share buttons */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold mb-4">Share this article</h3>
        <div className="flex gap-2 items-center">
          <FacebookShareButton />
          <CopyLinkButton />
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <h3 className="text-xl font-semibold mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <Card key={relatedPost.id} className="hover:shadow-md transition-shadow">
                <Link href={`/blog/${relatedPost.slug}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">{relatedPost.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 line-clamp-2">{relatedPost.description}</p>
                    <div className="mt-2 text-xs text-gray-400 flex justify-between">
                      <span>{relatedPost.author}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}