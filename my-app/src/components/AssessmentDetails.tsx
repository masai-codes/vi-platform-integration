import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AssessmentDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>();
  const [submissions, setSubmissions] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getAssessmentById = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/assessments/${id}`);
      setData(data?.assessment);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/assessments/submissions/${id}`);
      console.log(data?.submissions);
      setSubmissions(data?.submissions);
    } catch (err) {
      console.log(err);
    }
  };

  const createSubmission = async (userData: { email: string; code: string }) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/assessments/submissions/create`, {
        assessment_id: id,
        ...userData,
        meta: JSON.stringify({}),
        variables: [],
      });
      setIsLoading(false);

      if (data) {
        getUsers();
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getAssessmentById();
    getUsers();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>{data?.title}</h1>
      <p>
        <strong>starting at :</strong> {data?.schedule_start_time}
      </p>
      <p>
        <strong>ending at :</strong> {data?.schedule_end_time}
      </p>
      <button
        style={{
          marginBottom: "16px",
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Create Interview
      </button>
      {isOpen && (
        <>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "15%",
            }}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              createSubmission({ email, code });
              setEmail("");
              setCode("");
            }}
          >
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input required type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="code" />
            <button disabled={isLoading} type="submit">
              Add User and Create Interview
            </button>
          </form>
        </>
      )}
      {/* Users submissions */}
      {(submissions?.length === 0 || !submissions) && <h4>No submissions data available</h4>}
      {submissions?.length > 0 && (
        <>
          <h4>Users Submissions</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {" "}
            {submissions?.map((el: any) => {
              return (
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <div>{el?.email}</div>
                  <button
                    disabled={el?.status === "done"}
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_VI_PLATFORM_URL}/virtual-interview-template/assessment-interview/${id}/${el._id}`
                      )
                    }
                  >
                    {el?.status === "done" ? "Done" : "Start Interview"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AssessmentDetails;
