import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertQuoteRequestSchema, insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { initializeEmailTransport, sendQuoteNotification } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize email transport for notifications
  try {
    await initializeEmailTransport();
  } catch (error) {
    console.error('Failed to initialize email transport:', error);
  }
  
  // Setup authentication routes
  setupAuth(app);

  // Quote request routes
  app.post("/api/quotes", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      
      // Calculate distance, basePrice, distancePrice, totalEstimate
      const fromZip = parseInt(validatedData.fromZip.substring(0, 2));
      const toZip = parseInt(validatedData.toZip.substring(0, 2));
      const distance = Math.abs(fromZip - toZip) * 50; // Simplified calculation
      
      let basePrice = 0;
      switch(validatedData.homeSize) {
        case 'studio':
          basePrice = 500;
          break;
        case '1-bedroom':
          basePrice = 700;
          break;
        case '2-bedroom':
          basePrice = 1000;
          break;
        case '3-bedroom':
          basePrice = 1400;
          break;
        case '4-bedroom':
          basePrice = 1800;
          break;
        default:
          basePrice = 2200;
      }
      
      const distancePrice = distance * 2;
      const totalEstimate = basePrice + distancePrice;
      
      // Add calculated fields to validatedData
      const quoteData = {
        ...validatedData,
        distance,
        basePrice,
        distancePrice,
        totalEstimate
      };
      
      const quote = await storage.createQuoteRequest(quoteData);
      
      // Send email notification about the new quote request
      try {
        await sendQuoteNotification(quote);
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Continue processing even if email fails
      }
      
      res.status(201).json(quote);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    }
  });

  // Get all quote requests (admin only)
  app.get("/api/quotes", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(401).send("Unauthorized");
    }
    
    const quotes = await storage.getAllQuoteRequests();
    res.json(quotes);
  });

  // Get a specific quote request (admin only)
  app.get("/api/quotes/:id", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(401).send("Unauthorized");
    }
    
    const quoteId = parseInt(req.params.id);
    const quote = await storage.getQuoteRequest(quoteId);
    
    if (!quote) {
      return res.status(404).send("Quote not found");
    }
    
    res.json(quote);
  });

  // Update quote status (admin only)
  app.patch("/api/quotes/:id", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(401).send("Unauthorized");
    }
    
    const quoteId = parseInt(req.params.id);
    const { status } = req.body;
    
    // Validate status
    if (!["new", "contacted", "scheduled", "completed", "cancelled"].includes(status)) {
      return res.status(400).send("Invalid status");
    }
    
    const quote = await storage.updateQuoteStatus(quoteId, status);
    
    if (!quote) {
      return res.status(404).send("Quote not found");
    }
    
    res.json(quote);
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      const submission = await storage.createContactSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    }
  });

  // Get all contact submissions (admin only)
  app.get("/api/contact", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(401).send("Unauthorized");
    }
    
    const submissions = await storage.getAllContactSubmissions();
    res.json(submissions);
  });

  // Mark contact submission as read (admin only)
  app.patch("/api/contact/:id", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(401).send("Unauthorized");
    }
    
    const submissionId = parseInt(req.params.id);
    const { isRead } = req.body;
    
    if (typeof isRead !== "boolean") {
      return res.status(400).send("isRead must be a boolean");
    }
    
    const submission = await storage.markContactSubmissionRead(submissionId, isRead);
    
    if (!submission) {
      return res.status(404).send("Submission not found");
    }
    
    res.json(submission);
  });

  const httpServer = createServer(app);
  return httpServer;
}
