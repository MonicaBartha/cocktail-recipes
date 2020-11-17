import React, { useContext, useState } from 'react';
import { CategoryContext } from '../context/CategoryContext';
import { RecipesContext } from '../context/RecipesContext';

const Form = () => {

    const [ search, setSearch ] = useState({
        ingredient: '',
        category: ''
    });

    const {categories} = useContext(CategoryContext);

    const { setSearchRecipe, setRequest } = useContext(RecipesContext);
   
    // function for get data
    const getData = e => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }
    
    return (
        <form 
            className="col-12"
            onSubmit={e => {
                e.preventDefault();
                setSearchRecipe(search) 
                setRequest(true);
            }}
        >
            <fieldset className="text-center">
                <legend>Search recipes by category or ingredients</legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-md-4 mb-2">
                    <input
                        name="ingredient"
                        className="form-control"
                        type="text"
                        placeholder="Ingredient, ex: rum, tequila etc"
                        onChange={getData}
                    />
                </div>
                <div className="col-md-4 mb-2">
                    <select
                        className="form-control"
                        name="category"
                        onChange={getData}
                    >
                        <option value=""> Select Category </option>
                        {categories.map(category => (
                            <option key={category.strCategory}
                                value={category.strCategory}
                            > {category.strCategory} </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Search Cocktail"
                    />
                </div>
            </div>
            
        </form>
    )
}

export default Form;