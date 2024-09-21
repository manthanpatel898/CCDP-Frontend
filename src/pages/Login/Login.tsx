import React, { useState } from 'react';
import InputField from '../../../src/components/Input/InputField';
import Button from '../../../src/components/Button/Button';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the login logic here (e.g., send data to server)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <h2>Login</h2>
          <p>Please use your login credentials to login to the admin panel</p>
        </div>
        <InputField
          label="Email id"
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
        <Button disabled={!isFormValid}>Submit</Button>
      </form>
    </div>
  );
};


export default LoginPage;
