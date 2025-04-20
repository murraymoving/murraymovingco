import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Sarah J.",
    type: "Residential Move • Local Burlington Move",
    rating: 5,
    quote: "Murray Moving made our move so much easier than expected. The team was professional, careful with our belongings, and right on schedule. I was especially impressed with how accurate their quote was!"
  },
  {
    name: "Michael R.",
    type: "Commercial Move • Office Relocation",
    rating: 5,
    quote: "When we needed to relocate our entire office with minimal downtime, Murray Moving delivered beyond expectations. Their team worked after hours to ensure we were operational by Monday morning. Truly a business-friendly moving service!"
  },
  {
    name: "Alex C.",
    type: "Residential Move • Burlington to Princeton",
    rating: 5,
    quote: "I was worried about my move, but Murray Moving made it easy. Their packing service was thorough and their team communicated clearly throughout the entire process. They kept me informed every step of the way."
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={`star-${i}`} 
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="py-24 bg-gradient-to-b from-white to-slate-50" id="testimonials">
      <div className="section-container relative">
        {/* Background decorative elements */}
        <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-primary/5 rounded-[40px] -z-10"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-50 rounded-full opacity-50 filter blur-3xl -z-10"></div>
        
        <div className="relative">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-primary font-medium text-sm mb-4">
              Customer Testimonials
            </div>
            <h2 className="section-title mb-4">
              What Our Customers <span className="text-primary">Say About Us</span>
            </h2>
            <p className="section-subtitle">
              Don't just take our word for it — hear from our satisfied customers who trusted Murray Moving with their relocations.
            </p>
          </div>
          
          {/* Testimonial carousel */}
          <div className="max-w-4xl mx-auto relative">
            <div className="bubble-card overflow-hidden">
              <div className="px-6 pt-6 pb-8 relative">
                {/* Large quote mark */}
                <Quote className="absolute top-6 right-6 h-24 w-24 text-primary/5" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                  >
                    {/* Testimonial content */}
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="w-full md:w-1/3">
                        <div className="bg-gradient-to-br from-primary/10 to-blue-300/20 p-5 rounded-2xl flex items-center justify-center">
                          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <Quote className="h-8 w-8 text-primary" />
                          </div>
                        </div>
                        
                        <div className="mt-6 text-center">
                          <h3 className="font-bold text-lg text-gray-900">{testimonials[currentIndex].name}</h3>
                          <p className="text-sm text-gray-600">{testimonials[currentIndex].type}</p>
                          <div className="mt-3 flex justify-center">
                            {renderStars(testimonials[currentIndex].rating)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-2/3">
                        <blockquote className="text-xl text-gray-800 italic font-medium leading-relaxed">
                          "{testimonials[currentIndex].quote}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Navigation controls */}
            <div className="flex justify-between items-center mt-8">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border border-primary/20 text-primary hover:bg-primary/5 bg-white w-12 h-12 shadow-sm"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-primary scale-100' : 'bg-gray-300 scale-75'
                    }`}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border border-primary/20 text-primary hover:bg-primary/5 bg-white w-12 h-12 shadow-sm"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
