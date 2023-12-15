import React from "react";
import Style from "./btn.module.scss";
import { getIconUrl } from "../../helpers/getIconUrl";

export const Btn: React.FC<IBtnProps> = ({ children, noActive, ...rest }) => {
  return (
    <button
      className={`${Style.btn} ${noActive ? Style.noActive : ""}`}
      {...rest}
    >
      <img src={getIconUrl("plus.svg")} alt="plus" />
      {children}
    </button>
  );
};
