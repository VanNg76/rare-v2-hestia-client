// fetch all the categories
import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

export const getAllCategories = () => {
  return fetchIt(`${Settings.API}/categories`)
}

export const getSingleCategory = (categoryId) => {
  return fetchIt(`${Settings.API}/categories/${categoryId}`)
}

export const createCategory = (newCategory) => {
  return fetchIt(`${Settings.API}/categories`, "POST", JSON.stringify(newCategory))
}

export const updateCategory = (newCategory) => {
  return fetchIt(`${Settings.API}/categories/${newCategory.id}`, "PUT", JSON.stringify(newCategory))
}

export const deleteCategory = (categoryId) => {
  return fetchIt(`${Settings.API}/categories/${categoryId}`, "DELETE")
}