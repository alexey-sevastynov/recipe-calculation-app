import React from "react";
import Style from "./item-recipe.module.scss";

import { Link } from "react-router-dom";
import { getIconUrl } from "../../../../../helpers/getIconUrl";
import { ListProducts } from "../../../../ListProducts/ListProducts";
import { useAppDispatch } from "../../../../../redux/hook";
import { deleteRecipe } from "../../../../../redux/recipesSlice";

export const ItemRecipe: React.FC<ItemRecipeProps> = ({
  title,
  ingredients,
}) => {
  const dispatch = useAppDispatch();
  const isArrayIngredients = Array.isArray(ingredients);

  return (
    <div className={Style.itemRecipe}>
      <h5>{title}</h5>
      <Link to={"/create-recipe"}>
        <button className={Style.edit}>
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
        {isArrayIngredients ? (
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
