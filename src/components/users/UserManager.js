import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

// get all users fetch
// server returns user array with following properties for each user
// id
// first_name
// last_name
// username
// email
export const getAllUsers = () => {
    return fetchIt(`${Settings.API}/users`)
}

// get single user by user id
// returns user object with posts array embedded
// user object should have all properties except password
export const getSingleUser = (id) => {
    return fetchIt(`${Settings.API}/users/${id}`)
}

export const getCurrentUser = () => {
    return fetchIt(`${Settings.API}/users/0`)
}

export const deactivateUser = (user) => {
    return fetchIt(`${Settings.API}/users/${user.id}/deactivate`, "PUT")
}

export const reactivateUser = (user) => {
    return fetchIt(`${Settings.API}/users/${user.id}/reactivate`, "PUT")
}

export const promoteUser = (user) => {
    return fetchIt(`${Settings.API}/users/${user.id}/promote`, "PUT")
}

export const demoteUser = (user) => {
    return fetchIt(`${Settings.API}/users/${user.id}/demote`, "PUT")
}
