
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink } from "lucide-react";
import { generateSitemap, downloadSitemap } from "@/utils/sitemapGenerator";
import { cityDatabase } from "@/utils/cityData";

const Sitemap = () => {
  const handleViewSitemap = () => {
    const sitemapContent = generateSitemap();
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`<pre>${sitemapContent}</pre>`);
      newWindow.document.title = 'SwimSpot Sitemap';
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
              <Button onClick={downloadSitemap} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download sitemap.xml
              </Button>
              <Button variant="outline" onClick={handleViewSitemap} className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Sitemap
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
              Complete list of indexed pages ({Object.keys(cityDatabase).length + 5} total pages)
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
                  {Object.entries(cityDatabase).map(([slug, city]) => (
                    <div key={slug}>/map/{slug} ({city.displayName})</div>
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
