
import React, { useEffect, useRef, useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonItem {
  feature: string;
  competitors: boolean;
  scaleMailer: boolean;
  competitorNote?: string;
  scaleMailerNote?: string;
}

const comparisonData: ComparisonItem[] = [
  {
    feature: "Email sending",
    competitors: true,
    scaleMailer: true,
  },
  {
    feature: "Inbox warm-up",
    competitors: true,
    scaleMailer: true,
  },
  {
    feature: "Multi-inbox rotation",
    competitors: true,
    scaleMailer: true,
    competitorNote: "limited logic",
    scaleMailerNote: "customizable & smarter logic",
  },
  {
    feature: "Domain purchase & inbox creation",
    competitors: false,
    scaleMailer: true,
    competitorNote: "manual",
    scaleMailerNote: "fully automated or assisted",
  },
  {
    feature: "Blacklist monitoring",
    competitors: false,
    scaleMailer: true,
    competitorNote: "not built-in",
  },
  {
    feature: "One dashboard to manage 40 inboxes",
    competitors: false,
    scaleMailer: true,
    competitorNote: "messy or not scalable",
  },
  {
    feature: "Done-for-you infra",
    competitors: false,
    scaleMailer: true,
    competitorNote: "DIY setup",
    scaleMailerNote: "infra-as-a-service for agencies",
  },
  {
    feature: "Focus on agency-scale cold email infra",
    competitors: false,
    scaleMailer: true,
    competitorNote: "targeting individual SDRs or small teams",
    scaleMailerNote: "built for agencies running 10k+ emails/day",
  },
];

const ValuePropositionSection = () => {
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
    <section ref={sectionRef} className="section py-20 bg-brand-secondary/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* What are you actually trying to build */}
        <div className="mb-20">
          <div 
            className={cn(
              "inline-block rounded-full px-4 py-1 mb-6 bg-brand-primary/10 text-brand-primary transition-all duration-700", 
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <span className="text-m font-bold">The Big Picture</span>
          </div>
          
          <h2 
            className={cn(
              "transition-all duration-700 transform mb-8", 
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            🔍 What Are You Actually Trying to Build?
          </h2>
          
          <p
            className={cn(
              "text-xl mb-8 text-brand-muted transition-all duration-700 transform", 
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            You're building a backend automation engine for cold email at scale — not just a sending tool, but a system that:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              "Automates domain setup and inbox creation",
              "Warms up inboxes automatically",
              "Manages inbox rotation intelligently",
              "Maintains deliverability (SPF/DKIM/DMARC/blacklist monitoring)",
              "Gives a single dashboard to manage 10s–100s of inboxes",
              "Acts as a plug-and-play infra layer for lead gen agencies"
            ].map((item, index) => (
              <div 
                key={index}
                className={cn(
                  "flex items-start gap-3 transition-all duration-500 transform", 
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="rounded-full p-1 bg-brand-primary/10 text-brand-primary">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-lg">{item}</p>
              </div>
            ))}
          </div>
          
          <p
            className={cn(
              "text-xl font-medium transition-all duration-700 transform", 
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: "800ms" }}
          >
            That's the big picture.
          </p>
        </div>
        
        {/* Comparison table */}
        <div>
          <h2 
            className={cn(
              "transition-all duration-700 transform mb-8", 
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: "900ms" }}
          >
            ⚙️ How Is This Different From Instantly, Smartlead, Lemlist, etc.?
          </h2>
          
          <p
            className={cn(
              "text-xl mb-8 text-brand-muted transition-all duration-700 transform", 
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: "1000ms" }}
          >
            Here's the honest comparison:
          </p>
          
          <div 
            className={cn(
              "overflow-x-auto transition-all duration-700 transform mb-12 rounded-xl shadow-elevated", 
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: "1100ms" }}
          >
            <table className="w-full min-w-[768px] bg-white">
              <thead>
                <tr className="bg-brand-secondary/20">
                  <th className="p-4 text-left font-medium border-b">Feature</th>
                  <th className="p-4 text-left font-medium border-b">Instantly / Lemlist / Smartlead</th>
                  <th className="p-4 text-left font-medium border-b">ScaleMailer (What You're Building)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-brand-secondary/5"}>
                    <td className="p-4 border-b">{item.feature}</td>
                    <td className="p-4 border-b">
                      <div className="flex items-center gap-2">
                        {item.competitors ? (
                          <div className="rounded-full p-1 bg-brand-success/10 text-brand-success">
                            <Check className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="rounded-full p-1 bg-brand-error/10 text-brand-error">
                            <X className="h-4 w-4" />
                          </div>
                        )}
                        {item.competitorNote && <span className="text-sm text-brand-muted">({item.competitorNote})</span>}
                      </div>
                    </td>
                    <td className="p-4 border-b">
                      <div className="flex items-center gap-2">
                        {item.scaleMailer ? (
                          <div className="rounded-full p-1 bg-brand-success/10 text-brand-success">
                            <Check className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="rounded-full p-1 bg-brand-error/10 text-brand-error">
                            <X className="h-4 w-4" />
                          </div>
                        )}
                        {item.scaleMailerNote && <span className="text-sm text-brand-muted">({item.scaleMailerNote})</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Unique value proposition */}
          <div 
            className={cn(
              "bg-brand-dark text-white p-8 rounded-xl shadow-elevated transition-all duration-700 transform", 
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: "1200ms" }}
          >
            <h3 className="text-2xl mb-4 font-medium">💥 The Unique Value Proposition (UVP) of ScaleMailer:</h3>
            <p className="text-xl mb-4">
              "ScaleMailer is the first cold email infrastructure platform built specifically for agencies that run 10,000+ emails a day — without the pain of managing 40 inboxes, warmups, or domains manually."
            </p>
            <p className="text-xl">
              It's not just another cold email tool — it's a cold email infra layer.
            </p>
            <p className="text-xl mt-4 font-medium">
              You're not replacing Instantly. You're creating the backend engine they wish they had.
            </p>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-primary/10 rounded-full opacity-50"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-accent/10 rounded-full opacity-50"></div>
    </section>
  );
};

export default ValuePropositionSection;
