
import { api } from '@/services/api';

interface SitemapUrl {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export const generateSitemap = async (): Promise<string> => {
  const baseUrl = window.location.origin;
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls: SitemapUrl[] = [
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      url: `${baseUrl}/groups`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.6'
    },
    {
      url: `${baseUrl}/blog`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.6'
    }
  ];

  // Add city-specific pages from database
  try {
    const cities = await api.getAllCities();
    cities.forEach(city => {
      urls.push({
        url: `${baseUrl}/${city.slug}`,
        lastmod: currentDate,
        changefreq: 'daily',
        priority: city.featured ? '0.8' : '0.7'
      });
    });
  } catch (error) {
    console.error("Error fetching cities for sitemap:", error);
  }

  // Add blog posts to sitemap
  try {
    const blogPosts = await api.getAllBlogPosts();
    blogPosts.forEach(post => {
      urls.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastmod: new Date(post.published_at).toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.6'
      });
    });
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
  }

  // Add swim spots to sitemap (for individual spot pages)
  try {
    const swimSpots = await api.getAllSwimSpots();
    swimSpots.forEach(spot => {
      urls.push({
        url: `${baseUrl}/spot/${spot.id}`,
        lastmod: new Date(spot.updated_at || spot.created_at || '').toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.5'
      });
    });
  } catch (error) {
    console.error("Error fetching swim spots for sitemap:", error);
  }

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xmlContent;
};

export const downloadSitemap = async () => {
  const sitemapContent = await generateSitemap();
  const blob = new Blob([sitemapContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};
