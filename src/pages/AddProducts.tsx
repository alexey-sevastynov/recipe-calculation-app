import React, { ChangeEvent, useEffect, useState } from "react";
import "../styles/pages/add-products/add-products.scss";

import { ListProducts } from "../components/ListProducts/ListProducts";
import { Btn } from "../components/Btn/Btn";
import { Link } from "react-router-dom";
import { AddProductForm } from "../components/pages/Addproducts/AddProductForm/AddProductFrom";
import { useAppSelector } from "../redux/hook";
import {
  MESSAGE_FOUND_PRODUCT_LIST_EMPTY,
  MESSAGE_PRODUCT_LIST_EMPTY,
} from "../constants";
import { Search } from "../components/Search/Search";
import { Sort } from "../components/Sort/Sort";

export const AddProducts = () => {
  const [focusInput, setFocusInput] = useState(false);

  const listProducts = useAppSelector((state) => state.products.listProducts);
  const [listOfFoundProducts, setListOfFoundProducts] =
    useState<TypeItemProduct[]>(listProducts);

  const isProductListNotEmpty = listProducts.length === 0;
  const isFoundOfProductListNotEmpty = listOfFoundProducts.length === 0;

  const messageListProductsEmpty = <p>{MESSAGE_PRODUCT_LIST_EMPTY}</p>;
  const messageListFoundProductsEmty = (
    <p>{MESSAGE_FOUND_PRODUCT_LIST_EMPTY}</p>
  );

  const setFocusFieldNameProduct = () => {
    setFocusInput(true);
  };

  const showListProducts = isFoundOfProductListNotEmpty ? (
    messageListFoundProductsEmty
  ) : (
    <ListProducts
      listItems={listOfFoundProducts}
      setFocusFieldNameProduct={setFocusFieldNameProduct}
    />
  );

  useEffect(() => {
    setListOfFoundProducts(listProducts);
  }, [listProducts]);

  return (
    <div className="container">
      <div className="add-products">
        <h3>ЦІНА ТОВАРУ В МАГАЗИНІ:</h3>
        <AddProductForm focusOnInput={focusInput} />

        <main className="add-products__main">
          <div className="add-products__main-col1">
            <Search
              placeholder="Пошук продукту ..."
              listItems={listProducts}
              //@ts-ignore, need to solve the problem TS !!!
              setListOfFoundItems={setListOfFoundProducts}
            />

            <div className="add-products__main-col1-list">
              {isProductListNotEmpty
                ? messageListProductsEmpty
                : showListProducts}
            </div>
          </div>

          <div className="add-products__main-col2">
            <Sort
              listFoundItems={listOfFoundProducts}
              setListOfFoundProducts={setListOfFoundProducts}
            />
          </div>
        </main>

        <div className="add-products__btns">
          <Link to={"/"}>
            <Btn>Cancel</Btn>
          </Link>
        </div>
      </div>
    </div>
  );
};
