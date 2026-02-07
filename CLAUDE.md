# DataPulse - Project Context

## Overview
Universal Website Data Tracking SaaS for ACM Hackathon 2026.
Track form submissions without complex setup.

## Tech Stack
- **Frontend**: React 19 + Vite (port 5173)
- **Backend**: Express.js (port 3001)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Vanilla CSS, dark theme
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure
```
Data Pluse/
├── public/datapulse.js     # Tracking SDK
├── server/
│   ├── server.js           # Express API + Supabase
│   ├── schema.sql          # DB schema
│   └── .env                # Credentials
├── src/
│   ├── components/         # Navbar, Sidebar
│   ├── context/            # AuthContext, DataContext
│   ├── pages/              # All pages
│   └── index.css           # Design system
└── demo-website/           # Test forms
```

## Commands
```bash
# Backend
cd server && node server.js

# Frontend
npm run dev
```

## API Endpoints
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET/POST /api/projects` - Projects
- `POST /api/track` - Track submissions
- `GET /api/submissions` - Get data

## Database Tables
- `users` - User accounts
- `projects` - Tracked websites
- `submissions` - Form data (JSONB)

## Demo Credentials
- Email: demo@datapulse.io
- API Key: dp_demo_key_12345

## Environment Variables
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=your-anon-key
```
