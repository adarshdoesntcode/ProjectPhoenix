import StudentDashboard from "@/features/student/dashboard/StudentDashboard";
import StudentArchive from "@/features/student/StudentArchive";
import StudentGuidelines from "@/features/student/StudentGuidelines";
import StudentProject from "@/features/student/project/StudentProject";

import { Navigate } from "react-router-dom";
import Error from "@/components/error/Error";

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
    path: "archive",
    element: <StudentArchive />,
    errorElement: <Error />,
  },
  {
    path: "guidelines",
    element: <StudentGuidelines />,
    errorElement: <Error />,
  },
];

export default StudentRoutes;
