import { useState } from 'react';
import { useData } from '../context/DataContext';
import Sidebar from '../components/Sidebar';
import {
    Copy,
    Check,
    Code,
    CheckCircle2,
    ExternalLink,
    AlertCircle,
    Terminal,
    FileCode,
    Zap,
    Shield,
    Eye,
    Key,
    RotateCcw
} from 'lucide-react';
import './Integration.css';

export default function Integration() {
    const { projects } = useData();
    const [selectedProject, setSelectedProject] = useState(projects[0]?.id || '');
    const [copiedSnippet, setCopiedSnippet] = useState(null);
    const [activeFramework, setActiveFramework] = useState('html');
    const [showApiKey, setShowApiKey] = useState(false);

    const project = projects.find(p => p.id === selectedProject);
    const apiKey = project?.apiKey || 'YOUR_API_KEY';
    const maskedApiKey = apiKey.slice(0, 8) + '...' + apiKey.slice(-4);

    const trackingUrl = window.location.origin;

    const codeSnippets = {
        html: {
            name: 'HTML',
            icon: '🌐',
            language: 'html',
            code: `<!-- DataPulse Tracking Code -->
<script>
(function(d,p,k){
  var s=d.createElement('script');
  s.src='${trackingUrl}/datapulse.js';
  s.dataset.key=k;
  s.async=true;
  d.head.appendChild(s);
})(document,'datapulse','${apiKey}');
</script>

<!-- Place before closing </body> tag -->`
        },
        react: {
            name: 'React',
            icon: '⚛️',
            language: 'jsx',
            code: `// Install: npm install @datapulse/react

import { DataPulse } from '@datapulse/react';

function App() {
  return (
    <>
      <DataPulse apiKey="${apiKey}" />
      {/* Your app components */}
    </>
  );
}

// Or use the hook for custom tracking:
import { useDataPulse } from '@datapulse/react';

function ContactForm() {
  const { track } = useDataPulse();
  
  const handleSubmit = (data) => {
    track('form_submit', { formName: 'contact', ...data });
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}`
        },
        nextjs: {
            name: 'Next.js',
            icon: '▲',
            language: 'jsx',
            code: `// app/layout.js (App Router)
import { DataPulseProvider } from '@datapulse/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <DataPulseProvider apiKey="${apiKey}">
          {children}
        </DataPulseProvider>
      </body>
    </html>
  );
}

// Or for Pages Router - pages/_app.js
import { DataPulseProvider } from '@datapulse/react';

export default function App({ Component, pageProps }) {
  return (
    <DataPulseProvider apiKey="${apiKey}">
      <Component {...pageProps} />
    </DataPulseProvider>
  );
}`
        },
        api: {
            name: 'REST API',
            icon: '🔗',
            language: 'bash',
            code: `# Send form submission via API
curl -X POST ${trackingUrl}/api/track \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: ${apiKey}" \\
  -d '{
    "event": "form_submit",
    "formName": "contact",
    "data": {
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello!"
    },
    "metadata": {
      "page": "/contact",
      "referrer": "google.com"
    }
  }'

# Response: { "success": true, "id": "sub_abc123" }`
        }
    };

    const copyCode = (key) => {
        navigator.clipboard.writeText(codeSnippets[key].code);
        setCopiedSnippet(key);
        setTimeout(() => setCopiedSnippet(null), 2000);
    };

    const copyApiKey = () => {
        navigator.clipboard.writeText(apiKey);
        setCopiedSnippet('apiKey');
        setTimeout(() => setCopiedSnippet(null), 2000);
    };

    const steps = [
        {
            number: 1,
            title: 'Select Project',
            description: 'Choose which project to integrate',
            icon: FileCode,
            completed: !!selectedProject
        },
        {
            number: 2,
            title: 'Copy Code',
            description: 'Choose your framework & copy',
            icon: Copy,
            completed: copiedSnippet === activeFramework
        },
        {
            number: 3,
            title: 'Add to App',
            description: 'Paste into your application',
            icon: Terminal,
            completed: false
        },
        {
            number: 4,
            title: 'Start Tracking',
            description: 'Data flows to your dashboard',
            icon: Zap,
            completed: false
        }
    ];

    const features = [
        {
            icon: Eye,
            title: 'Auto-Detection',
            description: 'Automatically finds and tracks all forms'
        },
        {
            icon: Shield,
            title: 'Privacy First',
            description: 'GDPR compliant, data encrypted at rest'
        },
        {
            icon: Zap,
            title: 'Lightweight',
            description: 'Only ~2KB gzipped, zero dependencies'
        },
        {
            icon: RotateCcw,
            title: 'Real-time',
            description: 'See submissions instantly in dashboard'
        }
    ];

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="dashboard-content">
                <div className="page-header">
                    <div>
                        <h1>Integration</h1>
                        <p className="text-secondary">Add DataPulse tracking to your website in minutes</p>
                    </div>
                </div>

                <div className="integration-layout">
                    {/* Left Column - Steps & Features */}
                    <div className="integration-sidebar">
                        {/* Quick Setup Steps */}
                        <div className="integration-steps card">
                            <h3>
                                <Terminal size={18} />
                                Quick Setup
                            </h3>
                            <div className="steps-list">
                                {steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className={`step-item ${step.completed ? 'completed' : ''}`}
                                    >
                                        <div className="step-icon">
                                            {step.completed ? (
                                                <CheckCircle2 size={20} />
                                            ) : (
                                                <step.icon size={18} />
                                            )}
                                        </div>
                                        <div className="step-content">
                                            <h4>{step.title}</h4>
                                            <p>{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features Card */}
                        <div className="integration-features card">
                            <h3>What You Get</h3>
                            <div className="features-grid">
                                {features.map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <div className="feature-icon">
                                            <feature.icon size={16} />
                                        </div>
                                        <div>
                                            <h5>{feature.title}</h5>
                                            <p>{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Code */}
                    <div className="integration-main">
                        {projects.length === 0 ? (
                            <div className="integration-alert">
                                <AlertCircle size={24} />
                                <div>
                                    <strong>No Projects Yet</strong>
                                    <p>Create a project first to get your unique tracking code and API key.</p>
                                    <a href="/projects" className="btn btn-primary btn-sm">
                                        Create Project
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Project Selector & API Key */}
                                <div className="integration-header card">
                                    <div className="project-selector">
                                        <label>Project</label>
                                        <select
                                            className="input"
                                            value={selectedProject}
                                            onChange={(e) => setSelectedProject(e.target.value)}
                                        >
                                            {projects.map(project => (
                                                <option key={project.id} value={project.id}>
                                                    {project.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="api-key-display">
                                        <label>
                                            <Key size={14} />
                                            API Key
                                        </label>
                                        <div className="api-key-value">
                                            <code>{showApiKey ? apiKey : maskedApiKey}</code>
                                            <div className="api-key-actions">
                                                <button
                                                    className="icon-btn"
                                                    onClick={() => setShowApiKey(!showApiKey)}
                                                    title={showApiKey ? 'Hide' : 'Show'}
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    className="icon-btn"
                                                    onClick={copyApiKey}
                                                    title="Copy"
                                                >
                                                    {copiedSnippet === 'apiKey' ? (
                                                        <Check size={16} />
                                                    ) : (
                                                        <Copy size={16} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Framework Tabs */}
                                <div className="code-section">
                                    <div className="framework-tabs">
                                        {Object.entries(codeSnippets).map(([key, framework]) => (
                                            <button
                                                key={key}
                                                className={`framework-tab ${activeFramework === key ? 'active' : ''}`}
                                                onClick={() => setActiveFramework(key)}
                                            >
                                                <span className="framework-icon">{framework.icon}</span>
                                                {framework.name}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="code-block">
                                        <div className="code-header">
                                            <div className="code-dots">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                            <span className="code-language">
                                                {codeSnippets[activeFramework].language}
                                            </span>
                                            <button
                                                className={`btn btn-sm ${copiedSnippet === activeFramework ? 'btn-success' : 'btn-primary'}`}
                                                onClick={() => copyCode(activeFramework)}
                                            >
                                                {copiedSnippet === activeFramework ? (
                                                    <>
                                                        <Check size={14} />
                                                        Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy size={14} />
                                                        Copy Code
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <pre className="code-content">
                                            <code className={`language-${codeSnippets[activeFramework].language}`}>
                                                {codeSnippets[activeFramework].code}
                                            </code>
                                        </pre>
                                    </div>
                                </div>

                                {/* Help Links */}
                                <div className="integration-links">
                                    <a href="/submissions" className="link-card">
                                        <div className="link-icon">
                                            <Terminal size={20} />
                                        </div>
                                        <div>
                                            <h4>View Submissions</h4>
                                            <p>Check if data is flowing correctly</p>
                                        </div>
                                        <ExternalLink size={16} />
                                    </a>
                                    <a href="/dashboard" className="link-card">
                                        <div className="link-icon">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <h4>Analytics Dashboard</h4>
                                            <p>View real-time form analytics</p>
                                        </div>
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
