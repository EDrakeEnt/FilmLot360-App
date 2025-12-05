import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "npm:stripe@14.11.0";
import importApp from "./import.tsx";
import emailApp from "./email.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "Stripe-Signature"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Create Supabase client for server-side operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Initialize Stripe
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
});

/*
 * STRIPE SETUP INSTRUCTIONS:
 * 
 * 1. CREATE STRIPE ACCOUNT
 *    - Sign up at https://stripe.com
 *    - Complete account verification
 * 
 * 2. GET YOUR API KEYS
 *    - Go to https://dashboard.stripe.com/test/apikeys
 *    - Copy your "Secret key" (starts with sk_test_...)
 *    - Add it to the STRIPE_SECRET_KEY environment variable
 * 
 * 3. CREATE PRODUCTS & PRICES IN STRIPE DASHBOARD
 *    - Go to https://dashboard.stripe.com/test/products
 *    - Create 3 products: "Starter", "Professional", "Studio"
 *    - For each product, create 2 prices: monthly and yearly
 *    - Copy each Price ID (starts with price_...)
 *    - Update the STRIPE_PRICES constants below with your Price IDs
 * 
 *    Example price structure:
 *    - Starter Monthly: $49/month -> price_xxxxx
 *    - Starter Yearly: $470/year -> price_xxxxx
 *    - Professional Monthly: $149/month -> price_xxxxx
 *    - Professional Yearly: $1430/year -> price_xxxxx
 *    - Studio Monthly: $299/month -> price_xxxxx
 *    - Studio Yearly: $2870/year -> price_xxxxx
 * 
 * 4. SET UP WEBHOOKS
 *    - Go to https://dashboard.stripe.com/test/webhooks
 *    - Click "Add endpoint"
 *    - Enter your webhook URL: https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-b0eae7ae/stripe-webhook
 *    - Select events to listen to:
 *      * checkout.session.completed
 *      * customer.subscription.updated
 *      * customer.subscription.deleted
 *      * invoice.payment_succeeded
 *      * invoice.payment_failed
 *    - Copy the "Signing secret" (starts with whsec_...)
 *    - Add it to the STRIPE_WEBHOOK_SECRET environment variable
 * 
 * 5. CONFIGURE CUSTOMER PORTAL (for subscription management)
 *    - Go to https://dashboard.stripe.com/test/settings/billing/portal
 *    - Enable customer portal
 *    - Configure allowed features (cancel, update payment, view invoices)
 * 
 * 6. FOR PRODUCTION:
 *    - Switch to live mode in Stripe Dashboard
 *    - Get your live API keys (sk_live_...)
 *    - Create products/prices in live mode
 *    - Set up live webhook endpoint
 *    - Update all environment variables with live keys
 */

// Stripe Price IDs - You'll need to create these in your Stripe Dashboard
const STRIPE_PRICES = {
  starter_monthly: Deno.env.get('STRIPE_STARTER_MONTHLY_PRICE_ID'),
  starter_yearly: Deno.env.get('STRIPE_STARTER_YEARLY_PRICE_ID'),
  growth_monthly: Deno.env.get('STRIPE_GROWTH_MONTHLY_PRICE_ID'),
  growth_yearly: Deno.env.get('STRIPE_GROWTH_YEARLY_PRICE_ID'),
  professional_monthly: Deno.env.get('STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID'),
  professional_yearly: Deno.env.get('STRIPE_PROFESSIONAL_YEARLY_PRICE_ID'),
};

// Health check endpoint
app.get("/make-server-b0eae7ae/health", (c) => {
  return c.json({ status: "ok" });
});

// Stripe Configuration Checker - helps debug Stripe setup issues
app.get("/make-server-b0eae7ae/check-stripe-config", (c) => {
  const config = {
    secretKey: {
      configured: !!Deno.env.get('STRIPE_SECRET_KEY'),
      valid: Deno.env.get('STRIPE_SECRET_KEY')?.startsWith('sk_') || false,
      value: Deno.env.get('STRIPE_SECRET_KEY') ? 
        `${Deno.env.get('STRIPE_SECRET_KEY')?.substring(0, 10)}...` : 'NOT SET'
    },
    webhookSecret: {
      configured: !!Deno.env.get('STRIPE_WEBHOOK_SECRET'),
      valid: Deno.env.get('STRIPE_WEBHOOK_SECRET')?.startsWith('whsec_') || false,
    },
    priceIds: {}
  };

  // Check each price ID
  const priceKeys = [
    'starter_monthly', 'starter_yearly',
    'growth_monthly', 'growth_yearly', 
    'professional_monthly', 'professional_yearly'
  ];

  priceKeys.forEach(key => {
    const envKey = `STRIPE_${key.toUpperCase()}_PRICE_ID`;
    const value = STRIPE_PRICES[key];
    
    let issue = null;
    if (!value) {
      issue = `NOT SET - Please set ${envKey}`;
    } else if (value.startsWith('sk_')) {
      issue = `WRONG! This is a Secret Key, not a Price ID. Please enter the Price ID (starts with price_)`;
    } else if (!value.startsWith('price_')) {
      issue = `Invalid format - Price IDs should start with 'price_'`;
    }

    config.priceIds[key] = {
      configured: !!value,
      valid: value?.startsWith('price_') || false,
      value: value ? `${value.substring(0, 15)}...` : 'NOT SET',
      issue: issue
    };
  });

  // Overall status
  const allPricesValid = Object.values(config.priceIds).every((p: any) => p.valid);
  const overallStatus = config.secretKey.valid && allPricesValid ? 'READY' : 'NEEDS CONFIGURATION';

  return c.json({ 
    status: overallStatus,
    config,
    instructions: overallStatus === 'READY' ? 
      'All Stripe configuration looks good!' : 
      'Please fix the issues listed above. Go to Stripe Dashboard → Products → Copy the Price IDs (NOT the API keys)'
  });
});

// Initialize test users - creates demo accounts for testing
app.post("/make-server-b0eae7ae/init-test-users", async (c) => {
  try {
    console.log('Initializing test users...');

    const testUsers = [
      {
        email: 'admin@filmlot360.com',
        password: 'password123',
        fullName: 'Admin User',
        company: 'FilmLot360',
        plan: 'professional',
      },
      {
        email: 'lysasand.535434@gmail.com',
        password: 'ReviewTest2024!',
        fullName: 'Google Reviewer',
        company: 'Google Trust & Safety',
        plan: 'professional',
      }
    ];

    const results = [];

    for (const user of testUsers) {
      try {
        // Try to create user - if they exist, we'll get an error
        const { data, error } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          user_metadata: { 
            name: user.fullName,
            company: user.company,
            plan: user.plan,
            billingCycle: 'monthly',
          },
          email_confirm: true // Auto-confirm for test users
        });

        if (error) {
          // Check if error is because user already exists
          if (error.message.includes('already registered') || error.message.includes('already been registered')) {
            console.log(`User ${user.email} already exists, skipping...`);
            results.push({ email: user.email, status: 'already_exists' });
            continue;
          }
          
          console.error(`Error creating user ${user.email}: ${error.message}`);
          results.push({ email: user.email, status: 'error', error: error.message });
          continue;
        }

        // Store user data in KV store
        await kv.set(`user:${data.user?.id}`, {
          email: user.email,
          fullName: user.fullName,
          company: user.company,
          plan: user.plan,
          billingCycle: 'monthly',
          emailVerified: true,
          createdAt: new Date().toISOString(),
        });

        console.log(`Created test user: ${user.email}`);
        results.push({ email: user.email, status: 'created', userId: data.user?.id });

      } catch (err) {
        console.error(`Unexpected error creating user ${user.email}: ${err}`);
        results.push({ email: user.email, status: 'error', error: err.message });
      }
    }

    return c.json({ 
      success: true,
      message: 'Test users initialization complete',
      results
    });

  } catch (error) {
    console.error(`Error initializing test users: ${error}`);
    return c.json({ error: `Failed to initialize test users: ${error.message}` }, 500);
  }
});

// Sign up endpoint - creates user with email verification
app.post("/make-server-b0eae7ae/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, fullName, company, plan, billingCycle } = body;

    console.log(`Creating user account for email: ${email}`);

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name: fullName,
        company: company || '',
        plan: plan || 'professional',
        billingCycle: billingCycle || 'monthly',
      },
      // Email verification is required - user will receive verification email
      email_confirm: false
    });

    if (error) {
      console.error(`Error creating user during signup: ${error.message}`);
      return c.json({ error: `Failed to create account: ${error.message}` }, 400);
    }

    console.log(`User account created successfully: ${data.user?.id}`);

    // Store additional user data in KV store
    await kv.set(`user:${data.user?.id}`, {
      email,
      fullName,
      company,
      plan,
      billingCycle,
      emailVerified: false,
      createdAt: new Date().toISOString(),
    });

    return c.json({ 
      success: true, 
      userId: data.user?.id,
      message: 'Verification email sent. Please check your inbox.'
    });

  } catch (error) {
    console.error(`Unexpected error during signup: ${error}`);
    return c.json({ error: `Signup failed: ${error.message}` }, 500);
  }
});

// Process checkout - stores payment info and triggers verification reminder
app.post("/make-server-b0eae7ae/checkout", async (c) => {
  try {
    const body = await c.req.json();
    const { userId, plan, billingCycle, cardInfo } = body;

    console.log(`Processing checkout for user: ${userId}`);

    // Store payment information (in production, this would integrate with a payment processor)
    await kv.set(`payment:${userId}`, {
      plan,
      billingCycle,
      cardLast4: cardInfo.cardNumber.slice(-4),
      cardholderName: cardInfo.cardholderName,
      status: 'trial',
      trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      createdAt: new Date().toISOString(),
    });

    // Get user data
    const userData = await kv.get(`user:${userId}`);
    
    if (!userData) {
      return c.json({ error: 'User not found' }, 404);
    }

    console.log(`Checkout completed for user: ${userId}. Email verification required.`);

    return c.json({ 
      success: true,
      message: 'Please verify your email to access the dashboard.',
      requiresVerification: !userData.emailVerified
    });

  } catch (error) {
    console.error(`Error during checkout processing: ${error}`);
    return c.json({ error: `Checkout failed: ${error.message}` }, 500);
  }
});

// Verify email and send dashboard access link
app.post("/make-server-b0eae7ae/verify-email", async (c) => {
  try {
    const body = await c.req.json();
    const { userId } = body;

    console.log(`Verifying email for user: ${userId}`);

    // Update user data to mark email as verified
    const userData = await kv.get(`user:${userId}`);
    
    if (!userData) {
      return c.json({ error: 'User not found' }, 404);
    }

    await kv.set(`user:${userId}`, {
      ...userData,
      emailVerified: true,
      emailVerifiedAt: new Date().toISOString(),
    });

    console.log(`Email verified for user: ${userId}. Dashboard access email would be sent to: ${userData.email}`);

    // In production, this would send an email with the dashboard link
    // For now, we'll return the dashboard URL
    const dashboardUrl = `${c.req.header('origin') || 'http://localhost'}/dashboard`;

    return c.json({ 
      success: true,
      message: 'Email verified! Access link sent to your email.',
      dashboardUrl
    });

  } catch (error) {
    console.error(`Error during email verification: ${error}`);
    return c.json({ error: `Email verification failed: ${error.message}` }, 500);
  }
});

// Check verification status
app.get("/make-server-b0eae7ae/verify-status/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    
    const userData = await kv.get(`user:${userId}`);
    
    if (!userData) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({ 
      emailVerified: userData.emailVerified || false,
      email: userData.email
    });

  } catch (error) {
    console.error(`Error checking verification status: ${error}`);
    return c.json({ error: `Failed to check status: ${error.message}` }, 500);
  }
});

// ============================================================================
// STRIPE PAYMENT INTEGRATION
// ============================================================================

// Create Stripe Checkout Session
app.post("/make-server-b0eae7ae/create-checkout-session", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const body = await c.req.json();
    const { planName, billingPeriod } = body;

    console.log(`Creating checkout session for user: ${auth.userId}, plan: ${planName}, period: ${billingPeriod}`);

    // Validate Stripe API key
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey || stripeKey.length < 10) {
      console.error('Stripe API key not configured');
      return c.json({ 
        error: 'Payment system not configured. Please add your Stripe API key in the environment variables.' 
      }, 500);
    }

    // Get user data
    const userData = await kv.get(`user:${auth.userId}`);
    if (!userData) {
      return c.json({ error: 'User not found' }, 404);
    }

    // Map plan and billing period to Stripe Price ID
    const priceKey = `${planName.toLowerCase()}_${billingPeriod.toLowerCase()}`;
    const priceId = STRIPE_PRICES[priceKey];

    console.log(`Looking for price ID with key: ${priceKey}, found: ${priceId}`)

    if (!priceId) {
      console.error(`No Stripe Price ID configured for: ${priceKey}`);
      return c.json({ 
        error: `Price configuration missing for ${planName} (${billingPeriod}). Please configure the ${priceKey.toUpperCase().replace('_', '_')}_PRICE_ID environment variable.`,
        missingPriceKey: priceKey
      }, 400);
    }

    // Validate that the price ID looks correct (should start with 'price_')
    if (!priceId.startsWith('price_')) {
      console.error(`Invalid Stripe Price ID format for ${priceKey}: ${priceId}`);
      
      // Check if they accidentally put the secret key
      if (priceId.startsWith('sk_')) {
        return c.json({ 
          error: `Invalid configuration: You entered a Stripe Secret Key instead of a Price ID for ${priceKey.toUpperCase().replace('_', '_')}_PRICE_ID. Please enter the Price ID (starts with 'price_') instead.`,
          hint: 'Go to Stripe Dashboard → Products → Select your product → Copy the Price ID (not the API key)'
        }, 400);
      }
      
      return c.json({ 
        error: `Invalid Price ID format for ${planName} (${billingPeriod}). Price IDs should start with 'price_'. Got: ${priceId.substring(0, 20)}...`,
        hint: 'Go to Stripe Dashboard → Products → Select your product → Copy the Price ID'
      }, 400);
    }

    // Verify the price exists and is recurring in Stripe
    try {
      const priceDetails = await stripe.prices.retrieve(priceId);
      
      console.log(`Price details for ${priceKey}:`, {
        id: priceDetails.id,
        type: priceDetails.type,
        recurring: priceDetails.recurring,
      });

      if (priceDetails.type !== 'recurring') {
        return c.json({ 
          error: `The Price ID for ${planName} (${billingPeriod}) is not set up as a recurring subscription in Stripe.`,
          hint: `Please go to Stripe Dashboard → Products → Create a new recurring price for ${planName}. Make sure to select "Recurring" and set the interval to "${billingPeriod === 'monthly' ? 'month' : 'year'}".`,
          priceId: priceId,
          currentType: priceDetails.type
        }, 400);
      }

      const expectedInterval = billingPeriod === 'monthly' ? 'month' : 'year';
      if (priceDetails.recurring?.interval !== expectedInterval) {
        return c.json({ 
          error: `The Price ID for ${planName} (${billingPeriod}) has the wrong billing interval.`,
          hint: `Expected: ${expectedInterval}, but got: ${priceDetails.recurring?.interval}. Please use a different Price ID or create a new one.`,
          priceId: priceId,
          expectedInterval,
          actualInterval: priceDetails.recurring?.interval
        }, 400);
      }

    } catch (priceError) {
      console.error(`Error retrieving price from Stripe: ${priceError.message}`);
      return c.json({ 
        error: `Cannot verify Price ID in Stripe: ${priceError.message}`,
        hint: 'The Price ID may not exist, or your Stripe API key may be incorrect. Please check your Stripe Dashboard.',
        priceId: priceId
      }, 400);
    }

    // Get or create Stripe customer
    let stripeCustomerId = await kv.get(`stripe_customer:${auth.userId}`);
    
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: userData.email,
        metadata: {
          userId: auth.userId,
          fullName: userData.fullName || '',
        },
      });
      stripeCustomerId = customer.id;
      await kv.set(`stripe_customer:${auth.userId}`, stripeCustomerId);
      console.log(`Created Stripe customer: ${stripeCustomerId}`);
    }

    // Create Checkout Session
    try {
      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${c.req.header('origin') || 'http://localhost'}/dashboard/subscription?session_id={CHECKOUT_SESSION_ID}&success=true`,
        cancel_url: `${c.req.header('origin') || 'http://localhost'}/dashboard/subscription?canceled=true`,
        metadata: {
          userId: auth.userId,
          planName,
          billingPeriod,
        },
        subscription_data: {
          metadata: {
            userId: auth.userId,
            planName,
            billingPeriod,
          },
          trial_period_days: 7, // 7-day free trial
        },
      });

      console.log(`Checkout session created: ${session.id}`);

      return c.json({ 
        success: true, 
        sessionId: session.id,
        url: session.url 
      });

    } catch (sessionError) {
      console.error(`Error creating checkout session: ${sessionError.message}`);
      return c.json({ error: `Failed to create checkout session: ${sessionError.message}` }, 500);
    }

  } catch (error) {
    console.error(`Error creating checkout session: ${error}`);
    return c.json({ error: `Failed to create checkout session: ${error.message}` }, 500);
  }
});

// Create Stripe Customer Portal Session
app.post("/make-server-b0eae7ae/create-portal-session", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    console.log(`Creating customer portal session for user: ${auth.userId}`);

    // Get Stripe customer ID
    const stripeCustomerId = await kv.get(`stripe_customer:${auth.userId}`);
    
    if (!stripeCustomerId) {
      return c.json({ error: 'No active subscription found' }, 404);
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${c.req.header('origin') || 'http://localhost'}/dashboard/subscription`,
    });

    console.log(`Portal session created: ${session.id}`);

    return c.json({ 
      success: true, 
      url: session.url 
    });

  } catch (error) {
    console.error(`Error creating portal session: ${error}`);
    return c.json({ error: `Failed to create portal session: ${error.message}` }, 500);
  }
});

// Stripe Webhook Handler
app.post("/make-server-b0eae7ae/stripe-webhook", async (c) => {
  try {
    const signature = c.req.header('stripe-signature');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

    if (!signature || !webhookSecret) {
      console.error('Missing webhook signature or secret');
      return c.json({ error: 'Webhook signature or secret missing' }, 400);
    }

    // Get raw body for signature verification
    const rawBody = await c.req.text();
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return c.json({ error: `Webhook Error: ${err.message}` }, 400);
    }

    console.log(`Processing webhook event: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const planName = session.metadata?.planName;
        const billingPeriod = session.metadata?.billingPeriod;

        if (userId) {
          console.log(`Checkout completed for user: ${userId}`);
          
          // Update user subscription status
          await kv.set(`payment:${userId}`, {
            plan: planName,
            billingCycle: billingPeriod,
            status: 'trialing',
            stripeSubscriptionId: session.subscription,
            stripeCustomerId: session.customer,
            trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
          });

          // Update user plan
          const userData = await kv.get(`user:${userId}`);
          if (userData) {
            await kv.set(`user:${userId}`, {
              ...userData,
              plan: planName,
              billingCycle: billingPeriod,
            });
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;

        if (userId) {
          console.log(`Subscription updated for user: ${userId}, status: ${subscription.status}`);
          
          const paymentData = await kv.get(`payment:${userId}`);
          if (paymentData) {
            await kv.set(`payment:${userId}`, {
              ...paymentData,
              status: subscription.status,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;

        if (userId) {
          console.log(`Subscription canceled for user: ${userId}`);
          
          const paymentData = await kv.get(`payment:${userId}`);
          if (paymentData) {
            await kv.set(`payment:${userId}`, {
              ...paymentData,
              status: 'canceled',
              canceledAt: new Date().toISOString(),
            });
          }
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const customerId = invoice.customer;
        
        // Find user by Stripe customer ID
        const allUsers = await kv.getByPrefix('stripe_customer:');
        const userEntry = allUsers.find((entry: any) => entry === customerId);
        
        if (userEntry) {
          console.log(`Payment succeeded for invoice: ${invoice.id}`);
          // Could log this in billing history if needed
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.log(`Payment failed for invoice: ${invoice.id}`);
        // Could send notification to user about failed payment
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return c.json({ received: true });

  } catch (error) {
    console.error(`Webhook handler error: ${error}`);
    return c.json({ error: `Webhook handler failed: ${error.message}` }, 500);
  }
});

// ============================================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================================

// Helper function to verify user authentication
async function authenticateUser(c: any) {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  
  if (!accessToken) {
    return { error: 'No authorization token provided', status: 401 };
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (error || !user?.id) {
    console.error(`Authentication error: ${error?.message}`);
    return { error: 'Unauthorized', status: 401 };
  }

  return { userId: user.id };
}

// ============================================================================
// PROJECT MANAGEMENT ENDPOINTS
// ============================================================================

// Get all projects for a user
app.get("/make-server-b0eae7ae/projects", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projects = await kv.getByPrefix(`project:${auth.userId}:`);
    
    return c.json({ 
      success: true, 
      projects: projects || [] 
    });

  } catch (error) {
    console.error(`Error fetching projects: ${error}`);
    return c.json({ error: `Failed to fetch projects: ${error.message}` }, 500);
  }
});

// Get single project
app.get("/make-server-b0eae7ae/projects/:projectId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const project = await kv.get(`project:${auth.userId}:${projectId}`);
    
    if (!project) {
      return c.json({ error: 'Project not found' }, 404);
    }

    return c.json({ success: true, project });

  } catch (error) {
    console.error(`Error fetching project: ${error}`);
    return c.json({ error: `Failed to fetch project: ${error.message}` }, 500);
  }
});

// Create new project
app.post("/make-server-b0eae7ae/projects", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const body = await c.req.json();
    const { title, description, status, budget, startDate, endDate, genre, director } = body;

    if (!title) {
      return c.json({ error: 'Project title is required' }, 400);
    }

    const projectId = crypto.randomUUID();
    const project = {
      id: projectId,
      userId: auth.userId,
      title,
      description: description || '',
      status: status || 'planning',
      budget: budget || 0,
      spent: 0,
      startDate: startDate || null,
      endDate: endDate || null,
      genre: genre || '',
      director: director || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`project:${auth.userId}:${projectId}`, project);

    console.log(`Project created: ${projectId} by user: ${auth.userId}`);

    return c.json({ success: true, project });

  } catch (error) {
    console.error(`Error creating project: ${error}`);
    return c.json({ error: `Failed to create project: ${error.message}` }, 500);
  }
});

// Update project
app.put("/make-server-b0eae7ae/projects/:projectId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const body = await c.req.json();
    
    const existingProject = await kv.get(`project:${auth.userId}:${projectId}`);
    
    if (!existingProject) {
      return c.json({ error: 'Project not found' }, 404);
    }

    const updatedProject = {
      ...existingProject,
      ...body,
      id: projectId,
      userId: auth.userId,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`project:${auth.userId}:${projectId}`, updatedProject);

    console.log(`Project updated: ${projectId}`);

    return c.json({ success: true, project: updatedProject });

  } catch (error) {
    console.error(`Error updating project: ${error}`);
    return c.json({ error: `Failed to update project: ${error.message}` }, 500);
  }
});

// Delete project
app.delete("/make-server-b0eae7ae/projects/:projectId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    
    const existingProject = await kv.get(`project:${auth.userId}:${projectId}`);
    
    if (!existingProject) {
      return c.json({ error: 'Project not found' }, 404);
    }

    await kv.del(`project:${auth.userId}:${projectId}`);

    console.log(`Project deleted: ${projectId}`);

    return c.json({ success: true, message: 'Project deleted successfully' });

  } catch (error) {
    console.error(`Error deleting project: ${error}`);
    return c.json({ error: `Failed to delete project: ${error.message}` }, 500);
  }
});

// ============================================================================
// ACTOR MANAGEMENT ENDPOINTS
// ============================================================================

// Get all actors for a project
app.get("/make-server-b0eae7ae/projects/:projectId/actors", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const actors = await kv.getByPrefix(`actor:${auth.userId}:${projectId}:`);
    
    return c.json({ success: true, actors: actors || [] });

  } catch (error) {
    console.error(`Error fetching actors: ${error}`);
    return c.json({ error: `Failed to fetch actors: ${error.message}` }, 500);
  }
});

// Add actor to project
app.post("/make-server-b0eae7ae/projects/:projectId/actors", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const body = await c.req.json();
    const { name, role, email, phone, rate, status, notes } = body;

    if (!name || !role) {
      return c.json({ error: 'Actor name and role are required' }, 400);
    }

    const actorId = crypto.randomUUID();
    const actor = {
      id: actorId,
      projectId,
      userId: auth.userId,
      name,
      role,
      email: email || '',
      phone: phone || '',
      rate: rate || 0,
      status: status || 'contacted',
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`actor:${auth.userId}:${projectId}:${actorId}`, actor);

    console.log(`Actor added: ${actorId} to project: ${projectId}`);

    return c.json({ success: true, actor });

  } catch (error) {
    console.error(`Error adding actor: ${error}`);
    return c.json({ error: `Failed to add actor: ${error.message}` }, 500);
  }
});

// Update actor
app.put("/make-server-b0eae7ae/projects/:projectId/actors/:actorId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const actorId = c.req.param('actorId');
    const body = await c.req.json();
    
    const existingActor = await kv.get(`actor:${auth.userId}:${projectId}:${actorId}`);
    
    if (!existingActor) {
      return c.json({ error: 'Actor not found' }, 404);
    }

    const updatedActor = {
      ...existingActor,
      ...body,
      id: actorId,
      projectId,
      userId: auth.userId,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`actor:${auth.userId}:${projectId}:${actorId}`, updatedActor);

    return c.json({ success: true, actor: updatedActor });

  } catch (error) {
    console.error(`Error updating actor: ${error}`);
    return c.json({ error: `Failed to update actor: ${error.message}` }, 500);
  }
});

// Delete actor
app.delete("/make-server-b0eae7ae/projects/:projectId/actors/:actorId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const actorId = c.req.param('actorId');
    
    await kv.del(`actor:${auth.userId}:${projectId}:${actorId}`);

    return c.json({ success: true, message: 'Actor deleted successfully' });

  } catch (error) {
    console.error(`Error deleting actor: ${error}`);
    return c.json({ error: `Failed to delete actor: ${error.message}` }, 500);
  }
});

// ============================================================================
// CREW MANAGEMENT ENDPOINTS
// ============================================================================

// Get all crew members for a project
app.get("/make-server-b0eae7ae/projects/:projectId/crew", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const crew = await kv.getByPrefix(`crew:${auth.userId}:${projectId}:`);
    
    return c.json({ success: true, crew: crew || [] });

  } catch (error) {
    console.error(`Error fetching crew: ${error}`);
    return c.json({ error: `Failed to fetch crew: ${error.message}` }, 500);
  }
});

// Add crew member to project
app.post("/make-server-b0eae7ae/projects/:projectId/crew", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const body = await c.req.json();
    const { name, position, department, email, phone, rate, status, notes } = body;

    if (!name || !position) {
      return c.json({ error: 'Crew name and position are required' }, 400);
    }

    const crewId = crypto.randomUUID();
    const crewMember = {
      id: crewId,
      projectId,
      userId: auth.userId,
      name,
      position,
      department: department || '',
      email: email || '',
      phone: phone || '',
      rate: rate || 0,
      status: status || 'contacted',
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`crew:${auth.userId}:${projectId}:${crewId}`, crewMember);

    console.log(`Crew member added: ${crewId} to project: ${projectId}`);

    return c.json({ success: true, crew: crewMember });

  } catch (error) {
    console.error(`Error adding crew member: ${error}`);
    return c.json({ error: `Failed to add crew member: ${error.message}` }, 500);
  }
});

// Update crew member
app.put("/make-server-b0eae7ae/projects/:projectId/crew/:crewId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const crewId = c.req.param('crewId');
    const body = await c.req.json();
    
    const existingCrew = await kv.get(`crew:${auth.userId}:${projectId}:${crewId}`);
    
    if (!existingCrew) {
      return c.json({ error: 'Crew member not found' }, 404);
    }

    const updatedCrew = {
      ...existingCrew,
      ...body,
      id: crewId,
      projectId,
      userId: auth.userId,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`crew:${auth.userId}:${projectId}:${crewId}`, updatedCrew);

    return c.json({ success: true, crew: updatedCrew });

  } catch (error) {
    console.error(`Error updating crew member: ${error}`);
    return c.json({ error: `Failed to update crew member: ${error.message}` }, 500);
  }
});

// Delete crew member
app.delete("/make-server-b0eae7ae/projects/:projectId/crew/:crewId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const crewId = c.req.param('crewId');
    
    await kv.del(`crew:${auth.userId}:${projectId}:${crewId}`);

    return c.json({ success: true, message: 'Crew member deleted successfully' });

  } catch (error) {
    console.error(`Error deleting crew member: ${error}`);
    return c.json({ error: `Failed to delete crew member: ${error.message}` }, 500);
  }
});

// ============================================================================
// BUDGET & EXPENSE MANAGEMENT ENDPOINTS
// ============================================================================

// Get all expenses for a project
app.get("/make-server-b0eae7ae/projects/:projectId/expenses", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const expenses = await kv.getByPrefix(`expense:${auth.userId}:${projectId}:`);
    
    return c.json({ success: true, expenses: expenses || [] });

  } catch (error) {
    console.error(`Error fetching expenses: ${error}`);
    return c.json({ error: `Failed to fetch expenses: ${error.message}` }, 500);
  }
});

// Add expense to project
app.post("/make-server-b0eae7ae/projects/:projectId/expenses", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const body = await c.req.json();
    const { category, description, amount, date, vendor, status } = body;

    if (!category || !amount) {
      return c.json({ error: 'Category and amount are required' }, 400);
    }

    const expenseId = crypto.randomUUID();
    const expense = {
      id: expenseId,
      projectId,
      userId: auth.userId,
      category,
      description: description || '',
      amount: parseFloat(amount),
      date: date || new Date().toISOString(),
      vendor: vendor || '',
      status: status || 'pending',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`expense:${auth.userId}:${projectId}:${expenseId}`, expense);

    // Update project spent amount
    const project = await kv.get(`project:${auth.userId}:${projectId}`);
    if (project) {
      project.spent = (project.spent || 0) + expense.amount;
      await kv.set(`project:${auth.userId}:${projectId}`, project);
    }

    console.log(`Expense added: ${expenseId} to project: ${projectId}`);

    return c.json({ success: true, expense });

  } catch (error) {
    console.error(`Error adding expense: ${error}`);
    return c.json({ error: `Failed to add expense: ${error.message}` }, 500);
  }
});

// Update expense
app.put("/make-server-b0eae7ae/projects/:projectId/expenses/:expenseId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const expenseId = c.req.param('expenseId');
    const body = await c.req.json();
    
    const existingExpense = await kv.get(`expense:${auth.userId}:${projectId}:${expenseId}`);
    
    if (!existingExpense) {
      return c.json({ error: 'Expense not found' }, 404);
    }

    const oldAmount = existingExpense.amount;
    const newAmount = body.amount ? parseFloat(body.amount) : oldAmount;

    const updatedExpense = {
      ...existingExpense,
      ...body,
      amount: newAmount,
      id: expenseId,
      projectId,
      userId: auth.userId,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`expense:${auth.userId}:${projectId}:${expenseId}`, updatedExpense);

    // Update project spent amount if amount changed
    if (oldAmount !== newAmount) {
      const project = await kv.get(`project:${auth.userId}:${projectId}`);
      if (project) {
        project.spent = (project.spent || 0) - oldAmount + newAmount;
        await kv.set(`project:${auth.userId}:${projectId}`, project);
      }
    }

    return c.json({ success: true, expense: updatedExpense });

  } catch (error) {
    console.error(`Error updating expense: ${error}`);
    return c.json({ error: `Failed to update expense: ${error.message}` }, 500);
  }
});

// Delete expense
app.delete("/make-server-b0eae7ae/projects/:projectId/expenses/:expenseId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const expenseId = c.req.param('expenseId');
    
    const existingExpense = await kv.get(`expense:${auth.userId}:${projectId}:${expenseId}`);
    
    if (!existingExpense) {
      return c.json({ error: 'Expense not found' }, 404);
    }

    await kv.del(`expense:${auth.userId}:${projectId}:${expenseId}`);

    // Update project spent amount
    const project = await kv.get(`project:${auth.userId}:${projectId}`);
    if (project) {
      project.spent = (project.spent || 0) - existingExpense.amount;
      await kv.set(`project:${auth.userId}:${projectId}`, project);
    }

    return c.json({ success: true, message: 'Expense deleted successfully' });

  } catch (error) {
    console.error(`Error deleting expense: ${error}`);
    return c.json({ error: `Failed to delete expense: ${error.message}` }, 500);
  }
});

// ============================================================================
// INVOICE MANAGEMENT ENDPOINTS
// ============================================================================

// Get all invoices for a project
app.get("/make-server-b0eae7ae/projects/:projectId/invoices", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const invoices = await kv.getByPrefix(`invoice:${auth.userId}:${projectId}:`);
    
    return c.json({ success: true, invoices: invoices || [] });

  } catch (error) {
    console.error(`Error fetching invoices: ${error}`);
    return c.json({ error: `Failed to fetch invoices: ${error.message}` }, 500);
  }
});

// Create invoice
app.post("/make-server-b0eae7ae/projects/:projectId/invoices", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const body = await c.req.json();
    const { clientName, clientEmail, items, dueDate, notes } = body;

    if (!clientName || !items || items.length === 0) {
      return c.json({ error: 'Client name and items are required' }, 400);
    }

    const invoiceId = crypto.randomUUID();
    const invoiceNumber = `INV-${Date.now()}`;
    
    const total = items.reduce((sum: number, item: any) => {
      return sum + (item.quantity * item.rate);
    }, 0);

    const invoice = {
      id: invoiceId,
      invoiceNumber,
      projectId,
      userId: auth.userId,
      clientName,
      clientEmail: clientEmail || '',
      items,
      total,
      status: 'draft',
      dueDate: dueDate || null,
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`invoice:${auth.userId}:${projectId}:${invoiceId}`, invoice);

    console.log(`Invoice created: ${invoiceId} for project: ${projectId}`);

    return c.json({ success: true, invoice });

  } catch (error) {
    console.error(`Error creating invoice: ${error}`);
    return c.json({ error: `Failed to create invoice: ${error.message}` }, 500);
  }
});

// Update invoice
app.put("/make-server-b0eae7ae/projects/:projectId/invoices/:invoiceId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const invoiceId = c.req.param('invoiceId');
    const body = await c.req.json();
    
    const existingInvoice = await kv.get(`invoice:${auth.userId}:${projectId}:${invoiceId}`);
    
    if (!existingInvoice) {
      return c.json({ error: 'Invoice not found' }, 404);
    }

    // Recalculate total if items changed
    let total = existingInvoice.total;
    if (body.items) {
      total = body.items.reduce((sum: number, item: any) => {
        return sum + (item.quantity * item.rate);
      }, 0);
    }

    const updatedInvoice = {
      ...existingInvoice,
      ...body,
      total,
      id: invoiceId,
      projectId,
      userId: auth.userId,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`invoice:${auth.userId}:${projectId}:${invoiceId}`, updatedInvoice);

    return c.json({ success: true, invoice: updatedInvoice });

  } catch (error) {
    console.error(`Error updating invoice: ${error}`);
    return c.json({ error: `Failed to update invoice: ${error.message}` }, 500);
  }
});

// Delete invoice
app.delete("/make-server-b0eae7ae/projects/:projectId/invoices/:invoiceId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    const invoiceId = c.req.param('invoiceId');
    
    await kv.del(`invoice:${auth.userId}:${projectId}:${invoiceId}`);

    return c.json({ success: true, message: 'Invoice deleted successfully' });

  } catch (error) {
    console.error(`Error deleting invoice: ${error}`);
    return c.json({ error: `Failed to delete invoice: ${error.message}` }, 500);
  }
});

// ============================================================================
// DASHBOARD ANALYTICS ENDPOINTS
// ============================================================================

// Get dashboard analytics for user
app.get("/make-server-b0eae7ae/analytics/dashboard", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    // Get all projects
    const projects = await kv.getByPrefix(`project:${auth.userId}:`) || [];
    
    // Calculate statistics
    const totalProjects = projects.length;
    const activeProjects = projects.filter((p: any) => p.status === 'in-progress' || p.status === 'pre-production').length;
    const completedProjects = projects.filter((p: any) => p.status === 'completed').length;
    
    const totalBudget = projects.reduce((sum: number, p: any) => sum + (p.budget || 0), 0);
    const totalSpent = projects.reduce((sum: number, p: any) => sum + (p.spent || 0), 0);

    // Get recent activity (last 5 projects by update date)
    const recentProjects = projects
      .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);

    const analytics = {
      totalProjects,
      activeProjects,
      completedProjects,
      totalBudget,
      totalSpent,
      budgetRemaining: totalBudget - totalSpent,
      budgetUtilization: totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : 0,
      recentProjects,
    };

    return c.json({ success: true, analytics });

  } catch (error) {
    console.error(`Error fetching dashboard analytics: ${error}`);
    return c.json({ error: `Failed to fetch analytics: ${error.message}` }, 500);
  }
});

// Get project analytics
app.get("/make-server-b0eae7ae/analytics/projects/:projectId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const projectId = c.req.param('projectId');
    
    // Get project
    const project = await kv.get(`project:${auth.userId}:${projectId}`);
    if (!project) {
      return c.json({ error: 'Project not found' }, 404);
    }

    // Get related data
    const actors = await kv.getByPrefix(`actor:${auth.userId}:${projectId}:`) || [];
    const crew = await kv.getByPrefix(`crew:${auth.userId}:${projectId}:`) || [];
    const expenses = await kv.getByPrefix(`expense:${auth.userId}:${projectId}:`) || [];
    const invoices = await kv.getByPrefix(`invoice:${auth.userId}:${projectId}:`) || [];

    // Calculate expense breakdown by category
    const expensesByCategory: any = {};
    expenses.forEach((exp: any) => {
      if (!expensesByCategory[exp.category]) {
        expensesByCategory[exp.category] = 0;
      }
      expensesByCategory[exp.category] += exp.amount;
    });

    const analytics = {
      project,
      teamSize: {
        actors: actors.length,
        crew: crew.length,
        total: actors.length + crew.length,
      },
      financial: {
        budget: project.budget || 0,
        spent: project.spent || 0,
        remaining: (project.budget || 0) - (project.spent || 0),
        expenseCount: expenses.length,
        invoiceCount: invoices.length,
        expensesByCategory,
      },
      timeline: {
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
      },
    };

    return c.json({ success: true, analytics });

  } catch (error) {
    console.error(`Error fetching project analytics: ${error}`);
    return c.json({ error: `Failed to fetch project analytics: ${error.message}` }, 500);
  }
});

// ============================================================================
// USER PROFILE MANAGEMENT ENDPOINTS
// ============================================================================

// Get user profile
app.get("/make-server-b0eae7ae/profile", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    let userData = await kv.get(`user:${auth.userId}`);
    const paymentData = await kv.get(`payment:${auth.userId}`);

    // If user profile doesn't exist, create a default one from Supabase Auth
    if (!userData) {
      console.log(`User profile not found in KV store for user: ${auth.userId}. Creating default profile...`);
      
      // Get user info from Supabase Auth
      const accessToken = c.req.header('Authorization')?.split(' ')[1];
      const { data: { user }, error } = await supabase.auth.getUser(accessToken || '');
      
      if (user) {
        userData = {
          email: user.email || '',
          fullName: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          company: user.user_metadata?.company || '',
          plan: user.user_metadata?.plan || 'professional',
          billingCycle: user.user_metadata?.billingCycle || 'monthly',
          emailVerified: user.email_confirmed_at ? true : false,
          createdAt: user.created_at || new Date().toISOString(),
        };
        
        // Store the newly created profile
        await kv.set(`user:${auth.userId}`, userData);
        console.log(`Created default profile for user: ${auth.userId}`);
      } else {
        return c.json({ error: 'User profile not found and could not be created' }, 404);
      }
    }

    const profile = {
      ...userData,
      subscription: paymentData || null,
    };

    return c.json({ success: true, profile });

  } catch (error) {
    console.error(`Error fetching user profile: ${error}`);
    return c.json({ error: `Failed to fetch profile: ${error.message}` }, 500);
  }
});

// Update user profile
app.put("/make-server-b0eae7ae/profile", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const body = await c.req.json();
    const userData = await kv.get(`user:${auth.userId}`);

    if (!userData) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    const updatedProfile = {
      ...userData,
      ...body,
      email: userData.email, // Don't allow email change
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`user:${auth.userId}`, updatedProfile);

    console.log(`Profile updated for user: ${auth.userId}`);

    return c.json({ success: true, profile: updatedProfile });

  } catch (error) {
    console.error(`Error updating user profile: ${error}`);
    return c.json({ error: `Failed to update profile: ${error.message}` }, 500);
  }
});

// Update subscription
app.put("/make-server-b0eae7ae/subscription", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const body = await c.req.json();
    const { plan, billingCycle } = body;

    if (!plan || !billingCycle) {
      return c.json({ error: 'Plan and billing cycle are required' }, 400);
    }

    const paymentData = await kv.get(`payment:${auth.userId}`);

    if (!paymentData) {
      return c.json({ error: 'Subscription not found' }, 404);
    }

    const updatedSubscription = {
      ...paymentData,
      plan,
      billingCycle,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`payment:${auth.userId}`, updatedSubscription);

    console.log(`Subscription updated for user: ${auth.userId} to ${plan} (${billingCycle})`);

    return c.json({ success: true, subscription: updatedSubscription });

  } catch (error) {
    console.error(`Error updating subscription: ${error}`);
    return c.json({ error: `Failed to update subscription: ${error.message}` }, 500);
  }
});

// ============================================================================
// IMPORT ROUTES
// ============================================================================

// Mount import routes from import.tsx
app.route('/make-server-b0eae7ae/import', importApp);

// ============================================================================
// EMAIL TEMPLATES ROUTES
// ============================================================================

// Default email templates
const DEFAULT_TEMPLATES = [
  {
    id: 'casting-call',
    name: 'Casting Call Announcement',
    category: 'Casting',
    subject: 'Casting Call - [Project Name]',
    message: `Dear [Recipient Name],

We are excited to announce a casting call for our upcoming production: [Project Name].

Project Details:
- Production: [Project Name]
- Director: [Director Name]
- Production Company: [Company Name]
- Shoot Dates: [Start Date] - [End Date]
- Location: [Location]

Role Details:
- Character: [Character Name]
- Role Type: [Lead/Supporting/Background]
- Age Range: [Age Range]
- Description: [Character Description]

Audition Information:
- Date: [Audition Date]
- Time: [Audition Time]
- Location: [Audition Location]
- What to Prepare: [Preparation Details]

Please confirm your availability by [Response Deadline].

We look forward to working with you!

Best regards,
[Your Name]
[Production Company]`,
  },
  {
    id: 'production-update',
    name: 'Production Update',
    category: 'Production',
    subject: 'Production Update - [Project Name]',
    message: `Hello Team,

Here's the latest update on [Project Name]:

Schedule Updates:
- [Update 1]
- [Update 2]
- [Update 3]

Location Changes:
- [Location Update]

Call Times:
- Crew Call: [Time]
- Talent Call: [Time]
- First Shot: [Time]

Please review the attached call sheet for full details.

If you have any questions, please don't hesitate to reach out.

Best,
[Your Name]`,
  },
  {
    id: 'crew-callsheet',
    name: 'Crew Call Sheet',
    category: 'Production',
    subject: 'Call Sheet - [Project Name] - [Shoot Date]',
    message: `CALL SHEET
Production: [Project Name]
Date: [Shoot Date]
Director: [Director Name]

CALL TIMES:
- Crew Call: [Time]
- Shooting Call: [Time]
- Estimated Wrap: [Time]

LOCATION:
[Location Name]
[Address]
[Parking Instructions]

SCENES TO BE SHOT:
Scene [Number]: [Description]
Scene [Number]: [Description]

CAST:
- [Actor Name] as [Character] - Call Time: [Time]
- [Actor Name] as [Character] - Call Time: [Time]

WEATHER:
[Weather Forecast]

NOTES:
- [Important Note 1]
- [Important Note 2]

Contact: [Production Manager] - [Phone]`,
  },
  {
    id: 'invoice-followup',
    name: 'Invoice Follow-up',
    category: 'Finance',
    subject: 'Payment Reminder - Invoice #[Invoice Number]',
    message: `Dear [Client Name],

I hope this message finds you well.

This is a friendly reminder that Invoice #[Invoice Number] for [Project Name] is now due.

Invoice Details:
- Invoice Number: [Invoice Number]
- Amount Due: $[Amount]
- Original Due Date: [Due Date]
- Services: [Service Description]

Payment can be made via:
- Bank Transfer: [Bank Details]
- Check: [Mailing Address]
- Online Portal: [Payment Link]

If payment has already been sent, please disregard this message and accept our thanks.

If you have any questions about this invoice, please let me know.

Best regards,
[Your Name]
[Company Name]
[Contact Information]`,
  },
  {
    id: 'location-scout',
    name: 'Location Scout Request',
    category: 'Production',
    subject: 'Location Scout Request - [Project Name]',
    message: `Dear [Location Contact],

We are currently in pre-production for [Project Name] and are interested in scouting your location for potential filming.

Project Information:
- Production: [Project Name]
- Production Company: [Company Name]
- Director: [Director Name]
- Shoot Dates: [Potential Dates]
- Crew Size: [Number] people

Location Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

We would love to schedule a visit to discuss:
- Filming logistics
- Availability
- Rates and fees
- Parking and access
- Power requirements

Would you be available for a scout on [Proposed Date]?

Thank you for your consideration.

Best regards,
[Your Name]
[Title]
[Contact Information]`,
  },
  {
    id: 'vendor-inquiry',
    name: 'Vendor Inquiry',
    category: 'Production',
    subject: 'Equipment/Service Inquiry - [Project Name]',
    message: `Hello,

We are preparing for production on [Project Name] and are interested in your equipment/services.

Production Details:
- Project: [Project Name]
- Shoot Dates: [Start Date] - [End Date]
- Location: [Location]

Requirements:
- [Item/Service 1]
- [Item/Service 2]
- [Item/Service 3]

Could you please provide:
- Availability for these dates
- Pricing/rate card
- Terms and conditions
- Insurance requirements
- Delivery/pickup information

Please let me know if you need any additional information.

Thank you,
[Your Name]
[Production Company]
[Contact Information]`,
  },
  {
    id: 'talent-confirmation',
    name: 'Talent Confirmation',
    category: 'Casting',
    subject: 'Booking Confirmation - [Project Name]',
    message: `Dear [Talent Name],

Congratulations! We are pleased to confirm your booking for [Project Name].

Booking Details:
- Production: [Project Name]
- Role: [Character/Role Name]
- Shoot Date(s): [Dates]
- Rate: $[Amount] per [day/hour/project]

Call Details:
- Date: [Shoot Date]
- Call Time: [Time]
- Location: [Address]
- Parking: [Parking Instructions]

What to Bring:
- [Item 1]
- [Item 2]
- Completed paperwork (attached)

Please confirm receipt of this email and your attendance.

Contact on shoot day: [Production Contact] - [Phone]

We're excited to work with you!

Best regards,
[Your Name]
[Production Company]`,
  },
  {
    id: 'wrap-thank-you',
    name: 'Wrap Thank You',
    category: 'Production',
    subject: 'Thank You - [Project Name] Wrap',
    message: `Dear [Recipient Name],

As we wrap production on [Project Name], I wanted to take a moment to express my sincere gratitude for your incredible work and dedication.

Your contribution as [Role/Position] was invaluable to the success of this project. [Specific accomplishment or quality you appreciated].

Project Highlights:
- [Memorable moment or achievement]
- [Another highlight]

We completed [Number] days of shooting and captured some truly amazing footage. The entire team performed brilliantly, and I couldn't be more proud of what we've accomplished together.

I hope we have the opportunity to collaborate again soon. Please stay in touch!

Warmest regards,
[Your Name]
[Title]
[Production Company]`,
  },
];

// Initialize default templates for a user
async function initializeTemplates(userId: string) {
  try {
    // Check if templates already exist
    const existingTemplates = await kv.getByPrefix(`template:${userId}:`);
    
    if (existingTemplates && existingTemplates.length > 0) {
      console.log(`Templates already initialized for user: ${userId}`);
      return existingTemplates;
    }

    // Create default templates
    const templates = [];
    for (const template of DEFAULT_TEMPLATES) {
      const templateData = {
        ...template,
        userId,
        createdAt: new Date().toISOString(),
        isDefault: true,
      };
      await kv.set(`template:${userId}:${template.id}`, templateData);
      templates.push(templateData);
    }

    console.log(`Initialized ${templates.length} default templates for user: ${userId}`);
    return templates;
  } catch (error) {
    console.error(`Error initializing templates: ${error}`);
    throw error;
  }
}

// Get all templates for a user
app.get("/make-server-b0eae7ae/templates", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    // Get existing templates
    let templates = await kv.getByPrefix(`template:${auth.userId}:`);
    
    // If no templates exist, initialize defaults
    if (!templates || templates.length === 0) {
      templates = await initializeTemplates(auth.userId);
    }

    return c.json({ 
      success: true, 
      templates: templates || [] 
    });

  } catch (error) {
    console.error(`Error fetching templates: ${error}`);
    return c.json({ error: `Failed to fetch templates: ${error.message}` }, 500);
  }
});

// Create custom template
app.post("/make-server-b0eae7ae/templates", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const body = await c.req.json();
    const { name, category, subject, message } = body;

    if (!name || !subject || !message) {
      return c.json({ error: 'Name, subject, and message are required' }, 400);
    }

    const templateId = crypto.randomUUID();
    const template = {
      id: templateId,
      userId: auth.userId,
      name,
      category: category || 'Custom',
      subject,
      message,
      isDefault: false,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`template:${auth.userId}:${templateId}`, template);

    console.log(`Custom template created: ${templateId} for user: ${auth.userId}`);

    return c.json({ success: true, template });

  } catch (error) {
    console.error(`Error creating template: ${error}`);
    return c.json({ error: `Failed to create template: ${error.message}` }, 500);
  }
});

// Update template
app.put("/make-server-b0eae7ae/templates/:templateId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const templateId = c.req.param('templateId');
    const body = await c.req.json();
    
    const existingTemplate = await kv.get(`template:${auth.userId}:${templateId}`);
    
    if (!existingTemplate) {
      return c.json({ error: 'Template not found' }, 404);
    }

    // Don't allow editing default templates
    if (existingTemplate.isDefault) {
      return c.json({ error: 'Cannot edit default templates. Please create a custom template instead.' }, 400);
    }

    const updatedTemplate = {
      ...existingTemplate,
      ...body,
      id: templateId,
      userId: auth.userId,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`template:${auth.userId}:${templateId}`, updatedTemplate);

    return c.json({ success: true, template: updatedTemplate });

  } catch (error) {
    console.error(`Error updating template: ${error}`);
    return c.json({ error: `Failed to update template: ${error.message}` }, 500);
  }
});

// Delete template
app.delete("/make-server-b0eae7ae/templates/:templateId", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const templateId = c.req.param('templateId');
    const existingTemplate = await kv.get(`template:${auth.userId}:${templateId}`);
    
    if (!existingTemplate) {
      return c.json({ error: 'Template not found' }, 404);
    }

    // Don't allow deleting default templates
    if (existingTemplate.isDefault) {
      return c.json({ error: 'Cannot delete default templates.' }, 400);
    }

    await kv.del(`template:${auth.userId}:${templateId}`);

    console.log(`Template deleted: ${templateId}`);

    return c.json({ success: true });

  } catch (error) {
    console.error(`Error deleting template: ${error}`);
    return c.json({ error: `Failed to delete template: ${error.message}` }, 500);
  }
});

// ============================================================================
// GLOBAL COLLECTION ENDPOINTS (for dashboard stats and calendar)
// ============================================================================

// Get all actors across all projects for a user
app.get("/make-server-b0eae7ae/actors", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const actors = await kv.getByPrefix(`actor:${auth.userId}:`);
    
    return c.json({ success: true, actors: actors || [] });

  } catch (error) {
    console.error(`Error fetching all actors: ${error}`);
    return c.json({ error: `Failed to fetch actors: ${error.message}` }, 500);
  }
});

// Get all crew across all projects for a user
app.get("/make-server-b0eae7ae/crew", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const crew = await kv.getByPrefix(`crew:${auth.userId}:`);
    
    return c.json({ success: true, crew: crew || [] });

  } catch (error) {
    console.error(`Error fetching all crew: ${error}`);
    return c.json({ error: `Failed to fetch crew: ${error.message}` }, 500);
  }
});

// Get all bookings across all projects for a user
app.get("/make-server-b0eae7ae/bookings", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const bookings = await kv.getByPrefix(`booking:${auth.userId}:`);
    
    return c.json({ success: true, bookings: bookings || [] });

  } catch (error) {
    console.error(`Error fetching all bookings: ${error}`);
    return c.json({ error: `Failed to fetch bookings: ${error.message}` }, 500);
  }
});

// Get all deals across all projects for a user
app.get("/make-server-b0eae7ae/deals", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const deals = await kv.getByPrefix(`deal:${auth.userId}:`);
    
    return c.json({ success: true, deals: deals || [] });

  } catch (error) {
    console.error(`Error fetching all deals: ${error}`);
    return c.json({ error: `Failed to fetch deals: ${error.message}` }, 500);
  }
});

// Get all companies for a user
app.get("/make-server-b0eae7ae/companies", async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth.error) return c.json({ error: auth.error }, auth.status);

    const companies = await kv.getByPrefix(`company:${auth.userId}:`);
    
    return c.json({ success: true, companies: companies || [] });

  } catch (error) {
    console.error(`Error fetching all companies: ${error}`);
    return c.json({ error: `Failed to fetch companies: ${error.message}` }, 500);
  }
});

// ============================================================================
// EMAIL ROUTES
// ============================================================================

// Mount email routes from email.tsx
app.route('/make-server-b0eae7ae/email', emailApp);

Deno.serve(app.fetch);