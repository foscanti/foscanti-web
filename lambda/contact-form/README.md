# Foscanti Contact Form Lambda Function

AWS Lambda function for handling contact form submissions from foscanti.com.

## Quick Start

### 1. Install Dependencies

```bash
cd lambda/contact-form
npm install
```

### 2. Build Zip Package

```bash
npm run build
```

This creates `function.zip` ready for Lambda upload.

### 3. Upload to AWS Lambda

1. **AWS Console** → **Lambda** → **Create function**
   - Name: `foscanti-contact-form`
   - Runtime: Node.js 20.x
   - Architecture: x86_64

2. Click **Upload from** → **.zip file** → Select `function.zip`

3. Go to **Configuration** → **General settings**
   - Set **Timeout** to 30 seconds
   - Set **Memory** to 256 MB (default fine)

4. Go to **Configuration** → **Environment variables**
   - Add these 4 variables:
     ```
     ZOHO_USER=michael@foscanti.com
     ZOHO_PASS=(your app password)
     ZOHO_HOST=smtp.zoho.com
     CONTACT_EMAIL=michael@foscanti.com
     ```

5. Go to **Configuration** → **Function URL**
   - Click **Create function URL**
   - Auth type: `NONE`
   - Enable CORS:
     - Allowed origins: `https://foscanti.com`
     - Allowed methods: `POST, OPTIONS`
     - Allowed headers: `Content-Type`
   - Copy the Function URL

### 4. Add Lambda URL to Website

Add to GitHub Secrets:
- Name: `LAMBDA_ENDPOINT`
- Value: (your Lambda Function URL)

Update `.github/workflows/deploy.yml`:
```yaml
- name: Build static site
  env:
    NEXT_PUBLIC_LAMBDA_ENDPOINT: ${{ secrets.LAMBDA_ENDPOINT }}
  run: npm run build
```

### 5. Test

Push to master and test at https://foscanti.com/contact

## What It Does

- ✅ Validates form input (all fields required, valid email)
- ✅ Rate limits: 1 submission per minute per IP
- ✅ Sends email via Zoho Mail SMTP
- ✅ CORS enabled for cross-origin requests
- ✅ Returns success/error JSON responses

## Environment Variables Required

| Variable | Example | Purpose |
|----------|---------|---------|
| `ZOHO_USER` | michael@foscanti.com | Zoho Mail account |
| `ZOHO_PASS` | app-password-16-chars | Zoho app password (MFA) |
| `ZOHO_HOST` | smtp.zoho.com | Zoho SMTP server (region-specific) |
| `CONTACT_EMAIL` | michael@foscanti.com | Where emails are sent |

## Monitoring

View logs in **AWS CloudWatch**:
- Go to **CloudWatch** → **Log groups** → `/aws/lambda/foscanti-contact-form`
- Click latest log stream to see function execution logs

## Cost

- Free tier: 1M requests/month (well within limits)
- Your form: ~100 emails/month = $0 cost

## Troubleshooting

**Function times out?**
- Increase timeout to 30 seconds
- Check Zoho credentials

**Emails not sending?**
- Check CloudWatch logs
- Verify Zoho app password is correct
- Confirm Zoho account isn't over daily limit

**CORS errors?**
- Verify Function URL has CORS enabled
- Check allowed origin is `https://foscanti.com`

## Files

- `index.js` - Lambda handler function
- `package.json` - Dependencies and build script
- `README.md` - This file

## Updates

To update the function:
1. Edit `index.js`
2. Run `npm run build`
3. Upload new `function.zip` to Lambda
4. Test at website
