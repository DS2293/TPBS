import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  const getDashboardLink = () => {
    if (!currentUser) return null;
    
    switch (currentUser.Role) {
      case 'admin':
        return '/admin-dashboard';
      case 'agent':
        return '/agent-dashboard';
      case 'customer':
        return '/user-dashboard';
      default:
        return '/user-dashboard';
    }
  };

  const getDashboardLabel = () => {
    if (!currentUser) return 'Dashboard';
    
    switch (currentUser.Role) {
      case 'admin':
        return 'Admin Dashboard';
      case 'agent':
        return 'Agent Dashboard';
      case 'customer':
        return 'My Dashboard';
      default:
        return 'Dashboard';
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo Section */}
          <div className="logo">
            <Link to="/" className="logo-link">
              <img src="/src/assets/logo.png" alt="TravelEase Logo" className="logo-image" />
              <span className="logo-text">TravelEase</span>
            </Link>
          </div>
          
          {/* Navigation Menu */}
          <nav className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/packages" className="nav-link">Packages</Link>
            {isAuthenticated && (
              <Link to="/reviews" className="nav-link">Reviews</Link>
            )}
            {isAuthenticated && (
              <Link to="/assistance" className="nav-link">Assistance</Link>
            )}
          </nav>

          {/* User Section */}
          <div className="user-section">
            {isAuthenticated ? (
              <div className="user-menu" ref={dropdownRef}>
                <button 
                  className="user-trigger"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                >
                  <div className="user-info">
                    <span className="user-name">{currentUser.Name}</span>
                    <span className="user-role">{currentUser.Role}</span>
                  </div>
                  <div className="dropdown-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-card">
                      <div className="dropdown-header">
                        <div className="user-avatar">
                          {currentUser.Name.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-details">
                          <span className="dropdown-user-name">{currentUser.Name}</span>
                          <span className="dropdown-user-email">{currentUser.Email}</span>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <div className="dropdown-items">
                        <Link 
                          to={getDashboardLink()} 
                          className="dropdown-item"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                          </svg>
                          <span>{getDashboardLabel()}</span>
                        </Link>
                        <Link 
                          to="/profile" 
                          className="dropdown-item"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <span>Profile Settings</span>
                        </Link>
                        <button 
                          className="dropdown-item logout-item"
                          onClick={handleLogout}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16,17 21,12 16,7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                          </svg>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/signin" className="btn btn-outline">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 