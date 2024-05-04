import { RouterProvider, createBrowserRouter } from "react-router-dom";

import PublicAppLayout from "./components/layouts/PublicAppLayout";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./store";
import { ROLES_LIST } from "./config/roleList";
import AdminDashboard from "./features/admin/AdminDashboard";
import Unauthorized from "./components/ui/Unauthorized";
import NotFound from "./components/ui/NotFound";

const router = createBrowserRouter([
  {
    element: <PublicAppLayout />,
    children: PublicRoutes,
  },

  {
    element: <ProtectedRoute allowedRole={ROLES_LIST.admin} />,
    children: [
      {
        path: `${ROLES_LIST.admin}/dashboard`,
        element: <AdminDashboard />,
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRole={ROLES_LIST.student} />,
    children: [
      {
        path: `${ROLES_LIST.student}/dashboard`,
        element: <AdminDashboard />,
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRole={ROLES_LIST.supervisor} />,
    children: [
      {
        path: `${ROLES_LIST.supervisor}/dashboard`,
        element: <AdminDashboard />,
      },
    ],
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
