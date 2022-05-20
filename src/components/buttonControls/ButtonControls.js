import { Settings } from "../utils/Settings"
import { deleteComment } from "../comments/CommentManager"
import { deletePost } from "../posts/PostManager"
import { deleteCategory } from "../categories/CategoryManager"
import { useHistory } from "react-router-dom"
import "./ButtonControls.css"

export const ButtonControls = ({ isPost, isCategory, isComment, isUser, adminEdit, postId, commentId, categoryId, user, removeComment, getCategories, deactivate, reactivate, removeAdmin, addAdmin }) => {
  const history = useHistory()

  return <div>
    <dialog id={isPost ? `anything-${postId}` : isCategory ? `anything-${categoryId}` : isComment ? `anything-${commentId}` : adminEdit ? `anything-${user.user.username}` : `anything-${user.id}`}>
      {
        isPost
          ? <div>Are you sure you want to delete this post?</div>
          :
          isCategory
            ? <div>Are you sure you want to delete this category?</div>
            :
            isComment
              ? <div>Are you sure you want to delete this comment?</div>
              :
              isUser
                ?
                adminEdit
                  ? user.is_admin
                    ? <div>Are you sure you want to remove admin privileges from this user?</div>
                    : <div>Are you sure you want to give admin privileges to this user?</div>
                  :
                  user.active
                    ? <div>Are you sure you want to deactivate this user?</div>
                    : <div>Are you sure you want to reactivate this user?</div>
                : null
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
                removeComment(commentId)
                const buttonTarget = document.querySelector(`#anything-${commentId}`)
                buttonTarget.close()
              }
              else if (adminEdit) {
                if (user.is_admin) {
                  if (user.admin_count > 1) {
                    removeAdmin()
                    const buttonTarget = document.querySelector(`#anything-${user.user.username}`)
                    buttonTarget.close()
                  }
                  else {
                    alert("You must pass admin privileges to another user before removing the last admin")
                  }
                }
                else {
                  addAdmin()
                  const buttonTarget = document.querySelector(`#anything-${user.user.username}`)
                  buttonTarget.close()
                }
              }
              else if (isUser && !adminEdit) {
                if (user.active) {
                  deactivate()
                  const buttonTarget = document.querySelector(`#anything-${user.id}`)
                  buttonTarget.close()
                }
                else {
                  reactivate()
                  const buttonTarget = document.querySelector(`#anything-${user.id}`)
                  buttonTarget.close()
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
              } else if (adminEdit) {
                const buttonTarget = document.querySelector(`#anything-${user.user.username}`)
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
        {!isUser ?
          isCategory ?
            <div>Edit</div>
            :
            <img className="editIcon" src={`${Settings.EditIcon}`} width="25px" height="25px" />
          : ""}
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
        {!isUser ?
          isCategory ?
            <div>Delete</div>
            :
            <img className="deleteIcon" src={`${Settings.DeleteIcon}`} width="25px" height="25px" />
          : ""}
      </button>
      : ""
    }
    {isUser ?
      adminEdit ?
        user.is_admin ?
          <div>
            <button
              className="demote"
              onClick={() => {
                const buttonTarget = document.querySelector(`#anything-${user.user.username}`)
                buttonTarget.showModal()
              }}>
              Demote
            </button>
            <h2>Admins approved: {user.admin_approval}</h2>
          </div>
          :
          <button
            className="promote"
            onClick={() => {
              const buttonTarget = document.querySelector(`#anything-${user.user.username}`)
              buttonTarget.showModal()
            }}>
            Promote
          </button>
        :
        user.active ?
          <div>
            <button
              className="deactivate"
              onClick={() => {
                const buttonTarget = document.querySelector(`#anything-${user.id}`)
                buttonTarget.showModal()
              }}>
              Deactivate
            </button>
            <h2>Admins approved: {user.admin_approval}</h2>
          </div>
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

