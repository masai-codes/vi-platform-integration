import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewAssessment = () => {
  const navigate = useNavigate();
  const { id, submissionId } = useParams();

  if (!id || !submissionId) {
    navigate("/assessments");
  }

  useEffect(() => {
    const handleEvent = (event: MessageEvent) => {
      // You will receive this event when the assessment is ended
      //  {
      //     type: 'assessment-ended',
      //     hasEnded: true,
      //  }
      console.log(event.data, "Event triggered");
    };

    window?.addEventListener("message", handleEvent);

    // Make sure to clean up event listeners to avoid memory leaks
    return () => {
      window?.removeEventListener("message", handleEvent);
    };
  }, []);
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
