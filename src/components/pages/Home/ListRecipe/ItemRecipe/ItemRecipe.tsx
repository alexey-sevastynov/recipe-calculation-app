import React from "react";
import Style from "./item-recipe.module.scss";
import { Link } from "react-router-dom";
import { getIconUrl } from "../../../../../helpers/getIconUrl";
import { ListProducts } from "../../../../ListProducts/ListProducts";
import { calculateTotalCost } from "../../../../../helpers/calculateTotalCost";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook";

import {
  setIsEditRecipe,
  setRecipeNameToEdit,
} from "../../../../../redux/recipesSlice";
import { convertToCurrency } from "../../../../../helpers/convertToCurrency";
import { BtnSmall } from "../../../../BtnSmall/BtnSmall";
import { COLORS } from "../../../../../constants";

export const ItemRecipe: React.FC<ItemRecipeProps> = ({
  title,
  ingredients,
  onDelete,
}) => {
  const dispatch = useAppDispatch();
  const listProducts = useAppSelector((state) => state.products.listProducts);
  const listDescripeRecipes = useAppSelector(
    (state) => state.recipes.listDescripeRecipes
  );
  const isEditRecipe = useAppSelector((state) => state.recipes.isEditRecipe);

  const description = listDescripeRecipes.find(
    (item) => item.keyTitleRecipe === title
  )?.describe;

  const isArrayIngredients = Array.isArray(ingredients);
  const isIngredientsValid = ingredients && typeof ingredients === "object";

  const editRecipe = () => {
    dispatch(setIsEditRecipe(true));
    dispatch(setRecipeNameToEdit(title));
  };

  const totalCost =
    ingredients && listProducts
      ? calculateTotalCost(ingredients, listProducts, isArrayIngredients)
      : 0;

  const showWarning = () => {
    const allRecipeProducts = isIngredientsValid
      ? Object.values(ingredients).flat()
      : [];

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

      <Link to={"/create-recipe"} className={Style.edit}>
        <BtnSmall onClick={editRecipe}>
          <img src={getIconUrl("edit.svg")} alt="edit" />
        </BtnSmall>
      </Link>

      <div className={Style.delete}>
        <BtnSmall
          onClick={() => onDelete(title)}
          style={{ backgroundColor: COLORS.red }}
        >
          <img src={getIconUrl("delete.svg")} alt="delete" />
        </BtnSmall>
      </div>

      <div className={Style.description}>
        <p>Опис: {description}</p>
      </div>

      <div className={Style.ingredientsTilte}>
        <p>інгредієнти</p>

        <span style={{ borderBottom: "1px solid grey" }} />
      </div>

      <div className={Style.ingredients}>
        {isEditRecipe ? (
          isArrayIngredients ? (
            <ListProducts listItems={ingredients} noButtons />
          ) : (
            isIngredientsValid &&
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
          isIngredientsValid &&
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
