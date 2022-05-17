import { getAllTags, deleteTag } from "./TagManager"
import { EditTag } from "./EditTag"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { NewTagForm } from "./CreateTagForm"


export const AllTags = () => {

    const [tags, setTags] = useState([])
    const history = useHistory()
    const getTags = () => {
        return getAllTags()
                .then((tags => {
                    setTags(tags)
                }))
    }

    useEffect(() => {
        getTags()
    },
        [])


    return <>
        <div>All Tags Page</div>
        <div className="CreateNewTagFormContainer">
            <NewTagForm getTags={getTags} />
        </div>
        {tags.map((tag) => {
            return <div key={`tag--${tag.id}`}>{tag.label} 
            <div>
            <button type='submit'

                    onClick={() => {
                        history.push(`editTag/${tag.id}`)
                    }}



                // onClick={evt => {
                //     EditTag(tag.id)
                // }}
                button className="btn btn-4 btn-sep icon-create">Edit</button> 
            </div>

            <div>
            <button type='submit'
                onClick={evt => {
                    deleteTag(tag.id)
                    .then(getTags)
                }}
                button className="btn btn-4 btn-sep icon-create">Delete</button>
            </div>
            </div>
        })}


    </>
}