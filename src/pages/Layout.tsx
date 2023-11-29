import React from "react";

import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
