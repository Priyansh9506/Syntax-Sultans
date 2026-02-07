[← Back to README](../README.md)

# DataPulse — Architecture Documentation

> [!NOTE]
> This is a living document and will be updated as the system evolves.

> **Project:** DataPulse  
> **Version:** 1.0  
> **Last Updated:** February 2026  
> **Status:** Active Development

---

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Security](#security)
7. [AI Usage Disclosure](#ai-usage-disclosure)

---

## 1. Overview

DataPulse is a Universal Website Data Tracking SaaS platform that enables developers to track form submissions from their websites with minimal setup. It provides a lightweight SDK, a real-time dashboard, and a robust API layer for data ingestion and retrieval.

---

## 2. System Architecture

The platform follows a three-tier architecture consisting of client-side tracking, a backend API server, and a persistent database layer. The React-based frontend communicates with the backend to display analytics.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Client Websites                              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐             │
│  │   Website A  │   │   Website B  │   │   Website C  │             │
│  │  + datapulse │   │  + datapulse │   │  + datapulse │             │  
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘             │
└─────────┼──────────────────┼──────────────────┼─────────────────────┘
          │   POST /api/track (form submissions)│
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DataPulse Backend (Express.js)                   │
│                         Port 3001                                   │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │
│  │  Auth Routes   │  │ Project Routes │  │  Track Routes  │         │
│  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘         │
│          └───────────────────┼───────────────────┘                  │
│                              ▼                                      │
│                   ┌──────────────────┐                              │
│                   │  Supabase Client │                              │
│                   └────────┬─────────┘                              │
└────────────────────────────┼────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Supabase (PostgreSQL)                            │
│  ┌─────────┐  ┌──────────┐  ┌─────────────┐                         │
│  │  users  │  │ projects │  │ submissions │                         │
│  └─────────┘  └──────────┘  └─────────────┘                         │
└─────────────────────────────────────────────────────────────────────┘
                             │
                             │ REST API
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DataPulse Frontend (React)                       │
│                         Port 5173                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │   Landing   │  │  Dashboard  │  │   Projects  │  │ Submissions│  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Technology Stack

- **Frontend:** React 19 + Vite — Modern UI framework
- **Routing:** React Router v6 — Client-side navigation
- **Charts:** Recharts — Data visualization
- **Icons:** Lucide React — Icon library
- **Styling:** Vanilla CSS — Custom design system
- **Backend:** Express.js — REST API server
- **Database:** Supabase (PostgreSQL) — Persistent storage
- **SDK:** Vanilla JavaScript — Lightweight tracking script

---

## 4. Database Schema

### 4.1 `users`

- `id` (uuid) — Primary key
- `name` (text) — User's display name
- `email` (text) — Unique email address
- `password` (text) — Hashed in production
- `created_at` (timestamptz) — Auto-generated timestamp

### 4.2 `projects`

- `id` (uuid) — Primary key
- `user_id` (uuid) — Foreign key referencing `users.id`
- `name` (text) — Project name
- `domain` (text) — Website domain
- `api_key` (text) — Unique tracking key
- `created_at` (timestamptz) — Auto-generated timestamp

### 4.3 `submissions`

- `id` (uuid) — Primary key
- `project_id` (uuid) — Foreign key referencing `projects.id`
- `form_id` (text) — Form identifier
- `data` (jsonb) — Captured form fields
- `page_url` (text) — Source URL of submission
- `user_agent` (text) — Browser information
- `timestamp` (timestamptz) — Submission time

---

## 5. API Endpoints

### 5.1 Authentication

- **POST** `/api/auth/register` — Register a new user
- **POST** `/api/auth/login` — Authenticate and login

### 5.2 Projects

- **GET** `/api/projects` — List all projects for the authenticated user
- **POST** `/api/projects` — Create a new project
- **DELETE** `/api/projects/:id` — Delete a project
- **POST** `/api/projects/:id/key` — Regenerate a project's API key

### 5.3 Tracking

- **POST** `/api/track` — Receive a form submission (public endpoint)
- **GET** `/api/submissions` — Retrieve submissions for the authenticated user
- **GET** `/api/submissions/:id` — Retrieve a single submission by ID

---

## 6. Security

1. **API Key Authentication** — Each project is assigned a unique API key for data ingestion.
2. **Password Redaction** — The SDK automatically redacts password fields before transmission.
3. **CORS Configuration** — The backend is configured to handle cross-origin requests.
4. **Environment Variables** — Secrets and credentials are stored in `.env` files, excluded from version control.
5. **Row Level Security** — Supabase RLS policies are available for fine-grained access control.

---

## 7. AI Usage Disclosure

This project was developed with AI assistance (Claude) for the following areas:

- Architecture planning and design
- Code generation and scaffolding
- Database schema design
- Documentation authoring

All AI-generated code was reviewed and tested by the development team.
