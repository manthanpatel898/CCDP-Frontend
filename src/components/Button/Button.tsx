import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, disabled }) => {
  return (
    <button className={`submit-button ${disabled ? 'disabled' : ''}`} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
