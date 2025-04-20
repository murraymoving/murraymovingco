import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { QuoteRequest } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  scheduled: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const QuoteTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const { toast } = useToast();

  // Fetch quotes
  const { data: quotes = [], isLoading } = useQuery<QuoteRequest[]>({
    queryKey: ["/api/quotes"],
  });

  // Update quote status mutation
  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/quotes/${id}`, { status });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
      toast({
        title: "Quote updated",
        description: "The quote status has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Filter quotes based on search term
  const filteredQuotes = quotes.filter((quote) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      quote.firstName.toLowerCase().includes(searchTermLower) ||
      quote.lastName.toLowerCase().includes(searchTermLower) ||
      quote.email.toLowerCase().includes(searchTermLower) ||
      quote.phone.toLowerCase().includes(searchTermLower) ||
      quote.fromZip.toLowerCase().includes(searchTermLower) ||
      quote.toZip.toLowerCase().includes(searchTermLower)
    );
  });

  const handleStatusChange = (status: string, quoteId: number) => {
    updateStatus({ id: quoteId, status });
  };

  const formatDate = (dateString: string | Date) => {
    try {
      const date = typeof dateString === "string" ? new Date(dateString) : dateString;
      return format(date, "MMM dd, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  const handleViewDetails = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
  };

  const closeDialog = () => {
    setSelectedQuote(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quote Requests</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="text"
            placeholder="Search quotes..."
            className="pl-8 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Move Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                  {searchTerm ? "No quotes match your search." : "No quote requests found."}
                </TableCell>
              </TableRow>
            ) : (
              filteredQuotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell>
                    {formatDate(quote.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{`${quote.firstName} ${quote.lastName}`}</div>
                    <div className="text-sm text-slate-500">{quote.email}</div>
                  </TableCell>
                  <TableCell>{quote.fromZip}</TableCell>
                  <TableCell>{quote.toZip}</TableCell>
                  <TableCell>{formatDate(quote.moveDate)}</TableCell>
                  <TableCell>${quote.totalEstimate}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={quote.status}
                      onValueChange={(value) => handleStatusChange(value, quote.id)}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue>
                          <Badge className={statusColors[quote.status] || "bg-slate-100"}>
                            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(quote)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Quote Details Dialog */}
      <Dialog open={!!selectedQuote} onOpenChange={() => closeDialog()}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Quote Details</DialogTitle>
            <DialogDescription>
              Request from {selectedQuote?.firstName} {selectedQuote?.lastName}
            </DialogDescription>
          </DialogHeader>

          {selectedQuote && (
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Customer Information</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-slate-500">Name</p>
                      <p className="text-sm font-medium">{`${selectedQuote.firstName} ${selectedQuote.lastName}`}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Phone</p>
                      <p className="text-sm font-medium">{selectedQuote.phone}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="text-sm font-medium">{selectedQuote.email}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-500">Moving Details</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-slate-500">From</p>
                      <p className="text-sm font-medium">{selectedQuote.fromAddress}</p>
                      <p className="text-sm font-medium">{selectedQuote.fromZip}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">To</p>
                      <p className="text-sm font-medium">{selectedQuote.toAddress}</p>
                      <p className="text-sm font-medium">{selectedQuote.toZip}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Move Date</p>
                      <p className="text-sm font-medium">{formatDate(selectedQuote.moveDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Home Size</p>
                      <p className="text-sm font-medium">{selectedQuote.homeSize}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Home Type</p>
                      <p className="text-sm font-medium">{selectedQuote.homeType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Distance</p>
                      <p className="text-sm font-medium">{selectedQuote.distance} miles</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-500">Additional Services</h3>
                  <div className="mt-2">
                    <ul className="text-sm">
                      {selectedQuote.services.length === 0 ? (
                        <li className="text-slate-500">No additional services selected</li>
                      ) : (
                        selectedQuote.services.map((service, index) => (
                          <li key={index} className="flex items-center">
                            <svg
                              className="h-4 w-4 text-primary-500 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {service.charAt(0).toUpperCase() + service.slice(1)}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Quote Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-slate-500">Base Price</p>
                        <p className="text-sm font-medium">${selectedQuote.basePrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Distance Price</p>
                        <p className="text-sm font-medium">${selectedQuote.distancePrice}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-slate-500">Total Estimate</p>
                      <p className="text-lg font-bold text-primary-600">${selectedQuote.totalEstimate}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-500">Special Requests</h3>
                  <div className="mt-2 p-3 bg-slate-50 rounded-md text-sm min-h-[100px]">
                    {selectedQuote.specialRequests || "No special requests provided."}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-500">Update Status</h3>
                  <div className="mt-2">
                    <Select
                      defaultValue={selectedQuote.status}
                      onValueChange={(value) => handleStatusChange(value, selectedQuote.id)}
                      disabled={isUpdating}
                    >
                      <SelectTrigger>
                        <SelectValue>
                          <Badge className={statusColors[selectedQuote.status] || "bg-slate-100"}>
                            {selectedQuote.status.charAt(0).toUpperCase() + selectedQuote.status.slice(1)}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-slate-500">Request received on</p>
                  <p className="text-sm">
                    {formatDate(selectedQuote.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuoteTable;
