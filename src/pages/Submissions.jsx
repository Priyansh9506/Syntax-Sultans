import { useState } from 'react';
import { useData } from '../context/DataContext';
import Sidebar from '../components/Sidebar';
import {
    Search,
    Filter,
    Download,
    ChevronDown,
    ChevronUp,
    X,
    Inbox,
    ExternalLink,
    Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import './Submissions.css';

export default function Submissions() {
    const { submissions, projects } = useData();
    const [search, setSearch] = useState('');
    const [selectedProject, setSelectedProject] = useState('all');
    const [sortField, setSortField] = useState('timestamp');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    // Filter and sort submissions
    const filteredSubmissions = submissions
        .filter(sub => {
            const matchesSearch = search === '' ||
                JSON.stringify(sub.data).toLowerCase().includes(search.toLowerCase()) ||
                (sub.formId || '').toLowerCase().includes(search.toLowerCase());
            const matchesProject = selectedProject === 'all' || sub.projectId === selectedProject;
            return matchesSearch && matchesProject;
        })
        .sort((a, b) => {
            const aVal = a[sortField];
            const bVal = b[sortField];
            const modifier = sortOrder === 'asc' ? 1 : -1;
            return aVal > bVal ? modifier : -modifier;
        });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('desc');
        }
    };

    const exportData = () => {
        const dataStr = JSON.stringify(filteredSubmissions, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `datapulse-submissions-${format(new Date(), 'yyyy-MM-dd')}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const SortIcon = ({ field }) => {
        if (sortField !== field) return null;
        return sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="dashboard-content">
                <div className="page-header">
                    <div>
                        <h1>Submissions</h1>
                        <p className="text-secondary">View and manage all form submissions</p>
                    </div>
                    <button className="btn btn-secondary" onClick={exportData}>
                        <Download size={18} />
                        Export
                    </button>
                </div>

                {/* Filters */}
                <div className="submissions-filters">
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search submissions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <Filter size={18} />
                        <select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                        >
                            <option value="all">All Projects</option>
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Submissions Table */}
                {filteredSubmissions.length === 0 ? (
                    <div className="empty-state-large">
                        <div className="empty-state-icon-large">
                            <Inbox size={64} />
                        </div>
                        <h2>No submissions found</h2>
                        <p>
                            {submissions.length === 0
                                ? 'Add the tracking code to your website to start receiving submissions'
                                : 'Try adjusting your filters'}
                        </p>
                    </div>
                ) : (
                    <div className="table-container">
                        <table className="submissions-table">
                            <thead>
                                <tr>
                                    <th
                                        className="sortable"
                                        onClick={() => handleSort('timestamp')}
                                    >
                                        Date <SortIcon field="timestamp" />
                                    </th>
                                    <th>Project</th>
                                    <th>Form ID</th>
                                    <th>Data Preview</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSubmissions.map((submission, index) => {
                                    const project = projects.find(p => p.id === submission.projectId);
                                    const dataPreview = Object.entries(submission.data || {})
                                        .slice(0, 2)
                                        .map(([key, value]) => `${key}: ${value}`)
                                        .join(', ');

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <div className="submission-date">
                                                    <Calendar size={14} />
                                                    {format(new Date(submission.timestamp), 'MMM dd, yyyy HH:mm')}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="project-badge">
                                                    {project?.name || 'Unknown'}
                                                </span>
                                            </td>
                                            <td className="form-id">{submission.formId || 'N/A'}</td>
                                            <td className="data-preview">
                                                {dataPreview || 'No data'}
                                                {Object.keys(submission.data || {}).length > 2 && '...'}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-ghost btn-sm"
                                                    onClick={() => setSelectedSubmission(submission)}
                                                >
                                                    <ExternalLink size={14} />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Submission Detail Modal */}
                {selectedSubmission && (
                    <div className="modal-overlay" onClick={() => setSelectedSubmission(null)}>
                        <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Submission Details</h2>
                                <button
                                    className="modal-close"
                                    onClick={() => setSelectedSubmission(null)}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="submission-detail">
                                <div className="detail-row">
                                    <span className="detail-label">Timestamp</span>
                                    <span className="detail-value">
                                        {format(new Date(selectedSubmission.timestamp), 'PPPP p')}
                                    </span>
                                </div>

                                <div className="detail-row">
                                    <span className="detail-label">Project</span>
                                    <span className="detail-value">
                                        {projects.find(p => p.id === selectedSubmission.projectId)?.name || 'Unknown'}
                                    </span>
                                </div>

                                <div className="detail-row">
                                    <span className="detail-label">Form ID</span>
                                    <span className="detail-value">
                                        {selectedSubmission.formId || 'N/A'}
                                    </span>
                                </div>

                                <div className="detail-row">
                                    <span className="detail-label">Page URL</span>
                                    <span className="detail-value">
                                        {selectedSubmission.pageUrl || 'N/A'}
                                    </span>
                                </div>

                                <div className="detail-section">
                                    <h4>Form Data</h4>
                                    <div className="data-grid">
                                        {Object.entries(selectedSubmission.data || {}).map(([key, value]) => (
                                            <div key={key} className="data-item">
                                                <span className="data-key">{key}</span>
                                                <span className="data-value">{String(value)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
