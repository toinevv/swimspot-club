
import { supabase } from '@/integrations/supabase/client';

export type BlogArticle = {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string;
  tags: string[];
  created_at: string;
  published_at: string;
  keyword?: string | null;
  author: string;
};

export const blogPostsApi = {
  getAllBlogPosts: async (): Promise<BlogArticle[]> => {
    const { data, error } = await supabase
      .from('blog_articles')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }

    return data || [];
  },

  getBlogPostBySlug: async (slug: string): Promise<BlogArticle | null> => {
    const { data, error } = await supabase
      .from('blog_articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned - article not found
        return null;
      }
      console.error('Error fetching blog post:', error);
      throw error;
    }

    return data;
  }
};
