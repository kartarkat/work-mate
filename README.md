### Get started
- open terminal
- `git clone https://github.com/kartarkat/work-mate.git`
- `cd online-drive`
- `npm i`
- `npm start`

### Preview
![](./src/assets/work-mate-preview.gif)

### Actions
- **Search** -> Search employee using search bar.
- **Filter** -> Filter employees using their teams.
- **update** -> Update employee manager by dragging and dropping.
- **toggle visibility** -> By clicking an employee show/hide its children

### Components
- **EmployeeList**  -> To render, Employee List
- **EmployeeTree** - >To render all Employee in an tree structure with corresponding children
- **Header**  -> Page header
- **SearchBar** -> To handle search and filter functionality
- **ErrorPage** -> To handle routing errors
- **Loader** -> To manager loading states while doing API calls

### Utils
- **api**  -> App api related functions , endpoints are maintained here
- **helpers** -> Reusable helper functions are maintained here

## Backend
For the API, I have created my own using express for listing and updating employees.

- **get employees**  -> https://api-work-mate.vercel.app/employees -> GET request
- **update employee** -> https://api-work-mate.vercel.app/employees/update -> POST request  with payload  { employeeId, newManagerId } 