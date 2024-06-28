import Error from "@/components/error/Error";
import SupervisorDashboard from "@/features/supervisor/SupervisorDashboard";
import SupervisorArchive from "@/features/supervisor/archive/SupervisorArchive";

import { Navigate } from "react-router-dom";

const SupervisorRoutes = [
  {
    index: true,
    element: <Navigate replace to="dashboard" />,
    errorElement: <Error />,
  },
  {
    path: "dashboard",
    element: <SupervisorDashboard />,
    errorElement: <Error />,
  },
  {
    path: "archive",
    element: <SupervisorArchive />,
    errorElement: <Error />,
  },
];

export default SupervisorRoutes;
