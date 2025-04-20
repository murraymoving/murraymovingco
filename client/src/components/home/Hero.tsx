import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, CalendarCheck, TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <div className="overflow-hidden">
      {/* Top Gradient */}
      <div className="h-2 bg-gradient-to-r from-primary via-blue-500 to-primary"></div>
      
      {/* Main hero section */}
      <div className="relative bg-slate-50 pb-24">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-blue-300/10"></div>
        </div>
        
        {/* Content */}
        <div className="relative section-container">
          <div className="text-center max-w-3xl mx-auto pt-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
              <span className="block">Moving & Storage</span>
              <span className="text-primary inline-block relative">
                Made Simple
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-400 rounded-full"></span>
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-12">
              Murray Moving is the quick, convenient option that makes your move in Burlington County and surrounding areas easy
            </p>
          </div>
          
          {/* Main image with floating cards - Murray Moving Truck */}
          <div className="relative mx-auto max-w-5xl">
            {/* Main image in a card with shadow */}
            <div className="bubble-card p-3 bg-white">
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="/images/murray-moving-truck.jpg" 
                  alt="Murray Moving truck with movers loading boxes" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Floating testimonial card */}
            <div className="absolute -bottom-5 -left-5 md:left-5 max-w-[80%] md:max-w-xs bubble-card px-4 py-3 bg-white">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-800">5.0 Rating</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">"Professional service that made our move stress-free!"</p>
            </div>
            
            {/* Floating stats card */}
            <div className="absolute -bottom-5 -right-5 md:right-5 max-w-[80%] md:max-w-xs bubble-card px-4 py-3 bg-white">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-gray-800">100+ Moves Monthly</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Trusted by families across New Jersey</p>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="mt-16 max-w-md mx-auto text-center">
            <Link href="/quote">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Get Your Free Quote Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Quote form section */}
      <div className="relative -mt-12 mb-24 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bubble-card card-highlight p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ready to Get Started?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="col-span-1 sm:col-span-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Moving From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200" 
                      placeholder="Enter city or ZIP" 
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Moving To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200" 
                      placeholder="Enter city or ZIP" 
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Moving Date</label>
                  <div className="relative">
                    <CalendarCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      type="date" 
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 sm:col-span-2 flex justify-center sm:justify-end">
                <Link href="/quote">
                  <Button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-primary font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    GET A QUOTE
                    <ArrowRight className="ml-2 h-4 w-4" />
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

export default Hero;
