# Zoho Mail Setup for Contact Form

## Step 1: Get Your Zoho Mail Credentials

1. **Log in to Zoho Mail**: https://mail.zoho.com
2. **Go to Settings** → Click the gear icon → **Mail Settings**
3. **Accounts tab** → Look for "SMTP" or **POP/IMAP Settings**
4. **Enable IMAP/SMTP** (if not already enabled)
5. Copy your:
   - **Email address** (your full email, e.g., `contact@yourdomain.com`)
   - **Password** (your Zoho account password)

## Step 2: Determine Your Zoho Region

Find which data center your Zoho account uses:

| Region | SMTP Host |
|--------|-----------|
| **US** (default) | `smtp.zoho.com` |
| **EU** | `smtp.zoho.eu` |
| **India** | `smtp.zoho.in` |
| **Australia** | `smtp.zoho.com.au` |
| **Japan** | `smtp.zoho.jp` |

**How to check your region:**
- Log into Zoho Mail
- Look at the URL in your browser
- If it says `.eu` or `.in`, use that region

## Step 3: Create `.env.local` File

In the root of your project, create a `.env.local` file:

```bash
# Zoho Mail Configuration
ZOHO_USER=your-email@yourdomain.com
ZOHO_PASS=your-zoho-password
ZOHO_HOST=smtp.zoho.com
CONTACT_EMAIL=michael@foscanti.com
```

**Replace:**
- `your-email@yourdomain.com` — Your Zoho Mail email address
- `your-zoho-password` — Your Zoho account password
- `smtp.zoho.com` — Your region's SMTP host (see table above)
- `michael@foscanti.com` — Where contact form emails are sent

## Step 4: Security Best Practices

### Option A: Use Zoho App Password (Recommended)
Instead of using your main password, create an app-specific password:

1. Log into Zoho Mail
2. Settings → Security → **App Passwords**
3. Create a new app password for "Next.js Contact Form"
4. Use this generated password in `ZOHO_PASS` instead of your main password

### Option B: Main Password
If you prefer, you can use your regular Zoho password, but app passwords are more secure.

### Option C: Production Deployment
For production on AWS:
1. Add environment variables to GitHub Secrets:
   - `ZOHO_USER`
   - `ZOHO_PASS`
   - `ZOHO_HOST`
   - `CONTACT_EMAIL`

2. Update your GitHub Actions workflow (`.github/workflows/deploy.yml`) to pass these as secrets to the build.

## Step 5: Test the Connection

### Local Testing
1. Save your `.env.local` file
2. Start dev server: `npm run dev`
3. Go to http://localhost:3000/contact
4. Fill out the contact form
5. Submit and check:
   - Success message appears
   - Email arrives in your inbox
   - Check spam folder if not found

### Troubleshooting

**Error: "Authentication failed"**
- Double-check username and password
- Verify SMTP host is correct for your region
- Ensure Zoho Mail account is active

**Error: "Connection timeout"**
- Verify port 465 is not blocked (check firewall)
- Try alternative port 587 with `secure: false`

**Email not arriving**
- Check spam/junk folder
- Verify `CONTACT_EMAIL` is correct
- Check Zoho Mail quota isn't full

**Port 587 (TLS) Alternative**
If port 465 (SSL) doesn't work, update `src/app/api/contact/route.ts`:

```typescript
const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_HOST || "smtp.zoho.com",
  port: 587,
  secure: false,  // Use TLS instead of SSL
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASS,
  },
});
```

## Step 6: Verify Production Setup

After deploying to production:

1. **Add GitHub Secrets**:
   - Go to your repo → Settings → Secrets and variables → Actions
   - Add `ZOHO_USER`, `ZOHO_PASS`, `ZOHO_HOST`, `CONTACT_EMAIL`

2. **Update GitHub Actions workflow** (`.github/workflows/deploy.yml`):
   ```yaml
   - name: Build and deploy
     env:
       ZOHO_USER: ${{ secrets.ZOHO_USER }}
       ZOHO_PASS: ${{ secrets.ZOHO_PASS }}
       ZOHO_HOST: ${{ secrets.ZOHO_HOST }}
       CONTACT_EMAIL: ${{ secrets.CONTACT_EMAIL }}
   ```

3. **Test from production URL** to ensure emails are sent

## Zoho Mail Limits

- **Daily sending limit**: Usually 500 emails/day (check your plan)
- **Attachment size**: Up to 25 MB per email
- **Rate limiting**: Our form has 1 submission per minute per IP

If you hit Zoho's daily limit, upgrade your plan or use another service.

## Support

- **Zoho Mail Support**: https://www.zoho.com/mail/support/
- **Zoho SMTP Setup Guide**: https://www.zoho.com/mail/help/mobile-and-protocols/zoho-mail-imap-smtp-settings.html

## Next Steps

After confirming email works:
1. Check backlog for other enhancements
2. Set up analytics
3. Add blog section
4. Consider adding testimonials or case studies
