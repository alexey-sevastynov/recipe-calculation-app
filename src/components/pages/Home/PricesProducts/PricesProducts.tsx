import React from "react";
import Style from "./prices-products.module.scss";

import { Link } from "react-router-dom";
import { getIconUrl } from "../../../../helpers/getIconUrl";
import { useAppSelector } from "../../../../redux/hook";
import { ListProducts } from "../../../ListProducts/ListProducts";
import { MESSAGE_PRODUCT_LIST_EMPTY } from "../../../../constants";

const FAKE_LIST: TypeItemProduct[] = [
  {
    id: 27.57553560032877,
    productName: "дробленная фисташка",
    netWeight: 50,
    weightUnit: "гр",
    price: 120,
  },
  {
    id: 25.62151062309166,
    productName: "малиновое пюре",
    price: 235,
    netWeight: 1000,
    weightUnit: "гр",
  },
  {
    id: 90.26900081839217,
    productName: "фисташковая паста",
    netWeight: 500,
    weightUnit: "гр",
    price: 800,
  },
  {
    id: 81.81147326838918,
    productName: "шоколад белый",
    netWeight: 80,
    weightUnit: "гр",
    price: 32,
  },
  {
    id: 84.41940808353552,
    productName: "кондитерский мешок",
    netWeight: 100,
    weightUnit: "шт",
    price: 145,
  },
];

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
