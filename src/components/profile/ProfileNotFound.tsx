
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProfileNotFound = () => {
  return (
    <div className="min-h-screen bg-swimspot-drift-sand p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-serif text-swimspot-blue-green mb-4">Profile Not Found</h1>
        <p className="text-gray-600 mb-6">Please sign in to view your profile.</p>
        <Link to="/auth">
          <Button className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileNotFound;
