import React, { useState } from "react";
import styles from './EmployeeTree.module.scss';

const EmployeeTreeNode = ({ employee, setEmployeeData, employeeData, onDragStart, onToggle, setDraggedEmployee, draggedEmployee }) => {
  const [isOpen, setIsOpen] = useState(true);
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    const handleDragStart = (e) => {
      onDragStart(e, employee);
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    const handleDrop = (e, targetEmployee) => {
      e.preventDefault();
  
      // Check if the targetEmployee already has a 'children' array
      if (!targetEmployee.children) {
        targetEmployee.children = [];
      }
  
      // Add the dragged employee to the target's children
      targetEmployee.children.push(employee);
  
      // Remove the dragged employee from its previous parent
      if (employee !== targetEmployee) {
        const sourceIndex = employee.parent.children.indexOf(employee);
        if (sourceIndex !== -1) {
          employee.parent.children.splice(sourceIndex, 1);
        }
      }
  
      // Reset the draggedEmployee state
      onDragStart(null, null);
    };
  
    return (
      <div
        className={styles.node}
        draggable={true}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, employee)}
      >
        <div className={styles.nodeContent}>
          <div className={styles.designation}>{employee.designation}</div>
          <span>{employee.name}</span>
          {employee.children?.length > 0 && (
            <button className={styles.toggleButton} onClick={handleToggle}>
              {isOpen ? "Hide" : "Show"} Children
            </button>
          )}
        </div>
        {isOpen && employee.children && (
          <div className={styles.children}>
            {employee.children.map((child) => (
              <React.Fragment key={child.id}>
                <EmployeeTreeNode
                  employee={child}
                  onDragStart={onDragStart}s
                //   onToggle={onToggle}
                />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const EmployeeTree = ({ data }) => {
    const [employeeData, setEmployeeData] = useState(data);
    const [draggedEmployee, setDraggedEmployee] = useState(null);
  
    const handleDragStart = (e, employee) => {
      setDraggedEmployee(employee);
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    return (
      <div className={styles.employeeTree} onDragOver={handleDragOver}>
        {employeeData.map((employee) => (
          <EmployeeTreeNode
          key={employee.id}
          employeeData={employeeData}
          setEmployeeData={setEmployeeData}
          draggedEmployee={draggedEmployee}
          setDraggedEmployee={setDraggedEmployee}
          employee={employee}
          onDragStart={handleDragStart}
          onToggle={() => {}}
          />
        ))}
      </div>
    );
  };
  
  export default EmployeeTree;
  
