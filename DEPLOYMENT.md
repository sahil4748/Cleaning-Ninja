# 🚀 Cleaning Ninja - Deployment Guide

## Quick Deploy to Vercel (5 minutes)

### Method 1: GitHub + Vercel (Recommended)

**Step 1: Push to GitHub**

```bash
cd cleaning-ninja

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "🥷 Initial commit - Cleaning Ninja premium website"

# Create main branch
git branch -M main

# Add your GitHub repository (create one at github.com first)
git remote add origin https://github.com/YOUR_USERNAME/cleaning-ninja.git

# Push to GitHub
git push -u origin main
```

**Step 2: Deploy to Vercel**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your `cleaning-ninja` repository
4. Vercel auto-detects Next.js - no configuration needed
5. Click **"Deploy"**
6. Wait 2-3 minutes for build to complete

**Step 3: Connect cleaningninja.co Domain**

1. **In Vercel:**
   - Go to Project → Settings → Domains
   - Click "Add Domain"
   - Enter: `cleaningninja.co`
   - Click "Add"
   - Also add: `www.cleaningninja.co`

2. **Copy DNS Records from Vercel:**

   Vercel will show something like:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **In GoDaddy:**
   - Login to GoDaddy account
   - Go to: My Products → Domains → cleaningninja.co → DNS
   - Click "Manage DNS"

   **Add A Record:**
   - Type: A
   - Name: @
   - Value: 76.76.21.21
   - TTL: 600 seconds (or default)

   **Add CNAME Record:**
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com
   - TTL: 1 Hour (or default)

   - Save changes

4. **Wait for DNS Propagation:**
   - Usually takes 5-30 minutes
   - Can take up to 48 hours
   - Check status: [dnschecker.org](https://dnschecker.org)

5. **Verify SSL:**
   - Vercel automatically provisions SSL certificates
   - Your site will be available at https://cleaningninja.co

---

## Alternative: Netlify Deployment

### Deploy to Netlify

1. Push code to GitHub (same as above)
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub → Select repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### Connect Domain on Netlify

1. Go to Site settings → Domain management
2. Add custom domain: `cleaningninja.co`
3. Follow similar DNS setup as Vercel
4. Netlify also provides free SSL

---

## Environment Variables

If you integrate email (Resend), add environment variables:

**In Vercel:**
1. Go to Project → Settings → Environment Variables
2. Add:
   - Key: `RESEND_API_KEY`
   - Value: Your Resend API key
3. Redeploy the project

**In Netlify:**
1. Site settings → Environment variables
2. Add the same variables

---

## Post-Deployment Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] All service pages accessible
- [ ] Navigation menu works
- [ ] Quote form submits successfully
- [ ] Mobile responsive design works
- [ ] Images load properly
- [ ] SSL certificate active (https)
- [ ] Custom domain resolves correctly
- [ ] Contact information is accurate
- [ ] Test on multiple browsers
- [ ] Google Search Console setup
- [ ] Google Analytics integration (optional)

---

## Continuous Deployment

Both Vercel and Netlify support automatic deployments:

```bash
# Make changes to your site
git add .
git commit -m "Update services section"
git push

# Vercel/Netlify automatically detects the push and redeploys
# Your site updates in 2-3 minutes!
```

---

## Custom Configurations

### Vercel Analytics (Free)

Add to your project:

```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

// Add to body:
<Analytics />
```

### Email Setup with Resend

1. Sign up: [resend.com](https://resend.com)
2. Verify your domain or use their test domain
3. Get API key
4. Add to environment variables
5. Update `app/api/quote/route.ts` (code commented out)

---

## Troubleshooting

**Domain not resolving?**
- Wait longer (DNS can take 48 hours)
- Check DNS records are correct
- Clear browser cache
- Try incognito mode

**Build failing?**
- Check build logs in Vercel/Netlify
- Ensure all dependencies installed
- Test `npm run build` locally first

**Forms not working?**
- Check API route is deployed
- Verify environment variables
- Check browser console for errors

**Images not loading?**
- Check image URLs are accessible
- Verify Next.js image optimization settings
- Use relative paths for local images

---

## Support & Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **GoDaddy Support**: [godaddy.com/help](https://godaddy.com/help)

---

**🎉 Congratulations! Your premium Cleaning Ninja website is now live!**
