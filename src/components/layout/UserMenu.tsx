
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserMenuProps {
  isMobile?: boolean;
  user: any;
  onSignOut: () => void;
}

const UserMenu = ({ isMobile = false, user, onSignOut }: UserMenuProps) => {
  return isMobile ? (
    <div className="flex flex-col items-center gap-4">
      {user ? (
        <>
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarFallback className="bg-swimspot-blue-green text-white">
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-swimspot-blue-green">{user.email}</span>
          </div>
          <Button 
            variant="outline" 
            onClick={onSignOut} 
            className="w-64 py-4 text-white bg-swimspot-blue-green border-swimspot-blue-green hover:bg-swimspot-blue-green/90 rounded-xl"
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Button 
            variant="outline" 
            className="w-64 py-4 text-swimspot-blue-green bg-swimspot-drift-sand border-swimspot-blue-green hover:bg-swimspot-drift-sand/90 rounded-xl"
          >
            <Link to="/auth">Sign In</Link>
          </Button>
          <Button className="w-64 py-4 bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white rounded-xl">
            <Link to="/auth">Join SwimSpot</Link>
          </Button>
        </>
      )}
    </div>
  ) : (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <Button variant="ghost" onClick={onSignOut} className="text-swimspot-blue-green hover:text-swimspot-blue-green hover:bg-swimspot-blue-green/10">
            Sign Out
          </Button>
          <Link to="/profile">
            <Avatar>
              <AvatarFallback className="bg-swimspot-blue-green text-white">
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
        </>
      ) : (
        <>
          <Button variant="ghost" className="text-swimspot-blue-green hover:text-swimspot-blue-green hover:bg-swimspot-blue-green/10">
            <Link to="/auth">Sign In</Link>
          </Button>
          <Button className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white">
            <Link to="/auth">Join</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default UserMenu;
