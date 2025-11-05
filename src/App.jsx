import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { UserProvider } from "./context/UserContext";
const App = () => {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  );
};

export default App;
