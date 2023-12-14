import { RouteObject } from "react-router-dom";
import { ROUTES } from "../constants";
import { AddProducts } from "../pages/AddProducts";
import { CreateRecipe } from "../pages/CreateRecipe";
import { Home } from "../pages/Home";
import Layout from "../pages/Layout";

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.ADD_PRODUCTS, element: <AddProducts /> },
      { path: ROUTES.CREATE_RECIPE, element: <CreateRecipe /> },
    ],
  },
];

export default routes;
