import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { 
  Home, 
  Building2, 
  Map, 
  Piano 
} from "lucide-react";

const services = [
  {
    id: "residential",
    title: "Residential Moving",
    description: "Moving your home is a significant life event. Our residential moving service is designed to make this transition as smooth as possible. From careful packing to professional loading and transportation, we handle every aspect with care.",
    features: [
      "Customized moving plans",
      "Careful handling of all household items",
      "Furniture disassembly and reassembly",
      "Floor and doorway protection",
      "Optional unpacking services"
    ],
    icon: Home,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "commercial",
    title: "Commercial Moving",
    description: "Business relocations require precision, speed, and minimal disruption. Our commercial moving team understands the importance of getting your operation back up and running quickly. We offer weekend and after-hours services to minimize downtime.",
    features: [
      "IT equipment handling specialists",
      "Office furniture installation",
      "Employee relocation assistance",
      "Disposal and recycling services",
      "Project management for complex moves"
    ],
    icon: Building2,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },


  {
    id: "long-distance",
    title: "Long Distance Moving",
    description: "Moving longer distances within New Jersey and to neighboring states requires specialized expertise. Our long-distance moving service includes dedicated trucks, GPS tracking, and consistent communication to ensure your belongings arrive on schedule and intact.",
    features: [
      "Dedicated trucks for your move only",
      "GPS tracking technology", 
      "Reliable delivery schedules",
      "Professional moving teams",
      "Comprehensive valuation coverage"
    ],
    icon: Map,
    image: "https://images.unsplash.com/photo-1534565842904-78db3b5a5274?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "specialty",
    title: "Specialty Item Moving",
    description: "Some items require extra special care during a move. Our specialty item moving service focuses on the safe transportation of pianos, antiques, artwork, and other valuable or unusual items that need custom handling solutions.",
    features: [
      "Piano moving specialists",
      "Art and antique handling",
      "Gun safe and vault moving",
      "Hot tub and spa relocation",
      "Custom crating solutions"
    ],
    icon: Piano,
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Murray Moving</title>
        <meta name="description" content="Explore Murray Moving's comprehensive moving services including residential, commercial, long-distance, and specialty item moving in Burlington, NJ." />
      </Helmet>
      
      {/* Hero section */}
      <div className="relative bg-slate-800 py-24">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Moving trucks and professional movers"
          />
          <div className="absolute inset-0 bg-slate-800 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Services
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-100">
            Comprehensive moving solutions tailored to meet your specific needs, handled with care and professionalism.
          </p>
        </div>
      </div>
      
      {/* Services listing */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              id={service.id}
              className={`lg:grid lg:grid-cols-2 lg:gap-8 ${
                index !== 0 ? "mt-24" : ""
              }`}
            >
              <div className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-md bg-primary-500 text-white flex items-center justify-center">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h2 className="ml-4 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                    {service.title}
                  </h2>
                </div>
                <p className="mt-6 text-lg text-slate-500">
                  {service.description}
                </p>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-slate-900">Service Features:</h3>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-slate-500">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <Link href="/quote">
                    <Button className="mr-4">Get a Quote</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline">Contact Us</Button>
                  </Link>
                </div>
              </div>
              <div className={`mt-12 sm:mt-16 lg:mt-0 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                <div className="lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto"
                    src={service.image}
                    alt={service.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-gradient-to-br from-blue-900 to-primary-950">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl drop-shadow-xl">
            <span className="block">Ready to get started?</span>
            <span className="block">Get your free quote today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-white font-medium drop-shadow-md">
            Let our team of professionals handle your move with care and efficiency.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link href="/quote">
                <Button size="lg" className="text-base bg-white text-primary-700 hover:bg-primary-50">
                  Get Your Free Quote
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-base text-white border-white hover:bg-primary-600">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
