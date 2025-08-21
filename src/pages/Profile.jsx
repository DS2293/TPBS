import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { toast } from 'react-hot-toast';
import '../styles/Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { currentUser, updateUser } = useAuth();
  const { 
    bookings, 
    travelPackages, 
    users,
    updateUser: updateUserData,
    getBookingsByUserId,
    getPackagesByAgentId
  } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.Name || '',
    email: currentUser?.Email || '',
    contactNumber: currentUser?.ContactNumber || '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.Name || '',
        email: currentUser.Email || '',
        contactNumber: currentUser.ContactNumber || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [currentUser]);

  // Get user's bookings and packages using DataContext
  const userBookings = currentUser?.Role === 'customer' 
    ? getBookingsByUserId(currentUser.UserID) 
    : [];
  
  const userPackages = currentUser?.Role === 'agent' 
    ? getPackagesByAgentId(currentUser.UserID) 
    : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const updatedUser = {
        ...currentUser,
        Name: formData.name,
        Email: formData.email,
        ContactNumber: formData.contactNumber
      };

      if (formData.password) {
        updatedUser.Password = formData.password;
      }

      // Update in DataContext
      updateUserData(updatedUser.UserID, updatedUser);

      // Update auth context
      updateUser(updatedUser);

      toast.success('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
    } catch {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const getPackageById = (packageId) => {
    return travelPackages.find(pkg => pkg.PackageID === packageId);
  };

  const getBookingStatus = (status) => {
    const statusColors = {
      'confirmed': 'status-confirmed',
      'pending': 'status-pending',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return statusColors[status] || 'status-pending';
  };

  const renderCustomerProfile = () => (
    <div className="profile-section">
      <h3>My Bookings</h3>
      {userBookings.length === 0 ? (
        <div className="no-data">
          <p>You haven't made any bookings yet.</p>
          <Link to="/packages" className="btn btn-primary">Browse Packages</Link>
        </div>
      ) : (
        <div className="bookings-grid">
          {userBookings.map((booking) => {
            const packageInfo = getPackageById(booking.PackageID);
            return (
              <div key={booking.BookingID} className="booking-card">
                <div className="booking-header">
                  <h4>{packageInfo?.Title || 'Unknown Package'}</h4>
                  <span className={`status-badge ${getBookingStatus(booking.Status)}`}>
                    {booking.Status}
                  </span>
                </div>
                <div className="booking-details">
                  <p><strong>Start Date:</strong> {new Date(booking.StartDate).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(booking.EndDate).toLocaleDateString()}</p>
                  <p><strong>Package:</strong> {packageInfo?.Duration || 'N/A'}</p>
                  <p><strong>Price:</strong> ${packageInfo?.Price || 'N/A'}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderAgentProfile = () => (
    <div className="profile-section">
      <h3>My Packages</h3>
      {userPackages.length === 0 ? (
        <div className="no-data">
          <p>You haven't created any packages yet.</p>
          <a href="/agent-dashboard" className="btn btn-primary">Create Package</a>
        </div>
      ) : (
        <div className="packages-grid">
          {userPackages.map((pkg) => (
            <div key={pkg.PackageID} className="package-card">
              <div className="package-image">
                <img 
                  src={pkg.Image} 
                  alt={pkg.Title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  }}
                />
                <div className="package-price">${pkg.Price}</div>
              </div>
              <div className="package-content">
                <h4>{pkg.Title}</h4>
                <p>{pkg.Description}</p>
                <div className="package-details">
                  <span>⏱️ {pkg.Duration}</span>
                  <span>📋 {pkg.IncludedServices.split(', ').slice(0, 2).join(', ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAdminProfile = () => (
    <div className="profile-section">
      <h3>System Overview</h3>
      <div className="admin-stats">
        <div className="stat-item">
          <span className="stat-number">{users.filter(u => u.Role === 'customer').length}</span>
          <span className="stat-label">Total Customers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{users.filter(u => u.Role === 'agent').length}</span>
          <span className="stat-label">Total Agents</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{travelPackages.length}</span>
          <span className="stat-label">Total Packages</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{bookings.length}</span>
          <span className="stat-label">Total Bookings</span>
        </div>
      </div>
    </div>
  );

  if (!currentUser) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="not-authenticated">
            <h2>Please sign in to view your profile</h2>
            <a href="/signin" className="btn btn-primary">Sign In</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>Profile Management</h1>
          <p>Manage your account information and preferences</p>
        </div>

          {/* Profile Information */}
          <div className="profile-section">
            <div className="section-header">
              <h3>Personal Information</h3>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="btn btn-secondary"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input
                      type="text"
                      value={currentUser.Role}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>New Password (optional)</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-row">
                  <div className="info-item">
                    <label>Full Name:</label>
                    <span>{currentUser.Name}</span>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <span>{currentUser.Email}</span>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-item">
                    <label>Contact Number:</label>
                    <span>{currentUser.ContactNumber}</span>
                  </div>
                  <div className="info-item">
                    <label>Role:</label>
                    <span className={`role-badge role-${currentUser.Role}`}>
                      {currentUser.Role}
                    </span>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-item">
                    <label>Account Status:</label>
                    <span className={`status-badge status-${currentUser.Approval || 'approved'}`}>
                      {currentUser.Approval || 'approved'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Role-specific sections */}
          {currentUser.Role === 'customer' && renderCustomerProfile()}
          {currentUser.Role === 'agent' && renderAgentProfile()}
          {currentUser.Role === 'admin' && renderAdminProfile()}
      </div>
    </div>
  );
};

export default Profile; 