import { RouterProvider, createBrowserRouter } from "react-router-dom";

import PublicAppLayout from "./components/layouts/PublicAppLayout";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./store";

const router = createBrowserRouter([
  {
    element: <PublicAppLayout />,
    children: PublicRoutes,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "admin/dashboard",
        element: <div>Admin ko kando</div>,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}
