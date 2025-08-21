import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { toast } from 'react-hot-toast';
import '../styles/Reviews.css';

const Reviews = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { reviews, travelPackages, users, addReview, updateReview } = useData();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [allReviews, setAllReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    packageId: ''
  });

  useEffect(() => {
    setAllReviews(reviews);
  }, [reviews]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!newReview.comment.trim() || !newReview.packageId) {
      toast.error('Please fill in all fields');
      return;
    }

    // Create new review using DataContext
    const review = addReview({
      UserID: currentUser.UserID,
      PackageID: parseInt(newReview.packageId),
      Rating: newReview.rating,
      Comment: newReview.comment
    });

    setAllReviews([...allReviews, review]);
    setNewReview({ rating: 5, comment: '', packageId: '' });
    setShowReviewForm(false);
    toast.success('Review submitted successfully');
  };

  const handleReplySubmit = (reviewId, reply) => {
    // Update review with agent reply using DataContext
    updateReview(reviewId, { agentReply: reply });
    
    // Update local state
    setAllReviews(allReviews.map(review => 
      review.ReviewID === reviewId 
        ? { ...review, agentReply: reply }
        : review
    ));
  };

  const getUserById = (userId) => {
    return users.find(user => user.UserID === userId);
  };

  const getPackageById = (packageId) => {
    return travelPackages.find(pkg => pkg.PackageID === packageId);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const canReplyToReview = (review) => {
    if (currentUser.Role !== 'agent') return false;
    
    const packageInfo = getPackageById(review.PackageID);
    return packageInfo && packageInfo.AgentID === currentUser.UserID;
  };

  return (
    <div className="reviews-page">
      <div className="container">
        <div className="reviews-header">
          <h1>Customer Reviews</h1>
          <p>Read what our travelers have to say about their experiences</p>
          {isAuthenticated && currentUser.Role === 'customer' && (
            <button 
              onClick={() => setShowReviewForm(true)}
              className="btn btn-primary"
            >
              Write a Review
            </button>
          )}
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Write Your Review</h3>
                <button 
                  onClick={() => setShowReviewForm(false)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleReviewSubmit}>
                  <div className="form-group">
                    <label>Select Package</label>
                    <select
                      value={newReview.packageId}
                      onChange={(e) => setNewReview({...newReview, packageId: e.target.value})}
                      className="form-control"
                      required
                    >
                      <option value="">Choose a package...</option>
                      {travelPackages.map((pkg) => (
                        <option key={pkg.PackageID} value={pkg.PackageID}>
                          {pkg.Title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Rating</label>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-btn ${newReview.rating >= star ? 'active' : ''}`}
                          onClick={() => setNewReview({...newReview, rating: star})}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Your Review</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="form-control"
                      rows="4"
                      placeholder="Share your experience..."
                      required
                    />
                  </div>

                  <div className="modal-footer">
                    <button 
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="reviews-container">
          {allReviews.length === 0 ? (
            <div className="no-reviews">
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            allReviews.map((review) => {
              const user = getUserById(review.UserID);
              const packageInfo = getPackageById(review.PackageID);
              
              return (
                <div key={review.ReviewID} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <h3>{user?.Name}</h3>
                      <span className="review-date">
                        {new Date(review.Timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="review-rating">
                      {renderStars(review.Rating)}
                      <span className="rating-text">({review.Rating}/5)</span>
                    </div>
                  </div>
                  
                  <div className="package-info">
                    <strong>Package:</strong> {packageInfo?.Title}
                  </div>
                  
                  <div className="review-content">
                    <p>{review.Comment}</p>
                  </div>

                  {/* Agent Reply */}
                  {review.agentReply && (
                    <div className="agent-reply">
                      <div className="reply-header">
                        <strong>Agent Response:</strong>
                        <span className="reply-date">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                      <p>{review.agentReply}</p>
                    </div>
                  )}

                  {/* Reply Form for Agents */}
                  {canReplyToReview(review) && !review.agentReply && (
                    <div className="reply-form">
                      <textarea
                        placeholder="Write your reply..."
                        className="form-control"
                        rows="2"
                        id={`reply-${review.ReviewID}`}
                      />
                      <button
                        onClick={() => {
                          const reply = document.getElementById(`reply-${review.ReviewID}`).value;
                          if (reply.trim()) {
                            handleReplySubmit(review.ReviewID, reply);
                          }
                        }}
                        className="btn btn-secondary btn-sm"
                      >
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Review Statistics */}
        {allReviews.length > 0 && (
          <div className="review-stats">
            <h3>Review Summary</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{allReviews.length}</span>
                <span className="stat-label">Total Reviews</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {(allReviews.reduce((sum, review) => sum + review.Rating, 0) / allReviews.length).toFixed(1)}
                </span>
                <span className="stat-label">Average Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {allReviews.filter(review => review.Rating >= 4).length}
                </span>
                <span className="stat-label">4+ Star Reviews</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Reviews; 