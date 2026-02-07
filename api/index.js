// ESM Express handler for Vercel
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        framework: 'express',
        message: 'Express ESM handler is working',
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
    });
});

export default app;
