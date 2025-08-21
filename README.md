# TravelEase - Travel Package Booking System

A comprehensive React.js frontend application for managing travel package bookings, user management, and travel agency operations.

## 🚀 Features

### User Dashboard
- Browse and book travel packages
- Select insurance options for packages
- View booking history and manage bookings
- Cancel bookings (within 7 days of travel)
- Payment processing via credit card or PayPal

### Agent Dashboard
- View statistics (packages, bookings, revenue)
- Manage travel packages (create, edit, delete)
- View booking details with insurance information
- Monitor customer bookings for their packages

### Admin Dashboard
- User management (approve agents, remove users)
- Booking oversight and status management
- Insurance assistance request management
- System-wide statistics and monitoring

### Additional Features
- User authentication and role-based access control
- Customer reviews with agent response capability
- Responsive design for all devices
- Modern UI with clean, professional styling

## 🛠️ Technology Stack

- **Frontend**: React.js 19.1.1
- **Routing**: React Router DOM 6.8.1
- **Forms**: React Hook Form 7.43.9
- **HTTP Client**: Axios 1.3.4
- **Styling**: CSS3 with responsive design
- **Build Tool**: Vite 7.1.2

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TPBS_v5
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 👥 Demo Accounts

### Customer Account
- **Email**: john.smith@email.com
- **Password**: password123

### Agent Account
- **Email**: alex.agent@travel.com
- **Password**: agent123

### Admin Account
- **Email**: admin@travel.com
- **Password**: admin123

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   └── Footer.jsx      # Site footer
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication state management
├── pages/              # Page components
│   ├── Landing.jsx     # Home page
│   ├── SignIn.jsx      # User login
│   ├── SignUp.jsx      # User registration
│   ├── UserDashboard.jsx    # Customer dashboard
│   ├── AgentDashboard.jsx   # Agent dashboard
│   ├── AdminDashboard.jsx   # Admin dashboard
│   └── Reviews.jsx     # Reviews and ratings
├── styles/             # CSS stylesheets
│   ├── common.css      # Common styles
│   ├── Header.css      # Header styles
│   ├── Footer.css      # Footer styles
│   ├── Landing.css     # Landing page styles
│   ├── Auth.css        # Authentication styles
│   ├── Dashboard.css   # Dashboard styles
│   └── Reviews.css     # Reviews page styles
├── data.js             # Mock data and database schema
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following entities:

- **User**: Customer, Agent, and Admin accounts
- **TravelPackage**: Travel packages with details and pricing
- **Booking**: Customer bookings with dates and status
- **Payment**: Payment information and status
- **Review**: Customer reviews and ratings
- **Insurance**: Travel insurance options and coverage
- **AssistanceRequest**: Customer support requests

## 🔐 Authentication & Authorization

- **Role-based access control** for different user types
- **Protected routes** based on user roles
- **Local storage** for session persistence
- **Form validation** using React Hook Form

## 💳 Payment Integration

- **Credit Card** payment processing
- **PayPal** integration
- **Insurance** selection during booking
- **Payment status** tracking

## 📱 Responsive Design

- **Mobile-first** approach
- **Responsive grid** layouts
- **Touch-friendly** interfaces
- **Cross-browser** compatibility

## 🎨 UI/UX Features

- **Clean, modern design** with minimal colors
- **Smooth animations** and transitions
- **Interactive elements** with hover effects
- **Professional color scheme** and typography

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The application is designed to work with a backend API. Currently uses mock data, but includes commented axios calls for future backend integration:

```javascript
// Example API call (commented for future use)
// const response = await axios.post('/api/bookings', bookingData);
```

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please contact the development team or create an issue in the repository.

---

**Note**: This is a frontend-only application. For production use, you'll need to:
- Implement a backend API
- Set up a real database
- Configure payment gateways
- Add security measures
- Set up proper hosting and SSL certificates
