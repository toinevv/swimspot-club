
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { blogPostsApi, BlogArticle } from "@/services/api/blogPosts";

const Blog = () => {
  const { data: blogPosts, isLoading, error } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: blogPostsApi.getAllBlogPosts
  });

  return (
    <div className="min-h-screen bg-swimspot-drift-sand">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://source.unsplash.com/photo-1519817650390-64a93db51149')",
            filter: "brightness(0.7)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-swimspot-blue-green/80 to-transparent" />
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 max-w-3xl">
            SwimSpot Blog
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl">
            Stories, tips, and insights from the Amsterdam wild swimming community.
          </p>
        </div>
      </div>

      {/* Featured Post */}
      {isLoading ? (
        <FeaturedPostSkeleton />
      ) : error ? (
        <ErrorDisplay />
      ) : blogPosts && blogPosts.length > 0 ? (
        <FeaturedPost post={blogPosts[0]} />
      ) : (
        <NoPostsDisplay />
      )}

      {/* Recent Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-swimspot-blue-green mb-12">Recent Posts</h2>
          
          {isLoading ? (
            <RecentPostsSkeleton />
          ) : error ? (
            <ErrorDisplay />
          ) : blogPosts && blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Skip the first post (featured) and display the rest */}
              {blogPosts.slice(1).map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <NoPostsDisplay />
          )}
          
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              className="border-swimspot-blue-green text-swimspot-blue-green hover:bg-swimspot-blue-green hover:text-white"
            >
              View All Posts
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-swimspot-blue-mist">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-swimspot-blue-green mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Get the latest swimming spots, community events, and water quality updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-swimspot-blue-green"
              />
              <Button className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeaturedPost = ({ post }: { post: BlogArticle }) => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl text-center text-swimspot-blue-green mb-10">Featured Post</h2>
      
      <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-md">
        <div className="h-80 overflow-hidden">
          <img 
            src={post.cover_image_url} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author}
            </span>
          </div>
          <h3 className="font-serif text-2xl font-medium text-swimspot-blue-green mb-4">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-6 line-clamp-3">
            {post.content.split('\n')[0]}
          </p>
          <Button 
            asChild
            className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90"
          >
            <Link to={`/blog/${post.slug}`}>
              Read More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const BlogPostCard = ({ post }: { post: BlogArticle }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
    <div className="h-48 overflow-hidden">
      <img 
        src={post.cover_image_url} 
        alt={post.title} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
        <span className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <span className="flex items-center">
          <User className="h-3 w-3 mr-1" />
          {post.author}
        </span>
      </div>
      <h3 className="font-serif text-xl font-medium text-swimspot-blue-green mb-3">{post.title}</h3>
      <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.content.split('\n')[0]}</p>
      <Link 
        to={`/blog/${post.slug}`} 
        className="text-swimspot-burnt-coral hover:text-swimspot-burnt-coral/80 font-medium flex items-center text-sm"
      >
        Read Article
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  </div>
);

// Loading and error states
const FeaturedPostSkeleton = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl text-center text-swimspot-blue-green mb-10">Featured Post</h2>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-md">
        <Skeleton className="h-80 w-full" />
        <div className="p-8">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-6" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  </section>
);

const RecentPostsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3].map((item) => (
      <div key={item} className="bg-white rounded-xl overflow-hidden shadow-md">
        <Skeleton className="h-48 w-full" />
        <div className="p-6">
          <div className="flex items-center gap-4 mb-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-6 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3 mb-4" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    ))}
  </div>
);

const ErrorDisplay = () => (
  <div className="py-16 text-center">
    <div className="container mx-auto px-4">
      <p className="text-red-500 mb-4">Something went wrong while loading blog posts. Please try again later.</p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </div>
  </div>
);

const NoPostsDisplay = () => (
  <div className="py-16 text-center">
    <div className="container mx-auto px-4">
      <p className="text-gray-500 mb-4">No blog posts found.</p>
    </div>
  </div>
);

export default Blog;
