import React from "react";
import Style from "./btn.module.scss";
import { getIconUrl } from "../../helpers/getIconUrl";

export const Btn: React.FC<IBtnProps> = ({
  children,
  noActive,
  iconName = "plus.svg",
  ...rest
}) => {
  return (
    <button
      className={`${Style.btn} ${noActive ? Style.noActive : ""}`}
      {...rest}
    >
      <img src={getIconUrl(iconName)} alt="icon" width={16} height={16} />
      {children}
    </button>
  );
};
