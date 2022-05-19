import { useState, useEffect } from "react"
import { getSubsForFollower } from "../users/SubManager"
import { Post } from "./Post"
import { getAllPosts } from "./PostManager"
import { getCurrentUser } from "../users/UserManager"

export const SubbedPosts = () => {
    const [currentUser, setCurrentUser] = useState()
    const [subs, setSubs] = useState([])
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState()

    useEffect(() => {
        getCurrentUser()
            .then(user => setCurrentUser(user))
        getAllPosts()
            .then(posts => setPosts(posts))
    }, [])

    useEffect(
        () => {
            if (currentUser) {
                getSubsForFollower(currentUser.id)
                    .then(subs => setSubs(subs))
            }
        },
        [currentUser]
    )

    useEffect(() => {
        let postArray = []
        for (const sub of subs) {
            for (const post of posts) {
                if (sub.author.id === post.user.id) {
                    postArray.push(post)
                }
            }
        }
        setFilteredPosts(postArray)
    }, [subs, posts])

    return <div>
        {  
            filteredPosts?.map(post => {
                return <div key={`post--${post.id}`}>
                    <Post listView={true} cardView={true} post={post} />
                    </div>
            })
        }
    </div>
}