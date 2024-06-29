import Error from "@/components/error/Error";
import SupervisorDashboard from "@/features/supervisor/dashboard/SupervisorDashboard";
import SupervisorArchive from "@/features/supervisor/archive/SupervisorArchive";

import { Navigate } from "react-router-dom";
import SupervisorProjectDetails from "@/features/supervisor/dashboard/SupervisorProjectDetails";
import SupervisorArchiveProjectDetail from "@/features/supervisor/archive/SupervisorArchiveProjectDetail";

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
    path: "dashboard/:id",
    element: <SupervisorProjectDetails />,
    errorElement: <Error />,
  },
  {
    path: "archive",
    element: <SupervisorArchive />,
    errorElement: <Error />,
  },
  {
    path: "archive/:id",
    element: <SupervisorArchiveProjectDetail />,
    errorElement: <Error />,
  },
];

export default SupervisorRoutes;
