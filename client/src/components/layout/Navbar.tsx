import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Phone } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (path: string) => location === path;

  return (
    <header className="bg-primary sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand logo/name on the left */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src="/images/murray-moving-truck.jpg" 
                  alt="Murray Moving" 
                  className="h-10 w-auto rounded-md mr-2"
                />
                <span className="font-bold text-white text-lg md:block">Murray Moving</span>
              </div>
            </Link>
          </div>

          {/* Center section - Navigation Links */}
          <div className="hidden md:flex items-center justify-center">
            <div className="flex space-x-8">
              <Link href="/">
                <span className={`${
                  isActive("/") 
                    ? "text-white border-white" 
                    : "text-white/90 border-transparent hover:text-white"
                } px-3 py-2 text-sm font-medium border-b-2 cursor-pointer`}>
                  Home
                </span>
              </Link>
              
              <Link href="/services">
                <span className={`${
                  isActive("/services") 
                    ? "text-white border-white" 
                    : "text-white/90 border-transparent hover:text-white"
                } px-3 py-2 text-sm font-medium border-b-2 cursor-pointer`}>
                  Services
                </span>
              </Link>
              
              <Link href="/about">
                <span className={`${
                  isActive("/about") 
                    ? "text-white border-white" 
                    : "text-white/90 border-transparent hover:text-white"
                } px-3 py-2 text-sm font-medium border-b-2 cursor-pointer`}>
                  About
                </span>
              </Link>
              
              <Link href="/contact">
                <span className={`${
                  isActive("/contact") 
                    ? "text-white border-white" 
                    : "text-white/90 border-transparent hover:text-white"
                } px-3 py-2 text-sm font-medium border-b-2 cursor-pointer`}>
                  Contact
                </span>
              </Link>
            </div>
          </div>

          {/* Right section - Contact, Quote and Menu */}
          <div className="flex items-center space-x-4">
            <a href="tel:+16097244445" className="hidden md:flex text-white font-medium items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>609-724-4445</span>
            </a>
            
            <Link href="/quote">
              <Button className="hidden md:flex bg-yellow-400 hover:bg-yellow-500 text-primary font-medium">
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            {/* Hamburger menu button - always visible */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile/Slide-in menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={closeMenu}
            aria-hidden="true"
          ></div>
          
          {/* Slide-in panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
            <div className="pt-5 pb-4">
              <div className="px-4 flex items-center justify-between">
                <div className="flex-shrink-0 flex items-center">
                  <img 
                    src="/images/murray-moving-truck.jpg" 
                    alt="Murray Moving" 
                    className="h-12 w-auto rounded-md"
                  />
                  <span className="ml-2 text-xl font-bold">Murray Moving</span>
                </div>
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                  onClick={closeMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-6 px-2 space-y-1">
                <Link href="/">
                  <span
                    className={`${
                      isActive("/") 
                        ? "border-primary text-primary bg-blue-50" 
                        : "border-transparent text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-primary"
                    } block pl-3 pr-4 py-3 border-l-4 text-base font-medium cursor-pointer`}
                    onClick={closeMenu}
                  >
                    Home
                  </span>
                </Link>
                
                <Link href="/services">
                  <span
                    className={`${
                      isActive("/services") 
                        ? "border-primary text-primary bg-blue-50" 
                        : "border-transparent text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-primary"
                    } block pl-3 pr-4 py-3 border-l-4 text-base font-medium cursor-pointer`}
                    onClick={closeMenu}
                  >
                    Services
                  </span>
                </Link>
                
                <Link href="/about">
                  <span
                    className={`${
                      isActive("/about") 
                        ? "border-primary text-primary bg-blue-50" 
                        : "border-transparent text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-primary"
                    } block pl-3 pr-4 py-3 border-l-4 text-base font-medium cursor-pointer`}
                    onClick={closeMenu}
                  >
                    About
                  </span>
                </Link>
                
                <Link href="/contact">
                  <span
                    className={`${
                      isActive("/contact") 
                        ? "border-primary text-primary bg-blue-50" 
                        : "border-transparent text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-primary"
                    } block pl-3 pr-4 py-3 border-l-4 text-base font-medium cursor-pointer`}
                    onClick={closeMenu}
                  >
                    Contact
                  </span>
                </Link>
              </div>
            </div>
            
            <div className="pt-1 pb-5 border-t border-gray-200 mt-auto px-4 space-y-4">
              <a 
                href="tel:+16097244445" 
                className="block w-full text-primary font-medium border border-blue-200 rounded-md py-3 px-4 flex items-center justify-center"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span>Call Us: 609-724-4445</span>
              </a>
              
              <Link href="/quote">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-primary font-medium py-3" onClick={closeMenu}>
                  Get Your Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
