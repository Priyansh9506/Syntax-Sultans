# DataPulse

**Universal Website Data Tracking & Intelligence SaaS**

A modern platform that allows developers to integrate form tracking into their websites without requiring deep technical expertise. Built with React, Express.js, and Supabase.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm
- Supabase account (free tier)

### Installation

1. **Install frontend dependencies:**
```bash
cd "Data Pluse"
npm install
```

2. **Install backend dependencies:**
```bash
cd server
npm install
```

3. **Set up Supabase:**
   - Create a project at https://supabase.com
   - Run `schema.sql` in the SQL Editor
   - Copy your credentials to `server/.env`

### Running the Application

1. **Start the backend API server:**
```bash
cd server
node server.js
```
API runs on http://localhost:3001

2. **Start the frontend:**
```bash
npm run dev
```
App runs on http://localhost:5173

3. **Test with demo forms:**
Open `demo-website/index.html` in your browser

## 📱 Features

- **Modern Dashboard** - Real-time stats, charts, recent activity
- **Project Management** - Create/manage tracked websites with API keys
- **Form Submissions** - View, filter, export captured form data
- **Easy Integration** - Simple JavaScript snippet
- **Supabase Backend** - Persistent PostgreSQL storage
- **Demo Mode** - Try without signing up

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite |
| Styling | Vanilla CSS |
| Charts | Recharts |
| Icons | Lucide React |
| Backend | Express.js |
| Database | Supabase (PostgreSQL) |
| SDK | Vanilla JavaScript (~2KB) |

## 📖 Integration

Add this to your website before `</body>`:

```html
<script>
(function(d,p,k){
  var s=d.createElement('script');
  s.src='YOUR_DATAPULSE_URL/datapulse.js';
  s.dataset.key='YOUR_API_KEY';
  s.dataset.url='YOUR_API_URL/api/track';
  s.async=true;
  d.head.appendChild(s);
})(document,'datapulse','YOUR_API_KEY');
</script>
```

See [INTEGRATION.md](./INTEGRATION.md) for full guide.

## 📁 Project Structure

```
Data Pluse/
├── public/datapulse.js     # Tracking SDK
├── server/
│   ├── server.js           # Express API
│   ├── schema.sql          # Database schema
│   └── .env                # Supabase credentials
├── src/
│   ├── components/         # Navbar, Sidebar
│   ├── context/            # Auth, Data providers
│   ├── pages/              # All page components
│   └── index.css           # Design system
└── demo-website/           # Test forms

```

## 🔐 Security

- API key authentication
- Password field auto-redaction
- CORS configured
- Environment variables for secrets

## 📄 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [INTEGRATION.md](./INTEGRATION.md) - Integration guide
- [CLAUDE.md](./CLAUDE.md) - AI context file

## 📄 License

MIT License - Built for ACM Hackathon 2026
