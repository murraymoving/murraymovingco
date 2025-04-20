import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const AboutPage = () => {

  return (
    <>
      <Helmet>
        <title>About Us | Murray Moving</title>
        <meta name="description" content="Learn about Murray Moving's story, our team, and our commitment to providing professional and reliable moving services in Burlington, NJ." />
      </Helmet>
      
      {/* Hero section */}
      <div className="relative bg-slate-800 py-24">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Team of professional movers"
          />
          <div className="absolute inset-0 bg-slate-800 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Murray Moving
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-100">
            We're a team of dedicated professionals committed to making your move as smooth and stress-free as possible.
          </p>
        </div>
      </div>
      

      
      {/* Values section */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-secondary-600 font-semibold tracking-wide uppercase">Our Values</h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              What Drives Us Every Day
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
              Our values are the foundation of everything we do, from how we train our team to how we interact with our customers.
            </p>
          </div>

          <div className="mt-12">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-slate-900">Reliability</h3>
                <p className="mt-2 text-base text-slate-500">
                  We show up on time, follow through on our commitments, and always deliver what we promise.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-slate-900">Care</h3>
                <p className="mt-2 text-base text-slate-500">
                  We treat your belongings as if they were our own, with the utmost care and attention to detail.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-slate-900">Efficiency</h3>
                <p className="mt-2 text-base text-slate-500">
                  We work smart to make the moving process as quick and efficient as possible without sacrificing quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      
      {/* CTA section */}
      <div className="bg-gradient-to-br from-blue-900 to-primary-950">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl drop-shadow-xl">
            <span className="block">Ready to experience the Murray Moving difference?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-white font-medium drop-shadow-md">
            Let us take the stress out of your next move with our professional, reliable service.
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

export default AboutPage;
