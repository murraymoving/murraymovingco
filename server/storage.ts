import { 
  User, InsertUser, 
  QuoteRequest, InsertQuoteRequest,
  ContactSubmission, InsertContactSubmission
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quote request methods
  createQuoteRequest(quote: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequest(id: number): Promise<QuoteRequest | undefined>;
  getAllQuoteRequests(): Promise<QuoteRequest[]>;
  updateQuoteStatus(id: number, status: string): Promise<QuoteRequest | undefined>;
  
  // Contact submission methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  markContactSubmissionRead(id: number, isRead: boolean): Promise<ContactSubmission | undefined>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quoteRequests: Map<number, QuoteRequest>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentUserId: number;
  private currentQuoteId: number;
  private currentContactId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.quoteRequests = new Map();
    this.contactSubmissions = new Map();
    this.currentUserId = 1;
    this.currentQuoteId = 1;
    this.currentContactId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    
    // Create a default admin user
    this.createUser({
      username: "admin",
      password: "admin", // This will be hashed in the auth.ts
      firstName: "Admin",
      lastName: "User",
      email: "admin@movemasters.com",
      isAdmin: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Quote request methods
  async createQuoteRequest(insertQuote: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = this.currentQuoteId++;
    const now = new Date();
    const quoteRequest: QuoteRequest = {
      ...insertQuote,
      id,
      createdAt: now,
      status: "new"
    };
    this.quoteRequests.set(id, quoteRequest);
    return quoteRequest;
  }
  
  async getQuoteRequest(id: number): Promise<QuoteRequest | undefined> {
    return this.quoteRequests.get(id);
  }
  
  async getAllQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  async updateQuoteStatus(id: number, status: string): Promise<QuoteRequest | undefined> {
    const quote = this.quoteRequests.get(id);
    if (!quote) return undefined;
    
    const updatedQuote: QuoteRequest = {
      ...quote,
      status
    };
    
    this.quoteRequests.set(id, updatedQuote);
    return updatedQuote;
  }
  
  // Contact submission methods
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const now = new Date();
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      createdAt: now,
      isRead: false
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  
  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }
  
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  async markContactSubmissionRead(id: number, isRead: boolean): Promise<ContactSubmission | undefined> {
    const submission = this.contactSubmissions.get(id);
    if (!submission) return undefined;
    
    const updatedSubmission: ContactSubmission = {
      ...submission,
      isRead
    };
    
    this.contactSubmissions.set(id, updatedSubmission);
    return updatedSubmission;
  }
}

export const storage = new MemStorage();
