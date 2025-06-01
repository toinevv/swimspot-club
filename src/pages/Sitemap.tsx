
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink } from "lucide-react";
import { generateSitemap, downloadSitemap } from "@/utils/sitemapGenerator";
import { api } from "@/services/api";

const Sitemap = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { data: cities = [] } = useQuery({
    queryKey: ['cities'],
    queryFn: () => api.getAllCities()
  });

  const handleViewSitemap = async () => {
    try {
      setIsGenerating(true);
      const sitemapContent = await generateSitemap();
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`<pre>${sitemapContent}</pre>`);
        newWindow.document.title = 'SwimSpot Sitemap';
      }
    } catch (error) {
      console.error("Error generating sitemap:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadSitemap = async () => {
    try {
      setIsGenerating(true);
      await downloadSitemap();
    } catch (error) {
      console.error("Error downloading sitemap:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-swimspot-drift-sand py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-medium text-swimspot-blue-green mb-4">
            SwimSpot Sitemap
          </h1>
          <p className="text-gray-600 text-lg">
            Complete list of all pages on SwimSpot for search engine optimization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-swimspot-blue-green">Generate Sitemap</CardTitle>
              <CardDescription>
                Download the sitemap.xml file for Google Search Console
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleDownloadSitemap} 
                className="w-full"
                disabled={isGenerating}
              >
                <Download className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Download sitemap.xml"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleViewSitemap} 
                className="w-full"
                disabled={isGenerating}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "View Sitemap"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-swimspot-blue-green">SEO Instructions</CardTitle>
              <CardDescription>
                Steps to submit your sitemap to Google
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Download the sitemap.xml file</li>
                <li>Go to Google Search Console</li>
                <li>Select your website property</li>
                <li>Navigate to Sitemaps section</li>
                <li>Upload the sitemap.xml file</li>
                <li>Monitor indexing status</li>
              </ol>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-swimspot-blue-green">All Pages</CardTitle>
            <CardDescription>
              Complete list of indexed pages ({cities.length + 5} total pages)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="space-y-1">
                <h4 className="font-medium text-swimspot-blue-green">Main Pages</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Home (/)</div>
                  <div>Map (/map)</div>
                  <div>About (/about)</div>
                  <div>Groups (/groups)</div>
                  <div>Blog (/blog)</div>
                </div>
              </div>
              
              <div className="space-y-1 md:col-span-2">
                <h4 className="font-medium text-swimspot-blue-green">City Pages</h4>
                <div className="text-sm text-gray-600 grid grid-cols-2 gap-1">
                  {cities.map((city) => (
                    <div key={city.id}>
                      /map/{city.slug} ({city.display_name})
                      {city.featured && <span className="ml-1 text-xs text-swimspot-blue-green">★</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sitemap;
