
import HeroSection from "@/components/about/HeroSection";
import FeaturesSection from "@/components/about/FeaturesSection";
import FeaturedSpotsSection from "@/components/about/FeaturedSpotsSection";
import PremiumSubscriptionSection from "@/components/about/PremiumSubscriptionSection";
import BlogSection from "@/components/about/BlogSection";
import CommunityBanner from "@/components/about/CommunityBanner";
import { featuredSpots } from "@/components/about/data";

const About = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <FeaturedSpotsSection spots={featuredSpots} />
      <PremiumSubscriptionSection />
      <BlogSection />
      <CommunityBanner />
    </div>
  );
};

export default About;
