import { createBrowserRouter } from "react-router";
import Layout from "../routes/Layout";
import RouteErr from "./RouteErr";
import VendorSignup from "../auth/vendor-auth/vendor-signup/vendor-signup";
import Vendorlogin from "../auth/vendor-auth/vendor-login/vendor-login";
import VendorForgotPassword from "../auth/vendor-auth/forgot-password";
import VendorDashboard from "../pages/Dashboard/VendorDashboard";
import HomePage from "../pages/Home/HomePage";

export const router = createBrowserRouter([
  {
    path: "homepage",
    element: (
      <Layout>
        <HomePage/>
      </Layout>
    ),
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "vendorsignup",
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
    path: "vendor-dashboard",
    element: <VendorDashboard />,
  },
  {
    path: "*",
    element: <RouteErr />,
  },
]);
