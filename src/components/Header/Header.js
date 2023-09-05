import React from 'react'
import styles from './Header.module.scss'
import SearchBar from '../SearchBar/SearchBar'

function Header({ title = 'My App', setFilterData, employeeData }) {
  return (
    // <div className='header'>
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.rightSection}>
        <SearchBar setFilterData={setFilterData} employeeData={employeeData} />
      </div>
    </div>
  )
}

export default Header