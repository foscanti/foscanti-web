# AWS Lambda Setup for Contact Form

Your website now deploys as static files to S3. The contact form uses AWS Lambda to send emails via Zoho Mail.

## Architecture

```
Website (S3) → Contact Form → AWS Lambda Function → Zoho Mail SMTP → Your Email
```

## Step 1: Create Lambda Function

### In AWS Console:

1. Go to **Lambda** → **Create function**
2. **Function name:** `foscanti-contact-form`
3. **Runtime:** Node.js 20.x
4. **Architecture:** x86_64
5. Click **Create function**

## Step 2: Add Dependencies

The Lambda function needs `nodemailer`. You have two options:

### Option A: Upload with Dependencies (Recommended)

1. Create a folder locally:
```bash
mkdir lambda-contact
cd lambda-contact
npm init -y
npm install nodemailer
```

2. Copy the handler code (see below) to `index.js`

3. Zip everything:
```bash
zip -r function.zip node_modules/ index.js
```

4. In Lambda console → **Code** → **Upload from** → **.zip file** → Upload `function.zip`

### Option B: Use Lambda Layers

Create a layer with nodemailer, then attach it to the function.

## Step 3: Lambda Function Code

Create `index.js` with this code:

```javascript
const nodemailer = require('nodemailer');

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_MS = 60 * 1000; // 1 minute per IP

exports.handler = async (event) => {
  // Enable CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://foscanti.com',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
    };
  }

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
```

## Step 4: Set Environment Variables

In Lambda console:

1. Go to **Configuration** → **Environment variables**
2. Add these 4 variables:
   - `ZOHO_USER` = `michael@foscanti.com`
   - `ZOHO_PASS` = Your Zoho app password (from ZOHO_EMAIL_SETUP.md)
   - `ZOHO_HOST` = `smtp.zoho.com` (or your region)
   - `CONTACT_EMAIL` = `michael@foscanti.com`

## Step 5: Configure Function URL

Lambda needs a public HTTPS endpoint:

1. In Lambda console → **Configuration** → **Function URL**
2. Click **Create function URL**
3. **Auth type:** `NONE` (your form handles CORS)
4. **CORS:** Enable
   - **Allowed origins:** `https://foscanti.com`
   - **Allowed methods:** `POST, OPTIONS`
   - **Allowed headers:** `Content-Type`
5. Copy the function URL (looks like `https://xxxxx.lambda-url.region.on.aws/`)

## Step 6: Add Lambda URL to Your Site

Update your GitHub Actions workflow (`.github/workflows/deploy.yml`) or environment:

Add this to the build environment:
```bash
NEXT_PUBLIC_LAMBDA_ENDPOINT=https://xxxxx.lambda-url.region.on.aws/
```

### Option A: Via GitHub Secrets (Recommended)

1. Go to repo **Settings** → **Secrets and variables** → **Actions**
2. Create secret: `LAMBDA_ENDPOINT` = `https://xxxxx.lambda-url.region.on.aws/`
3. Update `.github/workflows/deploy.yml`:
```yaml
- name: Build static site
  env:
    NEXT_PUBLIC_LAMBDA_ENDPOINT: ${{ secrets.LAMBDA_ENDPOINT }}
  run: npm run build
```

### Option B: Direct Environment Variable

Add to `.env.production`:
```
NEXT_PUBLIC_LAMBDA_ENDPOINT=https://xxxxx.lambda-url.region.on.aws/
```

## Step 7: Test

### Local Testing (fallback to local API)
```bash
npm run dev
# Visit http://localhost:3000/contact
# Submit form (will try local API)
```

### Production Testing
1. Push changes to master (workflow builds with Lambda endpoint)
2. After deploy completes, test at https://foscanti.com/contact
3. Submit form and verify email arrives

## Troubleshooting

**Error: "Lambda function not found"**
- Verify Function URL is correct
- Check CORS settings allow your domain
- Verify function is deployed

**Error: "Failed to send email"**
- Check Zoho credentials in Lambda env vars
- Verify Zoho app password is correct
- Check Lambda CloudWatch logs

**Email not arriving**
- Check Lambda CloudWatch logs for errors
- Verify Zoho account isn't over daily limit
- Check spam folder

**View Lambda Logs:**
- Go to **CloudWatch** → **Log groups** → `/aws/lambda/foscanti-contact-form`
- Click latest log stream to see errors

## Important Notes

- **Rate limiting:** 1 submission per minute per IP (in-memory, resets on deployment)
- **Timeout:** Default 3 seconds should be sufficient for email sending
- **Cost:** AWS Lambda free tier includes 1M requests/month (well within limits)
- **Security:** Function URL has no auth, but CORS restricted to your domain

## Next Steps

1. Deploy Lambda function
2. Add Function URL to GitHub Secrets
3. Push to master and test
4. If issues, check CloudWatch logs

Need help? Check AWS Lambda documentation: https://docs.aws.amazon.com/lambda/
