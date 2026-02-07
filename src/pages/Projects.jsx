import { useState } from 'react';
import { useData } from '../context/DataContext';
import Sidebar from '../components/Sidebar';
import {
    Plus,
    Trash2,
    Copy,
    ExternalLink,
    RefreshCw,
    X,
    Check,
    FolderKanban,
    Globe,
    Key
} from 'lucide-react';
import { format } from 'date-fns';
import './Projects.css';

export default function Projects() {
    const { projects, createProject, deleteProject, regenerateApiKey, loading } = useData();
    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState({ name: '', domain: '' });
    const [creating, setCreating] = useState(false);
    const [copiedKey, setCopiedKey] = useState(null);

    const handleCreate = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            await createProject(newProject.name, newProject.domain);
            setNewProject({ name: '', domain: '' });
            setShowModal(false);
        } catch (error) {
            console.error('Failed to create project:', error);
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            try {
                await deleteProject(projectId);
            } catch (error) {
                console.error('Failed to delete project:', error);
            }
        }
    };

    const handleRegenerateKey = async (projectId) => {
        if (window.confirm('Are you sure you want to regenerate the API key? The old key will stop working immediately.')) {
            try {
                await regenerateApiKey(projectId);
            } catch (error) {
                console.error('Failed to regenerate API key:', error);
            }
        }
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(id);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="dashboard-content">
                <div className="page-header">
                    <div>
                        <h1>Projects</h1>
                        <p className="text-secondary">Manage your tracked websites and applications</p>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        <Plus size={18} />
                        New Project
                    </button>
                </div>

                {projects.length === 0 ? (
                    <div className="empty-state-large">
                        <div className="empty-state-icon-large">
                            <FolderKanban size={64} />
                        </div>
                        <h2>No projects yet</h2>
                        <p>Create your first project to start tracking form submissions</p>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => setShowModal(true)}
                        >
                            <Plus size={18} />
                            Create Your First Project
                        </button>
                    </div>
                ) : (
                    <div className="projects-grid">
                        {projects.map((project) => (
                            <div key={project.id} className="project-card card">
                                <div className="project-card-header">
                                    <div className="project-icon">
                                        <Globe size={24} />
                                    </div>
                                    <div className="project-actions">
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => handleRegenerateKey(project.id)}
                                            title="Regenerate API Key"
                                        >
                                            <RefreshCw size={16} />
                                        </button>
                                        <button
                                            className="btn btn-ghost btn-sm project-delete"
                                            onClick={() => handleDelete(project.id)}
                                            title="Delete Project"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="project-name">{project.name}</h3>
                                <p className="project-domain">{project.domain || 'No domain set'}</p>

                                <div className="project-stats">
                                    <div className="project-stat">
                                        <span className="project-stat-value">{project.submissionCount || 0}</span>
                                        <span className="project-stat-label">Submissions</span>
                                    </div>
                                    <div className="project-stat">
                                        <span className="project-stat-value">
                                            {project.createdAt ? format(new Date(project.createdAt), 'MMM dd') : 'N/A'}
                                        </span>
                                        <span className="project-stat-label">Created</span>
                                    </div>
                                </div>

                                <div className="project-api-key">
                                    <div className="api-key-label">
                                        <Key size={14} />
                                        <span>API Key</span>
                                    </div>
                                    <div className="api-key-value">
                                        <code>{project.apiKey}</code>
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => copyToClipboard(project.apiKey, project.id)}
                                        >
                                            {copiedKey === project.id ? <Check size={14} /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Create Project Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Create New Project</h2>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowModal(false)}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleCreate}>
                                <div className="input-group">
                                    <label htmlFor="projectName">Project Name</label>
                                    <input
                                        id="projectName"
                                        type="text"
                                        className="input"
                                        placeholder="My Website"
                                        value={newProject.name}
                                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="input-group mt-md">
                                    <label htmlFor="projectDomain">Domain (optional)</label>
                                    <input
                                        id="projectDomain"
                                        type="text"
                                        className="input"
                                        placeholder="example.com"
                                        value={newProject.domain}
                                        onChange={(e) => setNewProject({ ...newProject, domain: e.target.value })}
                                    />
                                </div>

                                <div className="modal-actions mt-lg">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={creating}
                                    >
                                        {creating ? 'Creating...' : 'Create Project'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
