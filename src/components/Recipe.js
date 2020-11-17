import React, {useContext, useState} from 'react';
import {ModalContext} from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Recipe = ({recipe}) => {

    // Material-UI Modal configuration
    const [ modalStyle ] = useState(getModalStyle);
    // when modal have to show or not
    const [ openModal, setOpenModal ] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpenModal(true);
    }
    const handleClose = () => {
        setOpenModal(false);
    }
    // extract values from context
    const { recipeInfo, setRecipeId, setRecipeInfo } = useContext(ModalContext);

    // show ingredients in Modal
    const showIngredients = info => {
        let ingredients = [];
        for (let i=1; i< 16; i++) {
            if(info[`strIngredient${i}`]) {
                ingredients.push(
                    <li> {info[`strIngredient${i}`]} {info[`strMeasure${i}`]} </li>
                )
            }
        }
        return ingredients;
    }
    
    return (
       <div className="col-md-4 mb-3">
           <div className="card">
               <img className="card-img-top" src={recipe.strDrinkThumb}
                    alt={`Drink ${recipe.strDrink}`} />
                <h2 className="card-header"> {recipe.strDrink} </h2>
                <div className="card-body">
                   <button
                    type="button"
                    className="btn btn-block btn-primary"
                    onClick={ () => {
                        setRecipeId(recipe.idDrink);
                        handleOpen()
                    }}
                   >See Recipe</button>

                   <Modal
                        open={openModal}
                        onClose={ () => {
                            setRecipeId(null);
                            setRecipeInfo({});
                            handleClose();
                        }}
                   >
                       <div style={modalStyle} className={classes.paper}>
                           <h2> {recipeInfo.strDrink} </h2>
                           <h3 className="mt-4">Instructions</h3>
                           <p> {recipeInfo.strInstructions} </p>
                           <img className="img-fluid" src={recipeInfo.strDrinkThumb} alt={recipeInfo.strDrink} />
                           <h3>Igredients and quantities</h3>
                           <ul>
                               {showIngredients(recipeInfo)}
                           </ul>
                       </div>
                   </Modal>
               </div>
           </div>
       </div>
    )
}

export default Recipe;
