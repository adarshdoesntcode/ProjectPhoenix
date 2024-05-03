import { ROLES_LIST } from "@/config/roleList";
import AdminLogin from "@/features/admin/AdminLogin";
import DefenseLogin from "@/features/defense/DefenseLogin";
import Landing from "@/features/home/Landing";
import StudentLogin from "@/features/student/StudentLogin";
import SupervisorLogin from "@/features/supervisor/SupervisorLogin";
import Unauthorized from "./Unauthorized";

const PublicRoutes = [
  {
    path: "/",
    index: true,
    element: <Landing />,
  },
  {
    path: `${ROLES_LIST.admin}/login`,
    element: <AdminLogin />,
  },
  {
    path: "student/login",
    element: <StudentLogin />,
  },
  {
    path: "defense/login",
    element: <DefenseLogin />,
  },
  {
    path: "supervisor/login",
    element: <SupervisorLogin />,
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
  },
];

export default PublicRoutes;
