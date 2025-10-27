import { createBrowserRouter } from "react-router";
import Layout from "../routes/Layout";
import RouteErr from "./RouteErr";
import VendorSignup from "../auth/vendor-auth/vendor-signup/vendor-signup";
import Vendorlogin from "../auth/vendor-auth/vendor-login/vendor-login";
import VendorForgotPassword from "../auth/vendor-auth/forgot-password";
import VendorDashboard from "../pages/Dashboard/VendorDashboard";
import HomePage from "../Pages/Home/HomePage";

export const router = createBrowserRouter([
  {
    path: "homepage",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/",
    element: <VendorSignup />,
  },
  {
    path: "vendorlogin",
    element: <Vendorlogin />,
  },
  {
    path: "forgetpassword",
    element: <VendorForgotPassword />,
  },
  {
    path: "vendorDashboard",
    element: <VendorDashboard />,
  },
  {
    path: "*",
    element: <RouteErr />,
  },
]);
