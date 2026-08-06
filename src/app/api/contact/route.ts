import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rate limiting: track IP -> last submission time (in-memory, resets on server restart)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60 * 1000; // 1 minute

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const lastSubmission = rateLimitMap.get(ip);

  if (!lastSubmission || now - lastSubmission >= RATE_LIMIT_MS) {
    rateLimitMap.set(ip, now);
    return true;
  }

  return false;
}

// Configure your email service here
// Using Resend as an example (https://resend.com)
// Install: npm install resend
// Get API key from https://resend.com/api-keys
async function sendEmail(
  name: string,
  email: string,
  telephone: string,
  question: string
): Promise<void> {
  // Option 1: Using Resend (recommended, free tier available)
  // const { Resend } = require("resend");
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "contact@foscanti.com",
  //   to: process.env.CONTACT_EMAIL || "michael@foscanti.com",
  //   subject: `New contact form submission from ${name}`,
  //   html: `
  //     <p><strong>Name:</strong> ${name}</p>
  //     <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
  //     <p><strong>Telephone:</strong> ${telephone}</p>
  //     <p><strong>Message:</strong></p>
  //     <p>${question.replace(/\n/g, "<br>")}</p>
  //   `,
  //   replyTo: email,
  // });

  // Option 2: Using Nodemailer with Gmail SMTP
  // Install: npm install nodemailer
  // Set up: https://support.google.com/accounts/answer/185833 (App Password)
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.GMAIL_USER,
  //     pass: process.env.GMAIL_PASS,
  //   },
  // });

  // Option 2b: Using Zoho Mail SMTP
  // Sign up: https://mail.zoho.com
  // Region: Use appropriate host based on your Zoho region
  //   - US: smtp.zoho.com
  //   - EU: smtp.zoho.eu
  //   - IN: smtp.zoho.in
  //   - AU: smtp.zoho.com.au
  //   - JP: smtp.zoho.jp
  // Set environment variables:
  //   ZOHO_USER=your-email@yourdomain.com
  //   ZOHO_PASS=your-zoho-password-or-app-password
  //   ZOHO_HOST=smtp.zoho.com (or your region)
  const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_HOST || "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.CONTACT_EMAIL || "michael@foscanti.com",
    subject: `New contact form submission from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Telephone:</strong> ${telephone}</p>
      <p><strong>Message:</strong></p>
      <p>${question.replace(/\n/g, "<br>")}</p>
    `,
    replyTo: email,
  });

  // Option 3: Using AWS SES (you're already on AWS)
  // Install: npm install aws-sdk
  // Configured via AWS credentials
  // const SES = require("aws-sdk/clients/ses");
  // const ses = new SES({ region: "eu-central-1" });
  // await ses.sendEmail({
  //   Source: process.env.CONTACT_EMAIL || "michael@foscanti.com",
  //   Destination: { ToAddresses: [process.env.CONTACT_EMAIL || "michael@foscanti.com"] },
  //   Message: {
  //     Subject: { Data: `New contact form submission from ${name}` },
  //     Body: {
  //       Html: { Data: `...` },
  //     },
  //   },
  // }).promise();
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  // Check rate limit
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute before submitting again." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, telephone, question } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !telephone?.trim() || !question?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Send email
    await sendEmail(name, email, telephone, question);

    return NextResponse.json(
      { success: true, message: "Email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
