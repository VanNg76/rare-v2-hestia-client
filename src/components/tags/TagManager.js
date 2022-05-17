import { Settings } from "../utils/Settings" 
import { fetchIt } from "../utils/Fetch"


const API = 'http://localhost:8088'


// fetch all the tags
export const getAllTags = () => {
  return fetchIt(`${API}/tags`)
}


export const updateTag = (newTag) => {
  return fetchIt(`${Settings.API}/tags/${newTag.id}`, "PUT", JSON.stringify(newTag))
}

export const deleteTag = (tagId) => {
  return fetchIt(`${Settings.API}/tags/${tagId}`, "DELETE")
}

export const getSingleTag = (tagId) => {
  return fetchIt(`${Settings.API}/tags/${tagId}`)
}


