import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";
import { useEffect, useState } from "react";
import useRefreshToken from "@/hooks/useRefreshToken";
import { toast } from "@/components/ui/use-toast";
import PersistLoader from "@/components/ui/PersistLoader";

const ProtectedRoute = ({ allowedRole }) => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Your Token Expired",
          description: err.message,
        });
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !user || !token ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [isLoading, refresh, token, user]);

  return isLoading ? (
    <PersistLoader />
  ) : user?.roles?.find((role) => allowedRole === role) ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to={`${allowedRole}/login`} state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
