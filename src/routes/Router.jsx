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
import AnalyticsManagement from "../pages/feature/component/analytics";
import SettingsMangement from "../pages/feature/component/settings";
import RiderSignup from "../auth/Rider/Rider-signup";
import RiderLogin from "../auth/Rider/Rider-login";
import KYC from "../pages/feature/component/order/kyc";

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
    path: "vendor-kyc",
    element: <KYC />,
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
        path: "vendor-analytics",
        element: <AnalyticsManagement />,
      },
      {
        path: "vendor-profile",
        element: <ProfileManagement />,
        // children: [

        // ],
      },
      {
        path: "vendor-settings",
        element: <SettingsMangement />,
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

  // {
  //   path: "forgetpassword",
  //   element: <RiderForgotPassword />,
  // },
]);
