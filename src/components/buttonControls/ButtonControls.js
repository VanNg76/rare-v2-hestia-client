import { Settings } from "../utils/Settings"
import { deleteComment } from "../comments/CommentManager"
import { deletePost } from "../posts/PostManager"
import { deleteCategory } from "../categories/CategoryManager"
import { useHistory } from "react-router-dom"
import "./ButtonControls.css"

export const ButtonControls = ({ isPost, isCategory, postId, commentId, categoryId, getComments, getCategories }) => {
  const history = useHistory()

  return <div>
    <dialog id={isPost ? `anything-${postId}` : isCategory ? `anything-${categoryId}` : `anything-${commentId}`}>
      {
        isPost
          ? <div>Are you sure you want to delete this post?</div>
          :
          isCategory
            ? <div>Are you sure you want to delete this category?</div>
            : <div>Are you sure you want to delete this comment?</div>
      }

      <div>
        <button
          onClick={
            (e) => {
              e.preventDefault()
              if (isPost) {
                deletePost(postId)
                  .then(
                    () => {
                      history.push("/")
                    })
              }
              else if (isCategory) {
                console.log(categoryId)
                deleteCategory(categoryId)
                  .then(
                    () => {
                      getCategories()
                    }
                  )
                  .then(
                    () => {
                      const buttonTarget = document.querySelector(`#anything-${categoryId}`)
                      buttonTarget.close()
                    }
                  )
              }
              else {
                deleteComment(commentId)
                  .then(
                    () => {
                      getComments(postId)
                    }
                  )
                  .then(
                    () => {
                      const buttonTarget = document.querySelector(`#anything-${commentId}`)
                      buttonTarget.close()
                    }
                  )
              }
            }
          }
        >Okay</button>
        <button
          onClick={
            (e) => {
              e.preventDefault()
              if (isPost) {
                const buttonTarget = document.querySelector(`#anything-${postId}`)
                buttonTarget.close()
                } else if (isCategory) {
                const buttonTarget = document.querySelector(`#anything-${categoryId}`)
                buttonTarget.close()
                } else {
                 const buttonTarget = document.querySelector(`#anything-${commentId}`)
                 buttonTarget.close()
                }
            }
          }
        >Cancel
        </button>
      </div>

    </dialog>
    <button
    className="category_edit"
    onClick={() => {
      if (isPost) {
        history.push(`/editPost/${postId}`)
      } else if (isCategory) {
        history.push(`/editCategory/${categoryId}`)
      } else {
        window.alert("Cannot edit comments")
      }
    }}>
      {isCategory ?
        <div>Edit</div>
        :
        <img className="editIcon" src={`${Settings.EditIcon}`} width="25px" height="25px" />
      }
    </button>
    <button
    className="category_delete"
    onClick={() => {
      console.log(categoryId)
      if (isPost) {
      const buttonTarget = document.querySelector(`#anything-${postId}`)
      buttonTarget.showModal()
      } else if (isCategory) {
      const buttonTarget = document.querySelector(`#anything-${categoryId}`)
      buttonTarget.showModal()
      } else {
       const buttonTarget = document.querySelector(`#anything-${commentId}`)
       buttonTarget.showModal()
      }
    }}>
      {isCategory ?
        <div>Delete</div>
        :
        <img className="deleteIcon" src={`${Settings.DeleteIcon}`} width="25px" height="25px" />
      }
    </button>
  </div >
}

