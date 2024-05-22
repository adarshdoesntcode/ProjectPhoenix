import AdminDashboard from "@/features/admin/AdminDashboard";
import AdminEvaluators from "@/features/admin/AdminEvaluators";

import AdminNotices from "@/features/admin/AdminNotices";
import AdminProjects from "@/features/admin/AdminProjects";
import AdminStudents from "@/features/admin/AdminStudents";
import AdminSupervisors from "@/features/admin/AdminSupervisors";
import AdminEventDetails from "@/features/admin/events/AdminEventDetails";
import AdminEvents from "@/features/admin/events/AdminEvents";
import AdminNewEvent from "@/features/admin/events/AdminNewEvent";

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
    path: "events/:id",
    element: <AdminEventDetails />,
  },
  {
    path: "events/new",
    element: <AdminNewEvent />,
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
