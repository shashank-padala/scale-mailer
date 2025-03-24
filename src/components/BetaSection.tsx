import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { ArrowRight, Zap, Users, MessageSquare, Shield, Headphones } from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; // Ensure this file uses import.meta.env for secrets

interface BetaBenefit {
  icon: React.ReactNode;
  title: string;
}

const betaBenefits: BetaBenefit[] = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Get early access to a powerful email infra engine"
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Influence the product roadmap"
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Lifetime deal & priority support for early adopters"
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Exclusive Slack/Discord community access"
  },
  {
    icon: <Headphones className="h-5 w-5" />,
    title: "Free migration/setup assistance"
  }
];

const BetaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      company: formData.get("company"),
      role: formData.get("role"),
      email_volume: formData.get("email_volume")
    };

    const { error } = await supabase.from("beta_signups").insert([data]);

    if (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    } else {
      alert("Thanks for signing up! 🎉");
      e.currentTarget.reset();
    }
    setIsSubmitting(false);
  };

  return (
    <section
      ref={sectionRef}
      id="beta"
      className="section bg-gradient-to-b from-white to-brand-secondary/30 relative"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className={cn(
                "inline-block rounded-full px-4 py-1 mb-6 bg-brand-primary/10 text-brand-primary transition-all duration-700",
                isVisible ? "opacity-100" : "opacity-0"
              )}
            >
              <span className="text-sm font-medium">Early Access</span>
            </div>

            <h2
              className={cn(
                "mb-6 transition-all duration-700 transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              Be Part of the Founding Circle
            </h2>

            <div className="space-y-6 mb-8">
              {betaBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center transition-all duration-500 transform",
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  )}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="mr-4 text-brand-primary">{benefit.icon}</div>
                  <span className="text-lg text-brand-dark">{benefit.title}</span>
                </div>
              ))}
            </div>

            <div
              className={cn(
                "transition-all duration-700 delay-500 transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              {/* <Button variant="primary" size="lg" icon={<ArrowRight size={20} />} iconPosition="right">
                Apply for Beta Access
              </Button> */}
            </div>
          </div>

          <div
            className={cn(
              "relative transition-all duration-700 delay-300 transform rounded-xl overflow-hidden",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            )}
          >
            <div className="lg:aspect-[4/5] bg-gradient-to-br from-brand-primary to-brand-accent p-8 rounded-xl relative">
              <div
                className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4yIiBjeD0iMTAiIGN5PSIxMCIgcj0iMi41Ii8+PC9nPjwvc3ZnPg==')] opacity-20"
              ></div>

              <div className="glass rounded-lg p-6 h-full flex flex-col">
                <div className="text-xl text-black mb-6 font-medium">Beta Program Application</div>

                <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
                  <div>
                    <label className="block text-black/80 text-sm mb-1" htmlFor="full_name">
                      Full Name
                    </label>
                    <input
                      name="full_name"
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-black/80 text-sm mb-1" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-black/80 text-sm mb-1" htmlFor="company">
                      Company
                    </label>
                    <input
                      name="company"
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label className="block text-black/80 text-sm mb-1" htmlFor="role">
                      Your Role
                    </label>
                    <select
                      name="role"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-white/30"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select your role
                      </option>
                      <option value="agency">Agency Owner</option>
                      <option value="marketer">Marketer</option>
                      <option value="founder">Startup Founder</option>
                      <option value="sdr">SDR/BDR</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-black/80 text-sm mb-1" htmlFor="email_volume">
                      Monthly Email Volume
                    </label>
                    <select
                      name="email_volume"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray focus:outline-none focus:ring-2 focus:ring-white/30"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select volume
                      </option>
                      <option value="low">Less than 5,000</option>
                      <option value="medium">5,000 - 20,000</option>
                      <option value="high">20,000 - 100,000</option>
                      <option value="enterprise">100,000+</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-brand-primary font-medium rounded-lg py-3 transition-all hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetaSection;
