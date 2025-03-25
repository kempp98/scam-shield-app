// app/blog/page.tsx - Replace the current content with this
import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NewsletterForm } from '@/components/blog/newsletter-form';

export const metadata = {
  title: 'ScamSafe Blog - Stay Informed About Modern Scams',
  description: 'Read our latest articles on scam prevention, awareness, and protection strategies.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  
  // If we have featured posts, we could highlight them here
  const featuredPost = posts[0]; // Just use the first post as featured for now
  const regularPosts = posts.slice(1);
  
  return (
    <div className="container-padded py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">ScamSafe Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about the latest scam techniques and learn how to protect 
            yourself and your loved ones with our expert articles.
          </p>
        </div>
        
        {featuredPost && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Featured Article</h2>
            <div className="max-w-4xl mx-auto">
              <Link href={`/blog/${featuredPost.slug}`} className="block transition-transform hover:scale-[1.01]">
                <Card className="h-full overflow-hidden border hover:shadow-md transition-shadow">
                  {featuredPost.coverImage && (
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image 
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {featuredPost.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl line-clamp-2">{featuredPost.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{featuredPost.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm text-gray-600 line-clamp-3">
                      {featuredPost.content.split('\n\n')[0]?.replace('#', '').trim()}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 text-xs text-gray-500 flex justify-between">
                    <span>By {featuredPost.author}</span>
                    <div className="flex items-center gap-2">
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          </div>
        )}
        
        <div>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block transition-transform hover:scale-[1.01]">
                <Card className="h-full overflow-hidden border hover:shadow-md transition-shadow">
                  {post.coverImage && (
                    <div className="relative h-48 w-full overflow-hidden">
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
            ))}
          </div>
        </div>

        <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Informed</h3>
          <p className="mb-6 text-gray-700">
            Subscribe to our newsletter to receive the latest scam prevention tips and alerts.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  );
}