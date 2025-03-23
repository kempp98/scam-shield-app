import { getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '@/types/blog';

// Define the interface for page props
interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }
  
  // Enhanced metadata with Open Graph tags
  return {
    title: `${post.title} - ScamShield Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://scamshield.com/blog/${post.slug}`,
      images: [
        {
          url: post.coverImage || 'https://scamshield.com/images/default-social.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage || 'https://scamshield.com/images/default-social.jpg'],
    }
  };
}

// Schema.org data component for blog post
function BlogSchema({ post }: { post: BlogPost }) {
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

// CopyLinkButton component 
function CopyLinkButton() {
  return (
    <Button variant="outline" size="sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copy Link
    </Button>
  );
}

// Blog post page component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  const relatedPosts = await getRelatedPosts(post);
  
  return (
    <div className="container-padded py-12">
      <div className="mb-6">
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="group">
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
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Button>
        </Link>
      </div>
      
      {/* Render blog post directly here instead of using BlogDetail */}
      <div className="max-w-4xl mx-auto">
        {/* Add Schema.org structured data */}
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
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {}}
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
    </div>
  );
}