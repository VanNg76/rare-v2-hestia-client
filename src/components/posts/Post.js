import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { ButtonControls } from "../buttonControls/ButtonControls"
import { CommentList } from "../comments/CommentsList"
import { getAllPostReactions, updatePost } from "./PostManager"
import { getAllReactions } from "../reaction/ReactionManager"
import "./Post.css"

// function that renders a single post
export const Post = ({ listView, cardView, post, currentUser, getPostsList }) => {

    const [showComments, setShowComments] = useState(false)
    const [is_admin, setAdmin] = useState(false)
    const history = useHistory()
    const [postReactions, setPostReactions] = useState([])
    const [filteredPostReactions, setFilteredPostReactions] = useState([])
    const [reactions, setReactions] = useState([])
    // const currentUser = parseInt(localStorage.getItem("token"))

    const dateFormat = (obj) => {
        const copy = { ...obj }
        const dateArray = copy.publication_date.split('-')
        const dayArray = dateArray[2].split('T')
        const newDate = `${dateArray[1]}-${dayArray[0]}-${dateArray[0]}`
        return newDate
    }

    const adminApprovalSwitch = () => {
        let copy = {...post}
        copy.approved = !copy.approved
        updatePost(copy)
        .then(getPostsList())
    }

    useEffect(() => {
        getAllReactions()
            .then(setReactions)
    }, [])

    useEffect(() => {
        getAllPostReactions()
            .then(setPostReactions)
    }, [])

    useEffect(() => {
        if (postReactions.length > 0) {
            let postArray = postReactions.filter(pr => pr.post.id === post.id)
            setFilteredPostReactions(postArray)
        }
    }, [postReactions, post])

    useEffect(
        () => {
            if (listView) {
                if (currentUser?.user.is_staff === true) {
                    setAdmin(true)
                }
            }
        },
        [listView, currentUser]
    )

    return <>
        {/* Content needed in all posts list */}
        {/* Title, Author, Date, Category, Tags */}
        {
            listView && cardView
                ? <div key={`post--${post.id}`} className="postCard">
                    <div className="cardTitle">
                        <div>
                            <Link to={`/posts/single/${post.id}`}>
                                {post.title}
                            </Link>
                        </div>
                        <div>{dateFormat(post)}</div>
                    </div>
                    <div className="cardImage">
                        <img src={`${post.imageURL || "https://picsum.photos/300/100"}`} />
                    </div>
                    <div className="cardBottom">
                        <div>Author: {post.user.user.first_name} {post.user.user.last_name}</div>
                        <div className="cardFunctions">
                            <div>Reaction Count: {filteredPostReactions.length}

                            </div>
                            {
                                post.is_author
                                    ? <div className="cardButtons">
                                        <ButtonControls isPost={true} isUser={false} postId={post.id} />
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
                : listView
                    ? <div key={`post--${post.id}`} className="singlePost">
                        {is_admin ?
                            <div>
                                <button className={post.approved ? "un-approve-button" : "approve-button"}
                                onClick={adminApprovalSwitch}>
                                {post.approved ? "Un-approve" : "Approve"}
                                </button>
                            </div>
                            : ""
                        }
                        <div>
                            <Link to={`/posts/single/${post.id}`}>
                                {post.title}
                            </Link>
                            {
                                post.is_author
                                    ? <ButtonControls isPost={true} postId={post.id} />
                                    : null
                            }
                        </div>
                        <div>{post.user.user.first_name} {post.user.user.last_name}</div>
                        <div>{dateFormat(post)}</div>
                        <div>{post.category.label}</div>
                        <div>{post.tags?.map(tag => <div key={`posttag${post.id}${tag.id}`}>{tag.label}</div>)}</div>
                    </div>
                    :
                    <div key={`post--${post.id}`} className="postDetails">
                        <div className="postDetailsMain">
                            <div className="postDetailsTitle">
                                <div className="cardButtons">
                                    {
                                        post.is_author
                                            ? <ButtonControls isPost={true} postId={post.id} />
                                            : null
                                    }
                                </div>
                                <div>{post.title}</div>
                                <div>{post.category.label}</div>
                                <div className="approval">{post.approved ? "Approved" : "Not Approved"}</div>
                            </div>
                            <div className="image-container"><img className="post-image" src={`${post.imageUrl || "https://picsum.photos/300/100"}`} /></div>
                            <div className="postDetailsBelowCard">
                                <div>By <Link to={`/users/${post.userId}`} >
                                    {post.user.user.username}
                                </Link>
                                </div>
                                <div>
                                    {
                                        showComments
                                            ? <button onClick={() => { setShowComments(false) }}>Show Post</button>
                                            : <button onClick={() => setShowComments(true)}>View Comments</button>
                                    }
                                </div>
                                <div>Reactions: 
                                    {
                                        filteredPostReactions?.map(pr => {
                                            const findReaction = reactions?.find(reaction => reaction.id === pr.reaction.id)
                                            return " " + findReaction.label + "  "
                                        })
                                    }
                                </div>
                            </div>
                            {
                                showComments
                                    ? <CommentList postId={post.id} />
                                    : <div>{post.content}</div>
                            }
                        </div>
                        <div className="postDetailsTags">{post.tags?.map(tag => <div key={`posttag${post.id}${tag.id}`}>{tag.label}</div>)}</div>
                    </div>
        }
        {/* Content needed in card view */}
        {/* Title, Image, Author Name (not username), Publication date, reaction count */}
        {/* Content needed in post details */}
        {/* Title, category, tags, content, username, image, reactions */}
    </>
}