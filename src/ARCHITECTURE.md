# 🏗️ FilmLot360 Architecture Overview

This document explains how FilmLot360 is architected and how all the pieces work together.

---

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                           │
│                     (React SPA Frontend)                         │
│                                                                   │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐   │
│  │   Landing   │  │  Dashboard   │  │  Pricing/Checkout   │   │
│  │    Pages    │  │    Pages     │  │      Pages          │   │
│  └─────────────┘  └──────────────┘  └─────────────────────┘   │
│                                                                   │
│  Environment Variables (VITE_*):                                │
│  • VITE_SUPABASE_URL                                            │
│  • VITE_SUPABASE_ANON_KEY                                       │
│  • VITE_APP_URL                                                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTPS
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌─────────────────┐   ┌──────────────┐
│   Vercel/    │   │    Supabase     │   │    Stripe    │
│   Netlify    │   │   Platform      │   │   Checkout   │
│              │   │                 │   │              │
│ ┌──────────┐ │   │ ┌─────────────┐ │   │ ┌──────────┐ │
│ │ Frontend │ │   │ │ Auth System │ │   │ │ Payment  │ │
│ │  Static  │ │   │ │ • Email/pwd │ │   │ │Processing│ │
│ │  Files   │ │   │ │ • Google    │ │   │ │          │ │
│ │ (React)  │ │   │ │   OAuth     │ │   │ │ Webhooks │ │
│ └──────────┘ │   │ └─────────────┘ │   │ └──────────┘ │
│              │   │                 │   │              │
│ CDN + SSL    │   │ ┌─────────────┐ │   └──────────────┘
│ Automatic    │   │ │  Database   │ │
│              │   │ │ PostgreSQL  │ │
└──────────────┘   │ │ • kv_store  │ │
                   │ └─────────────┘ │
                   │                 │
                   │ ┌─────────────┐ │
                   │ │  Storage    │ │
                   │ │ • Headshots │ │
                   │ │ • Documents │ │
                   │ └─────────────┘ │
                   │                 │
                   │ ┌─────────────┐ │
                   │ │Edge Function│ │
                   │ │   (Hono)    │ │
                   │ │             │ │
                   │ │ Backend API │ │
                   │ └──────┬──────┘ │
                   │        │        │
                   └────────┼────────┘
                            │
                            │ Server-to-Server
                            │
                ┌───────────┼───────────┐
                │           │           │
                ▼           ▼           ▼
        ┌─────────────┐ ┌──────────┐ ┌─────────────┐
        │   Resend    │ │  Google  │ │  FilmLot360 │
        │   Email     │ │  OAuth   │ │     API     │
        │   Service   │ │  Server  │ │             │
        └─────────────┘ └──────────┘ └─────────────┘
```

---

## 🔄 Request Flow Examples

### 1. User Signup Flow

```
User Browser
    │
    │ 1. Fill signup form
    ▼
React App (Frontend)
    │
    │ 2. Call Supabase.auth.signUp()
    ▼
Supabase Auth API
    │
    │ 3. Create user account
    │ 4. Send verification email via Resend
    ▼
User's Email
    │
    │ 5. Click verification link
    ▼
Supabase Auth API
    │
    │ 6. Verify email token
    │ 7. Redirect to dashboard
    ▼
React App (Dashboard)
```

### 2. Stripe Checkout Flow

```
User Browser
    │
    │ 1. Click "Subscribe" on pricing page
    ▼
React App
    │
    │ 2. POST to /create-checkout-session
    ▼
Supabase Edge Function (Backend)
    │
    │ 3. Create Stripe checkout session
    │    (using STRIPE_SECRET_KEY)
    ▼
Stripe API
    │
    │ 4. Return checkout URL
    ▼
React App
    │
    │ 5. Redirect user to Stripe checkout
    ▼
Stripe Checkout Page
    │
    │ 6. User completes payment
    ▼
Stripe Webhook
    │
    │ 7. POST to /stripe-webhook
    ▼
Supabase Edge Function
    │
    │ 8. Verify webhook signature
    │ 9. Update subscription in database
    ▼
Database (kv_store)
    │
    │ 10. User has active subscription
    ▼
Dashboard shows "Pro" status
```

### 3. Calendar Event Creation with Email

```
User Browser (Dashboard)
    │
    │ 1. Create calendar event
    │ 2. Add attendees
    │ 3. Click "Send Invites"
    ▼
React App
    │
    │ 4. POST to /send-event-email
    ▼
Supabase Edge Function
    │
    │ 5. Prepare email template
    │ 6. Call Resend API
    │    (using RESEND_API_KEY)
    ▼
Resend Email Service
    │
    │ 7. Send emails to attendees
    ▼
Attendees' Email Inboxes
```

### 4. FilmLot360 API Integration

```
Dashboard (Projects Page)
    │
    │ 1. Load projects
    ▼
React App
    │
    │ 2. GET /api/projects
    ▼
Supabase Edge Function
    │
    │ 3. Forward request to FilmLot360 API
    │    (with authentication)
    ▼
FilmLot360 External API
    │
    │ 4. Return projects data
    ▼
Supabase Edge Function
    │
    │ 5. Format response
    ▼
React App
    │
    │ 6. Display projects in UI
    ▼
User sees projects list
```

---

## 🗄️ Data Storage

### Supabase Database (PostgreSQL)

**Table: `kv_store_b0eae7ae`**
- Used as a key-value store
- Stores: user data, subscriptions, settings, preferences
- Accessed via: `/supabase/functions/server/kv_store.tsx`

**Operations:**
- `get(key)` - Get single value
- `set(key, value)` - Store value
- `mget(keys)` - Get multiple values
- `getByPrefix(prefix)` - Get all keys matching prefix
- `del(key)` - Delete value

### Supabase Storage

**Buckets:**
- `make-b0eae7ae-headshots` - Actor headshots
- `make-b0eae7ae-crew-photos` - Crew photos
- `make-b0eae7ae-documents` - Uploaded documents

**Features:**
- Private buckets (authenticated access only)
- Signed URLs for secure access
- Automatic image optimization

---

## 🔐 Authentication Flow

### Email/Password Authentication

```
┌─────────────────────────────────────────────────────────┐
│                    Supabase Auth                         │
│                                                           │
│  User Registration                                       │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐          │
│  │  Signup  │───▶│ Verify   │───▶│ Dashboard│          │
│  │  Form    │    │  Email   │    │  Access  │          │
│  └──────────┘    └──────────┘    └──────────┘          │
│                         │                                │
│                         ▼                                │
│                  ┌──────────────┐                        │
│                  │ Resend Email │                        │
│                  │   Service    │                        │
│                  └──────────────┘                        │
│                                                           │
│  User Login                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐          │
│  │  Login   │───▶│  Verify  │───▶│ Create   │          │
│  │  Form    │    │  Creds   │    │ Session  │          │
│  └──────────┘    └──────────┘    └──────────┘          │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Google OAuth Authentication

```
User clicks "Sign in with Google"
    │
    ▼
Supabase redirects to Google
    │
    ▼
User authenticates with Google
    │
    ▼
Google redirects back to Supabase callback
    │
    ▼
Supabase creates/updates user
    │
    ▼
Redirects to dashboard with session token
```

---

## 💳 Payment Processing Architecture

### Subscription Management

```
┌─────────────────────────────────────────────────────┐
│                  Stripe Platform                     │
│                                                       │
│  ┌──────────────┐    ┌──────────────┐              │
│  │  Products    │    │   Prices     │              │
│  │              │    │              │              │
│  │ • Starter    │───▶│ • Monthly    │              │
│  │ • Pro        │    │ • Yearly     │              │
│  │ • Studio     │    │              │              │
│  │ • Growth     │    │              │              │
│  └──────────────┘    └──────────────┘              │
│         │                    │                       │
│         └────────┬───────────┘                       │
│                  ▼                                    │
│         ┌──────────────┐                             │
│         │   Checkout   │                             │
│         │   Sessions   │                             │
│         └──────────────┘                             │
│                  │                                    │
│                  ▼                                    │
│         ┌──────────────┐                             │
│         │   Webhooks   │                             │
│         │              │                             │
│         │ • session    │                             │
│         │   completed  │                             │
│         │ • subscription                             │
│         │   updated    │                             │
│         └──────────────┘                             │
│                  │                                    │
└──────────────────┼────────────────────────────────────┘
                   │
                   ▼
        Supabase Edge Function
                   │
                   ▼
        Update subscription in DB
```

---

## 📧 Email System Architecture

### Email Templates & Sending

```
┌──────────────────────────────────────────────────┐
│          Email Trigger Events                     │
│                                                    │
│  • User signup (verification)                    │
│  • Calendar event invitation                     │
│  • Password reset                                │
│  • Subscription updates                          │
└───────────────────┬──────────────────────────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │  Edge Function       │
        │  email.tsx           │
        │                      │
        │  • Load template     │
        │  • Insert data       │
        │  • Format HTML       │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │    Resend API        │
        │                      │
        │  • Validate          │
        │  • Send email        │
        │  • Track delivery    │
        └──────────┬───────────┘
                   │
                   ▼
           Recipient's Inbox
```

---

## 🌐 Frontend Architecture

### React Application Structure

```
/
├── App.tsx (Main router)
│
├── /pages
│   ├── Landing pages
│   │   ├── Home.tsx
│   │   ├── Pricing.tsx
│   │   ├── Features.tsx
│   │   └── ...
│   │
│   ├── Auth pages
│   │   ├── SignUp.tsx
│   │   ├── SignIn.tsx
│   │   └── VerifyEmail.tsx
│   │
│   ├── Dashboard pages
│   │   ├── Dashboard.tsx
│   │   ├── DashboardProjects.tsx
│   │   ├── DashboardActors.tsx
│   │   ├── DashboardCrew.tsx
│   │   ├── DashboardCalendar.tsx
│   │   └── ...
│   │
│   └── Production pages
│       ├── FeatureFilms.tsx
│       ├── TvSeries.tsx
│       └── ...
│
├── /components
│   ├── Shared components
│   ├── UI components
│   └── Layout components
│
├── /utils
│   ├── supabase/client.tsx
│   ├── filmlot-api.ts
│   ├── subscription.ts
│   └── api.ts
│
└── /styles
    └── globals.css
```

---

## 🔧 Backend Architecture

### Supabase Edge Function (Hono Server)

```
/supabase/functions/server/
│
├── index.tsx (Main server file)
│   │
│   ├── Routes
│   │   ├── /make-server-b0eae7ae/health
│   │   ├── /make-server-b0eae7ae/projects
│   │   ├── /make-server-b0eae7ae/actors
│   │   ├── /make-server-b0eae7ae/crew
│   │   ├── /make-server-b0eae7ae/create-checkout-session
│   │   ├── /make-server-b0eae7ae/stripe-webhook
│   │   ├── /make-server-b0eae7ae/send-event-email
│   │   └── ...
│   │
│   └── Middleware
│       ├── CORS
│       ├── Logger
│       └── Auth verification
│
├── kv_store.tsx (Database utilities)
├── email.tsx (Email templates)
└── import.tsx (Import utilities)
```

---

## 🔒 Security Architecture

### Authentication & Authorization

```
┌────────────────────────────────────────────────┐
│            Request Security Flow                │
│                                                  │
│  Browser Request                                │
│       │                                          │
│       │ 1. Include session token                │
│       ▼                                          │
│  Edge Function                                  │
│       │                                          │
│       │ 2. Verify token with Supabase           │
│       ▼                                          │
│  Supabase Auth                                  │
│       │                                          │
│       │ 3. Return user ID if valid              │
│       ▼                                          │
│  Edge Function                                  │
│       │                                          │
│       │ 4. Check user permissions               │
│       │ 5. Execute request                      │
│       ▼                                          │
│  Response                                       │
└────────────────────────────────────────────────┘
```

### Environment Security

**Frontend (Public):**
- Only `VITE_*` variables
- Supabase anonymous key (safe for public)
- App URL

**Backend (Private - Supabase Secrets):**
- Supabase service role key
- Stripe secret keys
- Google OAuth client secret
- Resend API key
- All price IDs

---

## 📊 Monitoring & Logging

### What Gets Logged

```
┌──────────────────────────────────────────┐
│         Supabase Dashboard                │
│                                            │
│  Auth Logs                                │
│  • User signups                           │
│  • Login attempts                         │
│  • OAuth flows                            │
│                                            │
│  Edge Function Logs                       │
│  • API requests                           │
│  • Errors                                 │
│  • Performance metrics                    │
│                                            │
│  Database Logs                            │
│  • Query performance                      │
│  • Connection stats                       │
│                                            │
│  Storage Logs                             │
│  • File uploads                           │
│  • Access patterns                        │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│      Vercel/Netlify Dashboard             │
│                                            │
│  • Build logs                             │
│  • Deployment history                     │
│  • Analytics (traffic, performance)       │
│  • Error tracking                         │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│         Stripe Dashboard                  │
│                                            │
│  • Payments                               │
│  • Subscriptions                          │
│  • Webhooks                               │
│  • Customer data                          │
└──────────────────────────────────────────┘
```

---

## 🚀 Deployment Architecture

### Development vs Production

```
┌─────────────────────────────────────────────────┐
│            Development (Local)                   │
│                                                   │
│  localhost:5173                                  │
│       │                                           │
│       ├─ Frontend: Vite dev server               │
│       └─ Backend: Supabase (production instance) │
│                                                   │
│  Environment: .env.local                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              Production                          │
│                                                   │
│  your-domain.com                                 │
│       │                                           │
│       ├─ Frontend: Vercel/Netlify CDN            │
│       ├─ Backend: Supabase Edge Functions        │
│       ├─ Auth: Supabase Auth                     │
│       ├─ Database: Supabase PostgreSQL           │
│       ├─ Storage: Supabase Storage               │
│       ├─ Payments: Stripe                        │
│       └─ Email: Resend                           │
│                                                   │
│  Environment: Platform environment variables     │
└─────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Summary

### Complete User Journey

```
1. User visits website
   └─▶ Vercel/Netlify serves React app

2. User signs up
   └─▶ Supabase creates account
       └─▶ Resend sends verification email

3. User verifies email
   └─▶ Supabase confirms account
       └─▶ Redirects to dashboard

4. User subscribes to plan
   └─▶ Edge function creates Stripe checkout
       └─▶ User pays on Stripe
           └─▶ Stripe webhook notifies backend
               └─▶ Edge function updates subscription in database

5. User creates project
   └─▶ Edge function saves to kv_store
       └─▶ Also syncs with FilmLot360 API

6. User uploads headshot
   └─▶ Supabase Storage saves file
       └─▶ Returns signed URL
           └─▶ URL stored in database

7. User creates calendar event
   └─▶ Edge function saves event
       └─▶ Resend sends invitation emails

8. User accesses data
   └─▶ Edge function checks auth
       └─▶ Fetches from database
           └─▶ Returns to frontend
```

---

## 📈 Scalability Considerations

### Current Architecture Supports:

- **Users:** Unlimited (Supabase scales automatically)
- **Concurrent requests:** 500K/month on free tier
- **Database:** 500MB on free tier (upgradeable)
- **File storage:** 1GB on free tier (upgradeable)
- **Bandwidth:** 100GB/month on Vercel/Netlify free tier

### When to Scale:

**Upgrade Supabase ($25/month):**
- >500MB database
- >500K edge function calls
- >1GB file storage
- Need better support

**Upgrade Vercel/Netlify ($20/month):**
- >100GB bandwidth
- Need team features
- Want better analytics

**Upgrade Resend ($20/month):**
- >3,000 emails/month
- Need better deliverability

---

## 🎯 Key Takeaways

1. **Three-tier architecture:** Frontend → Backend → Services
2. **Frontend is static:** Fast, CDN-delivered React app
3. **Backend is serverless:** Scales automatically, pay per use
4. **Auth is handled:** Supabase manages all authentication
5. **Payments are secure:** Stripe handles all PCI compliance
6. **Emails are reliable:** Resend ensures delivery
7. **Data is portable:** Standard PostgreSQL database
8. **Deployment is simple:** Push to deploy, auto-scaling

---

**Understanding this architecture helps you:**
- Debug issues more effectively
- Make informed scaling decisions
- Understand cost implications
- Plan new features
- Optimize performance

---

**Last Updated:** December 2024  
**FilmLot360 Version:** 1.0
