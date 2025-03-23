'use client';

import React,  { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { BlogSchema } from '@/components/blog/blog-schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';



// Copy Link Button Component
function CopyLinkButton() {
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
};
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
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const url = window.location.href;
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            Facebook
          </Button>
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