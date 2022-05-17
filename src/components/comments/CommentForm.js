// imports
// addComment from CommentManager
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { addComment, getSingleComment, updateComment } from "./CommentManager"

// export function that handles comment form entry
export const CommentForm = ({ postId, getComments, editing }) => {
    // declare state variable for comment to add
    const [newComment, setComment] = useState({ content: "" })
    const { commentId } = useParams()
    const history = useHistory()
    // should have values
    // post id
    // author of comment id (current user)
    // content

    useEffect(
        () => {
            if (editing) {
                getSingleComment(commentId)
                    .then(setComment)
            }
        }, []
    )

    // function to handle comment submission
    const submitComment = () => {
        if (newComment.content.length > 0) {

            const copy = {}
            // gets comment content from state
            copy.content = newComment.content
            // adds postId
            copy.post = postId
            // sends to database using function from CommentManager
            if (editing) {
                const updatedComment = {
                    id: newComment.id,
                    created_on: newComment.created_on,
                    content: newComment.content,
                    author: newComment.author,
                    post: newComment.post,
                    is_author: newComment.is_author
                }
                updateComment(newComment)
                    .then(() => history.push(`/posts/single/${newComment.post.id}`))
            }
            else {
                addComment(copy)
                    .then(() => setComment({ content: "" }))
                    .then(() => getComments(postId))
                // refresh comment list
            }
        } else {
            window.alert("Please fill out your comment before submitting.")
        }
    }
    return <fieldset className="editComment-container">
        <div className="edit-comment">
            {editing ?
                <label htmlFor="content">Update Comment</label>
                : <label htmlFor="content">Add a Comment</label>
            }
            <div className="input-container">
                <textarea id="content" name="content"
                    className={editing ? "edit-input" : "comment-input"}
                    placeholder="Add text..."
                    value={newComment.content}
                    onChange={
                        (e) => {
                            const copy = { ...newComment }
                            copy.content = e.target.value
                            setComment(copy)
                        }
                    }
                >
                </textarea>
            </div>
            <div className="button-container">
                {
                    editing ?
                        <button className="editSubmit" onClick={() => submitComment()}>
                            Save
                        </button>
                        :
                        <button className="commentSubmit" onClick={() => submitComment()}>
                            Submit Comment
                        </button>
                }
                {
                    editing ?
                        <button onClick={() => {
                            history.push(`/posts/single/${newComment.post.id}`)
                        }} className="return-button">
                            Cancel
                        </button>
                        : ""
                }
            </div>
        </div>
    </fieldset>
}