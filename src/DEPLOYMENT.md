# FilmLot360 Deployment Guide

This comprehensive guide will help you deploy your FilmLot360 application to production with all features working: authentication, payments, emails, and more.

---

## 📚 Documentation Files

- **This file:** Complete deployment guide
- **ENVIRONMENT_VARIABLES.md:** Detailed environment variable reference
- **.env.example:** Template for environment variables

---

## 🚀 Quick Start (Choose One Platform)

### Option 1: Vercel (Recommended)

**Step 1: Download Your Code**
1. Download all project files from Figma Make
2. Extract to a folder on your computer
3. Open terminal/command prompt in that folder
4. Run: `npm install` (installs dependencies)

**Step 2: Build Locally (Optional Test)**
1. Run: `npm run build`
2. This creates the `dist` folder
3. Run: `npm run preview` to test locally

**Step 3: Set Up Vercel**
1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click "Add New Project"
3. Import your project folder (or connect GitHub repo)
4. Vercel will auto-detect it as a Vite React app

**Step 4: Configure Environment Variables**
1. In Vercel project settings, go to "Environment Variables"
2. Add these **FRONTEND** variables (required):
   ```
   VITE_SUPABASE_URL = https://kqvhqzuzvgobbtslqesv.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxdmhxenV6dmdvYmJ0c2xxZXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzODU4MzYsImV4cCI6MjA3OTk2MTgzNn0.jw0JIg0h3uhxf29M0JXKL_IF7tc2FuOJ9HoZdcNpXG8
   ```
3. Add **OPTIONAL** production URL (recommended):
   ```
   VITE_APP_URL = https://your-project.vercel.app
   ```
   (Update this after deployment with your actual Vercel URL or custom domain)

**Step 5: Deploy**
1. Click "Deploy"
2. Wait 2-3 minutes
3. Your site is live! 🎉

**Step 6: Update Production URL**
1. After deployment, copy your Vercel URL
2. Go back to Environment Variables
3. Update `VITE_APP_URL` with your actual URL
4. Redeploy

---

### Option 2: Netlify

**Step 1: Download Your Code**
1. Download all project files from Figma Make
2. Extract to a folder on your computer
3. Open terminal/command prompt in that folder
4. Run: `npm install` (installs dependencies)

**Step 2: Build Locally (Optional Test)**
1. Run: `npm run build`
2. This creates the `dist` folder
3. Run: `npm run preview` to test locally

**Step 3: Set Up Netlify**
1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Drag and drop your project folder into Netlify
3. Or connect via Git (GitHub, GitLab, Bitbucket)

**Step 4: Configure Build Settings**
1. Build command: `npm run build`
2. Publish directory: `dist`

**Step 5: Environment Variables**
1. Site Settings → Environment Variables
2. Add **FRONTEND** variables:
   ```
   VITE_SUPABASE_URL = https://kqvhqzuzvgobbtslqesv.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxdmhxenV6dmdvYmJ0c2xxZXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzODU4MzYsImV4cCI6MjA3OTk2MTgzNn0.jw0JIg0h3uhxf29M0JXKL_IF7tc2FuOJ9HoZdcNpXG8
   ```
3. Add **OPTIONAL** production URL:
   ```
   VITE_APP_URL = https://your-site.netlify.app
   ```

**Step 6: Deploy**
1. Click "Deploy site"
2. Wait 2-3 minutes
3. Your site is live! 🎉

---

## 🔧 Supabase Backend Configuration

Your backend is already deployed to Supabase Edge Functions! All backend environment variables (secrets) are already configured:

✅ **Already Configured in Supabase:**
- Supabase service role key
- Stripe secret keys and price IDs
- Google OAuth credentials
- Resend email API key
- Database connection string

**Your backend API endpoint:**
```
https://kqvhqzuzvgobbtslqesv.supabase.co/functions/v1/make-server-b0eae7ae
```

### If You Need to Update Backend Secrets:

1. Go to [Supabase Dashboard → Functions](https://supabase.com/dashboard/project/kqvhqzuzvgobbtslqesv/settings/functions)
2. Click "Manage secrets"
3. Update any secrets as needed
4. They take effect immediately (no redeploy needed)

### If You Need to Redeploy Edge Function:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref kqvhqzuzvgobbtslqesv

# Deploy edge function
supabase functions deploy make-server-b0eae7ae
```

---

## 🔐 Supabase Authentication Configuration

After deploying your frontend, you need to configure Supabase to allow redirects to your production URL.

### Configure Site URLs:

1. Go to [Supabase Dashboard → Authentication → URL Configuration](https://supabase.com/dashboard/project/kqvhqzuzvgobbtslqesv/auth/url-configuration)

2. **Set Site URL** to your production URL:
   ```
   https://your-domain.vercel.app
   ```
   or
   ```
   https://your-domain.netlify.app
   ```

3. **Add Redirect URLs** (add all of these):
   ```
   https://your-domain.vercel.app/**
   https://your-domain.netlify.app/**
   http://localhost:5173/**  (for local development)
   ```

4. Click **Save**

### Email Templates:

Your app uses Resend for emails, but you can customize Supabase email templates:

1. Go to: [Supabase Dashboard → Authentication → Email Templates](https://supabase.com/dashboard/project/kqvhqzuzvgobbtslqesv/auth/templates)
2. Customize templates for:
   - Confirm signup
   - Magic link
   - Password recovery
3. Update URLs to match your production domain

---

## 🔵 Google OAuth Configuration

Your Google OAuth is already configured, but you need to add production URLs.

### Update Google Cloud Console:

1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Find your OAuth 2.0 Client ID
3. Under "Authorized JavaScript origins", add:
   ```
   https://your-domain.vercel.app
   https://kqvhqzuzvgobbtslqesv.supabase.co
   ```
4. Under "Authorized redirect URIs", add:
   ```
   https://kqvhqzuzvgobbtslqesv.supabase.co/auth/v1/callback
   https://your-domain.vercel.app/**
   ```
5. Click **Save**

**Documentation:** https://supabase.com/docs/guides/auth/social-login/auth-google

---

## 💳 Stripe Configuration

Your Stripe integration is already configured with all price IDs!

### For Production (when ready):

1. **Switch to Live Mode** in [Stripe Dashboard](https://dashboard.stripe.com)

2. **Create Production Products & Prices:**
   - Starter Plan (Monthly & Yearly)
   - Professional Plan (Monthly & Yearly)
   - Studio Plan (Monthly & Yearly)
   - Growth Plan (Monthly & Yeary)

3. **Update Supabase Secrets** with live keys:
   - Go to [Supabase Functions Secrets](https://supabase.com/dashboard/project/kqvhqzuzvgobbtslqesv/settings/functions)
   - Update `STRIPE_SECRET_KEY` with live key (`sk_live_...`)
   - Update all `STRIPE_*_PRICE_ID` variables with production price IDs

4. **Configure Webhooks:**
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://kqvhqzuzvgobbtslqesv.supabase.co/functions/v1/make-server-b0eae7ae/stripe-webhook`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy signing secret
   - Update `STRIPE_WEBHOOK_SECRET` in Supabase secrets

**Currently configured for:** Test mode (safe for development)

---

## 📧 Resend Email Configuration

Your Resend API is already configured!

### Verify Domain (for production):

1. Go to [Resend Dashboard → Domains](https://resend.com/domains)
2. Add your domain (e.g., filmlot360.com)
3. Add DNS records as instructed
4. Wait for verification (usually 5-10 minutes)

### Update Email Templates:

Your email templates are in `/supabase/functions/server/email.tsx`. Update the `from` field:

```typescript
from: 'FilmLot360 <noreply@filmlot360.com>'  // Use your verified domain
```

**Current status:** ✅ Configured with Resend API key

---

## 🌐 Custom Domain Setup (Optional)

### For Vercel:

1. Go to Project Settings → Domains
2. Add your domain (e.g., filmlot360.com)
3. Follow DNS configuration instructions:
   - Type: `A` Record
   - Name: `@`
   - Value: `76.76.21.21`
   
   For www subdomain:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
4. SSL certificate is automatic (takes ~5 minutes)

### For Netlify:

1. Site Settings → Domain Management
2. Add custom domain
3. Update your DNS records as instructed:
   - Type: `A` Record
   - Name: `@`
   - Value: (provided by Netlify)
   
   For www subdomain:
   - Type: `CNAME`
   - Name: `www`
   - Value: (provided by Netlify)
4. SSL certificate is automatic

### After Adding Custom Domain:

Update these configurations:

1. **Supabase Site URL** → Use custom domain
2. **Google OAuth redirect URIs** → Add custom domain
3. **Stripe webhook endpoint** → Update if needed
4. **Environment variable `VITE_APP_URL`** → Update to custom domain and redeploy

---

## ✅ Post-Deployment Checklist

### Core Functionality:
- [ ] Site loads correctly at production URL
- [ ] All routes work (test navigation)
- [ ] All images load properly
- [ ] Mobile responsive design works
- [ ] Console shows no errors

### Authentication:
- [ ] Sign up flow works
- [ ] Email verification email is received
- [ ] Email verification link redirects properly
- [ ] Sign in flow works
- [ ] Sign out works
- [ ] Google Sign-In works (if configured)

### Dashboard:
- [ ] Dashboard loads after login
- [ ] All dashboard pages accessible
- [ ] Projects dropdown works
- [ ] Calendar loads
- [ ] Actors/Crew management works
- [ ] Profile image upload works
- [ ] Document upload works

### Payments (Stripe):
- [ ] Pricing page displays correctly
- [ ] Checkout flow initiates
- [ ] Stripe checkout page loads
- [ ] Test payment completes (use test card: 4242 4242 4242 4242)
- [ ] Subscription activates in dashboard
- [ ] Subscription status updates

### Emails:
- [ ] Verification emails send
- [ ] Calendar invitation emails send
- [ ] Email templates look correct
- [ ] Unsubscribe links work

### API Integration:
- [ ] FilmLot360 API connects
- [ ] Projects load from API
- [ ] Actors/crew data loads
- [ ] Create/edit operations work

---

## 🔍 Testing Your Deployment

### 1. Test Authentication Flow:

**Email/Password:**
```
1. Go to /sign-up
2. Create account with test email
3. Check inbox for verification email
4. Click verification link
5. Redirects to dashboard ✅
6. Sign out
7. Sign in again with same credentials ✅
```

**Google OAuth:**
```
1. Go to /sign-in
2. Click "Sign in with Google"
3. Select Google account
4. Should redirect to dashboard ✅
```

### 2. Test Subscription Flow:

```
1. Go to /pricing or /subscription
2. Select a plan
3. Click "Get Started" or "Subscribe"
4. Checkout page loads ✅
5. Use Stripe test card: 4242 4242 4242 4242
6. Complete payment
7. Redirects to success page
8. Check dashboard subscription status ✅
```

### 3. Test Dashboard Features:

```
1. Navigate to /dashboard
2. Click "Projects" dropdown ✅
3. Select a project
4. Go to Calendar
5. Click a date to create event ✅
6. Go to Actors page
7. Upload headshot ✅
8. Go to Documents page
9. Upload a file ✅
```

### 4. Test Email System:

```
1. Create a calendar event
2. Add attendees
3. Check email inbox for invitations ✅
```

---

## 🐛 Common Issues & Solutions

### Issue: "Page not found" on routes
**Solution:** The `vercel.json` or `netlify.toml` files handle this. Make sure they're included in your deployment.

### Issue: Blank page or console errors
**Solution:** 
1. Open browser console (F12)
2. Check for errors
3. Usually caused by missing environment variables
4. Verify all `VITE_*` variables are set in Vercel/Netlify

### Issue: API calls failing
**Solution:** 
1. Check environment variables are set correctly
2. Verify Supabase edge function is deployed
3. Check browser Network tab for error details
4. Verify CORS settings in backend (already configured)

### Issue: Authentication redirects fail
**Solution:**
1. Update Supabase Site URL to production domain
2. Add production URLs to redirect whitelist
3. Clear browser cookies and try again

### Issue: Google Sign-In doesn't work
**Solution:**
1. Add production domain to Google Console authorized origins
2. Add Supabase callback URL to Google Console redirect URIs
3. Wait 5-10 minutes for Google to propagate changes

### Issue: Stripe checkout fails
**Solution:**
1. Verify Stripe price IDs are correct
2. Check that `STRIPE_SECRET_KEY` is set in Supabase
3. Ensure using test mode for development
4. Check Stripe Dashboard logs for errors

### Issue: Emails not sending
**Solution:**
1. Verify `RESEND_API_KEY` is set in Supabase secrets
2. Check Resend dashboard for rate limits
3. Verify sender email domain is verified
4. Check Supabase Edge Function logs for errors

### Issue: Images not loading
**Solution:** 
1. Unsplash images should work automatically
2. Check browser console for CORS errors
3. Verify image URLs are accessible

### Issue: FilmLot360 API not connecting
**Solution:**
1. Check API credentials in dashboard
2. Verify API endpoint is accessible
3. Check browser Network tab for 401/403 errors
4. Review API documentation

---

## 📊 Monitoring & Analytics

### Built-in Monitoring:

**Vercel:**
- Analytics: Built-in (enable in project settings)
- Logs: Deployment and runtime logs
- Speed Insights: Performance monitoring

**Netlify:**
- Analytics: Available with paid plans
- Logs: Build and function logs
- Speed monitoring

**Supabase:**
- Dashboard: Real-time database stats
- Auth logs: User sign-ups and logins
- Edge Function logs: Backend errors and requests
- Storage usage: File upload tracking

### Add External Analytics (Optional):

**Analytics Options:**
- Google Analytics 4
- Plausible Analytics (privacy-friendly)
- Fathom Analytics
- PostHog (product analytics)

**Error Tracking:**
- Sentry (recommended)
- LogRocket
- Bugsnag
- Rollbar

**How to Add Sentry:**
```bash
npm install @sentry/react @sentry/vite-plugin
```

Then update `main.tsx` and `vite.config.ts` (see Sentry docs)

---

## 🔄 Making Updates After Deployment

### Continuous Deployment with Git:

**Vercel:**
1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository in Vercel
3. Auto-deploys on every push to main branch
4. Preview deployments for pull requests

**Netlify:**
1. Push code to Git provider
2. Connect repository in Netlify
3. Auto-deploys on push
4. Deploy previews for branches

### Manual Updates:

1. Download updated code from Figma Make
2. Make changes locally
3. Test: `npm run build && npm run preview`
4. Deploy:
   - **Vercel:** `vercel deploy --prod` (requires Vercel CLI)
   - **Netlify:** Drag/drop new `dist` folder or use Netlify CLI

---

## 🔒 Security Checklist

Before going live, verify:

- [ ] All environment variables are set correctly
- [ ] Service role keys are ONLY in Supabase (never frontend)
- [ ] Stripe webhook secret is configured
- [ ] Production Stripe keys replace test keys
- [ ] Google OAuth redirect URIs include only your domains
- [ ] Supabase redirect URLs whitelist only your domains
- [ ] Email domain is verified in Resend
- [ ] HTTPS is enabled (automatic with Vercel/Netlify)
- [ ] Security headers are configured (already in vercel.json/netlify.toml)
- [ ] `.env.local` is in `.gitignore` (already done)
- [ ] No secrets are committed to Git

---

## 💡 Next Steps After Deployment

### Immediate:

1. **Test everything thoroughly** using the checklist above
2. **Set up monitoring** (analytics + error tracking)
3. **Configure custom domain** (if you have one)
4. **Update branding** (favicon, meta tags, Open Graph images)

### Short-term:

1. **Switch to Stripe live mode** when ready for real payments
2. **Verify custom email domain** in Resend
3. **Set up backup strategy** for Supabase data
4. **Create user documentation** or help center content
5. **Set up customer support** (email, chat, etc.)

### Long-term:

1. **Monitor usage and costs:**
   - Supabase: Database size, API requests, file storage
   - Vercel/Netlify: Bandwidth, build minutes
   - Stripe: Transaction fees
   - Resend: Email sending limits

2. **Optimize performance:**
   - Add CDN for static assets
   - Implement code splitting
   - Optimize images
   - Add caching strategies

3. **Scale infrastructure:**
   - Upgrade Supabase plan if needed
   - Add database indexes
   - Implement rate limiting
   - Add load balancing

---

## 📞 Support & Documentation

### Platform Documentation:

- **Vercel:** https://vercel.com/docs
- **Netlify:** https://docs.netlify.com
- **Supabase:** https://supabase.com/docs
- **Stripe:** https://stripe.com/docs
- **Resend:** https://resend.com/docs
- **Google OAuth:** https://developers.google.com/identity/protocols/oauth2

### FilmLot360 Documentation:

- **Environment Variables:** See `ENVIRONMENT_VARIABLES.md`
- **API Integration:** See `/pages/ApiDocs.tsx`
- **Email Templates:** See `/supabase/functions/server/email.tsx`

### Get Help:

- **Vercel Discord:** https://vercel.com/discord
- **Supabase Discord:** https://discord.supabase.com
- **Stripe Support:** https://support.stripe.com

---

## 🎉 You're Ready to Deploy!

Your FilmLot360 application is production-ready with:

✅ Complete authentication (email + Google OAuth)
✅ Subscription management with Stripe
✅ Email system with Resend
✅ File storage for headshots and documents
✅ Calendar with email invitations
✅ Full CRUD operations for actors, crew, and projects
✅ Comprehensive dashboard
✅ Security headers and best practices
✅ Mobile-responsive design

**Estimated Time to Deploy:** 15-30 minutes
**Cost:** 
- Frontend: $0 (Free tier on Vercel/Netlify)
- Backend: $0 (Supabase free tier includes Edge Functions)
- Stripe: 2.9% + 30¢ per transaction (no monthly fee)
- Resend: Free tier (100 emails/day)

**Total Monthly Cost to Start:** $0 (pay only for transactions)

---

**Ready to deploy?** Follow the platform-specific instructions above and you'll be live in minutes!

**Last Updated:** December 2024  
**FilmLot360 Version:** 1.0