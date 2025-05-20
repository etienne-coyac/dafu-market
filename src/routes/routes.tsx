import { createBrowserRouter } from "react-router";
import App from "../pages/customer/App";
import Products from "../pages/customer/sections/Section";
import LandingPage from "../pages/customer/landing/LandingPage";
import ProductDetail from "../pages/customer/productDetail/ProductDetail";
import ErrorBoundary from "./ErrorBoundary";
import AppProviders from "../AppProviders";
import AppAdmin from "../pages/admin/AppAdmin";
import ImportPage from "../pages/admin/import/ImportPage";
import Forecast from "../pages/admin/forecast/ForecastPage";
import ParamAlgo from "../pages/admin/statistiques/ParamAlgoPage";
import EditSysteme from "../pages/admin/statistiques/EditSystemePage";
import EffSysteme from "../pages/admin/statistiques/EffSystemePage";
import HabitProfils from "../pages/admin/statistiques/HabitProfils";
import ConsultProfils from "../pages/admin/statistiques/ConsultProfilsPage";
import AppPreparateur from "../pages/preparateur/AppPreparateur";
import DashboardPrepa from "../pages/preparateur/dashboard/DashboardPrepaPage";

const router = createBrowserRouter([
  {
    element: <AppProviders />,
    children: [
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
      {
        path: "/admin",
        element: <AppAdmin />,
        children: [
          {
            errorElement: <ErrorBoundary />,
            children: [
              {
                path: "import",
                element: <ImportPage />,
              },
              {
                path: "forecast",
                element: <Forecast />,
              },
              {
                path: "efficaciteSysteme",
                element: <EffSysteme />,
              },
              {
                path: "editerSysteme",
                element: <EditSysteme />,
              },
              {
                path: "parametrerAlgorithme",
                element: <ParamAlgo />,
              },
              {
                path: "consulterProfils",
                element: <ConsultProfils />,
              },
              {
                path: "habitudesProfils",
                element: <HabitProfils />,
              },
            ],
          },
        ],
      },
      {
        path: "/preparateur",
        element: <AppPreparateur />,
        children: [
          {
            errorElement: <ErrorBoundary />,
            children: [
              {
                path: "dashboard",
                element: <DashboardPrepa />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
