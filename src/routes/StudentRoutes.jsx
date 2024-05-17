import StudentDashboard from "@/features/student/dashboard/StudentDashboard";
import StudentEvents from "@/features/student/StudentEvents";
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
    path: "events",
    element: <StudentEvents />,
  },
  {
    path: "project",
    element: <StudentProject />,
  },

  {
    path: "guidelines",
    element: <StudentGuidelines />,
  },
];

export default StudentRoutes;
