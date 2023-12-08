import React from "react";
import Style from "./btn-small.module.scss";

export const BtnSmall: React.FC<IBtnSmallProps> = ({ children, ...rest }) => {
  return (
    <button className={Style.btnSmall} {...rest}>
      {children}
    </button>
  );
};
