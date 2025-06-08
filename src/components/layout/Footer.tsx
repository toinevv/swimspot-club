
import { Link } from "react-router-dom";

const Footer = () => {
  return (
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
              <li><Link to="/" className="hover:text-swimspot-drift-sand">Swim Map</Link></li>
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
  );
};

export default Footer;
