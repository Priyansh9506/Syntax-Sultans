<p align="center">
  <img src="https://img.shields.io/badge/🚀-DataPulse-6366f1?style=for-the-badge&labelColor=0a0a0f" alt="DataPulse"/>
</p>

<h1 align="center">
  <br>
  📊 DataPulse
  <br>
</h1>

<h3 align="center">
  <em>Universal Website Data Tracking & Intelligence Platform</em>
</h3>

<p align="center">
  <strong>Track every form submission. Zero complexity. Infinite insights.</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-demo-websites-supporting">Demo Websites</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-team">Team</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase"/>
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
</p>

---

## 🎯 The Problem

> **Every day, businesses lose valuable customer data because form tracking is too complex.**

Traditional analytics tools require:
- 😰 Complex SDK integrations
- 📚 Extensive documentation reading
- 👨‍💻 Dedicated developer resources
- 💰 Expensive enterprise subscriptions

**Result?** Small businesses and indie developers miss out on crucial form submission data.

---

## 💡 Our Solution

**DataPulse** is a plug-and-play form tracking platform that captures every submission with just **one line of code**.

```html
<script src="datapulse.js" data-key="YOUR_KEY"></script>
<!-- That's it. You're done. 🎉 -->
```

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 Beautiful Dashboard
Modern, dark-themed interface with glassmorphism effects. Real-time stats, interactive charts, and intuitive navigation.

### 📊 Real-Time Analytics
Watch form submissions appear instantly in your dashboard. No delays, no refresh needed.

### 🔐 Secure by Design
- API key authentication
- Automatic password redaction
- PostgreSQL with Supabase

</td>
<td width="50%">

### 🚀 One-Line Integration
Add tracking to any website in seconds. Works with React, Vue, vanilla HTML, WordPress—everything.

### 📁 Project Management
Create unlimited projects, each with unique API keys. Organize by website or client.

### 📤 Data Export
Export all submissions as JSON. Filter by date, form, or custom criteria.

</td>
</tr>
</table>

---

## 🎬 Demo

### YouTube Demo Video

[![YouTube Demo Video](https://img.youtube.com/vi/hnGPVjSabV0/maxresdefault.jpg)](https://www.youtube.com/watch?v=hnGPVjSabV0&autoplay=1)

### Live Dashboard Preview

| Dashboard | Projects | Submissions |
|-----------|----------|-------------|
| 📈 Stats & Charts | 🗂️ Manage Sites | 📋 View Data |
| Real-time metrics | API key generation | Filter & export |
| Recent activity | Domain tracking | Detailed view |

### Integration Flow

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  1. Add Script   │ ──▶ │ 2. User Submits │ ──▶ │  3. See in       │
│  to your site    │     │  any form        │     │  Dashboard       │
└──────────────────┘     └──────────────────┘     └──────────────────┘
      5 seconds              automatic              instant
```

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
<br>React 19
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
<br>Vite
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=express" width="48" height="48" alt="Express" />
<br>Express
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=supabase" width="48" height="48" alt="Supabase" />
<br>Supabase
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=postgres" width="48" height="48" alt="PostgreSQL" />
<br>PostgreSQL
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=js" width="48" height="48" alt="JavaScript" />
<br>JavaScript
</td>
</tr>
</table>

| Layer | Technology | Why We Chose It |
|-------|------------|-----------------|
| **Frontend** | React 19 + Vite | Blazing fast HMR, latest React features |
| **Styling** | Custom CSS | Full design control, dark theme, glassmorphism |
| **Charts** | Recharts | Beautiful, responsive data visualization |
| **Backend** | Express.js | Lightweight, fast, perfect for REST APIs |
| **Database** | Supabase | PostgreSQL power with real-time capabilities |
| **Tracking SDK** | Vanilla JS | Zero dependencies, ~2KB, works everywhere |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free tier works!)

### Installation

```bash
# Clone the repository
git clone https://github.com/Priyansh9506/Syntax-Sultans.git

# Install frontend dependencies
cd "Data Pluse"
npm install

# Install backend dependencies
cd server
npm install
```

### Setup Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Run `schema.sql` in SQL Editor
3. Add credentials to `server/.env`:
```env
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-anon-key
```

### Run

```bash
# Terminal 1: Backend
cd server && node server.js
# ✅ Running on http://localhost:3001

# Terminal 2: Frontend
npm run dev
# ✅ Running on http://localhost:5173
```

---

## 🧪 Demo Websites (Supporting)

The project includes **two demo websites** inside the repository that act as sample client sites to test and verify that DataPulse's form tracking SDK is working correctly.

| Demo | Directory | Purpose |
|------|-----------|----------|
| **Form Testing Suite** | `demo-website/` | A comprehensive test page with multiple form types (contact, registration, feedback, etc.) to validate that all form submissions are captured by the SDK |
| **TechStartup Contact Page** | `demo-website-2/` | A realistic single-page contact form simulating a real client website integrated with DataPulse |

### How to Use

1. Make sure the **backend server** is running (`cd server && node server.js`)
2. Open a demo website in your browser:
   ```bash
   # Open directly in browser
   start demo-website/index.html
   start demo-website-2/index.html
   ```
3. Add your project's **API key** to the DataPulse script tag inside the demo HTML file
4. Fill out and submit forms on the demo page
5. Check the **DataPulse dashboard** to verify submissions are being tracked

> **Note:** These demo sites are not part of the main application — they are **supporting tools** used during development and demos to prove that the tracking SDK works on any website.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT WEBSITES                             │
│    ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│    │ Site 1  │  │ Site 2  │  │ Site 3  │  │ Site N  │           │
│    │ +SDK    │  │ +SDK    │  │ +SDK    │  │ +SDK    │           │
│    └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘           │
└─────────┼────────────┼────────────┼────────────┼────────────────┘
          │            │            │            │
          ▼            ▼            ▼            ▼
    ┌─────────────────────────────────────────────────────────────┐
    │              EXPRESS.JS API SERVER                          │
    │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
    │  │  Auth    │  │ Projects │  │ Tracking │  │  Query   │     │
    │  │ /auth/*  │  │ /project │  │ /track   │  │ /submit  │     │
    │  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
    └─────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                    SUPABASE                                 │
    │  ┌──────────┐  ┌──────────┐  ┌──────────────┐               │
    │  │  users   │  │ projects │  │ submissions  │               │
    │  │   UUID   │  │  API key │  │    JSONB     │               │
    │  └──────────┘  └──────────┘  └──────────────┘               │
    └─────────────────────────────────────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                 REACT DASHBOARD                             │
    │  📊 Analytics  │  📁 Projects  │  📋 Submissions  │  ⚙️   │
    └─────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema

```sql
-- Optimized for form tracking at scale
users        (id, name, email, password, created_at)
projects     (id, user_id, name, domain, api_key, created_at)
submissions  (id, project_id, form_id, data[JSONB], page_url, timestamp)
```

**Key Features:**
- ✅ JSONB for flexible form data storage
- ✅ UUID primary keys for distributed systems
- ✅ Indexed API keys for fast lookups
- ✅ Cascading deletes for data integrity

---

## 🔐 Security

| Feature | Implementation |
|---------|----------------|
| 🔑 API Keys | Unique per project, regeneratable |
| 🙈 Password Redaction | Automatic in SDK |
| 🌐 CORS | Configured for cross-origin |
| 🔒 Environment Variables | Secrets never in code |
| 🛡️ Row Level Security | Supabase RLS ready |

---

## 🤖 AI-Assisted Development

This project was built with **AI pair programming**:

- 📋 Architecture planning with Claude
- 💻 Code generation and optimization
- 🐛 Debugging and problem-solving
- 📝 Documentation writing

**All code was reviewed, tested, and validated by the team.**

---

## 👥 The Creators

<h3 align="center">⚡ SYNTAX SULTANS ⚡</h3>

<p align="center">
  <strong>DataPulse</strong> was crafted with passion by
  <br>
  <strong>Priyansh</strong> & <strong>Kaivalya Bhatt</strong>
</p>

<p align="center">
  Developed during the
  <br>
  <strong>ACM Nirma University Chapter Hackathon: Prompt to Prototype</strong>
</p>

<p align="center">
  <em>Where innovation meets implementation.</em>
</p>

---

## 📄 Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System design & API docs |
| [INTEGRATION.md](./docs/INTEGRATION.md) | Step-by-step integration guide |
| [CLAUDE.md](./docs/CLAUDE.md) | AI context & project structure |
| [FORM_SCHEMA.md](./docs/FORM_SCHEMA.md) | Form validation schemas |
| [SUPABASE_PLAN.md](./docs/SUPABASE_PLAN.md) | Database implementation plan |

---

## 🎯 What's Next

- [ ] Real-time dashboard updates with WebSockets
- [ ] Email notifications for new submissions
- [ ] Advanced analytics with ML insights
- [ ] Team collaboration features
- [ ] Webhook integrations (Slack, Discord, Zapier)

---

<p align="center">
  <strong>Built with 💜 for ACM Nirma University Chapter Hackathon: Prompt to Prototype</strong>
</p>

<p align="center">
  <a href="https://github.com/Priyansh9506/Syntax-Sultans">
    <img src="https://img.shields.io/badge/⭐_Star_this_repo-6366f1?style=for-the-badge" alt="Star"/>
  </a>
</p>
