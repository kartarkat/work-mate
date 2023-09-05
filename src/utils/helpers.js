export const generateEmployeeTree = (data) => {
  const employeesById = new Map();

  // Initialize the 'children' property for all employees
  data.forEach((employee) => {
    employee.children = [];
    employeesById.set(employee.id, employee);
  });

  const rootEmployees = [];

  // Filter the data based on the selected team

  data.forEach((employee) => {
    if (employee.manager === null) {
      rootEmployees.push(employee);
    } else {
      // Ensure that the manager's 'children' property is initialized
      const manager = employeesById.get(employee.manager);
      if (manager) {
        manager.children.push(employee);
      }
    }
  });

  return rootEmployees;
};
