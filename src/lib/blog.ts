import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types/blog';
import { logger } from './logger';

// Path to blog content directory
const BLOG_DIR = path.join(process.cwd(), 'src/data/blog');

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  // Ensure directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    logger.warn(`Blog directory not found: ${BLOG_DIR}`);
    return [];
  }

  // Get all .md files from the blog directory
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));

  // Read and parse each file
  const posts = files.map(file => {
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse frontmatter and content
    const { data, content } = matter(fileContent);

    // Ensure all required fields are present
    if (!data.id || !data.slug || !data.title) {
      logger.warn(`Blog post ${file} is missing required frontmatter fields`);
    }
    
    // Create blog post object
    const post: BlogPost = {
      id: String(data.id),
      slug: String(data.slug),
      title: String(data.title),
      description: String(data.description || ''),
      content: content,
      coverImage: data.coverImage,
      author: String(data.author || 'Unknown'),
      date: String(data.date || new Date().toLocaleDateString()),
      readTime: String(data.readTime || ''),
      tags: Array.isArray(data.tags) ? data.tags : [],
    };
    
    return post;
  });
  
  // Sort posts by date, newest first
  return posts.sort((a, b) => {
    // Try to parse dates (assumes format like "March 12, 2025")
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    // If dates are valid, sort by date
    if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
      return dateB.getTime() - dateA.getTime();
    }
    
    // Fallback to string comparison
    return a.date > b.date ? -1 : 1;
  });
}

/**
 * Get a specific blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    logger.debug(`Looking for post with slug: "${slug}"`);

    // Check if slug is empty or invalid
    if (!slug || typeof slug !== 'string') {
      logger.error(`Invalid slug: ${slug}`);
      return null;
    }

    // Get all posts
    const allPosts = await getAllPosts();

    // Find the post with matching slug (case-insensitive)
    const post = allPosts.find(p =>
      p.slug.toLowerCase() === slug.toLowerCase()
    );

    if (!post) {
      logger.warn(`No post found with slug "${slug}"`);
      // Log all available slugs for debugging
      logger.debug('Available slugs:', allPosts.map(p => p.slug));
      return null;
    }

    logger.debug(`Found post: ${post.title}`);
    return post;
  } catch (error) {
    logger.error(`Error getting post by slug "${slug}":`, error);
    return null;
  }
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
  // Case-insensitive tag matching
  return allPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique tags from posts
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tagsSet = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet).sort();
}