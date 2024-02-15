import React from "react";
import { Toaster } from "react-hot-toast";

import { Outlet } from "react-router-dom";

const MainContent: React.FC = () => {
  return (
    <div className="p-2">
      <Toaster />
      <Outlet />
    </div>
  );
};

export default MainContent;
