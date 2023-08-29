import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const ViewAssessment = () => {
  const { id, submissionId } = useParams();

  return (
    <>
      <iframe
        allow="camera *;microphone *"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          border: 0,
        }}
        src={`${process.env.REACT_APP_VI_PLATFORM_URL}/virtual-interview-template/assessment-interview/${id}/${submissionId}`}
      ></iframe>
    </>
  );
};

export default ViewAssessment;
