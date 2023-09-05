
import EmployeeList from "./components/EmployeeList/EmployeeList";
import EmployeeTree from "./components/EmployeeTree/EmployeeTree";
import { employeeData } from "./constants";
import { generateEmployeeTree } from "./utils/helpers";
import styles from "./App.module.scss"; // Import your main SCSS styles
import { useEffect, useState } from "react";
import { fetchEmployees } from "./utils/api";
import Header from "./components/Header";
import Loader from "./components/Loader/Loader";



export default function App() {
	const [employees, setEmployees] = useState(employeeData)
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
	const filteredEmployees = employeeData.filter((employee) => {
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

	const renderPage = () => {
		return (
			<div className={styles.container}>
				<EmployeeList employeeData={teamFilteredEmployees} />
				<EmployeeTree data={generateEmployeeTree(employees, filterData.team)} />
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