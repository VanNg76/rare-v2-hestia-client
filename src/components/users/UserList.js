// imports
// import { User } from "./User"
// get all users fetch
import { useEffect, useState } from "react"
import { User } from "./User"
import { getAllUsers, getCurrentUser } from "./UserManager"

// function that generates list of users
// invokes User function from User.js for each user
export const UserList = () => {
    // define needed state variables
    // users, setUsers = useState()
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState()

    const getUsers = () => {
        getAllUsers()
            .then(setUsers)
    }

    // define needed useEffects
    // useEffect(() => getUsers function and set as users state variable, [])
    useEffect(() => {
        getUsers()
    }, [])

    useEffect(
        () => {
        getCurrentUser()
        .then(setCurrentUser)
    }, [])
    // define needed functions
    // will the users have any buttons?
    // user links to individual pages probably don't need buttons/history.push()
    // can just be <Link> tags

    // return jsx
    return <>
    {/* <div className="singleUser">
        <div>Username</div>
        <div>First Name</div>
        <div>Last Name</div>
        <div>Email</div>
    </div> */}
    {
        users?.map(user => {
            return <div key={`user-${user.id}`}>
                <User user={user} listView={true} currentUser={currentUser} getUsers={getUsers} />
            </div>
        })
    }
    {/*
        map over users and invoke <User /> component for each
        add any other jsx tags as needed for styling
    */}

    </>
}