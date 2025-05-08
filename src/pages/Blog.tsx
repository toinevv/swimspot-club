
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";

const Blog = () => {
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-swimspot-blue-green mb-10">Featured Post</h2>
          
          <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-md">
            <div className="h-80 overflow-hidden">
              <img 
                src="https://source.unsplash.com/photo-1534183771156-e664948703c6" 
                alt="Winter Swimming Benefits" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  May 2, 2025
                </span>
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Lisa van der Meer
                </span>
              </div>
              <h3 className="font-serif text-2xl font-medium text-swimspot-blue-green mb-4">
                The Surprising Health Benefits of Winter Swimming in Amsterdam
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                Discover how embracing the cold waters during winter months can boost your immune system, 
                improve circulation, and provide mental clarity. Our guide to safe and enjoyable winter 
                swimming in Amsterdam's natural waters.
              </p>
              <Button 
                asChild
                className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90"
              >
                <Link to="/blog/winter-swimming-benefits">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-swimspot-blue-green mb-12">Recent Posts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-swimspot-blue-green mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="text-swimspot-burnt-coral hover:text-swimspot-burnt-coral/80 font-medium flex items-center text-sm"
                  >
                    Read Article
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
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

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Hidden Swimming Spots in East Amsterdam",
    slug: "hidden-spots-east-amsterdam",
    excerpt: "Discover these lesser-known gems in Amsterdam East that locals love but tourists rarely find. Perfect for those seeking a peaceful swim away from crowds.",
    image: "https://source.unsplash.com/photo-1475070929565-c985b496cb9f",
    date: "April 28, 2025",
    author: "Johan Visser"
  },
  {
    id: 2,
    title: "Swimming Safety: What to Know Before Taking a Dip",
    slug: "swimming-safety-guide",
    excerpt: "Essential safety tips for wild swimming in Amsterdam's waterways. Learn about currents, water quality monitoring, and how to spot potential hazards.",
    image: "https://source.unsplash.com/photo-1519315901367-f34ff9154487",
    date: "April 22, 2025",
    author: "Emma Bakker"
  },
  {
    id: 3,
    title: "The History of Amsterdam's Canals as Swimming Spots",
    slug: "history-amsterdam-swimming-canals",
    excerpt: "From prohibited to promoted: the fascinating evolution of swimming in Amsterdam's historic canal system and how water quality improvements made it possible.",
    image: "https://source.unsplash.com/photo-1520967824495-b529aeba26df",
    date: "April 15, 2025",
    author: "Thomas de Vries"
  }
];

export default Blog;
