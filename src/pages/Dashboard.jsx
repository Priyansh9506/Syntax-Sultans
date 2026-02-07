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
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell } from 'recharts';
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

    // Peak hours chart data - group submissions by hour of day
    const peakHoursData = (() => {
        const hourCounts = {};
        // Initialize all hours
        for (let i = 0; i < 24; i++) {
            hourCounts[i] = 0;
        }
        // Count submissions per hour
        submissions.forEach(s => {
            const hour = new Date(s.timestamp).getHours();
            hourCounts[hour]++;
        });
        // Convert to chart data with formatted labels
        return Object.entries(hourCounts).map(([hour, count]) => {
            const h = parseInt(hour);
            const period = h >= 12 ? 'PM' : 'AM';
            const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
            return {
                hour: `${displayHour}${period}`,
                submissions: count,
                fullHour: h
            };
        });
    })();

    // Find peak hour for highlighting
    const maxSubmissions = Math.max(...peakHoursData.map(d => d.submissions));

    // Day of week chart data - group submissions by day of week
    const dayOfWeekData = (() => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

        submissions.forEach(s => {
            const day = new Date(s.timestamp).getDay();
            dayCounts[day]++;
        });

        return days.map((name, index) => ({
            day: name,
            submissions: dayCounts[index],
            isWeekend: index === 0 || index === 6
        }));
    })();

    // Find busiest day
    const maxDaySubmissions = Math.max(...dayOfWeekData.map(d => d.submissions));
    const busiestDay = dayOfWeekData.find(d => d.submissions === maxDaySubmissions);

    // Average interactions calculation
    const averageStats = (() => {
        if (submissions.length === 0) {
            return { daily: 0, weekly: 0, monthly: 0 };
        }

        // Get date range
        const dates = submissions.map(s => new Date(s.timestamp));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        const daysDiff = Math.max(1, Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1);

        const daily = (submissions.length / daysDiff).toFixed(1);
        const weekly = (submissions.length / Math.max(1, daysDiff / 7)).toFixed(1);
        const monthly = (submissions.length / Math.max(1, daysDiff / 30)).toFixed(1);

        return { daily, weekly, monthly };
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

                {/* Peak Hours Analytics */}
                <div className="peak-hours-section card">
                    <div className="card-header">
                        <h3>⏰ Peak Activity Hours</h3>
                        <span className="text-muted">When users prefer to visit</span>
                    </div>
                    <div className="peak-hours-chart-container">
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={peakHoursData}>
                                <XAxis
                                    dataKey="hour"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 10 }}
                                    interval={2}
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
                                    formatter={(value) => [value, 'Submissions']}
                                    labelFormatter={(label) => `Time: ${label}`}
                                />
                                <Bar dataKey="submissions" radius={[4, 4, 0, 0]}>
                                    {peakHoursData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.submissions === maxSubmissions && maxSubmissions > 0
                                                ? '#22c55e'
                                                : '#6366f1'
                                            }
                                            fillOpacity={entry.submissions === maxSubmissions && maxSubmissions > 0
                                                ? 1
                                                : 0.7
                                            }
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {maxSubmissions > 0 && (
                        <div className="peak-hours-insight">
                            <span className="peak-badge">🔥 Peak Hour</span>
                            <span>
                                Most activity at <strong>{peakHoursData.find(d => d.submissions === maxSubmissions)?.hour}</strong>
                            </span>
                        </div>
                    )}
                </div>

                {/* Average Interactions Stats */}
                <div className="average-stats-section">
                    <h3>📊 Average Interactions</h3>
                    <div className="average-stats-grid">
                        <div className="average-stat-card card">
                            <div className="average-stat-value">{averageStats.daily}</div>
                            <div className="average-stat-label">Per Day</div>
                            <div className="average-stat-sublabel">Daily average</div>
                        </div>
                        <div className="average-stat-card card">
                            <div className="average-stat-value">{averageStats.weekly}</div>
                            <div className="average-stat-label">Per Week</div>
                            <div className="average-stat-sublabel">Weekly average</div>
                        </div>
                        <div className="average-stat-card card">
                            <div className="average-stat-value">{averageStats.monthly}</div>
                            <div className="average-stat-label">Per Month</div>
                            <div className="average-stat-sublabel">Monthly average</div>
                        </div>
                    </div>
                </div>

                {/* Day of Week Analytics */}
                <div className="day-of-week-section card">
                    <div className="card-header">
                        <h3>📅 Activity by Day of Week</h3>
                        <span className="text-muted">Which days are busiest</span>
                    </div>
                    <div className="day-of-week-chart-container">
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={dayOfWeekData}>
                                <XAxis
                                    dataKey="day"
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
                                    formatter={(value) => [value, 'Submissions']}
                                />
                                <Bar dataKey="submissions" radius={[4, 4, 0, 0]}>
                                    {dayOfWeekData.map((entry, index) => (
                                        <Cell
                                            key={`day-cell-${index}`}
                                            fill={entry.submissions === maxDaySubmissions && maxDaySubmissions > 0
                                                ? '#f59e0b'
                                                : entry.isWeekend
                                                    ? '#8b5cf6'
                                                    : '#6366f1'
                                            }
                                            fillOpacity={entry.submissions === maxDaySubmissions && maxDaySubmissions > 0
                                                ? 1
                                                : 0.7
                                            }
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {maxDaySubmissions > 0 && busiestDay && (
                        <div className="day-of-week-insight">
                            <span className="day-badge">📈 Busiest Day</span>
                            <span>
                                Most submissions on <strong>{busiestDay.day === 'Sun' ? 'Sunday' :
                                    busiestDay.day === 'Mon' ? 'Monday' :
                                        busiestDay.day === 'Tue' ? 'Tuesday' :
                                            busiestDay.day === 'Wed' ? 'Wednesday' :
                                                busiestDay.day === 'Thu' ? 'Thursday' :
                                                    busiestDay.day === 'Fri' ? 'Friday' : 'Saturday'}</strong>
                            </span>
                        </div>
                    )}
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
