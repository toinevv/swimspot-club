
import { CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PremiumSubscriptionSection = () => {
  return (
    <section className="py-20 bg-swimspot-blue-green">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Support SwimSpot</h2>
          <p className="text-lg text-white/90 max-w-2xl mb-4">
            Support our mission for the price of a coffee - and help us maintain the best swimming community in Europe.
          </p>
          <p className="text-sm text-white/80 max-w-2xl">
            Contact us if you want a free account to become an admin, moderator or just be a platform enthusiast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <Card className="border-2 border-white/20 bg-white/10 backdrop-blur-sm">
            <div className="p-6 border-b border-white/20">
              <h3 className="font-serif text-2xl font-medium mb-2 text-white">Free</h3>
              <p className="text-white/70">Basic access</p>
              <div className="mt-4 text-3xl font-bold text-white">€0</div>
            </div>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-white/60 mr-2" />
                  <span className="text-white/80">Access to all swim spots</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-white/60 mr-2" />
                  <span className="text-white/80">Join one swim group</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-white/60 mr-2" />
                  <span className="text-white/80">Basic community features</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">Current Plan</Button>
              </div>
            </CardContent>
          </Card>

          {/* Supporter Tier */}
          <Card className="border-2 border-swimspot-burnt-coral relative overflow-hidden bg-white">
            <div className="absolute top-0 right-0 bg-swimspot-burnt-coral text-white px-3 py-1 text-sm font-medium">
              Popular
            </div>
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-serif text-2xl font-medium mb-2">Supporter</h3>
              <p className="text-gray-500">Help us grow</p>
              <div className="mt-4">
                <span className="text-3xl font-bold">€4,99</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
            </div>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-swimspot-burnt-coral mr-2" />
                  <span className="text-gray-800">Access to community added hidden swimspots</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-swimspot-burnt-coral mr-2" />
                  <span className="text-gray-800">Discount codes at all our partner cafes and shops</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-swimspot-burnt-coral mr-2" />
                  <span className="text-gray-800">Join multiple swim groups</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-swimspot-burnt-coral mr-2" />
                  <span className="text-gray-800">Enhanced community features to customize your public profile</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button className="w-full bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90">
                  Become a Supporter <Star className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PremiumSubscriptionSection;
