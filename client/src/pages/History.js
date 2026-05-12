import React, { useState, useEffect } from 'react';
import { sessionAPI } from '../services/api';
import SessionCard from '../components/SessionCard';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchSessions();
    }
  }, [currentPage, isAuthenticated, navigate]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await sessionAPI.getAll(currentPage, 10);
      setSessions(response.data.sessions);
      setTotalPages(response.data.totalPages);
      setError('');
    } catch (err) {
      setError('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        await sessionAPI.delete(id);
        fetchSessions();
      } catch (err) {
        setError('Failed to delete session');
      }
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to delete ALL sessions? This cannot be undone.')) {
      try {
        await sessionAPI.deleteAll();
        fetchSessions();
      } catch (err) {
        setError('Failed to clear sessions');
      }
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading">Loading sessions...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Session History</h1>
        {sessions.length > 0 && (
          <button className="btn btn-danger" onClick={handleClearAll}>
            Clear All History
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {sessions.length === 0 ? (
        <div className="empty-state">
          <p>No saved sessions yet</p>
          <p>Start timing and save your sessions to see them here!</p>
        </div>
      ) : (
        <>
          <div className="sessions-grid">
            {sessions.map((session) => (
              <SessionCard 
                key={session._id} 
                session={session} 
                onDelete={handleDelete}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="btn btn-pagination"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                className="btn btn-pagination"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default History;
