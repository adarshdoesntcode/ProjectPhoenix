import StudentDashboard from "@/features/student/dashboard/StudentDashboard";
import StudentArchive from "@/features/student/archive/StudentArchive";
import StudentGuidelines from "@/features/student/StudentGuidelines";
import StudentProject from "@/features/student/project/StudentProject";

import { Navigate } from "react-router-dom";
import Error from "@/components/error/Error";
import ProjectProgress from "@/features/student/project/ProjectProgress";
import StudentCoverpage from "@/features/student/coverpage/StudentCoverpage";

const StudentRoutes = [
  {
    index: true,
    element: <Navigate replace to="dashboard" />,
    errorElement: <Error />,
  },
  {
    path: "dashboard",
    element: <StudentDashboard />,
    errorElement: <Error />,
  },
  {
    path: "project",
    element: <StudentProject />,
    errorElement: <Error />,
  },
  {
    path: "project/progress",
    element: <ProjectProgress />,
    errorElement: <Error />,
  },
  {
    path: "archive",
    element: <StudentArchive />,
    errorElement: <Error />,
  },
  {
    path: "guidelines",
    element: <StudentGuidelines />,
    errorElement: <Error />,
  },
  {
    path: "coverpage",
    element: <StudentCoverpage />,
    errorElement: <Error />,
  },
];

export default StudentRoutes;
