import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { QuoteRequest, ContactSubmission } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Loader2, TrendingUp, Calendar, Clock, Users, DollarSign, BarChart, PieChart } from "lucide-react";
import { format } from "date-fns";
import Sidebar from "@/components/admin/Sidebar";
import QuoteTable from "@/components/admin/QuoteTable";
import ContactTable from "@/components/admin/ContactTable";

const AdminDashboard = () => {
  // Fetch quote requests
  const { data: quotes = [], isLoading: isLoadingQuotes } = useQuery<QuoteRequest[]>({
    queryKey: ["/api/quotes"],
  });

  // Fetch contact submissions
  const { data: contacts = [], isLoading: isLoadingContacts } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact"],
  });

  // Calculate stats
  const totalQuotes = quotes.length;
  const pendingQuotes = quotes.filter(q => q.status === "new").length;
  const scheduledMoves = quotes.filter(q => q.status === "scheduled").length;
  const totalRevenue = quotes.reduce((sum, quote) => sum + quote.totalEstimate, 0);
  const unreadMessages = contacts.filter(c => !c.isRead).length;

  // Get most recent items
  const recentQuotes = [...quotes].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  const recentContacts = [...contacts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  // Service type distribution
  const homeTypes = quotes.reduce((acc, quote) => {
    acc[quote.homeType] = (acc[quote.homeType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const popularHomeTypes = Object.entries(homeTypes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (isLoadingQuotes || isLoadingContacts) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Murray Moving</title>
      </Helmet>

      <div className="flex">
        <Sidebar />
        <div className="ml-64 w-full p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-slate-500">Welcome to your dashboard, manage your business here.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total Quote Requests</p>
                    <h3 className="text-2xl font-bold mt-1">{totalQuotes}</h3>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Scheduled Moves</p>
                    <h3 className="text-2xl font-bold mt-1">{scheduledMoves}</h3>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Pending Requests</p>
                    <h3 className="text-2xl font-bold mt-1">{pendingQuotes}</h3>
                  </div>
                  <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total Revenue Potential</p>
                    <h3 className="text-2xl font-bold mt-1">${totalRevenue.toLocaleString()}</h3>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Recent Quote Requests</span>
                  <Link href="/admin/quotes">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </CardTitle>
                <CardDescription>The most recent quote requests submitted</CardDescription>
              </CardHeader>
              <CardContent>
                {recentQuotes.length === 0 ? (
                  <p className="text-center py-6 text-slate-500">No quote requests yet.</p>
                ) : (
                  <div className="space-y-4">
                    {recentQuotes.map((quote) => (
                      <div key={quote.id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-md">
                        <div>
                          <p className="font-medium">{`${quote.firstName} ${quote.lastName}`}</p>
                          <p className="text-sm text-slate-500">
                            {quote.fromZip} to {quote.toZip} • ${quote.totalEstimate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">
                            {format(new Date(quote.createdAt), "MMM dd, yyyy")}
                          </p>
                          <div className={`text-xs rounded-full mt-1 px-2 py-0.5 inline-block
                            ${quote.status === "new" ? "bg-blue-100 text-blue-800" : 
                            quote.status === "contacted" ? "bg-yellow-100 text-yellow-800" :
                            quote.status === "scheduled" ? "bg-purple-100 text-purple-800" :
                            quote.status === "completed" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"}`}>
                            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Recent Messages</span>
                  <div className="flex items-center">
                    {unreadMessages > 0 && (
                      <div className="bg-blue-500 text-white rounded-full h-6 px-2 flex items-center justify-center text-xs mr-2">
                        {unreadMessages} new
                      </div>
                    )}
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                </CardTitle>
                <CardDescription>Latest contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {recentContacts.length === 0 ? (
                  <p className="text-center py-6 text-slate-500">No messages yet.</p>
                ) : (
                  <div className="space-y-4">
                    {recentContacts.map((contact) => (
                      <div key={contact.id} className={`flex justify-between items-center p-3 hover:bg-slate-50 rounded-md ${!contact.isRead ? "bg-blue-50" : ""}`}>
                        <div>
                          <p className="font-medium flex items-center">
                            {!contact.isRead && (
                              <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                            )}
                            {contact.subject}
                          </p>
                          <p className="text-sm text-slate-500">
                            {`${contact.firstName} ${contact.lastName}`} • {contact.email}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">
                            {format(new Date(contact.createdAt), "MMM dd, yyyy")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Analysis Section */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Business Analytics</CardTitle>
                <CardDescription>Key metrics and performance data</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="quotes">
                  <TabsList>
                    <TabsTrigger value="quotes">Quote Analysis</TabsTrigger>
                    <TabsTrigger value="customers">Customer Analysis</TabsTrigger>
                  </TabsList>
                  <TabsContent value="quotes" className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <BarChart className="mr-2 h-5 w-5 text-primary" />
                          Quote Statuses
                        </h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                              <span>New Requests</span>
                            </div>
                            <span className="font-medium">{quotes.filter(q => q.status === "new").length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                              <span>Contacted</span>
                            </div>
                            <span className="font-medium">{quotes.filter(q => q.status === "contacted").length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                              <span>Scheduled</span>
                            </div>
                            <span className="font-medium">{quotes.filter(q => q.status === "scheduled").length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                              <span>Completed</span>
                            </div>
                            <span className="font-medium">{quotes.filter(q => q.status === "completed").length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                              <span>Cancelled</span>
                            </div>
                            <span className="font-medium">{quotes.filter(q => q.status === "cancelled").length}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <PieChart className="mr-2 h-5 w-5 text-primary" />
                          Home Types Distribution
                        </h3>
                        <div className="space-y-4">
                          {popularHomeTypes.map(([type, count], index) => (
                            <div key={type} className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div 
                                  className="w-4 h-4 rounded-full mr-2" 
                                  style={{ 
                                    backgroundColor: [
                                      "#3B82F6", "#F59E0B", "#10B981", "#8B5CF6", "#EC4899"
                                    ][index % 5] 
                                  }}
                                ></div>
                                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                              </div>
                              <span className="font-medium">{count} ({Math.round(count / totalQuotes * 100)}%)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="customers" className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <Users className="mr-2 h-5 w-5 text-primary" />
                          Customer Overview
                        </h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-slate-50 rounded-md">
                            <p className="text-sm text-slate-500 mb-1">Total Customers</p>
                            <p className="text-2xl font-bold">{quotes.length}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-md">
                              <p className="text-sm text-slate-500 mb-1">Residential</p>
                              <p className="text-xl font-bold">
                                {quotes.filter(q => ["house", "apartment", "condo", "townhouse"].includes(q.homeType)).length}
                              </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-md">
                              <p className="text-sm text-slate-500 mb-1">Commercial</p>
                              <p className="text-xl font-bold">
                                {quotes.filter(q => ["office", "other"].includes(q.homeType)).length}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Popular Additional Services</h3>
                        <div className="space-y-4">
                          {["packing", "unpacking", "storage"].map(service => {
                            const count = quotes.filter(q => 
                              q.services.includes(service)
                            ).length;
                            const percentage = totalQuotes > 0 ? Math.round(count / totalQuotes * 100) : 0;
                            
                            return (
                              <div key={service} className="flex flex-col">
                                <div className="flex justify-between mb-1">
                                  <span>{service.charAt(0).toUpperCase() + service.slice(1)}</span>
                                  <span>{count} requests ({percentage}%)</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5">
                                  <div 
                                    className="bg-primary h-2.5 rounded-full" 
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
