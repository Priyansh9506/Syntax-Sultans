# DataPulse

**Universal Website Data Tracking & Intelligence SaaS**

A modern platform that allows developers to integrate form tracking into their websites without requiring deep technical expertise.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

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

### Running the Application

1. **Start the backend API server:**
```bash
cd server
node server.js
```
The API will run on http://localhost:3001

2. **Start the frontend (new terminal):**
```bash
cd "Data Pluse"
npm run dev
```
The app will run on http://localhost:5173

3. **Open the demo website (optional):**
Open `demo-website/index.html` in your browser to test form tracking

## 📱 Features

- **Modern Dashboard**: Real-time stats, charts, and recent activity
- **Project Management**: Create and manage multiple tracked websites
- **Form Submissions**: View, filter, and export captured form data
- **Easy Integration**: Simple JavaScript snippet for tracking
- **Demo Mode**: Try the platform without signing up

## 🏗️ Architecture

- **Frontend**: React 19, Vite, React Router, Recharts
- **Backend**: Express.js with in-memory storage
- **SDK**: Lightweight vanilla JavaScript (~2KB)

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## 📖 Integration

Add this to your website before `</body>`:

```html
<script>
(function(d,p,k){
  var s=d.createElement('script');
  s.src='http://localhost:5173/datapulse.js';
  s.dataset.key='YOUR_API_KEY';
  s.dataset.url='http://localhost:3001/api/track';
  s.async=true;
  d.head.appendChild(s);
})(document,'datapulse','YOUR_API_KEY');
</script>
```

See [INTEGRATION.md](./INTEGRATION.md) for the full guide.

## 🔐 Security

- API key authentication for tracking
- Automatic password field redaction
- CORS configuration for cross-origin requests

*Note: This is a hackathon demo using in-memory storage. For production, use a proper database and JWT authentication.*

## 📄 License

MIT License - Built for ACM Hackathon 2026
