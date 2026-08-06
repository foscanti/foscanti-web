# Website Enhancement Backlog

## Priority: High

### 1. Email Configuration (REQUIRED for contact form)
- [ ] Set up email sending credentials (choose one):
  - **Option A: Gmail (simplest)** — Generate App Password at https://myaccount.google.com/app-passwords
    - Set `GMAIL_USER` and `GMAIL_PASS` in `.env.local`
  - **Option B: Resend** (free tier) — Sign up at https://resend.com
    - Install: `npm install resend`
    - Uncomment Resend code in `src/app/api/contact/route.ts`
    - Set `RESEND_API_KEY` in `.env.local`
  - **Option C: AWS SES** (you're on AWS) — Configure SES region
    - AWS credentials already available via OIDC
    - Uncomment AWS code in `src/app/api/contact/route.ts`
- [ ] Test contact form submission in development
- [ ] Verify emails arrive in inbox

### 2. Fix Security Vulnerabilities
- [ ] Run `npm audit` and review results
- [ ] Address high/critical vulnerabilities: `npm audit fix`
- [ ] Test site after fixes

### 3. Analytics Setup
- [ ] Install Google Analytics or similar
- [ ] Track: form submissions, page views, time on page, conversion funnels
- [ ] Set goals: contact form submission, LinkedIn connection, page scrolls

## Priority: Medium

### 4. Content & Messaging Enhancements
- [ ] Add skill categories (Leadership, Technical, Process Management)
- [ ] Add proficiency levels to skills (5+ years, 2-5 years, 1-2 years)
- [ ] Enhance experience bullets with metrics:
  - "Led team of X people"
  - "Delivered $XM program"
  - "Increased efficiency by X%"
  - "Managed X stakeholders"
- [ ] Add call-to-action buttons at end of each section
- [ ] Review "Why Foscanti?" section for visual hierarchy

### 5. Blog Section
- [ ] Create blog directory and structure
- [ ] Add blog index page (`/blog`)
- [ ] Create 3-5 initial posts:
  - "Leadership lessons from 18 years in tech"
  - "Program delivery in enterprise environments"
  - "Building high-performing teams"
  - "Operational excellence frameworks"
- [ ] Add RSS feed for blog
- [ ] Tag system for blog posts
- [ ] Related posts section

### 6. Portfolio/Case Studies
- [ ] Create case study section (1-3 projects)
  - Project title, challenge, solution, impact
  - Timeline, team size, technologies/methodologies
- [ ] Add before/after metrics
- [ ] Client names (if public) or anonymized examples

### 7. Social Presence
- [ ] Add more social media links (consider):
  - GitHub (if applicable)
  - Twitter/X profile
  - Medium or other writing platforms
- [ ] Add social media icons to footer
- [ ] Create consistent branding across platforms

### 8. Resume/CV Download
- [ ] Create PDF resume/CV
- [ ] Add download link on About page
- [ ] Add download button on hero section
- [ ] Consider multiple formats (PDF, plain text)

### 9. Testimonials Section
- [ ] Add section for client/colleague testimonials
- [ ] Get 3-5 testimonials with:
  - Quote
  - Name & title
  - Company (optional)
  - Photo (optional)
- [ ] Display on home page or dedicated page

### 10. Certifications Display
- [ ] Highlight PRINCE2 more prominently
- [ ] Add other certs (if any):
  - Agile certifications
  - Project management certs
  - Cloud certs (AWS, Azure, GCP)
- [ ] Display cert logos and validity dates

## Priority: Low

### 11. Advanced Features
- [ ] Dark mode toggle
- [ ] Print-friendly resume/CV version
- [ ] Newsletter signup form
- [ ] Speaking engagements/conference appearances section
- [ ] Video introduction (30-60 seconds)
- [ ] Photo gallery/multiple headshot options

### 12. Performance & UX Polish
- [ ] Performance monitoring (Google Lighthouse CI)
- [ ] Mobile responsiveness audit
- [ ] Accessibility audit (WCAG AAA compliance)
- [ ] Add 404 error page
- [ ] Add skip-to-content link for keyboard navigation
- [ ] Enhance form validation messages
- [ ] Add breadcrumb navigation on subpages

### 13. Advanced SEO
- [ ] Add rich snippets for job search (structured data)
- [ ] Create FAQ schema markup
- [ ] Internal link strategy optimization
- [ ] URL slug optimization
- [ ] Meta description optimization for each page
- [ ] Create search console account and submit sitemap

### 14. Monitoring & Maintenance
- [ ] Set up error tracking (Sentry, Rollbar)
- [ ] Monitor API response times
- [ ] Set up uptime monitoring
- [ ] Create changelog or release notes page
- [ ] Plan content refresh schedule (quarterly?)

## Notes

- **Infrastructure**: Already set up with S3 + CloudFront + GitHub Actions
- **Build output changed**: Switched from static export to server-side rendering (standalone) to support API routes
- **Email service**: Must be configured before contact form is functional
- **Rate limiting**: Currently 1 submission per minute per IP (in-memory, resets on deploy)
- **Forms**: Contact form is ready, other forms (newsletter, etc.) can reuse the same pattern

## Completed Items ✅

- ✅ Fix name inconsistency (Michael Moss)
- ✅ Add robots.txt
- ✅ Add sitemap.xml
- ✅ Add JSON-LD schema
- ✅ Add Open Graph/Twitter meta tags
- ✅ Create contact form with validation
- ✅ Implement rate limiting (1 per minute per IP)
- ✅ Reduce mobile whitespace
- ✅ Add LinkedIn button to hero
- ✅ Add country flags to phone numbers
