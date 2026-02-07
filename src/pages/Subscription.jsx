import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
    Check,
    X,
    Zap,
    Crown,
    Rocket,
    ArrowRight,
    Activity,
    Shield,
    Users,
    Clock,
    Star,
    Sparkles
} from 'lucide-react';
import './Subscription.css';

const plans = [
    {
        id: 'free',
        name: 'Starter',
        icon: Zap,
        price: 0,
        period: 'forever',
        description: 'Perfect for trying out DataPulse with basic tracking needs',
        features: [
            { text: '1 Project', included: true },
            { text: '100 Submissions/month', included: true },
            { text: 'Basic Analytics Dashboard', included: true },
            { text: '7-day Data Retention', included: true },
            { text: 'Community Support', included: true },
            { text: 'API Access', included: false },
            { text: 'Custom Branding', included: false },
            { text: 'Priority Support', included: false }
        ],
        buttonText: 'Get Started Free',
        buttonVariant: 'secondary',
        popular: false
    },
    {
        id: 'pro',
        name: 'Professional',
        icon: Crown,
        price: 29,
        period: 'month',
        description: 'For growing businesses that need powerful analytics',
        features: [
            { text: 'Unlimited Projects', included: true },
            { text: '50,000 Submissions/month', included: true },
            { text: 'Advanced Analytics & Reports', included: true },
            { text: '1-year Data Retention', included: true },
            { text: 'Priority Email Support', included: true },
            { text: 'Full API Access', included: true },
            { text: 'Webhooks Integration', included: true },
            { text: 'Custom Branding', included: false }
        ],
        buttonText: 'Start 14-Day Free Trial',
        buttonVariant: 'primary',
        popular: true
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        icon: Rocket,
        price: 149,
        period: 'month',
        description: 'For large teams with custom requirements and SLAs',
        features: [
            { text: 'Unlimited Everything', included: true },
            { text: 'Unlimited Submissions', included: true },
            { text: 'Custom Analytics & BI', included: true },
            { text: 'Unlimited Data Retention', included: true },
            { text: 'Dedicated Account Manager', included: true },
            { text: 'Full API + SDK Access', included: true },
            { text: 'SSO & Advanced Security', included: true },
            { text: 'Custom Branding + White Label', included: true }
        ],
        buttonText: 'Contact Sales',
        buttonVariant: 'secondary',
        popular: false
    }
];

const faqs = [
    {
        question: 'Can I change plans at any time?',
        answer: 'Absolutely! You can upgrade or downgrade your plan whenever you need. Changes take effect immediately, and we\'ll prorate your billing automatically. No hidden fees or penalties.'
    },
    {
        question: 'What happens if I exceed my submission limit?',
        answer: 'We\'ll notify you at 80% and 100% of your limit. Your forms continue working, but new submissions queue until the next cycle or you upgrade. No data is ever lost.'
    },
    {
        question: 'Is there really a free trial for Pro?',
        answer: 'Yes! Start your 14-day Pro trial with full features—no credit card required. Experience everything DataPulse has to offer risk-free.'
    },
    {
        question: 'Do you offer refunds?',
        answer: 'We offer a 30-day money-back guarantee on all paid plans. If DataPulse isn\'t the right fit, contact us for a hassle-free full refund.'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and for Enterprise customers, we offer invoicing and wire transfers.'
    },
    {
        question: 'Is my data secure?',
        answer: 'Security is our priority. All data is encrypted at rest and in transit. We\'re SOC 2 compliant and GDPR ready. Enterprise plans include additional security features.'
    }
];

const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'Product Manager at TechFlow',
        content: 'DataPulse transformed how we understand our users. The analytics are incredibly intuitive.',
        avatar: '👩‍💼'
    },
    {
        name: 'Marcus Rivera',
        role: 'Founder of StartupLab',
        content: 'We switched from a complex setup to DataPulse. Setup took 5 minutes, not 5 days.',
        avatar: '👨‍💻'
    },
    {
        name: 'Emily Watson',
        role: 'Growth Lead at ScaleUp',
        content: 'The real-time tracking helped us increase form conversions by 40%. Game changer.',
        avatar: '👩‍🚀'
    }
];

export default function Subscription() {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [expandedFaq, setExpandedFaq] = useState(null);

    const getPrice = (plan) => {
        if (plan.price === 0) return 0;
        return billingCycle === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price;
    };

    return (
        <div className="subscription-page">
            <Navbar />

            {/* Hero Section */}
            <section className="subscription-hero">
                <div className="hero-bg">
                    <div className="hero-gradient"></div>
                    <div className="hero-grid"></div>
                </div>

                <div className="subscription-hero-content">
                    <div className="hero-badge">
                        <Sparkles size={14} />
                        <span>Simple, Transparent Pricing</span>
                    </div>
                    <h1>
                        Choose the <span className="text-gradient">Perfect Plan</span>
                    </h1>
                    <p className="hero-description">
                        Start free and scale effortlessly as your business grows.
                        No hidden fees, no surprises. Cancel anytime.
                    </p>

                    {/* Billing Toggle */}
                    <div className="billing-toggle">
                        <button
                            className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                            onClick={() => setBillingCycle('monthly')}
                        >
                            Monthly
                        </button>
                        <button
                            className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
                            onClick={() => setBillingCycle('yearly')}
                        >
                            Yearly
                            <span className="save-badge">Save 20%</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pricing-section">
                <div className="page-container">
                    <div className="pricing-grid">
                        {plans.map((plan, index) => (
                            <div
                                key={plan.id}
                                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {plan.popular && (
                                    <div className="popular-badge">
                                        <Star size={12} style={{ marginRight: '6px' }} />
                                        Most Popular
                                    </div>
                                )}
                                <div className="pricing-card-header">
                                    <div className="plan-icon">
                                        <plan.icon size={28} />
                                    </div>
                                    <h3>{plan.name}</h3>
                                    <p className="plan-description">{plan.description}</p>
                                </div>

                                <div className="pricing-card-price">
                                    <span className="currency">$</span>
                                    <span className="amount">{getPrice(plan)}</span>
                                    {plan.price > 0 && (
                                        <span className="period">/{billingCycle === 'yearly' ? 'mo' : 'month'}</span>
                                    )}
                                </div>
                                {billingCycle === 'yearly' && plan.price > 0 && (
                                    <p className="yearly-note">
                                        💰 Billed ${getPrice(plan) * 12}/year — Save ${plan.price * 12 - getPrice(plan) * 12}
                                    </p>
                                )}

                                <ul className="features-list">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className={feature.included ? 'included' : 'excluded'}>
                                            {feature.included ? (
                                                <Check size={16} className="feature-icon check" />
                                            ) : (
                                                <X size={16} className="feature-icon x" />
                                            )}
                                            <span>{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to={plan.id === 'enterprise' ? '/contact' : '/register'}
                                    className={`btn btn-${plan.buttonVariant} btn-lg w-full`}
                                >
                                    {plan.buttonText}
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="trust-section">
                <div className="page-container">
                    <div className="trust-grid">
                        <div className="trust-item">
                            <Shield size={24} />
                            <div>
                                <h4>Enterprise Security</h4>
                                <p>SOC 2 compliant & GDPR ready</p>
                            </div>
                        </div>
                        <div className="trust-item">
                            <Users size={24} />
                            <div>
                                <h4>10,000+ Users</h4>
                                <p>Trusted by developers worldwide</p>
                            </div>
                        </div>
                        <div className="trust-item">
                            <Clock size={24} />
                            <div>
                                <h4>99.9% Uptime</h4>
                                <p>Reliable infrastructure always</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
                <div className="page-container">
                    <div className="section-header">
                        <h2>Loved by Developers</h2>
                        <p>See what our customers have to say</p>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="testimonial-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                                    ))}
                                </div>
                                <p className="testimonial-content">"{testimonial.content}"</p>
                                <div className="testimonial-author">
                                    <span className="testimonial-avatar">{testimonial.avatar}</span>
                                    <div>
                                        <h5>{testimonial.name}</h5>
                                        <p>{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Comparison */}
            <section className="comparison-section">
                <div className="page-container">
                    <div className="section-header">
                        <h2>Compare All Features</h2>
                        <p>Find the perfect plan for your needs</p>
                    </div>

                    <div className="comparison-table-wrapper">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th>Starter</th>
                                    <th className="highlight">Professional</th>
                                    <th>Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Projects</td>
                                    <td>1</td>
                                    <td className="highlight">Unlimited</td>
                                    <td>Unlimited</td>
                                </tr>
                                <tr>
                                    <td>Monthly Submissions</td>
                                    <td>100</td>
                                    <td className="highlight">50,000</td>
                                    <td>Unlimited</td>
                                </tr>
                                <tr>
                                    <td>Data Retention</td>
                                    <td>7 days</td>
                                    <td className="highlight">1 year</td>
                                    <td>Unlimited</td>
                                </tr>
                                <tr>
                                    <td>Analytics Dashboard</td>
                                    <td>Basic</td>
                                    <td className="highlight">Advanced</td>
                                    <td>Custom + BI</td>
                                </tr>
                                <tr>
                                    <td>API Access</td>
                                    <td><X size={18} className="icon-x" /></td>
                                    <td className="highlight"><Check size={18} className="icon-check" /></td>
                                    <td><Check size={18} className="icon-check" /></td>
                                </tr>
                                <tr>
                                    <td>Webhooks</td>
                                    <td><X size={18} className="icon-x" /></td>
                                    <td className="highlight"><Check size={18} className="icon-check" /></td>
                                    <td><Check size={18} className="icon-check" /></td>
                                </tr>
                                <tr>
                                    <td>Team Members</td>
                                    <td>1</td>
                                    <td className="highlight">10</td>
                                    <td>Unlimited</td>
                                </tr>
                                <tr>
                                    <td>SSO / SAML</td>
                                    <td><X size={18} className="icon-x" /></td>
                                    <td className="highlight"><X size={18} className="icon-x" /></td>
                                    <td><Check size={18} className="icon-check" /></td>
                                </tr>
                                <tr>
                                    <td>Support</td>
                                    <td>Community</td>
                                    <td className="highlight">Priority Email</td>
                                    <td>Dedicated Manager</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="page-container">
                    <div className="section-header">
                        <h2>Frequently Asked Questions</h2>
                        <p>Everything you need to know about DataPulse</p>
                    </div>

                    <div className="faq-grid">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            >
                                <div className="faq-question">
                                    <h4>{faq.question}</h4>
                                    <span className="faq-toggle">+</span>
                                </div>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta section">
                <div className="page-container">
                    <div className="cta-card card-glass">
                        <h2>Ready to Transform Your Data?</h2>
                        <p>Join 10,000+ developers already using DataPulse to power their analytics</p>
                        <div className="cta-buttons">
                            <Link to="/register" className="btn btn-primary btn-lg">
                                Start Free Trial
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/contact" className="btn btn-secondary btn-lg">
                                Talk to Sales
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="page-container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <Activity size={22} />
                                <span>DataPulse</span>
                            </div>
                            <p>Universal data tracking for modern websites</p>
                        </div>

                        <div className="footer-links">
                            <div className="footer-column">
                                <h4>Product</h4>
                                <Link to="/#features">Features</Link>
                                <Link to="/subscription">Pricing</Link>
                                <Link to="/integration">Documentation</Link>
                            </div>
                            <div className="footer-column">
                                <h4>Account</h4>
                                <Link to="/login">Sign In</Link>
                                <Link to="/register">Sign Up</Link>
                                <Link to="/dashboard">Dashboard</Link>
                            </div>
                            <div className="footer-column">
                                <h4>Resources</h4>
                                <Link to="/integration">Integration Guide</Link>
                                <Link to="/projects">Projects</Link>
                                <Link to="/submissions">Submissions</Link>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© 2026 DataPulse. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
