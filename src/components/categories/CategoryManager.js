// fetch all the categories
import { fetchIt } from "../utils/Fetch"

const API = 'http://localhost:8088'

export const getAllCategories = () => {
  return fetchIt(`${API}/categories`)
}