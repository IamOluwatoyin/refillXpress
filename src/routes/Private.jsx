import { Navigate } from "react-router-dom";

const PrivateRoute = ({ role, children }) => {
  const storedRole = localStorage.getItem("role");

  // match role → correct token
  const tokens = {
    vendor: localStorage.getItem("vendor_token"),
    user: localStorage.getItem("token"),
    rider: localStorage.getItem("authToken"),
  };

  const hasToken = tokens[role];

  if (!hasToken ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
