import { useState, useEffect } from "react"
import { Post } from "./Post"
import { getMyPosts } from "./PostManager"

export const MyPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(
        () => {
            getMyPosts()
                .then(setPosts)
        },
        []
    )

    return <>
        {
            posts.map(post => {
                return <div key={`post-${post.id}`}>
                    <Post listView={true} cardView={true} post={post} />
                </div>
            })
        }
    </>
}