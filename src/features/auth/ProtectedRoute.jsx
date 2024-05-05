import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";
import { useEffect, useMemo, useState } from "react";
import useRefreshToken from "@/hooks/useRefreshToken";
import { toast } from "@/components/ui/use-toast";
import PersistLoader from "@/components/PersistLoader";

const ProtectedRoute = ({ allowedRole }) => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  const isAllowedRole = useMemo(() => {
    return user?.roles?.includes(allowedRole);
  }, [user, allowedRole]);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        toast({
          variant: "destructive",
          title: err.response.status === 401 ? "Unauthorized" : "Token Expired",
          description: err.message,
        });
      } finally {
        if (isMounted && user && token) {
          setIsLoading(false);
        }
      }
    };

    if (!user && !token) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [refresh, token, user]);

  if (isLoading) {
    return <PersistLoader />;
  }

  if (isAllowedRole) {
    return <Outlet />;
  }

  if (token) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return (
    <Navigate to={`${allowedRole}/login`} state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
