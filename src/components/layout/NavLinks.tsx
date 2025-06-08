
import { Link } from "react-router-dom";
import { Map, Home, Users, User } from "lucide-react";

interface NavLinksProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const NavLinks = ({ isMobile = false, onLinkClick }: NavLinksProps) => {
  const linkClasses = isMobile 
    ? "flex items-center justify-center gap-3 py-4 px-8 text-lg font-medium text-white bg-swimspot-blue-green hover:bg-swimspot-blue-green/90 transition-colors rounded-xl shadow-lg w-64"
    : "flex items-center gap-1 text-swimspot-blue-green hover:text-swimspot-burnt-coral transition-colors";

  const handleClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <>
      <Link to="/" className={linkClasses} onClick={handleClick}>
        {isMobile && <Map className="h-5 w-5" />}
        Swim Map
      </Link>
      <Link to="/about" className={linkClasses} onClick={handleClick}>
        {isMobile && <Home className="h-5 w-5" />}
        About
      </Link>
      <Link to="/groups" className={linkClasses} onClick={handleClick}>
        {isMobile && <Users className="h-5 w-5" />}
        Groups
      </Link>
      <Link to="/profile" className={`${linkClasses} ${!isMobile && "md:hidden"}`} onClick={handleClick}>
        {isMobile && <User className="h-5 w-5" />}
        Profile
      </Link>
    </>
  );
};

export default NavLinks;
