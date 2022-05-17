import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { fetchIt } from "../utils/Fetch"
import { updateTag, getSingleTag } from "./TagManager"


export const EditTag = () => {      
    const history = useHistory()
    const id = useParams()
    
    const [ tag, updateTag ] = useState({})
    const [ tagToEdit, setTagToEdit ] = useState([])
      
    useEffect (
        () => {
            getSingleTag(id)
                .then(res => res.json())
                .then((editTagArray) => {
                    setTagToEdit(editTagArray)
                })
            },
                [])          
    

        // // object builder
        // const editTagObject = {
        //     label: tag.label
        // }


        // FN to hand the POST action for the newly built tag object
        
    const submitTag = (e) => {
        e.preventDefault()
        const updatedTag = {
            label: form.label
        }
        return fetchIt(`${Settings.API}/tags`, "POST", JSON.stringify(updatedTag))
        .then(getTags)
       
    }    
        
        
        return (
            <form className="tagForm">
                <h2 className="tagForm__description">Update the Tag</h2>
                    <fieldset>
                        <div className="form-group" key={`tag--${tag.id}`}>{tag.label}
                        
                            <label htmlFor="label">label: </label>
                            <input type="text" name="label" 
                                    required autoFocus className="form-control" 
                                    placeholder={tagToEdit.label}
                                    value={tag.label}
                                onChange={
                                    (evt) => {
                                        const copy = {...tag}
                                        copy.label = evt.target.value
                                        updateTag(copy)
                                    }
                                }
                            />
                        </div>
                    </fieldset>
    
    
                    <button onClick={(e) => {
                            submitTag(e)
                            updateTag({label: ""})
                        }} className="submit-button">
                            Save Changes
                        </button>
            </form>
        )
}








                       