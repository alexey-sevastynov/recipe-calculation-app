import React from "react";
import Styles from "./item-product.module.scss";
import { getIconUrl } from "../../helpers/getIconUrl";

export const ItemProduct: React.FC<ItemProductProps> = ({
  productName,
  netWeight,
  price,
  weightUnit,
  noButtons,
}) => {
  return (
    <div className={Styles.itemProducts}>
      <p className={Styles.itemProductName}>{productName}</p>
      <div className={Styles.blockValues}>
        <div className={Styles.blockValue}>
          <p>{netWeight}</p>
          <p>{weightUnit}</p>
        </div>
        {price && (
          <div className={Styles.blockValue}>
            <p>{price}</p>
            <p>грн</p>
          </div>
        )}
      </div>

      {!noButtons && (
        <div className={Styles.btns}>
          <button className={Styles.edit}>
            <img src={getIconUrl("edit.svg")} alt="edit" />
          </button>
          <button className={Styles.delete}>
            <img src={getIconUrl("delete.svg")} alt="delete" />
          </button>
        </div>
      )}
    </div>
  );
};
