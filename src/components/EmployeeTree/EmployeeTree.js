import React, { useEffect, useState } from "react";
import styles from './EmployeeTree.module.scss';
import defaultAvatar from '../../assets/defaultAvatar.png'

const EmployeeTreeNode = ({ employee, onDrop, draggedEmployee, setDraggedEmployee }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [dragItem, setDragItem] = useState(null)

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleDragStart = (event) => {
        event.dataTransfer.setData("id", event.target.dataset.id );

        // if(dragItem === null){

        //     console.log('draggg', emp)
        // }
        // Set the employee object as the data being transferred
      };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
       
        let target = event.target;
        while (target) {
            const dataId = target.dataset.id;
            if (dataId && dataId.startsWith('node-')) {
                // Extract the unique identifier
                const draggedEmployeeId = event.dataTransfer.getData("id");
                // const nodeId = dataId.replace('node-', '');
                // console.log('dataId', dataId)
                // console.log('Dropped on Node with ID:', nodeId);
                onDrop(draggedEmployeeId, dataId );
    
                // Perform your drop logic for the specific node (nodeId)
                break;
            }
            target = target.parentNode;
        }

        // console.log('finally', target.dataset.id)
      };

    return (
        <div
            className={styles.node}
            onDragStart={(e) => handleDragStart(e, employee)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            draggable={true}
            // data-id={employee.id}
            data-id={`node-${employee.id}`}
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

const EmployeeTree = ({ data,  updateEmployeeOrder}) => {
    const [employeeData, setEmployeeData] = useState([]);
    const [draggedEmployee, setDraggedEmployee] = useState(null);

    useEffect(()=>{
        setEmployeeData(data)
    },[data])

    const handleDrop = (dragged, dropped) => {
        const draggedNode = dragged.replace('node-', '');
        const droppedNode = dropped.replace('node-', '');
        updateEmployeeOrder(draggedNode, droppedNode)
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
