import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";
import { useRefreshQuery } from "@/api/apiSlice";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ allowedRole }) => {
  const [skip, setSkip] = useState(true);
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  const { isLoading } = useRefreshQuery({
    skip,
  });

  useEffect(() => {
    if (user === null && token === null) setSkip(false);
  }, [token, user]);

  return isLoading ? (
    <p>Loading..</p>
  ) : user?.roles?.find((role) => allowedRole === role) ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to={`${allowedRole}/login`} state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
