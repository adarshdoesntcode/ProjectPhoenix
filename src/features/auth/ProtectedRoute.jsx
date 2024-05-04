import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";

const ProtectedRoute = ({ allowedRole }) => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return user?.roles?.find((role) => allowedRole === role) ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to={`${allowedRole}/login`} state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
