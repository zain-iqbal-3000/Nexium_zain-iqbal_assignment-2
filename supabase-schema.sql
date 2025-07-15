-- Blog Summaries Table for Supabase
CREATE TABLE blog_summaries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    summary_english TEXT NOT NULL,
    summary_urdu TEXT NOT NULL,
    keywords TEXT[] DEFAULT '{}',
    key_points TEXT[] DEFAULT '{}',
    word_count INTEGER DEFAULT 0,
    summary_length INTEGER DEFAULT 0,
    compression_ratio DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_blog_summaries_url ON blog_summaries(url);
CREATE INDEX idx_blog_summaries_created_at ON blog_summaries(created_at DESC);
CREATE INDEX idx_blog_summaries_keywords ON blog_summaries USING GIN(keywords);

-- Add Row Level Security (RLS)
ALTER TABLE blog_summaries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public read access" ON blog_summaries
    FOR SELECT USING (true);

-- Create policy to allow public insert access
CREATE POLICY "Public insert access" ON blog_summaries
    FOR INSERT WITH CHECK (true);

-- Create policy to allow public update access
CREATE POLICY "Public update access" ON blog_summaries
    FOR UPDATE USING (true);

-- Create policy to allow public delete access (optional)
CREATE POLICY "Public delete access" ON blog_summaries
    FOR DELETE USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to call the function
CREATE TRIGGER update_blog_summaries_updated_at
    BEFORE UPDATE ON blog_summaries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
