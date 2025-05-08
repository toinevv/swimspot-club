import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Edit, 
  Bookmark, 
  Users, 
  Map,
  User,
  CalendarClock,
  Droplet,
  Award
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("saved");
  
  return (
    <div className="min-h-screen bg-swimspot-drift-sand py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarFallback className="bg-swimspot-blue-green text-white text-2xl">
                RD
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="font-serif text-3xl text-swimspot-blue-green mb-2">Robin Dykstra</h1>
                  <div className="flex items-center flex-wrap gap-2">
                    <Badge variant="outline" className="bg-swimspot-blue-mist border-none text-swimspot-blue-green">
                      Bay Watcher
                    </Badge>
                    <span className="text-gray-500 text-sm">Amsterdam, NL</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="text-swimspot-blue-green border-swimspot-blue-green">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="ghost" size="icon" className="text-swimspot-blue-green">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                Outdoor swimming enthusiast exploring Amsterdam's best swim spots. Natural water lover and sunrise dip devotee.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-swimspot-drift-sand/70 rounded-xl p-3 text-center">
                  <div className="text-2xl font-medium text-swimspot-blue-green mb-1">18</div>
                  <div className="text-xs text-gray-600">Spots Visited</div>
                </div>
                <div className="bg-swimspot-drift-sand/70 rounded-xl p-3 text-center">
                  <div className="text-2xl font-medium text-swimspot-blue-green mb-1">5</div>
                  <div className="text-xs text-gray-600">Groups Joined</div>
                </div>
                <div className="bg-swimspot-drift-sand/70 rounded-xl p-3 text-center">
                  <div className="text-2xl font-medium text-swimspot-blue-green mb-1">12</div>
                  <div className="text-xs text-gray-600">Reviews</div>
                </div>
                <div className="bg-swimspot-drift-sand/70 rounded-xl p-3 text-center">
                  <div className="text-2xl font-medium text-swimspot-burnt-coral mb-1">
                    Explorer
                  </div>
                  <div className="text-xs text-gray-600">Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div>
          <Tabs defaultValue="saved" className="w-full">
            <TabsList className="w-full bg-white mb-6">
              <TabsTrigger 
                value="saved" 
                className="flex-1 flex items-center justify-center"
                onClick={() => setActiveTab("saved")}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Saved Spots
              </TabsTrigger>
              <TabsTrigger 
                value="groups" 
                className="flex-1 flex items-center justify-center"
                onClick={() => setActiveTab("groups")}
              >
                <Users className="h-4 w-4 mr-2" />
                My Groups
              </TabsTrigger>
              <TabsTrigger 
                value="badges" 
                className="flex-1 flex items-center justify-center"
                onClick={() => setActiveTab("badges")}
              >
                <Award className="h-4 w-4 mr-2" />
                Badges
              </TabsTrigger>
              <TabsTrigger 
                value="invites" 
                className="flex-1 flex items-center justify-center"
                onClick={() => setActiveTab("invites")}
              >
                <User className="h-4 w-4 mr-2" />
                Invites
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="saved">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedSpots.map((spot) => (
                  <div 
                    key={spot.id} 
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48">
                      <img 
                        src={spot.image} 
                        alt={spot.name} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-3 right-3">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="bg-white/80 hover:bg-white text-swimspot-burnt-coral rounded-full"
                        >
                          <Bookmark className="h-5 w-5" fill="currentColor" />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <div className="flex justify-between items-end">
                          <h3 className="font-medium text-white">{spot.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            spot.quality === 'Excellent' 
                              ? 'bg-green-100 text-green-800' 
                              : spot.quality === 'Good' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {spot.quality}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        <Droplet className="h-4 w-4 mr-1 text-swimspot-blue-green" />
                        {spot.waterType}
                        <span className="mx-2">•</span>
                        <Map className="h-4 w-4 mr-1 text-swimspot-blue-green" />
                        {spot.location}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {spot.tags.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-swimspot-blue-mist/50 text-swimspot-blue-green rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500 flex items-center">
                          <CalendarClock className="h-3 w-3 mr-1" />
                          Last visited: {spot.lastVisited}
                        </div>
                        <Button variant="link" className="text-swimspot-burnt-coral p-0 h-auto">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="groups">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userGroups.map((group) => (
                  <div 
                    key={group.id} 
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-40">
                      <img 
                        src={group.image} 
                        alt={group.name} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="font-serif text-xl text-white">{group.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-3">{group.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500">{group.members} members</span>
                        <Badge variant="outline" className="bg-swimspot-blue-mist/50 border-none text-swimspot-blue-green">
                          {group.type}
                        </Badge>
                      </div>
                      
                      <div className="flex -space-x-2 mb-3">
                        {[...Array(4)].map((_, i) => (
                          <Avatar key={i} className="h-8 w-8 border-2 border-white">
                            <AvatarFallback className="bg-swimspot-blue-green text-white text-xs">
                              {String.fromCharCode(65 + i)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {group.members > 4 && (
                          <div className="h-8 w-8 rounded-full bg-swimspot-drift-sand border-2 border-white flex items-center justify-center text-xs text-swimspot-blue-green">
                            +{group.members - 4}
                          </div>
                        )}
                      </div>
                      
                      <Button className="w-full bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
                        View Group
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="badges">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-serif text-2xl text-swimspot-blue-green mb-6">Swim Achievements</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {badges.map((badge) => (
                    <div key={badge.id} className="flex flex-col items-center text-center">
                      <div className={`h-20 w-20 rounded-full flex items-center justify-center mb-3 ${
                        badge.unlocked 
                          ? 'bg-swimspot-blue-green text-white' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {badge.icon}
                      </div>
                      <h3 className={`font-medium mb-1 ${
                        badge.unlocked ? 'text-swimspot-blue-green' : 'text-gray-400'
                      }`}>{badge.name}</h3>
                      <p className="text-xs text-gray-500">{badge.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="invites">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif text-2xl text-swimspot-blue-green mb-6">Your Invite Codes</h2>
                  
                  <div className="space-y-4">
                    {inviteCodes.map((code) => (
                      <div key={code.id} className="border border-dashed border-swimspot-blue-green/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-swimspot-blue-green">{code.code}</span>
                          <Badge variant="outline" className={`${
                            code.used ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'
                          }`}>
                            {code.used ? 'Used' : 'Available'}
                          </Badge>
                        </div>
                        {code.used ? (
                          <div className="text-xs text-gray-500">
                            Used by {code.usedBy} on {code.usedDate}
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Valid until {code.validUntil}</span>
                            <Button variant="ghost" className="text-swimspot-burnt-coral h-auto p-0 text-xs">
                              Share Code
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-swimspot-blue-green rounded-2xl p-6 shadow-sm text-white">
                  <h2 className="font-serif text-2xl mb-4">Invite Friends</h2>
                  <p className="text-white/80 mb-6">
                    Share SwimSpot with friends who appreciate exclusive swim locations. Each new member you invite gets premium access for their first month.
                  </p>
                  
                  <div className="mb-6">
                    <label className="block text-white/90 mb-2">Share via Email</label>
                    <div className="flex gap-2">
                      <input 
                        type="email" 
                        placeholder="friend@example.com" 
                        className="flex-1 px-3 py-2 rounded bg-white/10 text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                      <Button className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90">
                        Send
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white/10">
                    Copy Personal Referral Link
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Placeholder data
const savedSpots = [
  {
    id: 1,
    name: "Amstel River Oasis",
    image: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
    quality: "Excellent",
    waterType: "River",
    location: "Amsterdam South",
    tags: ["Family-friendly", "Picnic Area", "Shallow Entry"],
    lastVisited: "3 days ago"
  },
  {
    id: 2,
    name: "Nieuwe Meer Beach",
    image: "https://source.unsplash.com/photo-1506744038136-46273834b3fb",
    quality: "Good",
    waterType: "Lake",
    location: "Amsterdam West",
    tags: ["Sandy Beach", "Sunset Views", "Deep Water"],
    lastVisited: "Last week"
  },
  {
    id: 3,
    name: "Hidden Canal Gem",
    image: "https://source.unsplash.com/photo-1482938289607-e9573fc25ebb",
    quality: "Good",
    waterType: "Canal",
    location: "City Center",
    tags: ["Historic", "Urban", "Ladder Entry"],
    lastVisited: "2 weeks ago"
  },
  {
    id: 4,
    name: "Sloterplas Shores",
    image: "https://source.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    quality: "Moderate",
    waterType: "Lake",
    location: "Nieuw-West",
    tags: ["Family-friendly", "Shallow Waters"],
    lastVisited: "Last month"
  }
];

const userGroups = [
  {
    id: 1,
    name: "Amsterdam Morning Dippers",
    image: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
    description: "Early morning swim group that meets for sunrise dips around the city.",
    members: 28,
    type: "Public"
  },
  {
    id: 2,
    name: "Wild Swimming Club",
    image: "https://source.unsplash.com/photo-1506744038136-46273834b3fb",
    description: "Exploring natural swimming spots throughout the Netherlands.",
    members: 42,
    type: "Private"
  },
  {
    id: 3,
2 name: "Canal Swimmers",
    image: "https://source.unsplash.com/photo-1482938289607-e9573fc25ebb",
    description: "Urban swimmers focusing on Amsterdam's historic canals.",
    members: 16,
    type: "Invite Only"
  }
];

const badges = [
  {
    id: 1,
    name: "Explorer",
    description: "Visited 10+ swim spots",
    icon: <Award className="h-10 w-10" />,
    unlocked: true
  },
  {
    id: 2,
    name: "Early Bird",
    description: "5 sunrise swims",
    icon: <Droplet className="h-10 w-10" />,
    unlocked: true
  },
  {
    id: 3,
    name: "Social Swimmer",
    description: "Joined 3+ groups",
    icon: <Users className="h-10 w-10" />,
    unlocked: true
  },
  {
    id: 4,
    name: "Navigator",
    description: "Visited spots in all city areas",
    icon: <Map className="h-10 w-10" />,
    unlocked: false
  },
  {
    id: 5,
    name: "Ambassador",
    description: "Invited 5+ friends",
    icon: <User className="h-10 w-10" />,
    unlocked: false
  }
];

const inviteCodes = [
  {
    id: 1,
    code: "SPLASH23",
    used: false,
    validUntil: "Dec 31, 2023"
  },
  {
    id: 2,
    code: "DIVE456",
    used: true,
    usedBy: "Jan Visser",
    usedDate: "Jun 15, 2023"
  },
  {
    id: 3,
    code: "SWIM789",
    used: false,
    validUntil: "Dec 31, 2023"
  }
];

export default Profile;
