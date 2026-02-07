// Bare minimum ESM handler for Vercel
export default function handler(req, res) {
    res.status(200).json({
        status: 'ok',
        message: 'Bare minimum ESM handler is working',
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
    });
}
