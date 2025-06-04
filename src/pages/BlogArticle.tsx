
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { blogPostsApi } from "@/services/api/blogPosts";
import ReactMarkdown from 'react-markdown';
import SEOHead from "@/components/seo/SEOHead";
import StructuredData from "@/components/seo/StructuredData";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { 
    data: article,
    isLoading, 
    error,
    isError 
  } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => blogPostsApi.getBlogPostBySlug(slug || ''),
    enabled: !!slug
  });

  // Fetch related blog posts for internal linking
  const { data: relatedPosts = [] } = useQuery({
    queryKey: ['relatedBlogPosts', article?.id],
    queryFn: () => blogPostsApi.getAllBlogPosts(),
    enabled: !!article,
    select: (posts) => posts.filter(post => post.id !== article?.id).slice(0, 3)
  });

  // Redirect to blog page if article not found
  useEffect(() => {
    if (!isLoading && !isError && !article) {
      navigate('/blog', { replace: true });
    }
  }, [article, isLoading, isError, navigate]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !article) {
    return <ErrorState error={error as Error} />;
  }

  const currentUrl = `${window.location.origin}/blog/${article.slug}`;
  const seoDescription = article.excerpt || article.content.substring(0, 160) + '...';

  return (
    <>
      <SEOHead 
        title={article.title}
        description={seoDescription}
      />
      
      <StructuredData 
        data={{
          type: 'BlogPosting',
          headline: article.title,
          description: seoDescription,
          image: article.cover_image_url,
          author: article.author,
          datePublished: article.published_at,
          dateModified: article.updated_at,
          url: currentUrl
        }}
      />

      <div className="min-h-screen bg-swimspot-drift-sand">
        {/* Hero Section with Article Cover */}
        <div className="relative h-[50vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('${article.cover_image_url}')`,
              filter: "brightness(0.7)"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <span className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(article.published_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                {article.author}
              </span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 mb-8">
              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-swimspot-blue-mist text-swimspot-blue-green text-sm px-3 py-1 rounded-full flex items-center"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Article content with markdown support */}
              <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-swimspot-blue-green prose-a:text-swimspot-burnt-coral">
                <ReactMarkdown>
                  {article.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* More from the blog section */}
            {relatedPosts.length > 0 && (
              <div className="max-w-3xl mx-auto mb-8">
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h3 className="font-serif text-2xl text-swimspot-blue-green mb-6">More from the Blog</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedPosts.map((post) => (
                      <Link 
                        key={post.id}
                        to={`/blog/${post.slug}`}
                        className="block p-4 border border-gray-200 rounded-lg hover:border-swimspot-blue-green transition-colors"
                      >
                        <h4 className="font-medium text-swimspot-blue-green mb-2 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {post.excerpt || post.content.substring(0, 100) + '...'}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(post.published_at).toLocaleDateString()}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Back to Blog button */}
            <div className="max-w-3xl mx-auto">
              <Button 
                asChild
                variant="outline" 
                className="border-swimspot-blue-green text-swimspot-blue-green hover:bg-swimspot-blue-green hover:text-white"
              >
                <Link to="/blog" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LoadingState = () => (
  <div className="min-h-screen bg-swimspot-drift-sand">
    <div className="relative h-[50vh] overflow-hidden">
      <Skeleton className="absolute inset-0" />
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12">
        <Skeleton className="h-16 w-2/3 mb-6" />
        <div className="flex flex-wrap items-center gap-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </div>
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="mb-8 flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-8 w-full mb-6" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-2/3 mb-8" />
          <Skeleton className="h-6 w-full mb-6" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-3/4 mb-4" />
        </div>
      </div>
    </div>
  </div>
);

const ErrorState = ({ error }: { error: Error }) => (
  <div className="min-h-screen bg-swimspot-drift-sand flex items-center justify-center">
    <div className="container mx-auto px-4 text-center">
      <h2 className="font-serif text-3xl text-swimspot-blue-green mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-6">
        {error?.message || "We couldn't load this article. It may have been removed or is temporarily unavailable."}
      </p>
      <Button 
        asChild
        className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90"
      >
        <Link to="/blog">
          Return to Blog
        </Link>
      </Button>
    </div>
  </div>
);

export default BlogArticle;
