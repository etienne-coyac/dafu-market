import { createBrowserRouter } from "react-router";
import App from "../App";
import Products from "../pages/customer/products/Products";
import LandingPage from "../pages/customer/landing/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: "produits/:section/:category?",
        element: <Products />,
      },
    ],
  },
]);

export default router;
