import React from "react";

import Styles from "./list-recipe.module.scss";
import { FAKE_LIST_RECIPE } from "../../../../constants";
import { ItemRecipe } from "./ItemRecipe/ItemRecipe";
import { useAppSelector } from "../../../../redux/hook";

export const ListRecipe = () => {
  const listRecipes = useAppSelector((state) => state.recipes.listRecipes);
  return (
    <section className={Styles.listRecipe}>
      {Object.keys(listRecipes).map((recipeKey) => (
        <ItemRecipe
          key={recipeKey}
          title={recipeKey}
          ingredients={listRecipes[recipeKey]}
        />
      ))}
    </section>
  );
};
