import DefenseDashboard from "@/features/defense/DefenseDashboard";

import { Navigate } from "react-router-dom";

const DefenseRoutes = [
  {
    index: true,
    element: <Navigate replace to="dashboard" />,
  },
  {
    path: "dashboard",
    element: <DefenseDashboard />,
  },
];

export default DefenseRoutes;
