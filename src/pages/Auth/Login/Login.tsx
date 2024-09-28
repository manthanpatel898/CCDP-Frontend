import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './LoginPage.css';
import Button from '../../../components/Button/Button';
import InputField from '../../../components/Input/InputField';
import { adminLogin } from '../../../service/Auth.service';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Loading state for the submit process

  const navigate = useNavigate(); // Hook for navigating to other routes

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = validateEmail(email) && password.length >= 8;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email.');
      return;
    }

    if (password.length < 8) {
      toast.error('Password should be at least 8 characters long.');
      return;
    }

    try {
      setLoading(true); // Disable button and show loader when submitting

      const payload = { email, password };
      const response = await adminLogin(payload);
      
      if (response && response.statusCode === 200) {
        // Display success toast
        toast.success(response.message);
        
        // Store the access token in localStorage
        localStorage.setItem('token', response.data.access_token);
        
        // Redirect to the dashboard
        navigate('/dashboard');
      } else {
        // Display error toast
        toast.error(response.message);
      }
    } catch (error:any) {
      // Display error toast for any other errors
      toast.error(error.message);
      console.error('Error during login:', error);
    } finally {
      setLoading(false); // Enable button and stop loader when process is complete
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <h2>Login</h2>
          <p>Please use your login credentials to log in to the admin panel</p>
        </div>

        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-wrapper">
          <InputField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <div className="forgot-password-wrapper">
          <a href="#" className="forgot-password">Forgot Password</a>
        </div>
        
        <Button disabled={!isFormValid || loading}>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
        
        {/* ToastContainer for displaying toast notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </form>
    </div>
  );
};

export default LoginPage;
