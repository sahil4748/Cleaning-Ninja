# 🚀 Quick Start Guide - Cleaning Ninja Website

## ⚡ Get Running in 60 Seconds

```bash
# 1. Navigate to project
cd cleaning-ninja

# 2. Install dependencies (first time only)
npm install

# 3. Start development server
npm run dev
```

✅ **Open http://localhost:3000 in your browser!**

---

## 🎯 What You Should See

When you open http://localhost:3000, you'll see:

1. **Hero Section**: Full-screen banner with "Fair Dinkum Professional Cleaning"
2. **Services Grid**: 5 cleaning services with images
3. **Special Offers**: 2 featured deals
4. **Ninja Club**: Subscription pitch section
5. **Testimonials**: 3 customer reviews
6. **Quote Form**: Contact form at the bottom

---

## 📝 Immediate Customizations

### 1. Change Phone Number & Email

Edit [`lib/constants.ts`](lib/constants.ts):
```typescript
export const PHONE_NUMBER = '1300 000 123'  // ← Change this
export const EMAIL = 'hello@cleaningninja.co'  // ← Change this
```

### 2. Update Company Info

Edit [`components/layout/Footer.tsx`](components/layout/Footer.tsx):
- Line 52: Change ABN number
- Social media links (Lines 60-62)

### 3. Replace Images

Edit [`lib/constants.ts`](lib/constants.ts):
- Update SERVICES array with your image URLs
- Update TESTIMONIALS with customer photos

---

## 🛠️ Common Tasks

### Add a New Service

1. Create folder: `app/services/window-cleaning/`
2. Copy `app/services/carpet-cleaning/page.tsx` into it
3. Customize the content
4. Add service to `lib/constants.ts`:

```typescript
{
  id: 'window-cleaning',
  name: 'Window Cleaning',
  slug: 'window-cleaning',
  description: 'Crystal clear windows...',
  image: 'https://...',
  icon: '🪟',
}
```

### Change Colors

Edit [`tailwind.config.ts`](tailwind.config.ts), lines 11-27:

```typescript
primary: '#4E5B3F',    // Brand green
gold: '#D4AF37',       // Royal gold
accent: '#F7F5DC',     // Cream
navy: '#1a2332',       // Dark navy
```

### Add More Testimonials

Edit [`lib/constants.ts`](lib/constants.ts) → TESTIMONIALS array:

```typescript
{
  id: 4,  // Increment ID
  name: 'Your Customer',
  location: 'Sydney',
  service: 'Carpet Cleaning',
  rating: 5,
  text: "Amazing service!",
  image: 'https://...',
}
```

---

## 🚀 Deploy to Production

### Quick Deploy (Vercel - FREE)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. **Deploy:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repo
   - Click "Deploy"
   - Done! 🎉

3. **Connect Domain:**
   - See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions

---

## 📂 Key Files to Know

| File | What It Does |
|------|--------------|
| `app/page.tsx` | Homepage |
| `lib/constants.ts` | All content (services, testimonials, contact) |
| `components/layout/Header.tsx` | Top navigation |
| `components/layout/Footer.tsx` | Bottom footer |
| `app/api/quote/route.ts` | Form submission handler |
| `tailwind.config.ts` | Colors and styling |

---

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
# Kill the process
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

**Changes not showing?**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Restart dev server

**Module not found errors?**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## 📚 Full Documentation

- 📖 [README.md](README.md) - Complete project documentation
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Step-by-step deployment guide
- 📊 [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - What's built & what's next

---

## ✅ Pre-Launch Checklist

Before going live, make sure to:

- [ ] Update phone number and email
- [ ] Replace all placeholder images
- [ ] Test quote form submission
- [ ] Update company information (ABN, etc.)
- [ ] Add real customer testimonials
- [ ] Test on mobile devices
- [ ] Check all service pages
- [ ] Setup email integration (Resend)
- [ ] Test on different browsers
- [ ] Run production build locally
- [ ] Setup Google Analytics
- [ ] Submit to Google Search Console

---

## 🆘 Need Help?

1. Check [README.md](README.md) for detailed info
2. Read [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
3. Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for project overview

---

**🎉 You're all set! Start customizing and make it yours!**

👉 **Next**: Open [lib/constants.ts](lib/constants.ts) and update your contact info
