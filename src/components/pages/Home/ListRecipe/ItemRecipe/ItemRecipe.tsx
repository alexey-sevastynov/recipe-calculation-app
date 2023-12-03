import React from "react";
import Style from "./item-recipe.module.scss";
import { Link } from "react-router-dom";
import { getIconUrl } from "../../../../../helpers/getIconUrl";
import { ListProducts } from "../../../../ListProducts/ListProducts";
import { calculateTotalCost } from "../../../../../helpers/calculateTotalCost";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook";

import {
  deleteRecipe,
  setIsEditRecipe,
  setRecipeNameToEdit,
} from "../../../../../redux/recipesSlice";
import { convertToCurrency } from "../../../../../helpers/convertToCurrency";

export const ItemRecipe: React.FC<ItemRecipeProps> = ({
  title,
  ingredients,
}) => {
  const dispatch = useAppDispatch();
  const listProducts = useAppSelector((state) => state.products.listProducts);
  const isEditRecipe = useAppSelector((state) => state.recipes.isEditRecipe);
  const isArrayIngredients = Array.isArray(ingredients);

  const editRecipe = () => {
    dispatch(setIsEditRecipe(true));
    dispatch(setRecipeNameToEdit(title));
  };

  const totalCost = calculateTotalCost(
    ingredients,
    listProducts,
    isArrayIngredients
  );

  const showWarning = () => {
    const allRecipeProducts = Object.values(ingredients).flat();

    const missingProducts: TypeItemRecipe[] = allRecipeProducts.filter(
      (recipeProduct) =>
        !listProducts.some(
          (product) =>
            product.productName.toLowerCase() ===
            recipeProduct.productName.toLowerCase()
        )
    );
    const message = (
      <div className={Style.warning}>
        <p>
          Цих продуктів немає в твоєму списку "ЦІНА ТОВАРУ В МАГАЗИНІ:", тому
          розрахунок невірний. Додай ці товари до свого списку!
        </p>
        <ul>
          {missingProducts.map((item, id) => (
            <li key={id}>{item.productName} (ціна невідома)</li>
          ))}
        </ul>
      </div>
    );

    return missingProducts.length === 0 ? false : message;
  };

  return (
    <div className={Style.itemRecipe}>
      <h5>{title}</h5>
      {showWarning()}
      <Link to={"/create-recipe"}>
        <button className={Style.edit} onClick={editRecipe}>
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
        {isEditRecipe ? (
          isArrayIngredients ? (
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
          )
        ) : isArrayIngredients ? (
          <ListProducts listItems={ingredients} noButtons />
        ) : (
          Object.keys(ingredients).map((recipeStep) => (
            <div key={recipeStep}>
              <b>{recipeStep}</b>
              <ListProducts listItems={ingredients[recipeStep]} noButtons />
            </div>
          ))
        )}
      </div>

      <footer>
        <p>#macarons</p>

        <p style={{ textDecoration: !showWarning() ? "none" : "line-through" }}>
          {convertToCurrency(totalCost)}
        </p>
      </footer>
    </div>
  );
};
