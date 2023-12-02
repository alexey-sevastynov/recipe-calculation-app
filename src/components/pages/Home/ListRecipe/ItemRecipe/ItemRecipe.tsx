import React from "react";
import Style from "./item-recipe.module.scss";

import { Link } from "react-router-dom";
import { getIconUrl } from "../../../../../helpers/getIconUrl";
import { ListProducts } from "../../../../ListProducts/ListProducts";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook";
import {
  deleteRecipe,
  setIsEditRecipe,
  setRecipeNameToEdit,
} from "../../../../../redux/recipesSlice";

export const ItemRecipe: React.FC<ItemRecipeProps> = ({
  title,
  ingredients,
}) => {
  const dispatch = useAppDispatch();

  const isEditRecipe = useAppSelector((state) => state.recipes.isEditRecipe);

  const isArrayIngredients = Array.isArray(ingredients);

  const editRecipe = () => {
    dispatch(setIsEditRecipe(true));
    dispatch(setRecipeNameToEdit(title));
  };

  return (
    <div className={Style.itemRecipe}>
      <h5>{title}</h5>
      <Link to={"/create-recipe"}>
        <button className={Style.edit} onClick={editRecipe}>
          <img src={getIconUrl("edit.svg")} alt="edit" />
        </button>
      </Link>

      <button
        className={Style.delete}
        onClick={() => dispatch(deleteRecipe(title))}
      >
        <img src={getIconUrl("delete.svg")} alt="delete" />
      </button>

      <div className={Style.ingredientsTilte}>
        <p>інгредієнти</p>
        <span style={{ borderBottom: "1px solid grey" }} />
      </div>

      <div className={Style.ingredients}>
        {isEditRecipe ? (
          isArrayIngredients ? (
            <ListProducts listItems={ingredients} noButtons />
          ) : (
            Object.keys(ingredients)
              .sort()
              .map((recipeStep) => (
                <div key={recipeStep}>
                  <b>{recipeStep}</b>
                  <ListProducts listItems={ingredients[recipeStep]} noButtons />
                </div>
              ))
          )
        ) : isArrayIngredients ? (
          <ListProducts listItems={ingredients} noButtons />
        ) : (
          Object.keys(ingredients)
            .sort()
            .map((recipeStep) => (
              <div key={recipeStep}>
                <b>{recipeStep}</b>
                <ListProducts listItems={ingredients[recipeStep]} noButtons />
              </div>
            ))
        )}
      </div>

      <footer>
        <p>#macarons</p>
      </footer>
    </div>
  );
};
