
// src/components/Header.tsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { APP_NAME } from "@/config/constants";
import Button from "./Button";
import { DEMO_CALL_URL } from "@/config/constants";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/scale-mailer-logo-dark.png"
                alt={APP_NAME}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">
                {APP_NAME}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-base font-medium text-gray-700 hover:text-brand-primary"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-base font-medium text-gray-700 hover:text-brand-primary"
            >
              Dashboard
            </Link>
            <a
              href={DEMO_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Button variant="primary" size="sm">
                Book a Demo
              </Button>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="/"
              className="block text-base font-medium text-gray-700 hover:text-brand-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="block text-base font-medium text-gray-700 hover:text-brand-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <a
              href={DEMO_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="primary" size="sm">
                Book a Demo
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
