import { useEffect, useState } from "react";
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
import { InfoText } from "../components/InfoText/InfoText";

export const AddProducts = () => {
  const [focusInput, setFocusInput] = useState(false);

  const listProducts = useAppSelector((state) => state.products.listProducts);
  const [listOfFoundProducts, setListOfFoundProducts] =
    useState<TypeItemProduct[]>(listProducts);

  const isProductListNotEmpty = listProducts.length === 0;
  const isFoundOfProductListNotEmpty = listOfFoundProducts.length === 0;

  const setFocusFieldNameProduct = () => {
    setFocusInput(true);
  };

  const showListProducts = isFoundOfProductListNotEmpty ? (
    <InfoText
      textMessage={MESSAGE_FOUND_PRODUCT_LIST_EMPTY}
      imageName="fail.svg"
    />
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
          <div className="add-products__main-search-block">
            <Search
              placeholder="Пошук продукту ..."
              listItems={listProducts}
              //@ts-ignore, need to solve the problem TS !!!
              setListOfFoundItems={setListOfFoundProducts}
            />
            <Sort
              listFoundItems={listOfFoundProducts}
              setListOfFoundProducts={setListOfFoundProducts}
            />
          </div>

          {isProductListNotEmpty ? (
            <InfoText
              textMessage={MESSAGE_PRODUCT_LIST_EMPTY}
              imageName="sad.svg"
            />
          ) : (
            <div className="add-products__main-list-products">
              {showListProducts}
            </div>
          )}
        </main>

        <div className="add-products__btns">
          <Link to={"/"}>
            <Btn>Назад</Btn>
          </Link>
        </div>
      </div>
    </div>
  );
};
