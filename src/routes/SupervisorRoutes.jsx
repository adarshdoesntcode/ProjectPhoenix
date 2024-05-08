import SupervisorDashboard from "@/features/supervisor/SupervisorDashboard";

import { Navigate } from "react-router-dom";

const SupervisorRoutes = [
  {
    index: true,
    element: <Navigate replace to="dashboard" />,
  },
  {
    path: "dashboard",
    element: <SupervisorDashboard />,
  },
];

export default SupervisorRoutes;
