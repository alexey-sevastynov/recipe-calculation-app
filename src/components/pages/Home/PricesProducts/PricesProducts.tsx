import React from "react";
import Style from "./prices-products.module.scss";

import { Link } from "react-router-dom";
import { getIconUrl } from "../../../../helpers/getIconUrl";
import { useAppSelector } from "../../../../redux/hook";
import { ListProducts } from "../../../ListProducts/ListProducts";
import { FAKE_LIST, MESSAGE_PRODUCT_LIST_EMPTY } from "../../../../constants";

export const PricesProducts = () => {
  const listProducts = useAppSelector((item) => item.products.listProducts);
  const isProductListNotEmpty = listProducts.length !== 0;

  const message = <p>{MESSAGE_PRODUCT_LIST_EMPTY}</p>;
  return (
    <section className={Style.pricesProducts}>
      <h5>Ціна товару в магазині:</h5>

      <Link to={"/add-products"}>
        <button className={Style.edit}>
          <img src={getIconUrl("edit.svg")} alt="edit" />
        </button>
      </Link>

      {isProductListNotEmpty ? (
        message
      ) : (
        <ListProducts listItems={FAKE_LIST} noButtons />
      )}
    </section>
  );
};
