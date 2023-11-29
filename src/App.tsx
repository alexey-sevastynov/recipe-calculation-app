import React from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTES } from "./constants";

import Layout from "./pages/Layout";
import { Home } from "./pages/Home";
import { AddProducts } from "./pages/AddProducts";
import { CreateRecipe } from "./pages/CreateRecipe";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.ADD_PRODUCTS} element={<AddProducts />} />
        <Route path={ROUTES.CREATE_RECIPE} element={<CreateRecipe />} />
      </Route>
    </Routes>
  );
}

export default App;
