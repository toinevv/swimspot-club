
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import StructuredData from "@/components/seo/StructuredData";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [navOpen, setNavOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      setNavOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

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
      
      <div className="flex flex-col min-h-screen bg-swimspot-drift-sand">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-swimspot-blue-green/10 bg-swimspot-drift-sand/80 backdrop-blur-md">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <MapPin className="h-8 w-8 text-swimspot-blue-green" />
              <span className="font-serif text-2xl font-medium text-swimspot-blue-green">SwimSpot</span>
            </Link>

            {/* Mobile menu button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleNav}
                className="md:hidden"
              >
                {navOpen ? (
                  <X className="h-6 w-6 text-swimspot-blue-green" />
                ) : (
                  <Menu className="h-6 w-6 text-swimspot-blue-green" />
                )}
              </Button>
            )}

            {/* Desktop navigation */}
            {!isMobile && (
              <nav className="hidden md:flex items-center gap-6">
                <NavLinks />
                <UserMenu user={user} onSignOut={handleSignOut} />
              </nav>
            )}
          </div>

          {/* Mobile navigation overlay */}
          <MobileMenu 
            isOpen={isMobile && navOpen}
            onClose={closeNav}
            user={user}
            onSignOut={handleSignOut}
          />
        </header>

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
