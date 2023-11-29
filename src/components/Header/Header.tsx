import React from "react";
import S from "./header.module.scss";

import { Link } from "react-router-dom";
import { Btn } from "../Btn/Btn";

export const Header = () => {
  return (
    <div className={S.header}>
      <div className="container">
        <div className={S.headerWrapper}>
          <Link to={"/create-recipe"}>
            <Btn>add Recipe</Btn>
          </Link>
        </div>
      </div>
    </div>
  );
};
