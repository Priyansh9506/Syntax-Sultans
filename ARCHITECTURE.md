# DataPulse - Architecture Documentation

## Overview

DataPulse is a Universal Website Data Tracking SaaS platform that enables developers to easily track form submissions from their websites without complex setup or deep technical expertise.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Client Websites                               │
│                                                                      │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐             │
│  │   Website A  │   │   Website B  │   │   Website C  │             │
│  │  + datapulse │   │  + datapulse │   │  + datapulse │             │
│  │     .js      │   │     .js      │   │     .js      │             │
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘             │
│         │                  │                  │                      │
└─────────┼──────────────────┼──────────────────┼──────────────────────┘
          │                  │                  │
          │   POST /api/track (form submissions)│
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DataPulse Backend (Express.js)                    │
│                         Port 3001                                    │
│                                                                      │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │
│  │  Auth Routes   │  │ Project Routes │  │  Track Routes  │         │
│  │  /api/auth/*   │  │ /api/projects  │  │   /api/track   │         │
│  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘         │
│          │                   │                   │                   │
│          └───────────────────┼───────────────────┘                   │
│                              ▼                                       │
│                   ┌──────────────────┐                               │
│                   │  In-Memory Store │                               │
│                   │  (Demo Database) │                               │
│                   └──────────────────┘                               │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ REST API
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DataPulse Frontend (React)                        │
│                         Port 5173                                    │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │   Landing   │  │  Dashboard  │  │   Projects  │  │ Submissions│  │
│  │    Page     │  │    Page     │  │    Page     │  │    Page    │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘  │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │
│  │ Integration │  │    Login    │  │   Register  │                  │
│  │    Page     │  │    Page     │  │    Page     │                  │
│  └─────────────┘  └─────────────┘  └─────────────┘                  │
└─────────────────────────────────────────────────────────────────────┘
```

## Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend  | React 19 + Vite | Modern, fast UI development |
| Routing   | React Router v6 | Client-side navigation |
| Charts    | Recharts | Data visualization |
| Icons     | Lucide React | Modern icon library |
| Styling   | Vanilla CSS | Custom design system |
| Backend   | Express.js | REST API server |
| Storage   | In-memory | Demo data persistence |
| SDK       | Vanilla JS | Lightweight tracking script |

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List user's projects |
| POST | `/api/projects` | Create new project |
| DELETE | `/api/projects/:id` | Delete a project |
| POST | `/api/projects/:id/key` | Regenerate API key |

### Tracking
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/track` | Receive form submission (public) |
| GET | `/api/submissions` | Get user's submissions |
| GET | `/api/submissions/:id` | Get submission details |

## Security Considerations

1. **API Key Authentication**: Each project has a unique API key for tracking
2. **Password Redaction**: The SDK automatically redacts password fields
3. **CORS Configuration**: Proper cross-origin headers for tracking requests
4. **Input Validation**: Form data is validated before storage

> **Note**: This is a hackathon demo. For production:
> - Use a proper database (MongoDB, PostgreSQL)
> - Implement JWT authentication
> - Add rate limiting
> - Use HTTPS
> - Hash passwords with bcrypt

## File Structure

```
Data Pluse/
├── public/
│   └── datapulse.js        # Tracking SDK
├── server/
│   ├── package.json
│   └── server.js           # Express API server
├── src/
│   ├── components/
│   │   ├── Navbar.jsx/css
│   │   └── Sidebar.jsx/css
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── DataContext.jsx
│   ├── pages/
│   │   ├── Landing.jsx/css
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Auth.css
│   │   ├── Dashboard.jsx/css
│   │   ├── Projects.jsx/css
│   │   ├── Submissions.jsx/css
│   │   └── Integration.jsx/css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           # Design system
├── package.json
└── vite.config.js

demo-website/
└── index.html              # Test website with forms
```

## AI Usage

This project was developed with the assistance of AI (Claude) for:
- Architecture planning
- Code generation for React components
- API design and implementation
- CSS design system creation
- Documentation writing

All code was reviewed and verified for correctness.
