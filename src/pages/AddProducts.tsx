import React from "react";
import "../styles/pages/add-products/add-products.scss";
import { FAKE_LIST } from "../constants";
import { ListProducts } from "../components/ListProducts/ListProducts";
import { Btn } from "../components/Btn/Btn";
import { Link } from "react-router-dom";
import { AddProductForm } from "../components/pages/Addproducts/AddProductForm/AddProductFrom";

export const AddProducts = () => {
  return (
    <div className="container">
      <div className="add-products">
        <h3>ЦІНА ТОВАРУ В МАГАЗИНІ:</h3>
        <AddProductForm />
        <ListProducts listItems={FAKE_LIST} />

        <div className="add-products__btns">
          <Link to={"/"}>
            <Btn>Cancel</Btn>
          </Link>
        </div>
      </div>
    </div>
  );
};
