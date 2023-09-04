
import EmployeeList from "./components/EmployeeList/EmployeeList";
import EmployeeTree from "./components/EmployeeTree/EmployeeTree";
import { employeeData } from "./constants";
import { generateEmployeeTree } from "./utils/helpers";
import styles from "./App.module.scss"; // Import your main SCSS styles


export default function App() {
	return (
		<div className={styles.app}>
		<h1>Employee Tree</h1>
		<div className={styles.container}>
		  <EmployeeList employeeData={employeeData} />
		  <EmployeeTree data={generateEmployeeTree(employeeData)} />
		</div>
	  </div>
	);
}