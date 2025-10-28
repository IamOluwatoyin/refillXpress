import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import RouteErr from "./RouteErr";
import VendorSignup from "../auth/vendor-auth/vendor-signup/vendor-signup";
import Vendorlogin from "../auth/vendor-auth/vendor-login/vendor-login";
import ForgotPassword from "../auth/vendor-auth/vendor-forgot-password/forgot-password";
import VendorDashboard from "../pages/feature/component/Dashboard/VendorDashboard";
import HomePage from "../pages/Home/HomePage";
import Verify from "../auth/vendor-auth/verify-email/verify-email";
import VendorResetPassword from "../auth/vendor-auth/vendor-reset-password/vendor-reset-password";
import DashboardLayout from "../pages/feature/Dashboard-Layout";
import OrderManagement from "../pages/feature/component/order";
import ProfileManagement from "../pages/feature/component/profile";
import VerifyForgetPasswordEmail from "../auth/vendor-auth/vendor-forgot-password/vendor-verify-forgetpassword-email";
import RiderSignup from "../Auth/Rider/Rider-signup/RiderSignup";
import RiderLogin from "../Auth/Rider/Rider-login/RiderLogin";

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
    path: "/",
    element: <HomePage />,
  },

  {
    path: "vendorSignup",
    element: <VendorSignup />,
  },
  {
    path: "vendorLogin",
    element: <Vendorlogin />,
  },
  {
    path: "vendor-forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "vendor-forget-password-verify",
    element: <VerifyForgetPasswordEmail />,
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
    path: "vendor-dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        path: "",
        element: <VendorDashboard />,
      },
      {
        path: "vendor-order",
        element: <OrderManagement />,
      },
      {
        path: "vendor-profile",
        element: <ProfileManagement />,
      },
    ],
  },

  {
    path: "*",
    element: <RouteErr />,
  },

  {
    path: "/ridersignup",
    element: <RiderSignup />,
  },
  {
    path: "/riderlogin",
    element: <RiderLogin />,
  },
]);
