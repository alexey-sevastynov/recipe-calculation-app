import React from "react";
import S from "./header.module.scss";

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className={S.header}>
      <div className="container">
        <div className={S.headerWrapper}>
          <Link to={"/create-recipe"}>
            <button>add Recipe</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
