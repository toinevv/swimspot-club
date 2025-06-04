import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import StructuredData from "@/components/seo/StructuredData";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isMapPage = location.pathname === "/" || location.pathname.startsWith("/map") || location.pathname.match(/^\/[a-z-]+$/);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <StructuredData 
        data={{
          type: 'Organization',
          name: 'SwimSpot',
          description: 'Discover the best wild swimming locations across the Netherlands with our interactive map and community platform.',
          url: window.location.origin,
          logo: `${window.location.origin}/placeholder.svg`,
          sameAs: []
        }}
      />
      
      <div className="min-h-screen bg-swimspot-drift-sand">
        {/* Navigation Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 relative z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center font-bold text-xl text-swimspot-blue-green">
              <MapPin className="mr-2 h-5 w-5" />
              SwimSpot
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/about" className="text-gray-700 hover:text-swimspot-blue-green transition-colors">About</Link>
              <Link to="/groups" className="text-gray-700 hover:text-swimspot-blue-green transition-colors">Groups</Link>
              <Link to="/blog" className="text-gray-700 hover:text-swimspot-blue-green transition-colors">Blog</Link>
              {user ? (
                <>
                  <Link to="/profile" className="text-gray-700 hover:text-swimspot-blue-green transition-colors">Profile</Link>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>Sign Out</Button>
                </>
              ) : (
                <Link to="/auth" className="text-gray-700 hover:text-swimspot-blue-green transition-colors">Sign In</Link>
              )}
            </nav>

            {/* Mobile Navigation Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-white z-50">
              <div className="container mx-auto p-4 flex justify-end">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col items-center space-y-4">
                <Link to="/" className="text-gray-700 hover:text-swimspot-blue-green transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Map</Link>
                <Link to="/about" className="text-gray-700 hover:text-swimspot-blue-green transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                <Link to="/groups" className="text-gray-700 hover:text-swimspot-blue-green transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Groups</Link>
                <Link to="/blog" className="text-gray-700 hover:text-swimspot-blue-green transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                {user ? (
                  <>
                    <Link to="/profile" className="text-gray-700 hover:text-swimspot-blue-green transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                    <Button variant="outline" size="sm" onClick={handleSignOut}>Sign Out</Button>
                  </>
                ) : (
                  <Link to="/auth" className="text-gray-700 hover:text-swimspot-blue-green transition-colors text-lg" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                )}
              </nav>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className={isMapPage ? "" : "pt-16"}>
          {children}
        </main>
      </div>
    </>
  );
};

export default MainLayout;
