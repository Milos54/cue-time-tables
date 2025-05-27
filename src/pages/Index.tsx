
import { Hero } from "@/components/Hero";
import { GamesSection } from "@/components/GamesSection";
import { RankingsSection } from "@/components/RankingsSection";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Navigation />
      <Hero />
      <GamesSection />
      <RankingsSection />
    </div>
  );
};

export default Index;
