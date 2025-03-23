
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import PersonaSection from "@/components/PersonaSection";
import BetaSection from "@/components/BetaSection";
import TestimonialSection from "@/components/TestimonialSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <PersonaSection />
        <BetaSection />
        <TestimonialSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
