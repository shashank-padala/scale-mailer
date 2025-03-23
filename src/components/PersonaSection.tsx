
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Activity, Users, Briefcase, Target } from "lucide-react";

interface PersonaCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const personas: PersonaCard[] = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Lead Gen Agencies",
    description: "Focus on results, not on backend tech."
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: "Course Creators & Coaches",
    description: "Automate outreach without burning domains."
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "SaaS Founders",
    description: "Scale outreach to hundreds without hurting brand reputation."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Freelancers & SDRs",
    description: "Start strong without tech headaches."
  }
];

const PersonaSection = () => {
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
    <section 
      ref={sectionRef} 
      id="for-whom"
      className="section bg-gradient-to-b from-brand-secondary/50 to-transparent relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div 
            className={cn(
              "inline-block rounded-full px-4 py-1 mb-6 bg-brand-primary/10 text-brand-primary transition-all duration-700", 
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <span className="text-sm font-medium">For Whom</span>
          </div>
          
          <h2 
            className={cn(
              "transition-all duration-700 transform", 
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Built for Cold Email Pros Who Want to Scale
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white rounded-xl p-6 shadow-sm hover:shadow-elevated group transition-all duration-300 transform border border-transparent hover:border-brand-primary/10",
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="bg-brand-primary/10 group-hover:bg-brand-primary/20 rounded-lg w-12 h-12 flex items-center justify-center mb-4 text-brand-primary transition-all duration-300">
                {persona.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{persona.title}</h3>
              <p className="text-brand-muted">{persona.description}</p>
            </div>
          ))}
        </div>

        {/* Visual elements */}
        <div 
          className={cn(
            "mt-16 max-w-4xl mx-auto flex justify-center transition-all duration-700 delay-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 rounded-full blur-[100px] opacity-50"></div>
            <div className="relative z-10 bg-white px-8 py-6 rounded-lg shadow-elevated max-w-lg text-center">
              <p className="text-xl leading-relaxed text-brand-dark">
                From single-person operations to agencies managing <span className="text-brand-primary font-medium">hundreds of campaigns</span>, our platform scales with your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonaSection;
