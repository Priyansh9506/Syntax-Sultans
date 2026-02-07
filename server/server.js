require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Root health check
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'DataPulse API is running',
        timestamp: new Date().toISOString()
    });
});

// Helper functions
const generateId = () => crypto.randomUUID();
const generateApiKey = () => `dp_${crypto.randomBytes(16).toString('hex')}`;
const generateToken = () => crypto.randomBytes(32).toString('hex');

// In-memory token store: token -> userId mapping
// In production, use Redis or database for token storage
const tokenStore = new Map();

// ============================================
// Auth Routes
// ============================================
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const { data: user, error } = await supabase
            .from('users')
            .insert({
                id: generateId(),
                name,
                email,
                password // In production, hash this!
            })
            .select()
            .single();

        if (error) throw error;

        const token = generateToken();

        // Store token -> userId mapping
        tokenStore.set(token, user.id);
        console.log(`[Auth] User registered: ${email} (ID: ${user.id})`);

        res.status(201).json({
            user: { id: user.id, name: user.name, email: user.email, createdAt: user.created_at },
            token,
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .single();

        if (error || !user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken();

        // Store token -> userId mapping
        tokenStore.set(token, user.id);
        console.log(`[Auth] User logged in: ${email} (ID: ${user.id})`);

        res.json({
            user: { id: user.id, name: user.name, email: user.email, createdAt: user.created_at },
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ============================================
// User Management Routes (require auth)
// ============================================

// Update profile (name)
app.put('/api/auth/profile', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];
        const userId = tokenStore.get(token);
        if (!userId) {
            return res.status(401).json({ message: 'Session expired, please login again' });
        }

        const { name } = req.body;

        const { data: user, error } = await supabase
            .from('users')
            .update({ name })
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;

        console.log(`[Auth] Profile updated for user: ${userId}`);
        res.json({ user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update password
app.put('/api/auth/password', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];
        const userId = tokenStore.get(token);
        if (!userId) {
            return res.status(401).json({ message: 'Session expired, please login again' });
        }

        const { currentPassword, newPassword } = req.body;

        // Verify current password
        const { data: user, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (fetchError || !user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== currentPassword) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Update password
        const { error } = await supabase
            .from('users')
            .update({ password: newPassword })
            .eq('id', userId);

        if (error) throw error;

        console.log(`[Auth] Password updated for user: ${userId}`);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Password update error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete account
app.delete('/api/auth/account', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];
        const userId = tokenStore.get(token);
        if (!userId) {
            return res.status(401).json({ message: 'Session expired, please login again' });
        }

        // Delete user's projects (submissions will cascade or be orphaned depending on DB setup)
        await supabase
            .from('projects')
            .delete()
            .eq('user_id', userId);

        // Delete user
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', userId);

        if (error) throw error;

        // Remove token
        tokenStore.delete(token);

        console.log(`[Auth] Account deleted for user: ${userId}`);
        res.status(204).send();
    } catch (error) {
        console.error('Account deletion error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ============================================
// Auth Middleware
// ============================================
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    // Check if token exists in our store
    const userId = tokenStore.get(token);

    if (userId) {
        // Valid token - use the actual user
        req.userId = userId;
        console.log(`[Auth] Request authenticated for user: ${userId}`);
        return next();
    }

    // Token not in store - check if it's a returning user by looking up in DB
    // This handles cases where server restarted but user has valid session in frontend
    // For now, reject invalid tokens (user needs to re-login after server restart)
    console.log(`[Auth] Invalid/expired token, user needs to re-login`);
    return res.status(401).json({ message: 'Session expired, please login again' });
};

// ============================================
// Projects Routes
// ============================================
app.get('/api/projects', authMiddleware, async (req, res) => {
    try {
        const { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', req.userId);

        if (error) throw error;

        // Get submission counts
        const projectsWithCount = await Promise.all(
            (projects || []).map(async (p) => {
                const { count } = await supabase
                    .from('submissions')
                    .select('*', { count: 'exact', head: true })
                    .eq('project_id', p.id);

                return { ...p, submissionCount: count || 0 };
            })
        );

        res.json(projectsWithCount);
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/projects', authMiddleware, async (req, res) => {
    try {
        const { name, domain } = req.body;

        const { data: project, error } = await supabase
            .from('projects')
            .insert({
                id: generateId(),
                user_id: req.userId,
                name,
                domain,
                api_key: generateApiKey()
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(project);
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/api/projects/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, domain } = req.body;

        const { data: project, error } = await supabase
            .from('projects')
            .update({ name, domain })
            .eq('id', id)
            .eq('user_id', req.userId)
            .select()
            .single();

        if (error) throw error;

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/api/projects/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id)
            .eq('user_id', req.userId);

        if (error) throw error;

        res.status(204).send();
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/projects/:id/key', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const newApiKey = generateApiKey();

        const { data: project, error } = await supabase
            .from('projects')
            .update({ api_key: newApiKey })
            .eq('id', id)
            .eq('user_id', req.userId)
            .select()
            .single();

        if (error || !project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ apiKey: project.api_key });
    } catch (error) {
        console.error('Regenerate key error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ============================================
// Tracking Route (Public - for SDK)
// ============================================
app.post('/api/track', async (req, res) => {
    try {
        const { apiKey, formId, data, pageUrl, userAgent } = req.body;

        // Find project by API key
        const { data: project, error: projectError } = await supabase
            .from('projects')
            .select('id, name')
            .eq('api_key', apiKey)
            .single();

        if (projectError || !project) {
            return res.status(401).json({ message: 'Invalid API key' });
        }

        // Insert submission with timestamp
        const { data: submission, error } = await supabase
            .from('submissions')
            .insert({
                id: generateId(),
                project_id: project.id,
                form_id: formId || 'unknown',
                data: data || {},
                page_url: pageUrl || '',
                user_agent: userAgent || '',
                timestamp: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;

        console.log(`[DataPulse] New submission for project "${project.name}":`, submission.id);

        res.status(201).json({ success: true, id: submission.id });
    } catch (error) {
        console.error('Track error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ============================================
// Submissions Routes
// ============================================
app.get('/api/submissions', authMiddleware, async (req, res) => {
    try {
        // Get user's project IDs
        const { data: projects } = await supabase
            .from('projects')
            .select('id')
            .eq('user_id', req.userId);

        const projectIds = (projects || []).map(p => p.id);

        if (projectIds.length === 0) {
            return res.json([]);
        }

        // Get submissions for those projects
        const { data: submissions, error } = await supabase
            .from('submissions')
            .select('*')
            .in('project_id', projectIds)
            .order('timestamp', { ascending: false });

        if (error) throw error;

        res.json(submissions || []);
    } catch (error) {
        console.error('Get submissions error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/submissions/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const { data: submission, error } = await supabase
            .from('submissions')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.json(submission);
    } catch (error) {
        console.error('Get submission error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ============================================
// Health Check
// ============================================
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: 'supabase', timestamp: new Date().toISOString() });
});

// ============================================
// Start Server
// ============================================

if (require.main === module) {
    app.listen(PORT, async () => {
        console.log(`
  ╔════════════════════════════════════════════╗
  ║                                            ║
  ║   🚀 DataPulse API Server                  ║
  ║   Running on http://localhost:${PORT}         ║
  ║   Database: Supabase (PostgreSQL)          ║
  ║                                            ║
  ╚════════════════════════════════════════════╝
  `);

        // Create demo user and project if they don't exist
        try {
            const { data: existingUser } = await supabase
                .from('users')
                .select('id')
                .eq('email', 'demo@datapulse.io')
                .single();

            if (!existingUser) {
                // Create with proper UUIDs
                const demoUserId = generateId();
                const demoProjectId = generateId();

                await supabase.from('users').insert({
                    id: demoUserId,
                    name: 'Demo User',
                    email: 'demo@datapulse.io',
                    password: 'demo123'
                });

                await supabase.from('projects').insert({
                    id: demoProjectId,
                    user_id: demoUserId,
                    name: 'Demo Website',
                    domain: 'demo.datapulse.io',
                    api_key: 'dp_demo_key_12345'
                });

                console.log('  Demo data created in Supabase');
            } else {
                // Check if demo project exists
                const { data: existingProject } = await supabase
                    .from('projects')
                    .select('id')
                    .eq('api_key', 'dp_demo_key_12345')
                    .single();

                if (!existingProject) {
                    await supabase.from('projects').insert({
                        id: generateId(),
                        user_id: existingUser.id,
                        name: 'Demo Website',
                        domain: 'demo.datapulse.io',
                        api_key: 'dp_demo_key_12345'
                    });
                    console.log('  Demo project created');
                } else {
                    console.log('  Demo data already exists');
                }
            }
        } catch (error) {
            console.log('  Note: Run SQL schema in Supabase first');
            console.log('  Error:', error.message);
        }

        console.log('');
    });
}

// Export the app for Vercel
module.exports = app;
