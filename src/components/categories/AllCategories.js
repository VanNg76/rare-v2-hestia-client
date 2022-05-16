// imports
// import getAllCategories from /.CategoryManager
import { getAllCategories } from "./CategoryManager";
import React, { useEffect, useState } from "react";
import { NewCategoryForm } from "./CreateCategoryForm";
import { ButtonControls } from "../buttonControls/ButtonControls";

// import React, useEffect, useState

// declare and export function AllCategories which get all category objects

export const AllCategories = () => {
    // use UseState to set the state for the categories array for
    // when the state changes.
    const [categories, setCategories] = useState([])

    // use UseEffect to getAllCategories and set the state of the category array.
    useEffect(() => {
        getCategories()
    },
        [])

    const getCategories = () => {
        getAllCategories()
            .then((categories) => {
                setCategories(categories)
            })


    }

    // return a map through the categories array that will have
    // edit and delete buttons
    return <>
        <div>AllCategories Page</div>
        <div className="CreateNewCategoryFormContainer">
            <NewCategoryForm getCategories={getCategories} />
        </div>
        {categories.map((category) => {
            return <div key={`category--${category.id}`}>{category.label}
                <div className="cardButtons">
                    <ButtonControls isPost={false} isCategory={true} categoryId={category.id} getCategories={getCategories} />
                </div>
            </div>
        })}


    </>
}

