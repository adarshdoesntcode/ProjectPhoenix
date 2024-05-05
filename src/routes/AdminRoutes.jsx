import AdminDashboard from "@/features/admin/AdminDashboard";
import AdminEvaluators from "@/features/admin/AdminEvaluators";
import AdminEvents from "@/features/admin/AdminEvents";
import AdminNotices from "@/features/admin/AdminNotices";
import AdminProjects from "@/features/admin/AdminProjects";
import AdminStudents from "@/features/admin/AdminStudents";
import AdminSupervisors from "@/features/admin/AdminSupervisors";

import { Navigate } from "react-router-dom";

const AdminRoutes = [
  {
    index: true,
    element: <Navigate replace to="dashboard" />,
  },
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "events",
    element: <AdminEvents />,
  },
  {
    path: "projects",
    element: <AdminProjects />,
  },
  {
    path: "supervisors",
    element: <AdminSupervisors />,
  },
  {
    path: "students",
    element: <AdminStudents />,
  },
  {
    path: "notices",
    element: <AdminNotices />,
  },
  {
    path: "evaluators",
    element: <AdminEvaluators />,
  },
];

export default AdminRoutes;
