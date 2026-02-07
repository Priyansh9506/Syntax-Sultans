import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Sidebar from '../components/Sidebar';
import {
    Inbox,
    FolderKanban,
    TrendingUp,
    Activity,
    ArrowRight,
    ArrowUpRight,
    Clock,
    ExternalLink
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { format } from 'date-fns';
import './Dashboard.css';

export default function Dashboard() {
    const { stats, submissions, projects, loading, refresh } = useData();

    useEffect(() => {
        refresh();
        // Poll for updates every 30 seconds
        const interval = setInterval(refresh, 30000);
        return () => clearInterval(interval);
    }, [refresh]);

    // Generate chart data from submissions
    const chartData = (() => {
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayStr = format(date, 'MMM dd');
            const count = submissions.filter(s =>
                format(new Date(s.timestamp), 'MMM dd') === dayStr
            ).length;
            last7Days.push({ name: dayStr, submissions: count });
        }
        return last7Days;
    })();

    // Recent submissions
    const recentSubmissions = submissions.slice(0, 5);

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="dashboard-content">
                <div className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p className="text-secondary">Welcome back! Here's your overview.</p>
                    </div>
                    <div className="dashboard-header-actions">
                        <Link to="/integration" className="btn btn-primary">
                            Add Tracking Code
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <div className="stat-card-icon">
                                <Inbox size={24} />
                            </div>
                            <span className="stat-card-change positive">
                                <ArrowUpRight size={14} />
                                12%
                            </span>
                        </div>
                        <div className="stat-card-value">{stats.totalSubmissions}</div>
                        <div className="stat-card-label">Total Submissions</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-header">
                            <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
                                <TrendingUp size={24} />
                            </div>
                            <span className="stat-card-change positive">
                                <ArrowUpRight size={14} />
                                8%
                            </span>
                        </div>
                        <div className="stat-card-value">{stats.todaySubmissions}</div>
                        <div className="stat-card-label">Today's Submissions</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-header">
                            <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                                <FolderKanban size={24} />
                            </div>
                        </div>
                        <div className="stat-card-value">{stats.activeProjects}</div>
                        <div className="stat-card-label">Active Projects</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-header">
                            <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
                                <Activity size={24} />
                            </div>
                        </div>
                        <div className="stat-card-value">{stats.conversionRate}%</div>
                        <div className="stat-card-label">Conversion Rate</div>
                    </div>
                </div>

                {/* Chart & Recent Activity */}
                <div className="dashboard-grid">
                    <div className="dashboard-chart card">
                        <div className="card-header">
                            <h3>Submissions Overview</h3>
                            <span className="text-muted">Last 7 days</span>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: '#1a1a25',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            color: '#f8fafc'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="submissions"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorSubmissions)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="dashboard-recent card">
                        <div className="card-header">
                            <h3>Recent Submissions</h3>
                            <Link to="/submissions" className="text-muted">
                                View all <ExternalLink size={14} />
                            </Link>
                        </div>

                        {recentSubmissions.length === 0 ? (
                            <div className="empty-state">
                                <Inbox size={48} className="empty-state-icon" />
                                <h4>No submissions yet</h4>
                                <p>Add the tracking code to start receiving data</p>
                            </div>
                        ) : (
                            <div className="recent-list">
                                {recentSubmissions.map((submission, index) => {
                                    const project = projects.find(p => p.id === submission.project_id);
                                    return (
                                        <div key={index} className="recent-item">
                                            <div className="recent-item-icon">
                                                <Inbox size={16} />
                                            </div>
                                            <div className="recent-item-content">
                                                <p className="recent-item-title">
                                                    {submission.form_id || 'Form Submission'}
                                                </p>
                                                <p className="recent-item-meta">
                                                    🌐 {project?.name || project?.domain || 'Unknown Website'}
                                                </p>
                                            </div>
                                            <div className="recent-item-time">
                                                <Clock size={12} />
                                                {format(new Date(submission.timestamp), 'HH:mm')}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h3>Quick Actions</h3>
                    <div className="quick-actions-grid">
                        <Link to="/projects" className="quick-action-card card">
                            <FolderKanban size={24} />
                            <span>Create New Project</span>
                        </Link>
                        <Link to="/integration" className="quick-action-card card">
                            <Activity size={24} />
                            <span>Get Tracking Code</span>
                        </Link>
                        <Link to="/submissions" className="quick-action-card card">
                            <Inbox size={24} />
                            <span>View All Submissions</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
