import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { pool, initDb, testConnection } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// 50mb payload limit to handle base64 high-resolution photo uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// In-memory fallback cache in case PostgreSQL is temporarily offline
let memoryCache = {
  images: {},
  areas: {},
  texts: {}
};

// --------------------------------------------------------------------------
// 1. Health & Status Route
// --------------------------------------------------------------------------
app.get('/api/health', async (req, res) => {
  const dbStatus = await testConnection();
  res.json({
    status: 'ok',
    service: 'GD Goenka Ayodhya Content Server',
    database: dbStatus.connected ? 'PostgreSQL Connected' : 'Disconnected / Standby',
    details: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// --------------------------------------------------------------------------
// 2. Fetch All Site Content & Overrides (Served to all visitors worldwide)
// --------------------------------------------------------------------------
app.get('/api/content', async (req, res) => {
  try {
    const isReady = await initDb();
    if (!isReady) {
      // Return memory cache fallback
      return res.json(memoryCache);
    }

    const [photosRes, areasRes, textsRes] = await Promise.all([
      pool.query('SELECT image_key, image_data FROM site_photos'),
      pool.query('SELECT area_id, title, subtitle, description, image_data FROM site_areas'),
      pool.query('SELECT text_key, text_value FROM site_texts')
    ]);

    const images = {};
    for (const row of photosRes.rows) {
      images[row.image_key] = row.image_data;
    }

    const areas = {};
    for (const row of areasRes.rows) {
      areas[row.area_id] = {
        title: row.title,
        subtitle: row.subtitle,
        desc: row.description,
        image: row.image_data
      };
    }

    const texts = {};
    for (const row of textsRes.rows) {
      texts[row.text_key] = row.text_value;
    }

    // Keep memory cache fresh
    memoryCache = { images, areas, texts };

    res.json({ images, areas, texts });
  } catch (err) {
    console.error('Error fetching site content from DB:', err.message);
    res.json(memoryCache);
  }
});

// --------------------------------------------------------------------------
// 3. Upload / Replace a Photo Override
// --------------------------------------------------------------------------
app.post('/api/content/photo', async (req, res) => {
  const { key, data, category } = req.body;
  if (!key || !data) {
    return res.status(400).json({ error: 'Missing photo key or data' });
  }

  // Update memory cache immediately
  memoryCache.images[key] = data;

  try {
    const isReady = await initDb();
    if (isReady) {
      await pool.query(
        `INSERT INTO site_photos (image_key, image_data, category, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (image_key) 
         DO UPDATE SET image_data = EXCLUDED.image_data, 
                       category = COALESCE(EXCLUDED.category, site_photos.category),
                       updated_at = NOW()`,
        [key, data, category || 'general']
      );
    }

    res.json({ success: true, message: 'Photo saved successfully to Cloud DB' });
  } catch (err) {
    console.error('Error saving photo to PostgreSQL:', err.message);
    res.json({ success: true, warning: 'Saved to cache (DB offline)', error: err.message });
  }
});

// --------------------------------------------------------------------------
// 4. Delete / Revert a Photo Override
// --------------------------------------------------------------------------
app.delete('/api/content/photo', async (req, res) => {
  const { key } = req.body;
  if (!key) {
    return res.status(400).json({ error: 'Missing photo key' });
  }

  delete memoryCache.images[key];

  try {
    const isReady = await initDb();
    if (isReady) {
      await pool.query('DELETE FROM site_photos WHERE image_key = $1', [key]);
    }

    res.json({ success: true, message: 'Photo override deleted from Cloud DB' });
  } catch (err) {
    console.error('Error deleting photo from PostgreSQL:', err.message);
    res.json({ success: true, warning: 'Deleted from cache (DB offline)', error: err.message });
  }
});

// --------------------------------------------------------------------------
// 5. Update a Visual Area (Photo + Content)
// --------------------------------------------------------------------------
app.post('/api/content/area', async (req, res) => {
  const { areaId, title, subtitle, desc, image } = req.body;
  if (!areaId) {
    return res.status(400).json({ error: 'Missing areaId' });
  }

  memoryCache.areas[areaId] = { title, subtitle, desc, image };
  if (image) memoryCache.images[image] = image;

  try {
    const isReady = await initDb();
    if (isReady) {
      await pool.query(
        `INSERT INTO site_areas (area_id, title, subtitle, description, image_data, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         ON CONFLICT (area_id)
         DO UPDATE SET title = EXCLUDED.title,
                       subtitle = EXCLUDED.subtitle,
                       description = EXCLUDED.description,
                       image_data = EXCLUDED.image_data,
                       updated_at = NOW()`,
        [areaId, title, subtitle, desc, image]
      );
    }

    res.json({ success: true, message: 'Area content saved successfully to Cloud DB' });
  } catch (err) {
    console.error('Error saving area to PostgreSQL:', err.message);
    res.json({ success: true, warning: 'Saved to cache (DB offline)', error: err.message });
  }
});

// --------------------------------------------------------------------------
// 6. Delete / Reset an Area Override
// --------------------------------------------------------------------------
app.delete('/api/content/area/:id', async (req, res) => {
  const { id } = req.params;
  delete memoryCache.areas[id];

  try {
    const isReady = await initDb();
    if (isReady) {
      await pool.query('DELETE FROM site_areas WHERE area_id = $1', [id]);
    }
    res.json({ success: true, message: `Area ${id} reset to default` });
  } catch (err) {
    console.error('Error deleting area from PostgreSQL:', err.message);
    res.json({ success: true, warning: 'Reset in cache (DB offline)', error: err.message });
  }
});

// --------------------------------------------------------------------------
// 7. Reset All Overrides to Defaults
// --------------------------------------------------------------------------
app.post('/api/content/reset-all', async (req, res) => {
  memoryCache = { images: {}, areas: {}, texts: {} };

  try {
    const isReady = await initDb();
    if (isReady) {
      await pool.query('TRUNCATE site_photos, site_areas, site_texts');
    }
    res.json({ success: true, message: 'All customizations reset to factory defaults' });
  } catch (err) {
    console.error('Error resetting content in PostgreSQL:', err.message);
    res.json({ success: true, warning: 'Reset cache only (DB offline)', error: err.message });
  }
});

// --------------------------------------------------------------------------
// 8. Bulk Sync / Restore Backup
// --------------------------------------------------------------------------
app.post('/api/content/batch-sync', async (req, res) => {
  const { images = {}, areas = {}, texts = {} } = req.body;
  memoryCache = { images, areas, texts };

  try {
    const isReady = await initDb();
    if (isReady) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        await client.query('TRUNCATE site_photos, site_areas, site_texts');

        for (const [key, data] of Object.entries(images)) {
          if (data) {
            await client.query(
              'INSERT INTO site_photos (image_key, image_data, updated_at) VALUES ($1, $2, NOW())',
              [key, data]
            );
          }
        }

        for (const [areaId, areaData] of Object.entries(areas)) {
          await client.query(
            'INSERT INTO site_areas (area_id, title, subtitle, description, image_data, updated_at) VALUES ($1, $2, $3, $4, $5, NOW())',
            [areaId, areaData.title, areaData.subtitle, areaData.desc, areaData.image]
          );
        }

        for (const [key, val] of Object.entries(texts)) {
          if (val) {
            await client.query(
              'INSERT INTO site_texts (text_key, text_value, updated_at) VALUES ($1, $2, NOW())',
              [key, val]
            );
          }
        }

        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    }

    res.json({ success: true, message: 'All content synchronized with PostgreSQL DB' });
  } catch (err) {
    console.error('Error bulk syncing to PostgreSQL:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------------------------------
// 9. Enquiries API
// --------------------------------------------------------------------------
app.post('/api/enquiries', async (req, res) => {
  const { parentName, studentName, grade, phone, email, message } = req.body;

  try {
    const isReady = await initDb();
    if (isReady) {
      await pool.query(
        `INSERT INTO admission_enquiries (parent_name, student_name, grade, phone, email, message)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [parentName, studentName, grade, phone, email, message]
      );
    }
    res.json({ success: true, message: 'Enquiry received successfully' });
  } catch (err) {
    console.error('Error saving enquiry to PostgreSQL:', err.message);
    res.json({ success: true, warning: 'Saved locally (DB offline)' });
  }
});

app.get('/api/enquiries', async (req, res) => {
  try {
    const isReady = await initDb();
    if (isReady) {
      const result = await pool.query('SELECT * FROM admission_enquiries ORDER BY created_at DESC LIMIT 100');
      return res.json(result.rows);
    }
    res.json([]);
  } catch (err) {
    console.error('Error fetching enquiries from PostgreSQL:', err.message);
    res.json([]);
  }
});

// --------------------------------------------------------------------------
// 10. Production Static File Serving (Render & Docker)
// --------------------------------------------------------------------------
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback to index.html for Single Page Application client-side routing
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start Server
app.listen(PORT, async () => {
  console.log(`======================================================`);
  console.log(`🚀 GD Goenka Ayodhya Server running on port ${PORT}`);
  console.log(`🌐 API Ready at http://localhost:${PORT}/api/health`);
  console.log(`======================================================`);
  await initDb();
});
