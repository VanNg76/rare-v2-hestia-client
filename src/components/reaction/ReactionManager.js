import { Settings } from "../utils/Settings" 
import { fetchIt } from "../utils/Fetch"

export const getAllReactions = () => {
    return fetchIt(`${Settings.API}/reactions`)  
  }