// data flows from this file
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// creating the Context. Context needs a provider
export const CategoryContext = createContext();

// in Provider is found the functions and states
const CategoryProvider = (props) => {
   // Context State
   const [ categories, setCategories ] = useState([]);

   // executes API call 
    useEffect(() => {
        const getCategories = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
            const result = await axios.get(url);
            setCategories( result.data.drinks);
        }
        getCategories();
    }, []);

    return (
        <CategoryContext.Provider
            value={
            {categories}
            }
        >
            {props.children}
        </CategoryContext.Provider>
    )
}
export default CategoryProvider;