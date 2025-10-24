# 🥷 Cleaning Ninja - Premium Cleaning Services Website

A premium Next.js 14 website for Cleaning Ninja Australia - professional cleaning services with a royal, luxury design.

## 🚀 Features

- **Premium Design**: Gold accents, elegant animations, smooth transitions
- **Fully Responsive**: Works perfectly on all devices
- **SEO Optimized**: Complete meta tags, sitemap, robots.txt
- **Fast Performance**: Optimized images and code splitting
- **Contact Forms**: Quote request forms with API integration
- **Service Pages**: Dedicated pages for each cleaning service
- **Framer Motion Animations**: Smooth, professional animations throughout

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🌐 Deployment to Vercel (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Cleaning Ninja website"

# Add your GitHub repository
git remote add origin YOUR_GITHUB_REPO_URL

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your `cleaning-ninja` repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

### Step 3: Connect Your Domain (cleaningninja.co from GoDaddy)

1. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Add custom domain: `cleaningninja.co`
   - Also add: `www.cleaningninja.co`
   - Vercel will provide DNS records

2. **In GoDaddy DNS Management:**
   - Login to GoDaddy
   - Go to your domain → DNS settings
   - Add these records:

   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 600

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 600
   ```

3. **Wait for DNS Propagation** (can take 24-48 hours)
4. **Verify**: Once propagated, your site will be live at cleaningninja.co

## 📧 Email Integration (Optional)

To enable quote form email notifications:

1. Sign up for [Resend](https://resend.com) (free tier available)
2. Get your API key
3. Create `.env.local` file:
   ```
   RESEND_API_KEY=your_api_key_here
   ```
4. Uncomment the email code in `app/api/quote/route.ts`
5. Install Resend: `npm install resend`

## 📁 Project Structure

```
cleaning-ninja/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Homepage
│   ├── services/          # Service pages
│   ├── api/               # API routes
│   ├── sitemap.ts         # SEO sitemap
│   └── robots.ts          # SEO robots.txt
├── components/
│   ├── layout/            # Header, Footer, FloatingCTA
│   ├── sections/          # Homepage sections
│   ├── ui/                # Reusable UI components
│   └── forms/             # Form components
├── lib/
│   ├── utils.ts           # Utility functions
│   └── constants.ts       # Site constants
└── public/                # Static assets
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: '#4E5B3F',    // Brand green
  gold: '#D4AF37',       // Royal gold
  accent: '#F7F5DC',     // Cream
  // ... customize as needed
}
```

### Contact Information

Edit `lib/constants.ts`:

```typescript
export const PHONE_NUMBER = '1300 000 123'  // Change to your phone
export const EMAIL = 'hello@cleaningninja.co'  // Change to your email
```

### Services

Add/edit services in `lib/constants.ts` under `SERVICES` array.

### Images

Replace Unsplash URLs with your own images in:
- `lib/constants.ts` (service images)
- Component files (hero backgrounds, etc.)

## 📄 Pages Included

- ✅ Homepage (Hero, Services, Offers, Testimonials, Quote Form)
- ✅ Services Overview Page
- ✅ Carpet Cleaning Service Page (template for others)
- ⏳ Additional service pages (copy carpet-cleaning template)
- ⏳ Special Offers page
- ⏳ Gallery page
- ⏳ Contact page
- ⏳ Become a Cleaner page
- ⏳ About page

## 🔧 Next Steps

1. **Create remaining service pages**: Copy `app/services/carpet-cleaning/page.tsx` and customize
2. **Add real images**: Replace Unsplash URLs with professional photos
3. **Setup email**: Configure Resend for form submissions
4. **Add analytics**: Integrate Google Analytics or Vercel Analytics
5. **Test all forms**: Ensure quote forms work properly
6. **SEO optimization**: Add more meta tags, structured data
7. **Performance testing**: Run Lighthouse audits

## 📞 Support

For questions or issues:
- Email: hello@cleaningninja.co
- Phone: 1300 000 123

## 📝 License

Copyright © 2025 Cleaning Ninja Australia. All Rights Reserved.

---

**Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS**
