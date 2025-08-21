import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { toast } from 'react-hot-toast';
import '../styles/Auth.css';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { login } = useAuth();
  const { users, updateUser } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Show success message if redirected from signup
  if (location.state?.message) {
    toast.success(location.state.message);
    // Clear the message to prevent showing it again
    location.state = null;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const result = login(data.email, data.password, users);
      if (result.success) {
        // Check if agent is approved
        if (result.user.Role === 'agent' && result.user.Approval !== 'approved') {
          toast.error('Your agent account is pending approval. Please wait for admin approval before signing in.');
          setIsLoading(false);
          return;
        }

        toast.success('Sign in successful!');
        switch (result.user.Role) {
          case 'admin': navigate('/admin-dashboard'); break;
          case 'agent': navigate('/agent-dashboard'); break;
          case 'customer': navigate('/user-dashboard'); break;
          default: navigate('/user-dashboard');
        }
      } else {
        toast.error(result.message);
        setIsLoading(false);
      }
    } catch {
      toast.error('An error occurred during sign in');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    // Check if email exists in our system
    const userExists = users.find(user => user.Email === forgotPasswordEmail);
    
    if (userExists) {
      setSelectedUser(userExists);
      setShowPasswordChangeForm(true);
    } else {
      toast.error('No account found with this email address');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    const oldPassword = e.target.oldPassword.value;
    
    if (!oldPassword.trim() || !newPassword.trim() || !confirmNewPassword.trim()) {
      toast.error('Please fill in all password fields');
      return;
    }

    // Validate old password
    if (oldPassword !== selectedUser.Password) {
      toast.error('Old password is incorrect');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    // Check if new password is same as old password
    if (oldPassword === newPassword) {
      toast.error('New password must be different from old password');
      return;
    }

    setIsResettingPassword(true);
    
    try {
      // Simulate API call for password update
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the user's password in the system
      updateUser(selectedUser.UserID, { Password: newPassword });
      
      toast.success('Password changed successfully! You can now sign in with your new password.');
      setShowForgotPassword(false);
      setShowPasswordChangeForm(false);
      setForgotPasswordEmail('');
      setNewPassword('');
      setConfirmNewPassword('');
      setSelectedUser(null);
    } catch {
      toast.error('Failed to change password. Please try again.');
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleBackToSignIn = () => {
    setShowForgotPassword(false);
    setShowPasswordChangeForm(false);
    setForgotPasswordEmail('');
    setNewPassword('');
    setConfirmNewPassword('');
    setSelectedUser(null);
  };

  if (showPasswordChangeForm && selectedUser) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Change Password</h2>
            <p>Enter your old password and new password</p>
          </div>

          <form onSubmit={handlePasswordChange} className="auth-form">
            <div className="form-group">
              <label htmlFor="oldPassword" className="form-label">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                className="form-control"
                placeholder="Enter your old password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
              <input
                type="password"
                id="confirmNewPassword"
                className="form-control"
                placeholder="Confirm your new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isResettingPassword}
            >
              {isResettingPassword ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>

          <div className="auth-footer">
            <button
              type="button"
              className="btn btn-link"
              onClick={handleBackToSignIn}
            >
              ← Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showForgotPassword) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Forgot Password</h2>
            <p>Enter your email to change your password</p>
          </div>

          <form onSubmit={handleForgotPassword} className="auth-form">
            <div className="form-group">
              <label htmlFor="resetEmail" className="form-label">Email Address</label>
              <input
                type="email"
                id="resetEmail"
                className="form-control"
                placeholder="Enter your email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Continue
            </button>
          </form>

          <div className="auth-footer">
            <button
              type="button"
              className="btn btn-link"
              onClick={handleBackToSignIn}
            >
              ← Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your TravelEase account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">
                {errors.password.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-link forgot-password-link"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot your password?
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 