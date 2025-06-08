
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageCircle } from "lucide-react";

interface SwimSpotCommunityProps {
  visitData: any;
  groups: any[];
  userIsPremium?: boolean;
}

const SwimSpotCommunity = ({ visitData, groups, userIsPremium = false }: SwimSpotCommunityProps) => {
  const openWhatsApp = () => {
    const whatsappMessage = `Hey! I want to join the swimming group`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <h2 className="font-serif text-3xl text-swimspot-blue-green mb-6">
        Swimming Community
      </h2>
      
      {/* Recent Visitors */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-swimspot-blue-green">
            Recent Swimmers ({visitData?.count || 0})
          </h3>
          {!userIsPremium && visitData?.count > 3 && (
            <Link to="/profile" className="text-swimspot-burnt-coral hover:underline text-sm">
              See all members →
            </Link>
          )}
        </div>
        
        {/* Avatar Grid */}
        <div className="flex gap-3">
          {visitData?.recentVisitors
            ?.slice(0, userIsPremium ? 8 : 3)
            .map((visitor: any, index: number) => (
              <Avatar key={index} className="h-12 w-12 border-2 border-white shadow-md">
                <AvatarImage src={visitor.profiles?.avatar_url} />
                <AvatarFallback className="bg-swimspot-blue-green text-white">
                  {visitor.profiles?.username?.charAt(0) || 'S'}
                </AvatarFallback>
              </Avatar>
            ))
          }
          {!userIsPremium && visitData?.count > 3 && (
            <Link to="/profile">
              <div className="h-12 w-12 rounded-full bg-swimspot-burnt-coral/20 border-2 border-dashed border-swimspot-burnt-coral flex items-center justify-center hover:scale-110 transition-transform">
                <span className="text-swimspot-burnt-coral font-medium text-sm">+{visitData.count - 3}</span>
              </div>
            </Link>
          )}
        </div>
        
        {!userIsPremium && visitData?.count > 3 && (
          <p className="text-sm text-gray-500 mt-4 italic">
            Join our community to connect with all swimmers
          </p>
        )}
      </div>
      
      {/* Swimming Options */}
      <div>
        <h3 className="text-xl font-medium text-swimspot-blue-green mb-4">Ways to Connect</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* In-App Groups */}
          <Link to="/groups" className="group block">
            <div className="bg-swimspot-light-blue-mist/50 rounded-2xl p-6 border border-swimspot-blue-green/10 group-hover:shadow-lg group-hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-swimspot-blue-green rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-swimspot-blue-green text-lg mb-1">
                    {groups[0]?.name || "Swimming Groups"}
                  </h4>
                  <p className="text-swimspot-blue-green/70 text-sm leading-relaxed">
                    Organized swims and events with fellow swimmers
                  </p>
                  <p className="text-swimspot-blue-green/50 text-xs mt-2 font-medium">
                    COMMUNITY • JOIN MEMBERS
                  </p>
                </div>
              </div>
            </div>
          </Link>
          
          {/* WhatsApp Option */}
          <button 
            onClick={openWhatsApp}
            className="group block text-left"
          >
            <div className="bg-green-50 rounded-2xl p-6 border border-green-200/40 group-hover:shadow-lg group-hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800 text-lg mb-1">
                    WhatsApp Group
                  </h4>
                  <p className="text-green-700/80 text-sm leading-relaxed">
                    Quick coordination and casual chat
                  </p>
                  <p className="text-green-600/70 text-xs mt-2 font-medium">
                    INSTANT • TAP TO JOIN
                  </p>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwimSpotCommunity;
