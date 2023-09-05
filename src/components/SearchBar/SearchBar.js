import React, { useState } from 'react'
import styles from './SearchBar.module.scss'

function SearchBar({ setFilterData, employeeData }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("All");
  
    const handleSearchChange = (e) => {
        setFilterData(prev => ({ ...prev, query: e.target.value }));

      setSearchQuery(e.target.value);
    };
  
    const handleTeamChange = (e) => {
        console.log('check', e.target.value)
        setFilterData(prev => ({ ...prev, team: e.target.value }));
      setSelectedTeam(e.target.value);
    };

    return (
        <div className={styles.filterSection}>
        <input
          type="text"
          placeholder="Search for name / team / designation"
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
          {Array.from(
            new Set(employeeData?.map((employee) => employee.team))
          ).map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>
    )
}

export default SearchBar