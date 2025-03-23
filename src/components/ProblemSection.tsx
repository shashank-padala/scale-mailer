
import { Activity, Server, Shield, List, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ProblemItem {
  icon: React.ReactNode;
  title: string;
}

const problemItems: ProblemItem[] = [
  {
    icon: <Server className="h-5 w-5" />,
    title: "Managing 20+ inboxes manually",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Domains getting blacklisted",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Low deliverability killing campaigns",
  },
  {
    icon: <List className="h-5 w-5" />,
    title: "No visibility on what's going wrong",
  },
  {
    icon: <AlertCircle className="h-5 w-5" />,
    title: "Burnout from technical setup",
  },
];

const ProblemSection = () => {
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
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            className={cn(
              "transition-all duration-700 transform", 
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Running Cold Email at Scale Is <span className="text-brand-warning">Painful.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
          <div className="col-span-1 md:col-span-2">
            <ul className="space-y-6">
              {problemItems.map((item, index) => (
                <li 
                  key={index}
                  className={cn(
                    "flex items-start bg-white/5 backdrop-blur rounded-lg p-4 md:p-6 transition-all duration-700 delay-200 transform",
                    isVisible 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 -translate-x-10"
                  )}
                  style={{ 
                    transitionDelay: `${200 + index * 100}ms`,
                    animationDelay: `${200 + index * 100}ms` 
                  }}
                >
                  <div className="mr-4 p-2 rounded-full bg-brand-primary/20 text-brand-primary">
                    {item.icon}
                  </div>
                  <span className="text-lg">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1 flex items-center justify-center">
            <div 
              className={cn(
                "bg-white/5 backdrop-blur rounded-lg p-6 text-center transition-all duration-700 delay-700 transform",
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              )}
            >
              <p className="text-lg leading-relaxed">
                We've been there — and we're building the tool we wish we had.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-brand-primary/20 rounded-full opacity-60"></div>
      <div className="absolute top-16 -left-16 w-40 h-40 bg-brand-accent/10 rounded-full opacity-40"></div>
    </section>
  );
};

export default ProblemSection;
