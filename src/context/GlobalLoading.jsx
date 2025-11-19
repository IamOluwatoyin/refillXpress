import { ImSpinner7 } from "react-icons/im";
import { useLoading } from "./LoadingContext";

const GlobalLoading = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <ImSpinner7
        color="#fff"
        size={50}
        style={{
          animation: "spin 1s linear infinite",
          transformOrigin: "center",
        }}
      />

      {/* Inline keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default GlobalLoading;
