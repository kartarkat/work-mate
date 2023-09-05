
import EmployeeList from "./components/EmployeeList/EmployeeList";
import EmployeeTree from "./components/EmployeeTree/EmployeeTree";
import { generateEmployeeTree } from "./utils/helpers";
import styles from "./App.module.scss"; // Import your main SCSS styles
import { useEffect, useState } from "react";
import { fetchEmployees } from "./utils/api";
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

	const updateEmployeeOrder = (dragged, dropped) => {
		console.log(dragged, dropped)
		// Do your API call to update the manager ID of the dragged employee here

		// For now, update the local state
		setEmployees((employees) => {
			const draggedEmployee = employees.find((employee) => parseInt(employee.id) === parseInt(dragged));
			if (draggedEmployee) {
				draggedEmployee.manager = parseInt(dropped);
				return [...employees];
			}
			return employees;
		});
	
	};

	const renderPage = () => {
		// console.log('employees updated', generateEmployeeTree(employees, filterData.team))
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