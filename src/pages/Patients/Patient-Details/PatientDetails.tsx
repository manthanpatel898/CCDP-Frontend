import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import './PatientDetails.css'; // Custom styles
import PatientOnboarding from '../Patient-On-Boarding/PatientOnboarding';

const PatientDetails: React.FC = () => {
  const navigate = useNavigate(); // <-- Initialize useNavigate hook
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Patient Onboarding', 'QoL Assmt', 'Distress Screening', 'Consultations'];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <PatientOnboarding />;
      // You can add other cases here for other tabs (QoL Assmt, Distress Screening, etc.)
      default:
        return <PatientOnboarding />;
    }
  };

  return (
    <div className="patient-details-page">
      {/* Back button and patient info */}
      <div className="patient-header">
        <div className="back-button" onClick={handleBackClick}>
          <FaArrowLeft />
          <span>Back</span>
        </div>

        <div className="patient-info">
          <div className="left-section">
            <div>Date of Birth: <span>May 6, 1984 (39 Years)</span></div>
            <div>Medicare Number: <span>3ZTABC456</span></div>
          </div>

          <div className="right-section">
            <div><span>Georges Charette</span> <span>Male</span></div>
            <div>Patient ID: <span>928347</span></div>
            <div>Contact number: <span>+1 (208) 555-0112</span></div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="tabs-container">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-item ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Render the active tab content */}
      <div className="tab-content">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default PatientDetails;
