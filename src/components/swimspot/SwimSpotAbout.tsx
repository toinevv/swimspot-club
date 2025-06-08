
import { Droplet, MapPin, MessageCircle, Users } from "lucide-react";

interface SwimSpotAboutProps {
  swimSpot: any;
  partners: any[];
}

const SwimSpotAbout = ({ swimSpot, partners }: SwimSpotAboutProps) => {
  const openInMaps = () => {
    const { latitude, longitude } = swimSpot.location;
    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapsUrl, '_blank');
  };

  const openWhatsApp = () => {
    // Placeholder for WhatsApp group link - would be stored in swimSpot.whatsapp_link
    const whatsappMessage = `Hey! I found this swim spot: ${swimSpot.name} in ${swimSpot.city}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const localPartner = partners?.[0];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <h2 className="font-serif text-3xl text-swimspot-blue-green mb-6">
        About This Place
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed mb-8">
        {swimSpot.description}
      </p>
      
      {/* 2x2 Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Water Type */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Droplet className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-blue-900 text-lg">Water Type</h3>
          </div>
          <p className="text-blue-800 capitalize">{swimSpot.water_type}</p>
        </div>

        {/* Location - Clickable */}
        <button 
          onClick={openInMaps}
          className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-medium text-purple-900 text-lg">Location</h3>
          </div>
          <p className="text-purple-800 mb-1">{swimSpot.city}</p>
          <p className="text-purple-600 text-sm">Tap to navigate</p>
        </button>
        
        {/* WhatsApp Group */}
        <button 
          onClick={openWhatsApp}
          className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-200/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-medium text-green-900 text-lg">Local Chat</h3>
          </div>
          <p className="text-green-800 mb-1">Join WhatsApp</p>
          <p className="text-green-600 text-sm">Connect instantly</p>
        </button>
        
        {/* Local Partners */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 border border-orange-200/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-medium text-orange-900 text-lg">Local Partner</h3>
          </div>
          {localPartner ? (
            <div>
              <p className="text-orange-800 font-medium mb-1">
                {localPartner.name}
              </p>
              {localPartner.discount_code && (
                <p className="text-sm text-orange-600 font-mono bg-orange-100 px-2 py-1 rounded-lg inline-block">
                  {localPartner.discount_code}
                </p>
              )}
            </div>
          ) : (
            <p className="text-orange-800">Coming soon</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwimSpotAbout;
