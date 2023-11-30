import React from "react";
import Styles from "./item-product.module.scss";
import { getIconUrl } from "../../helpers/getIconUrl";
import { useAppDispatch } from "../../redux/hook";
import { deleteProduct } from "../../redux/productsSlice";

export const ItemProduct: React.FC<ItemProductProps> = ({
  id,
  productName,
  netWeight,
  price,
  weightUnit,
  noButtons,
}) => {
  const dispatch = useAppDispatch();
  const deleteItem = () => {
    dispatch(deleteProduct(id));
  };
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
            <img
              src={getIconUrl("delete.svg")}
              alt="delete"
              onClick={deleteItem}
            />
          </button>
        </div>
      )}
    </div>
  );
};
