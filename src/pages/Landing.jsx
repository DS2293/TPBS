import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import '../styles/Landing.css';

const Landing = () => {
  const { travelPackages, reviews, users } = useData();
  const featuredPackages = travelPackages.slice(0, 3);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Your Next Adventure
            </h1>
            <p className="hero-subtitle">
              Explore the world with our carefully curated travel packages. 
              From exotic destinations to cultural experiences, we make your dreams come true.
            </p>
            <div className="hero-buttons">
              <Link to="/packages" className="btn btn-primary btn-large">
                Explore Packages
              </Link>
              <Link to="/signup" className="btn btn-secondary btn-large">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose TravelEase?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✈️</div>
              <h3>Curated Experiences</h3>
              <p>Handpicked destinations and activities for unforgettable memories</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Travel Insurance</h3>
              <p>Comprehensive coverage for worry-free travel</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Expert Support</h3>
              <p>24/7 assistance and local expertise</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive rates and exclusive deals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="featured-packages">
        <div className="container">
          <h2 className="section-title">Featured Travel Packages</h2>
          <div className="packages-grid">
            {featuredPackages.map((pkg) => (
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
                  <p className="package-description">{pkg.Description}</p>
                  <div className="package-details">
                    <span className="duration">⏱️ {pkg.Duration}</span>
                    <span className="services">📋 {pkg.IncludedServices.split(', ').slice(0, 2).join(', ')}</span>
                  </div>
                  <div className="package-actions">
                    <button 
                      onClick={() => handleViewDetails(pkg)}
                      className="btn btn-outline"
                    >
                      View Details
                    </button>
                    <Link to="/packages" className="btn btn-primary">
                      Browse All
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/packages" className="btn btn-secondary btn-large">
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Package Details Modal */}
      {showModal && selectedPackage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedPackage.Title}</h3>
              <button onClick={closeModal} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <div className="package-modal-image">
                <img 
                  src={selectedPackage.Image} 
                  alt={selectedPackage.Title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                  }}
                />
                <div className="package-modal-price">${selectedPackage.Price}</div>
              </div>
              <div className="package-modal-content">
                <p className="package-modal-description">{selectedPackage.Description}</p>
                <div className="package-modal-details">
                  <div className="detail-item">
                    <strong>Duration:</strong> {selectedPackage.Duration}
                  </div>
                  <div className="detail-item">
                    <strong>Price:</strong> ${selectedPackage.Price} per person
                  </div>
                  <div className="detail-item">
                    <strong>Included Services:</strong>
                    <ul>
                      {selectedPackage.IncludedServices.split(', ').map((service, index) => (
                        <li key={index}>✓ {service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={closeModal} className="btn btn-secondary">
                Close
              </button>
              <Link to="/packages" className="btn btn-primary">
                Book This Package
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Travelers Say</h2>
          <div className="testimonials-grid">
            {reviews.slice(0, 3).map((review) => {
              const user = users.find(u => u.UserID === review.UserID);
              const packageInfo = travelPackages.find(p => p.PackageID === review.PackageID);
              return (
                <div key={review.ReviewID} className="testimonial-card">
                  <div className="testimonial-content">
                    <p>"{review.Comment}"</p>
                    <div className="testimonial-author">
                      <strong>{user?.Name}</strong>
                      <span>{packageInfo?.Title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of travelers who trust us with their adventures</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">
                Create Account
              </Link>
              <Link to="/packages" className="btn btn-secondary btn-large">
                Browse Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing; 