import { BlogPost } from '@/types/blog';
import posts from '@/data/blog/posts';

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  // In a real application, this would fetch from an API or database
  // For this MVP, we'll return the static data
  return posts;
}

/**
 * Get a specific blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = await getAllPosts();
  const post = allPosts.find(p => p.slug === slug);
  
  if (!post) {
    return null;
  }
  
  return post;
}

/**
 * Get related posts (posts with matching tags)
 */
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  
  // Filter out the current post and find posts with matching tags
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPost.id)
    .filter(post => post.tags.some(tag => currentPost.tags.includes(tag)))
    .slice(0, limit);
  
  return relatedPosts;
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}