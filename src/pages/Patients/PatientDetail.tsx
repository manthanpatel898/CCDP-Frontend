import React from 'react';
import { useLocation } from 'react-router-dom';

const PatientDetail: React.FC = () => {
  const location = useLocation();
  const patient = location.state;

  return (
    <div>
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Phone:</strong> {patient.phone}</p>
      <p><strong>Medicare:</strong> {patient.medicare}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Date of Birth:</strong> {patient.dob}</p>
      <p><strong>Signal:</strong> {patient.signal}</p>
    </div>
  );
};

export default PatientDetail;
