import React, { useState } from 'react';
import './InputField.css';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Check if the input has value or is focused to float the label
  const shouldFloatLabel = isFocused || value.length > 0;

  return (
    <div className="input-field-container">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="input-field"
        placeholder="" // Keep the placeholder empty to let the label act as a floating placeholder
      />
      <label className={`input-label ${shouldFloatLabel ? 'float' : ''}`}>
        {label}
      </label>
    </div>
  );
};

export default InputField;
