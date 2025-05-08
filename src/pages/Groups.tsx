import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Users,
  Plus,
  Calendar,
  MapPin,
  User,
  Filter,
  Droplet
} from "lucide-react";

const Groups = () => {
  const [showFilter, setShowFilter] = useState(false);
  
  return (
    <div className="min-h-screen bg-swimspot-drift-sand py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-block bg-swimspot-blue-mist px-3 py-1 rounded-full text-swimspot-blue-green text-sm font-medium mb-2">
              Beta Feature
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-swimspot-blue-green">Swim Groups</h1>
            <p className="text-gray-600 mt-2">
              Connect with other swimmers and join organized swim meetups in your area.
            </p>
          </div>
          
          <Button 
            className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 whitespace-nowrap"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Search for swim groups..." 
                className="pl-10 bg-swimspot-drift-sand/50 border-0"
              />
            </div>
            <Button 
              variant="outline" 
              className="text-swimspot-blue-green border-swimspot-blue-green md:w-auto"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilter ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          {showFilter && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="w-full p-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-swimspot-blue-green">
                  <option value="amsterdam">Amsterdam</option>
                  <option value="north">Amsterdam North</option>
                  <option value="south">Amsterdam South</option>
                  <option value="west">Amsterdam West</option>
                  <option value="east">Amsterdam East</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Type</label>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-swimspot-blue-mist"
                  >
                    All Types
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-swimspot-blue-mist"
                  >
                    Public
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-swimspot-blue-mist"
                  >
                    Private
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-swimspot-blue-mist"
                  >
                    Invite Only
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity</label>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-swimspot-blue-mist"
                  >
                    All Activities
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-swimspot-blue-mist"
                  >
                    Social Swims
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-swimspot-blue-mist"
                  >
                    Training
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-swimspot-blue-mist"
                  >
                    Cold Plunges
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Groups List */}
        <Tabs defaultValue="all" className="w-full">
          <div className="bg-white rounded-t-2xl p-2">
            <TabsList className="w-full bg-swimspot-drift-sand/50 p-1">
              <TabsTrigger value="all" className="flex-1">All Groups</TabsTrigger>
              <TabsTrigger value="recommended" className="flex-1">Recommended</TabsTrigger>
              <TabsTrigger value="nearby" className="flex-1">Nearby</TabsTrigger>
              <TabsTrigger value="yours" className="flex-1">Your Groups</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="bg-white rounded-b-2xl p-6 shadow-sm">
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recommended" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.filter(g => g.recommended).map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="nearby" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.filter(g => g.nearby).map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="yours" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.filter(g => g.joined).map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
        {/* Bay Watcher Info (Previously Premium Info) */}
        <div className="mt-10 bg-swimspot-blue-green rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-2/3">
              <h2 className="font-serif text-2xl mb-3">Create Your Own Swim Group</h2>
              <p className="text-white/80 mb-4">
                Bay Watchers can create private swim groups, host events, and build a community of like-minded swimmers.
              </p>
              <Button className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90">
                Record Your Swims
              </Button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white/10 rounded-full p-6">
                <Users className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GroupCard = ({ group }: { group: any }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-40">
        <img 
          src={group.image} 
          alt={group.name} 
          className="w-full h-full object-cover" 
        />
        {group.premium && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-swimspot-burnt-coral text-white rounded-full text-xs font-medium">
            Bay Watcher
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="font-serif text-xl text-white">{group.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="bg-swimspot-blue-mist/50 border-none text-swimspot-blue-green">
            {group.type}
          </Badge>
          <span className="text-xs text-gray-500">
            {group.memberCount} members
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {group.description}
        </p>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="h-3 w-3 mr-1 text-swimspot-blue-green" />
            {group.location}
          </div>
          {group.preferredSpots && (
            <div className="flex items-center text-xs text-gray-500">
              <Droplet className="h-3 w-3 mr-1 text-swimspot-blue-green" />
              {group.preferredSpots}
            </div>
          )}
        </div>
        
        {group.nextEvent && (
          <div className="bg-swimspot-drift-sand/50 rounded-lg p-3 mb-4">
            <div className="flex items-center text-swimspot-blue-green mb-1 text-sm font-medium">
              <Calendar className="h-4 w-4 mr-1" />
              Next Event
            </div>
            <div className="text-xs text-gray-600">
              {group.nextEvent.title} • {group.nextEvent.date} • {group.nextEvent.time}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {[...Array(Math.min(4, group.memberCount))].map((_, i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-white">
                <AvatarFallback className="bg-swimspot-blue-green text-white text-xs">
                  {String.fromCharCode(65 + i)}
                </AvatarFallback>
              </Avatar>
            ))}
            {group.memberCount > 4 && (
              <div className="h-8 w-8 rounded-full bg-swimspot-drift-sand border-2 border-white flex items-center justify-center text-xs text-swimspot-blue-green">
                +{group.memberCount - 4}
              </div>
            )}
          </div>
          
          <Button
            variant={group.joined ? "outline" : "default"}
            className={
              group.joined 
                ? "border-swimspot-blue-green text-swimspot-blue-green hover:text-white hover:bg-swimspot-blue-green"
                : "bg-swimspot-blue-green hover:bg-swimspot-blue-green/90"
            }
            size="sm"
          >
            {group.joined ? (
              <>
                <User className="h-4 w-4 mr-1" />
                Member
              </>
            ) : (
              <>
                <Users className="h-4 w-4 mr-1" />
                Join
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Placeholder data
const groups = [
  {
    id: 1,
    name: "Amsterdam Morning Dippers",
    type: "Public",
    description: "Early morning swim group that meets for sunrise dips around Amsterdam. Perfect for early risers!",
    location: "Amsterdam",
    preferredSpots: "Rivers, Lakes",
    image: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
    memberCount: 28,
    premium: false,
    joined: true,
    recommended: true,
    nearby: true,
    nextEvent: {
      title: "Sunrise Swim at Amstel",
      date: "July 28",
      time: "5:30 AM"
    }
  },
  {
    id: 2,
    name: "Wild Swimming Club",
    type: "Private",
    description: "Exploring natural swimming spots throughout the Netherlands, from hidden lakes to pristine rivers.",
    location: "Noord-Holland",
    preferredSpots: "Natural Waters",
    image: "https://source.unsplash.com/photo-1506744038136-46273834b3fb",
    memberCount: 42,
    premium: true,
    joined: false,
    recommended: true,
    nearby: false,
    nextEvent: {
      title: "Weekend Trip: Utrecht Canals",
      date: "Aug 12-13",
      time: "9:00 AM"
    }
  },
  {
    id: 3,
    name: "Canal Swimmers",
    type: "Invite Only",
    description: "Urban swimmers focusing on Amsterdam's historic canals. We organize regular clean-up swims too!",
    location: "Amsterdam Centrum",
    preferredSpots: "Canals",
    image: "https://source.unsplash.com/photo-1482938289607-e9573fc25ebb",
    memberCount: 16,
    premium: false,
    joined: true,
    recommended: false,
    nearby: true,
    nextEvent: null
  },
  {
    id: 4,
    name: "Amsterdam Ice Dippers",
    type: "Public",
    description: "Cold water enthusiasts who swim year-round, especially during winter. Beginners welcome!",
    location: "Amsterdam Region",
    preferredSpots: "All Waters",
    image: "https://source.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    memberCount: 34,
    premium: false,
    joined: false,
    recommended: true,
    nearby: true,
    nextEvent: {
      title: "Weekend Cold Plunge",
      date: "July 30",
      time: "8:00 AM"
    }
  },
  {
    id: 5,
    name: "Weekend Swim Squad",
    type: "Public",
    description: "Casual weekend swimmers who meet at various locations around Amsterdam each Saturday or Sunday.",
    location: "Amsterdam",
    preferredSpots: "Lakes, Rivers",
    image: "https://source.unsplash.com/photo-1487252665478-49b61b47f302",
    memberCount: 56,
    premium: false,
    joined: false,
    recommended: false,
    nearby: false,
    nextEvent: {
      title: "Saturday Social Swim",
      date: "July 29",
      time: "11:00 AM"
    }
  },
  {
    id: 6,
    name: "Premium Swim Explorers",
    type: "Private",
    description: "Exclusive group that explores premium and hidden swimming spots around the Netherlands.",
    location: "Netherlands",
    preferredSpots: "Hidden Gems",
    image: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
    memberCount: 22,
    premium: true,
    joined: false,
    recommended: true,
    nearby: false,
    nextEvent: null
  }
];

export default Groups;
