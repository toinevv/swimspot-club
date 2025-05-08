import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, Map, User, Users, Droplet, Home, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [navOpen, setNavOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="flex flex-col min-h-screen bg-swimspot-drift-sand">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-swimspot-blue-green/10 bg-swimspot-drift-sand/80 backdrop-blur-md">
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
              <UserMenu user={user} onSignOut={handleSignOut} />
            </nav>
          )}
        </div>

        {/* Mobile navigation overlay */}
        {isMobile && navOpen && (
          <div className="fixed inset-0 bg-swimspot-drift-sand z-40 pt-16">
            <nav className="flex flex-col items-center gap-6 p-6">
              <NavLinks isMobile={true} />
              <div className="mt-4">
                <UserMenu user={user} onSignOut={handleSignOut} isMobile={true} />
              </div>
            </nav>
          </div>
        )}
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
                <li><Link to="/" className="hover:text-swimspot-drift-sand">Home</Link></li>
                <li><Link to="/groups" className="hover:text-swimspot-drift-sand">Groups</Link></li>
                <li><a href="#" className="hover:text-swimspot-drift-sand">Premium Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">About</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-swimspot-drift-sand">Our Story</Link></li>
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
      <Link to="/map" className={linkClasses}>
        {isMobile && <Map className="h-5 w-5" />}
        Swim Map
      </Link>
      <Link to="/" className={linkClasses}>
        {isMobile && <Home className="h-5 w-5" />}
        Home
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

const UserMenu = ({ 
  user, 
  onSignOut,
  isMobile = false 
}: { 
  user: any;
  onSignOut: () => void;
  isMobile?: boolean 
}) => {
  
  if (!user) {
    return isMobile ? (
      <div className="flex flex-col items-center gap-4">
        <Button 
          variant="outline" 
          className="w-full text-swimspot-blue-green border-swimspot-blue-green hover:bg-swimspot-blue-green hover:text-white"
          onClick={() => window.location.href = '/auth'}
        >
          Sign In
        </Button>
        <Button 
          className="w-full bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white"
          onClick={() => window.location.href = '/auth?tab=signup'}
        >
          Join SwimSpot
        </Button>
      </div>
    ) : (
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          className="text-swimspot-blue-green hover:text-swimspot-blue-green hover:bg-swimspot-blue-green/10"
          onClick={() => window.location.href = '/auth'}
        >
          Sign In
        </Button>
        <Button 
          className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white"
          onClick={() => window.location.href = '/auth?tab=signup'}
        >
          Join
        </Button>
      </div>
    );
  }

  const userInitial = user.email ? user.email[0].toUpperCase() : 'U';

  return isMobile ? (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-swimspot-blue-green text-white">
            {userInitial}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{user.email}</span>
      </div>
      <div className="w-full">
        <Link to="/profile">
          <Button variant="outline" className="w-full text-swimspot-blue-green mb-2">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </Link>
        <Button 
          variant="outline" 
          className="w-full text-swimspot-burnt-coral border-swimspot-burnt-coral"
          onClick={onSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback className="bg-swimspot-blue-green text-white">
            {userInitial}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-2 py-1.5 text-sm font-medium">
          {user.email}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer flex items-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-swimspot-burnt-coral focus:text-swimspot-burnt-coral cursor-pointer"
          onClick={onSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MainLayout;
