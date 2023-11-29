import React from "react";
import "../styles/pages/home/home.scss";
import { PricesProducts } from "../components/pages/Home/PricesProducts/PricesProducts";

export const Home = () => {
  return (
    <div className="container">
      <PricesProducts />
    </div>
  );
};
