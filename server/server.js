require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection configuration
let pool;
if (process.env.DATABASE_URL) {
  // Check if connection string already includes SSL parameters
  const connectionString = process.env.DATABASE_URL;
  const hasSSL = connectionString.includes('sslmode=');
  
  pool = new Pool({
    connectionString: connectionString,
    ssl: hasSSL ? undefined : {
      rejectUnauthorized: false // Required for Neon if not using trusted certs
    }
  });
  
  // Test connection
  pool.query('SELECT NOW()')
    .then(() => console.log('✅ Database connected successfully'))
    .catch(err => console.error('❌ Database connection error:', err.message));
} else {
  console.error('❌ DATABASE_URL is not set in .env file!');
  console.error('Please configure server/.env with your Neon database connection string.');
  // Create a dummy pool that will fail gracefully
  pool = new Pool({
    connectionString: 'postgresql://dummy:dummy@localhost/dummy'
  });
}

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads', 'reviews');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件 (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// CORS configuration - allow requests from frontend
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:5173',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:5173',
    /^http:\/\/192\.168\.\d+\.\d+:8080$/,  // Allow any local network IP on port 8080
    /^http:\/\/192\.168\.\d+\.\d+:5173$/,  // Allow any local network IP on port 5173
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Middleware to get user ID from Clerk (if authenticated)
const getUserFromClerk = (req, res, next) => {
  if (req.auth && req.auth.userId) {
    req.userId = req.auth.userId;
  } else {
    req.userId = null;
  }
  next();
};

// --- Study Spaces API ---
app.get('/api/study-spaces', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM study_spaces ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching study spaces:', error);
    res.status(500).json({ error: 'Failed to fetch study spaces' });
  }
});

app.get('/api/study-spaces/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM study_spaces WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Study space not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching study space:', error);
    res.status(500).json({ error: 'Failed to fetch study space' });
  }
});

// --- Reviews API ---
app.get('/api/areas/:areaId/reviews', async (req, res) => {
  const { areaId } = req.params;
  try {
    const result = await pool.query(
      `SELECT r.*, p.full_name as author_name, p.avatar_url
       FROM reviews r
       LEFT JOIN profiles p ON r.user_id::text = p.id::text
       WHERE r.area_id = $1
       ORDER BY r.created_at DESC`,
      [areaId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Upload photos endpoint (before creating review)
app.post('/api/reviews/upload-photos', ClerkExpressRequireAuth(), getUserFromClerk, upload.array('photos', 9), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const photoUrls = req.files.map(file => {
      // Return URL that can be accessed from frontend
      const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
      return `${baseUrl}/uploads/reviews/${file.filename}`;
    });

    res.json({ photoUrls });
  } catch (error) {
    console.error('Error uploading photos:', error);
    res.status(500).json({ error: 'Failed to upload photos' });
  }
});

app.post('/api/areas/:areaId/reviews', ClerkExpressRequireAuth(), getUserFromClerk, async (req, res) => {
  const { areaId } = req.params;
  const { rating, content, comment, photos } = req.body;
  const userId = req.userId; // From Clerk
  const author = req.auth.user.fullName || req.auth.user.firstName || req.auth.user.emailAddresses[0]?.emailAddress || 'Anonymous';

  if (!userId || !rating) {
    return res.status(400).json({ error: 'User ID and rating are required' });
  }

  try {
    // Ensure profile exists (Clerk user ID is TEXT)
    await pool.query(
      'INSERT INTO profiles (id, email, full_name) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, full_name = EXCLUDED.full_name',
      [userId, req.auth.user.emailAddresses[0]?.emailAddress, req.auth.user.fullName]
    );

    const result = await pool.query(
      'INSERT INTO reviews (area_id, user_id, author, rating, content, photos) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [areaId, userId, author, rating, content || comment || null, photos || []]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

app.put('/api/reviews/:reviewId/helpful', ClerkExpressRequireAuth(), getUserFromClerk, async (req, res) => {
  const { reviewId } = req.params;
  try {
    const result = await pool.query(
      'UPDATE reviews SET helpful = helpful + 1 WHERE id = $1 RETURNING helpful',
      [reviewId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ helpful: result.rows[0].helpful });
  } catch (error) {
    console.error('Error updating helpful count:', error);
    res.status(500).json({ error: 'Failed to update helpful count' });
  }
});

app.delete('/api/reviews/:reviewId', ClerkExpressRequireAuth(), getUserFromClerk, async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.userId;

  try {
    const result = await pool.query(
      'DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING id',
      [reviewId, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found or user not authorized' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// --- Favorites API ---
app.get('/api/users/:userId/favorites', ClerkExpressRequireAuth(), getUserFromClerk, async (req, res) => {
  const { userId } = req.params;
  if (req.userId !== userId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  try {
    const result = await pool.query(
      `SELECT f.id, f.space_id, s.*
       FROM favorites f
       JOIN study_spaces s ON f.space_id = s.id
       WHERE f.user_id = $1`,
      [userId]
    );
    // Transform to match frontend expectations
    const favorites = result.rows.map(row => ({
      id: row.id,
      space_id: row.space_id,
      study_spaces: {
        id: row.id,
        name: row.name,
        building: row.building,
        campus: row.campus,
        description: row.description,
        image_url: row.image_url,
        // ... other fields
      }
    }));
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

app.post('/api/users/:userId/favorites', ClerkExpressRequireAuth(), getUserFromClerk, async (req, res) => {
  const { userId } = req.params;
  const { spaceId } = req.body;
  if (req.userId !== userId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  if (!spaceId) {
    return res.status(400).json({ error: 'spaceId is required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO favorites (user_id, space_id) VALUES ($1, $2) ON CONFLICT (user_id, space_id) DO NOTHING RETURNING *',
      [userId, spaceId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

app.delete('/api/users/:userId/favorites/:spaceId', ClerkExpressRequireAuth(), getUserFromClerk, async (req, res) => {
  const { userId, spaceId } = req.params;
  if (req.userId !== userId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  try {
    const result = await pool.query(
      'DELETE FROM favorites WHERE user_id = $1 AND space_id = $2 RETURNING id',
      [userId, spaceId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Favorite not found or user not authorized' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ error: 'Failed to delete favorite' });
  }
});

// --- Submissions API ---
// Get all submissions (for admin review)
app.get('/api/submissions', ClerkExpressRequireAuth(), getUserFromClerk, async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT s.*, p.full_name as submitter_name, p.email as submitter_email FROM submissions s LEFT JOIN profiles p ON s.user_id = p.id';
    const params = [];
    
    if (status) {
      query += ' WHERE s.status = $1';
      params.push(status);
    }
    
    query += ' ORDER BY s.created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Get single submission
app.get('/api/submissions/:id', ClerkExpressRequireAuth(), getUserFromClerk, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT s.*, p.full_name as submitter_name, p.email as submitter_email FROM submissions s LEFT JOIN profiles p ON s.user_id = p.id WHERE s.id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ error: 'Failed to fetch submission' });
  }
});

// Create submission
app.post('/api/submissions', ClerkExpressRequireAuth(), getUserFromClerk, async (req, res) => {
  const userId = req.userId;
  const { name, building, campus, description, noise_level, privacy_level, amenities, photos } = req.body;

  if (!userId || !name || !building || !campus) {
    return res.status(400).json({ error: 'User ID, name, building, and campus are required for submission' });
  }

  try {
    // Check if photos column exists, if not, insert without it
    // For now, we'll try to insert with photos, and if it fails due to column not existing, we'll insert without it
    let result;
    try {
      result = await pool.query(
        'INSERT INTO submissions (user_id, name, building, campus, description, noise_level, privacy_level, amenities, photos, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [userId, name, building, campus, description, noise_level, privacy_level, amenities || [], photos || [], 'pending']
      );
    } catch (columnError) {
      // If photos column doesn't exist, insert without it
      if (columnError.code === '42703' || columnError.message.includes('column "photos"')) {
        console.log('Photos column not found, inserting without photos');
        result = await pool.query(
          'INSERT INTO submissions (user_id, name, building, campus, description, noise_level, privacy_level, amenities, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
          [userId, name, building, campus, description, noise_level, privacy_level, amenities || [], 'pending']
        );
      } else {
        throw columnError;
      }
    }
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ error: 'Failed to create submission' });
  }
});

// Update submission status
app.put('/api/submissions/:id/status', ClerkExpressRequireAuth(), getUserFromClerk, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Valid status (pending, approved, rejected) is required' });
  }

  try {
    const result = await pool.query(
      'UPDATE submissions SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating submission status:', error);
    res.status(500).json({ error: 'Failed to update submission status' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Study Spaces API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Network access: http://192.168.0.185:${PORT}/api/health`);
});

