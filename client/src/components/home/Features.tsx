import { 
  Home, 
  Building2, 
  Map, 
  ShieldCheck,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Residential Moving",
    description: "From apartments to houses, we handle every aspect of your home move with care and precision.",
    icon: Home,
    color: "bg-gradient-to-br from-blue-500/10 to-blue-700/20"
  },
  {
    title: "Commercial Moving",
    description: "Minimize downtime with our efficient office and business relocation services.",
    icon: Building2,
    color: "bg-gradient-to-br from-indigo-500/10 to-indigo-700/20"
  },


  {
    title: "Long Distance Moving",
    description: "Cross-country relocations managed with detailed planning and coordination.",
    icon: Map,
    color: "bg-gradient-to-br from-green-500/10 to-green-700/20"
  },
  {
    title: "Specialty Item Moving",
    description: "Expert handling of pianos, antiques, artwork, and other valuable items.",
    icon: ShieldCheck,
    color: "bg-gradient-to-br from-red-500/10 to-red-700/20"
  }
];

const Features = () => {
  return (
    <div className="py-24 bg-white" id="services">
      <div className="section-container relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute right-0 top-1/4 w-72 h-72 bg-blue-50 rounded-full opacity-70 filter blur-3xl"></div>
          <div className="absolute left-0 bottom-1/4 w-64 h-64 bg-yellow-50 rounded-full opacity-70 filter blur-3xl"></div>
        </div>
        
        <div className="relative">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-primary font-medium text-sm mb-4">
              Our Premium Services
            </div>
            <h2 className="section-title mb-4">
              Comprehensive <span className="text-primary">Moving Solutions</span>
            </h2>
            <p className="section-subtitle">
              Murray Moving offers a full range of moving services professionally customized to meet your specific needs.
            </p>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                className="bubble-card hover:translate-y-[-4px] transition-all duration-300" 
                key={index}
              >
                <div className={`px-6 pt-6 pb-8 h-full flex flex-col`}>
                  <div className={`p-3 rounded-xl mb-5 inline-flex ${service.color}`}>
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 flex-grow">
                    {service.description}
                  </p>
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-primary">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Professional & Experienced</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA section */}
          <div className="mt-16 text-center">
            <div className="bubble-card card-highlight p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Need a Custom Moving Solution?</h3>
              <p className="text-gray-600 mb-6">
                Contact us for a personalized moving plan that addresses your specific requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2">
                    Get a Free Quote
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 px-6 py-2">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
