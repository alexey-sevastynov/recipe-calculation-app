import React from "react";
import "../styles/pages/home/home.scss";
import { PricesProducts } from "../components/pages/Home/PricesProducts/PricesProducts";
import { ListRecipe } from "../components/pages/Home/ListRecipe/ListRecipe";

export const Home = () => {
  return (
    <div className="container">
      <div className="home">
        <ListRecipe />
        <PricesProducts />
      </div>
    </div>
  );
};
