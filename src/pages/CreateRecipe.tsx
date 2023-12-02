import React, { useEffect, useState } from "react";
import "../styles/pages/create-recipe/CreateRecipe.scss";

import { ListProducts } from "../components/ListProducts/ListProducts";
import { Btn } from "../components/Btn/Btn";
import { Link } from "react-router-dom";
import { AddRecipeForm } from "../components/pages/CreateRecipe/AddRecipeForm/AddRecipeForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputsAddRecipesForm } from "../types/InputsAddRecipeForm";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { addRecipe, editRecipe } from "../redux/recipesSlice";
import { editProduct } from "../redux/productsSlice";

export const CreateRecipe = () => {
  const dispatch = useAppDispatch();
  const listRecipes = useAppSelector((state) => state.recipes.listRecipes);
  const isEditRecipe = useAppSelector((state) => state.recipes.isEditRecipe);
  const recipeNameToEdit = useAppSelector(
    (state) => state.recipes.recipeNameToEdit
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<InputsAddRecipesForm>();

  const [ingredients, setIngredients] = useState<
    RecipeWithSteps | TypeItemRecipe[] | null
  >(null);

  const onSubmit: SubmitHandler<InputsAddRecipesForm> = ({ nameRecipe }) => {
    console.log("onSubmit", nameRecipe, ingredients);
    if (ingredients && nameRecipe) {
      if (!isEditRecipe) {
        console.log("onSubmited");

        dispatch(addRecipe({ nameRecipe, value: ingredients }));
      } else {
        console.log("onSubmited edited");
        dispatch(editRecipe({ nameRecipe, value: ingredients }));
      }
    }
  };

  const isArrayIngredients = Array.isArray(ingredients);

  useEffect(() => {
    if (isEditRecipe) {
      setValue("nameRecipe", recipeNameToEdit);
      setIngredients(listRecipes[recipeNameToEdit]);
    }
  }, [getValues("nameRecipe")]);

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
            <ListProducts
              listItems={ingredients}
              setIngredients={setIngredients}
              nameRecipe={getValues("nameRecipe")}
            />
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
                <ListProducts
                  listItems={ingredients[recipeStep]}
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                  nameRecipe={getValues("nameRecipe")}
                />
              </div>
            ))
          ))}

        <div className="add-products__btns">
          {isEditRecipe ? (
            <Btn type="submit">Edit</Btn>
          ) : (
            <Btn type="submit">Publish</Btn>
          )}

          <Link to="/">
            <Btn>Cancel</Btn>
          </Link>
        </div>
      </form>
    </div>
  );
};
