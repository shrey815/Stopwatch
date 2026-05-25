import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ⏱️ Stopwatch
        </Link>
        <div className="navbar-menu">
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Dark Mode">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          {isAuthenticated ? (
            <>
              <Link to="/" className="navbar-link">Stopwatch</Link>
              <Link to="/history" className="navbar-link">History</Link>
              <span className="navbar-user">👤 {user?.username}</span>
              <button onClick={handleLogout} className="btn btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
