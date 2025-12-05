import { Hono } from "npm:hono";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client for server-side operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Get Resend API key from environment
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

// Helper function to check if domain is verified in Resend
async function checkDomainVerification(domain: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return false;
  }

  try {
    // Call Resend API to get domain info
    const response = await fetch(`https://api.resend.com/domains`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch domains from Resend');
      return false;
    }

    const result = await response.json();
    const domains = result.data || [];
    
    // Find the domain and check if it's verified
    const domainInfo = domains.find((d: any) => d.name === domain);
    
    if (!domainInfo) {
      return false;
    }

    // Check if domain has verified status
    return domainInfo.status === 'verified';
  } catch (error) {
    console.error('Error checking domain verification:', error);
    return false;
  }
}

// Webhook endpoint for inbound emails from Resend
app.post('/webhook/inbound', async (c) => {
  try {
    console.log('📨 === INBOUND EMAIL WEBHOOK RECEIVED ===');
    
    const body = await c.req.json();
    console.log('📧 Inbound email data:', JSON.stringify(body, null, 2));
    
    // Resend sends webhooks with this structure:
    // {
    //   type: 'email.received',
    //   created_at: '2024-01-01T00:00:00.000Z',
    //   data: {
    //     from: 'sender@example.com',
    //     to: ['recipient@yourdomain.com'],
    //     subject: 'Re: Your subject',
    //     html: '<p>Email content</p>',
    //     text: 'Email content',
    //     headers: {...},
    //     attachments: [...]
    //   }
    // }
    
    if (body.type === 'email.received') {
      const emailData = body.data;
      
      console.log('📬 Processing inbound email from:', emailData.from);
      
      // Extract sender email
      const fromEmail = emailData.from;
      
      // Find which user this email is intended for
      // (based on the 'to' field - you may need to customize this logic)
      const toEmail = Array.isArray(emailData.to) ? emailData.to[0] : emailData.to;
      
      // For now, we'll search for users who have sent emails to this sender
      // In production, you might want a better routing mechanism
      const allEmailKeys = await kv.getByPrefix('email:');
      let targetUserId = null;
      
      // Find the user who recently sent an email to this sender
      for (const key of allEmailKeys) {
        const email = await kv.get(key);
        if (email && email.to && email.to.includes(fromEmail)) {
          targetUserId = email.userId;
          break;
        }
      }
      
      if (!targetUserId) {
        console.log('⚠️ Could not find user for inbound email from:', fromEmail);
        // Still store it, we can show "unmatched" emails in UI later
        targetUserId = 'unmatched';
      }
      
      // Store inbound email in history
      const emailId = `email:${targetUserId}:${Date.now()}`;
      const emailRecord = {
        id: emailId,
        userId: targetUserId,
        from: fromEmail,
        to: Array.isArray(emailData.to) ? emailData.to : [emailData.to],
        cc: emailData.cc || [],
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
        headers: emailData.headers,
        attachments: emailData.attachments || [],
        receivedAt: new Date().toISOString(),
        status: 'received',
      };
      
      await kv.set(emailId, emailRecord);
      
      // Add to user's email history list
      if (targetUserId !== 'unmatched') {
        const userEmailsKey = `user:${targetUserId}:emails`;
        const existingEmails = await kv.get(userEmailsKey) || [];
        existingEmails.unshift(emailId);
        
        if (existingEmails.length > 500) {
          existingEmails.length = 500;
        }
        
        await kv.set(userEmailsKey, existingEmails);
      }
      
      console.log('✅ Inbound email stored successfully:', emailId);
      
      return c.json({
        success: true,
        message: 'Inbound email processed',
        emailId,
      });
    }
    
    console.log('ℹ️ Unknown webhook type:', body.type);
    return c.json({ success: true, message: 'Webhook received' });
    
  } catch (error: any) {
    console.error('❌ Error processing inbound email webhook:', error);
    return c.json({ 
      error: 'Failed to process inbound email', 
      message: error.message 
    }, 500);
  }
});

// Send email via Resend API
app.post('/send', async (c) => {
  try {
    console.log('📧 === EMAIL SEND REQUEST RECEIVED ===');
    
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    console.log('🔐 Verifying authentication...');
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      console.error('❌ Authentication error while sending email:', authError);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    console.log('✅ User authenticated:', user.id);

    // Parse request body
    const body = await c.req.json();
    const { to, cc, bcc, subject, html, text, from, replyTo } = body;
    
    console.log('📝 Email details:', {
      to: Array.isArray(to) ? to : [to],
      cc: cc || 'none',
      bcc: bcc || 'none',
      subject,
      from: from || 'default',
      hasHtml: !!html,
      hasText: !!text,
    });

    // Validate required fields
    if (!to || to.length === 0) {
      console.error('❌ No recipient provided');
      return c.json({ error: 'Recipient email address is required' }, 400);
    }

    if (!subject) {
      console.error('❌ No subject provided');
      return c.json({ error: 'Email subject is required' }, 400);
    }

    if (!html && !text) {
      console.error('❌ No email body provided');
      return c.json({ error: 'Email body is required' }, 400);
    }

    // Check if Resend API key is configured
    if (!RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY environment variable not set');
      return c.json({ 
        error: 'Email service not configured', 
        message: 'Please add your Resend API key to environment variables' 
      }, 500);
    }

    console.log('✅ Resend API key found');

    // Prepare email data for Resend
    const emailData: any = {
      from: from || 'FilmLot360 <onboarding@resend.dev>', // Use Resend sandbox for testing
      to: Array.isArray(to) ? to : [to],
      subject,
      html: html || text,
    };

    if (cc && cc.length > 0) {
      emailData.cc = Array.isArray(cc) ? cc : [cc];
    }

    if (bcc && bcc.length > 0) {
      emailData.bcc = Array.isArray(bcc) ? bcc : [bcc];
    }

    if (replyTo) {
      emailData.reply_to = replyTo;
    }

    if (text && html) {
      emailData.text = text;
    }

    console.log('📤 Sending email via Resend API:', { 
      to: emailData.to, 
      subject,
      from: emailData.from 
    });

    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();
    console.log('📬 Resend API response:', { status: response.status, result });

    if (!response.ok) {
      console.error('❌ Resend API error:', result);
      return c.json({ 
        error: 'Failed to send email', 
        message: result.message || 'Unknown error from email service',
        details: result,
      }, response.status);
    }

    console.log('✅ Email sent successfully via Resend! ID:', result.id);

    // Store email in history
    const emailId = `email:${user.id}:${Date.now()}`;
    const emailRecord = {
      id: emailId,
      userId: user.id,
      resendId: result.id,
      to: emailData.to,
      cc: emailData.cc || [],
      bcc: emailData.bcc || [],
      subject,
      html,
      text,
      from: emailData.from,
      replyTo: emailData.reply_to,
      sentAt: new Date().toISOString(),
      status: 'sent',
    };

    await kv.set(emailId, emailRecord);

    // Add to user's email history list
    const userEmailsKey = `user:${user.id}:emails`;
    const existingEmails = await kv.get(userEmailsKey) || [];
    existingEmails.unshift(emailId); // Add to beginning
    
    // Keep only last 500 emails
    if (existingEmails.length > 500) {
      existingEmails.length = 500;
    }
    
    await kv.set(userEmailsKey, existingEmails);

    return c.json({
      success: true,
      emailId,
      resendId: result.id,
      message: 'Email sent successfully',
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    return c.json({ 
      error: 'Failed to send email', 
      message: error.message 
    }, 500);
  }
});

// Get email history for user
app.get('/history', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      console.error('Authentication error while fetching email history:', authError);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get user's email history
    const userEmailsKey = `user:${user.id}:emails`;
    const emailIds = await kv.get(userEmailsKey) || [];

    // Fetch email records
    const emails = await kv.mget(emailIds);

    return c.json({
      success: true,
      emails: emails.filter(e => e !== null),
      count: emails.length,
    });

  } catch (error: any) {
    console.error('Error fetching email history:', error);
    return c.json({ 
      error: 'Failed to fetch email history', 
      message: error.message 
    }, 500);
  }
});

// Get user's domain settings (MUST be before /:emailId route)
app.get('/domain', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get user's domain from KV store
    const domainKey = `user:${user.id}:email:domain`;
    const domainSettings = await kv.get(domainKey) || { domain: '', verified: false };

    return c.json({
      success: true,
      domain: domainSettings.domain || '',
      verified: domainSettings.verified || false,
    });

  } catch (error: any) {
    console.error('Error fetching domain settings:', error);
    return c.json({ 
      error: 'Failed to fetch domain settings', 
      message: error.message 
    }, 500);
  }
});

// Save user's domain settings (MUST be before /:emailId route)
app.post('/domain', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { domain } = body;

    if (!domain) {
      return c.json({ error: 'Domain is required' }, 400);
    }

    // Validate domain format
    const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/i;
    if (!domainRegex.test(domain)) {
      return c.json({ error: 'Invalid domain format' }, 400);
    }

    // Check if domain is verified in Resend
    const isVerified = await checkDomainVerification(domain);

    // Save to KV store
    const domainKey = `user:${user.id}:email:domain`;
    const domainSettings = {
      domain,
      verified: isVerified,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(domainKey, domainSettings);

    return c.json({
      success: true,
      domain,
      verified: isVerified,
      message: isVerified 
        ? 'Domain saved and verified successfully' 
        : 'Domain saved. Please verify it in Resend to use it for sending emails.',
    });

  } catch (error: any) {
    console.error('Error saving domain settings:', error);
    return c.json({ 
      error: 'Failed to save domain settings', 
      message: error.message 
    }, 500);
  }
});

// Verify domain status (MUST be before /:emailId route)
app.post('/domain/verify', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { domain } = body;

    if (!domain) {
      return c.json({ error: 'Domain is required' }, 400);
    }

    // Check if domain is verified in Resend
    const isVerified = await checkDomainVerification(domain);

    // Update verification status in KV store
    const domainKey = `user:${user.id}:email:domain`;
    const existingSettings = await kv.get(domainKey) || {};
    
    const domainSettings = {
      ...existingSettings,
      domain,
      verified: isVerified,
      lastChecked: new Date().toISOString(),
    };

    await kv.set(domainKey, domainSettings);

    return c.json({
      success: true,
      domain,
      verified: isVerified,
      message: isVerified 
        ? 'Domain is verified and ready to use!' 
        : 'Domain is not yet verified in Resend. Please check your DNS settings.',
    });

  } catch (error: any) {
    console.error('Error verifying domain:', error);
    return c.json({ 
      error: 'Failed to verify domain', 
      message: error.message 
    }, 500);
  }
});

// Get single email by ID (MUST be after specific routes like /domain)
app.get('/:emailId', async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      console.error('Authentication error while fetching email:', authError);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const emailId = c.req.param('emailId');
    const email = await kv.get(emailId);

    if (!email) {
      return c.json({ error: 'Email not found' }, 404);
    }

    // Verify ownership
    if (email.userId !== user.id) {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    return c.json({
      success: true,
      email,
    });

  } catch (error: any) {
    console.error('Error fetching email:', error);
    return c.json({ 
      error: 'Failed to fetch email', 
      message: error.message 
    }, 500);
  }
});

export default app;