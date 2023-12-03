import { useState } from "react";

import Styles from "./list-recipe.module.scss";

import { ItemRecipe } from "./ItemRecipe/ItemRecipe";
import { useAppSelector } from "../../../../redux/hook";
import { Search } from "../../../Search/Search";

export const ListRecipe = () => {
  const listRecipes = useAppSelector((state) => state.recipes.listRecipes);
  const [listFoundRecipes, setListFoundRecipes] = useState<Recipe>(listRecipes);

  return (
    <section className={Styles.listRecipe}>
      <Search
        placeholder="Пошук по рецептам"
        listItems={listRecipes}
        setListOfFoundItems={setListFoundRecipes}
      />
      {Object.keys(listFoundRecipes).map((recipeKey) => (
        <ItemRecipe
          key={recipeKey}
          title={recipeKey}
          ingredients={listRecipes[recipeKey]}
        />
      ))}
    </section>
  );
};
