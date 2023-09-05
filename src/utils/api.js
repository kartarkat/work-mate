// api url and endpoints
const BASE_URL = 'https://api-work-mate.vercel.app/'

const END_POINTS = {
  employees: "employees",
  employeesId: "employees/:id",
  update: "employees/update"
}

// api specific functions
export const fetchEmployees = async() => {
    const url = `${BASE_URL}${END_POINTS.employees}`
    return await fetchData(url)
}

export const updateEmployee = async (employeeId, newManagerId) => {
  const url = `${BASE_URL}${END_POINTS.update}`;
  const payload = {
    employeeId,
    newManagerId,
  };
  return await postData(url, payload)
};

export const fetchEmployeesById = async(id) => {
    const url = `${BASE_URL}${END_POINTS.employeesId}`.replace(':id', id)
    return await fetchData(url)
}


// api helper functions
async function fetchData(url) {
  try {
    const response = await fetch(url)
    if(!response.ok){
        console.log('response failed')
    }
    return await response.json()
  }
  catch (error) {
    console.log(error)
  }
}

async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log('POST request failed');
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
