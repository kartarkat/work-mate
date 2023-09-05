
import EmployeeList from "./components/EmployeeList/EmployeeList";
import EmployeeTree from "./components/EmployeeTree/EmployeeTree";
import { generateEmployeeTree } from "./utils/helpers";
import styles from "./App.module.scss"; // Import your main SCSS styles
import { useEffect, useState } from "react";
import { fetchEmployees, updateEmployee } from "./utils/api";
import Header from "./components/Header";
import Loader from "./components/Loader/Loader";


export default function App() {
	const [employees, setEmployees] = useState([])
	const [loading, setLoading] = useState(true)
	const [filterData, setFilterData] = useState({ query: "", team: "All" })

	useEffect(() => {
		const fetchEmployeesData = async () => {
			try {
				const data = await fetchEmployees()
				setEmployees(data)
				setLoading(false)
			} catch {
				setLoading(false)
			}
		}
		fetchEmployeesData()
	}, [])

	// Filter by search query (name, designation, or team)
	const filteredEmployees = employees.filter((employee) => {
		const searchString = filterData.query.toLowerCase();
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
		filterData.team === "All"
			? filteredEmployees
			: filteredEmployees.filter((employee) => employee.team === filterData.team);

	const updateEmployeeOrder = async (dragged, dropped) => {
		setLoading(true)
		//API call to update the manager ID of the dragged employee here
		try {
			const draggedEmployee = employees.find((employee) => parseInt(employee.id) === parseInt(dragged));
			const newManagerId = parseInt(dropped);
			if (draggedEmployee) {
				if (draggedEmployee.manager === newManagerId) {
					setLoading(false)
					return;
				}
				if (draggedEmployee.id === newManagerId) {
					setLoading(false)
					return;
				} else {
					// Make the API call to update the manager
					updateEmployee(parseInt(dragged), parseInt(dropped))
						.then((data) => {
							// Update the state with the new employee data
							setEmployees(data);
							setLoading(false);
						})
						.catch((error) => {
							// Handle or log the error here
							console.error('API call error:', error);
							setLoading(false);
						});
				}
			}
		} catch (error) {
			// Handle or log the error here
			console.error('Error:', error);
			setLoading(false);
		}

		// For now, update the local state
		// setEmployees((employees) => {
		// 	const draggedEmployee = employees.find((employee) => parseInt(employee.id) === parseInt(dragged));
		// 	const newManagerId = parseInt(dropped);

		// 	if (draggedEmployee) {
		// 	  // Check if the new manager is the same as the old manager
		// 	  if (draggedEmployee.manager === newManagerId) {
		// 		return [...employees]; // No change needed
		// 	  }

		// 	  // Check if the dragged employee is becoming its own manager
		// 	  if (draggedEmployee.id === newManagerId) {
		// 		return [...employees]; // No change needed
		// 	  } else {
		// 		draggedEmployee.manager = newManagerId;
		// 	  }

		// 	  return [...employees];
		// 	}

		// 	return employees;
		//   });
	};

	const renderPage = () => {
		return (
			<div className={styles.container}>
				<EmployeeList employeeData={teamFilteredEmployees} />
				<EmployeeTree
					data={generateEmployeeTree(employees, filterData.team)}
					updateEmployeeOrder={updateEmployeeOrder}
				/>
			</div>
		)
	}

	return (
		<div className={styles.app}>
			<Header
				title={"Employee Management "}
				employeeData={employees}
				setFilterData={setFilterData} />
			{loading ? <Loader name={'Employees data is loading'} />
				: renderPage()}

		</div>
	);
}