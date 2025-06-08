
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, Menu, X, Map, Home, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import StructuredData from "@/components/seo/StructuredData";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { to: "/", label: "Swim Map", icon: Map },
    { to: "/about", label: "About", icon: Home },
    { to: "/groups", label: "Groups", icon: Users },
  ];

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
        {/* Enhanced Navigation Header */}
        <header className="sticky top-0 z-50 bg-swimspot-drift-sand/80 backdrop-blur-md border-b border-swimspot-blue-green/20 shadow-sm">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center font-serif text-xl font-bold text-swimspot-blue-green hover:text-swimspot-burnt-coral transition-colors duration-200">
              <MapPin className="mr-2 h-6 w-6" />
              SwimSpot
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-swimspot-blue-green hover:text-swimspot-burnt-coral transition-colors duration-200 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Desktop Auth Buttons */}
              <div className="flex items-center space-x-3">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center justify-center w-8 h-8 bg-swimspot-blue-green text-white rounded-full text-sm font-medium hover:bg-swimspot-blue-green/90 transition-colors"
                    >
                      {user.email?.charAt(0).toUpperCase()}
                    </Link>
                    <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-swimspot-blue-green hover:text-swimspot-burnt-coral">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="text-swimspot-blue-green hover:text-swimspot-burnt-coral">
                      <Link to="/auth">Sign In</Link>
                    </Button>
                    <Button size="sm" className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white">
                      <Link to="/auth">Join</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-swimspot-blue-green hover:text-swimspot-burnt-coral"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Slide-in Menu */}
            <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-gradient-to-b from-swimspot-drift-sand to-swimspot-drift-sand/95 backdrop-blur-md z-50 shadow-2xl transform transition-transform duration-300 ease-out">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-swimspot-blue-green/20">
                <span className="font-serif text-lg font-bold text-swimspot-blue-green">Menu</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-swimspot-blue-green hover:text-swimspot-burnt-coral transition-colors"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="px-6 py-4">
                <div className="space-y-2">
                  {navLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="flex items-center gap-4 px-4 py-3 rounded-lg text-swimspot-blue-green hover:bg-swimspot-light-blue-mist hover:text-swimspot-burnt-coral transition-all duration-200 transform hover:scale-105 min-h-[48px]"
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    );
                  })}
                  
                  {user && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-4 px-4 py-3 rounded-lg text-swimspot-blue-green hover:bg-swimspot-light-blue-mist hover:text-swimspot-burnt-coral transition-all duration-200 transform hover:scale-105 min-h-[48px]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium">Profile</span>
                    </Link>
                  )}
                </div>
              </nav>

              {/* Divider */}
              <div className="mx-6 border-t border-swimspot-blue-green/20 my-4"></div>

              {/* User Section */}
              <div className="px-6 py-4">
                {user ? (
                  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-swimspot-blue-green text-white rounded-full flex items-center justify-center font-medium">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-swimspot-blue-green">User</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full text-swimspot-blue-green border-swimspot-blue-green hover:bg-swimspot-blue-green hover:text-white transition-colors"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm space-y-3">
                    <Button
                      variant="outline"
                      className="w-full text-swimspot-blue-green border-swimspot-blue-green hover:bg-swimspot-blue-green hover:text-white transition-colors min-h-[48px]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to="/auth" className="w-full">Sign In</Link>
                    </Button>
                    <Button
                      className="w-full bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white min-h-[48px]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to="/auth" className="w-full">Join SwimSpot</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <main>
          {children}
        </main>
      </div>
    </>
  );
};

export default MainLayout;
