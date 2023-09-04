export const generateEmployeeTree = (data) => {
  const employeesById = new Map();
  
  // Initialize the 'children' property for all employees
  data.forEach((employee) => {
    employee.children = [];
    employeesById.set(employee.id, employee);
  });

  const rootEmployees = [];

  data.forEach((employee) => {
    if (employee.manager === null) {
      rootEmployees.push(employee);
    } else {
      const manager = employeesById.get(employee.manager);
      manager.children.push(employee);
    }
  });


  return rootEmployees;
};