import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
    Activity,
    Zap,
    Shield,
    BarChart3,
    Code,
    ArrowRight,
    Check,
    Github
} from 'lucide-react';
import './Landing.css';

const features = [
    {
        icon: Code,
        title: 'Simple Integration',
        description: 'Add one line of code to start tracking. No complex setup or configuration required.'
    },
    {
        icon: Zap,
        title: 'Real-time Data',
        description: 'See form submissions as they happen. Instant notifications and live dashboard updates.'
    },
    {
        icon: BarChart3,
        title: 'Smart Analytics',
        description: 'Understand your form performance with beautiful charts and actionable insights.'
    },
    {
        icon: Shield,
        title: 'Secure & Private',
        description: 'Your data is encrypted and secure. We never share or sell your information.'
    }
];

const steps = [
    { num: '1', title: 'Create Project', desc: 'Sign up and create a new project for your website' },
    { num: '2', title: 'Add Snippet', desc: 'Copy the tracking code and add it to your website' },
    { num: '3', title: 'Track Data', desc: 'Start receiving form submissions in real-time' }
];

export default function Landing() {
    return (
        <div className="landing">
            <Navbar />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-gradient"></div>
                    <div className="hero-grid"></div>
                </div>

                <div className="hero-content">
                    <div className="hero-badge">
                        <Zap size={14} />
                        <span>Universal Data Tracking Platform</span>
                    </div>

                    <h1 className="hero-title">
                        Track Every Form Submission<br />
                        <span className="text-gradient">Without The Complexity</span>
                    </h1>

                    <p className="hero-description">
                        DataPulse helps developers and businesses capture, analyze, and understand
                        their website form data. Simple integration, powerful insights.
                    </p>

                    <div className="hero-actions">
                        <Link to="/register" className="btn btn-primary btn-lg">
                            Get Started Free
                            <ArrowRight size={20} />
                        </Link>
                        <Link to="/login" className="btn btn-secondary btn-lg">
                            View Demo
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-value">10K+</span>
                            <span className="hero-stat-label">Forms Tracked</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">500+</span>
                            <span className="hero-stat-label">Happy Users</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">99.9%</span>
                            <span className="hero-stat-label">Uptime</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Preview */}
                <div className="hero-preview">
                    <div className="preview-window">
                        <div className="preview-header">
                            <div className="preview-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span className="preview-url">datapulse.io/dashboard</span>
                        </div>
                        <div className="preview-content">
                            <div className="preview-sidebar">
                                <div className="preview-nav-item active"></div>
                                <div className="preview-nav-item"></div>
                                <div className="preview-nav-item"></div>
                            </div>
                            <div className="preview-main">
                                <div className="preview-cards">
                                    <div className="preview-card">
                                        <div className="preview-card-icon"></div>
                                        <div className="preview-card-value">1,234</div>
                                        <div className="preview-card-label">Submissions</div>
                                    </div>
                                    <div className="preview-card">
                                        <div className="preview-card-icon"></div>
                                        <div className="preview-card-value">48</div>
                                        <div className="preview-card-label">Today</div>
                                    </div>
                                    <div className="preview-card">
                                        <div className="preview-card-icon"></div>
                                        <div className="preview-card-value">3</div>
                                        <div className="preview-card-label">Projects</div>
                                    </div>
                                </div>
                                <div className="preview-chart"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features section">
                <div className="page-container">
                    <div className="section-header">
                        <h2>Everything You Need</h2>
                        <p>Powerful features to help you track and understand your form data</p>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card card">
                                <div className="feature-icon">
                                    <feature.icon size={24} />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works section">
                <div className="page-container">
                    <div className="section-header">
                        <h2>Get Started in Minutes</h2>
                        <p>Three simple steps to start tracking your form data</p>
                    </div>

                    <div className="steps">
                        {steps.map((step, index) => (
                            <div key={index} className="step">
                                <div className="step-number">{step.num}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="code-example">
                        <div className="code-block">
                            <div className="code-header">
                                <span>Integration Code</span>
                                <button className="btn btn-sm btn-ghost">Copy</button>
                            </div>
                            <pre><code>{`<!-- Add this before </body> -->
<script src="https://datapulse.io/track.js" 
        data-key="YOUR_API_KEY">
</script>`}</code></pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta section">
                <div className="page-container">
                    <div className="cta-card card-glass">
                        <h2>Ready to Start Tracking?</h2>
                        <p>Join thousands of developers who trust DataPulse for their form analytics</p>
                        <Link to="/register" className="btn btn-primary btn-lg">
                            Create Free Account
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="page-container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <Activity size={24} />
                                <span>DataPulse</span>
                            </div>
                            <p>Universal data tracking for modern websites</p>
                        </div>

                        <div className="footer-links">
                            <div className="footer-column">
                                <h4>Product</h4>
                                <a href="#">Features</a>
                                <a href="#">Pricing</a>
                                <a href="#">Documentation</a>
                            </div>
                            <div className="footer-column">
                                <h4>Company</h4>
                                <a href="#">About</a>
                                <a href="#">Blog</a>
                                <a href="#">Careers</a>
                            </div>
                            <div className="footer-column">
                                <h4>Legal</h4>
                                <a href="#">Privacy</a>
                                <a href="#">Terms</a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2026 DataPulse. All rights reserved.</p>
                        <a href="https://github.com" className="footer-social">
                            <Github size={20} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
