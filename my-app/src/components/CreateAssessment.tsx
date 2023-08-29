import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAssessment = () => {
  const navigate = useNavigate();

  const createAssessment = async (assessmentData: any) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/assessments/create`, assessmentData);
      if (data) {
        navigate("/assessments");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const assessmentData = {
      title: data.get("title"),
      intro_message: data.get("intro_message"),
      interviewer_name: data.get("interviewer_name"),
      redirect_url: data.get("redirect_url"),
      schedule_start_time: data.get("schedule_start_time"),
      schedule_end_time: data.get("schedule_end_time"),
      max_duration_minutes: data.get("max_duration_minutes"),
    };
    createAssessment(assessmentData);
  };

  return (
    <div
      style={{
        width: "30%",
        padding: "20px",
      }}
    >
      <h3>Create Assessments</h3>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input required type="text" placeholder="title" name="title" />
        <input required type="text" placeholder="intro message" name="intro_message" />
        <input required type="text" placeholder="interviewer name" name="interviewer_name" />
        <input required type="text" placeholder="redirect url" name="redirect_url" />
        <input required type="datetime-local" name="schedule_start_time" />
        <input required type="datetime-local" name="schedule_end_time" />
        <input required type="text" placeholder="max duration in minutes" name="max_duration_minutes" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateAssessment;
