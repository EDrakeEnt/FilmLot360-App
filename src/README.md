# FilmLot360 - Film Production Management CRM

A comprehensive web application for film production management, featuring project tracking, crew management, budgeting, scheduling, payments, and email communications.

---

## 🎬 About

FilmLot360 is a modern CRM system designed specifically for film production teams. Built with React, TypeScript, Tailwind CSS, and powered by Supabase with full Stripe integration, Google OAuth, and Resend email service.

---

## ✨ Features

### Core Application:
- **🎯 Landing Page** - Modern marketing site with hero, features, pricing, testimonials
- **🔐 Authentication** - Complete sign up/sign in flow with email verification + Google OAuth
- **📊 Dashboard** - Comprehensive back office for production management
- **💳 Subscription Management** - Tiered pricing plans with Stripe checkout and webhooks
- **📧 Email System** - Real-time email sending via Resend API with templates
- **📁 File Management** - Headshot and document upload with Supabase Storage
- **📅 Calendar** - Event creation with email invitations
- **🎬 Production Management** - Projects, actors, crew with FilmLot360 API integration

### Specialized Pages:
- **🎥 Use Cases** - Feature films, TV series, commercials, documentaries, indie films
- **📚 Resources** - Tutorials, case studies, API docs, help center, blog
- **🏢 Company** - About, careers, press kit, contact, partners
- **⚙️ Settings** - Profile management, subscription control, payment methods

---

## 🛠 Tech Stack

### Frontend:
- React 18 with TypeScript
- React Router for routing
- Tailwind CSS v4 for styling
- Lucide React for icons
- Recharts for analytics
- Custom UI component library

### Backend:
- Supabase (PostgreSQL database)
- Supabase Edge Functions (Hono server)
- Supabase Auth (email + Google OAuth)
- Supabase Storage (file uploads)

### Integrations:
- **Stripe** - Payment processing and subscriptions
- **Google OAuth** - Social login
- **Resend** - Transactional email service
- **FilmLot360 API** - External production data

### Deployment:
- Vercel or Netlify (frontend)
- Supabase (backend, already deployed)
- Custom domain support

---

## 📚 Documentation

### Start Here:
- **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)** - Overview of deployment options
- **[QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md)** - Deploy in 20 minutes

### Complete Guides:
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Comprehensive deployment guide
- **[ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)** - All environment variables explained
- **[PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)** - Pre-launch verification
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture overview
- **[DEPLOYMENT_FILES_README.md](./DEPLOYMENT_FILES_README.md)** - Documentation file guide

### Configuration:
- **[.env.example](./.env.example)** - Environment variable template

---

## 🚀 Quick Start

### Local Development:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Deploy to Production (20 minutes):

1. **Read:** [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md)
2. **Deploy:** to Vercel or Netlify
3. **Configure:** Environment variables
4. **Test:** Authentication and subscriptions
5. **Launch!** 🚀

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🔐 Environment Variables

### Frontend (Required for deployment):

```env
VITE_SUPABASE_URL=https://kqvhqzuzvgobbtslqesv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxdmhxenV6dmdvYmJ0c2xxZXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzODU4MzYsImV4cCI6MjA3OTk2MTgzNn0.jw0JIg0h3uhxf29M0JXKL_IF7tc2FuOJ9HoZdcNpXG8
VITE_APP_URL=https://your-domain.com (optional, recommended)
```

### Backend (Already configured in Supabase):

✅ All backend secrets are pre-configured:
- Supabase service role key
- Stripe secret keys and price IDs
- Google OAuth credentials
- Resend API key
- Database connection

See [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) for complete reference.

---

## 📁 Project Structure

```
/
├── App.tsx                      # Main app with routing
│
├── components/                  # Reusable UI components
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── DashboardLayout.tsx
│   └── ui/                      # UI component library
│
├── pages/                       # Page components
│   ├── Home.tsx                 # Landing page
│   ├── SignIn.tsx               # Authentication
│   ├── SignUp.tsx
│   ├── VerifyEmail.tsx
│   ├── Dashboard*.tsx           # Dashboard pages
│   ├── Pricing.tsx
│   ├── Subscription.tsx
│   ├── Checkout.tsx
│   ├── FeatureFilms.tsx         # Use case pages
│   ├── TvSeries.tsx
│   └── ...
│
├── supabase/functions/server/   # Backend API (Hono)
│   ├── index.tsx                # Main server file
│   ├── kv_store.tsx             # Database utilities
│   ├── email.tsx                # Email templates
│   └── import.tsx
│
├── utils/                       # Utility functions
│   ├── supabase/
│   │   ├── client.tsx           # Supabase client
│   │   └── info.tsx             # Project config
│   ├── filmlot-api.ts           # External API
│   ├── subscription.ts          # Subscription helpers
│   └── api.ts
│
├── styles/
│   └── globals.css              # Global styles & design tokens
│
├── vercel.json                  # Vercel config
├── netlify.toml                 # Netlify config
├── .env.example                 # Env var template
└── Documentation files          # See above
```

---

## 🎨 Design System

### Branding:
- **Primary:** Purple (#9333EA) to Pink (#EC4899) gradients
- **Secondary:** Blue/Cyan for TV series section
- **Background:** Dark theme with glassmorphic elements
- **Typography:** Custom type scale in globals.css

### Components:
- Consistent design tokens throughout
- Tailwind v4 CSS variables
- Mobile-first responsive design
- Accessible UI components

---

## 🔗 Key Routes

### Public Pages:
- `/` - Landing page
- `/features` - Product features
- `/pricing` - Pricing plans
- `/signup` - User registration
- `/signin` - User login
- `/verify-email` - Email verification

### Production Use Cases:
- `/feature-films` - Feature film production
- `/tv-series` - TV series production
- `/commercials` - Commercial production
- `/documentaries` - Documentary production
- `/independent-films` - Independent film production

### Dashboard (Protected):
- `/dashboard` - Main dashboard
- `/dashboard/projects` - Projects management
- `/dashboard/actors` - Actor management
- `/dashboard/crew` - Crew management
- `/dashboard/calendar` - Production calendar
- `/dashboard/emails` - Email management
- `/dashboard/documents` - Document library
- `/dashboard/invoices` - Invoice tracking
- `/dashboard/profile` - User profile
- `/dashboard/settings` - Account settings
- `/dashboard/subscription` - Subscription management

### Resources:
- `/tutorials` - Video tutorials
- `/help` - Help center
- `/api-docs` - API documentation
- `/case-studies` - Success stories
- `/blog` - Blog posts

### Company:
- `/about` - About us
- `/contact` - Contact form
- `/careers` - Job openings
- `/press-kit` - Press materials
- `/partners` - Partner program

---

## ✅ Production Ready Features

### Fully Implemented:
- ✅ Complete authentication (email + Google OAuth)
- ✅ Email verification workflow
- ✅ Subscription management with Stripe
- ✅ Real payment processing (test mode)
- ✅ Email system with Resend
- ✅ File upload (headshots, documents)
- ✅ Calendar with email invitations
- ✅ FilmLot360 API integration
- ✅ Projects, actors, crew CRUD operations
- ✅ Profile management
- ✅ Subscription tiers with feature access
- ✅ Security headers
- ✅ Mobile responsive design
- ✅ Error handling
- ✅ Loading states

### Backend (Supabase):
- ✅ Edge Functions deployed
- ✅ Database (kv_store) configured
- ✅ Storage buckets created
- ✅ All secrets configured
- ✅ CORS enabled
- ✅ Authentication enabled

### Integrations:
- ✅ Stripe (4 plans x 2 billing periods)
- ✅ Google OAuth (configured)
- ✅ Resend email (configured)
- ✅ FilmLot360 API (integrated)

---

## 💰 Cost Overview

### Free Tier (Great for starting):
- **Frontend:** $0 (Vercel/Netlify free tier)
- **Backend:** $0 (Supabase free tier)
- **Payments:** $0 monthly (2.9% + 30¢ per transaction)
- **Emails:** $0 for 3,000/month (Resend)

**Total Monthly Cost:** $0 to start

### Typical Production Cost:
- **Vercel/Netlify Pro:** $20/month (optional)
- **Supabase Pro:** $25/month (when scaling)
- **Resend Pro:** $20/month (if &gt;3,000 emails)

**Estimated:** $50-100/month for a small production company

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed cost analysis.

---

## 🧪 Testing

### Local Testing:
```bash
npm run build
npm run preview
```

### Production Testing Checklist:
See [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)

**Essential tests:**
- [ ] Sign up flow
- [ ] Email verification
- [ ] Login/logout
- [ ] Dashboard access
- [ ] Subscription checkout (test card: 4242 4242 4242 4242)
- [ ] File uploads
- [ ] Calendar events
- [ ] Email sending

---

## 🚀 Deployment Status

### ✅ Ready to Deploy:
- All configuration files present
- Environment variables documented
- Backend already deployed to Supabase
- Frontend ready for Vercel/Netlify
- Complete documentation provided
- Security best practices implemented

### To Deploy:
1. Choose: [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md) (20 min) or [DEPLOYMENT.md](./DEPLOYMENT.md) (60 min)
2. Deploy frontend to Vercel/Netlify
3. Add environment variables
4. Configure Supabase URLs
5. Test thoroughly
6. Launch! 🎉

---

## 🆘 Support & Resources

### Documentation:
- Complete deployment guides provided
- Environment variables documented
- Architecture diagrams included
- Troubleshooting guides available

### Platform Support:
- **Vercel:** https://vercel.com/docs
- **Netlify:** https://docs.netlify.com
- **Supabase:** https://supabase.com/docs
- **Stripe:** https://stripe.com/docs

### Community:
- **Vercel Discord:** https://vercel.com/discord
- **Supabase Discord:** https://discord.supabase.com

---

## 🔐 Security

- ✅ Environment variables properly separated (frontend vs backend)
- ✅ Service role keys server-side only
- ✅ Security headers configured
- ✅ HTTPS enforced
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CORS properly configured
- ✅ Session management secure

See [DEPLOYMENT.md](./DEPLOYMENT.md) security section.

---

## 📊 Features by Subscription Tier

### Starter ($29/mo):
- Basic project management
- Up to 5 projects
- Email support

### Professional ($79/mo):
- Advanced features
- Unlimited projects
- Priority support
- Calendar integration

### Studio ($149/mo):
- Everything in Professional
- Team collaboration
- Advanced analytics
- API access

### Growth ($299/mo):
- Enterprise features
- Dedicated support
- Custom integrations
- White-label option

---

## 🎯 Next Steps

1. **Deploy:** Follow [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md)
2. **Test:** Use [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)
3. **Configure:** Custom domain (optional)
4. **Switch to Live:** Stripe live mode when ready
5. **Launch:** Go live with real users! 🚀

---

## 📄 License

Proprietary - FilmLot360

---

## 🤝 Contact

For questions or support:
- **Email:** support@filmlot360.com
- **Website:** https://filmlot360.com

---

**Ready to deploy?** Start with [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) or jump right in with [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md)!

**Last Updated:** December 2024  
**Version:** 1.0  
**Status:** ✅ Production Ready