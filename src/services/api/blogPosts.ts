
import { apiClient } from './client';

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string;
  tags?: string[];
  created_at: string;
  published_at: string;
  keyword?: string;
  author: string;
}

export const blogPostsApi = {
  async getAllBlogPosts(): Promise<BlogArticle[]> {
    try {
      const { data, error } = await apiClient.supabase
        .from('blog_articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },

  async getBlogPostBySlug(slug: string): Promise<BlogArticle> {
    try {
      const { data, error } = await apiClient.supabase
        .from('blog_articles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error);
        throw new Error(`Failed to fetch blog post with slug ${slug}`);
      }

      return data;
    } catch (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error);
      throw error;
    }
  }
};
