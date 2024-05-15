import { ROLES_LIST } from "@/lib/config";
import AdminLogin from "@/features/admin/AdminLogin";
import DefenseLogin from "@/features/defense/DefenseLogin";
import Landing from "@/features/home/Landing";
import StudentLogin from "@/features/student/StudentLogin";
import SupervisorLogin from "@/features/supervisor/SupervisorLogin";
import Unauthorized from "../components/Unauthorized";

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
    path: `${ROLES_LIST.student}/login`,
    element: <StudentLogin />,
  },
  {
    path: `${ROLES_LIST.defense}/login`,
    element: <DefenseLogin />,
  },
  {
    path: `${ROLES_LIST.supervisor}/login`,
    element: <SupervisorLogin />,
  },
];

export default PublicRoutes;
