import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Truck, ArrowRight, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Top wave separator */}
      <div className="w-full h-12 bg-white relative overflow-hidden">
        <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 32L48 37.3C96 43 192 53 288 58.7C384 64 480 64 576 53.3C672 43 768 21 864 16C960 11 1056 21 1152 32C1248 43 1344 53 1392 58.7L1440 64V74H1392C1344 74 1248 74 1152 74C1056 74 960 74 864 74C768 74 672 74 576 74C480 74 384 74 288 74C192 74 96 74 48 74H0V32Z" fill="rgba(248, 250, 252, 1)" />
        </svg>
      </div>
      
      {/* Main footer content */}
      <div className="pt-16 pb-8">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1 - Company info */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bubble-card p-3 bg-white shadow-sm">
                  <img 
                    src="/images/murray-moving-truck.jpg" 
                    alt="Murray Moving" 
                    className="h-16 w-auto rounded-lg"
                  />
                </div>
              </div>
              <p className="text-slate-600 text-base">
                Professional moving services for residential and commercial clients in Burlington, New Jersey and surrounding areas. Make your next move stress-free with our team of experts.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-4 w-4 text-primary" />
                </a>
                <a href="#" className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-4 w-4 text-primary" />
                </a>
                <a href="#" className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-4 w-4 text-primary" />
                </a>
              </div>
            </div>
            
            {/* Column 2 - Services */}
            <div>
              <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center">
                <span className="inline-block w-8 h-1 bg-primary mr-3 rounded-full"></span>
                Our Services
              </h3>
              <ul className="space-y-3">
                {[
                  { href: "/services#residential", label: "Residential Moving" },
                  { href: "/services#commercial", label: "Commercial Moving" },
                  { href: "/services#long-distance", label: "Long Distance Moving" },
                  { href: "/services#specialty", label: "Specialty Item Moving" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link href={item.href}>
                      <span className="text-slate-600 hover:text-primary cursor-pointer flex items-center group">
                        <ArrowRight className="h-3 w-3 text-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 3 - Company */}
            <div>
              <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center">
                <span className="inline-block w-8 h-1 bg-primary mr-3 rounded-full"></span>
                Company
              </h3>
              <ul className="space-y-3">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/#testimonials", label: "Testimonials" },
                  { href: "#", label: "Careers", external: true },
                  { href: "#", label: "Blog", external: true }
                ].map((item, index) => (
                  <li key={index}>
                    {item.external ? (
                      <a href={item.href} className="text-slate-600 hover:text-primary flex items-center group">
                        <ArrowRight className="h-3 w-3 text-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item.label}
                        <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                      </a>
                    ) : (
                      <Link href={item.href}>
                        <span className="text-slate-600 hover:text-primary cursor-pointer flex items-center group">
                          <ArrowRight className="h-3 w-3 text-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 4 - Contact Info */}
            <div>
              <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center">
                <span className="inline-block w-8 h-1 bg-primary mr-3 rounded-full"></span>
                Contact Us
              </h3>
              <ul className="space-y-5">
                <li>
                  <div className="bubble-card p-4 bg-white flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <a href="tel:+16097244445" className="text-slate-600 hover:text-primary">
                      (609) 724-4445
                    </a>
                  </div>
                </li>
                <li>
                  <div className="bubble-card p-4 bg-white flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <a href="mailto:murraymovingcompany@gmail.com" className="text-slate-600 hover:text-primary">
                      murraymovingcompany@gmail.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright section */}
          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Murray Moving. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-slate-500 hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-slate-500 hover:text-primary">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-slate-500 hover:text-primary">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
