import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import CtaBanner from "@/components/home/CtaBanner";
import Testimonials from "@/components/home/Testimonials";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Murray Moving | Professional Moving Services</title>
        <meta name="description" content="Murray Moving provides professional moving services for residential and commercial clients in Burlington, NJ. Get a free AI-powered quote for your next move." />
      </Helmet>
      <Hero />
      <Features />
      <HowItWorks />
      <CtaBanner />
      <Testimonials />
    </>
  );
};

export default HomePage;
