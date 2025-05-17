import { createBrowserRouter } from "react-router";
import App from "../App";
import Category from "../pages/category/Category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "produits/:section/:category?",
        element: <Category />,
      },
    ],
  },
]);

export default router;
