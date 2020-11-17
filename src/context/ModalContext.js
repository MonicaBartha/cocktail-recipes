import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {
    // provider state: initial is null till the user click See Recipe
    const [ recipeId, setRecipeId ] = useState(null);

    const [ recipeInfo, setRecipeInfo ] = useState({});

    // once we have a recipe, call the API to get recipe description
    useEffect( () => {
        const getRecipe = async () => {
            if(! recipeId) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
            const result = await axios.get(url);
            setRecipeInfo(result.data.drinks[0]);
        }
        getRecipe();
    }, [recipeId]);

    return (
        <ModalContext.Provider
            value={{
                recipeInfo,
                setRecipeId,
                setRecipeInfo
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;
