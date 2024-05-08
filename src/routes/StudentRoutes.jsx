import StudentDashboard from "@/features/student/StudentDashboard";

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
];

export default StudentRoutes;
