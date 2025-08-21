import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { toast } from 'react-hot-toast';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { 
    users, 
    travelPackages, 
    bookings, 
    payments, 
    assistanceRequests,
    deleteUser,
    updateUser,
    updateAssistanceRequest,
    updateBooking
  } = useData();
  const [allUsers, setAllUsers] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [allPayments, setAllPayments] = useState([]);
  const [allAssistanceRequests, setAllAssistanceRequests] = useState([]);

  useEffect(() => {
    // Set all data from DataContext
    setAllUsers(users);
    setAllPackages(travelPackages);
    setAllBookings(bookings);
    setAllPayments(payments);
    setAllAssistanceRequests(assistanceRequests);
  }, [users, travelPackages, bookings, payments, assistanceRequests]);

  // Calculate statistics
  const totalAgents = allUsers.filter(user => user.Role === 'agent').length;
  const totalCustomers = allUsers.filter(user => user.Role === 'customer').length;
  const totalPackages = allPackages.length;
  const totalBookings = allBookings.length;
  const totalRevenue = allPayments.reduce((total, payment) => total + payment.Amount, 0);
  const pendingBookings = allBookings.filter(booking => booking.Status === 'pending').length;
  const completedBookings = allBookings.filter(booking => booking.Status === 'confirmed').length;
  const pendingAssistance = allAssistanceRequests.filter(req => req.Status === 'pending').length;

  const handleRemoveUser = (userId) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      deleteUser(userId);
      // Update local state
      setAllUsers(allUsers.filter(user => user.UserID !== userId));
      toast.success('User removed successfully');
    }
  };

  const handleUserApproval = (userId, approval) => {
    updateUser(userId, { Approval: approval });
    setAllUsers(allUsers.map(user =>
      user.UserID === userId ? { ...user, Approval: approval } : user
    ));
    
    const approvalText = approval === 'approved' ? 'approved' : 'rejected';
    toast.success(`User ${approvalText} successfully`);
  };

  const handleBookingStatusChange = (bookingId, newStatus) => {
    // Update booking status in DataContext
    updateBooking(bookingId, { Status: newStatus });
    
    // Update local state
    setAllBookings(allBookings.map(booking => 
      booking.BookingID === bookingId ? { ...booking, Status: newStatus } : booking
    ));
    toast.success(`Booking status updated to ${newStatus}`);
  };

  const handleAssistanceStatusChange = (requestId, newStatus) => {
    updateAssistanceRequest(requestId, { Status: newStatus });
    
    // Update local state
    setAllAssistanceRequests(allAssistanceRequests.map(request => 
      request.RequestID === requestId ? { ...request, Status: newStatus } : request
    ));
    toast.success(`Assistance request status updated to ${newStatus}`);
  };

  const handleAgentApproval = (userId, approval) => {
    updateUser(userId, { Approval: approval });
    setAllUsers(allUsers.map(user =>
      user.UserID === userId ? { ...user, Approval: approval } : user
    ));
    
    const approvalText = approval === 'approved' ? 'approved' : 'rejected';
    toast.success(`Agent ${approvalText} successfully`);
  };

  const getPackageById = (packageId) => {
    return allPackages.find(pkg => pkg.PackageID === packageId);
  };

  const getPaymentById = (paymentId) => {
    return allPayments.find(payment => payment.PaymentID === paymentId);
  };

  const getInsuranceByBookingId = () => {
    // For now, return null as insurance data is not fully implemented
    return null;
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="header-content">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Welcome back, {currentUser.Name}! Manage the system and oversee operations</p>
            </div>
            <div className="admin-header-actions">
              <Link to="/profile" className="btn btn-primary">
                👤 Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <section className="dashboard-section">
          <h2>System Overview</h2>
          <div className="admin-stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>{totalCustomers}</h3>
                <p>Total Customers</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👨‍💼</div>
              <div className="stat-content">
                <h3>{totalAgents}</h3>
                <p>Total Agents</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <h3>{totalPackages}</h3>
                <p>Total Packages</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <h3>{totalBookings}</h3>
                <p>Total Bookings</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>${totalRevenue.toFixed(2)}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <h3>{pendingBookings}</h3>
                <p>Pending Bookings</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>{completedBookings}</h3>
                <p>Completed Bookings</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💬</div>
              <div className="stat-content">
                <h3>{pendingAssistance}</h3>
                <p>Pending Assistance Requests</p>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Approval Management */}
        <section className="dashboard-section">
          <h2>Agent Approval Management</h2>
          <div className="agent-approval-table">
            {allUsers.filter(user => user.Role === 'agent' && user.Approval === 'pending').length === 0 ? (
              <div className="no-pending-agents">
                <p>No pending agent approvals</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Registration Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers
                    .filter(user => user.Role === 'agent' && user.Approval === 'pending')
                    .map((agent) => (
                      <tr key={agent.UserID}>
                        <td>{agent.Name}</td>
                        <td>{agent.Email}</td>
                        <td>{agent.ContactNumber}</td>
                        <td>{new Date(agent.RegistrationDate || Date.now()).toLocaleDateString()}</td>
                        <td className="action-buttons">
                          <button
                            onClick={() => handleAgentApproval(agent.UserID, 'approved')}
                            className="btn btn-success btn-sm"
                            title="Approve Agent"
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => handleAgentApproval(agent.UserID, 'rejected')}
                            className="btn btn-danger btn-sm"
                            title="Reject Agent"
                          >
                            ❌ Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* User Management */}
        <section className="dashboard-section">
          <h2>User Management</h2>
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Contact</th>
                  <th>Approval Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user.UserID}>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>
                      <span className={`role role-${user.Role}`}>
                        {user.Role}
                      </span>
                    </td>
                    <td>{user.ContactNumber}</td>
                    <td>
                      <span className={`approval approval-${user.Approval}`}>
                        {user.Approval}
                      </span>
                    </td>
                    <td>
                      <div className="user-actions">
                        {user.Role === 'agent' && user.Approval === 'pending' && (
                          <>
                            <button
                              onClick={() => handleUserApproval(user.UserID, true)}
                              className="btn btn-success btn-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUserApproval(user.UserID, false)}
                              className="btn btn-warning btn-sm"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {user.UserID !== currentUser.UserID && (
                          <button
                            onClick={() => handleRemoveUser(user.UserID)}
                            className="btn btn-danger btn-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Booking Management */}
        <section className="dashboard-section">
          <h2>Booking Management</h2>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((booking) => {
                  const customer = allUsers.find(user => user.UserID === booking.UserID);
                  const packageInfo = getPackageById(booking.PackageID);
                  const paymentInfo = getPaymentById(booking.PaymentID);
                  const insuranceInfo = getInsuranceByBookingId();
                  
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
                        {insuranceInfo ? (
                          <span className="insurance-status">Active</span>
                        ) : (
                          <span className="insurance-inactive">No Insurance</span>
                        )}
                      </td>
                      <td>
                        <select
                          value={booking.Status}
                          onChange={(e) => handleBookingStatusChange(booking.BookingID, e.target.value)}
                          className="status-select"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Assistance Requests */}
        <section className="dashboard-section">
          <h2>Customer Assistance Requests</h2>
          {allAssistanceRequests.length === 0 ? (
            <div className="no-requests">
              <p>No assistance requests at the moment.</p>
            </div>
          ) : (
            <div className="assistance-table">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Issue Description</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Resolution Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allAssistanceRequests.map((request) => {
                    const customer = allUsers.find(user => user.UserID === request.UserID);
                    
                    return (
                      <tr key={request.RequestID}>
                        <td>
                          <div className="customer-info">
                            <strong>{customer?.Name}</strong>
                            <span className="customer-email">{customer?.Email}</span>
                          </div>
                        </td>
                        <td>
                          <div className="issue-description">
                            {request.IssueDescription}
                          </div>
                        </td>
                        <td>
                          <span className={`priority-badge priority-${request.Priority}`}>
                            {request.Priority}
                          </span>
                        </td>
                        <td>
                          <span className={`status status-${request.Status}`}>
                            {request.Status.replace('_', ' ')}
                          </span>
                        </td>
                        <td>
                          {new Date(request.Timestamp).toLocaleDateString()}
                        </td>
                        <td>
                          {request.ResolutionTime ? (
                            <span className="resolution-time">{request.ResolutionTime}</span>
                          ) : (
                            <span className="no-resolution">Not resolved</span>
                          )}
                        </td>
                        <td>
                          <div className="assistance-actions">
                            <select
                              value={request.Status}
                              onChange={(e) => handleAssistanceStatusChange(request.RequestID, e.target.value)}
                              className="status-select"
                            >
                              <option value="pending">Pending</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                            {request.Status === 'completed' && !request.ResolutionTime && (
                              <input
                                type="text"
                                placeholder="Resolution time (e.g., 2 hours)"
                                className="resolution-input"
                                onBlur={(e) => {
                                  if (e.target.value.trim()) {
                                    // Update resolution time
                                    const updatedRequests = allAssistanceRequests.map(req => 
                                      req.RequestID === request.RequestID 
                                        ? { ...req, ResolutionTime: e.target.value.trim() }
                                        : req
                                    );
                                    setAllAssistanceRequests(updatedRequests);
                                  }
                                }}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard; 