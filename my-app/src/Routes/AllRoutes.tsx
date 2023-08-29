import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import AllAssessments from "../components/AllAssessments";
import CreateAssessment from "../components/CreateAssessment";
import AssessmentDetails from "../components/AssessmentDetails";
import ViewAssessment from "../components/ViewAssessment";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assessments" element={<AllAssessments />} />
        <Route path="/assessments/:id" element={<AssessmentDetails />} />
        <Route path="/assessments/create" element={<CreateAssessment />} />
        <Route path="/assessments/:id/:submissionId" element={<ViewAssessment />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
