import { createBrowserRouter } from "react-router";
import App from "../App";
import Products from "../pages/customer/sections/Section";
import LandingPage from "../pages/customer/landing/LandingPage";
import ProductDetail from "../pages/customer/productDetail/ProductDetail";
import ErrorBoundary from "./ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        errorElement: <ErrorBoundary />,
        children: [
          { path: "", element: <LandingPage /> },
          {
            path: "r/:section/:category?",
            element: <Products />,
          },
          {
            path: "p/:productId",
            element: <ProductDetail />,
          },
        ],
      },
    ],
  },
]);

export default router;
