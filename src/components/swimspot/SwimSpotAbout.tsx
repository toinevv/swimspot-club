
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
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-swimspot-drift-sand/50">
      <h2 className="font-serif text-3xl font-medium text-swimspot-blue-green mb-6 tracking-tight">
        About This Place
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed mb-8 font-sans">
        {swimSpot.description}
      </p>
      
      {/* 2x2 Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Water Type */}
        <div className="bg-gradient-to-br from-swimspot-blue-mist to-swimspot-blue-mist/60 rounded-2xl p-6 border border-swimspot-blue-green/20 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-swimspot-blue-green/10 flex items-center justify-center">
              <Droplet className="h-5 w-5 text-swimspot-blue-green" />
            </div>
            <h3 className="font-medium text-swimspot-blue-green text-lg">Water Type</h3>
          </div>
          <p className="text-swimspot-blue-green capitalize font-medium">{swimSpot.water_type}</p>
        </div>

        {/* Location - Clickable */}
        <button 
          onClick={openInMaps}
          className="bg-gradient-to-br from-swimspot-drift-sand to-swimspot-drift-sand/60 rounded-2xl p-6 border border-swimspot-blue-green/20 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-swimspot-blue-green/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-swimspot-blue-green" />
            </div>
            <h3 className="font-medium text-swimspot-blue-green text-lg">Location</h3>
          </div>
          <p className="text-swimspot-blue-green mb-1 font-medium">{swimSpot.city}</p>
          <p className="text-swimspot-blue-green/70 text-sm">Tap to navigate</p>
        </button>
        
        {/* WhatsApp Group */}
        <button 
          onClick={openWhatsApp}
          className="bg-gradient-to-br from-green-50 to-green-50/60 rounded-2xl p-6 border border-green-500/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-green-700" />
            </div>
            <h3 className="font-medium text-green-800 text-lg">Local Chat</h3>
          </div>
          <p className="text-green-800 mb-1 font-medium">Join WhatsApp</p>
          <p className="text-green-700/70 text-sm">Connect instantly</p>
        </button>
        
        {/* Local Partners */}
        <div className="bg-gradient-to-br from-swimspot-burnt-coral/10 to-swimspot-burnt-coral/5 rounded-2xl p-6 border border-swimspot-burnt-coral/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-swimspot-burnt-coral/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-swimspot-burnt-coral" />
            </div>
            <h3 className="font-medium text-swimspot-burnt-coral text-lg">Local Partner</h3>
          </div>
          {localPartner ? (
            <div>
              <p className="text-swimspot-burnt-coral font-medium mb-1">
                {localPartner.name}
              </p>
              {localPartner.discount_code && (
                <p className="text-sm text-swimspot-burnt-coral font-mono bg-swimspot-burnt-coral/10 px-2 py-1 rounded-lg inline-block">
                  {localPartner.discount_code}
                </p>
              )}
            </div>
          ) : (
            <p className="text-swimspot-burnt-coral font-medium">Coming soon</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwimSpotAbout;
