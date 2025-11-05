import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import RouteErr from "./RouteErr";
import Signup from "../Auth/customer-auth/customer-signup/Signup";
import Login from "../Auth/customer-auth/customer-login/Login";
import OtpSignup from "../Auth/customer-auth/customer-signupverify/OtpSignup";
import Reset from "../Auth/customer-auth/customer-resetpassword/Reset";
import OtpForgot from "../Auth/customer-auth/customer-forgotverify/OtpForgot";
import Forgot from "../Auth/customer-auth/customer-forgotpassword/Forgot";
import HomePage from "../Pages/Home/HomePage";
import DashboardLayout from "../Pages/feature/Dashboard-Layout";
import OrderManagement from "../Pages/feature/component/order";
import ProfileManagement from "../Pages/feature/component/profile";
import VerifyForgetPasswordEmail from "../Auth/vendor-auth/vendor-forgot-password/VendorVerifyForgetPasswordEmail";
import AnalyticsManagement from "../Pages/feature/component/analytics";
import SettingsMangement from "../Pages/feature/component/settings";
import RiderSignup from "../Auth/Rider/Rider-signup";
import RiderLogin from "../Auth/Rider/Rider-login";
import KYC from "../Pages/feature/component/order/kyc";
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
import VendorSignup from "../Auth/vendor-auth/vendor-signup";
import VendorLogin from "../Auth/vendor-auth/vendor-login";
import VendorVerify from "../Auth/vendor-auth/verify-email";
import VendorForgotPassword from "../Auth/vendor-auth/vendor-forgot-password";
import VendorDashboard from "../Pages/feature/component/Dashboard/Vendor-Dashboard";
import ResetPasswordVendor from "../Auth/vendor-auth/vendor-reset-password";
import CustomerReview from "../Pages/feature/component/Dashboard/user-dashboard/CustomerReview";
import CustomerAccount from "../Pages/feature/component/Dashboard/user-dashboard/CustomerAccount";
import TrackOrder from "../Pages/feature/component/Dashboard/user-dashboard/TrackOrder";
import VerifyEmail from "../Auth/Rider/verify-email/Index";
import RiderApplicationForm from "../Auth/Rider/Rider-Kyc";
import BusinessDetails from "../Pages/feature/component/profile/BusinessDetails";
import BankDetails from "../Pages/feature/component/profile/BankDetails";
import VendorDashboardEmpty from "../Pages/feature/component/Dashboard/VendorDashboardEmpty";
import SettingsManagement from "../Pages/feature/component/settings";
import ForgotPassword from "../Auth/Rider/Forget-password/ForgetPassword";
import ForgotPasswordVerifyEmail from "../Auth/Rider/forgotPasswordVerifyEmail/Index";
import ResetPassword from "../Auth/Rider/reset-pasword/Index";

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
      {
        path: "customer-review",
        element: <CustomerReview />,
      },
      {
        path: "customer-account",
        element: <CustomerAccount />,
      },
      {
        path: "track-order",
        element: <TrackOrder />,
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
    element: <VendorLogin />,
  },
  {
    path: "vendor-forget-password",
    element: <VendorForgotPassword />,
  },
  {
    path: "vendor-forget-password-verify",
    element: <VerifyForgetPasswordEmail />,
  },
  {
    path: "vendor-verify-email",
    element: <VendorVerify />,
  },
  {
    path: "vendor-reset-password",
    element: <ResetPasswordVendor />,
  },
  {
    path: "vendor-kyc",
    element: <KYC />,
  },
  {
    path: "vendor-business",
    element: <BusinessDetails />,
  },
  {
    path: "vendor-bank",
    element: <BankDetails />,
  },
  {
    path: "vendor-dashboardEmpty",
    element: <VendorDashboardEmpty />,
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
      },
      {
        path: "vendor-settings",
        element: <SettingsMangement />,
      },
      {
        path: "vendor-logout",
        element: <SettingsManagement />,
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
  {
    path: "verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "rider-kyc",
    element: <RiderApplicationForm />,
  },

  {
    path: "forgetpassword",
    element: <ForgotPassword />,
  },
  {
    path: "verify-password",
    element: <ForgotPasswordVerifyEmail />,
  },
  {
    path: "rider/resetpassword",
    element: <ResetPassword />,
  },
]);
