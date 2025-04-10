import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { Menu, X } from "lucide-react";
import { FiSend } from 'react-icons/fi';
import { DEMO_CALL_URL } from "@/config/constants";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Control header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-300 ease-in-out",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          {/* Icon */}
          <FiSend className="text-[#3C82F4] w-6 h-6" />

          {/* Brand name with color split */}
          <span className="text-xl font-semibold">
            <span className="text-[#3C82F4]">Scale</span>
            <span className="text-black">Mailer</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-brand-dark hover:text-brand-primary smooth-transition animated-underline">
            Features
          </a>
          <a href="/dashboard" className="text-brand-dark hover:text-brand-primary smooth-transition animated-underline">
            Dashboard Preview
          </a>
          <Button variant="outlined" size="sm"  onClick={() => window.open(DEMO_CALL_URL, '_blank')}>
            Book a Demo
          </Button>
          <Button variant="primary" size="sm" onClick={() => document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' })}>
            Join the Beta
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-brand-dark focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 pt-20 px-4 transition-all duration-300 ease-in-out md:hidden",
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-6 items-center">
          <a href="#features" className="text-xl text-brand-dark hover:text-brand-primary">
            Features
          </a>
          <a href="/dashboard" className="text-xl text-brand-dark hover:text-brand-primary">
            Dashboard Preview
          </a>
          <div className="pt-6 w-full space-y-4">
            <Button variant="outlined" className="w-full" onClick={() => window.open('https://calendly.com/shashank-padala/15-mins', '_blank')}>
              Book a Demo
            </Button>
            <Button variant="primary" className="w-full" onClick={() => document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' })}>
              Join the Beta
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;