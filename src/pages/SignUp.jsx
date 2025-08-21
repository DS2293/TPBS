import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { toast } from 'react-hot-toast';
import '../styles/Auth.css';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addUser } = useData();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');
  const selectedRole = watch('role');

  const onSubmit = (data) => {
    setIsLoading(true);

    try {
      // Set approval status based on role
      const approvalStatus = data.role === 'agent' ? 'pending' : 'approved';
      
      const result = addUser({
        Name: data.name,
        Email: data.email,
        Password: data.password,
        Role: data.role,
        ContactNumber: data.contactNumber,
        Approval: approvalStatus
      });

      if (result) {
        if (data.role === 'agent') {
          toast.success('Agent registration submitted! Please wait for admin approval before signing in.');
        } else {
          toast.success('Registration successful! Please sign in with your new account.');
        }
        
        setIsLoading(false);
        setTimeout(() => {
          navigate('/signin', {
            state: { 
              message: data.role === 'agent' 
                ? 'Agent registration submitted! Please wait for admin approval before signing in.' 
                : 'Registration successful! Please sign in with your new account.'
            }
          });
        }, 2000);
      } else {
        toast.error('Failed to create account');
        setIsLoading(false);
      }
    } catch {
      toast.error('An error occurred during registration');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join TravelEase and start your journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              {...register('name', { 
                required: 'Full name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                  message: 'Invalid email address' 
                }
              })}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email address"
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              {...register('contactNumber', { 
                required: 'Contact number is required',
                pattern: { 
                  value: /^[0-9+\-\s()]{10,}$/, 
                  message: 'Please enter a valid contact number' 
                }
              })}
              className={errors.contactNumber ? 'error' : ''}
              placeholder="Enter your contact number"
            />
            {errors.contactNumber && <span className="error-message">{errors.contactNumber.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <select
              id="role"
              {...register('role', { required: 'Please select an account type' })}
              className={errors.role ? 'error' : ''}
            >
              <option value="">Select account type</option>
              <option value="customer">Customer - Book travel packages</option>
              <option value="agent">Agent - Create and manage travel packages</option>
            </select>
            {errors.role && <span className="error-message">{errors.role.message}</span>}
            {selectedRole === 'agent' && (
              <div className="info-message">
                 Agent accounts require admin approval before you can sign in.
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' }
              })}
              className={errors.password ? 'error' : ''}
              placeholder="Create a strong password"
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 