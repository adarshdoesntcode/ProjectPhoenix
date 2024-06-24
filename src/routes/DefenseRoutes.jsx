import Error from "@/components/error/Error";
import DefenseDashboard from "@/features/defense/DefenseDashboard";
import DefenseEvaluation from "@/features/defense/DefenseEvaluation";

import { Navigate } from "react-router-dom";

const DefenseRoutes = [
  {
    index: true,
    element: <Navigate replace to="dashboard" />,
    errorElement: <Error />,
  },
  {
    path: "dashboard",
    element: <DefenseDashboard />,
    errorElement: <Error />,
  },
  {
    path: "dashboard/:id",
    element: <DefenseEvaluation />,
    errorElement: <Error />,
  },
];

export default DefenseRoutes;
