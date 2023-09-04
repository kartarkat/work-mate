import "./App.css";
import EmployeeTree from "./components/EmployeeTree/EmployeeTree";
import { employeeData } from "./constants";
import { generateEmployeeTree } from "./utils/helpers";

export default function App() {
	console.log('testttt', generateEmployeeTree(employeeData))
	return (
			<div className="App">sdv
			  <h1>Employee Tree</h1>
			  <EmployeeTree data={generateEmployeeTree(employeeData)} />
			</div>
	);
}