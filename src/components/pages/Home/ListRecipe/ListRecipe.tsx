import React from "react";

import Styles from "./list-recipe.module.scss";
import { FAKE_LIST_RECIPE } from "../../../../constants";
import { ItemRecipe } from "./ItemRecipe/ItemRecipe";

export const ListRecipe = () => {
  return (
    <section className={Styles.listRecipe}>
      {Object.keys(FAKE_LIST_RECIPE).map((recipeKey) => (
        <ItemRecipe
          key={recipeKey}
          title={recipeKey}
          ingredients={FAKE_LIST_RECIPE[recipeKey]}
        />
      ))}
    </section>
  );
};
