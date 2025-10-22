import HomePage from "../pages/Home/HomePage";

import { createBrowserRouter } from "react-router";
import Layout from "../routes/Layout";
import RouteErr from "./RouteErr";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <RouteErr />,
  },
]);
