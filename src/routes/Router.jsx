import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import RouteErr from "./RouteErr";
import Signup from "../Auth/customer-auth/customer-signup/Signup";
import Login from "../Auth/customer-auth/customer-login/Login";
import OtpSignup from "../Auth/customer-auth/customer-signupverify/OtpSignup";
import Reset from "../Auth/customer-auth/customer-resetpassword/Reset";
import OtpForgot from "../Auth/customer-auth/customer-forgotverify/OtpForgot";
import Forgot from "../Auth/customer-auth/customer-forgotpassword/Forgot";
import VendorSignup from "../auth/vendor-auth/vendor-signup";
import Vendorlogin from "../auth/vendor-auth/vendor-login";
import ForgotPassword from "../auth/vendor-auth/vendor-forgot-password/forgot-password";
import VendorDashboard from "../pages/feature/component/Dashboard/VendorDashboard";
import HomePage from "../pages/Home/HomePage";
import Verify from "../auth/vendor-auth/verify-email/verify-email";
import VendorResetPassword from "../auth/vendor-auth/vendor-reset-password";
import DashboardLayout from "../pages/feature/Dashboard-Layout";
import OrderManagement from "../pages/feature/component/order";
import ProfileManagement from "../pages/feature/component/profile";
import VerifyForgetPasswordEmail from "../auth/vendor-auth/vendor-forgot-password/vendor-verify-forgetpassword-email";
import RiderSignup from "../auth/Rider/Rider-signup";
import RiderLogin from "../auth/Rider/Rider-login";
import UserDashboard from "../Pages/feature/component/Dashboard/UserDashboard";
import HomeContent from "../Pages/feature/component/Dashboard/user-dashboard/HomeContent";
import BrowseVendor from "../Pages/feature/component/Dashboard/user-dashboard/BrowseVendor";
import MyOrders from "../Pages/feature/component/Dashboard/user-dashboard/MyOrders";
import Dashboard_layout from "../Components/layout/Dashboard_layout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import RiderOrder from "../Pages/Dashboard/RiderOrder";
import RiderEarnings from "../Pages/Dashboard/RiderEarnings";
import RiderLeaderboard from "../Pages/Dashboard/RiderLeaderboard";
import RiderAccount from "../Pages/Dashboard/RiderAccount";

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
    path: "userdashboard",
    element: <UserDashboard />,
    children: [
      {
        index: true,
        element: <HomeContent />,
      },
      {
        path: "browsevendors",
        element: <BrowseVendor />,
      },
      {
        path: "myorders",
        element: <MyOrders />,
      },
    ],
  },
  {
    path: "userverify",
    element: <OtpSignup />,
  },
  {
    path: "userlogin",
    element: <Login />,
  },
  {
    path: "forgot",
    element: <Forgot />,
  },
  {
    path: "forgot-verify",
    element: <OtpForgot />,
  },
  {
    path: "userreset",
    element: <Reset />,
  },
  {
    path: "usersignup",
    element: <Signup />,
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
    path: "/rider-dashboard",
    element: <Dashboard_layout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "order",
        element: <RiderOrder />,
      },
      {
        path: "earnings",
        element: <RiderEarnings />,
      },
      {
        path: "leaderboard",
        element: <RiderLeaderboard />,
      },
      {
        path: "account",
        element: <RiderAccount />,
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
