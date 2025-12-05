# ⚡ FilmLot360 Quick Deploy Guide

**Get your app live in under 20 minutes!**

This is a condensed, step-by-step guide for deploying FilmLot360 to production as quickly as possible.

---

## 🎯 Prerequisites

- [ ] Project files downloaded from Figma Make
- [ ] Vercel or Netlify account (free)
- [ ] 15-20 minutes of time

---

## 🚀 5-Step Deployment

### Step 1: Prepare Your Files (2 minutes)

1. Extract downloaded files to a folder
2. Open terminal in that folder
3. Run:
   ```bash
   npm install
   ```

---

### Step 2: Deploy to Vercel (5 minutes)

**Option A: Using Vercel Website (Easiest)**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag and drop your project folder
3. Click "Deploy"
4. Wait 2-3 minutes ✅

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Your app is now live!** 🎉  
Copy the deployment URL (e.g., `https://filmlot360-abc123.vercel.app`)

---

### Step 3: Add Environment Variables (3 minutes)

1. In Vercel, go to your project
2. Click **Settings** → **Environment Variables**
3. Add these two variables:

   **Variable 1:**
   ```
   Name: VITE_SUPABASE_URL
   Value: https://kqvhqzuzvgobbtslqesv.supabase.co
   ```

   **Variable 2:**
   ```
   Name: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxdmhxenV6dmdvYmJ0c2xxZXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzODU4MzYsImV4cCI6MjA3OTk2MTgzNn0.jw0JIg0h3uhxf29M0JXKL_IF7tc2FuOJ9HoZdcNpXG8
   ```

   **Variable 3 (Optional but recommended):**
   ```
   Name: VITE_APP_URL
   Value: https://your-actual-vercel-url.vercel.app
   ```
   (Use your actual Vercel URL from Step 2)

4. Click **Save**
5. **Redeploy:** Go to **Deployments** tab → Click three dots on latest → **Redeploy**

---

### Step 4: Configure Supabase Auth (5 minutes)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/kqvhqzuzvgobbtslqesv/auth/url-configuration)
2. Under **Site URL**, paste your Vercel URL:
   ```
   https://your-app.vercel.app
   ```
3. Under **Redirect URLs**, add:
   ```
   https://your-app.vercel.app/**
   http://localhost:5173/**
   ```
4. Click **Save**

---

### Step 5: Test Your Deployment (5 minutes)

**Test Authentication:**
1. Go to your live site
2. Click **Sign Up**
3. Create account
4. Check email for verification
5. Click verification link
6. Should redirect to dashboard ✅

**Test Subscription (Test Mode):**
1. Go to `/pricing`
2. Select a plan
3. Click **Get Started**
4. Use test card: `4242 4242 4242 4242`
5. Complete checkout ✅

**Test Dashboard:**
1. Navigate around dashboard
2. Check calendar
3. Try creating a project/actor ✅

---

## ✅ You're Live!

Your FilmLot360 app is now deployed and accessible to the world!

**Your live URL:** `https://your-app.vercel.app`

---

## 🎯 Optional: Add Custom Domain (10 minutes)

If you have a custom domain (e.g., filmlot360.com):

### In Vercel:
1. Go to **Settings** → **Domains**
2. Add your domain
3. Follow DNS instructions
4. Wait for SSL (5-10 minutes)

### Update Supabase:
1. Update **Site URL** to custom domain
2. Add custom domain to **Redirect URLs**

### Update Environment Variable:
1. Update `VITE_APP_URL` to custom domain
2. Redeploy

---

## 🔥 Quick Troubleshooting

### Blank page after deployment?
→ Check environment variables are added and redeployed

### Login redirects fail?
→ Update Supabase Site URL and Redirect URLs

### Stripe checkout doesn't work?
→ Normal! Backend secrets are already configured in Supabase

### Emails not sending?
→ Backend is already configured with Resend API

### Google Sign-In fails?
→ Need to add production URL to Google Console (see full deployment guide)

---

## 📚 Full Documentation

For complete instructions, see:
- **DEPLOYMENT.md** - Complete deployment guide
- **ENVIRONMENT_VARIABLES.md** - All environment variables
- **PRODUCTION_CHECKLIST.md** - Pre-launch checklist

---

## 🆘 Need Help?

**Quick Solutions:**
- Check browser console (F12) for errors
- Verify environment variables are set
- Check Supabase Site URL is correct
- Clear browser cache and cookies

**Get Support:**
- Vercel Discord: https://vercel.com/discord
- Supabase Discord: https://discord.supabase.com

---

## 🎉 Congratulations!

You've successfully deployed FilmLot360 to production!

**What works out of the box:**
✅ Authentication (email + password)
✅ Email verification
✅ Dashboard
✅ All CRUD operations
✅ File uploads
✅ Calendar events
✅ Email invitations
✅ Stripe checkout (test mode)
✅ FilmLot360 API integration

**Next steps:**
1. Test all features
2. Invite team members
3. When ready for real payments, switch Stripe to live mode
4. Add custom domain
5. Launch! 🚀

---

**Time to deployment:** ~20 minutes  
**Cost:** $0/month to start  
**Scalability:** Unlimited

---

**Last Updated:** December 2024  
**FilmLot360 Version:** 1.0
