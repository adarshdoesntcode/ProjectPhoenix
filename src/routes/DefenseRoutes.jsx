import DefenseDashboard from "@/features/defense/DefenseDashboard";
import DefenseEvaluation from "@/features/defense/DefenseEvaluation";

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
  {
    path: "dashboard/:id",
    element: <DefenseEvaluation />,
  },
];

export default DefenseRoutes;
