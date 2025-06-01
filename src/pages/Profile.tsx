
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  Star,
  Users,
  Bookmark,
  Plus,
  Edit,
  Trophy,
  Droplet,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/services/api";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getCurrentUserProfile,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['userStats'],
    queryFn: api.getUserStats,
  });

  const { data: savedSpots = [], isLoading: savedSpotsLoading } = useQuery({
    queryKey: ['savedSpots'],
    queryFn: api.getUserSavedSpots,
  });

  const { data: groups = [], isLoading: groupsLoading } = useQuery({
    queryKey: ['userGroups'],
    queryFn: api.getUserGroups,
  });

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-swimspot-drift-sand p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
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
  }

  const getExplorerBadgeColor = (level: string | null) => {
    switch (level) {
      case 'Expert': return 'bg-swimspot-burnt-coral';
      case 'Advanced': return 'bg-swimspot-blue-green';
      case 'Intermediate': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-swimspot-drift-sand">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-serif text-swimspot-blue-green">My Profile</h1>
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="bg-swimspot-blue-green text-white text-2xl">
                  {profile.username?.charAt(0).toUpperCase() || profile.full_name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h2 className="text-2xl font-semibold text-swimspot-blue-green">
                    {profile.full_name || profile.username || 'Anonymous User'}
                  </h2>
                  <div className="flex gap-2">
                    <Badge className={`${getExplorerBadgeColor(profile.explorer_level)} text-white`}>
                      <Trophy className="h-3 w-3 mr-1" />
                      {profile.explorer_level || 'Beginner'}
                    </Badge>
                    {profile.is_premium && (
                      <Badge className="bg-swimspot-burnt-coral text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>
                
                {profile.bio && (
                  <p className="text-gray-700 mb-4">{profile.bio}</p>
                )}
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(profile.created_at).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-2">
                <Plus className="h-8 w-8 text-swimspot-blue-green" />
              </div>
              <div className="text-2xl font-bold text-swimspot-blue-green">
                {statsLoading ? "..." : stats?.spotsVisited || 0}
              </div>
              <div className="text-sm text-gray-600">Spots Visited</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-2">
                <Bookmark className="h-8 w-8 text-swimspot-blue-green" />
              </div>
              <div className="text-2xl font-bold text-swimspot-blue-green">
                {statsLoading ? "..." : stats?.savedSpots || 0}
              </div>
              <div className="text-sm text-gray-600">Saved Spots</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-swimspot-blue-green" />
              </div>
              <div className="text-2xl font-bold text-swimspot-blue-green">
                {statsLoading ? "..." : stats?.groupsJoined || 0}
              </div>
              <div className="text-sm text-gray-600">Groups Joined</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-2">
                <Droplet className="h-8 w-8 text-swimspot-blue-green" />
              </div>
              <div className="text-2xl font-bold text-swimspot-blue-green">
                {statsLoading ? "..." : stats?.totalVisits || 0}
              </div>
              <div className="text-sm text-gray-600">Total Visits</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="w-full bg-white mb-6">
            <TabsTrigger value="saved" className="flex-1">Saved Spots</TabsTrigger>
            <TabsTrigger value="groups" className="flex-1">My Groups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved" className="space-y-4">
            {savedSpotsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : savedSpots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedSpots.map((spot) => (
                  <Link key={spot.id} to={`/spot/${spot.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${spot.image_url})` }}>
                        <div className="h-full bg-gradient-to-t from-black/50 to-transparent flex items-end">
                          <div className="p-4 text-white">
                            <h3 className="text-lg font-semibold mb-1">{spot.name}</h3>
                            <div className="flex items-center text-sm opacity-90">
                              <Droplet className="h-4 w-4 mr-1" />
                              {spot.water_type}
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-gray-600 mb-2">{spot.address}</p>
                        <div className="flex gap-1 flex-wrap">
                          {spot.tags?.slice(0, 3).map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No saved spots yet</h3>
                  <p className="text-gray-500 mb-4">Start exploring and save your favorite swim spots!</p>
                  <Link to="/">
                    <Button className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
                      Explore Spots
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="groups" className="space-y-4">
            {groupsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-32 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : groups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groups.map((group) => (
                  <Link key={group.id} to={`/groups`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 bg-swimspot-blue-green rounded-lg flex items-center justify-center">
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-swimspot-blue-green mb-1">
                              {group.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">
                                {group.role}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {group.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No groups joined yet</h3>
                  <p className="text-gray-500 mb-4">Join swim groups to connect with fellow swimmers!</p>
                  <Link to="/groups">
                    <Button className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
                      Find Groups
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Edit Profile Modal */}
        {isEditing && (
          <ProfileEditForm
            profile={profile}
            onClose={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
