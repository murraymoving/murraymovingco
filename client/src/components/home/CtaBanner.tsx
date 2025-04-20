import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const CtaBanner = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="section-container">
        <div className="bubble-card overflow-hidden relative">
          {/* Background gradient effect - much darker for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-primary-950 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/30 blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-blue-700/30 blur-xl"></div>
          </div>
          
          <div className="relative z-10 px-6 py-12 md:py-16 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 drop-shadow-xl">
                  Ready to make your move stress-free?
                </h2>
                <p className="text-lg text-white font-medium max-w-2xl drop-shadow-md">
                  Get an instant quote tailored to your specific moving needs, and let our professional team handle the rest.
                </p>
                <div className="mt-6 hidden lg:block">
                  <div className="flex items-center space-x-2 text-white">
                    <Phone className="h-5 w-5" />
                    <span className="font-medium">Call us today: 609-724-4445</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote">
                  <Button size="lg" className="bg-white hover:bg-gray-100 text-primary font-semibold px-8 py-6 text-lg rounded-xl shadow-lg transition-all duration-300">
                    Get A Free Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg transition-all duration-300"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Mobile phone number */}
            <div className="mt-8 text-center lg:hidden">
              <a href="tel:+16097244445" className="flex items-center justify-center space-x-2 text-white">
                <Phone className="h-5 w-5" />
                <span className="font-medium">Call us today: 609-724-4445</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaBanner;
