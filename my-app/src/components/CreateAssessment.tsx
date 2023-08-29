import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IAssessmentData {
  title: string;
  intro_message: string;
  interviewer_name: string;
  redirect_url: string;
  schedule_start_time: string;
  schedule_end_time: string;
  max_duration_minutes: number;
}

const CreateAssessment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IAssessmentData>({
    title: "",
    intro_message: "",
    interviewer_name: "",
    redirect_url: "",
    schedule_start_time: "",
    schedule_end_time: "",
    max_duration_minutes: 0,
  });

  const createAssessment = async (assessmentData: IAssessmentData) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/assessments/create`, assessmentData);
      if (data) {
        navigate("/assessments");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAssessment(formData);
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
        <input required type="text" onChange={handleChange} value={formData.title} placeholder="title" name="title" />
        <input required onChange={handleChange} type="text" placeholder="intro message" name="intro_message" />
        <input required onChange={handleChange} type="text" placeholder="interviewer name" name="interviewer_name" />
        <input required onChange={handleChange} type="text" placeholder="redirect url" name="redirect_url" />
        <input required onChange={handleChange} type="datetime-local" name="schedule_start_time" />
        <input required onChange={handleChange} type="datetime-local" name="schedule_end_time" />
        <input
          required
          onChange={handleChange}
          type="text"
          placeholder="max duration in minutes"
          name="max_duration_minutes"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateAssessment;
