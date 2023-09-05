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

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log(searchText)
    //     setSearchText("")
    //     setSearchQuery(searchText)
    // }

    
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
          {/* Dynamically generate team options based on your employee data */}
          {Array.from(
            new Set(employeeData?.map((employee) => employee.team))
          ).map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>
        // <div className={styles.searchBar}>
        //     <form onSubmit={handleSubmit}>
        //         <input
        //             type="text"
        //             placeholder='Search recipes'
        //             value={searchText}
        //             onChange={e => setSearchText(e.target.value)}
        //         />
        //         <button type='submit'>Search</button>
        //         <button className={styles.close}
        //             onClick={() => setSearchQuery('')}>X</button>
        //     </form>
        // </div>
    )
}

export default SearchBar