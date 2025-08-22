import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/src/assets/logo.png" alt="TravelEase Logo" className="logo-image" />
              <h3>TravelEase</h3>
            </div>
            <p>Your trusted partner for unforgettable travel experiences. Discover the world with our carefully curated travel packages.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/packages">Packages</a></li>
              {/* <li><a href="/reviews">Reviews</a></li> */}
              {/* <li><a href="/assistance">Assistance</a></li> */}
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@travelease.com</p>
            <p>Phone: +1-555-0123</p>
            <p>Address: 123 Travel St, Adventure City</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 TravelEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 