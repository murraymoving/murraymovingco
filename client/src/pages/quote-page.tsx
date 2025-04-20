import QuoteForm from "@/components/quote/QuoteForm";
import { Helmet } from "react-helmet-async";

const QuotePage = () => {
  return (
    <>
      <Helmet>
        <title>Get a Free Quote | Murray Moving</title>
        <meta name="description" content="Get a free, instant moving quote with our AI-powered calculator. Murray Moving provides accurate estimates for your residential or commercial move in Burlington, New Jersey." />
      </Helmet>
      
      <div className="bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Free Moving Quote Calculator
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-500">
              Get an instant estimate for your move with our AI-powered calculator. Just provide a few details about your upcoming move.
            </p>
          </div>
          
          <QuoteForm />
        </div>
      </div>
    </>
  );
};

export default QuotePage;
