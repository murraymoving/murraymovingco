import nodemailer from 'nodemailer';
import { QuoteRequest } from '@shared/schema';

// Create a reusable transporter object using SMTP transport
let transporter: nodemailer.Transporter;

// Initialize the transporter with Ethereal (fake/test) SMTP service
export const initializeEmailTransport = async () => {
  try {
    // Create a test account at ethereal.email
    const testAccount = await nodemailer.createTestAccount();
    
    // Create a reusable transporter
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    
    console.log('Email transport initialized in test mode');
    console.log('Ethereal Email credentials:');
    console.log(`- Username: ${testAccount.user}`);
    console.log(`- Password: ${testAccount.pass}`);
    console.log('NOTE: These are temporary test credentials. Emails sent will be captured at ethereal.email');
  } catch (error) {
    console.error('Failed to initialize email transport:', error);
  }
};

// Send quote notification email
export const sendQuoteNotification = async (quote: QuoteRequest) => {
  if (!transporter) {
    console.warn('Email transport not initialized. Skipping email notification.');
    return;
  }

  try {
    // Format the quote details into a readable email
    const emailContent = `
      <h2>New Quote Request Received</h2>
      <p><strong>Name:</strong> ${quote.firstName} ${quote.lastName}</p>
      <p><strong>Email:</strong> ${quote.email}</p>
      <p><strong>Phone:</strong> ${quote.phone}</p>
      <p><strong>Move Date:</strong> ${quote.moveDate ? new Date(quote.moveDate).toLocaleDateString() : 'Not specified'}</p>
      <p><strong>From Address:</strong> ${quote.fromAddress}</p>
      <p><strong>From Zip:</strong> ${quote.fromZip}</p>
      <p><strong>To Address:</strong> ${quote.toAddress}</p>
      <p><strong>To Zip:</strong> ${quote.toZip}</p>
      <p><strong>Home Size:</strong> ${quote.homeSize}</p>
      <p><strong>Home Type:</strong> ${quote.homeType}</p>
      <p><strong>Services:</strong> ${Array.isArray(quote.services) ? quote.services.join(', ') : 'None'}</p>
      <p><strong>Special Requests:</strong> ${quote.specialRequests || 'None'}</p>
      <p><strong>Distance:</strong> ${quote.distance} miles</p>
      <p><strong>Base Price:</strong> $${quote.basePrice ? (quote.basePrice / 100).toFixed(2) : 'N/A'}</p>
      <p><strong>Distance Price:</strong> $${quote.distancePrice ? (quote.distancePrice / 100).toFixed(2) : 'N/A'}</p>
      <p><strong>Total Estimate:</strong> $${quote.totalEstimate ? (quote.totalEstimate / 100).toFixed(2) : 'N/A'}</p>
      <p><strong>Status:</strong> ${quote.status || 'Pending'}</p>
      <p><strong>Created On:</strong> ${new Date().toLocaleString()}</p>
    `;

    // Define email options
    const mailOptions = {
      from: '"Murray Moving" <test@murraymoving.com>',
      to: 'murraymovingcompany@gmail.com',
      subject: `New Quote Request from ${quote.firstName} ${quote.lastName}`,
      html: emailContent,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    // With Ethereal email, we get a preview URL
    console.log('Quote notification email sent');
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
    return info;
  } catch (error) {
    console.error('Error sending quote notification email:', error);
    throw error;
  }
};