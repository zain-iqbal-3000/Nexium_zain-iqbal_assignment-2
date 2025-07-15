-- Supabase Database Schema for Blog Summarizer Enhanced
-- Run this SQL in your Supabase SQL Editor to create the required table

-- Create blog_summaries table
CREATE TABLE IF NOT EXISTS blog_summaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary_english TEXT NOT NULL,
  summary_urdu TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  key_points TEXT[] DEFAULT '{}',
  word_count INTEGER NOT NULL DEFAULT 0,
  summary_length INTEGER NOT NULL DEFAULT 0,
  compression_ratio DECIMAL(5,3) NOT NULL DEFAULT 0.000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster URL lookups
CREATE INDEX IF NOT EXISTS idx_blog_summaries_url ON blog_summaries(url);
CREATE INDEX IF NOT EXISTS idx_blog_summaries_created_at ON blog_summaries(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_summaries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON blog_summaries
  FOR SELECT USING (true);

-- Create policy to allow public insert access
CREATE POLICY "Allow public insert access" ON blog_summaries
  FOR INSERT WITH CHECK (true);

-- Create policy to allow public update access
CREATE POLICY "Allow public update access" ON blog_summaries
  FOR UPDATE USING (true);

-- Create policy to allow public delete access
CREATE POLICY "Allow public delete access" ON blog_summaries
  FOR DELETE USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blog_summaries_updated_at
  BEFORE UPDATE ON blog_summaries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for summary statistics
CREATE OR REPLACE VIEW summary_stats AS
SELECT 
  COUNT(*) as total_summaries,
  AVG(word_count) as avg_word_count,
  AVG(summary_length) as avg_summary_length,
  AVG(compression_ratio) as avg_compression_ratio,
  MIN(created_at) as first_summary,
  MAX(created_at) as latest_summary
FROM blog_summaries;
