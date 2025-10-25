import { createBrowserRouter } from "react-router";
import Layout from "../routes/Layout";
import RouteErr from "./RouteErr";
import VendorSignup from "../auth/vendor-auth/vendor-signup/vendor-signup";
import Vendorlogin from "../auth/vendor-auth/vendor-login/vendor-login";
import ForgotPassword from "../auth/vendor-auth/vendor-forgot-password/forgot-password";
import VendorDashboard from "../pages/Dashboard/VendorDashboard";
import HomePage from "../pages/Home/HomePage";
import Verify from "../auth/vendor-auth/verify-email/verify-email";

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
    element: <ForgotPassword />,
  },
  {
    path: "vendor-dashboard",
    element: <VendorDashboard />,
  },
   {
    path: "vendor-verify-email",
    element: <Verify />,
  },
  
  {
    path: "*",
    element: <RouteErr />,
  },
]);
