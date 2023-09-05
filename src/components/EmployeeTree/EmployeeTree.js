import React, { useState } from "react";
import styles from './EmployeeTree.module.scss';
import defaultAvatar from '../../assets/defaultAvatar.png'

const EmployeeTreeNode = ({ employee, onDrop, draggedEmployee, setDraggedEmployee }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleDragStart = (e, emp) => {
        console.log(e, emp)
        // Set the employee object as the data being transferred
        e.dataTransfer.setData("application/json", JSON.stringify(employee));
      };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        // Get the dragged employee object from the data being transferred
        const draggedEmployee = JSON.parse(e.dataTransfer.getData("application/json"));
        console.log('draggedEmployee', draggedEmployee)
        onDrop(draggedEmployee, employee);
      };

    // const handleDrop = (e) => {
    //     e.preventDefault();

    //     // Ensure not to drop an employee onto itself
    //     if (draggedEmployee.id === employee.id) {
    //         return;
    //     }

    //     // Ensure not to drop an employee onto an employee with the same manager
    //     if (draggedEmployee.manager === employee.id) {
    //         return;
    //     }

    //     const draggedEmployeeData = JSON.parse(e.dataTransfer.getData("application/json"));

    //     console.log('draggedEmployeeData', draggedEmployeeData)


    //     // Update the manager ID of the dragged employee
    //     draggedEmployee.manager = employee.id;

    //     console.log('draggedEmployee', draggedEmployee)

    //     // Trigger the onDrop function to update the employee data
    //     onDrop(draggedEmployee, employee);

    //     // Clear the current dragged employee
    //     setDraggedEmployee(null);
    // };

    return (
        <div
            className={styles.node}
            onDragStart={(e) => handleDragStart(e, employee)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            draggable={true}
        >
            <div className={styles.nodeContent} onClick={handleToggle}>
                <img className={styles.avatar} alt='avatar' src={employee?.url || defaultAvatar} />
                <div>
                    <div className={styles.designation}>{employee.designation}</div>
                    <div>{employee.name}</div>
                    <div>Team: {employee.team}</div>
                </div>
            </div>
            {isOpen && employee.children && (
                <div className={styles.children}>
                    {employee.children.map((child) => (
                        <React.Fragment key={child.id}>
                            <EmployeeTreeNode
                                employee={child}
                                onDrop={onDrop}
                                draggedEmployee={draggedEmployee}
                                setDraggedEmployee={setDraggedEmployee}
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

    const handleDrop = (updatedEmployee) => {
        // console.log('updatedEmployee', updatedEmployee)
        // Create a new copy of the employeeData
        const updatedData = [...employeeData];
    
        // Find the parent of the updated employee
        const parentOfUpdated = updatedData.find((emp) =>
            emp.children.some((child) => child.id === updatedEmployee.id)
        );
    
        // Remove the updated employee from its previous parent
        const sourceIndex = parentOfUpdated?.children.findIndex(
            (child) => child.id === updatedEmployee.id
        );
        if (sourceIndex !== -1) {
            parentOfUpdated?.children.splice(sourceIndex, 1);
        }
    
        // Add the updated employee to the target's children
        const targetIndex = updatedData.findIndex((emp) => emp.id === updatedEmployee.manager);
        if (targetIndex !== -1) {
            updatedData[targetIndex].children.push(updatedEmployee);
        }
    
        // Update the employeeData state with the new data
        setEmployeeData(updatedData);
    };
    

    return (
        <div className={styles.employeeTree}>
            {employeeData.map((employee) => (
                <EmployeeTreeNode
                    key={employee.id}
                    employee={employee}
                    onDrop={handleDrop}
                    draggedEmployee={draggedEmployee}
                    setDraggedEmployee={setDraggedEmployee}
                />
            ))}
        </div>
    );
};

export default EmployeeTree;
