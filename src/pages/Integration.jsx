import { useState } from 'react';
import { useData } from '../context/DataContext';
import Sidebar from '../components/Sidebar';
import {
    Copy,
    Check,
    Code,
    CheckCircle2,
    ChevronRight,
    ExternalLink,
    AlertCircle
} from 'lucide-react';
import './Integration.css';

export default function Integration() {
    const { projects } = useData();
    const [selectedProject, setSelectedProject] = useState(projects[0]?.id || '');
    const [copiedSnippet, setCopiedSnippet] = useState(false);

    const project = projects.find(p => p.id === selectedProject);
    const apiKey = project?.apiKey || 'YOUR_API_KEY';

    // Use current origin for local development, or the production URL
    const trackingUrl = window.location.origin;

    const trackingSnippet = `<!-- DataPulse Tracking Code -->
<script>
(function(d,p,k){
  var s=d.createElement('script');
  s.src='${trackingUrl}/datapulse.js';
  s.dataset.key=k;
  s.async=true;
  d.head.appendChild(s);
})(document,'datapulse','${apiKey}');
</script>`;

    const copySnippet = () => {
        navigator.clipboard.writeText(trackingSnippet);
        setCopiedSnippet(true);
        setTimeout(() => setCopiedSnippet(false), 2000);
    };

    const steps = [
        {
            number: 1,
            title: 'Select Your Project',
            description: 'Choose the project you want to add tracking to',
            completed: !!selectedProject
        },
        {
            number: 2,
            title: 'Copy the Tracking Code',
            description: 'Copy the JavaScript snippet below',
            completed: copiedSnippet
        },
        {
            number: 3,
            title: 'Add to Your Website',
            description: 'Paste the code before the closing </body> tag',
            completed: false
        },
        {
            number: 4,
            title: 'Start Tracking',
            description: 'Form submissions will appear in your dashboard',
            completed: false
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
                    {/* Steps */}
                    <div className="integration-steps">
                        <h3>Quick Setup Guide</h3>
                        <div className="steps-list">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`step-item ${step.completed ? 'completed' : ''}`}
                                >
                                    <div className="step-icon">
                                        {step.completed ? (
                                            <CheckCircle2 size={24} />
                                        ) : (
                                            <span>{step.number}</span>
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

                    {/* Code Section */}
                    <div className="integration-code">
                        {projects.length === 0 ? (
                            <div className="integration-alert">
                                <AlertCircle size={20} />
                                <div>
                                    <strong>No projects yet</strong>
                                    <p>Create a project first to get your tracking code</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="input-group">
                                    <label>Select Project</label>
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

                                <div className="code-section">
                                    <div className="code-header">
                                        <div className="code-title">
                                            <Code size={18} />
                                            <span>Tracking Code</span>
                                        </div>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={copySnippet}
                                        >
                                            {copiedSnippet ? (
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
                                        <code>{trackingSnippet}</code>
                                    </pre>
                                </div>

                                <div className="integration-info card">
                                    <h4>What the tracking code does:</h4>
                                    <ul>
                                        <li>
                                            <Check size={16} />
                                            Automatically detects all forms on your page
                                        </li>
                                        <li>
                                            <Check size={16} />
                                            Captures form submissions without affecting normal behavior
                                        </li>
                                        <li>
                                            <Check size={16} />
                                            Sends data securely to your DataPulse dashboard
                                        </li>
                                        <li>
                                            <Check size={16} />
                                            Lightweight (~2KB) - won't slow down your site
                                        </li>
                                    </ul>
                                </div>

                                <div className="integration-help">
                                    <h4>Need Help?</h4>
                                    <p>Check out our documentation for detailed integration guides and troubleshooting.</p>
                                    <a href="#" className="btn btn-secondary">
                                        View Documentation
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
