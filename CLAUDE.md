# DataPulse - Project Context for AI Assistants

## Project Overview
DataPulse is a Universal Website Data Tracking SaaS platform built for ACM Hackathon 2026. It allows developers to track form submissions from their websites without complex setup.

## Tech Stack
- **Frontend**: React 19 + Vite (port 5173)
- **Backend**: Express.js (port 3001)
- **Styling**: Vanilla CSS with custom design system
- **Charts**: Recharts
- **Icons**: Lucide React
- **Storage**: In-memory (demo)

## Project Structure
```
Data Pluse/
├── public/datapulse.js     # Tracking SDK
├── server/server.js        # Express API
├── src/
│   ├── components/         # Navbar, Sidebar
│   ├── context/            # AuthContext, DataContext
│   ├── pages/              # Landing, Dashboard, Projects, etc.
│   ├── App.jsx             # Router setup
│   └── index.css           # Design system
└── demo-website/           # Test website with forms
```

## Key Commands
```bash
# Start backend
cd server && node server.js

# Start frontend
npm run dev
```

## API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET/POST /api/projects` - Project management
- `POST /api/track` - Receive form submissions (public)
- `GET /api/submissions` - Get submissions

## Demo Credentials
- Email: demo@datapulse.io
- API Key: dp_demo_key_12345

## Important Notes
- Uses in-memory storage (data resets on server restart)
- CORS enabled for cross-origin tracking
- Password fields auto-redacted by SDK
