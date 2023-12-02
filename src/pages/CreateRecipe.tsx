import React, { useEffect, useState } from "react";
import "../styles/pages/create-recipe/CreateRecipe.scss";
import { FAKE_LIST } from "../constants";
import { ListProducts } from "../components/ListProducts/ListProducts";
import { Btn } from "../components/Btn/Btn";
import { Link } from "react-router-dom";
import { AddRecipeForm } from "../components/pages/CreateRecipe/AddRecipeForm/AddRecipeForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputsAddRecipesForm } from "../types/InputsAddRecipeForm";
import { useAppDispatch } from "../redux/hook";
import { addRecipe } from "../redux/recipesSlice";

export const CreateRecipe = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsAddRecipesForm>();

  const [ingredients, setIngredients] = useState<
    RecipeWithSteps | TypeItemRecipe[] | null
  >(null);

  const onSubmit: SubmitHandler<InputsAddRecipesForm> = ({ nameRecipe }) => {
    console.log(nameRecipe, ingredients);
    if (ingredients && nameRecipe) {
      dispatch(addRecipe({ nameRecipe, value: ingredients }));
    }
  };

  const isArrayIngredients = Array.isArray(ingredients);

  return (
    <div className="container">
      <form className="create-recipe" onSubmit={handleSubmit(onSubmit)}>
        <h3>Створити рецепт:</h3>

        <AddRecipeForm
          register={register}
          setIngredients={setIngredients}
          ingredients={ingredients}
        />
        {ingredients &&
          (isArrayIngredients ? (
            <ListProducts listItems={ingredients} />
          ) : (
            Object.keys(ingredients).map((recipeStep) => (
              <div key={recipeStep}>
                <b>{recipeStep}</b>

                <button type="button" className="btn">
                  edit name step
                </button>
                <button type="button" className="btn">
                  remove step
                </button>
                <ListProducts listItems={ingredients[recipeStep]} />
              </div>
            ))
          ))}

        <div className="add-products__btns">
          <Btn type="submit">Publish</Btn>
          <Link to="/">
            <Btn>Cancel</Btn>
          </Link>
        </div>
      </form>
    </div>
  );
};
