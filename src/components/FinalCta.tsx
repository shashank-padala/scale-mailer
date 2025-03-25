
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { ArrowRight } from "lucide-react";
import { DEMO_CALL_URL } from "@/config/constants";

const FinalCta = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="section bg-brand-dark text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgY3g9IjMwIiBjeT0iMzAiIHI9IjEiLz48L2c+PC9zdmc+')] opacity-40"></div>
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 
          className={cn(
            "text-4xl md:text-5xl font-medium mb-6 transition-all duration-700 transform", 
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          Cold Email Scaling 
          <span className="text-brand-primary"> Shouldn't Be This Hard.</span>
        </h2>
        
        <p 
          className={cn(
            "text-xl md:text-2xl text-white/80 mb-10 transition-all duration-700 transform", 
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: "200ms" }}
        >
          Join the early adopters transforming how outreach is done — 
          with automation, reliability, and peace of mind.
        </p>
        
        <div 
          className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 transform", 
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: "400ms" }}
        >
          <Button 
            variant="primary" 
            size="lg"
            icon={<ArrowRight size={20} />} 
            iconPosition="right"
            className="bg-white text-brand-primary hover:bg-white/90"
            onClick={() => document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join the Beta Waitlist
          </Button>
          
          <Button 
            variant="outlined" 
            size="lg"
            className="border-white/30 text-white hover:bg-white/10"
            onClick={() => window.open(DEMO_CALL_URL, '_blank')}
          >
            Book a Demo
          </Button>
        </div>
      </div>
      
      {/* Visual elements */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-brand-primary/10 rounded-full"></div>
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-brand-accent/10 rounded-full"></div>
    </section>
  );
};

export default FinalCta;
