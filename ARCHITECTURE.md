# DataPulse - Architecture Documentation

## Overview

DataPulse is a Universal Website Data Tracking SaaS platform that enables developers to track form submissions from their websites with minimal setup.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Client Websites                               │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐             │
│  │   Website A  │   │   Website B  │   │   Website C  │             │
│  │  + datapulse │   │  + datapulse │   │  + datapulse │             │
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘             │
└─────────┼──────────────────┼──────────────────┼──────────────────────┘
          │   POST /api/track (form submissions)│
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DataPulse Backend (Express.js)                    │
│                         Port 3001                                    │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │
│  │  Auth Routes   │  │ Project Routes │  │  Track Routes  │         │
│  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘         │
│          └───────────────────┼───────────────────┘                   │
│                              ▼                                       │
│                   ┌──────────────────┐                               │
│                   │  Supabase Client │                               │
│                   └────────┬─────────┘                               │
└────────────────────────────┼────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Supabase (PostgreSQL)                             │
│  ┌─────────┐  ┌──────────┐  ┌─────────────┐                         │
│  │  users  │  │ projects │  │ submissions │                         │
│  └─────────┘  └──────────┘  └─────────────┘                         │
└─────────────────────────────────────────────────────────────────────┘
                             │
                             │ REST API
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DataPulse Frontend (React)                        │
│                         Port 5173                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │   Landing   │  │  Dashboard  │  │   Projects  │  │ Submissions│  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | React 19 + Vite | Modern UI |
| Routing | React Router v6 | Navigation |
| Charts | Recharts | Visualization |
| Icons | Lucide React | Icons |
| Styling | Vanilla CSS | Custom design |
| Backend | Express.js | REST API |
| Database | Supabase (PostgreSQL) | Persistent storage |
| SDK | Vanilla JS | Tracking script |

## Database Schema

### users
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| name | text | User's name |
| email | text | Unique |
| password | text | Hashed in production |
| created_at | timestamptz | Auto-generated |

### projects
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| user_id | uuid | FK → users |
| name | text | Project name |
| domain | text | Website domain |
| api_key | text | Unique tracking key |
| created_at | timestamptz | Auto-generated |

### submissions
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| project_id | uuid | FK → projects |
| form_id | text | Form identifier |
| data | jsonb | Form fields |
| page_url | text | Source URL |
| user_agent | text | Browser info |
| timestamp | timestamptz | When submitted |

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List projects |
| POST | `/api/projects` | Create project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/projects/:id/key` | Regenerate API key |

### Tracking
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/track` | Receive submission (public) |
| GET | `/api/submissions` | Get submissions |
| GET | `/api/submissions/:id` | Get single submission |

## Security

1. **API Key Auth** - Unique key per project
2. **Password Redaction** - SDK auto-redacts passwords
3. **CORS** - Configured for cross-origin
4. **Env Variables** - Secrets in `.env`
5. **Row Level Security** - Available in Supabase

## AI Usage

This project was developed with AI assistance (Claude) for:
- Architecture planning
- Code generation
- Database schema design
- Documentation

All code was reviewed and tested.
