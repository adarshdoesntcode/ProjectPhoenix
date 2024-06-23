import AdminDashboard from "@/features/admin/AdminDashboard";
import AdminEvaluators from "@/features/admin/evaluators/AdminEvaluators";

import AdminNotices from "@/features/admin/AdminNotices";
import AdminProjects from "@/features/admin/AdminProjects";
import AdminStudents from "@/features/admin/AdminStudents";
import AdminSupervisors from "@/features/admin/AdminSupervisors";
import AdminEventDetails from "@/features/admin/events/AdminEventDetails";
import AdminEvents from "@/features/admin/events/AdminEvents";
import AdminNewEvent from "@/features/admin/events/AdminNewEvent";

import { Navigate } from "react-router-dom";
import AdminDefense from "@/features/admin/defense/AdminDefense";
import AdminNewDefense from "@/features/admin/defense/AdminNewDefense";
import AdminDefenseDetails from "@/features/admin/defense/AdminDefenseDetails";

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
    path: "defense",
    element: <AdminDefense />,
  },
  {
    path: "defense/:id",
    element: <AdminDefenseDetails />,
  },
  {
    path: "defense/new",
    element: <AdminNewDefense />,
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
