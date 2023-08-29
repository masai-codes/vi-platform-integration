import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAssessmentTypes } from "./AssessmentDetails";

const AllAssessments = () => {
  const [data, setData] = useState<IAssessmentTypes[]>([]);
  const navigate = useNavigate();

  const getAllAssessments = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/assessments`);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllAssessments();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
        }}
      >
        <h2>Asssesment List</h2>
        {data?.map((el) => {
          return (
            <div
              style={{
                display: "flex",
                gap: "40px",
                alignItems: "center",
              }}
            >
              <div>{el.title}</div>
              <button onClick={() => navigate(`/assessments/${el._id}`)}>View Details</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllAssessments;
