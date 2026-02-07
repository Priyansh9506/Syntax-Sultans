import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Activity,
    Bell,
    ChevronDown,
    LogOut,
    Settings,
    User
} from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar({ showAuth = true }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <div className="navbar-logo">
                        <Activity size={24} />
                    </div>
                    <span className="navbar-title">DataPulse</span>
                </Link>

                <div className="navbar-actions">
                    {showAuth && !user && (
                        <>
                            <Link to="/login" className="btn btn-ghost">
                                Log in
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Get Started
                            </Link>
                        </>
                    )}

                    {user && (
                        <>
                            <button className="navbar-icon-btn">
                                <Bell size={20} />
                                <span className="notification-dot"></span>
                            </button>

                            <div className="navbar-user">
                                <button
                                    className="navbar-user-btn"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <div className="navbar-avatar">
                                        {user.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <span className="navbar-user-name">{user.name}</span>
                                    <ChevronDown size={16} />
                                </button>

                                {showDropdown && (
                                    <div className="navbar-dropdown">
                                        <div className="navbar-dropdown-header">
                                            <p className="navbar-dropdown-name">{user.name}</p>
                                            <p className="navbar-dropdown-email">{user.email}</p>
                                        </div>
                                        <div className="navbar-dropdown-divider"></div>
                                        <Link to="/dashboard" className="navbar-dropdown-item">
                                            <Activity size={16} />
                                            Dashboard
                                        </Link>
                                        <Link to="/settings" className="navbar-dropdown-item">
                                            <Settings size={16} />
                                            Settings
                                        </Link>
                                        <div className="navbar-dropdown-divider"></div>
                                        <button
                                            className="navbar-dropdown-item navbar-dropdown-logout"
                                            onClick={handleLogout}
                                        >
                                            <LogOut size={16} />
                                            Log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
