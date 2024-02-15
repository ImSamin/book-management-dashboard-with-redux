import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddProductForm from "../components/AddProductForm/AddProductForm";
import { SignUp } from "../components/Authentication/SignUp";
import DashBoardHome from "../components/DashBoardHome";
import { ProductsTable } from "../components/Products/ProductsTable";
import SalesHistory from "../components/SalesHistory/SalesHistory";
import Login from "../components/Authentication/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashBoardHome />,
      },
      {
        path: "/add-product",
        element: <AddProductForm />,
      },
      {
        path: "/products",
        element: <ProductsTable />,
      },
      {
        path: "/history",
        element: <SalesHistory />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
