import { createBrowserRouter } from "react-router";
import Layout from "../routes/Layout";
import RouteErr from "./RouteErr";
import HomePage from "../Pages/Home/HomePage";

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
