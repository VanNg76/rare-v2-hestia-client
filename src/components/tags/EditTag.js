import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchIt } from "../utils/Fetch"
import { updateTag, getSingleTag } from "./TagManager"
import { AllTags } from "./AllTags"


export const EditTag = () => {      
    const tagId = useParams()
    
    const [ tag, updateTag ] = useState({})
    const [ tagToEdit, setTagToEdit ] = useState({})
      
    useEffect (
        () => {
            getSingleTag(tagId)
                .then(res => res.json())
                .then((editTagArray) => {
                    setTagToEdit(editTagArray)
                })
            },
                [])          
    
        // FN to handle POST action for newly built tag object
        
    const submitTag = (evt) => {
        evt.preventDefault()
        const updatedTag = {
            id: tagToEdit.id,
            label: tag.label
        }
        updateTag(updatedTag)
        .then(AllTags)
       
    }    
        
        
        return (
            <form className="tagForm">
                <h2 className="tagForm__description">Update the Tag</h2>
                    <fieldset>
                        <div className="form-group" key={`tag--${tag.id}`}>{tag.label}
                        
                            <label htmlFor="label">New Tag: </label>
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
    
    
                    <button onClick={(evt) => {
                            submitTag()
                            updateTag(evt)
                            updateTag({label: ""})
                        }} className="submit-button">
                            Save Changes
                        </button>
            </form>
        )
}








                       