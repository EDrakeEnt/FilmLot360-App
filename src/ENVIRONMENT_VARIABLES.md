# 🔐 FilmLot360 Environment Variables Documentation

This document provides a complete guide to all environment variables used in the FilmLot360 application.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Frontend Variables](#frontend-variables)
3. [Backend Variables](#backend-variables)
4. [How to Configure](#how-to-configure)
5. [Variable Reference](#variable-reference)
6. [Security Best Practices](#security-best-practices)

---

## Overview

FilmLot360 uses environment variables to configure:
- ✅ Supabase authentication & database
- ✅ Google OAuth social login
- ✅ Stripe payment processing
- ✅ Resend email service
- ✅ Production URL configuration

### Two Types of Variables:

**Frontend Variables** (`VITE_*` prefix)
- Exposed to the browser
- Safe for public keys only
- Configured in Vercel/Netlify

**Backend Variables** (No prefix)
- Server-side only
- For secret keys and sensitive data
- Configured in Supabase Edge Functions

---

## Frontend Variables

These are exposed to the browser and bundled into your app. Only use for public/anon keys.

### Required for All Deployments:

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Public anonymous key (safe for frontend) | Same location as above |

### Optional (Production URLs):

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_APP_URL` | Your production frontend URL | `https://filmlot360.com` |
| `VITE_API_URL` | Full URL to your backend API | `https://PROJECT.supabase.co/functions/v1/make-server-b0eae7ae` |

---

## Backend Variables

These stay on the server and should NEVER be exposed to the frontend.

### Supabase Configuration:

| Variable | Description | Security Level | Where to Get |
|----------|-------------|----------------|--------------|
| `SUPABASE_URL` | Supabase project URL | 🟡 Moderate | Supabase Dashboard → Settings → API |
| `SUPABASE_ANON_KEY` | Anonymous key | 🟡 Moderate | Same as above |
| `SUPABASE_SERVICE_ROLE_KEY` | **CRITICAL** Service role key with admin access | 🔴 SECRET | Same as above - NEVER expose! |
| `SUPABASE_DB_URL` | PostgreSQL database connection string | 🔴 SECRET | Supabase Dashboard → Database Settings |

### Google OAuth (Social Login):

| Variable | Description | Security Level | Where to Get |
|----------|-------------|----------------|--------------|
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | 🟢 Public | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | 🔴 SECRET | Same as above |

**Setup Guide:** https://supabase.com/docs/guides/auth/social-login/auth-google

### Stripe Payment Processing:

| Variable | Description | Security Level | Where to Get |
|----------|-------------|----------------|--------------|
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_test_ or sk_live_) | 🔴 SECRET | [Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | 🔴 SECRET | Stripe Dashboard → Webhooks |

**Price IDs (one per plan/billing cycle):**

| Variable | Description |
|----------|-------------|
| `STRIPE_STARTER_MONTHLY_PRICE_ID` | Starter plan monthly price ID |
| `STRIPE_STARTER_YEARLY_PRICE_ID` | Starter plan yearly price ID |
| `STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID` | Professional plan monthly price ID |
| `STRIPE_PROFESSIONAL_YEARLY_PRICE_ID` | Professional plan yearly price ID |
| `STRIPE_STUDIO_MONTHLY_PRICE_ID` | Studio plan monthly price ID |
| `STRIPE_STUDIO_YEARLY_PRICE_ID` | Studio plan yearly price ID |
| `STRIPE_GROWTH_MONTHLY_PRICE_ID` | Growth plan monthly price ID |
| `STRIPE_GROWTH_YEARLY_PRICE_ID` | Growth plan yearly price ID |

Create products and prices at: https://dashboard.stripe.com/products

### Resend Email Service:

| Variable | Description | Security Level | Where to Get |
|----------|-------------|----------------|--------------|
| `RESEND_API_KEY` | Resend API key for sending emails | 🔴 SECRET | [Resend Dashboard](https://resend.com/api-keys) |

---

## How to Configure

### For Local Development:

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your values** in `.env.local`

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

4. ✅ `.env.local` is already gitignored for security

---

### For Vercel Deployment:

**Frontend Variables:**

1. Go to your Vercel project
2. Navigate to **Settings → Environment Variables**
3. Add the following:

```
VITE_SUPABASE_URL = https://kqvhqzuzvgobbtslqesv.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_APP_URL = https://your-domain.vercel.app
```

4. Select environment: **Production**, **Preview**, and **Development**
5. Click **Save**

**Backend Variables:**

Backend secrets are NOT configured in Vercel. They're configured in Supabase (see below).

---

### For Netlify Deployment:

**Frontend Variables:**

1. Go to your Netlify site
2. Navigate to **Site Settings → Environment Variables**
3. Add the following:

```
VITE_SUPABASE_URL = https://kqvhqzuzvgobbtslqesv.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_APP_URL = https://your-domain.netlify.app
```

4. Click **Save**

**Backend Variables:**

Backend secrets are NOT configured in Netlify. They're configured in Supabase (see below).

---

### For Supabase Edge Functions (Backend):

Your backend runs on Supabase Edge Functions. Configure backend secrets there:

1. **Go to Supabase Dashboard:**
   - Navigate to: https://supabase.com/dashboard/project/kqvhqzuzvgobbtslqesv/settings/functions

2. **Click "Manage secrets"** or "Add secret"

3. **Add each backend secret:**

   Example secrets to add:

   | Secret Name | Example Value |
   |-------------|---------------|
   | `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
   | `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` |
   | `STRIPE_WEBHOOK_SECRET` | `whsec_...` |
   | `RESEND_API_KEY` | `re_...` |
   | `GOOGLE_CLIENT_SECRET` | `GOCSPX-...` |
   | And all Stripe Price IDs |

4. **Click Save**

5. **Redeploy your edge function** (if already deployed):
   ```bash
   supabase functions deploy make-server-b0eae7ae
   ```

---

## Variable Reference

### Current Configuration Status:

Based on your existing setup, you have already configured:

✅ `SUPABASE_URL`
✅ `SUPABASE_ANON_KEY`
✅ `SUPABASE_SERVICE_ROLE_KEY`
✅ `SUPABASE_DB_URL`
✅ `GOOGLE_CLIENT_SECRET`
✅ `GOOGLE_CLIENT_ID`
✅ `STRIPE_SECRET_KEY`
✅ `STRIPE_WEBHOOK_SECRET`
✅ `STRIPE_STARTER_MONTHLY_PRICE_ID`
✅ `STRIPE_STARTER_YEARLY_PRICE_ID`
✅ `STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID`
✅ `STRIPE_PROFESSIONAL_YEARLY_PRICE_ID`
✅ `STRIPE_STUDIO_MONTHLY_PRICE_ID`
✅ `STRIPE_STUDIO_YEARLY_PRICE_ID`
✅ `STRIPE_GROWTH_MONTHLY_PRICE_ID`
✅ `STRIPE_GROWTH_YEARLY_PRICE_ID`
✅ `RESEND_API_KEY`

### What You Need to Add for Deployment:

**In Vercel/Netlify (Frontend):**
- ✅ `VITE_SUPABASE_URL`
- ✅ `VITE_SUPABASE_ANON_KEY`
- 🔶 `VITE_APP_URL` (optional but recommended)

**In Supabase Edge Functions:**
- ✅ All backend secrets are already configured in your Supabase project

---

## Security Best Practices

### ✅ DO:

- ✅ Use `VITE_` prefix for frontend-safe variables
- ✅ Keep service role keys and secret keys backend-only
- ✅ Use `.env.local` for local development (it's gitignored)
- ✅ Use test keys (sk_test_, pk_test_) during development
- ✅ Rotate keys if they're ever exposed
- ✅ Use environment-specific variables (dev/staging/prod)

### ❌ DON'T:

- ❌ Never commit `.env` or `.env.local` to Git
- ❌ Never expose `SUPABASE_SERVICE_ROLE_KEY` to frontend
- ❌ Never expose Stripe secret keys to frontend
- ❌ Never hardcode secrets in your code
- ❌ Never share secrets in screenshots or support tickets
- ❌ Never use production keys in development

---

## Testing Your Configuration

### Frontend Variables Test:

```javascript
// In browser console
console.log(import.meta.env.VITE_SUPABASE_URL);
// Should output your Supabase URL
```

### Backend Variables Test:

Backend variables are tested through API calls. Check the Supabase Edge Function logs:

1. Go to: https://supabase.com/dashboard/project/kqvhqzuzvgobbtslqesv/logs/edge-functions
2. Trigger an API call (e.g., sign up, create project)
3. Check logs for errors related to missing environment variables

---

## Troubleshooting

### Issue: "Cannot read environment variable"

**Solution:** 
1. Check spelling and prefix (`VITE_` for frontend)
2. Restart dev server after changing `.env.local`
3. Clear build cache: `rm -rf dist node_modules/.vite`

### Issue: Backend API returns "Unauthorized"

**Solution:**
1. Verify `SUPABASE_SERVICE_ROLE_KEY` is set in Supabase secrets
2. Check that the key is correct (copy/paste from Supabase dashboard)
3. Redeploy edge function

### Issue: Stripe payments not working

**Solution:**
1. Verify all Stripe price IDs are correct
2. Check that `STRIPE_SECRET_KEY` is set in Supabase secrets
3. Ensure using correct keys (test vs live)
4. Check Stripe webhook secret is configured

### Issue: Emails not sending

**Solution:**
1. Verify `RESEND_API_KEY` is set in Supabase secrets
2. Check Resend dashboard for API limits
3. Verify sender email is verified in Resend

---

## Quick Reference: Where to Add Variables

| Variable Type | Add in Vercel/Netlify | Add in Supabase |
|---------------|----------------------|-----------------|
| `VITE_*` (Frontend) | ✅ Yes | ❌ No |
| Backend Secrets | ❌ No | ✅ Yes |
| Public Keys | ✅ Yes (with VITE_ prefix) | ❌ No |
| Secret Keys | ❌ No | ✅ Yes |

---

## 📞 Need Help?

- **Supabase Environment Variables:** https://supabase.com/docs/guides/functions/secrets
- **Vercel Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables
- **Netlify Environment Variables:** https://docs.netlify.com/environment-variables/overview/
- **Vite Environment Variables:** https://vitejs.dev/guide/env-and-mode.html

---

**Last Updated:** December 2024
**FilmLot360 Version:** 1.0
