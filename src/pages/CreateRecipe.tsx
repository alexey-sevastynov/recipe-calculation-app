import { useEffect, useState } from "react";
import "../styles/pages/create-recipe/CreateRecipe.scss";

import { ListProducts } from "../components/ListProducts/ListProducts";
import { Btn } from "../components/Btn/Btn";
import { Link } from "react-router-dom";
import { AddRecipeForm } from "../components/pages/CreateRecipe/AddRecipeForm/AddRecipeForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputsAddRecipesForm } from "../types/InputsAddRecipeForm";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { addRecipe, editRecipe } from "../redux/recipesSlice";

export const CreateRecipe = () => {
  const dispatch = useAppDispatch();

  const listRecipes = useAppSelector((state) => state.recipes.listRecipes);
  const listDescripeRecipes = useAppSelector(
    (state) => state.recipes.listDescripeRecipes
  );
  const isEditRecipe = useAppSelector((state) => state.recipes.isEditRecipe);
  const recipeNameToEdit = useAppSelector(
    (state) => state.recipes.recipeNameToEdit
  );

  const [focusInputStepName, setFocusInputStepName] = useState(false);
  const [isEditStepName, setIsEditStepName] = useState(false);
  const [stepName, setStepName] = useState<string>("");
  const [selectedStep, setSelectedStep] = useState<string>("");

  const description = listDescripeRecipes.find(
    (item) => item.keyTitleRecipe === recipeNameToEdit
  )?.describe;

  const { register, handleSubmit, setValue, getValues } =
    useForm<InputsAddRecipesForm>();

  const [ingredients, setIngredients] = useState<
    RecipeWithSteps | TypeItemRecipe[] | null
  >(null);

  const onSubmit: SubmitHandler<InputsAddRecipesForm> = ({
    nameRecipe,
    descriptionRecipe,
  }) => {
    console.log("onSubmit", nameRecipe, ingredients);
    if (ingredients && nameRecipe) {
      if (!isEditRecipe) {
        console.log("onSubmited");

        dispatch(
          addRecipe({
            nameRecipe,
            value: ingredients,
            describe: descriptionRecipe,
          })
        );
      } else {
        console.log("onSubmited edited");
        dispatch(
          editRecipe({
            nameRecipe,
            value: ingredients,
            describe: descriptionRecipe,
          })
        );
      }
    }
  };

  const isArrayIngredients = Array.isArray(ingredients);

  const deleteStep = (nameStep: string) => {
    if (ingredients && !isArrayIngredients) {
      const newIngredients = { ...ingredients };
      delete newIngredients[nameStep];
      setIngredients(newIngredients);
    }
  };
  const editStep = (nameStep: string) => {
    if (ingredients && !isArrayIngredients) {
      setStepName(nameStep);
      setSelectedStep(nameStep);
      setIsEditStepName(true);
      setFocusInputStepName(true);
    }
  };

  useEffect(() => {
    if (isEditRecipe) {
      setValue("nameRecipe", recipeNameToEdit);
      setValue("descriptionRecipe", description || "");
      //@ts-ignore
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
          focusInputStepName={focusInputStepName}
          setFocusInputStepName={setFocusInputStepName}
          stepName={stepName}
          setStepName={setStepName}
          isEditStepName={isEditStepName}
          setIsEditStepName={setIsEditStepName}
          selectedStep={selectedStep}
          setSelectedStep={setSelectedStep}
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

                <button
                  type="button"
                  className="btn"
                  onClick={() => editStep(recipeStep)}
                >
                  edit name step
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => deleteStep(recipeStep)}
                >
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
