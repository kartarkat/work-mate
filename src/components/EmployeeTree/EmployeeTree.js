import React, { useState } from "react";
import styles from './EmployeeTree.module.scss';
import defaultAvatar from '../../assets/defaultAvatar.png'

const EmployeeTreeNode = ({ employee, onDrop }) => {
    const [isOpen, setIsOpen] = useState(true);

    //   let currentDragItem ;

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleDragStart = (e) => {
        // Set the employee object as the data being transferred

        // if(currentDragItem){
        e.dataTransfer.setData("application/json", JSON.stringify(employee));
        // }

    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        // Get the dragged employee object from the data being transferred
        const draggedEmployee = JSON.parse(e.dataTransfer.getData("application/json"));
        onDrop(draggedEmployee, employee);
    };

    return (
        <div
            className={styles.node}
            onDragStart={handleDragStart}
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
                            <EmployeeTreeNode employee={child} onDrop={onDrop} />
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

const EmployeeTree = ({ data }) => {
    const [employeeData, setEmployeeData] = useState(data);

    let draggedEmployee;

    const handleDrop = (draEmp, targetEmployee) => {
        console.log(draggedEmployee)
        if (draggedEmployee === undefined) {
            draggedEmployee = draEmp
            console.log('first 1')
        } else {
            console.log('first 2')

            return null;
        }

        console.log(draggedEmployee, targetEmployee)
        // Ensure not to drop an employee onto itself
        if (draggedEmployee.id === targetEmployee.id) {
            return;
        }

        // Ensure not to drop an employee onto an employee with the same manager
        if (draggedEmployee.manager === targetEmployee.manager) {
            return;
        }

        // Update the employeeData state to reflect the changes
        const updatedData = [...employeeData];

        // Find the parent of the dragged employee
        let parentOfDragged = null;

        updatedData.forEach((emp) => {
            if (emp.children) {
                if (emp.children.some((child) => child.id === draggedEmployee.id)) {
                    parentOfDragged = emp;
                }
            }
        });

        // Remove the dragged employee from its previous parent
        const sourceIndex = parentOfDragged?.children.findIndex(
            (child) => child.id === draggedEmployee.id
        );
        if (sourceIndex !== -1) {
            parentOfDragged?.children.splice(sourceIndex, 1);
        }

        // Add the dragged employee to the target's children
        if (!targetEmployee.children) {
            targetEmployee.children = [];
        }
        targetEmployee.children.push(draggedEmployee);

        // Update the manager field of the dragged employee
        draggedEmployee.manager = targetEmployee.id;

        // Update the employeeData state with the changes
        setEmployeeData(updatedData);
    };

    return (
        <div className={styles.employeeTree}>
            {employeeData.map((employee) => (
                <EmployeeTreeNode key={employee.id} employee={employee} onDrop={handleDrop} />
            ))}
        </div>
    );
};

export default EmployeeTree;
