import { Settings } from "../utils/Settings"
import { deleteComment } from "../comments/CommentManager"
import { deletePost } from "../posts/PostManager"
import { deleteCategory } from "../categories/CategoryManager"
import { useHistory } from "react-router-dom"
import "./ButtonControls.css"

export const ButtonControls = ({ isPost, isCategory, isComment, isUser, postId, commentId, categoryId, user, getComments, getCategories, deactivate, reactivate }) => {
  const history = useHistory()

  return <div>
    <dialog id={isPost ? `anything-${postId}` : isCategory ? `anything-${categoryId}` : isComment ? `anything-${commentId}` : `anything-${user.id}`}>
      {
        isPost
          ? <div>Are you sure you want to delete this post?</div>
          :
          isCategory
            ? <div>Are you sure you want to delete this category?</div>
            :
            isComment
              ? <div>Are you sure you want to delete this comment?</div>
              : user.active
                ? <div>Are you sure you want to deactivate this user?</div>
                : <div>Are you sure you want to reactivate this user?</div>
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
              else if (isComment) {
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
              else {
                if (user.active) {
                  deactivate()
                }
                else {
                  reactivate()
                }
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
              } else if (isComment) {
                const buttonTarget = document.querySelector(`#anything-${commentId}`)
                buttonTarget.close()
              } else {
                const buttonTarget = document.querySelector(`#anything-${user.id}`)
                buttonTarget.close()
              }
            }
          }
        >Cancel
        </button>
      </div>

    </dialog>
    {!isUser ?
      <button
        className="category_edit"
        onClick={() => {
          if (isPost) {
            history.push(`/editPost/${postId}`)
          } else if (isCategory) {
            history.push(`/editCategory/${categoryId}`)
          } else if (isComment) {
            history.push(`/editComment/${commentId}`)
          }
        }}>
        {isCategory ?
          <div>Edit</div>
          :
          <img className="editIcon" src={`${Settings.EditIcon}`} width="25px" height="25px" />
        }
      </button>
      : ""
    }
    {!isUser ?
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
          } else if (isComment) {
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
      : ""
    }
    {isUser ?
      user.active ?
        <button
          className="deactivate"
          onClick={() => {
            const buttonTarget = document.querySelector(`#anything-${user.id}`)
            buttonTarget.showModal()
          }}>
          Deactivate
        </button>
        :
        <button
          className="reactivate"
          onClick={() => {
            const buttonTarget = document.querySelector(`#anything-${user.id}`)
            buttonTarget.showModal()
          }}>
          Reactivate
        </button>
      : ""
    }
  </div >
}

