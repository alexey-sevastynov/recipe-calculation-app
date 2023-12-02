import React from "react";
import S from "./header.module.scss";

import { Link } from "react-router-dom";
import { Btn } from "../Btn/Btn";
import { useAppDispatch } from "../../redux/hook";
import { setIsEditRecipe, setRecipeNameToEdit } from "../../redux/recipesSlice";

export const Header = () => {
  const dispatch = useAppDispatch();

  const createRecipe = () => {
    dispatch(setIsEditRecipe(false));
    dispatch(setRecipeNameToEdit(""));
  };
  return (
    <div className={S.header}>
      <div className="container">
        <div className={S.headerWrapper}>
          <Link to={"/create-recipe"}>
            <Btn onClick={createRecipe}>add Recipe</Btn>
          </Link>
        </div>
      </div>
    </div>
  );
};
