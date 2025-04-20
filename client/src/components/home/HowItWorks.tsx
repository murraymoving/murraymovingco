import { Calculator, Calendar, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Get a Quote",
      description: "Use our AI-powered quote calculator to get an instant estimate tailored to your move.",
      icon: Calculator,
      color: "from-blue-500/20 to-blue-600/30"
    },
    {
      number: 2,
      title: "Book Your Move",
      description: "Select a date and customize your services based on your specific needs.",
      icon: Calendar,
      color: "from-indigo-500/20 to-purple-600/30"
    },
    {
      number: 3,
      title: "Relax & Move",
      description: "Our professional team handles everything on moving day while you relax.",
      icon: Truck,
      color: "from-green-500/20 to-emerald-600/30"
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="section-container relative">
        {/* Background elements */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-50 opacity-50 filter blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-indigo-50 opacity-50 filter blur-3xl"></div>
        
        <div className="relative">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-primary font-medium text-sm mb-4">
              Simple & Convenient
            </div>
            <h2 className="section-title mb-4">
              Our <span className="text-primary">3-Step</span> Moving Process
            </h2>
            <p className="section-subtitle">
              We've streamlined the moving process to make your relocation as smooth and stress-free as possible.
            </p>
          </div>
          
          {/* Process steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connecting line */}
            <div className="absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100 hidden md:block"></div>
            
            {steps.map((step, index) => (
              <div className="relative" key={index}>
                <div className="bubble-card hover:translate-y-[-8px] transition-all duration-500">
                  <div className="p-8 text-center flex flex-col items-center">
                    {/* Step number with gradient background */}
                    <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br ${step.color} mb-6 shadow-lg`}>
                      <span className="text-white text-2xl font-bold">{step.number}</span>
                    </div>
                    
                    {/* Step icon */}
                    <div className="mb-5">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                    
                    {/* Decorative line at bottom */}
                    <div className="mt-6 w-12 h-1 rounded-full bg-gradient-to-r from-primary/40 to-primary"></div>
                  </div>
                </div>
                
                {/* Arrow for mobile only */}
                {index < steps.length - 1 && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-gray-200 border-l-transparent border-r-transparent md:hidden"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
