# ✅ Cleaning Ninja - Complete Setup Checklist

Use this checklist to ensure everything is configured before launching your website.

---

## 📋 Phase 1: Content Updates (30 minutes)

### Contact Information
- [ ] Update phone number in `lib/constants.ts` (PHONE_NUMBER)
- [ ] Update email address in `lib/constants.ts` (EMAIL)
- [ ] Update ABN number in `components/layout/Footer.tsx` (line 52)
- [ ] Add real business address in Footer

### Company Branding
- [ ] Replace 🥷 emoji with company logo
- [ ] Add favicon to `public/` folder
- [ ] Update company description in `app/layout.tsx` (metadata)
- [ ] Update social media links in Footer (Facebook, Instagram, LinkedIn)

### Services Content
- [ ] Review and update service descriptions in `lib/constants.ts`
- [ ] Add real service images (replace Unsplash URLs)
- [ ] Verify pricing information is accurate
- [ ] Add service-specific FAQs (optional)

### Customer Testimonials
- [ ] Replace example testimonials with real customer reviews
- [ ] Add customer photos (with permission)
- [ ] Verify ratings and locations are accurate
- [ ] Add more testimonials (recommend 6-9 total)

### Special Offers
- [ ] Update current promotions in `lib/constants.ts`
- [ ] Verify discount percentages are correct
- [ ] Add expiration dates if applicable
- [ ] Update offer images

---

## 📋 Phase 2: Complete Remaining Pages (2-3 hours)

### Service Pages
- [ ] Upholstery Cleaning (`app/services/upholstery-cleaning/page.tsx`)
- [ ] Tile & Grout Cleaning (`app/services/tile-grout-cleaning/page.tsx`)
- [ ] Leather Cleaning (`app/services/leather-cleaning/page.tsx`)
- [ ] End of Lease Cleaning (`app/services/end-of-lease-cleaning/page.tsx`)

**For each service page:**
- [ ] Copy template from `carpet-cleaning/page.tsx`
- [ ] Update service name and descriptions
- [ ] Add service-specific benefits
- [ ] Update process steps
- [ ] Add accurate pricing
- [ ] Include relevant images

### Additional Pages
- [ ] Special Offers page (`app/special-offers/page.tsx`)
- [ ] Gallery page (`app/gallery/page.tsx`)
  - [ ] Add before/after photos
  - [ ] Organize by service type
- [ ] Contact page (`app/contact/page.tsx`)
  - [ ] Add contact form
  - [ ] Add Google Maps embed
  - [ ] List office hours
- [ ] About page (`app/about/page.tsx`)
  - [ ] Company story
  - [ ] Team photos
  - [ ] Values and mission
- [ ] Become a Cleaner page (`app/become-a-cleaner/page.tsx`)
  - [ ] Job application form
  - [ ] Benefits of working with company
  - [ ] Requirements

---

## 📋 Phase 3: Functionality Setup (1 hour)

### Email Integration (Resend)
- [ ] Sign up for Resend account (resend.com)
- [ ] Verify email domain or use test domain
- [ ] Get API key
- [ ] Create `.env.local` file
- [ ] Add `RESEND_API_KEY=your_key_here`
- [ ] Install Resend: `npm install resend`
- [ ] Uncomment email code in `app/api/quote/route.ts`
- [ ] Test form submission
- [ ] Setup email templates
- [ ] Configure "from" email address

### Forms
- [ ] Test quote form on all pages
- [ ] Add contact form to Contact page
- [ ] Add job application form
- [ ] Setup form validation messages
- [ ] Test error handling
- [ ] Add success/error notifications

### Analytics
- [ ] Setup Google Analytics 4
  - [ ] Create GA4 property
  - [ ] Get tracking ID
  - [ ] Add to `app/layout.tsx`
- [ ] Or setup Vercel Analytics
  - [ ] `npm install @vercel/analytics`
  - [ ] Add `<Analytics />` component
- [ ] Setup Google Tag Manager (optional)
- [ ] Add conversion tracking for forms

---

## 📋 Phase 4: Visual Assets (2-3 hours)

### Images
- [ ] Professional hero background image
- [ ] High-quality service images (at least 1920x1080)
- [ ] Before/after photos for gallery
- [ ] Team photos for About page
- [ ] Customer testimonial photos (with consent)
- [ ] Office/workspace photos
- [ ] Equipment photos (optional)

### Logo & Branding
- [ ] Company logo (PNG with transparency)
- [ ] Favicon (16x16, 32x32, 192x192)
- [ ] Apple touch icon (180x180)
- [ ] Social sharing image (1200x630 for Open Graph)

### Video (Optional but Recommended)
- [ ] Hero section background video
- [ ] Service demonstration videos
- [ ] Customer testimonial videos

---

## 📋 Phase 5: SEO Optimization (1 hour)

### On-Page SEO
- [ ] Verify all page titles are unique and descriptive
- [ ] Check all meta descriptions (150-160 characters)
- [ ] Add alt text to all images
- [ ] Ensure H1 tags are on every page
- [ ] Use proper heading hierarchy (H1 → H2 → H3)
- [ ] Add internal links between pages

### Technical SEO
- [ ] Verify `sitemap.ts` includes all pages
- [ ] Check `robots.ts` configuration
- [ ] Test page load speed (aim for <3 seconds)
- [ ] Optimize images (compress to <200KB each)
- [ ] Add structured data (JSON-LD)
  - [ ] Organization schema
  - [ ] LocalBusiness schema
  - [ ] Service schema for each service
  - [ ] Review schema for testimonials

### Local SEO (Australian Market)
- [ ] Add schema.org markup for Australian business
- [ ] Include "Australia" in meta descriptions
- [ ] List all service areas/cities
- [ ] Add Australian contact information
- [ ] Create Google My Business listing

---

## 📋 Phase 6: Testing (2 hours)

### Functionality Testing
- [ ] Test all navigation links work
- [ ] Test mobile menu
- [ ] Test quote form submission
- [ ] Test all internal links
- [ ] Test external links (open in new tab)
- [ ] Test floating call button
- [ ] Test form validation (try invalid inputs)
- [ ] Test success/error messages

### Browser Testing
- [ ] Chrome (Desktop & Mobile)
- [ ] Safari (Desktop & Mobile)
- [ ] Firefox
- [ ] Edge
- [ ] Test on actual iPhone/Android device

### Responsive Design Testing
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)
- [ ] Large Desktop (1920px+)
- [ ] Test landscape mode on mobile

### Performance Testing
- [ ] Run Google Lighthouse audit
  - [ ] Aim for 90+ Performance score
  - [ ] Aim for 95+ Accessibility score
  - [ ] Aim for 100 SEO score
  - [ ] Aim for 100 Best Practices score
- [ ] Test page load speed: [GTmetrix](https://gtmetrix.com)
- [ ] Test mobile speed: [Google PageSpeed Insights](https://pagespeed.web.dev)

### Accessibility Testing
- [ ] Test with screen reader
- [ ] Check color contrast (WCAG AA minimum)
- [ ] Ensure keyboard navigation works
- [ ] Test with images disabled
- [ ] Check focus indicators are visible

---

## 📋 Phase 7: Pre-Launch (1 hour)

### Legal & Compliance
- [ ] Add Privacy Policy page
- [ ] Add Terms of Service page
- [ ] Add cookie consent banner (if needed)
- [ ] Verify GDPR compliance (if EU traffic)
- [ ] Add Australian Consumer Law notices

### Security
- [ ] Remove console.log statements
- [ ] Check no API keys in client code
- [ ] Verify environment variables are secure
- [ ] Test form spam protection
- [ ] Add reCAPTCHA to forms (optional)

### Content Review
- [ ] Spell check all pages
- [ ] Grammar check
- [ ] Verify all prices are correct
- [ ] Check phone number formatting
- [ ] Verify email addresses work
- [ ] Check business hours are current

---

## 📋 Phase 8: Deployment (1 hour)

### GitHub Setup
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Add `.gitignore` file (already included)
- [ ] Write descriptive commit messages
- [ ] Create `main` branch

### Vercel Deployment
- [ ] Sign up for Vercel account
- [ ] Connect GitHub repository
- [ ] Configure build settings (auto-detected)
- [ ] Add environment variables
  - [ ] `RESEND_API_KEY`
  - [ ] Any other secrets
- [ ] Deploy to production
- [ ] Test deployment works

### Domain Setup (cleaningninja.co)
- [ ] Add domain in Vercel settings
- [ ] Get DNS records from Vercel
- [ ] Login to GoDaddy
- [ ] Update DNS A record
- [ ] Update DNS CNAME record
- [ ] Wait for DNS propagation (up to 48 hours)
- [ ] Verify SSL certificate is active (automatic)
- [ ] Test www.cleaningninja.co redirects to cleaningninja.co

---

## 📋 Phase 9: Post-Launch (Ongoing)

### Search Engines
- [ ] Submit to Google Search Console
  - [ ] Verify ownership
  - [ ] Submit sitemap
  - [ ] Request indexing for key pages
- [ ] Submit to Bing Webmaster Tools
- [ ] Create and submit Google My Business listing
- [ ] Get listed on Australian business directories

### Marketing Setup
- [ ] Setup Facebook Business Page
- [ ] Create Instagram Business account
- [ ] Setup LinkedIn Company Page
- [ ] Create Google Ads campaign (optional)
- [ ] Setup Facebook Pixel (optional)
- [ ] Create email marketing list

### Monitoring
- [ ] Setup uptime monitoring (UptimeRobot or similar)
- [ ] Configure error tracking (Sentry or similar)
- [ ] Setup email alerts for form submissions
- [ ] Monitor Analytics weekly
- [ ] Track keyword rankings

### Ongoing Maintenance
- [ ] Weekly: Check analytics
- [ ] Weekly: Respond to quote requests promptly
- [ ] Monthly: Update special offers
- [ ] Monthly: Add new testimonials
- [ ] Quarterly: Update service pages
- [ ] Yearly: Renew domain name

---

## 🎯 Launch Day Checklist

### Final Checks
- [ ] Test entire website one last time
- [ ] Clear browser cache and test
- [ ] Test on mobile data (not WiFi)
- [ ] Verify phone number works
- [ ] Test quote form sends email
- [ ] Check SSL certificate is active
- [ ] Verify Google Analytics is tracking

### Social Media Launch
- [ ] Announce launch on Facebook
- [ ] Post on Instagram
- [ ] Share on LinkedIn
- [ ] Email existing customers (if applicable)
- [ ] Update Google My Business

### Backup & Documentation
- [ ] Take full website backup
- [ ] Document login credentials (store securely)
- [ ] Create website admin guide
- [ ] Document any custom configurations

---

## 📊 Success Metrics to Track

After launch, monitor these KPIs weekly:

- [ ] Website traffic (unique visitors)
- [ ] Quote form submissions
- [ ] Phone call volume (from website)
- [ ] Bounce rate (aim for <50%)
- [ ] Average session duration (aim for >2 minutes)
- [ ] Mobile vs desktop traffic ratio
- [ ] Top performing pages
- [ ] Traffic sources (organic, direct, referral)
- [ ] Conversion rate (visitors to leads)

---

## ✅ Ready to Launch?

**You're ready to launch when you can check off at least:**
- ✅ All of Phase 1 (Content Updates)
- ✅ All of Phase 2 (Complete Pages)
- ✅ All of Phase 3 (Functionality)
- ✅ All of Phase 6 (Testing)
- ✅ All of Phase 8 (Deployment)

**Nice to have (but can be added post-launch):**
- Phase 4 (Professional videos)
- Phase 5 (Advanced SEO)
- Phase 9 (Marketing setup)

---

**Last Updated**: October 23, 2025
**Status**: Ready for customization and deployment

🥷 **Good luck with your Cleaning Ninja launch!**
