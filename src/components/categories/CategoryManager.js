// fetch all the categories
import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

export const getAllCategories = () => {
  return fetchIt(`${Settings.API}/categories`)
}

export const createCategory = (newCategory) => {
  return fetchIt(`${Settings.API}/categories`, "POST", JSON.stringify(newCategory))
}

export const deleteCategory = (categoryId) => {
  return fetchIt(`${Settings.API}/categories/${categoryId}`, "DELETE")
}