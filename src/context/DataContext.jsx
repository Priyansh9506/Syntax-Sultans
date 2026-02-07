import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext(null);

const API_URL = '/api';

export function DataProvider({ children }) {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        totalSubmissions: 0,
        todaySubmissions: 0,
        activeProjects: 0,
        conversionRate: 0,
    });

    const getAuthHeader = () => {
        const token = localStorage.getItem('datapulse_token');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    };

    // Fetch projects
    const fetchProjects = useCallback(async () => {
        if (!user) return;

        try {
            const response = await fetch(`${API_URL}/projects`, {
                headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                setProjects(data);
                setStats(prev => ({ ...prev, activeProjects: data.length }));
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    }, [user]);

    // Fetch submissions
    const fetchSubmissions = useCallback(async () => {
        if (!user) return;

        try {
            const response = await fetch(`${API_URL}/submissions`, {
                headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                // Map snake_case from API to camelCase for frontend
                const mappedData = data.map(sub => ({
                    id: sub.id,
                    projectId: sub.project_id,
                    formId: sub.form_id,
                    data: sub.data,
                    pageUrl: sub.page_url,
                    userAgent: sub.user_agent,
                    timestamp: sub.timestamp,
                }));
                setSubmissions(mappedData);

                // Calculate stats
                const today = new Date().toDateString();
                const todayCount = mappedData.filter(s =>
                    new Date(s.timestamp).toDateString() === today
                ).length;

                setStats(prev => ({
                    ...prev,
                    totalSubmissions: mappedData.length,
                    todaySubmissions: todayCount,
                    conversionRate: mappedData.length > 0 ? Math.round((mappedData.length / (mappedData.length * 3)) * 100) : 0,
                }));
            }
        } catch (error) {
            console.error('Failed to fetch submissions:', error);
        }
    }, [user]);

    // Create project
    const createProject = async (name, domain) => {
        try {
            const response = await fetch(`${API_URL}/projects`, {
                method: 'POST',
                headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, domain }),
            });

            if (!response.ok) {
                throw new Error('Failed to create project');
            }

            const project = await response.json();
            setProjects(prev => [...prev, project]);
            setStats(prev => ({ ...prev, activeProjects: prev.activeProjects + 1 }));
            return project;
        } catch (error) {
            throw error;
        }
    };

    // Delete project
    const deleteProject = async (projectId) => {
        try {
            const response = await fetch(`${API_URL}/projects/${projectId}`, {
                method: 'DELETE',
                headers: getAuthHeader(),
            });

            if (!response.ok) {
                throw new Error('Failed to delete project');
            }

            setProjects(prev => prev.filter(p => p.id !== projectId));
            setStats(prev => ({ ...prev, activeProjects: prev.activeProjects - 1 }));
        } catch (error) {
            throw error;
        }
    };

    // Regenerate API key
    const regenerateApiKey = async (projectId) => {
        try {
            const response = await fetch(`${API_URL}/projects/${projectId}/key`, {
                method: 'POST',
                headers: getAuthHeader(),
            });

            if (!response.ok) {
                throw new Error('Failed to regenerate API key');
            }

            const data = await response.json();
            setProjects(prev =>
                prev.map(p => p.id === projectId ? { ...p, apiKey: data.apiKey } : p)
            );
            return data.apiKey;
        } catch (error) {
            throw error;
        }
    };

    // Update project
    const updateProject = async (projectId, name, domain) => {
        try {
            const response = await fetch(`${API_URL}/projects/${projectId}`, {
                method: 'PUT',
                headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, domain }),
            });

            if (!response.ok) {
                throw new Error('Failed to update project');
            }

            const updatedProject = await response.json();
            setProjects(prev =>
                prev.map(p => p.id === projectId ? { ...p, name, domain } : p)
            );
            return updatedProject;
        } catch (error) {
            throw error;
        }
    };

    // Fetch data when user changes
    useEffect(() => {
        if (user) {
            setLoading(true);
            Promise.all([fetchProjects(), fetchSubmissions()]).finally(() => {
                setLoading(false);
            });
        } else {
            setProjects([]);
            setSubmissions([]);
        }
    }, [user, fetchProjects, fetchSubmissions]);

    // Refresh data
    const refresh = useCallback(() => {
        return Promise.all([fetchProjects(), fetchSubmissions()]);
    }, [fetchProjects, fetchSubmissions]);

    return (
        <DataContext.Provider value={{
            projects,
            submissions,
            stats,
            loading,
            createProject,
            updateProject,
            deleteProject,
            regenerateApiKey,
            refresh,
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}

export default DataContext;
