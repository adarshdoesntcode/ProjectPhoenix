import AdminDashboard from "@/features/admin/dashboard/AdminDashboard";
import AdminEvaluators from "@/features/admin/evaluators/AdminEvaluators";

import AdminNotices from "@/features/admin/AdminNotices";
import AdminProjects from "@/features/admin/projects/AdminProjects";
import AdminStudents from "@/features/admin/students/AdminStudents";
import AdminSupervisors from "@/features/admin/supervisors/AdminSupervisors";
import AdminEventDetails from "@/features/admin/events/AdminEventDetails";
import AdminEvents from "@/features/admin/events/AdminEvents";
import AdminNewEvent from "@/features/admin/events/AdminNewEvent";

import { Navigate } from "react-router-dom";
import AdminDefense from "@/features/admin/defense/AdminDefense";
import AdminNewDefense from "@/features/admin/defense/AdminNewDefense";
import AdminDefenseDetails from "@/features/admin/defense/AdminDefenseDetails";
import Error from "@/components/error/Error";
import AssignSupervisor from "@/features/admin/events/AssignSupervisor";
import AdminProjectDetails from "@/features/admin/projects/AdminProjectDetails";
import AdminEventResult from "@/features/admin/events/results/AdminEventResult";

const AdminRoutes = [
  {
    index: true,
    element: <Navigate replace to="dashboard" />,
    errorElement: <Error />,
  },
  {
    path: "dashboard",
    element: <AdminDashboard />,
    errorElement: <Error />,
  },
  {
    path: "events",
    element: <AdminEvents />,
    errorElement: <Error />,
  },
  {
    path: "events/:id",
    element: <AdminEventDetails />,
    errorElement: <Error />,
  },
  {
    path: "events/:id/result",
    element: <AdminEventResult />,
    errorElement: <Error />,
  },
  {
    path: "events/:id/supervisor",
    element: <AssignSupervisor />,
    errorElement: <Error />,
  },
  {
    path: "events/new",
    element: <AdminNewEvent />,
    errorElement: <Error />,
  },
  {
    path: "defense",
    element: <AdminDefense />,
    errorElement: <Error />,
  },
  {
    path: "defense/:id",
    element: <AdminDefenseDetails />,
    errorElement: <Error />,
  },
  {
    path: "defense/new",
    element: <AdminNewDefense />,
    errorElement: <Error />,
  },
  {
    path: "projects",
    element: <AdminProjects />,
    errorElement: <Error />,
  },
  {
    path: "projects/:id",
    element: <AdminProjectDetails />,
    errorElement: <Error />,
  },
  {
    path: "supervisors",
    element: <AdminSupervisors />,
    errorElement: <Error />,
  },
  {
    path: "students",
    element: <AdminStudents />,
    errorElement: <Error />,
  },
  {
    path: "notices",
    element: <AdminNotices />,
    errorElement: <Error />,
  },
  {
    path: "evaluators",
    element: <AdminEvaluators />,
    errorElement: <Error />,
  },
];

export default AdminRoutes;
