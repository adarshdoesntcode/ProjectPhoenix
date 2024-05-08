import { RouterProvider, createBrowserRouter } from "react-router-dom";

import PublicAppLayout from "./components/layouts/PublicAppLayout";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./store";
import { ROLES_LIST } from "./config/roleList";
import NotFound from "./components/NotFound";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminRoutes from "./routes/AdminRoutes";
import Unauthorized from "./components/Unauthorized";
import StudentLayout from "./components/layouts/StudentLayout";
import StudentRoutes from "./routes/StudentRoutes";
import SupervisorLayout from "./components/layouts/SupervisorLayout";
import SupervisorRoutes from "./routes/SupervisorRoutes";

const router = createBrowserRouter([
  {
    element: <PublicAppLayout />,
    children: PublicRoutes,
  },

  {
    element: <ProtectedRoute allowedRole={ROLES_LIST.admin} />,
    children: [
      {
        path: `${ROLES_LIST.admin}`,
        element: <AdminLayout />,
        children: AdminRoutes,
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRole={ROLES_LIST.student} />,
    children: [
      {
        path: `${ROLES_LIST.student}`,
        element: <StudentLayout />,
        children: StudentRoutes,
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRole={ROLES_LIST.supervisor} />,
    children: [
      {
        path: `${ROLES_LIST.supervisor}`,
        element: <SupervisorLayout />,
        children: SupervisorRoutes,
      },
    ],
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
