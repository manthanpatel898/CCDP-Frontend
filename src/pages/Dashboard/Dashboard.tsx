import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import "./Dashboard.css";

// Sample data for the bar chart (Active Signal)
const signalData2023 = [
  { month: "Jan", distress: 20, sarcF: 10, g8: 30 },
  { month: "Feb", distress: 15, sarcF: 20, g8: 25 },
  { month: "Mar", distress: 25, sarcF: 30, g8: 20 },
  { month: "Apr", distress: 35, sarcF: 40, g8: 15 },
  { month: "May", distress: 45, sarcF: 50, g8: 35 },
  { month: "Jun", distress: 55, sarcF: 60, g8: 40 },
  { month: "Jul", distress: 40, sarcF: 30, g8: 35 },
  { month: "Aug", distress: 30, sarcF: 20, g8: 25 },
  { month: "Sep", distress: 50, sarcF: 40, g8: 30 },
  { month: "Oct", distress: 40, sarcF: 30, g8: 20 },
  { month: "Nov", distress: 35, sarcF: 25, g8: 15 },
  { month: "Dec", distress: 20, sarcF: 15, g8: 10 },
];

const signalData2022 = [
  { month: "Jan", distress: 30, sarcF: 15, g8: 10 },
  { month: "Feb", distress: 25, sarcF: 20, g8: 15 },
  // Add more data for months
];

// Sample data for the line chart (Patients)
const patientData2023 = [
  { month: "Jan", patients: 30 },
  { month: "Feb", patients: 45 },
  { month: "Mar", patients: 40 },
  { month: "Apr", patients: 60 },
  { month: "May", patients: 50 },
  { month: "Jun", patients: 90 },
  { month: "Jul", patients: 70 },
  { month: "Aug", patients: 65 },
  { month: "Sep", patients: 100 },
  { month: "Oct", patients: 80 },
  { month: "Nov", patients: 90 },
  { month: "Dec", patients: 70 },
];

const patientData2022 = [
  { month: "Jan", patients: 25 },
  { month: "Feb", patients: 40 },
  { month: "Mar", patients: 35 },
  { month: "Apr", patients: 50 },
  { month: "May", patients: 45 },
  { month: "Jun", patients: 80 },
  { month: "Jul", patients: 65 },
  { month: "Aug", patients: 60 },
  { month: "Sep", patients: 95 },
  { month: "Oct", patients: 75 },
  { month: "Nov", patients: 85 },
  { month: "Dec", patients: 65 },
];

const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [signalData, setSignalData] = useState(signalData2023);
  const [patientData, setPatientData] = useState(patientData2023);

  // Update chart data based on the selected year
  useEffect(() => {
    if (selectedYear === "2023") {
      setSignalData(signalData2023);
      setPatientData(patientData2023);
    } else if (selectedYear === "2022") {
      setSignalData(signalData2022);
      setPatientData(patientData2022);
    }
  }, [selectedYear]);

  // Handle dropdown change
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="dashboard">
      {/* Summary Boxes */}
      <div className="summary-container">
        <div className="summary-box">
          <h4># of Dashboard</h4>
          <p>42</p>
        </div>
        <div className="summary-box">
          <h4># of Patients</h4>
          <p>1849</p>
        </div>
        <div className="summary-box">
          <h4>Medical staff members</h4>
          <p>24</p>
        </div>
        <div className="summary-box">
          <h4>Active signals</h4>
          <p>740</p>
        </div>
      </div>

      {/* Bar Chart for Active Signal */}
      <div className="chart-header-with-legend">
        <div className="chart-header">
          <h4 className="active-signal-title">Active Signal</h4>
          <div className="year-selector">
            <select id="year" value={selectedYear} onChange={handleYearChange}>
              <option value="2023">Year 2023</option>
              <option value="2022">Year 2022</option>
            </select>
          </div>
        </div>

        {/* Color legend for Bar Chart */}
        <div className="legend">
          <span className="legend-item">
            <span className="legend-color distress"></span> Distress
          </span>
          <span className="legend-item">
            <span className="legend-color sarcF"></span> Sarc-F Assessment
          </span>
          <span className="legend-item">
            <span className="legend-color g8"></span> G8-Questionnaire
          </span>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={signalData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="distress" fill="#ff6565" name="Distress" />
            <Bar dataKey="sarcF" fill="#8b8b8b" name="Sarc-F Assessment" />
            <Bar dataKey="g8" fill="#d92d2d" name="G8-Questionnaire" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart for Patients */}
      {/* Line Chart for Patients */}
      <div className="chart-header">
        <h4 className="patients-title">Patients</h4>
        <div className="year-selector-line-chart">
          <select id="year" value={selectedYear} onChange={handleYearChange}>
            <option value="2023">Year 2023</option>
            <option value="2022">Year 2022</option>
          </select>
        </div>
      </div>


      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={patientData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="linear"
              dataKey="patients"
              stroke="#d92d2d"
              fill="#d92d2d"
              strokeWidth={3}
              dot={{ r: 6, fill: "#d92d2d" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
