// PostgreSQL Database Pool & Schema Setup
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Construct connection config
// Works with Render PostgreSQL, Supabase, Neon, Docker, AWS, or local PostgreSQL
const connectionString = process.env.DATABASE_URL;

const poolConfig = connectionString
  ? {
      connectionString,
      ssl: connectionString.includes('localhost') || connectionString.includes('127.0.0.1')
        ? false
        : { rejectUnauthorized: false }
    }
  : {
      host: process.env.PGHOST || 'localhost',
      port: parseInt(process.env.PGPORT || '5432', 10),
      database: process.env.PGDATABASE || 'gd_goenka_db',
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
    };

export const pool = new Pool(poolConfig);

let isDbInitialized = false;

// Auto-create required PostgreSQL tables if they don't exist
export async function initDb() {
  if (isDbInitialized) return true;

  try {
    const client = await pool.connect();
    try {
      await client.query(`
        -- Site Photos Override Table
        CREATE TABLE IF NOT EXISTS site_photos (
          id SERIAL PRIMARY KEY,
          image_key TEXT UNIQUE NOT NULL,
          image_data TEXT NOT NULL,
          category TEXT DEFAULT 'general',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        -- Site Visual Area Content Table
        CREATE TABLE IF NOT EXISTS site_areas (
          id SERIAL PRIMARY KEY,
          area_id TEXT UNIQUE NOT NULL,
          title TEXT,
          subtitle TEXT,
          description TEXT,
          image_data TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        -- General Text Overrides Table
        CREATE TABLE IF NOT EXISTS site_texts (
          id SERIAL PRIMARY KEY,
          text_key TEXT UNIQUE NOT NULL,
          text_value TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        -- Admission Enquiries Table
        CREATE TABLE IF NOT EXISTS admission_enquiries (
          id SERIAL PRIMARY KEY,
          parent_name TEXT,
          student_name TEXT,
          grade TEXT,
          phone TEXT,
          email TEXT,
          message TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        -- Indexes for ultra-fast lookup
        CREATE INDEX IF NOT EXISTS idx_site_photos_key ON site_photos(image_key);
        CREATE INDEX IF NOT EXISTS idx_site_areas_id ON site_areas(area_id);
      `);

      isDbInitialized = true;
      console.log('✓ PostgreSQL tables initialized successfully.');
      return true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn('⚠️ PostgreSQL connection failed or DATABASE_URL not set yet:', err.message);
    console.warn('ℹ️ Running in resilient mode. Local changes will persist in client storage until PostgreSQL is linked.');
    return false;
  }
}

// Test DB Connection
export async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    return { connected: true, timestamp: res.rows[0].now };
  } catch (err) {
    return { connected: false, error: err.message };
  }
}
