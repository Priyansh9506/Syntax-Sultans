[← Back to README](../README.md)

# DataPulse - AI Context File

> [!NOTE]
> Overview of project context and structure for AI assistants.

## Overview
Universal Website Data Tracking SaaS for ACM Hackathon 2026.
Track form submissions from any website with one line of code.

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite (port 5173) |
| Backend | Express.js (port 3001) |
| Database | Supabase (PostgreSQL) |
| Styling | Vanilla CSS, dark theme |
| Charts | Recharts |
| Icons | Lucide React |

## Project Structure
```
Data Pluse/
├── public/datapulse.js     # Tracking SDK (~2KB)
├── server/
│   ├── server.js           # Express API + Supabase
│   ├── schema.sql          # Database schema
│   └── .env                # Credentials (not in git)
├── src/
│   ├── components/         # Navbar, Sidebar, Cards
│   ├── context/            # AuthContext, DataContext
│   ├── pages/              # All page components
│   └── index.css           # Design system
├── demo-website/           # Test suite (6 forms)
└── demo-website-2/         # Example integration
```

## Commands
```bash
# Backend
cd server && node server.js

# Frontend  
npm run dev
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/projects | List projects |
| POST | /api/projects | Create project |
| POST | /api/track | Track submission |
| GET | /api/submissions | Get submissions |

## Database Tables
```sql
users (id, name, email, password, created_at)
projects (id, user_id, name, domain, api_key, created_at)
submissions (id, project_id, form_id, data[JSONB], page_url, timestamp)
```

## Demo Credentials
- Email: demo@datapulse.io
- Password: demo123

## Environment Variables
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=your-anon-key
```

## Key Features
- ✅ Dynamic form tracking (any fields)
- ✅ JSONB storage (no schema changes needed)
- ✅ Password auto-redaction
- ✅ Real-time dashboard
- ✅ Multiple project support
- ✅ API key authentication
