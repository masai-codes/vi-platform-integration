import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
      }}
    >
      <button onClick={() => navigate("/assessments/create")}>Create an assessment</button>
      <button onClick={() => navigate("/assessments")}>Show list of assessments</button>
    </div>
  );
};

export default Home;
