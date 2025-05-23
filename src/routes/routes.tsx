import { createBrowserRouter } from "react-router";
import App from "../pages/customer/App";
import Products from "../pages/customer/sections/Section";
import LandingPage from "../pages/customer/landing/LandingPage";
import ProductDetail from "../pages/customer/productDetail/ProductDetail";
import ErrorBoundary from "./ErrorBoundary";
import AppProviders from "../AppProviders";
import AppAdmin from "../pages/admin/AppAdmin";
import ProtectedRoute from "../middlewares/ProtectedRoute";
import LoginPage from "../pages/customer/login/LoginPage";
import CartPage from "../pages/customer/cart/CartPage";
import OrdersPage from "../pages/customer/orders/OrdersPage";

const router = createBrowserRouter([
  {
    element: <AppProviders />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
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

              // protected routes
              {
                element: <ProtectedRoute />,
                children: [
                  {
                    path: "panier",
                    element: <CartPage />,
                  },
                  {
                    path: "commandes",
                    element: <OrdersPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "/admin",
        element: <AppAdmin />,
        children: [],
      },
    ],
  },
]);

export default router;
