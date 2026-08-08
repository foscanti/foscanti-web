const nodemailer = require('nodemailer');

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_MS = 60 * 1000; // 1 minute per IP

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    // Parse request body
    let body;
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body);
    } else {
      body = event.body;
    }

    const { name, email, telephone, question } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !telephone?.trim() || !question?.trim()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields are required.' }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address.' }),
      };
    }

    // Rate limiting based on source IP
    const sourceIp = event.requestContext?.identity?.sourceIp || 'unknown';
    const now = Date.now();
    const lastSubmission = rateLimitMap.get(sourceIp);

    if (lastSubmission && now - lastSubmission < RATE_LIMIT_MS) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          error: 'Too many requests. Please wait a minute before submitting again.',
        }),
      };
    }

    rateLimitMap.set(sourceIp, now);

    // Configure Zoho Mail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.ZOHO_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `New contact form submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Telephone:</strong> ${telephone}</p>
        <p><strong>Message:</strong></p>
        <p>${question.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully.',
      }),
    };
  } catch (error) {
    console.error('Contact form error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send email. Please try again later.',
      }),
    };
  }
};
