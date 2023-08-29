import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <button
        style={{
          display: "flex",
          gap: "10px",
        }}
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <AllRoutes />
    </>
  );
}

export default App;
