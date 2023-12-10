import S from "./header.module.scss";

import { Link } from "react-router-dom";
import { Btn } from "../Btn/Btn";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setIsEditRecipe, setRecipeNameToEdit } from "../../redux/recipesSlice";

export const Header = () => {
  const dispatch = useAppDispatch();
  const listProducts = useAppSelector((state) => state.products.listProducts);

  const isNotEmptyList = listProducts.length !== 0;

  const createRecipe = () => {
    dispatch(setIsEditRecipe(false));
    dispatch(setRecipeNameToEdit(""));
  };
  return (
    <div className={S.header}>
      <div className="container">
        <div className={S.headerWrapper}>
          {isNotEmptyList ? (
            <Link to={"/create-recipe"}>
              <Btn onClick={createRecipe}>add Recipe</Btn>
            </Link>
          ) : (
            <p>Тут зявиться Button, додай продукт</p>
          )}
        </div>
      </div>
    </div>
  );
};
