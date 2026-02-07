-- DataPulse Database Schema for Supabase
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    domain TEXT,
    api_key TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    form_id TEXT,
    data JSONB,
    page_url TEXT,
    user_agent TEXT,
    timestamp TIMESTAMPTZ DEFAULT now()
);
-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_api_key ON projects(api_key);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_project_id ON submissions(project_id);
CREATE INDEX IF NOT EXISTS idx_submissions_timestamp ON submissions(timestamp DESC);
-- Enable Row Level Security (optional - for production)
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;