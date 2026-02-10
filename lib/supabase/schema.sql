-- ===========================================
-- GLP Diet - Supabase Database Schema
-- ===========================================
-- Run this script in the Supabase SQL Editor to create the database schema

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing table if it exists (for development reset)
-- DROP TABLE IF EXISTS funnel_submissions;

-- Create funnel_submissions table
CREATE TABLE IF NOT EXISTS funnel_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  gender TEXT CHECK (gender IS NULL OR gender IN ('male', 'female')),
  current_step INTEGER DEFAULT 1 NOT NULL,
  answers JSONB DEFAULT '{}' NOT NULL,
  ai_analysis TEXT,
  status TEXT DEFAULT 'started' NOT NULL CHECK (status IN ('started', 'completed', 'purchased')),
  email TEXT,
  metadata JSONB DEFAULT '{}' NOT NULL
);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_funnel_submissions_status ON funnel_submissions(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_funnel_submissions_created_at ON funnel_submissions(created_at DESC);

-- Create index on email for lookups
CREATE INDEX IF NOT EXISTS idx_funnel_submissions_email ON funnel_submissions(email) WHERE email IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE funnel_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous access (public quiz)
-- This allows anyone to create and update their own submissions
CREATE POLICY "Allow anonymous insert" ON funnel_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous select" ON funnel_submissions
  FOR SELECT
  USING (true);

CREATE POLICY "Allow anonymous update" ON funnel_submissions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_funnel_submissions_updated_at ON funnel_submissions;
CREATE TRIGGER update_funnel_submissions_updated_at
  BEFORE UPDATE ON funnel_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- Example queries for reference
-- ===========================================

-- Insert a new submission
-- INSERT INTO funnel_submissions (gender, answers) VALUES ('female', '{"q1": "yes"}');

-- Get all completed submissions
-- SELECT * FROM funnel_submissions WHERE status = 'completed' ORDER BY created_at DESC;

-- Get submission by ID
-- SELECT * FROM funnel_submissions WHERE id = 'your-uuid-here';

-- Update submission
-- UPDATE funnel_submissions SET answers = answers || '{"q2": "option1"}' WHERE id = 'your-uuid-here';
