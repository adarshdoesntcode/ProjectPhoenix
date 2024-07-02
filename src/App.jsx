import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PublicAppLayout from "./components/layouts/PublicAppLayout";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./store";
import { ROLES_LIST } from "./lib/config";
import NotFound from "./components/NotFound";

import AdminRoutes from "./routes/AdminRoutes";
import Unauthorized from "./components/Unauthorized";

import StudentRoutes from "./routes/StudentRoutes";

import SupervisorRoutes from "./routes/SupervisorRoutes";

import DefenseRoutes from "./routes/DefenseRoutes";
import AdminLayout from "./components/layouts/AdminLayout";
import StudentLayout from "./components/layouts/StudentLayout";
import SupervisorLayout from "./components/layouts/SupervisorLayout";
import DefenseLayout from "./components/layouts/DefenseLayout";
import { StatusBar, Style } from "@capacitor/status-bar";
import { useEffect } from "react";

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
    element: <ProtectedRoute allowedRole={ROLES_LIST.defense} />,
    children: [
      {
        path: `${ROLES_LIST.defense}`,
        element: <DefenseLayout />,
        children: DefenseRoutes,
      },
    ],
  },

  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  useEffect(() => {
    const configureStatusBar = async () => {
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: "#ffffff" });
      await StatusBar.show();
      StatusBar.setOverlaysWebView({ overlay: true });
    };

    configureStatusBar();
  }, []);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
