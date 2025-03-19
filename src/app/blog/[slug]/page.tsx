import { getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { BlogDetail } from '@/components/blog/blog-detail';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }
  
  return {
    title: `${post.title} - ScamShield Blog`,
    description: post.description,
  };
}

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
      
      <BlogDetail post={post} relatedPosts={relatedPosts} />
    </div>
  );
}