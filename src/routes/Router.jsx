import { createBrowserRouter } from "react-router";
import Layout from "../routes/Layout";
import RouteErr from "./RouteErr";
import VendorSignup from "../auth/vendor-auth/vendor-signup/vendor-signup";
import VendorForgotPassword from "../auth/vendor-auth/forgot-password";
import VendorDashboard from "../pages/Dashboard/VendorDashboard";
import HomePage from "../Pages/Home/HomePage";
import RiderSignup from "../Auth/Rider/Rider-signup/RiderSignup";
import RiderLogin from "../Auth/Rider/Rider-login/RiderLogin";
import SpinnerModal from "../auth/vendor-auth/spinner-modal-auth";
import Vendorlogin from "../auth/vendor-auth/vendor-login/vendor-login";

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
    path: "/vendorsignup",
    element: <VendorSignup />,
  },
  {
    path: "/vendorlogin",
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
