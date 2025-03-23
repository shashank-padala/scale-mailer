import { useEffect, useRef, useState } from "react";
import { 
  Activity, Server, Shield, List, BarChart3, 
  Zap, Settings, RotateCw 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SolutionFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: SolutionFeature[] = [
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Auto Domain Setup",
    description: "Get domains, configure DNS, SPF/DKIM/DMARC — all automated."
  },
  {
    icon: <RotateCw className="h-6 w-6" />,
    title: "Smart Email Warm-Up",
    description: "Human-like warm-up behavior to build trust with inbox providers."
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: "Inbox Rotation & Load Balancing",
    description: "Maximize sending capacity without hurting deliverability."
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: "Deliverability Health Monitoring",
    description: "Get alerts before your emails hit spam."
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Live Campaign Tracking",
    description: "Manage and monitor everything from a single dashboard."
  }
];

const SolutionSection = () => {
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
    <section ref={sectionRef} id="features" className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div 
            className={cn(
              "inline-block rounded-full px-4 py-1 mb-6 bg-brand-primary/10 text-brand-primary transition-all duration-700", 
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <span className="text-m font-bold">Solution</span>
          </div>
          
          <h2 
            className={cn(
              "transition-all duration-700 transform", 
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            A Fully-Automated Cold Email Engine
            <span className="block text-brand-primary">Built for Performance</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white rounded-xl p-6 shadow-elevated hover:shadow-intense transition-all duration-300 transform",
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-20"
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="bg-brand-secondary rounded-lg w-12 h-12 flex items-center justify-center mb-4 text-brand-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-brand-muted">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Visual indicator */}
        {/* <div className={cn(
          "mt-16 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-elevated transition-all duration-700 delay-700 transform",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <div className="bg-brand-secondary aspect-[21/9] relative">
            <div className="absolute inset-0 p-8 flex flex-col">
              <div className="h-8 w-full flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-brand-error"></div>
                  <div className="h-3 w-3 rounded-full bg-brand-warning"></div>
                  <div className="h-3 w-3 rounded-full bg-brand-success"></div>
                </div>
                <div className="h-6 w-1/3 bg-white/20 rounded-md"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4 flex-grow">
                <div className="col-span-2">
                  <div className="h-full bg-white/10 rounded-lg p-4">
                    <div className="h-4 w-1/3 bg-white/20 rounded-md mb-4"></div>
                    <div className="flex space-x-1 h-40">
                      <div className="w-1/6 bg-brand-primary/30 rounded-sm self-end h-1/3"></div>
                      <div className="w-1/6 bg-brand-primary/50 rounded-sm self-end h-1/2"></div>
                      <div className="w-1/6 bg-brand-primary/70 rounded-sm self-end h-2/3"></div>
                      <div className="w-1/6 bg-brand-primary/90 rounded-sm self-end h-3/4"></div>
                      <div className="w-1/6 bg-brand-primary rounded-sm self-end h-5/6"></div>
                      <div className="w-1/6 bg-brand-accent/80 rounded-sm self-end h-full"></div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="h-full flex flex-col space-y-4">
                    <div className="h-1/2 bg-white/10 rounded-lg p-4">
                      <div className="h-4 w-1/2 bg-white/20 rounded-md mb-4"></div>
                      <div className="flex items-center justify-center h-24">
                        <div className="h-24 w-24 rounded-full border-4 border-brand-success flex items-center justify-center">
                          <div className="text-lg font-bold text-brand-success">98%</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-1/2 bg-white/10 rounded-lg p-4">
                      <div className="h-4 w-1/2 bg-white/20 rounded-md mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3 w-full bg-white/20 rounded-md"></div>
                        <div className="h-3 w-5/6 bg-white/20 rounded-md"></div>
                        <div className="h-3 w-4/6 bg-white/20 rounded-md"></div>
                        <div className="h-3 w-3/6 bg-white/20 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>*/}
      </div>
    </section>
  );
};

export default SolutionSection;
