
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { 
  Settings, 
  Bookmark, 
  Users, 
  Map,
  User,
  CalendarClock,
  Droplet,
  Award,
  Loader2
} from "lucide-react";
import { api } from "@/services/api";
import { UserProfile } from "@/services/api/profiles";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import { toast } from "sonner";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("saved");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: () => api.getCurrentUserProfile(),
  });

  const { data: userStats } = useQuery({
    queryKey: ['userStats'],
    queryFn: () => api.getUserStats(),
    enabled: !!userProfile
  });

  const { data: savedSpots = [] } = useQuery({
    queryKey: ['userSavedSpots'],
    queryFn: () => api.getUserSavedSpots(),
    enabled: !!userProfile
  });

  const { data: userGroups = [] } = useQuery({
    queryKey: ['userGroups'],
    queryFn: () => api.getUserGroups(),
    enabled: !!userProfile
  });

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile]);

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-swimspot-blue-green" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-swimspot-blue-green mb-2">Please sign in</h2>
          <p className="text-gray-600 mb-4">You need to be signed in to view your profile.</p>
          <Link to="/auth">
            <Button className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getExplorerLevel = () => {
    const spotsVisited = userStats?.spotsVisited || 0;
    if (spotsVisited >= 50) return 'Master Explorer';
    if (spotsVisited >= 20) return 'Advanced Explorer';
    if (spotsVisited >= 10) return 'Explorer';
    if (spotsVisited >= 5) return 'Bay Watcher';
    return 'Beginner';
  };
  
  return (
    <div className="min-h-screen bg-swimspot-drift-sand py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="bg-swimspot-blue-green text-white text-2xl">
                {(profile.full_name || profile.username || 'U').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="font-serif text-3xl text-swimspot-blue-green mb-2">
                    {profile.full_name || profile.username || 'Swimming Enthusiast'}
                  </h1>
                  <div className="flex items-center flex-wrap gap-2">
                    <Badge variant="outline" className="bg-swimspot-blue-mist border-none text-swimspot-blue-green">
                      {getExplorerLevel()}
                    </Badge>
                    {profile.location && (
                      <span className="text-gray-500 text-sm">{profile.location}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <ProfileEditForm profile={profile} onProfileUpdate={handleProfileUpdate} />
                  <Button variant="ghost" size="icon" className="text-swimspot-blue-green">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {profile.bio && (
                <p className="text-gray-600 mb-6">{profile.bio}</p>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-swimspot-drift-sand/70 rounded-xl p-3 text-center">
                  <div className="text-2xl font-medium text-swimspot-blue-green mb-1">
                    {userStats?.spotsVisited || 0}
                  </div>
                  <div className="text-xs text-gray-600">Spots Visited</div>
                </div>
                <div className="bg-swimspot-drift-sand/70 rounded-xl p-3 text-center">
                  <div className="text-2xl font-medium text-swimspot-blue-green mb-1">
                    {userStats?.groupsJoined || 0}
                  </div>
                  <div className="text-xs text-gray-600">Groups Joined</div>
                </div>
                <div className="bg-swimspot-drift-sand/70 rounded-xl p-3 text-center">
                  <div className="text-2xl font-medium text-swimspot-blue-green mb-1">
                    {userStats?.savedSpots || 0}
                  </div>
                  <div className="text-xs text-gray-600">Saved Spots</div>
                </div>
                <div className="bg-swimspot-drift-sand/70 rounded-xl p-3 text-center">
                  <div className="text-2xl font-medium text-swimspot-burnt-coral mb-1">
                    {userStats?.likesGiven || 0}
                  </div>
                  <div className="text-xs text-gray-600">Likes Given</div>
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
            </TabsList>
            
            <TabsContent value="saved">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedSpots.length > 0 ? savedSpots.map((spot) => (
                  <Link 
                    key={spot.id} 
                    to={`/spot/${spot.id}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48">
                      <img 
                        src={spot.image_url} 
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
                        <h3 className="font-medium text-white">{spot.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        <Droplet className="h-4 w-4 mr-1 text-swimspot-blue-green" />
                        {spot.water_type}
                        <span className="mx-2">•</span>
                        <Map className="h-4 w-4 mr-1 text-swimspot-blue-green" />
                        {spot.address}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {spot.tags?.slice(0, 3).map((tag: string, index: number) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-swimspot-blue-mist/50 text-swimspot-blue-green rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <CalendarClock className="h-3 w-3 mr-1" />
                        Saved: {new Date(spot.savedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="col-span-full text-center py-12">
                    <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No saved spots yet</h3>
                    <p className="text-gray-500 mb-4">Start exploring and save your favorite swim spots!</p>
                    <Link to="/">
                      <Button className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
                        Explore Spots
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="groups">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userGroups.length > 0 ? userGroups.map((group) => (
                  <div 
                    key={group.id} 
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-40">
                      <img 
                        src={group.image_url} 
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
                        <span className="text-xs text-gray-500">{group.location}</span>
                        <Badge variant="outline" className="bg-swimspot-blue-mist/50 border-none text-swimspot-blue-green">
                          {group.role}
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-3">
                        Joined: {new Date(group.joinedAt).toLocaleDateString()}
                      </div>
                      
                      <Link to="/groups">
                        <Button className="w-full bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
                          View Group
                        </Button>
                      </Link>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No groups joined yet</h3>
                    <p className="text-gray-500 mb-4">Join a swimming group to connect with fellow swimmers!</p>
                    <Link to="/groups">
                      <Button className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
                        Find Groups
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
