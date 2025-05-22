
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogSection = () => {
  return (
    <section className="py-20 bg-swimspot-drift-sand/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-swimspot-blue-green mb-4 md:mb-0">Latest from Our Blog</h2>
          <Link 
            to="/blog" 
            className="flex items-center text-swimspot-burnt-coral hover:text-swimspot-burnt-coral/80 transition-colors"
          >
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-swimspot-drift-sand/30 p-6 rounded-xl">
            <div className="flex items-center text-xs text-gray-500 mb-3">May 2, 2025</div>
            <h3 className="font-serif text-xl font-medium text-swimspot-blue-green mb-3">
              The Surprising Health Benefits of Winter Swimming
            </h3>
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">
              Discover how embracing the cold waters during winter months can boost your immune system and provide mental clarity.
            </p>
            <Link 
              to="/blog" 
              className="text-swimspot-blue-green hover:text-swimspot-blue-green/80 font-medium flex items-center text-sm"
            >
              Read More
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="bg-swimspot-drift-sand/30 p-6 rounded-xl">
            <div className="flex items-center text-xs text-gray-500 mb-3">April 28, 2025</div>
            <h3 className="font-serif text-xl font-medium text-swimspot-blue-green mb-3">
              Top 5 Hidden Swimming Spots in East Amsterdam
            </h3>
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">
              Discover these lesser-known gems in Amsterdam East that locals love but tourists rarely find.
            </p>
            <Link 
              to="/blog" 
              className="text-swimspot-blue-green hover:text-swimspot-blue-green/80 font-medium flex items-center text-sm"
            >
              Read More
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="bg-swimspot-drift-sand/30 p-6 rounded-xl">
            <div className="flex items-center text-xs text-gray-500 mb-3">April 22, 2025</div>
            <h3 className="font-serif text-xl font-medium text-swimspot-blue-green mb-3">
              Swimming Safety: What to Know Before Taking a Dip
            </h3>
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">
              Essential safety tips for wild swimming in Amsterdam's waterways. Learn about currents and water quality.
            </p>
            <Link 
              to="/blog" 
              className="text-swimspot-blue-green hover:text-swimspot-blue-green/80 font-medium flex items-center text-sm"
            >
              Read More
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <Button 
            asChild
            variant="outline" 
            className="border-swimspot-blue-green text-swimspot-blue-green hover:bg-swimspot-blue-green hover:text-white"
          >
            <Link to="/blog">
              <BookOpen className="mr-2 h-5 w-5" />
              Visit Our Blog
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
