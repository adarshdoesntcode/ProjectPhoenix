import StudentDashboard from "@/features/student/dashboard/StudentDashboard";
import StudentArchive from "@/features/student/StudentArchive";
import StudentGuidelines from "@/features/student/StudentGuidelines";
import StudentProject from "@/features/student/StudentProject";

import { Navigate } from "react-router-dom";

const StudentRoutes = [
  {
    index: true,
    element: <Navigate replace to="dashboard" />,
  },
  {
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "project",
    element: <StudentProject />,
  },
  {
    path: "archive",
    element: <StudentArchive />,
  },
  {
    path: "guidelines",
    element: <StudentGuidelines />,
  },
];

export default StudentRoutes;
