// api url and endpoints
const BASE_URL = 'https://api-work-mate.vercel.app/'

const END_POINTS = {
  employees: "employees",
  employeesId: "employees/:id",
}

// api specific functions
export const fetchEmployees = async() => {
    const url = `${BASE_URL}${END_POINTS.employees}`
    return await fetchData(url)
}

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