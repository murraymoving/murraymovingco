import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { insertContactSubmissionSchema } from "@shared/schema";

// Extend the schema with client-side validation
const contactFormSchema = insertContactSubmissionSchema.extend({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Define the form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return await res.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error Sending Message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Murray Moving</title>
        <meta name="description" content="Contact Murray Moving for all your moving needs in Burlington, New Jersey. Our team is ready to answer your questions and provide professional moving services." />
      </Helmet>
      
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-slate-500 max-w-3xl mx-auto">
              Have questions or need more information? Our team is here to help with all your moving needs.
            </p>
          </div>
          
          <div className="mt-16 lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3 text-base text-slate-500">
                    <p>(609) 724-4445</p>
                    <p className="mt-1">Mon-Fri 8am-7pm</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3 text-base text-slate-500">
                    <a href="mailto:murraymovingcompany@gmail.com" className="hover:text-primary">murraymovingcompany@gmail.com</a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-lg font-medium text-slate-900">Follow Us</h3>
                <div className="mt-4 flex space-x-6">
                  <a href="#" className="text-slate-400 hover:text-slate-500">
                    <span className="sr-only">Facebook</span>
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-slate-400 hover:text-slate-500">
                    <span className="sr-only">Instagram</span>
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-slate-400 hover:text-slate-500">
                    <span className="sr-only">Twitter</span>
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
              

            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="bg-white py-10 px-6 shadow-xl rounded-lg sm:px-10">
                <h3 className="text-lg font-medium text-slate-900">Send us a message</h3>
                
                {isSubmitted ? (
                  <div className="mt-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-slate-900">Thank you!</h3>
                    <p className="mt-2 text-base text-slate-500">
                      Your message has been sent successfully. We'll get back to you as soon as possible.
                    </p>
                    <div className="mt-6">
                      <Button onClick={() => setIsSubmitted(false)}>
                        Send another message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      <div className="sm:col-span-1">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea rows={4} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isPending}
                        >
                          {isPending ? "Sending..." : "Send Message"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
