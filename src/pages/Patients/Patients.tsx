import React, { useState, useEffect } from "react";
import { FaSearch, FaChevronRight, FaSlidersH, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './Patients.css'; // Custom styles
import PatientForm from "./Patient-Form/PatientForm"; // Assuming you have the PatientForm component created
import { patientList } from "../../service/Patient.service";

const Patients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [patientsData, setPatientsData] = useState<any[]>([]); // State to store patient data
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading state

  const navigate = useNavigate();

  // Fetch patient data when component mounts
  useEffect(() => {
    debugger
    const fetchPatients = async () => {
      try {
        const payload = {}; // Define the payload if necessary
        const response = await patientList(payload, 1, 10, 'asc'); // Fetch data with pagination, sorting, etc.
        if (response && response.statusCode === 200) {
          setPatientsData(response.data.patients); // Store the fetched data in state
          setLoading(false); // Set loading to false once data is fetched  
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setLoading(false); // In case of error, stop the loading spinner
      }
    };

    fetchPatients(); // Call the function
  }, []); // Empty dependency array ensures this runs only on component mount

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

  // Filter patients based on search term
  const filteredPatients = patientsData.filter((patient) =>
    patient.first_name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <FaPlus className="add-icon" onClick={handleAddPatientClick} /> {/* Add icon */}
        </div>
      </div>

      {/* Show a loading spinner or message while data is being fetched */}
      {loading ? (
        <p>Loading patients...</p>
      ) : (
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
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                  <>
                    <tr className={`vertical-line ${patient.isActive ? "active-signal-row-btn" : ""}`} key={index} onClick={() => handleRowClick(patient)}>
                      <td className="vertical-line-cell">
                        <div className={`vertical-line ${patient.isActive ? "active-signal-line" : "normal-line"}`}></div>
                      </td>
                      <td>{patient.first_name} {patient.last_name}</td>
                      <td>{patient.email}</td>
                      <td>{patient.mobile_no}</td>
                      <td>{patient.medicare_code}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.date_of_birth}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No patients found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

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
