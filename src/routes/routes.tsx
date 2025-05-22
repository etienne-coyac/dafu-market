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
import { AuthProvider } from "../context/auth.context";

const router = createBrowserRouter([
  {
    element: <AppProviders />,
    children: [
      {
        path: "/login",
        element: (
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        ),
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
                    path: "test",
                    element: <>protected</>,
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
