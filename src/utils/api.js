import { employeeData } from "../constants";

// api url and endpoints
const BASE_URL = 'https://api-recipe.vercel.app/'

const END_POINTS = {
  employees: "employees",
recipesId: "recipes/:id",
}

// api specific functions
export const fetchEmployees = async() => {
    // const url = `${BASE_URL}${END_POINTS.recipes}`
    // return await fetchData(url)
    // Simulate an asynchronous API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(employeeData);
    }, 100);
  });
}

export const fetchRecipesById = async(id) => {
    const url = `${BASE_URL}${END_POINTS.recipesId}`.replace(':id', id)
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