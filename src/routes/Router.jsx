import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import RouteErr from "./RouteErr";
// import VendorSignup from "../auth/vendor-auth/vendor-signup/vendor-signup";
import Vendorlogin from "../auth/vendor-auth/vendor-login/vendor-login";
import VendorForgotPassword from "../auth/vendor-auth/forgot-password";
import VendorDashboard from "../pages/Dashboard/VendorDashboard";
import Forgot from "../Auth/Forgot";
import Login from "../Auth/Login";
import Reset from "../Auth/Reset"
import Verify from "../Auth/Verify";
import Signup from "../Auth/Signup";
import HomePage from "../Pages/Home/HomePage"
import OtpForgot from "../Auth/OtpForgot";

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
   path: "userverify",
    element: <Verify /> 
  },
  {
    path: "userlogin",
    element: <Login />
  },
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "forgot",
    element: <Forgot />
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
