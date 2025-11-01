import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
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
