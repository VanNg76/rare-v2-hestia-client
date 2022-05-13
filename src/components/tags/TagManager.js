// fetch all the tags
import { fetchIt } from "../utils/Fetch"

const API = 'http://localhost:8088'

export const getAllTags = () => {
  return fetchIt(`${API}/tags`)
}