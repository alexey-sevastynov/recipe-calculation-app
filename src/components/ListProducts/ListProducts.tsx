import React from "react";
import Styles from "./list-products.module.scss";
import { ItemProduct } from "../ItemProduct/ItemProduct";

export const ListProducts: React.FC<ListProductProps> = ({
  listItems,
  noButtons,
}) => {
  return (
    <div className={Styles.listProducts}>
      {listItems.map((product) => (
        <ItemProduct
          key={product.id}
          id={product.id}
          productName={product.productName}
          netWeight={product.netWeight}
          weightUnit={product.weightUnit}
          price={product.price}
          noButtons={noButtons}
        />
      ))}
    </div>
  );
};
