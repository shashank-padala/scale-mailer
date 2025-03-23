
import { ArrowRight } from "lucide-react";
import Button from "./Button";

const HeroSection = () => {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Subtle label */}
          <div className="inline-block rounded-full px-4 py-1 mb-8 bg-brand-primary/10 text-brand-primary animate-fadeIn">
            <span className="text-sm font-medium">Early Access Program</span>
          </div>
          
          {/* Main headline */}
          <h1 className="font-semibold text-brand-dark mb-6 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            Automate Your Cold Email Infrastructure.
            <br />
            <span className="text-brand-primary">Scale Without Limits.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-brand-muted mb-10 leading-relaxed max-w-3xl animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            From domain warm-up to inbox rotation and deliverability monitoring — we handle the backend so you can focus on closing deals.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
            <Button 
              variant="primary" 
              size="lg"
              icon={<ArrowRight size={20} />} 
              iconPosition="right"
              onClick={() => document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join the Beta
            </Button>
            <Button 
              variant="outlined" 
              size="lg"
            >
              Book a Demo
            </Button>
          </div>
        </div>
        
        {/* Visual element */}
        <div className="mt-16 md:mt-24 relative max-w-4xl mx-auto animate-scaleIn" style={{ animationDelay: "0.8s" }}>
          <div className="relative z-20 rounded-xl overflow-hidden shadow-intense">
            <div className="aspect-[16/9] bg-gradient-to-br from-brand-primary/90 to-brand-accent/90 text-center flex items-center justify-center p-4 md:p-8">
              <div className="glass rounded-lg p-4 md:p-8 w-full max-w-xl">
                <div className="text-left space-y-3 w-full">
                  <div className="h-4 w-24 bg-white/30 rounded-full"></div>
                  <div className="h-6 w-full bg-white/20 rounded-full"></div>
                  <div className="h-6 w-5/6 bg-white/20 rounded-full"></div>
                  <div className="h-6 w-4/6 bg-white/20 rounded-full"></div>
                  <div className="pt-4 flex space-x-3">
                    <div className="h-10 w-24 bg-white/40 rounded-lg"></div>
                    <div className="h-10 w-24 bg-white/20 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-brand-secondary rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-brand-accent/20 rounded-full opacity-60 animate-float"></div>
        </div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-brand-secondary/80 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
