import { useState, useEffect } from "react"
import { getSubsForFollower } from "../users/SubManager"
import { Post } from "./Post"
import { getAllPosts } from "./PostManager"

export const SubbedPosts = () => {
    const [subs, setSubs] = useState([{posts: []}])
    const [posts, setPosts] = useState([])
    const currentUser = localStorage.getItem("token")

    useEffect(
        () => {
            getSubsForFollower(currentUser)
                .then(setSubs)
            getAllPosts()
                .then(posts => setPosts(posts))
        },
        []
    )

    useEffect(
        () => {
            let postArray = []
            for (const sub of subs) {
                for (const post of posts) {
                    if (sub.author_id === post.user_id) {
                        postArray.push(post)
                    }
                }
            }
            setPosts(postArray)
        },
        [subs]
    )


    return <div>
        {
            posts.map(post => {
                return <div key={`post--${post.id}`}>
                    <Post listView={true} cardView={true} post={post} />
                    </div>
            })
        }
    </div>
}