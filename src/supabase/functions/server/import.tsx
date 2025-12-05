import { Hono } from "npm:hono";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client for server-side operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Bucket name for storing imported files
const BUCKET_NAME = 'make-b0eae7ae-imports';

// FilmLot360 API base URL
const FILMLOT_API_URL = 'https://api.filmlot360.com';

// Helper to call FilmLot360 API
async function callFilmLotAPI(endpoint: string, method: string, data: any, accessToken: string) {
  try {
    const response = await fetch(`${FILMLOT_API_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`FilmLot API call failed for ${endpoint}:`, error);
    throw error;
  }
}

// Detect collection type from headers/data
function detectCollectionType(headers: string[], fileName: string): string {
  const lowerHeaders = headers.map(h => h.toLowerCase());
  const lowerFileName = fileName.toLowerCase();

  // Check for actor-related fields
  if (lowerHeaders.some(h => h.includes('actor') || h.includes('talent') || h.includes('cast')) ||
      lowerFileName.includes('actor') || lowerFileName.includes('cast') || lowerFileName.includes('talent')) {
    return 'actors';
  }

  // Check for crew-related fields
  if (lowerHeaders.some(h => h.includes('crew') || h.includes('department') || h.includes('role')) ||
      lowerFileName.includes('crew') || lowerFileName.includes('staff')) {
    return 'crew';
  }

  // Check for project-related fields
  if (lowerHeaders.some(h => h.includes('project') || h.includes('production') || h.includes('budget')) ||
      lowerFileName.includes('project') || lowerFileName.includes('production')) {
    return 'projects';
  }

  // Check for location-related fields
  if (lowerHeaders.some(h => h.includes('location') || h.includes('address') || h.includes('venue')) ||
      lowerFileName.includes('location')) {
    return 'locations';
  }

  // Default to projects
  return 'projects';
}

// Map parsed data to FilmLot360 collection format
function mapToCollectionFormat(records: any[], collectionType: string): any[] {
  return records.map(record => {
    const mapped: any = {};

    switch (collectionType) {
      case 'actors':
        // Map to Actor format
        mapped.name = record.name || record.Name || record.actor || record.Actor || 'Unknown';
        mapped.email = record.email || record.Email || '';
        mapped.phone = record.phone || record.Phone || record.mobile || record.Mobile || '';
        mapped.role = record.role || record.Role || record.character || record.Character || '';
        mapped.agent = record.agent || record.Agent || '';
        mapped.status = record.status || record.Status || 'Available';
        mapped.notes = record.notes || record.Notes || '';
        break;

      case 'crew':
        // Map to Crew format
        mapped.name = record.name || record.Name || record.crew || record.Crew || 'Unknown';
        mapped.email = record.email || record.Email || '';
        mapped.phone = record.phone || record.Phone || record.mobile || record.Mobile || '';
        mapped.department = record.department || record.Department || record.role || record.Role || 'General';
        mapped.position = record.position || record.Position || record.title || record.Title || '';
        mapped.rate = record.rate || record.Rate || record.salary || record.Salary || '';
        mapped.status = record.status || record.Status || 'Available';
        mapped.notes = record.notes || record.Notes || '';
        break;

      case 'projects':
        // Map to Project format
        mapped.name = record.name || record.Name || record.project || record.Project || record.title || record.Title || 'Untitled Project';
        mapped.description = record.description || record.Description || record.synopsis || record.Synopsis || '';
        mapped.status = record.status || record.Status || 'In Development';
        mapped.startDate = record.startDate || record['Start Date'] || record.start_date || '';
        mapped.endDate = record.endDate || record['End Date'] || record.end_date || '';
        mapped.budget = record.budget || record.Budget || '';
        mapped.producer = record.producer || record.Producer || '';
        mapped.director = record.director || record.Director || '';
        break;

      case 'locations':
        // Map to Location format
        mapped.name = record.name || record.Name || record.location || record.Location || 'Unknown Location';
        mapped.address = record.address || record.Address || '';
        mapped.city = record.city || record.City || '';
        mapped.state = record.state || record.State || '';
        mapped.country = record.country || record.Country || '';
        mapped.contactPerson = record.contactPerson || record['Contact Person'] || record.contact || '';
        mapped.phone = record.phone || record.Phone || '';
        mapped.notes = record.notes || record.Notes || '';
        break;

      default:
        // Generic mapping
        Object.keys(record).forEach(key => {
          mapped[key] = record[key];
        });
    }

    return mapped;
  });
}

// Initialize storage bucket
async function ensureBucketExists() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: 10485760, // 10MB
      });
      
      if (error) {
        console.error('Error creating bucket:', error);
      } else {
        console.log(`Bucket ${BUCKET_NAME} created successfully`);
      }
    }
  } catch (error) {
    console.error('Error ensuring bucket exists:', error);
  }
}

// Call on startup
ensureBucketExists();

// Sanitize data to remove problematic characters for JSON storage
function sanitizeForStorage(data: any): any {
  if (typeof data === 'string') {
    // Remove or escape problematic characters
    return data
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
      .replace(/\\/g, '\\\\') // Escape backslashes
      .replace(/\n/g, '\\n') // Escape newlines
      .replace(/\r/g, '\\r') // Escape carriage returns
      .replace(/\t/g, '\\t') // Escape tabs
      .substring(0, 10000); // Limit string length to prevent huge storage
  } else if (Array.isArray(data)) {
    return data.slice(0, 1000).map(item => sanitizeForStorage(item)); // Limit array size
  } else if (data && typeof data === 'object') {
    const sanitized: any = {};
    let count = 0;
    for (const [key, value] of Object.entries(data)) {
      if (count++ > 100) break; // Limit object properties
      const cleanKey = sanitizeForStorage(key);
      sanitized[cleanKey] = sanitizeForStorage(value);
    }
    return sanitized;
  }
  return data;
}

// Parse CSV content
function parseCSV(content: string): any[] {
  const lines = content.trim().split('\n');
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const records = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const record: any = {};
    
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    
    records.push(record);
  }
  
  return records;
}

// Parse Excel/spreadsheet content (simplified - extracts text)
function parseSpreadsheet(content: string): any[] {
  // For now, treat as CSV-like content
  // In production, you'd use a library like xlsx
  return parseCSV(content);
}

// Parse Word document (simplified - extracts text)
function parseWord(content: string): any[] {
  // Extract text content and structure it
  const lines = content.split('\n').filter(line => line.trim());
  
  return lines.map((line, index) => ({
    lineNumber: index + 1,
    content: line.trim(),
  }));
}

// Parse PDF (simplified - extracts text)
function parsePDF(content: string): any[] {
  // In production, you'd use a PDF parsing library
  // For now, return structured text
  const lines = content.split('\n').filter(line => line.trim());
  
  return lines.map((line, index) => ({
    pageContent: line.trim(),
    line: index + 1,
  }));
}

// Import route
app.post('/make-server-b0eae7ae/import', async (c) => {
  try {
    // Get authorization token
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Authentication error:', authError);
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    // Get the uploaded file from form data
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file uploaded' }, 400);
    }

    console.log(`Processing file upload: ${file.name}, type: ${file.type}, size: ${file.size}`);

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];

    if (!validTypes.includes(file.type)) {
      return c.json({ 
        error: 'Invalid file type', 
        message: 'Please upload PDF, Word, Excel, or CSV files only' 
      }, 400);
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return c.json({ 
        error: 'File too large', 
        message: 'Maximum file size is 10MB' 
      }, 400);
    }

    // Read file content
    const fileContent = await file.text();
    
    // Parse file based on type
    let parsedData: any[] = [];
    let dataType = 'unknown';
    
    if (file.type === 'text/csv') {
      parsedData = parseCSV(fileContent);
      dataType = 'csv';
    } else if (file.type.includes('spreadsheet') || file.type.includes('excel')) {
      parsedData = parseSpreadsheet(fileContent);
      dataType = 'spreadsheet';
    } else if (file.type.includes('word') || file.type.includes('msword')) {
      parsedData = parseWord(fileContent);
      dataType = 'document';
    } else if (file.type === 'application/pdf') {
      parsedData = parsePDF(fileContent);
      dataType = 'pdf';
    }

    // Detect collection type
    const headers = parsedData.length > 0 ? Object.keys(parsedData[0]) : [];
    const collectionType = detectCollectionType(headers, file.name);

    // Map parsed data to FilmLot360 collection format
    const mappedData = mapToCollectionFormat(parsedData, collectionType);

    // Create records in FilmLot360 API
    let createdCount = 0;
    let failedCount = 0;
    const errors: string[] = [];

    if (mappedData.length > 0 && (collectionType === 'actors' || collectionType === 'crew' || collectionType === 'projects' || collectionType === 'locations')) {
      console.log(`Creating ${mappedData.length} records in ${collectionType} collection`);
      
      for (const record of mappedData) {
        try {
          await callFilmLotAPI(`/${collectionType}`, 'POST', record, token);
          createdCount++;
        } catch (error: any) {
          failedCount++;
          errors.push(`Failed to create record: ${error.message}`);
          console.error(`Failed to create ${collectionType} record:`, error);
        }
      }

      console.log(`Successfully created ${createdCount} records, ${failedCount} failed`);
    }

    // Store file in Supabase Storage
    const fileName = `${user.id}/${Date.now()}-${file.name}`;
    const fileBuffer = await file.arrayBuffer();
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return c.json({ 
        error: 'Failed to store file', 
        message: uploadError.message 
      }, 500);
    }

    // Create signed URL for the file (valid for 1 year)
    const { data: signedUrlData } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(fileName, 31536000);

    // Store import metadata and parsed data in KV store
    const importId = `import:${user.id}:${Date.now()}`;
    const importData = {
      id: importId,
      userId: user.id,
      fileName: sanitizeForStorage(file.name),
      fileType: file.type,
      fileSize: file.size,
      dataType,
      storagePath: fileName,
      signedUrl: signedUrlData?.signedUrl || '',
      parsedData: sanitizeForStorage(parsedData),
      recordsCount: parsedData.length,
      uploadedAt: new Date().toISOString(),
    };

    await kv.set(importId, importData);

    // Also store a reference in the user's imports list
    const userImportsKey = `user:${user.id}:imports`;
    const existingImports = await kv.get(userImportsKey) || [];
    existingImports.push(importId);
    await kv.set(userImportsKey, existingImports);

    console.log(`Import successful: ${importId}, records: ${parsedData.length}`);

    return c.json({
      success: true,
      importId,
      fileName: file.name,
      recordsCount: parsedData.length,
      dataType,
      collectionType,
      createdCount,
      failedCount,
      errors: errors.length > 0 ? errors.slice(0, 5) : [], // Return first 5 errors if any
      uploadedAt: importData.uploadedAt,
    });

  } catch (error: any) {
    console.error('Import error:', error);
    return c.json({ 
      error: 'Import failed', 
      message: error.message || 'An unexpected error occurred' 
    }, 500);
  }
});

// Get user's imports
app.get('/make-server-b0eae7ae/imports', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userImportsKey = `user:${user.id}:imports`;
    const importIds = await kv.get(userImportsKey) || [];
    
    const imports = await kv.mget(importIds);

    return c.json({
      success: true,
      imports,
    });

  } catch (error: any) {
    console.error('Error fetching imports:', error);
    return c.json({ 
      error: 'Failed to fetch imports', 
      message: error.message 
    }, 500);
  }
});

// Get specific import details
app.get('/make-server-b0eae7ae/imports/:importId', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const importId = c.req.param('importId');
    const importData = await kv.get(importId);

    if (!importData) {
      return c.json({ error: 'Import not found' }, 404);
    }

    // Verify the import belongs to the user
    if (importData.userId !== user.id) {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    return c.json({
      success: true,
      import: importData,
    });

  } catch (error: any) {
    console.error('Error fetching import:', error);
    return c.json({ 
      error: 'Failed to fetch import', 
      message: error.message 
    }, 500);
  }
});

export default app;