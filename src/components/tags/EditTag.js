import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { updateTag, getSingleTag } from "./TagManager"


export const EditTag = (tagId) => {      
    
    // const tagId = useParams()
    
    // const [ tag, updateForm ] = useState({})
    // const [ tagToEdit, setTagToEdit ] = useState([])
            
    const submitTag = (e) => {
        e.preventDefault()
        const updatedTag = {
            label: form.label
        }
        return fetchIt(`${Settings.API}/tags`, "POST", JSON.stringify(updatedTag))
        .then(getTags)
       
    }

    useEffect (
        () => {
            getSingleTag(tagId)
                .then(res => res.json())
                .then((editTagArray) => {
                    setTagToEdit(editTagArray)
                })
            },
                [])          
                
        
                

        
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
                                        updateForm(copy)
                                    }
                                }
                            />
                        </div>
                    </fieldset>
    
    
                    <button onClick={(e) => {
                            submitTag(e)
                            updateForm({label: ""})
                        }} className="submit-button">
                            Save Changes
                        </button>
            </form>
        )
}








                       