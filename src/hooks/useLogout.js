import { authApiSlice } from "@/features/auth/authApiSlice";
import { logOut } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await dispatch(
        authApiSlice.endpoints.logout.initiate(undefined, {
          forceRefetch: true,
        })
      ).unwrap();

      dispatch(logOut());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return logout;
};

export default useLogout;
