import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertQuoteRequestSchema } from "@shared/schema";

// Extend the schema with client-side validation
const quoteFormSchema = insertQuoteRequestSchema.extend({
  fromAddress: z.string().min(5, "Address is required"),
  fromZip: z.string().min(5, "ZIP code is required"),
  toAddress: z.string().min(5, "Address is required"),
  toZip: z.string().min(5, "ZIP code is required"),
  moveDate: z.string().min(1, "Move date is required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

const QuoteForm = () => {
  const [step, setStep] = useState(0);
  const [quoteResult, setQuoteResult] = useState<any>(null);
  const { toast } = useToast();

  // Define the form
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      fromAddress: "",
      fromZip: "",
      toAddress: "",
      toZip: "",
      moveDate: "",
      homeSize: "",
      homeType: "",
      services: [],
      specialRequests: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: QuoteFormValues) => {
      // Convert services array to expected format
      const formattedData = {
        ...data,
        services: data.services || []
      };
      
      const res = await apiRequest("POST", "/api/quotes", formattedData);
      return await res.json();
    },
    onSuccess: (data) => {
      setQuoteResult(data);
      toast({
        title: "Quote Generated Successfully",
        description: "Your moving quote has been generated and saved.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Generating Quote",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const nextStep = () => {
    if (step === 0) {
      form.trigger(["fromAddress", "fromZip", "toAddress", "toZip", "moveDate"]);
      if (
        !form.formState.errors.fromAddress &&
        !form.formState.errors.fromZip &&
        !form.formState.errors.toAddress &&
        !form.formState.errors.toZip &&
        !form.formState.errors.moveDate
      ) {
        setStep(1);
      }
    } else if (step === 1) {
      form.trigger(["homeSize", "homeType"]);
      if (
        !form.formState.errors.homeSize &&
        !form.formState.errors.homeType
      ) {
        setStep(2);
      }
    }
  };

  const prevStep = () => {
    setStep(Math.max(0, step - 1));
  };

  const calculateQuote = () => {
    form.trigger(["firstName", "lastName", "email", "phone"]);
    if (
      !form.formState.errors.firstName &&
      !form.formState.errors.lastName &&
      !form.formState.errors.email &&
      !form.formState.errors.phone
    ) {
      mutate(form.getValues());
    }
  };

  return (
    <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24" id="get-quote">
      <div className="relative max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Get Your Free Moving Quote
          </h2>
          <p className="mt-4 text-lg leading-6 text-slate-500">
            Our AI-powered calculator provides instant estimates based on your specific moving needs.
          </p>
        </div>
        
        <div className="mt-12">
          {/* Step indicators */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => setStep(0)} 
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 0 ? "bg-primary-600 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              1
            </button>
            <div className="flex-1 h-1 mx-2 bg-slate-200">
              <div 
                className="h-1 bg-primary-500" 
                style={{ width: step >= 1 ? "100%" : "0" }}
              ></div>
            </div>
            <button 
              onClick={() => form.formState.isValid && setStep(1)} 
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? "bg-primary-600 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              2
            </button>
            <div className="flex-1 h-1 mx-2 bg-slate-200">
              <div 
                className="h-1 bg-primary-500" 
                style={{ width: step >= 2 ? "100%" : "0" }}
              ></div>
            </div>
            <button 
              onClick={() => form.formState.isValid && setStep(2)} 
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? "bg-primary-600 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              3
            </button>
          </div>
          
          <Form {...form}>
            <form>
              {/* Step 1: Location */}
              {step === 0 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-slate-900">Location Details</h3>
                    <p className="mt-1 text-sm text-slate-500">Tell us where you're moving from and to.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <FormField
                        control={form.control}
                        name="fromAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Current St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <FormField
                        control={form.control}
                        name="fromZip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="90210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="sm:col-span-3">
                      <FormField
                        control={form.control}
                        name="toAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Destination Address</FormLabel>
                            <FormControl>
                              <Input placeholder="456 New St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <FormField
                        control={form.control}
                        name="toZip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Destination ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <FormField
                        control={form.control}
                        name="moveDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Moving Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="button" onClick={nextStep}>
                      Next Step
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Home details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-slate-900">Home Details</h3>
                    <p className="mt-1 text-sm text-slate-500">Tell us about your current home and inventory.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <FormField
                        control={form.control}
                        name="homeSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Home Size</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="studio">Studio</SelectItem>
                                <SelectItem value="1-bedroom">1 Bedroom</SelectItem>
                                <SelectItem value="2-bedroom">2 Bedrooms</SelectItem>
                                <SelectItem value="3-bedroom">3 Bedrooms</SelectItem>
                                <SelectItem value="4-bedroom">4 Bedrooms</SelectItem>
                                <SelectItem value="5-bedroom">5+ Bedrooms</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <FormField
                        control={form.control}
                        name="homeType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Home Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="condo">Condo</SelectItem>
                                <SelectItem value="townhouse">Townhouse</SelectItem>
                                <SelectItem value="office">Office</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="sm:col-span-6">
                      <FormField
                        control={form.control}
                        name="services"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">Additional Services</FormLabel>
                            </div>
                            <div className="space-y-4">
                              <FormField
                                control={form.control}
                                name="services"
                                render={({ field }) => {
                                  return (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes('packing')}
                                          onCheckedChange={(checked) => {
                                            const currentServices = field.value || [];
                                            return checked
                                              ? field.onChange([...currentServices, 'packing'])
                                              : field.onChange(
                                                  currentServices?.filter(
                                                    (value) => value !== 'packing'
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel className="font-medium text-slate-700">
                                          Packing Services
                                        </FormLabel>
                                        <p className="text-sm text-slate-500">We'll professionally pack your belongings before the move.</p>
                                      </div>
                                    </FormItem>
                                  );
                                }}
                              />
                              
                              <FormField
                                control={form.control}
                                name="services"
                                render={({ field }) => {
                                  return (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes('unpacking')}
                                          onCheckedChange={(checked) => {
                                            const currentServices = field.value || [];
                                            return checked
                                              ? field.onChange([...currentServices, 'unpacking'])
                                              : field.onChange(
                                                  currentServices?.filter(
                                                    (value) => value !== 'unpacking'
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel className="font-medium text-slate-700">
                                          Unpacking Services
                                        </FormLabel>
                                        <p className="text-sm text-slate-500">We'll unpack your belongings at your new location.</p>
                                      </div>
                                    </FormItem>
                                  );
                                }}
                              />
                              
                              <FormField
                                control={form.control}
                                name="services"
                                render={({ field }) => {
                                  return (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes('storage')}
                                          onCheckedChange={(checked) => {
                                            const currentServices = field.value || [];
                                            return checked
                                              ? field.onChange([...currentServices, 'storage'])
                                              : field.onChange(
                                                  currentServices?.filter(
                                                    (value) => value !== 'storage'
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel className="font-medium text-slate-700">
                                          Storage Services
                                        </FormLabel>
                                        <p className="text-sm text-slate-500">Secure storage options if your new place isn't ready.</p>
                                      </div>
                                    </FormItem>
                                  );
                                }}
                              />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                    <Button type="button" onClick={nextStep}>
                      Next Step
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Contact info and calculate */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-slate-900">Contact Information</h3>
                    <p className="mt-1 text-sm text-slate-500">How can we reach you with your quote?</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="sm:col-span-3">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="sm:col-span-6">
                      <FormField
                        control={form.control}
                        name="specialRequests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requests or Comments</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Let us know about any special requirements or questions..." 
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {quoteResult && (
                    <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <h4 className="text-lg font-medium text-slate-900">Your Estimated Quote</h4>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-slate-500">
                          Distance: <span className="font-medium text-slate-700">{quoteResult.distance}</span> miles
                        </p>
                        <p className="text-sm text-slate-500">
                          Base price: $<span className="font-medium text-slate-700">{quoteResult.basePrice}</span>
                        </p>
                        <p className="text-sm text-slate-500">
                          Distance cost: $<span className="font-medium text-slate-700">{quoteResult.distancePrice}</span>
                        </p>
                        <div className="pt-2 mt-2 border-t border-slate-200">
                          <p className="text-base font-medium text-slate-900">
                            Total Estimate: $<span className="font-bold text-primary-600">{quoteResult.totalEstimate}</span>
                          </p>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          This is an estimate only. Final price may vary based on actual inventory and service requirements.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={calculateQuote}
                      disabled={isPending}
                    >
                      {isPending ? "Calculating..." : "Calculate Quote"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
