import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ContactSubmission } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Mail, MailOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

const ContactTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const { toast } = useToast();

  // Fetch contact submissions
  const { data: contacts = [], isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact"],
  });

  // Mark as read mutation
  const { mutate: markAsRead, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, isRead }: { id: number; isRead: boolean }) => {
      const res = await apiRequest("PATCH", `/api/contact/${id}`, { isRead });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({
        title: "Contact updated",
        description: "The message status has been updated.",
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

  // Filter contacts based on search term
  const filteredContacts = contacts.filter((contact) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(searchTermLower) ||
      contact.lastName.toLowerCase().includes(searchTermLower) ||
      contact.email.toLowerCase().includes(searchTermLower) ||
      contact.subject.toLowerCase().includes(searchTermLower)
    );
  });

  const formatDate = (dateString: string | Date) => {
    try {
      const date = typeof dateString === "string" ? new Date(dateString) : dateString;
      return format(date, "MMM dd, yyyy h:mm a");
    } catch (error) {
      return "Invalid date";
    }
  };

  const handleViewDetails = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    if (!contact.isRead) {
      markAsRead({ id: contact.id, isRead: true });
    }
  };

  const closeDialog = () => {
    setSelectedContact(null);
  };

  const handleMarkAsRead = (contact: ContactSubmission, isRead: boolean) => {
    markAsRead({ id: contact.id, isRead });
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
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="text"
            placeholder="Search messages..."
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
              <TableHead className="w-10"></TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                  {searchTerm ? "No messages match your search." : "No contact messages found."}
                </TableCell>
              </TableRow>
            ) : (
              filteredContacts.map((contact) => (
                <TableRow key={contact.id} className={contact.isRead ? "" : "bg-blue-50"}>
                  <TableCell>
                    <Checkbox
                      checked={contact.isRead}
                      onCheckedChange={(checked) => {
                        handleMarkAsRead(contact, checked as boolean);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {formatDate(contact.createdAt)}
                  </TableCell>
                  <TableCell>
                    {`${contact.firstName} ${contact.lastName}`}
                  </TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {!contact.isRead && (
                        <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      )}
                      {contact.subject}
                    </div>
                  </TableCell>
                  <TableCell>
                    {contact.isRead ? (
                      <div className="flex items-center text-slate-500">
                        <MailOpen className="h-4 w-4 mr-1" />
                        <span className="text-sm">Read</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-blue-600 font-medium">
                        <Mail className="h-4 w-4 mr-1" />
                        <span className="text-sm">Unread</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(contact)}
                    >
                      View Message
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Contact Details Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={() => closeDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedContact?.subject}</DialogTitle>
            <DialogDescription>
              Message from {selectedContact?.firstName} {selectedContact?.lastName}
            </DialogDescription>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{`${selectedContact.firstName} ${selectedContact.lastName}`}</p>
                  <p className="text-sm text-slate-500">{selectedContact.email}</p>
                </div>
                <p className="text-sm text-slate-500">
                  {formatDate(selectedContact.createdAt)}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-md min-h-[200px]">
                {selectedContact.message}
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant={selectedContact.isRead ? "outline" : "default"}
                  onClick={() => handleMarkAsRead(selectedContact, !selectedContact.isRead)}
                >
                  {selectedContact.isRead ? "Mark as Unread" : "Mark as Read"}
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={closeDialog}>
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      window.location.href = `mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`;
                    }}
                  >
                    Reply by Email
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactTable;
