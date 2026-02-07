import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import {
    User,
    Lock,
    AlertTriangle,
    Save,
    Trash2,
    CheckCircle,
    XCircle
} from 'lucide-react';
import './Settings.css';

const API_URL = 'http://localhost:3001/api';

export default function Settings() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Profile state
    const [name, setName] = useState(user?.name || '');
    const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
    const [savingProfile, setSavingProfile] = useState(false);

    // Password state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
    const [savingPassword, setSavingPassword] = useState(false);

    // Delete modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const getToken = () => localStorage.getItem('datapulse_token');

    // Handle profile update
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        setProfileMessage({ type: '', text: '' });

        try {
            const response = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({ name })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            // Update local storage
            const storedUser = JSON.parse(localStorage.getItem('datapulse_user'));
            storedUser.name = name;
            localStorage.setItem('datapulse_user', JSON.stringify(storedUser));

            setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });

            // Reload to update navbar
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            setProfileMessage({ type: 'error', text: error.message });
        } finally {
            setSavingProfile(false);
        }
    };

    // Handle password update
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setSavingPassword(true);
        setPasswordMessage({ type: '', text: '' });

        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
            setSavingPassword(false);
            return;
        }

        if (newPassword.length < 6) {
            setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            setSavingPassword(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/auth/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update password');
            }

            setPasswordMessage({ type: 'success', text: 'Password updated successfully!' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setPasswordMessage({ type: 'error', text: error.message });
        } finally {
            setSavingPassword(false);
        }
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        setDeleting(true);

        try {
            const response = await fetch(`${API_URL}/auth/account`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to delete account');
            }

            // Logout and redirect
            logout();
            navigate('/');
        } catch (error) {
            alert(error.message);
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="settings-page">
            <Sidebar />
            <main className="settings-content">
                <div className="settings-header">
                    <h1>Settings</h1>
                    <p>Manage your account settings and preferences</p>
                </div>

                {/* Profile Section */}
                <section className="settings-section">
                    <h2><User size={20} /> Profile</h2>
                    <p>Update your personal information</p>

                    {profileMessage.text && (
                        <div className={`message ${profileMessage.type}`}>
                            {profileMessage.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                            {profileMessage.text}
                        </div>
                    )}

                    <form className="settings-form" onSubmit={handleProfileUpdate}>
                        <div className="form-group">
                            <label>Display Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                disabled
                                style={{ opacity: 0.6, cursor: 'not-allowed' }}
                            />
                        </div>
                        <button type="submit" className="btn-save" disabled={savingProfile}>
                            <Save size={16} />
                            {savingProfile ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </section>

                {/* Password Section */}
                <section className="settings-section">
                    <h2><Lock size={20} /> Password</h2>
                    <p>Change your password to keep your account secure</p>

                    {passwordMessage.text && (
                        <div className={`message ${passwordMessage.type}`}>
                            {passwordMessage.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                            {passwordMessage.text}
                        </div>
                    )}

                    <form className="settings-form" onSubmit={handlePasswordUpdate}>
                        <div className="form-group">
                            <label>Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn-save" disabled={savingPassword}>
                            <Save size={16} />
                            {savingPassword ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </section>

                {/* Danger Zone */}
                <section className="settings-section danger">
                    <h2><AlertTriangle size={20} /> Danger Zone</h2>
                    <p>Permanently delete your account and all associated data. This action cannot be undone.</p>

                    <button className="btn-delete" onClick={() => setShowDeleteModal(true)}>
                        <Trash2 size={16} />
                        Delete Account
                    </button>
                </section>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-icon">
                                <AlertTriangle size={28} />
                            </div>
                            <h3>Delete Account?</h3>
                            <p>
                                This will permanently delete your account, all projects, and submissions.
                                This action cannot be undone.
                            </p>
                            <div className="modal-actions">
                                <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                                <button
                                    className="btn-confirm-delete"
                                    onClick={handleDeleteAccount}
                                    disabled={deleting}
                                >
                                    {deleting ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
