// EmployeeList.js

import React, { useState } from "react";
import styles from './EmployeeList.module.scss';

const EmployeeList = ({ employeeData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTeamChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  const filteredEmployees = employeeData.filter((employee) => {
    // Filter by search query (name, designation, or team)
    const searchString = searchQuery.toLowerCase();
    const employeeName = employee.name.toLowerCase();
    const employeeDesignation = employee.designation.toLowerCase();
    const employeeTeam = employee.team.toLowerCase();
    return (
      employeeName.includes(searchString) ||
      employeeDesignation.includes(searchString) ||
      employeeTeam.includes(searchString)
    );
  });

  // Apply team filter if a team is selected
  const teamFilteredEmployees =
    selectedTeam === "All"
      ? filteredEmployees
      : filteredEmployees.filter((employee) => employee.team === selectedTeam);

  return (
    <div className={styles.employeeListContainer}>
      <div className={styles.filterSection}>
        <input
          type="text"
          placeholder="Search by name, designation, or team"
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <select
          value={selectedTeam}
          onChange={handleTeamChange}
          className={styles.teamSelect}
        >
          <option value="All">All Teams</option>
          {/* Dynamically generate team options based on your employee data */}
          {Array.from(
            new Set(employeeData.map((employee) => employee.team))
          ).map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>
      <ul className={styles.employeeItems}>
        {teamFilteredEmployees.map((employee) => (
          <li key={employee.id} className={styles.employeeItem}>
            <div className={styles.employeeName}>Name: {employee.name}</div>
            <div className={styles.employeeDesignation}>Designation: {employee.designation}</div>
            <div className={styles.employeeTeam}>Team: {employee.team}</div>
          </li>
        ))}
      </ul>
      <div className={styles.chartSection}>
        {/* Render the chart for the filtered employees */}
        {/* You can use any chart library or custom representation here */}
      </div>
    </div>
  );
};

export default EmployeeList;
