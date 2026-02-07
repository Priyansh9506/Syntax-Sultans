import { NavLink, useLocation, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderKanban,
    Inbox,
    Code,
    BarChart3,
    Settings,
    HelpCircle,
    Activity
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/projects', icon: FolderKanban, label: 'Projects' },
    { path: '/submissions', icon: Inbox, label: 'Submissions' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/integration', icon: Code, label: 'Integration' },
];

const bottomItems = [
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/help', icon: HelpCircle, label: 'Help & Docs' },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="sidebar">
            <Link to="/" className="sidebar-header">
                <div className="sidebar-logo">
                    <Activity size={24} />
                </div>
                <span className="sidebar-title">DataPulse</span>
            </Link>

            <nav className="sidebar-nav">
                <div className="sidebar-section">
                    <span className="sidebar-section-label">Main</span>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>

                <div className="sidebar-section sidebar-bottom">
                    {bottomItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-upgrade">
                    <div className="sidebar-upgrade-icon">✨</div>
                    <div className="sidebar-upgrade-content">
                        <p className="sidebar-upgrade-title">Upgrade to Pro</p>
                        <p className="sidebar-upgrade-desc">Get unlimited tracking</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
