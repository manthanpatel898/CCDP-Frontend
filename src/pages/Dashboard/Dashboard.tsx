import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar"; // Assuming you have Navbar
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

// Sample data for the chart
const data2023 = [
  { month: "Jan", distress: 20, sarcF: 10, g8: 30 },
  { month: "Feb", distress: 15, sarcF: 20, g8: 25 },
  // Add more data for months
];

const data2022 = [
  { month: "Jan", distress: 30, sarcF: 15, g8: 10 },
  { month: "Feb", distress: 25, sarcF: 20, g8: 15 },
  // Add more data for months
];

const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [chartData, setChartData] = useState(data2023);

  // Update chart data based on the selected year
  useEffect(() => {
    if (selectedYear === "2023") {
      setChartData(data2023);
    } else if (selectedYear === "2022") {
      setChartData(data2022);
    }
  }, [selectedYear]);

  // Handle dropdown change
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  return (
    <>
     <Navbar /> {/* Navbar for the entire app */}
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

      {/* Year Dropdown */}
      <div className="year-selector">
        <label htmlFor="year">Year: </label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          {/* Add more years as needed */}
        </select>
      </div>

      {/* Chart Section */}
      <div className="chart-container">
        <h4>Active Signal</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
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
    </div>

    </>
  );
};

export default Dashboard;
