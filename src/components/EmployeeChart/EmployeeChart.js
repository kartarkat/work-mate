import React, { useContext } from "react";
//import data from "../data.json";
import { EmployeeDataContext } from "../../context/EmployeeDataContext";
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const EmployeeChart = () => {
	const { root, tree, employee_mapping } = useContext(EmployeeDataContext);

	return (
		<div className="org-tree">
			<ul className="tree">{list(root, tree, employee_mapping)}</ul>;
		</div>
	);
};

function drop(e) {
	e.preventDefault();
	var data = e.dataTransfer.getData("text");
	if (e.target.tagName == "BUTTON") {
		e.target.parentNode.appendChild(document.getElementById(data));
	} else {
		e.target.appendChild(document.getElementById(data));
	}
}
function allowDrop(e) {
	e.preventDefault();
}
function drag(e) {
	e.dataTransfer.setData("text", e.target.id);
}
const list = (root, tree, employee_mapping) => {
	return root.map((item) => {
		return (
			<React.Fragment key={employee_mapping[item].id}>
				<li
					onDrop={(event) => drop(event)}
					onDragOver={(event) => allowDrop(event)}
				>
					<span onDragStart={(event) => drag(event)} id={item} draggable>
						<h4>{employee_mapping[item].designation}</h4>
						{/* <p>{employee_mapping[item].subtitle}</p> */}
						<button
							style={{
								border: "none",
								background: "transparent",
							}}
						>
							{employee_mapping[item].team}
						</button>
					</span>

					<div>{list(tree[item].children, tree, employee_mapping)}</div>
				</li>
			</React.Fragment>
		);
	});
};
export default EmployeeChart;
