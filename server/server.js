const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ============================================
// In-Memory Database (for demo purposes)
// ============================================
const db = {
    users: [],
    projects: [],
    submissions: [],
};

// Helper functions
const generateId = () => crypto.randomUUID();
const generateApiKey = () => `dp_${crypto.randomBytes(16).toString('hex')}`;
const generateToken = () => crypto.randomBytes(32).toString('hex');

// ============================================
// Auth Routes
// ============================================
app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;

    // Check if user exists
    if (db.users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = {
        id: generateId(),
        name,
        email,
        password, // In production, hash this!
        createdAt: new Date().toISOString(),
    };

    db.users.push(user);

    const token = generateToken();

    res.status(201).json({
        user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt },
        token,
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    const user = db.users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken();

    res.json({
        user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt },
        token,
    });
});

// ============================================
// Auth Middleware
// ============================================
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // For demo, we'll accept any token and use a demo user
    // In production, verify JWT token
    const token = authHeader.split(' ')[1];

    if (token === 'demo-token') {
        req.userId = 'demo-user-001';
    } else {
        // For simplicity, accept any token and use first user
        req.userId = db.users[0]?.id || 'demo-user-001';
    }

    next();
};

// ============================================
// Projects Routes
// ============================================
app.get('/api/projects', authMiddleware, (req, res) => {
    const userProjects = db.projects.filter(p => p.userId === req.userId);

    // Add submission count
    const projectsWithCount = userProjects.map(p => ({
        ...p,
        submissionCount: db.submissions.filter(s => s.projectId === p.id).length,
    }));

    res.json(projectsWithCount);
});

app.post('/api/projects', authMiddleware, (req, res) => {
    const { name, domain } = req.body;

    const project = {
        id: generateId(),
        userId: req.userId,
        name,
        domain,
        apiKey: generateApiKey(),
        createdAt: new Date().toISOString(),
    };

    db.projects.push(project);

    res.status(201).json(project);
});

app.delete('/api/projects/:id', authMiddleware, (req, res) => {
    const { id } = req.params;

    const projectIndex = db.projects.findIndex(p => p.id === id && p.userId === req.userId);

    if (projectIndex === -1) {
        return res.status(404).json({ message: 'Project not found' });
    }

    db.projects.splice(projectIndex, 1);

    // Also delete related submissions
    db.submissions = db.submissions.filter(s => s.projectId !== id);

    res.status(204).send();
});

app.post('/api/projects/:id/key', authMiddleware, (req, res) => {
    const { id } = req.params;

    const project = db.projects.find(p => p.id === id && p.userId === req.userId);

    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    project.apiKey = generateApiKey();

    res.json({ apiKey: project.apiKey });
});

// ============================================
// Tracking Route (Public - for SDK)
// ============================================
app.post('/api/track', (req, res) => {
    const { apiKey, formId, data, pageUrl, userAgent } = req.body;

    // Find project by API key
    const project = db.projects.find(p => p.apiKey === apiKey);

    if (!project) {
        return res.status(401).json({ message: 'Invalid API key' });
    }

    const submission = {
        id: generateId(),
        projectId: project.id,
        formId: formId || 'unknown',
        data: data || {},
        pageUrl: pageUrl || '',
        userAgent: userAgent || '',
        timestamp: new Date().toISOString(),
    };

    db.submissions.push(submission);

    console.log(`[DataPulse] New submission for project "${project.name}":`, submission);

    res.status(201).json({ success: true, id: submission.id });
});

// ============================================
// Submissions Routes
// ============================================
app.get('/api/submissions', authMiddleware, (req, res) => {
    // Get all submissions for user's projects
    const userProjectIds = db.projects
        .filter(p => p.userId === req.userId)
        .map(p => p.id);

    const userSubmissions = db.submissions
        .filter(s => userProjectIds.includes(s.projectId))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(userSubmissions);
});

app.get('/api/submissions/:id', authMiddleware, (req, res) => {
    const { id } = req.params;

    const submission = db.submissions.find(s => s.id === id);

    if (!submission) {
        return res.status(404).json({ message: 'Submission not found' });
    }

    res.json(submission);
});

// ============================================
// Health Check
// ============================================
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================
// Start Server
// ============================================
app.listen(PORT, () => {
    console.log(`
  ╔════════════════════════════════════════════╗
  ║                                            ║
  ║   🚀 DataPulse API Server                  ║
  ║   Running on http://localhost:${PORT}         ║
  ║                                            ║
  ╚════════════════════════════════════════════╝
  `);

    // Create demo data
    const demoUser = {
        id: 'demo-user-001',
        name: 'Demo User',
        email: 'demo@datapulse.io',
        password: 'demo123',
        createdAt: new Date().toISOString(),
    };
    db.users.push(demoUser);

    const demoProject = {
        id: 'demo-project-001',
        userId: 'demo-user-001',
        name: 'Demo Website',
        domain: 'demo.datapulse.io',
        apiKey: 'dp_demo_key_12345',
        createdAt: new Date().toISOString(),
    };
    db.projects.push(demoProject);

    // Add some demo submissions
    const demoSubmissions = [
        { formId: 'contact-form', data: { name: 'John Doe', email: 'john@example.com', message: 'Hello!' } },
        { formId: 'newsletter', data: { email: 'jane@example.com' } },
        { formId: 'feedback', data: { rating: '5', comment: 'Great service!' } },
    ];

    demoSubmissions.forEach((sub, i) => {
        const date = new Date();
        date.setHours(date.getHours() - i * 2);

        db.submissions.push({
            id: generateId(),
            projectId: 'demo-project-001',
            formId: sub.formId,
            data: sub.data,
            pageUrl: 'https://demo.datapulse.io',
            timestamp: date.toISOString(),
        });
    });

    console.log('  Demo data created:');
    console.log('  - Demo user: demo@datapulse.io');
    console.log('  - Demo project with API key: dp_demo_key_12345');
    console.log('  - 3 sample submissions');
    console.log('');
});
