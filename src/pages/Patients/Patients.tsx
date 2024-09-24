import React, { useState } from "react";
import { FaSearch, FaChevronRight, FaSlidersH, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './Patients.css'; // Custom styles
import PatientForm from "./PatientForm"; // Assuming you have the PatientForm component created

const Patients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Simulated dynamic patient data
  const patientsData = [
    { name: 'Guillaume Goudreau', email: 'guillaume.goudreau@gmail.com', phone: '+1 (302) 555-0107', medicare: 'BDYO19136', gender: 'Male', dob: 'Feb 29, 1988', signal: null, isActive: false },
    { name: 'Georges Charette', email: 'georges.charette@gmail.com', phone: '+1 (208) 555-0112', medicare: '3ZTABC456', gender: 'Male', dob: 'May 6, 1984', signal: 'Active signal for Distress Screening', isActive: true },
    { name: 'Anton Corbeil', email: 'a.corbeil@gmail.com', phone: '+1 (270) 555-0117', medicare: '3ZTABC109', gender: 'Male', dob: 'Dec 29, 1987', signal: null, isActive: false },
    { name: 'Emmanuel Barrière', email: 'emmanuel.barrière@gmail.com', phone: '+1 (907) 555-0101', medicare: '4ZTABC130', gender: 'Male', dob: 'Mar 23, 1988', signal: null, isActive: false },
    { name: 'Patrick Lamoureux', email: 'patrick.l@gmail.com', phone: '+1 (219) 555-0114', medicare: 'BDYO24474', gender: 'Male', dob: 'Aug 2, 1989', signal: null, isActive: false },
    { name: 'André Vaillancourt', email: 'a.vaillancourt@gmail.com', phone: '+1 (217) 555-0113', medicare: '3ZTABC123', gender: 'Male', dob: 'Aug 24, 1992', signal: 'Active signal for Sarc-F Assessment', isActive: true },
    { name: 'Chantal Shelburne', email: 'chantal.shelburne@gmail.com', phone: '+1 (201) 555-0124', medicare: '3ZTABC123', gender: 'Female', dob: 'Aug 24, 1992', signal: 'Active signal for G8-Questionnaire, Distress Screening', isActive: true },
    { name: 'Marie Dupont', email: 'marie.dupont@gmail.com', phone: '+1 (201) 555-1234', medicare: '2ZTABC111', gender: 'Female', dob: 'Jan 5, 1980', signal: null, isActive: false },
    { name: 'John Doe', email: 'john.doe@gmail.com', phone: '+1 (203) 555-4321', medicare: '2ZTABC112', gender: 'Male', dob: 'Nov 20, 1985', signal: null, isActive: false },
    { name: 'Jane Smith', email: 'jane.smith@gmail.com', phone: '+1 (205) 555-1111', medicare: '2ZTABC113', gender: 'Female', dob: 'Apr 10, 1983', signal: null, isActive: false }
  ];

  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRowClick = (patient: any) => {
    navigate(`/patients/${patient.name}`, { state: patient });
  };

  const handleAddPatientClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const filteredPatients = patientsData.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patients-page">
      <div className="patients-header">
        <h2>Patients</h2>
        <div className="search-container">
          <div className="input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Name, email id, medicare, doctor name, or Phone #"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <FaSlidersH className="filter-icon" />
          <FaPlus className="add-icon" onClick={handleAddPatientClick} /> {/* Add icon */}
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="patients-table">
          <thead>
            <tr>
              <th></th> {/* Empty column for vertical colored line */}
              <th>Full name</th>
              <th>Email id</th>
              <th>Phone number</th>
              <th>Medicare #</th>
              <th>Gender</th>
              <th>DoB</th>
              <th></th> {/* Empty column for right arrow icon */}
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <>
                <tr className={`vertical-line ${patient.isActive ? "active-signal-row-btn" : ""}`} key={index} onClick={() => handleRowClick(patient)}>
                  <td className="vertical-line-cell">
                    <div className={`vertical-line ${patient.isActive ? "active-signal-line" : "normal-line"}`}></div>
                  </td>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.medicare}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.dob}</td>
                  <td className="view-arrow">
                    <FaChevronRight className="icon" />
                  </td>
                </tr>
                {patient.signal && (
                  <tr className="active-signal-row">
                    <td colSpan={8} className="active-signal full-width">
                      <span className="center-text">{patient.signal}</span>
                      <span className="active-arrow">
                        <FaChevronRight className="icon" />
                      </span>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient form modal */}
      {isFormOpen && (
        <div className="modal-background">
          <div className="modal">
            <PatientForm onClose={handleCloseForm} /> {/* Assuming PatientForm component accepts onClose prop */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
