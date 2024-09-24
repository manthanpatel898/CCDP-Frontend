import React, { useState } from "react";
import './PatientForm.css';
import '../../components/Button/Button.css';

interface PatientFormProps {
  onClose: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onClose }) => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    medicare: '',
    gender: 'Male',
    dob: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic or API call goes here
    console.log("Form Submitted:", formValues);
    onClose(); // Close the form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <h3>Add New Patient</h3>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formValues.fullName}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formValues.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formValues.phone}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="medicare"
        placeholder="Medicare#"
        value={formValues.medicare}
        onChange={handleInputChange}
        required
      />
      <select
        name="gender"
        value={formValues.gender}
        onChange={handleInputChange}
        required
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        type="date"
        name="dob"
        value={formValues.dob}
        onChange={handleInputChange}
        required
      />
      <div className="formButton"> 
      <button type="submit" className="submit-button">Add Patient</button>
      <button type="button" className="submit-button cancelbtn" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default PatientForm;
