
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Loader2, ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogContent from "@/components/blog/BlogContent";
import SEOHead from "@/components/seo/SEOHead";
import StructuredData from "@/components/seo/StructuredData";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => api.getBlogPostBySlug(slug!),
    enabled: !!slug,
  });

  const { data: relatedPosts = [] } = useQuery({
    queryKey: ['relatedBlogPosts', slug],
    queryFn: async () => {
      if (!post) return [];
      const allPosts = await api.getAllBlogPosts();
      return allPosts
        .filter(p => p.slug !== slug && p.tags?.some(tag => post.tags?.includes(tag)))
        .slice(0, 3);
    },
    enabled: !!post,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-swimspot-blue-green" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-swimspot-blue-green mb-2">Article not found</h2>
          <p className="text-gray-600 mb-4">The article you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/blog")} className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const seoTitle = `${post.title} - SwimSpot Blog`;
  const seoDescription = post.content.substring(0, 160) + '...';
  const currentUrl = `${window.location.origin}/blog/${post.slug}`;

  return (
    <>
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
      />
      
      <StructuredData 
        data={{
          type: 'BlogPosting',
          headline: post.title,
          description: seoDescription,
          image: post.cover_image_url,
          author: post.author,
          datePublished: post.published_at,
          dateModified: post.published_at,
          url: currentUrl
        }}
      />

      <div className="min-h-screen bg-swimspot-drift-sand">
        {/* Hero Section */}
        <div className="relative h-[40vh] md:h-[50vh]">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Back button */}
          <div className="absolute top-4 left-4">
            <Button
              onClick={() => navigate("/blog")}
              variant="outline"
              className="flex items-center gap-2 bg-black/30 backdrop-blur-sm text-white border-white/20 hover:bg-black/40"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container mx-auto max-w-4xl">
              <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.published_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <div className="prose prose-lg max-w-none">
              <BlogContent htmlContent={post.content} />
            </div>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium text-swimspot-blue-green mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-swimspot-drift-sand/50 text-swimspot-blue-green rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* More from the blog */}
          {relatedPosts.length > 0 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-serif text-swimspot-blue-green mb-6">More from the Blog</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                    className="cursor-pointer group"
                  >
                    <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                      <img
                        src={relatedPost.cover_image_url}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="font-medium text-swimspot-blue-green mb-2 group-hover:underline">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {relatedPost.content.substring(0, 120) + '...'}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogArticle;
