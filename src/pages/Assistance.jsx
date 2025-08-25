import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { toast } from 'react-hot-toast';
import '../styles/Assistance.css';

const Assistance = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { assistanceRequests, addAssistanceRequest } = useData();
  const [showForm, setShowForm] = useState(false);
  const [userRequests, setUserRequests] = useState([]);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  useEffect(() => {
    if (isAuthenticated) {
      // Get user's assistance requests
      const userRequestsData = assistanceRequests.filter(
        request => request.UserID === currentUser.UserID
      );
      setUserRequests(userRequestsData);
    }
  }, [isAuthenticated, currentUser.UserID, assistanceRequests]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    const newRequest = {
      RequestID: Math.max(...assistanceRequests.map(r => r.RequestID)) + 1,
      UserID: currentUser.UserID,
      IssueDescription: `${formData.subject}: ${formData.message}`, // Combined for AdminDashboard
      Subject: formData.subject,
      Message: formData.message,
      Priority: formData.priority,
      Status: 'pending',
      RequestDate: new Date().toISOString(),
      Timestamp: new Date().toISOString() // For AdminDashboard compatibility
    };

    addAssistanceRequest(newRequest);
    setUserRequests([...userRequests, newRequest]);
    
    // Reset form and close modal
    setFormData({
      subject: '',
      message: '',
      priority: 'medium'
    });
    setShowForm(false);
    
    toast.success('Assistance request submitted successfully');
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      in_progress: 'status-in-progress',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    };
    
    return (
      <span className={`status-badge ${statusClasses[status] || 'status-pending'}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      low: 'priority-low',
      medium: 'priority-medium',
      high: 'priority-high',
      urgent: 'priority-urgent'
    };
    
    return (
      <span className={`priority-badge ${priorityClasses[priority] || 'priority-medium'}`}>
        {priority}
      </span>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="assistance-page">
        <div className="container">
          <div className="assistance-header">
            <h1>Travel Assistance</h1>
            <p>Please sign in to access our assistance services</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="assistance-page">
      <div className="container">
        <div className="assistance-header">
          <h1>Travel Assistance</h1>
          <p>Need help with your travel plans? We're here to assist you!</p>
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            Submit New Request
          </button>
        </div>

        {/* Create Assistance Request Modal */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Create Assistance Request</h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="close-btn"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="form-control"
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="priority">Priority Level</label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="form-control"
                      required
                    >
                      <option value="low">Low - General inquiry</option>
                      <option value="medium">Medium - Standard request</option>
                      <option value="high">High - Urgent matter</option>
                      <option value="urgent">Urgent - Critical issue</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="form-control"
                      rows="6"
                      placeholder="Please provide detailed information about your issue or question. Include relevant details like booking numbers, dates, or specific concerns..."
                      required
                    />
                  </div>

                  <div className="form-tips">
                    <h4>💡 Tips for faster assistance:</h4>
                    <ul>
                      <li>Include your booking reference if applicable</li>
                      <li>Be specific about dates and locations</li>
                      <li>Mention any previous communication about this issue</li>
                      <li>Provide contact preferences (phone, email)</li>
                    </ul>
                  </div>

                  <div className="modal-footer">
                    <button 
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* User's Assistance Requests */}
        <div className="assistance-requests">
          <h2>Your Assistance Requests</h2>
          
          {userRequests.length === 0 ? (
            <div className="no-requests">
              <div className="no-requests-icon">📝</div>
              <h3>No assistance requests yet</h3>
              <p>Submit your first request using the button above, and we'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <div className="requests-grid">
              {userRequests.map((request) => (
                <div key={request.RequestID} className="request-card">
                  <div className="request-header">
                    <div className="request-meta">
                      <span className="request-id">#{request.RequestID}</span>
                      <span className="request-date">
                        {new Date(request.RequestDate || request.Timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="request-badges">
                      {getStatusBadge(request.Status)}
                      {request.Priority && getPriorityBadge(request.Priority)}
                    </div>
                  </div>
                  
                  <div className="request-content">
                    <h4>{request.Subject || request.IssueDescription}</h4>
                    <p>{request.Message || request.IssueDescription}</p>
                  </div>
                  
                  <div className="request-footer">
                    {request.Status === 'completed' && (
                      <div className="completion-badge">
                        ✅ Completed
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <h2>Need Immediate Help?</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Phone Support</h3>
              <p>+1-555-0123</p>
              <span className="contact-hours">24/7 Available</span>
            </div>
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>Email Support</h3>
              <p>support@travelease.com</p>
              <span className="contact-hours">Response within 4 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistance; 