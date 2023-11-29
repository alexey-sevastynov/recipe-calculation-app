import React from "react";

import { Outlet } from "react-router-dom";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
