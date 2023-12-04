import { useState } from "react";

import Styles from "./list-recipe.module.scss";

import { ItemRecipe } from "./ItemRecipe/ItemRecipe";
import { useAppSelector } from "../../../../redux/hook";
import { Search } from "../../../Search/Search";
import {
  MESSAGE_FOUND_RECIPE_LIST_EMPTY,
  MESSAGE_RECIPE_LIST_EMPTY,
} from "../../../../constants";

export const ListRecipe = () => {
  const listRecipes = useAppSelector((state) => state.recipes.listRecipes);
  const [listFoundRecipes, setListFoundRecipes] = useState<Recipe>(listRecipes);

  const isHaveRecipes = Object.keys(listRecipes).length !== 0;
  const isHaveFoundRecipes = Object.keys(listFoundRecipes).length !== 0;

  return (
    <section className={Styles.listRecipe}>
      {isHaveRecipes && (
        <Search
          placeholder="Пошук по рецептам"
          listItems={listRecipes}
          //@ts-ignore, need to solve the problem TS !!!
          setListOfFoundItems={setListFoundRecipes}
        />
      )}
      {isHaveRecipes ? (
        Object.keys(listFoundRecipes).map((recipeKey) => (
          <ItemRecipe
            key={recipeKey}
            title={recipeKey}
            ingredients={listRecipes[recipeKey]}
          />
        ))
      ) : (
        <p>{MESSAGE_RECIPE_LIST_EMPTY}</p>
      )}

      {!isHaveFoundRecipes && isHaveRecipes && (
        <p>{MESSAGE_FOUND_RECIPE_LIST_EMPTY}</p>
      )}
    </section>
  );
};
