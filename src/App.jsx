import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import VendorSignup from "./auth/vendor-auth/vendor-signup";
import vendorlogin from "./auth/vendor-auth/vendor-login";
import Vendorlogin from "./auth/vendor-auth/vendor-login";
import { UserProvider } from "./context/UserContext";
const App = () => {
  return (
    <div>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
};

export default App;
