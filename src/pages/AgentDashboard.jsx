import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { toast } from 'react-hot-toast';
import '../styles/Dashboard.css';

const AgentDashboard = () => {
  const { currentUser } = useAuth();
  const { 
    bookings, 
    payments, 
    travelPackages, 
    users,
    addTravelPackage, 
    updateTravelPackage, 
    deleteTravelPackage,
    getPackagesByAgentId
  } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [agentPackages, setAgentPackages] = useState([]);
  const [agentBookings, setAgentBookings] = useState([]);
  const [agentPayments, setAgentPayments] = useState([]);

  useEffect(() => {
    // Get agent's packages, bookings, and payments
    const agentPackagesData = getPackagesByAgentId(currentUser.UserID);
    const packageIds = agentPackagesData.map(pkg => pkg.PackageID);
    
    // Get bookings for packages created by this agent
    const agentBookingsData = bookings.filter(booking => 
      packageIds.includes(booking.PackageID)
    );
    
    const agentPaymentsData = payments.filter(payment => 
      agentBookingsData.some(booking => booking.BookingID === payment.BookingID)
    );
      
    setAgentPackages(agentPackagesData);
    setAgentBookings(agentBookingsData);
    setAgentPayments(agentPaymentsData);
  }, [currentUser.UserID, travelPackages, bookings, payments, getPackagesByAgentId]);

  // Calculate statistics
  const totalRevenue = agentBookings.reduce((total, booking) => {
    const payment = agentPayments.find(p => p.BookingID === booking.BookingID);
    return total + (payment?.Amount || 0);
  }, 0);

  const confirmedBookings = agentBookings.filter(booking => booking.Status === 'confirmed').length;

  const handleCreatePackage = (packageData) => {
    if (!packageData.title || !packageData.description || !packageData.duration || !packageData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newPackage = addTravelPackage({
      Title: packageData.title,
      Description: packageData.description,
      Duration: packageData.duration,
      Price: parseFloat(packageData.price),
      IncludedServices: packageData.services,
      Image: packageData.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&auto=format",
      AgentID: currentUser.UserID,
      PackageID: Math.max(...travelPackages.map(p => p.PackageID)) + 1
    });

    setAgentPackages([...agentPackages, newPackage]);
    toast.success('Travel package created successfully');
    
    // Close modal and reset form
    setShowCreateModal(false);
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('price').value = '';
    document.getElementById('services').value = '';
    document.getElementById('imageUrl').value = '';
  };

  const handleUpdatePackage = (packageId, updates) => {
    updateTravelPackage(packageId, updates);
    setAgentPackages(agentPackages.map(pkg => 
      pkg.PackageID === packageId ? { ...pkg, ...updates } : pkg
    ));
    toast.success('Travel package updated successfully');
  };

  const handleDeletePackage = (packageId) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      deleteTravelPackage(packageId);
      setAgentPackages(agentPackages.filter(pkg => pkg.PackageID !== packageId));
      toast.success('Travel package deleted successfully');
    }
  };

  const getUserById = (userId) => {
    return users.find(user => user.UserID === userId) || { UserID: userId, Name: `User ${userId}` };
  };

  const getPackageById = (packageId) => {
    return travelPackages.find(pkg => pkg.PackageID === packageId);
  };

  const getPaymentById = (paymentId) => {
    return agentPayments.find(payment => payment.PaymentID === paymentId);
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="header-content">
            <div>
              <h1>Agent Dashboard</h1>
              <p>Welcome back, {currentUser.Name}! Manage your packages and view bookings</p>
            </div>
            <div className="header-actions">
              {/* Refresh button removed - data updates automatically via DataContext */}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <section className="dashboard-section">
          <h2>Overview Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <h3>{agentPackages.length}</h3>
                <p>Total Packages</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <h3>{agentBookings.length}</h3>
                <p>Total Bookings</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>{confirmedBookings}</h3>
                <p>Confirmed Bookings</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>${totalRevenue.toFixed(2)}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
          </div>
        </section>

        {/* Package Management */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Your Travel Packages</h2>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary"
            >
              Create New Package
            </button>
          </div>
          
          {agentPackages.length === 0 ? (
            <div className="no-packages">
              <p>You haven't created any packages yet.</p>
            </div>
          ) : (
            <div className="packages-grid">
              {agentPackages.map((pkg) => (
                <div key={pkg.PackageID} className="package-card">
                  <div className="package-image">
                    <img 
                      src={pkg.Image} 
                      alt={pkg.Title}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                      }}
                    />
                    <div className="package-price">${pkg.Price}</div>
                  </div>
                  <div className="package-content">
                    <h3>{pkg.Title}</h3>
                    <p>{pkg.Description}</p>
                    <div className="package-details">
                      <span>⏱️ {pkg.Duration}</span>
                      <span>📋 {pkg.IncludedServices.split(', ').slice(0, 2).join(', ')}</span>
                    </div>
                    <div className="package-actions">
                      <button 
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setShowEditModal(true);
                        }}
                        className="btn btn-secondary btn-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeletePackage(pkg.PackageID)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bookings Table */}
        <section className="dashboard-section">
          <h2>Booking Overview</h2>
          {agentBookings.length === 0 ? (
            <div className="no-bookings">
              <p>No bookings for your packages yet.</p>
            </div>
          ) : (
            <div className="bookings-table">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Package</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Insurance</th>
                  </tr>
                </thead>
                <tbody>
                  {agentBookings.map((booking) => {
                    const customer = getUserById(booking.UserID);
                    const packageInfo = getPackageById(booking.PackageID);
                    const paymentInfo = getPaymentById(booking.PaymentID);
                    
                    return (
                      <tr key={booking.BookingID}>
                        <td>{customer?.Name}</td>
                        <td>{packageInfo?.Title}</td>
                        <td>{new Date(booking.StartDate).toLocaleDateString()}</td>
                        <td>{new Date(booking.EndDate).toLocaleDateString()}</td>
                        <td>
                          <span className={`status status-${booking.Status}`}>
                            {booking.Status}
                          </span>
                        </td>
                        <td>
                          {paymentInfo ? (
                            <span className={`payment-status payment-${paymentInfo.Status}`}>
                              {paymentInfo.Status} - ${paymentInfo.Amount}
                            </span>
                          ) : (
                            <span className="payment-pending">Payment Pending</span>
                          )}
                        </td>
                        <td>
                          <span className="insurance-status">Active</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Create Package Modal */}
        {showCreateModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Create New Travel Package</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Package Title</label>
                  <input type="text" id="title" className="form-control" placeholder="Enter package title" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea id="description" className="form-control" placeholder="Enter package description" rows="3"></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Duration</label>
                    <input type="text" id="duration" className="form-control" placeholder="e.g., 5 days" />
                  </div>
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input type="number" id="price" className="form-control" placeholder="Enter price" step="0.01" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Included Services</label>
                  <input type="text" id="services" className="form-control" placeholder="e.g., Hotel, Flights, Tours" />
                </div>
                <div className="form-group">
                  <label>Image URL (optional)</label>
                  <input type="url" id="imageUrl" className="form-control" placeholder="Enter image URL" />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleCreatePackage({
                    title: document.getElementById('title').value,
                    description: document.getElementById('description').value,
                    duration: document.getElementById('duration').value,
                    price: document.getElementById('price').value,
                    services: document.getElementById('services').value,
                    image: document.getElementById('imageUrl').value
                  })}
                  className="btn btn-primary"
                >
                  Create Package
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Package Modal */}
        {showEditModal && selectedPackage && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Edit Travel Package</h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Package Title</label>
                  <input type="text" id="editTitle" className="form-control" defaultValue={selectedPackage.Title} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea id="editDescription" className="form-control" defaultValue={selectedPackage.Description} rows="3"></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Duration</label>
                    <input type="text" id="editDuration" className="form-control" defaultValue={selectedPackage.Duration} />
                  </div>
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input type="number" id="editPrice" className="form-control" defaultValue={selectedPackage.Price} step="0.01" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Included Services</label>
                  <input type="text" id="editServices" className="form-control" defaultValue={selectedPackage.IncludedServices} />
                </div>
                <div className="form-group">
                  <label>Image URL (optional)</label>
                  <input type="url" id="editImageUrl" className="form-control" defaultValue={selectedPackage.Image} />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleUpdatePackage(selectedPackage.PackageID, {
                    Title: document.getElementById('editTitle').value,
                    Description: document.getElementById('editDescription').value,
                    Duration: document.getElementById('editDuration').value,
                    Price: parseFloat(document.getElementById('editPrice').value),
                    IncludedServices: document.getElementById('editServices').value,
                    Image: document.getElementById('editImageUrl').value
                  })}
                  className="btn btn-primary"
                >
                  Update Package
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard; 