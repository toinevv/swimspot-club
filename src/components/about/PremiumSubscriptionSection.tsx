
import { CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PremiumSubscriptionSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-swimspot-blue-green mb-4">Premium Membership</h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Join our premium membership for just €4,99 per month - the price of a premium coffee - and unlock exclusive benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <Card className="border-2 border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-serif text-2xl font-medium mb-2">Free</h3>
              <p className="text-gray-500">Basic access</p>
              <div className="mt-4 text-3xl font-bold">€0</div>
            </div>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">Access to public swim spots</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">Join one swim group</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">Basic community features</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button variant="outline" className="w-full">Current Plan</Button>
              </div>
            </CardContent>
          </Card>

          {/* Premium Tier */}
          <Card className="border-2 border-swimspot-burnt-coral relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-swimspot-burnt-coral text-white px-3 py-1 text-sm font-medium">
              Popular
            </div>
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-serif text-2xl font-medium mb-2">Premium</h3>
              <p className="text-gray-500">Enhanced experience</p>
              <div className="mt-4">
                <span className="text-3xl font-bold">€4,99</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
            </div>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-swimspot-burnt-coral mr-2" />
                  <span className="text-gray-800">Access to all swim spots</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-swimspot-burnt-coral mr-2" />
                  <span className="text-gray-800">Discount codes at featured spots</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-swimspot-burnt-coral mr-2" />
                  <span className="text-gray-800">Join multiple swim groups</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-swimspot-burnt-coral mr-2" />
                  <span className="text-gray-800">Premium-only swim spots</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-swimspot-burnt-coral mr-2" />
                  <span className="text-gray-800">Enhanced community features</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button className="w-full bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90">
                  Subscribe Now <Star className="ml-2 h-4 w-4" />
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
