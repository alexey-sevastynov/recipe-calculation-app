import { useEffect, useState } from "react";

import Styles from "./list-recipe.module.scss";

import { ItemRecipe } from "./ItemRecipe/ItemRecipe";
import { useAppSelector } from "../../../../redux/hook";
import { Search } from "../../../Search/Search";
import {
  MESSAGE_FOUND_RECIPE_LIST_EMPTY,
  MESSAGE_RECIPE_LIST_EMPTY,
} from "../../../../constants";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../../../../redux/recipesSlice";
import { InfoText } from "../../../InfoText/InfoText";

export const ListRecipe = () => {
  const dispatch = useDispatch();
  const listRecipes = useAppSelector((state) => state.recipes.listRecipes);
  const [listFoundRecipes, setListFoundRecipes] = useState<Recipe>(listRecipes);

  const isHaveRecipes = Object.keys(listRecipes).length !== 0;
  const isHaveFoundRecipes = Object.keys(listFoundRecipes).length !== 0;

  useEffect(() => {
    setListFoundRecipes(listFoundRecipes);
  }, [listRecipes]);

  const handleRecipeDeletion = (recipeTitle: string) => {
    // Delete recipe
    dispatch(deleteRecipe(recipeTitle));

    // update list recipes after delete
    const updatedRecipes = { ...listFoundRecipes };
    delete updatedRecipes[recipeTitle];
    setListFoundRecipes(updatedRecipes);
  };

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
            onDelete={handleRecipeDeletion}
          />
        ))
      ) : (
        <InfoText textMessage={MESSAGE_RECIPE_LIST_EMPTY} />
      )}

      {!isHaveFoundRecipes && isHaveRecipes && (
        <InfoText
          textMessage={MESSAGE_FOUND_RECIPE_LIST_EMPTY}
          imageName="fail.svg"
        />
      )}
    </section>
  );
};
