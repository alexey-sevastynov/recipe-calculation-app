import React from "react";
import Style from "./input.module.scss";
import { getIconUrl } from "../../helpers/getIconUrl";
import { IInput } from "./IInput";

export const Input: React.FC<IInput> = ({
  iconName,
  textError,
  clearInput,
  registerResult,
  isEmptyField,
  error,
  ...props
}) => {
  return (
    <div className={Style.input}>
      {iconName && (
        <img
          className={Style.iconLogo}
          src={getIconUrl(iconName)}
          alt="icon"
          width={30}
          height={30}
        />
      )}
      <input {...props} {...registerResult} />
      {error && <p className={Style.error}>{textError}</p>}

      {isEmptyField && props.value !== "3" && (
        <button type="button" onClick={clearInput}>
          <img
            className={Style.iconEraser}
            src={getIconUrl("eraser.png")}
            alt="del"
            width={18.4}
            height={18.4}
          />
        </button>
      )}
    </div>
  );
};
