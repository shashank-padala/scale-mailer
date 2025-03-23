
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TestimonialSection = () => {
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
    <section ref={sectionRef} className="section bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div 
            className={cn(
              "inline-block rounded-full px-4 py-1 mb-6 bg-brand-primary/10 text-brand-primary transition-all duration-700", 
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <span className="text-sm font-medium">Testimonials</span>
          </div>
          
          <h2 
            className={cn(
              "transition-all duration-700 transform", 
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            What Early Testers Are Saying
          </h2>
        </div>

        {/* Placeholder for future testimonials */}
        <div 
          className={cn(
            "bg-brand-secondary/30 rounded-xl p-8 text-center transition-all duration-700 transform",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          <p className="text-lg text-brand-muted italic">
            "Testimonials from early users will appear here. Be among the first to test our platform and share your experience."
          </p>
          
          <div className="mt-8 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-brand-secondary animate-pulse"></div>
            <div className="mt-4 space-y-2">
              <div className="h-5 w-32 bg-brand-secondary/70 rounded-full mx-auto"></div>
              <div className="h-4 w-24 bg-brand-secondary/50 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
