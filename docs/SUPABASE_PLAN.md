[← Back to README](../README.md)

# DataPulse — Supabase Integration Plan

> [!WARNING]
> Always backup existing data before performing database migrations.

> **Project:** DataPulse  
> **Version:** 1.0  
> **Last Updated:** February 2026  
> **Purpose:** Migration plan from in-memory storage to Supabase (PostgreSQL)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Prerequisites](#2-prerequisites)
3. [Database Schema](#3-database-schema)
4. [Required Changes](#4-required-changes)
5. [SQL Migration Script](#5-sql-migration-script)
6. [Verification](#6-verification)

---

## 1. Overview

This document outlines the plan to replace DataPulse's in-memory storage with Supabase (PostgreSQL) for persistent data storage. This migration ensures that user data, projects, and form submissions are retained across server restarts and deployments.

---

## 2. Prerequisites

Before proceeding with the migration:

- Create a Supabase project at [https://supabase.com](https://supabase.com).
- Obtain the **Project URL** and **Anon Key** from **Settings → API** in the Supabase dashboard.

---

## 3. Database Schema

### 3.1 Table: `users`

- `id` (uuid) — Primary key, default: `auth.uid()`
- `name` (text) — User display name
- `email` (text) — Unique email address
- `created_at` (timestamptz) — Default: `now()`

### 3.2 Table: `projects`

- `id` (uuid) — Primary key
- `user_id` (uuid) — Foreign key referencing `users.id`
- `name` (text) — Project name
- `domain` (text) — Associated website domain
- `api_key` (text) — Unique API key for tracking
- `created_at` (timestamptz) — Auto-generated timestamp

### 3.3 Table: `submissions`

- `id` (uuid) — Primary key
- `project_id` (uuid) — Foreign key referencing `projects.id`
- `form_id` (text) — Form identifier
- `data` (jsonb) — Captured form fields
- `page_url` (text) — Source page URL
- `user_agent` (text) — Browser information
- `timestamp` (timestamptz) — Submission time

---

## 4. Required Changes

### 4.1 Backend Server — `server/server.js`

- Replace the in-memory `db` object with a Supabase client instance.
- Update all CRUD operations to use Supabase query methods.

### 4.2 Environment Configuration — `server/.env`

Create or update the environment file with:

```
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-anon-key
```

### 4.3 Dependencies

Install the required packages in the server directory:

```bash
cd server
npm install @supabase/supabase-js dotenv
```

---

## 5. SQL Migration Script

Run the following SQL in the Supabase SQL Editor to create the required tables and indexes:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  domain TEXT,
  api_key TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Submissions table
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  form_id TEXT,
  data JSONB,
  page_url TEXT,
  user_agent TEXT,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_projects_api_key ON projects(api_key);
CREATE INDEX idx_submissions_project_id ON submissions(project_id);
```

---

## 6. Verification

After completing the migration, verify the following:

- Form submissions persist across server restarts.
- All data appears correctly in the Supabase dashboard.
- CRUD operations for users, projects, and submissions function as expected.
