import React, { useState } from "react";
import "../styles/pages/add-products/add-products.scss";

import { ListProducts } from "../components/ListProducts/ListProducts";
import { Btn } from "../components/Btn/Btn";
import { Link } from "react-router-dom";
import { AddProductForm } from "../components/pages/Addproducts/AddProductForm/AddProductFrom";
import { useAppSelector } from "../redux/hook";
import { MESSAGE_PRODUCT_LIST_EMPTY } from "../constants";

export const AddProducts = () => {
  const [focusInput, setFocusInput] = useState(false);
  const listProducts = useAppSelector((state) => state.products.listProducts);

  const isProductListNotEmpty = listProducts.length === 0;

  const message = <p>{MESSAGE_PRODUCT_LIST_EMPTY}</p>;

  const setFocusFieldNameProduct = () => {
    setFocusInput(true);
  };
  return (
    <div className="container">
      <div className="add-products">
        <h3>ЦІНА ТОВАРУ В МАГАЗИНІ:</h3>
        <AddProductForm focusOnInput={focusInput} />

        <div className="add-products__list">
          {isProductListNotEmpty ? (
            message
          ) : (
            <ListProducts
              listItems={listProducts}
              setFocusFieldNameProduct={setFocusFieldNameProduct}
            />
          )}
        </div>
        <div className="add-products__btns">
          <Link to={"/"}>
            <Btn>Cancel</Btn>
          </Link>
        </div>
      </div>
    </div>
  );
};
