
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Bookmark,
  MessageSquare,
  Share,
  AlertTriangle,
  ThumbsUp,
  Droplet,
  Thermometer,
  Map,
  Calendar,
  Clock,
  Waves,
  Info,
  Star
} from "lucide-react";

const SwimSpotDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Find swim spot by id from our mock data
  const swimSpot = swimSpots.find(spot => spot.id.toString() === id) || swimSpots[0];

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleReport = () => {
    alert("Report functionality will be implemented");
  };

  return (
    <div className="min-h-screen bg-swimspot-drift-sand">
      <div className="relative h-[40vh] md:h-[50vh] bg-swimspot-blue-green">
        <img
          src={swimSpot.imageLarge}
          alt={swimSpot.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Back button - Fixed to point to / instead of /map */}
        <div className="absolute top-4 left-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/40 transition-colors"
          >
            <Map className="h-4 w-4" />
            Back to Map
          </Link>
        </div>
        
        {/* Premium badge if applicable */}
        {swimSpot.isPremium && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-swimspot-burnt-coral text-white rounded-full text-sm font-medium flex items-center">
            <Star className="h-4 w-4 mr-1" />
            Premium Spot
          </div>
        )}
        
        {/* Title area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">{swimSpot.name}</h1>
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  {swimSpot.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleLike}
                  className={`rounded-full border-white bg-black/20 backdrop-blur-sm ${
                    liked ? "text-red-500" : "text-white"
                  }`}
                >
                  <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSave}
                  className={`rounded-full border-white bg-black/20 backdrop-blur-sm ${
                    saved ? "text-swimspot-burnt-coral" : "text-white"
                  }`}
                >
                  <Bookmark
                    className="h-5 w-5"
                    fill={saved ? "currentColor" : "none"}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white bg-black/20 backdrop-blur-sm text-white"
                >
                  <Share className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReport}
                  className="rounded-full border-white bg-black/20 backdrop-blur-sm text-white"
                >
                  <AlertTriangle className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full bg-white mb-6">
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                <TabsTrigger value="nearby" className="flex-1">Nearby</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif text-2xl text-swimspot-blue-green mb-4">About This Spot</h2>
                  <p className="text-gray-700 mb-6">{swimSpot.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-swimspot-blue-mist/50 rounded-xl p-4">
                      <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
                        <Droplet className="h-5 w-5 mr-2" />
                        Water Type & Conditions
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex justify-between">
                          <span>Type:</span>
                          <span className="font-medium">{swimSpot.waterType}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Current Quality:</span>
                          <span className={`font-medium ${
                            swimSpot.quality === 'Excellent' 
                              ? 'text-green-600' 
                              : swimSpot.quality === 'Good' 
                              ? 'text-blue-600' 
                              : 'text-orange-600'
                          }`}>{swimSpot.quality}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Temperature:</span>
                          <span className="font-medium">{swimSpot.waterTemperature}°C</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Current:</span>
                          <span className="font-medium">{swimSpot.current}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-swimspot-drift-sand rounded-xl p-4">
                      <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        Facilities & Access
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex justify-between">
                          <span>Changing Rooms:</span>
                          <span className="font-medium">{swimSpot.facilities.changingRooms ? 'Available' : 'Not available'}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Restrooms:</span>
                          <span className="font-medium">{swimSpot.facilities.restrooms ? 'Available' : 'Not available'}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Lifeguard:</span>
                          <span className="font-medium">{swimSpot.facilities.lifeguard ? 'Yes' : 'No'}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Food & Drinks:</span>
                          <span className="font-medium">{swimSpot.facilities.foodDrinks ? 'Available nearby' : 'Not available'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif text-2xl text-swimspot-blue-green mb-4">Best Times to Visit</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-swimspot-drift-sand/50 p-4 rounded-xl text-center">
                      <div className="flex justify-center mb-2">
                        <Calendar className="h-6 w-6 text-swimspot-blue-green" />
                      </div>
                      <h4 className="font-medium text-swimspot-blue-green">Season</h4>
                      <p className="text-gray-600">{swimSpot.bestTimes.season}</p>
                    </div>
                    <div className="bg-swimspot-drift-sand/50 p-4 rounded-xl text-center">
                      <div className="flex justify-center mb-2">
                        <Clock className="h-6 w-6 text-swimspot-blue-green" />
                      </div>
                      <h4 className="font-medium text-swimspot-blue-green">Time of Day</h4>
                      <p className="text-gray-600">{swimSpot.bestTimes.timeOfDay}</p>
                    </div>
                    <div className="bg-swimspot-drift-sand/50 p-4 rounded-xl text-center">
                      <div className="flex justify-center mb-2">
                        <Thermometer className="h-6 w-6 text-swimspot-blue-green" />
                      </div>
                      <h4 className="font-medium text-swimspot-blue-green">Weather</h4>
                      <p className="text-gray-600">{swimSpot.bestTimes.weather}</p>
                    </div>
                    <div className="bg-swimspot-drift-sand/50 p-4 rounded-xl text-center">
                      <div className="flex justify-center mb-2">
                        <Waves className="h-6 w-6 text-swimspot-blue-green" />
                      </div>
                      <h4 className="font-medium text-swimspot-blue-green">Conditions</h4>
                      <p className="text-gray-600">{swimSpot.bestTimes.waterCondition}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl text-swimspot-blue-green">Reviews</h2>
                    <Button className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90">
                      Write a Review
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {swimSpot.reviews.map((review, index) => (
                      <div key={index} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-swimspot-blue-green text-white">
                              {review.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-swimspot-blue-green">{review.author}</h4>
                              <span className="text-xs text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center mt-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700 mb-3">{review.comment}</p>
                            <div className="flex items-center gap-6 text-gray-500 text-sm">
                              <button className="flex items-center gap-1 hover:text-swimspot-blue-green">
                                <ThumbsUp className="h-4 w-4" />
                                Helpful ({review.helpfulCount})
                              </button>
                              <button className="flex items-center gap-1 hover:text-swimspot-blue-green">
                                <MessageSquare className="h-4 w-4" />
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="nearby" className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif text-2xl text-swimspot-blue-green mb-6">Nearby Swim Spots</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {swimSpots.filter(spot => spot.id.toString() !== id).slice(0, 4).map((spot) => (
                      <Link 
                        key={spot.id} 
                        to={`/spot/${spot.id}`}
                        className="flex bg-swimspot-drift-sand/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="w-1/3">
                          <img 
                            src={spot.image} 
                            alt={spot.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-3">
                          <h3 className="font-medium text-swimspot-blue-green mb-1">{spot.name}</h3>
                          <div className="flex items-center text-xs text-gray-600 mb-1">
                            <Droplet className="h-3 w-3 mr-1" />
                            {spot.waterType}
                            <span className="mx-2">•</span>
                            <span className={`${
                              spot.quality === 'Excellent' 
                                ? 'text-green-600' 
                                : spot.quality === 'Good' 
                                ? 'text-blue-600' 
                                : 'text-orange-600'
                            }`}>{spot.quality}</span>
                          </div>
                          <p className="text-xs text-gray-500">2.5 km away</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h3 className="font-serif text-xl text-swimspot-blue-green mb-4">Location</h3>
              
              {/* Map placeholder */}
              <div className="h-48 bg-swimspot-blue-mist rounded-lg flex items-center justify-center mb-4">
                <p className="text-sm text-swimspot-blue-green">Map will be integrated here</p>
              </div>
              
              <p className="text-gray-700 mb-4">{swimSpot.address}</p>
              
              <Button className="w-full bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
                <Map className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h3 className="font-serif text-xl text-swimspot-blue-green mb-4">Water Quality History</h3>
              
              {/* Chart placeholder */}
              <div className="h-48 bg-swimspot-blue-mist/30 rounded-lg flex items-center justify-center mb-4">
                <p className="text-sm text-swimspot-blue-green">Quality chart will be displayed here</p>
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                Data from the past 90 days
              </div>
            </div>
            
            <div className="bg-swimspot-blue-green rounded-2xl p-6 shadow-sm text-white">
              <h3 className="font-serif text-xl mb-3">Start Swimming</h3>
              <p className="text-white/80 mb-4">Join a swim group at this location to meet fellow swimmers.</p>
              
              <Link to="/groups">
                <Button className="w-full bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90">
                  Find Swim Groups
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder data
const swimSpots = [
  {
    id: 1,
    name: "Amstel River Oasis",
    image: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
    imageLarge: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
    quality: "Excellent",
    waterType: "River",
    tags: ["River", "Family-friendly", "Picnic Area", "Shallow Entry"],
    description: "A peaceful swimming spot along the Amstel with clear waters and grassy banks perfect for picnics and sunbathing. This area features a gentle slope into the water making it ideal for families with children and those looking for a relaxing swim experience in natural surroundings.",
    address: "Amstelpark, 1083 Amsterdam",
    waterTemperature: 19,
    current: "Mild",
    isPremium: false,
    facilities: {
      changingRooms: true,
      restrooms: true,
      lifeguard: false,
      foodDrinks: true
    },
    bestTimes: {
      season: "Summer",
      timeOfDay: "Morning",
      weather: "Sunny",
      waterCondition: "Calm"
    },
    reviews: [
      {
        author: "Emma K.",
        rating: 5,
        date: "July 15, 2023",
        comment: "Beautiful spot with clean water. The picnic area is perfect for spending the whole day. Water was refreshing and the entry is gradual which is great for kids!",
        helpfulCount: 12
      },
      {
        author: "Thomas V.",
        rating: 4,
        date: "August 3, 2023",
        comment: "Really enjoyed swimming here. The water quality is excellent, though it can get crowded on weekends. Would recommend coming early.",
        helpfulCount: 8
      },
      {
        author: "Sophie R.",
        rating: 5,
        date: "July 28, 2023",
        comment: "Hidden gem! We spent the whole day here and the water was perfect. Clean facilities and beautiful surroundings.",
        helpfulCount: 5
      }
    ]
  },
  {
    id: 2,
    name: "Nieuwe Meer Beach",
    image: "https://source.unsplash.com/photo-1506744038136-46273834b3fb",
    imageLarge: "https://source.unsplash.com/photo-1506744038136-46273834b3fb",
    quality: "Good",
    waterType: "Lake",
    tags: ["Lake", "Sandy Beach", "Sunset Views", "Deep Water"],
    description: "Popular lake beach with sandy shores and beautiful sunset views. This family-friendly location features designated swimming areas with both shallow and deeper sections. The surrounding park offers plenty of shade and facilities, making it perfect for a full day of water activities.",
    address: "Nieuwe Meer, Amsterdam",
    waterTemperature: 21,
    current: "None",
    isPremium: false,
    facilities: {
      changingRooms: true,
      restrooms: true,
      lifeguard: true,
      foodDrinks: true
    },
    bestTimes: {
      season: "Late Summer",
      timeOfDay: "Late Afternoon",
      weather: "Sunny",
      waterCondition: "Calm"
    },
    reviews: [
      {
        author: "Jan D.",
        rating: 4,
        date: "August 12, 2023",
        comment: "Great beach with nice views. Water was clean but gets deep quickly in some areas - be careful with small children.",
        helpfulCount: 7
      },
      {
        author: "Lieke M.",
        rating: 5,
        date: "July 23, 2023",
        comment: "The sunset views are incredible! Perfect for evening swims. Sandy beach is well-maintained and the water quality is good.",
        helpfulCount: 10
      }
    ]
  },
  {
    id: 3,
    name: "Hidden Canal Gem",
    image: "https://source.unsplash.com/photo-1482938289607-e9573fc25ebb",
    imageLarge: "https://source.unsplash.com/photo-1482938289607-e9573fc25ebb",
    quality: "Good",
    waterType: "Canal",
    tags: ["Canal", "Historic", "Urban", "Ladder Entry"],
    description: "A lesser-known urban swimming spot in a clean canal section with easy access and historic surroundings. This unique swimming experience offers a chance to enjoy Amsterdam's canal culture in a safe environment. Special swimming ladders provide easy entry and exit points.",
    address: "Westelijke Eilanden, Amsterdam",
    waterTemperature: 18,
    current: "Mild",
    isPremium: true,
    facilities: {
      changingRooms: false,
      restrooms: true,
      lifeguard: false,
      foodDrinks: true
    },
    bestTimes: {
      season: "Summer",
      timeOfDay: "Midday",
      weather: "Warm",
      waterCondition: "Monitored"
    },
    reviews: [
      {
        author: "Mark V.",
        rating: 4,
        date: "July 8, 2023",
        comment: "Unique experience swimming in an Amsterdam canal! The water was surprisingly clean and the surrounding architecture is beautiful.",
        helpfulCount: 15
      },
      {
        author: "Clara Z.",
        rating: 3,
        date: "August 5, 2023",
        comment: "Interesting spot but you need to be a confident swimmer. The ladders make it easy to get in and out. Lots of boat traffic nearby though.",
        helpfulCount: 6
      }
    ]
  },
  {
    id: 4,
    name: "Sloterplas Shores",
    image: "https://source.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    imageLarge: "https://source.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    quality: "Moderate",
    waterType: "Lake",
    tags: ["Lake", "Family-friendly", "Shallow Waters", "Playground"],
    description: "Sloterplas is one of Amsterdam's largest lakes with several swimming areas. This particular shore features shallow waters ideal for families with small children. The adjacent park has playgrounds and picnic facilities, making it a perfect day trip destination.",
    address: "Sloterplas, Amsterdam",
    waterTemperature: 20,
    current: "None",
    isPremium: false,
    facilities: {
      changingRooms: true,
      restrooms: true,
      lifeguard: true,
      foodDrinks: true
    },
    bestTimes: {
      season: "Summer",
      timeOfDay: "Morning",
      weather: "Any",
      waterCondition: "Monitored"
    },
    reviews: [
      {
        author: "Gert J.",
        rating: 3,
        date: "July 29, 2023",
        comment: "Good spot for families. Water quality is decent but can vary. The playground nearby is great for kids when they're done swimming.",
        helpfulCount: 8
      },
      {
        author: "Annemieke T.",
        rating: 4,
        date: "August 14, 2023",
        comment: "Nice beach area with gentle slope into the water. Perfect for my toddler. Facilities are clean and well-maintained.",
        helpfulCount: 5
      }
    ]
  },
  {
    id: 5,
    name: "Erasmuspark Pond",
    image: "https://source.unsplash.com/photo-1487252665478-49b61b47f302",
    imageLarge: "https://source.unsplash.com/photo-1487252665478-49b61b47f302",
    quality: "Good",
    waterType: "Pond",
    tags: ["Secluded", "Natural", "Bird Watching"],
    description: "A serene swimming pond tucked away in Erasmuspark. This natural swimming spot offers a peaceful retreat from the city with its lush surroundings and diverse wildlife. The water is monitored regularly for quality and the secluded nature makes it a favorite among locals.",
    address: "Erasmuspark, Amsterdam",
    waterTemperature: 19,
    current: "None",
    isPremium: true,
    facilities: {
      changingRooms: false,
      restrooms: true,
      lifeguard: false,
      foodDrinks: false
    },
    bestTimes: {
      season: "Late Spring",
      timeOfDay: "Early Morning",
      weather: "Clear",
      waterCondition: "Still"
    },
    reviews: [
      {
        author: "Lisa R.",
        rating: 5,
        date: "June 17, 2023",
        comment: "Absolute paradise! So peaceful and the water is clean. Spotted several bird species while swimming. It feels like you're far from the city.",
        helpfulCount: 11
      },
      {
        author: "David K.",
        rating: 4,
        date: "July 5, 2023",
        comment: "Beautiful natural setting. The water was a perfect temperature and very clean. Limited facilities but that adds to the charm.",
        helpfulCount: 7
      }
    ]
  }
];

export default SwimSpotDetail;
