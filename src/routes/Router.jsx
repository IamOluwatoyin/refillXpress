import { createBrowserRouter } from "react-router";
import Layout from "../routes/Layout";
import RouteErr from "./RouteErr";
import VendorSignup from "../auth/vendor-auth/vendor-signup/vendor-signup";
import Vendorlogin from "../auth/vendor-auth/vendor-login/vendor-login";
import ForgotPassword from "../auth/vendor-auth/vendor-forgot-password/forgot-password";
import VendorDashboard from "../pages/Dashboard/VendorDashboard";
import HomePage from "../pages/Home/HomePage";
import Verify from "../auth/vendor-auth/verify-email/verify-email";
import VendorResetPassword from "../auth/vendor-auth/vendor-reset-password/vendor-reset-password";

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
    path: "vendor-signup",
    element: <VendorSignup />,
  },
  {
    path: "vendor-login",
    element: <Vendorlogin />,
  },
  {
    path: "vendor-forget-password",
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
    path: "vendor-reset-password",
    element: <VendorResetPassword />,
  },
  
  {
    path: "*",
    element: <RouteErr />,
  },
]);
