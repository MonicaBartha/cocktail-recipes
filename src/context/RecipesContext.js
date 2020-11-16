import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecipesContext = createContext();

const RecipesProvider = (props) => {

    const [ recipes, setRecipes ] = useState([]);

    const [ searchRecipe, setSearchRecipe ] = useState({
        ingredient: '',
        category: ''
    })

    const [ request, setRequest ] = useState(false);

    const { ingredient, category } = searchRecipe; 

    useEffect( () => {
        if(request) {
            const getRecipes = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}&c=${category}`;
                
                const result = await axios.get(url);
                // console.log(result.data.drinks);
                setRecipes(result.data.drinks);
            }
            getRecipes();
        }
    }, [searchRecipe])

    return (
        <RecipesContext.Provider
            value={{
                setSearchRecipe,
                setRequest
            }}
        >
            {props.children}
        </RecipesContext.Provider>
    );
}

export default RecipesProvider;
