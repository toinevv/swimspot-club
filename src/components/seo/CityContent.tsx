
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CityData } from '@/utils/cityData';
import { api } from '@/services/api';

interface CityContentProps {
  cityData: CityData;
  spotCount?: number;
}

const CityContent = ({ cityData, spotCount }: CityContentProps) => {
  // Fetch related blog posts for the city
  const { data: relatedPosts = [] } = useQuery({
    queryKey: ['cityBlogPosts', cityData.slug],
    queryFn: async () => {
      const allPosts = await api.getAllBlogPosts();
      // Filter posts that mention the city name in title or content
      return allPosts.filter(post => 
        post.title.toLowerCase().includes(cityData.displayName.toLowerCase()) ||
        post.content.toLowerCase().includes(cityData.displayName.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(cityData.displayName.toLowerCase())))
      ).slice(0, 3);
    }
  });

  return (
    <section className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-6 mt-4 mx-4 mb-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-swimspot-blue-green mb-3">
          Wild Swimming in {cityData.displayName}
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          {cityData.description}
        </p>
        {spotCount && spotCount > 0 && (
          <p className="text-sm text-gray-600 mb-4">
            Currently showing {spotCount} swim spots in {cityData.displayName}. 
            Use the map above to explore locations, check details, and read community reviews.
          </p>
        )}

        {/* Related blog posts section */}
        {relatedPosts.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-swimspot-blue-green mb-3">
              Related Articles about {cityData.displayName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {relatedPosts.map((post) => (
                <Link 
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="block p-3 bg-white/60 rounded-lg border hover:border-swimspot-blue-green transition-colors"
                >
                  <h4 className="font-medium text-swimspot-blue-green text-sm mb-1 line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {post.excerpt || post.content.substring(0, 80) + '...'}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-swimspot-drift-sand/30 text-swimspot-blue-green text-sm rounded-full">
            Wild Swimming
          </span>
          <span className="px-3 py-1 bg-swimspot-drift-sand/30 text-swimspot-blue-green text-sm rounded-full">
            {cityData.displayName}
          </span>
          <span className="px-3 py-1 bg-swimspot-drift-sand/30 text-swimspot-blue-green text-sm rounded-full">
            Netherlands
          </span>
        </div>
      </div>
    </section>
  );
};

export default CityContent;
