import React from "react";
import "../styles/pages/create-recipe/CreateRecipe.scss";
import { FAKE_LIST, FAKE_LIST_RECIPE } from "../constants";
import { ListProducts } from "../components/ListProducts/ListProducts";
import { Btn } from "../components/Btn/Btn";
import { Link } from "react-router-dom";
import { AddRecipeForm } from "../components/pages/CreateRecipe/AddRecipeForm/AddRecipeForm";

export const CreateRecipe = () => {
  const isArrayIngredients = Array.isArray(FAKE_LIST);
  return (
    <div className="container">
      <div className="create-recipe">
        <h3>Створити рецепт:</h3>

        <AddRecipeForm />
        {isArrayIngredients ? (
          <ListProducts listItems={FAKE_LIST} />
        ) : (
          Object.keys(FAKE_LIST).map((recipeStep) => (
            <div key={recipeStep}>
              <b>{recipeStep}</b>
              <ListProducts listItems={FAKE_LIST[recipeStep]} />
            </div>
          ))
        )}

        <div className="add-products__btns">
          <Btn>Publish</Btn>
          <Link to="/">
            <Btn>Cancel</Btn>
          </Link>
        </div>
      </div>
    </div>
  );
};
