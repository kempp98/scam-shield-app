import { getAllPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog/blog-card';

export const metadata = {
  title: 'ScamShield Blog - Stay Informed About Text Scams',
  description: 'Read our latest articles on text scam prevention, awareness, and protection strategies.',
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
          <h1 className="text-4xl font-bold mb-4">ScamShield Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about the latest text scam techniques and learn how to protect 
            yourself and your loved ones with our expert articles.
          </p>
        </div>
        
        {featuredPost && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Featured Article</h2>
            <div className="max-w-4xl mx-auto">
              <BlogCard post={featuredPost} />
            </div>
          </div>
        )}
        
        <div>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        
        {/* Subscribe section */}
        <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Informed</h3>
          <p className="mb-6 text-gray-700">
            Subscribe to our newsletter to receive the latest scam prevention tips and alerts.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button 
              type="button"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}