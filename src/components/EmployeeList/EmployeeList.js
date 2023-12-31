import React from "react";
import styles from './EmployeeList.module.scss';

const EmployeeList = ({ employeeData }) => {

  return (
    <div className={styles.employeeListContainer}>
      <ul className={styles.employeeItems}>
        {employeeData.map((employee) => (
          <li key={employee.id} className={styles.employeeItem}>
            <div className={styles.employeeName}>{employee.name}</div>
            <div className={styles.employeeDesignation}>Designation: {employee.designation}</div>
            <div className={styles.employeeTeam}>Team: {employee.team}</div>
          </li>
        ))}
        {employeeData?.length === 0 ? 'No employee found' : ''}
      </ul>
      <div className={styles.chartSection}>
      </div>
    </div>
  );
};

export default EmployeeList;
