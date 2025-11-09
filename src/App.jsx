import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { useLoading } from "./context/LoadingContext";
const App = () => {
  const { loading } = useLoading();

  return (
    <div>
      {loading && (
        <div className="global-loading">
          {/* <h3>Loading...</h3>  */}
        </div>
      )}

      <RouterProvider router={router} />
    </div>
  );

};

export default App;
