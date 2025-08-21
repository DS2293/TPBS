import { createContext, useContext, useState } from 'react';
import { users, travelPackages, bookings, payments, reviews, insurance, assistanceRequests } from '../data';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Initialize state with original data
  const [data, setData] = useState({
    users: [...users],
    travelPackages: [...travelPackages],
    bookings: [...bookings],
    payments: [...payments],
    reviews: [...reviews],
    insurance: [...insurance],
    assistanceRequests: [...assistanceRequests]
  });

  // CRUD Operations for Users
  const addUser = (userData) => {
    const newUser = {
      UserID: Math.max(...data.users.map(u => u.UserID)) + 1,
      ...userData,
      RegistrationDate: new Date().toISOString(),
      Approval: userData.Approval || 'approved' // Default to approved if not specified
    };
    setData(prev => ({
      ...prev,
      users: [...prev.users, newUser]
    }));
    return newUser;
  };

  const updateUser = (userId, updates) => {
    setData(prev => ({
      ...prev,
      users: prev.users.map(user => 
        user.UserID === userId ? { ...user, ...updates } : user
      )
    }));
  };

  const deleteUser = (userId) => {
    setData(prev => ({
      ...prev,
      users: prev.users.filter(user => user.UserID !== userId)
    }));
  };

  // CRUD Operations for Travel Packages
  const addTravelPackage = (packageData) => {
    const newPackage = {
      PackageID: Math.max(...data.travelPackages.map(p => p.PackageID)) + 1,
      ...packageData
    };
    setData(prev => ({
      ...prev,
      travelPackages: [...prev.travelPackages, newPackage]
    }));
    return newPackage;
  };

  const updateTravelPackage = (packageId, updates) => {
    setData(prev => ({
      ...prev,
      travelPackages: prev.travelPackages.map(pkg => 
        pkg.PackageID === packageId ? { ...pkg, ...updates } : pkg
      )
    }));
  };

  const deleteTravelPackage = (packageId) => {
    setData(prev => ({
      ...prev,
      travelPackages: prev.travelPackages.filter(pkg => pkg.PackageID !== packageId)
    }));
  };

  // CRUD Operations for Bookings
  const addBooking = (bookingData) => {
    const newBooking = {
      BookingID: Math.max(...data.bookings.map(b => b.BookingID)) + 1,
      ...bookingData
    };
    setData(prev => ({
      ...prev,
      bookings: [...prev.bookings, newBooking]
    }));
    return newBooking;
  };

  const updateBooking = (bookingId, updates) => {
    setData(prev => ({
      ...prev,
      bookings: prev.bookings.map(booking => 
        booking.BookingID === bookingId ? { ...booking, ...updates } : booking
      )
    }));
  };

  const deleteBooking = (bookingId) => {
    setData(prev => ({
      ...prev,
      bookings: prev.bookings.filter(booking => booking.BookingID !== bookingId)
    }));
  };

  // CRUD Operations for Payments
  const addPayment = (paymentData) => {
    const newPayment = {
      PaymentID: Math.max(...data.payments.map(p => p.PaymentID)) + 1,
      ...paymentData
    };
    setData(prev => ({
      ...prev,
      payments: [...prev.payments, newPayment]
    }));
    return newPayment;
  };

  const updatePayment = (paymentId, updates) => {
    setData(prev => ({
      ...prev,
      payments: prev.payments.map(payment => 
        payment.PaymentID === paymentId ? { ...payment, ...updates } : payment
      )
    }));
  };

  // CRUD Operations for Reviews
  const addReview = (reviewData) => {
    const newReview = {
      ReviewID: Math.max(...data.reviews.map(r => r.ReviewID)) + 1,
      ...reviewData,
      Timestamp: new Date().toISOString()
    };
    setData(prev => ({
      ...prev,
      reviews: [...prev.reviews, newReview]
    }));
    return newReview;
  };

  const updateReview = (reviewId, updates) => {
    setData(prev => ({
      ...prev,
      reviews: prev.reviews.map(review => 
        review.ReviewID === reviewId ? { ...review, ...updates } : review
      )
    }));
  };

  const deleteReview = (reviewId) => {
    setData(prev => ({
      ...prev,
      reviews: prev.reviews.filter(review => review.ReviewID !== reviewId)
    }));
  };

  // CRUD Operations for Assistance Requests
  const addAssistanceRequest = (requestData) => {
    const newRequest = {
      RequestID: Math.max(...data.assistanceRequests.map(r => r.RequestID)) + 1,
      ...requestData,
      Status: 'pending',
      ResolutionTime: null,
      Timestamp: new Date().toISOString()
    };
    setData(prev => ({
      ...prev,
      assistanceRequests: [...prev.assistanceRequests, newRequest]
    }));
    return newRequest;
  };

  const updateAssistanceRequest = (requestId, updates) => {
    setData(prev => ({
      ...prev,
      assistanceRequests: prev.assistanceRequests.map(request => 
        request.RequestID === requestId ? { ...request, ...updates } : request
      )
    }));
  };

  const deleteAssistanceRequest = (requestId) => {
    setData(prev => ({
      ...prev,
      assistanceRequests: prev.assistanceRequests.filter(request => request.RequestID !== requestId)
    }));
  };

  // Helper functions for filtered data
  const getUserById = (userId) => data.users.find(user => user.UserID === userId);
  const getPackageById = (packageId) => data.travelPackages.find(pkg => pkg.PackageID === packageId);
  const getBookingsByUserId = (userId) => data.bookings.filter(booking => booking.UserID === userId);
  const getPackagesByAgentId = (agentId) => data.travelPackages.filter(pkg => pkg.AgentID === agentId);

  // Function to sync users from AuthContext
  const syncUsersFromAuth = (authUsers) => {
    setData(prev => ({
      ...prev,
      users: authUsers
    }));
  };

  const value = {
    // Data
    users: data.users,
    travelPackages: data.travelPackages,
    bookings: data.bookings,
    payments: data.payments,
    reviews: data.reviews,
    insurance: data.insurance,
    assistanceRequests: data.assistanceRequests,
    
    // CRUD Operations
    addUser,
    updateUser,
    deleteUser,
    addTravelPackage,
    updateTravelPackage,
    deleteTravelPackage,
    addBooking,
    updateBooking,
    deleteBooking,
    addPayment,
    updatePayment,
    addReview,
    updateReview,
    deleteReview,
    addAssistanceRequest,
    updateAssistanceRequest,
    deleteAssistanceRequest,
    
    // Helper functions
    getUserById,
    getPackageById,
    getBookingsByUserId,
    getPackagesByAgentId,
    syncUsersFromAuth
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}; 