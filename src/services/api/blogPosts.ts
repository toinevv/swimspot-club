
import { apiClient } from './client';

export const blogPostsApi = {
  async getAllBlogPosts() {
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

  async getBlogPostBySlug(slug: string) {
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
