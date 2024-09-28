import React, { useState, useEffect } from "react";
import './PatientForm.css';
import { toast, ToastContainer } from "react-toastify"; // Import toast from react-toastify
import { addPatient } from "../../../service/Patient.service";

interface PatientFormProps {
  onClose: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onClose }) => {
  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    medicare: '',
    gender: 'Male',
    date_of_birth: '',
  });

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [loading, setLoading] = useState(false); // Loading state for the submit button

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Check form validity on every input change
  useEffect(() => {
    const isValid =
      formValues.first_name.trim() &&
      formValues.last_name.trim() &&
      validateEmail(formValues.email) &&
      formValues.mobile.trim() &&
      formValues.medicare.trim() &&
      formValues.date_of_birth;

    setIsFormValid(!!validateEmail(formValues.email));
  }, [formValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Invalid data. Please check your input.");
      return;
    }

    try {
      setLoading(true); // Start loading

      const response = await addPatient(formValues);
      console.log("Form Submitted:", response);

      if (response && response.statusCode === 201) {
        // Success message
        toast.success(response.message);
        onClose(); // Close the form only if statusCode is 200
      } else {
        toast.error(response.message);
      }

    } catch (error:any) {
      debugger
      toast.error(error.message);
      console.error("Error during API call:", error);

    } finally {
      setLoading(false); // Stop loading after the response
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <h3>Add New Patient</h3>

      {/* First Name Field */}
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formValues.first_name}
        onChange={handleInputChange}
        required
      />

      {/* Last Name (Previously Full Name) Field */}
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formValues.last_name}
        onChange={handleInputChange}
        required
      />

      {/* Email Field */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formValues.email}
        onChange={handleInputChange}
        required
      />
      {formValues.email && !validateEmail(formValues.email) && (
        <div className="error-message">Invalid email format</div>
      )}

      {/* Phone Field */}
      <input
        type="tel"
        name="mobile"
        placeholder="Phone Number"
        value={formValues.mobile}
        onChange={handleInputChange}
        required
      />

      {/* Medicare Field */}
      <input
        type="text"
        name="medicare"
        placeholder="Medicare#"
        value={formValues.medicare}
        onChange={handleInputChange}
        required
      />

      {/* Gender Field */}
      <select
        name="gender"
        value={formValues.gender}
        onChange={handleInputChange}
        required
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/* Date of Birth Field */}
      <input
        type="date"
        name="date_of_birth"
        value={formValues.date_of_birth}
        onChange={handleInputChange}
        required
      />

      <div className="formButton">
        <button type="button" className="submit-button cancelbtn" onClick={onClose}>
          Cancel
        </button>
        <button
          type="submit"
          className="submit-button"
          disabled={!isFormValid || loading}
        >
          {loading ? "Loading..." : "Add Patient"}
        </button>
      </div>

      {/* Toast container for displaying notifications */}
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
  );
};

export default PatientForm;
