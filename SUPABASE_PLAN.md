# Supabase Integration Plan

## Overview
Replace in-memory storage with Supabase (PostgreSQL) for persistent data storage.

## Prerequisites
- [ ] Create Supabase project at https://supabase.com
- [ ] Get project URL and anon key from Settings → API

---

## Database Schema

### Table: `users`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key (default: auth.uid()) |
| name | text | |
| email | text | Unique |
| created_at | timestamptz | Default: now() |

### Table: `projects`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| user_id | uuid | FK → users.id |
| name | text | |
| domain | text | |
| api_key | text | Unique |
| created_at | timestamptz | |

### Table: `submissions`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| project_id | uuid | FK → projects.id |
| form_id | text | |
| data | jsonb | Form fields |
| page_url | text | |
| user_agent | text | |
| timestamp | timestamptz | |

---

## Changes Required

### Backend Server
#### [MODIFY] `server/server.js`
- Replace in-memory `db` object with Supabase client
- Update all CRUD operations to use Supabase queries

#### [NEW] `server/.env`
```
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-anon-key
```

### Dependencies
```bash
cd server
npm install @supabase/supabase-js dotenv
```

---

## SQL to Create Tables

Run this in Supabase SQL Editor:

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

-- Index for faster API key lookups
CREATE INDEX idx_projects_api_key ON projects(api_key);
CREATE INDEX idx_submissions_project_id ON submissions(project_id);
```

---

## Verification
- Test form submissions persist after server restart
- Verify data appears in Supabase dashboard
