import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, Map, User, Users, Droplet, Home } from "lucide-react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [navOpen, setNavOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-swimspot-drift-sand">
      {/* Header */}
      <header className="relative sticky top-0 z-50 border-b border-swimspot-blue-green/10 bg-swimspot-drift-sand/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Droplet className="h-8 w-8 text-swimspot-blue-green" />
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
              <UserMenu />
            </nav>
          )}
        </div>

        {/* Mobile navigation overlay */}
        {isMobile && navOpen && (
          <div className="fixed inset-0 bg-swimspot-drift-sand z-40 pt-16">
            <nav className="flex flex-col items-center gap-6 p-6">
              <NavLinks isMobile={true} />
              <div className="mt-4">
                <UserMenu isMobile={true} />
              </div>
            </nav>
          </div>
        )}

        {/* Wave SVG Border - Made more transparent and with smaller waves */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg 
            preserveAspectRatio="none" 
            viewBox="0 0 1440 80" 
            className="w-full h-8" 
            fill="rgba(142, 145, 150, 0.1)"
          >
            <path 
              d="M0,32 Q90,48 180,32 T360,48 T540,32 T720,48 T900,32 T1080,48 T1260,32 T1440,48 V80 H0 Z" 
              className="wave-path" 
            />
          </svg>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-swimspot-blue-green/10 py-8 bg-swimspot-blue-green text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-xl mb-4">SwimSpot</h3>
              <p className="text-sm text-swimspot-drift-sand/80">
                Discover Amsterdam's finest natural swimming locations.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/map" className="hover:text-swimspot-drift-sand">Swim Map</Link></li>
                <li><Link to="/groups" className="hover:text-swimspot-drift-sand">Groups</Link></li>
                <li><a href="#" className="hover:text-swimspot-drift-sand">Premium Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-swimspot-drift-sand">Our Story</a></li>
                <li><a href="#" className="hover:text-swimspot-drift-sand">Community Guidelines</a></li>
                <li><a href="#" className="hover:text-swimspot-drift-sand">Safety Tips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-swimspot-drift-sand">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-swimspot-drift-sand">Terms of Service</a></li>
                <li><a href="#" className="hover:text-swimspot-drift-sand">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-swimspot-drift-sand/20 text-sm text-center text-swimspot-drift-sand/70">
            &copy; {new Date().getFullYear()} SwimSpot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  const linkClasses = isMobile 
    ? "flex items-center gap-2 py-3 text-xl text-swimspot-blue-green hover:text-swimspot-burnt-coral transition-colors"
    : "flex items-center gap-1 text-swimspot-blue-green hover:text-swimspot-burnt-coral transition-colors";

  return (
    <>
      <Link to="/" className={linkClasses}>
        {isMobile && <Map className="h-5 w-5" />}
        Swim Map
      </Link>
      <Link to="/home" className={linkClasses}>
        {isMobile && <Home className="h-5 w-5" />}
        About
      </Link>
      <Link to="/groups" className={linkClasses}>
        {isMobile && <Users className="h-5 w-5" />}
        Groups
      </Link>
      <Link to="/profile" className={`${linkClasses} ${!isMobile && "md:hidden"}`}>
        {isMobile && <User className="h-5 w-5" />}
        Profile
      </Link>
    </>
  );
};

const UserMenu = ({ isMobile = false }: { isMobile?: boolean }) => {
  return isMobile ? (
    <div className="flex flex-col items-center gap-4">
      <Button variant="outline" className="w-full text-swimspot-blue-green border-swimspot-blue-green hover:bg-swimspot-blue-green hover:text-white">
        Sign In
      </Button>
      <Button className="w-full bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white">
        Join SwimSpot
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Button variant="ghost" className="text-swimspot-blue-green hover:text-swimspot-blue-green hover:bg-swimspot-blue-green/10">
        Sign In
      </Button>
      <Button className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white">
        Join
      </Button>
      <Link to="/profile">
        <Avatar>
          <AvatarFallback className="bg-swimspot-blue-green text-white">
            U
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
};

export default MainLayout;
