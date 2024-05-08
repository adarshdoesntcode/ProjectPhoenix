import { useDispatch } from "react-redux";
import { logOut } from "@/features/auth/authSlice";
import { authApiSlice } from "@/features/auth/authApiSlice";

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      dispatch(logOut());
      await dispatch(authApiSlice.endpoints.logout.initiate());
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
